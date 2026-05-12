#!/usr/bin/env node
// Pull recent publications from Jordi Cabot's DBLP page and add any
// missing ones to src/data/publications.js. Cabot is on every BESSER
// paper, so seeding off his PID guarantees we don't miss any.
//
// Runs in CI weekly; the workflow opens a PR for human review (DBLP also
// indexes Cabot's non-BESSER work, so the PR is the filter).

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBS_FILE = resolve(__dirname, '..', 'src', 'data', 'publications.js');
const DBLP_URL = 'https://dblp.org/pid/18/948.xml';
const YEAR_WINDOW = 2; // current year + previous

const normalizeTitle = (t) =>
  t.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

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

    const authors = getAllTexts(body, 'author').join(', ');
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

    entries.push({ title, authors, year, venue: venue.trim() || 'Other', url: ee || null });
  }
  return entries;
}

async function readExisting() {
  const src = await readFile(PUBS_FILE, 'utf8');
  const titles = [...src.matchAll(/title:\s*(['"])([\s\S]*?)\1/g)].map((x) => x[2]);
  return { src, existing: new Set(titles.map(normalizeTitle)) };
}

const escapeStr = (s) => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");

function formatEntry(p) {
  return [
    '  {',
    `    title: '${escapeStr(p.title)}',`,
    `    authors: '${escapeStr(p.authors)}',`,
    `    year: ${p.year},`,
    `    venue: '${escapeStr(p.venue)}',`,
    `    url: ${p.url ? `'${escapeStr(p.url)}'` : 'null'},`,
    '  },',
  ].join('\n');
}

async function main() {
  console.log(`Fetching ${DBLP_URL}`);
  const xml = await fetchDblp();
  const all = parsePublications(xml);

  const minYear = new Date().getFullYear() - (YEAR_WINDOW - 1);
  const recent = all.filter((p) => p.year >= minYear);

  const { src, existing } = await readExisting();
  const seen = new Set(existing);
  const fresh = [];
  for (const p of recent) {
    const key = normalizeTitle(p.title);
    if (seen.has(key)) continue;
    seen.add(key);
    fresh.push(p);
  }

  if (fresh.length === 0) {
    console.log(`No new publications in window (>= ${minYear}).`);
    return;
  }

  fresh.sort((a, b) => b.year - a.year);
  const eol = src.includes('\r\n') ? '\r\n' : '\n';
  const block = fresh.map(formatEntry).join('\n').replace(/\n/g, eol);
  const markerRe = /export const publications = \[\r?\n/;
  if (!markerRe.test(src)) {
    throw new Error(`Could not locate insertion marker in ${PUBS_FILE}`);
  }
  const updated = src.replace(markerRe, (m) => `${m}${block}${eol}`);
  await writeFile(PUBS_FILE, updated, 'utf8');

  console.log(`Inserted ${fresh.length} new entr${fresh.length === 1 ? 'y' : 'ies'}:`);
  fresh.forEach((p) => console.log(`  - [${p.year}] ${p.title}`));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
