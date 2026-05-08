import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Settings2, Shuffle, GraduationCap, MessageCircle, Sparkles } from 'lucide-react';

const fade = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.4 },
};

const services = [
  {
    icon: Settings2,
    title: 'Adaptation & configuration',
    desc: 'Customization assistance for domain-specific needs and technology stacks — including code-generator tuning and adding new DSL modeling languages.',
  },
  {
    icon: Shuffle,
    title: 'Low-code migration',
    desc: 'Migration assistance between low-code platforms using BESSER as an intermediary. Unify project management across heterogeneous tools.',
  },
  {
    icon: GraduationCap,
    title: 'Teaching low-code',
    desc: 'Custom training programs and seminars covering low-code development phases and software modeling — for teams transitioning to low-code.',
  },
];

export default function Services() {
  return (
    <>
      <section className="container-wide pt-20 pb-10">
        <motion.div {...fade} className="max-w-3xl">
          <span className="section-eyebrow">Services</span>
          <h1 className="h2 mt-4 text-4xl sm:text-5xl">Discover what else BESSER can do for you.</h1>
          <p className="lede">
            BESSER is <strong className="text-ink-900">free and open source</strong> — no freemium, no hidden fees.
            Below are a few areas where we typically collaborate with research and engineering teams. If your situation is different, just reach out.
          </p>
        </motion.div>
      </section>

      <section className="container-wide pb-12">
        <div className="grid gap-5 md:grid-cols-3">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              {...fade}
              transition={{ ...fade.transition, delay: 0.05 * i }}
              className="card card-hover h-full"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <s.icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-display text-lg font-semibold text-ink-900">{s.title}</h2>
              <p className="mt-2 text-sm text-ink-600">{s.desc}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="container-wide pb-24">
        <motion.div
          {...fade}
          className="relative overflow-hidden rounded-3xl border border-brand-200/50 bg-gradient-to-br from-brand-50 via-white to-brand-50 p-10 sm:p-14"
        >
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="section-eyebrow"><Sparkles className="h-3.5 w-3.5" /> Anything else?</span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
                Don&rsquo;t see what you need?
              </h2>
              <p className="mt-2 max-w-xl text-ink-600">Let&rsquo;s just have a chat. Tell us your problem — we&rsquo;ll tell you whether BESSER fits.</p>
            </div>
            <Link to="/contact" className="btn-primary self-start sm:self-auto">
              <MessageCircle className="h-4 w-4" /> Get in touch
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
