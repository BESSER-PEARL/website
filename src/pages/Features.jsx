import { motion } from 'framer-motion';
import { allFeatures } from '../data/features';

const fade = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.4 },
};

export default function Features() {
  return (
    <section className="container-wide py-24">
      <motion.div {...fade} className="max-w-3xl">
        <span className="section-eyebrow">Features</span>
        <h1 className="h2 mt-4 text-4xl sm:text-5xl">Everything BESSER gives you, in one place.</h1>
        <p className="lede">A complete, open-source low-code toolchain — from modeling to deployment, with AI baked in.</p>
      </motion.div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {allFeatures.map((f, i) => (
          <motion.article
            key={f.title}
            {...fade}
            transition={{ ...fade.transition, delay: 0.025 * (i % 6) }}
            className="card card-hover"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <f.icon className="h-5 w-5" />
            </div>
            <h2 className="mt-5 font-display text-lg font-semibold text-ink-900" dangerouslySetInnerHTML={{ __html: f.title }} />
            <p className="mt-2 text-sm leading-relaxed text-ink-600">{f.desc}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
