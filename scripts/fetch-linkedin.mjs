#!/usr/bin/env node
// Weekly LinkedIn pull → PR. Fetches recent posts for one or more BESSER
// LinkedIn organization pages via LinkedIn's official Community Management
// "Posts" API, then rewrites the `news` array in src/data/news.js with the
// latest posts (newest first) as embed entries. The site renders each as a
// LinkedIn embed card — same shape as a manually-added post.
//
// REQUIRED ENV (set as GitHub Actions secrets — see .github/workflows/fetch-linkedin.yml):
//   LINKEDIN_ORG_IDS        Comma-separated pages as "Label:orgId", e.g.
//                           "BESSER:1234567,BESSER Agentic:7654321".
//                           (orgId is the numeric LinkedIn organization id.)
//   Auth — provide EITHER a refresh-token trio (preferred, auto-renews):
//     LINKEDIN_CLIENT_ID
//     LINKEDIN_CLIENT_SECRET
//     LINKEDIN_REFRESH_TOKEN
//   …OR a single short-lived token (you'll have to rotate it manually):
//     LINKEDIN_ACCESS_TOKEN
//
// OPTIONAL ENV:
//   LINKEDIN_API_VERSION    LinkedIn-Version header, "YYYYMM". Default below.
//   LINKEDIN_MAX_PER_PAGE   Posts to keep per page. Default 6.
//
// Local test:  LINKEDIN_ORG_IDS=... LINKEDIN_ACCESS_TOKEN=... npm run fetch-linkedin
//
// NOTE: getting here requires a LinkedIn developer app with the
// "Community Management API" product approved and a page admin's OAuth
// authorization (scope r_organization_social). See the workflow file header.

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const NEWS_FILE = resolve(__dirname, '..', 'src', 'data', 'news.js');

const API_VERSION = process.env.LINKEDIN_API_VERSION || '202505';
const MAX_PER_PAGE = parseInt(process.env.LINKEDIN_MAX_PER_PAGE || '6', 10);

// "BESSER:123,Agentic:456" → [{ label:'BESSER', id:'123' }, …]
function parseOrgs() {
  const raw = (process.env.LINKEDIN_ORG_IDS || '').trim();
  if (!raw) throw new Error('LINKEDIN_ORG_IDS is not set');
  return raw.split(',').map((chunk) => {
    const [label, id] = chunk.split(':').map((s) => s.trim());
    if (!label || !id) throw new Error(`Bad LINKEDIN_ORG_IDS entry: "${chunk}" (expected "Label:orgId")`);
    return { label, id };
  });
}

async function getAccessToken() {
  if (process.env.LINKEDIN_ACCESS_TOKEN) return process.env.LINKEDIN_ACCESS_TOKEN.trim();

  const { LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET, LINKEDIN_REFRESH_TOKEN } = process.env;
  if (!LINKEDIN_CLIENT_ID || !LINKEDIN_CLIENT_SECRET || !LINKEDIN_REFRESH_TOKEN) {
    throw new Error(
      'No credentials. Set LINKEDIN_ACCESS_TOKEN, or the trio ' +
        'LINKEDIN_CLIENT_ID / LINKEDIN_CLIENT_SECRET / LINKEDIN_REFRESH_TOKEN.',
    );
  }
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: LINKEDIN_REFRESH_TOKEN,
    client_id: LINKEDIN_CLIENT_ID,
    client_secret: LINKEDIN_CLIENT_SECRET,
  });
  const res = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  if (!res.ok) throw new Error(`Token refresh failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  if (!data.access_token) throw new Error('Token refresh returned no access_token');
  return data.access_token;
}

// Fetch the most recent posts for one organization, newest first.
async function fetchOrgPosts(orgId, token) {
  const author = encodeURIComponent(`urn:li:organization:${orgId}`);
  const url =
    `https://api.linkedin.com/rest/posts?q=author&author=${author}` +
    `&count=${MAX_PER_PAGE}&sortBy=LAST_MODIFIED`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'LinkedIn-Version': API_VERSION,
      'X-Restli-Protocol-Version': '2.0.0',
    },
  });
  if (!res.ok) throw new Error(`Posts fetch failed for org ${orgId}: ${res.status} ${await res.text()}`);
  const data = await res.json();
  const elements = Array.isArray(data.elements) ? data.elements : [];
  // Each element's `id` is the post URN (urn:li:share:… or urn:li:ugcPost:…).
  return elements
    .map((el) => el.id)
    .filter(Boolean)
    .slice(0, MAX_PER_PAGE);
}

const escapeStr = (s) => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");

const formatEntry = (e) =>
  [
    '  {',
    `    source: '${escapeStr(e.source)}',`,
    `    embedSrc: 'https://www.linkedin.com/embed/feed/update/${escapeStr(e.urn)}',`,
    '  },',
  ].join('\n');

async function writeNews(entries) {
  const src = await readFile(NEWS_FILE, 'utf8');
  const eol = src.includes('\r\n') ? '\r\n' : '\n';
  const block =
    entries.length === 0
      ? ''
      : eol + entries.map(formatEntry).join('\n').replace(/\n/g, eol) + eol;
  // Replace the whole `export const news = [ … ];` array (bot-managed).
  const re = /export const news = \[[\s\S]*?\];/;
  if (!re.test(src)) throw new Error('Could not find "export const news = [ … ];" in news.js');
  const updated = src.replace(re, `export const news = [${block}];`);
  await writeFile(NEWS_FILE, updated, 'utf8');
}

async function main() {
  const orgs = parseOrgs();
  const token = await getAccessToken();

  const entries = [];
  for (const { label, id } of orgs) {
    process.stdout.write(`Fetching posts for ${label} (org ${id})… `);
    const urns = await fetchOrgPosts(id, token);
    console.log(`${urns.length} post(s)`);
    for (const urn of urns) entries.push({ source: label, urn });
  }

  await writeNews(entries);
  console.log(`\nWrote ${entries.length} post(s) to src/data/news.js`);
  entries.forEach((e) => console.log(`  + [${e.source}] ${e.urn}`));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
