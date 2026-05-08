import { motion } from 'framer-motion';
import { ExternalLink, Users } from 'lucide-react';
import { projects } from '../data/research';

const fade = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.4 },
};

export default function Projects() {
  return (
    <>
      <section className="container-wide pt-20 pb-10">
        <motion.div {...fade} className="max-w-3xl">
          <span className="section-eyebrow">Research · Projects</span>
          <h1 className="h2 mt-4 text-4xl sm:text-5xl">Active research projects.</h1>
          <p className="lede">Initiatives where BESSER is being put to work — from EU Horizon programmes to open-source tooling for trustworthy AI.</p>
        </motion.div>
      </section>

      <section className="container-wide pb-20">
        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((p, i) => (
            <motion.article
              key={p.name}
              {...fade}
              transition={{ ...fade.transition, delay: 0.04 * i }}
              className="card card-hover flex flex-col"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-xl font-bold text-ink-900">{p.name}</h3>
                <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">{p.tagline}</span>
              </div>
              <p className="mt-3 text-sm text-ink-600">{p.desc}</p>

              <div className="mt-4 flex items-start gap-2 text-xs text-ink-500">
                <Users className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-70" />
                <span>{p.contributors.join(' · ')}</span>
              </div>

              {p.links.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
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
    </>
  );
}
