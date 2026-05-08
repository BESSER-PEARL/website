import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { team } from '../data/team';

const fade = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.35 },
};

export default function Team() {
  return (
    <>
      <section className="container-wide pt-20 pb-10">
        <motion.div {...fade} className="max-w-3xl">
          <span className="section-eyebrow">Team</span>
          <h1 className="h2 mt-4 text-4xl sm:text-5xl">The people behind BESSER.</h1>
          <p className="lede">A research-led team based at the Luxembourg Institute of Science &amp; Technology and SnT / University of Luxembourg, working on the next generation of low-code, AI-assisted software engineering.</p>
        </motion.div>
      </section>

      <section className="container-wide pb-24">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {team.map((m, i) => (
            <motion.a
              key={m.name}
              href={m.link}
              target="_blank"
              rel="noopener"
              {...fade}
              transition={{ ...fade.transition, delay: 0.015 * (i % 10) }}
              className="group card card-hover overflow-hidden p-0"
            >
              <div className="aspect-square overflow-hidden bg-ink-100">
                <img
                  src={import.meta.env.BASE_URL + m.photo.replace(/^\//, '')}
                  alt={m.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-4">
                <h3 className="font-display text-sm font-semibold text-ink-900 group-hover:text-brand-700">
                  {m.name}
                </h3>
                <span className="mt-1 inline-flex items-center gap-1 text-xs text-ink-500">
                  Profile <ExternalLink className="h-3 w-3" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      <section className="container-wide pb-24">
        <div className="card flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink-900">We&rsquo;re hiring &amp; collaborating.</h2>
            <p className="mt-2 max-w-xl text-ink-600">
              Interested in low-code, model-driven engineering, generative AI, or AI agents? Reach out — we host PhDs, interns, postdocs, and collaborate on EU projects.
            </p>
          </div>
          <a href="/contact" className="btn-primary">Get in touch</a>
        </div>
      </section>
    </>
  );
}
