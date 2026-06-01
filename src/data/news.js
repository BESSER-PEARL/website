// News — LinkedIn posts embedded via LinkedIn's official "Embed this post" feature.
//
// HOW TO ADD A POST:
//   1. Open the post on LinkedIn.
//   2. Click the "···" menu (top-right of the post) → "Embed this post".
//   3. Copy the URL inside the iframe's  src="..."  attribute.
//   4. Add an entry below with that URL as `embedSrc`.
//
// `source` is just a label for which page the post came from.
// `height` is optional (defaults to 560) — bump it for long posts with media.

// The two BESSER LinkedIn pages these posts come from.
// TODO(user): confirm these URLs (the second page URL is still needed).
export const linkedInPages = [
  { label: 'BESSER', url: 'https://www.linkedin.com/company/besser-pearl/' },
  { label: 'BESSER (2nd page)', url: '' }, // <-- paste the second BESSER LinkedIn page URL
];

export const news = [
  // EXAMPLE (replace the embedSrc with a real one from the steps above):
  // {
  //   source: 'BESSER',
  //   embedSrc: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7000000000000000000',
  //   height: 560,
  // },
];
