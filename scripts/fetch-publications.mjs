#!/usr/bin/env node
// Weekly DBLP pull → PR. Two-tier filter:
//   Tier 1 — pass if a non-Cabot BESSER team member is co-author.
//   Tier 2 — for the rest, fetch the PDF (OA only) and ask an LLM
//            whether the BESSER project is acknowledged.
// Plus an LLM near-duplicate pass vs. the existing list (catches
// preprint/camera-ready pairs with reworded titles), and cosmetic
// cleanup of DBLP author/venue strings before insertion.

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join as pathJoin } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { tmpdir } from 'node:os';
import { writeFileSync, unlinkSync, mkdtempSync } from 'node:fs';

const exec = promisify(execFile);

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBS_FILE = resolve(__dirname, '..', 'src', 'data', 'publications.js');
const DBLP_URL = 'https://dblp.org/pid/18/948.xml';
const YEAR_WINDOW = 2;
const OPENAI_MODEL = 'gpt-4o-mini';
const OPENAI_KEY = process.env.OPENAI_API_KEY;

// Last-name tokens unique enough to identify a BESSER member on their own.
// Cabot is intentionally excluded — he co-authors widely outside the project.
// Keep in sync with src/data/team.js.
const RARE_LASTNAMES = new Set([
  'alfonso', 'sulejmani', 'conrardy', 'sottet', 'brimont', 'haq', 'abbasi',
  'nirumand', 'pagani', 'daoudi', 'tosi', 'degiovanni', 'valline', 'jouneaux',
  'coccia', 'chidambaram', 'lothritz', 'zarza', 'manrique', 'adhav',
]);
// Common last names that need a first-name match (avoids false positives,
// e.g. Abel Gómez ≠ Marcos Gómez Vázquez).
const AMBIGUOUS_LASTNAMES = new Map([
  ['gomez',  new Set(['marcos'])],
  ['ait',    new Set(['adem'])],
]);

const stripDiacritics = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
const normalizeTitle = (t) =>
  stripDiacritics(t).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const stripTrailingPeriod = (s) => s.replace(/\.\s*$/, '').trim();

const decodeEntities = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)));

const getText = (xml, tag) => {
  const m = xml.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`, 'i'));
  return m ? decodeEntities(m[1].replace(/<[^>]+>/g, '').trim()) : null;
};

const getAllTexts = (xml, tag) => {
  const re = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`, 'gi');
  return [...xml.matchAll(re)].map((m) =>
    decodeEntities(m[1].replace(/<[^>]+>/g, '').trim()),
  );
};

// "Qin Ma 0002" → "Qin Ma"  (DBLP disambiguator)
const cleanAuthor = (a) => a.replace(/\s+\d{4}\s*$/, '').trim();

// "CoRR, vol. abs/2511.02610" → "arXiv preprint"
const cleanVenue = (v) => v.replace(/^CoRR,\s*vol\.\s*abs\/.*$/i, 'arXiv preprint');

async function fetchDblp() {
  const res = await fetch(DBLP_URL, {
    headers: { 'User-Agent': 'besser-website-publication-bot' },
  });
  if (!res.ok) throw new Error(`DBLP fetch failed: ${res.status} ${res.statusText}`);
  return res.text();
}

function parsePublications(xml) {
  const entries = [];
  const re = /<r>([\s\S]*?)<\/r>/g;
  let m;
  while ((m = re.exec(xml))) {
    const inner = m[1].match(
      /<(article|inproceedings|incollection|proceedings|book|phdthesis|mastersthesis)\b[^>]*>([\s\S]*?)<\/\1>/,
    );
    if (!inner) continue;
    const kind = inner[1];
    const body = inner[2];

    const year = parseInt(getText(body, 'year') || '0', 10);
    if (!year) continue;
    const title = stripTrailingPeriod(getText(body, 'title') || '');
    if (!title) continue;

    const authors = getAllTexts(body, 'author').map(cleanAuthor);
    const ee = getText(body, 'ee');
    const journal = getText(body, 'journal');
    const booktitle = getText(body, 'booktitle');
    const volume = getText(body, 'volume');
    const number = getText(body, 'number');
    const pages = getText(body, 'pages');

    let venue = journal || booktitle || (kind === 'phdthesis' ? 'PhD thesis' : '');
    if (volume) venue += `, vol. ${volume}`;
    if (number) venue += `, no. ${number}`;
    if (pages) venue += `, pp. ${pages}`;
    venue = cleanVenue(venue.trim() || 'Other');

    entries.push({ title, authors, year, venue, url: ee || null });
  }
  return entries;
}

