// News — recent LinkedIn posts from the BESSER page(s), shown as embeds.
//
// The `news` array below is BOT-MANAGED: scripts/fetch-linkedin.mjs replaces it
// weekly (via the "Fetch LinkedIn posts" GitHub Action → PR) with the latest
// posts from the LinkedIn Community Management API. Don't hand-edit it — your
// changes will be overwritten on the next run.
//
// To add a post manually anyway, each entry is:
//   { source: 'BESSER', embedSrc: 'https://www.linkedin.com/embed/feed/update/urn:li:share:…' }
// `height` is optional (defaults to 560) — bump it for long posts with media.

// The BESSER LinkedIn pages these posts link out to (used for the header buttons).
// TODO(user): confirm these URLs (the second page URL is still needed).
export const linkedInPages = [
  { label: 'BESSER', url: 'https://www.linkedin.com/company/besser-pearl/' },
  { label: 'BESSER (2nd page)', url: '' }, // <-- paste the second BESSER LinkedIn page URL
];

export const news = [];
