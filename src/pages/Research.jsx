import { motion } from 'framer-motion';
import { ExternalLink, Users } from 'lucide-react';
import { projects, venues } from '../data/research';

const fade = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.4 },
};

export default function Research() {
  return (
    <>
      <section className="container-wide pt-20 pb-10">
        <motion.div {...fade} className="max-w-3xl">
          <span className="section-eyebrow">Research</span>
          <h1 className="h2 mt-4 text-4xl sm:text-5xl">Projects, papers, and the research behind BESSER.</h1>
          <p className="lede">Selected initiatives where the BESSER team is contributing — from EU Horizon projects to open-source tooling for AI evaluation.</p>
        </motion.div>
      </section>

      <section className="container-wide pb-12">
        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((p, i) => (
            <motion.article
              key={p.name}
              {...fade}
              transition={{ ...fade.transition, delay: 0.04 * i }}
              className="card card-hover flex flex-col"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-2xl font-bold text-ink-900">{p.name}</h2>
                <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">{p.tagline}</span>
              </div>
              <p className="mt-3 text-ink-600">{p.desc}</p>

              <div className="mt-5 flex items-start gap-2 text-sm text-ink-500">
                <Users className="mt-0.5 h-4 w-4 shrink-0 opacity-70" />
                <span>{p.contributors.join(' · ')}</span>
              </div>

              {p.links.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-xs font-medium text-ink-700 hover:border-brand-200 hover:text-brand-700"
                    >
                      {l.label} <ExternalLink className="h-3 w-3" />
                    </a>
                  ))}
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </section>

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