function tier1Pass(authors) {
  for (const a of authors) {
    const tokens = stripDiacritics(a)
      .toLowerCase()
      .split(/[\s\-]+/)
      .map((t) => t.replace(/[^a-z]/g, ''))
      .filter(Boolean);
    if (tokens.includes('cabot')) continue;
    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i];
      if (RARE_LASTNAMES.has(t)) return true;
      const firsts = AMBIGUOUS_LASTNAMES.get(t);
      if (firsts && tokens.slice(0, i).some((prev) => firsts.has(prev))) return true;
    }
  }
  return false;
}

function pdfUrlFor(entry) {
  const u = entry.url;
  if (!u) return null;
  const arxivDoi = u.match(/doi\.org\/10\.48550\/arXiv\.([\w.\/]+)$/i);
  if (arxivDoi) return `https://arxiv.org/pdf/${arxivDoi[1]}`;
  if (/arxiv\.org\/abs\/([\w.\/]+)/i.test(u)) {
    return u.replace('/abs/', '/pdf/');
  }
  if (u.endsWith('.pdf')) return u;
  if (u.includes('ceur-ws.org')) return u;
  if (u.includes('aclanthology.org')) {
    return (u.endsWith('/') ? u.slice(0, -1) : u) + '.pdf';
  }
  return null;
}

async function fetchPdfText(url) {
  const dir = mkdtempSync(pathJoin(tmpdir(), 'pub-'));
  const pdfPath = pathJoin(dir, 'paper.pdf');
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'besser-website-publication-bot' },
      redirect: 'follow',
    });
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(pdfPath, buf);
    const { stdout } = await exec('pdftotext', ['-layout', '-q', pdfPath, '-'], {
      maxBuffer: 16 * 1024 * 1024,
    });
    return stdout;
  } catch {
    return null;
  } finally {
    try { unlinkSync(pdfPath); } catch {}
  }
}

async function openaiJson(messages) {
  if (!OPENAI_KEY) return null;
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages,
      response_format: { type: 'json_object' },
      temperature: 0,
    }),
  });
  if (!res.ok) {
    console.warn(`OpenAI ${res.status}: ${await res.text()}`);
    return null;
  }
  const data = await res.json();
  try {
    return JSON.parse(data.choices[0].message.content);
  } catch {
    return null;
  }
}

async function ackCheck(entry) {
  const url = pdfUrlFor(entry);
  if (!url) return { acknowledges: null, reason: 'no OA PDF' };
  const text = await fetchPdfText(url);
  if (!text) return { acknowledges: null, reason: 'PDF unreachable / parse failed' };
  // Acknowledgments + funder text usually live in the last ~4k chars
  // (before the bibliography). Send the tail.
  const slice = text.slice(-5000);
  const result = await openaiJson([
    {
      role: 'system',
      content:
        'You analyze academic paper text and decide whether the paper acknowledges the BESSER project. ' +
        'BESSER is an open-source low-code/no-code modeling platform developed at LIST and the University of Luxembourg. ' +
        'Mentions of "besser" as the German word (meaning "better") or a person surnamed Besser do NOT count. ' +
        'Only an acknowledgment of the BESSER project / platform or its grant counts.',
    },
    {
      role: 'user',
      content:
        `Title: ${entry.title}\n\nText fragment from end of paper:\n\n${slice}\n\n` +
        `Respond strictly as JSON: { "acknowledges": true | false, "evidence": "<short quote or 'none'>" }`,
    },
  ]);
  if (!result || typeof result.acknowledges !== 'boolean') {
    return { acknowledges: null, reason: 'LLM error' };
  }
  return result;
}

async function llmFindDuplicates(newEntries, existingTitles) {
  if (!OPENAI_KEY || newEntries.length === 0) return new Set();
  const result = await openaiJson([
    {
      role: 'system',
      content:
        'You compare new publication titles against an existing list and identify pairs that refer to the same paper ' +
        '(preprint + camera-ready, slightly reworded titles, etc.). Be conservative — only flag clear matches.',
    },
    {
      role: 'user',
      content:
        `New entries (with index):\n${newEntries.map((e, i) => `${i}: ${e.title}`).join('\n')}\n\n` +
        `Existing entries (recent):\n${existingTitles.slice(0, 80).map((t, i) => `E${i}: ${t}`).join('\n')}\n\n` +
        `Respond JSON: { "duplicates_of_existing": [<new-index>, ...], "internal_pairs": [[<new_idx_a>, <new_idx_b>], ...] }`,
    },
  ]);
  const dup = new Set();
  if (result && Array.isArray(result.duplicates_of_existing)) {
    for (const i of result.duplicates_of_existing) if (Number.isInteger(i)) dup.add(i);
  }
  if (result && Array.isArray(result.internal_pairs)) {
    for (const pair of result.internal_pairs) {
      if (Array.isArray(pair) && pair.length === 2) {
        dup.add(Math.max(...pair));
      }
    }
  }
  return dup;
}

