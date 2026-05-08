import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, Pencil } from 'lucide-react';
import { venues } from '../data/research';
import { publications } from '../data/publications';

const EDIT_PUBLICATIONS_URL =
  'https://github.com/BESSER-PEARL/website/edit/redesign/src/data/publications.js';

const fade = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.4 },
};

export default function Research() {
  // group publications by year (descending)
  const byYear = publications.reduce((acc, p) => {
    (acc[p.year] ||= []).push(p);
    return acc;
  }, {});
  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

  return (
    <>
      <section className="container-wide pt-20 pb-10">
        <motion.div {...fade} className="max-w-3xl">
          <span className="section-eyebrow">Research</span>
          <h1 className="h2 mt-4 text-4xl sm:text-5xl">Cutting-edge results at the intersection of low-code, modeling, and AI.</h1>
          <p className="lede">Selected initiatives, projects, and peer-reviewed publications from the BESSER team.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="https://modeling-languages.com/" target="_blank" rel="noopener" className="btn-secondary">
              <BookOpen className="h-4 w-4" /> Read the blog
              <ArrowUpRight className="h-4 w-4 opacity-60" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Publications */}
      <section className="container-wide py-16">
        <motion.div {...fade} className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink-900">Publications</h2>
            <p className="mt-1 text-sm text-ink-600">{publications.length} peer-reviewed papers and counting.</p>
          </div>
          <a
            href={EDIT_PUBLICATIONS_URL}
            target="_blank"
            rel="noopener"
            className="btn-secondary text-sm"
            title="Open the publications file on GitHub. Org members with push access commit directly; everyone else gets a PR flow."
          >
            <Pencil className="h-4 w-4" /> Edit on GitHub
            <ArrowUpRight className="h-4 w-4 opacity-60" />
          </a>
        </motion.div>

        <div className="mt-8 space-y-12">
          {years.map((year) => (
            <div key={year}>
              <h3 className="mb-4 font-mono text-sm font-medium tracking-widest text-brand-600">{year}</h3>
              <ul className="divide-y divide-ink-200/70 rounded-2xl border border-ink-200/70 bg-white">
                {byYear[year].map((p) => (
                  <li key={p.title} className="p-5 transition hover:bg-ink-50/60">
                    <a
                      href={p.url || '#'}
                      target={p.url ? '_blank' : undefined}
                      rel={p.url ? 'noopener' : undefined}
                      className={p.url ? 'group block' : 'block cursor-default'}
                    >
                      <h4 className="font-display text-base font-semibold leading-snug text-ink-900 group-hover:text-brand-700">
                        {p.title}
                        {p.url && <ArrowUpRight className="ml-1.5 inline h-3.5 w-3.5 align-text-top opacity-0 transition group-hover:opacity-70" />}
                      </h4>
                      <p className="mt-1.5 text-sm text-ink-600">{p.authors}</p>
                      <p className="mt-1 text-xs italic text-ink-500">{p.venue}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <motion.div
          {...fade}
          className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-dashed border-ink-300 bg-ink-50/50 p-6 sm:flex-row sm:items-center"
        >
          <div className="flex items-start gap-3 text-sm text-ink-600">
            <Pencil className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
            <p>
              Got a new paper? Add it to <code className="rounded bg-white px-1.5 py-0.5 font-mono text-[12px] text-ink-700">src/data/publications.js</code> on GitHub.
              Org members with push access commit directly; anyone else opens a quick PR.
            </p>
          </div>
          <a href={EDIT_PUBLICATIONS_URL} target="_blank" rel="noopener" className="btn-primary text-sm whitespace-nowrap">
            <Pencil className="h-4 w-4" /> Add a publication
          </a>
        </motion.div>
      </section>

      {/* Venues */}
      <section className="container-wide py-16">
        <motion.div {...fade}>
          <h2 className="font-display text-xl font-semibold text-ink-900">Where our work appears</h2>
          <p className="mt-2 text-sm text-ink-600">A non-exhaustive list of conferences and journals.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {venues.map((v) => (
              <span key={v} className="rounded-full border border-ink-200 bg-white px-3 py-1.5 text-sm text-ink-700">{v}</span>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
}