async function readExisting() {
  const src = await readFile(PUBS_FILE, 'utf8');
  const titles = [...src.matchAll(/title:\s*(['"])([\s\S]*?)\1/g)].map((x) => x[2]);
  return { src, titles, existing: new Set(titles.map(normalizeTitle)) };
}

const escapeStr = (s) => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");

const formatEntry = (p) =>
  [
    '  {',
    `    title: '${escapeStr(p.title)}',`,
    `    authors: '${escapeStr(p.authors.join(', '))}',`,
    `    year: ${p.year},`,
    `    venue: '${escapeStr(p.venue)}',`,
    `    url: ${p.url ? `'${escapeStr(p.url)}'` : 'null'},`,
    '  },',
  ].join('\n');

async function main() {
  console.log(`Fetching ${DBLP_URL}`);
  const xml = await fetchDblp();
  const all = parsePublications(xml);

  const minYear = new Date().getFullYear() - (YEAR_WINDOW - 1);
  const recent = all.filter((p) => p.year >= minYear);

  const { src, titles, existing } = await readExisting();
  const candidates = recent.filter((p) => !existing.has(normalizeTitle(p.title)));
  console.log(`${candidates.length} candidates after exact-title de-dup`);

  if (!OPENAI_KEY) {
    console.warn('OPENAI_API_KEY not set — Tier 2 ack check + LLM dedup disabled');
  }

  const included = [];
  const skipped = [];
  const inconclusive = [];

  for (const c of candidates) {
    if (tier1Pass(c.authors)) {
      included.push({ ...c, _reason: 'team co-author' });
      continue;
    }
    process.stdout.write(`  ack-check: ${c.title.slice(0, 60)}… `);
    const ack = await ackCheck(c);
    if (ack.acknowledges === true) {
      console.log('YES');
      included.push({ ...c, _reason: `BESSER acknowledged: ${(ack.evidence || '').slice(0, 120)}` });
    } else if (ack.acknowledges === false) {
      console.log('no');
      skipped.push({ ...c, _reason: ack.evidence || 'BESSER not acknowledged' });
    } else {
      console.log(`inconclusive (${ack.reason})`);
      inconclusive.push({ ...c, _reason: ack.reason });
    }
  }

  // LLM near-dup pass against the existing list (catches preprint/published pairs)
  const dupIdx = await llmFindDuplicates(included, titles);
  if (dupIdx.size) console.log(`LLM flagged ${dupIdx.size} likely duplicate(s)`);

  const seen = new Set(existing);
  const fresh = [];
  included.forEach((p, i) => {
    if (dupIdx.has(i)) return;
    const k = normalizeTitle(p.title);
    if (seen.has(k)) return;
    seen.add(k);
    fresh.push(p);
  });

  if (fresh.length === 0) {
    console.log('No new publications to add.');
    if (inconclusive.length) {
      console.log(`\n${inconclusive.length} candidate(s) needed manual review (PDF unreachable):`);
      inconclusive.forEach((p) => console.log(`  ? [${p.year}] ${p.title}`));
    }
    return;
  }

  fresh.sort((a, b) => b.year - a.year);
  const eol = src.includes('\r\n') ? '\r\n' : '\n';
  const block = fresh.map(formatEntry).join('\n').replace(/\n/g, eol);
  const markerRe = /export const publications = \[\r?\n/;
  if (!markerRe.test(src)) throw new Error('Insertion marker not found');
  const updated = src.replace(markerRe, (m) => `${m}${block}${eol}`);
  await writeFile(PUBS_FILE, updated, 'utf8');

  console.log(`\nInserted ${fresh.length} entries:`);
  fresh.forEach((p) => console.log(`  + [${p.year}] ${p.title}  — ${p._reason}`));
  if (skipped.length) {
    console.log(`\nSkipped ${skipped.length} (BESSER not acknowledged):`);
    skipped.forEach((p) => console.log(`  - [${p.year}] ${p.title}`));
  }
  if (inconclusive.length) {
    console.log(`\n${inconclusive.length} candidate(s) need manual review (PDF unreachable / parse failed):`);
    inconclusive.forEach((p) => console.log(`  ? [${p.year}] ${p.title}  — ${p._reason}`));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
