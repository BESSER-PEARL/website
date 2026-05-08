import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Github, PlayCircle } from 'lucide-react';
import { heroFeatures, techStack } from '../data/features';

const fade = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: 'easeOut' },
};

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 grid-bg opacity-70" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-white to-brand-50/50" />
        <div className="absolute -top-32 left-1/2 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-br from-brand-200/40 via-brand-100/30 to-transparent blur-3xl" />

        <div className="container-narrow pt-20 pb-24 sm:pt-28 sm:pb-32">
          <motion.h1
            {...fade}
            className="mx-auto max-w-4xl text-center font-display text-5xl font-bold tracking-tight text-ink-900 sm:text-6xl lg:text-7xl"
          >
            Better software,{' '}
            <span className="bg-gradient-to-br from-brand-500 to-brand-700 bg-clip-text text-transparent">
              faster
            </span>
            .
          </motion.h1>

          <motion.p
            {...fade}
            transition={{ ...fade.transition, delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-center text-lg text-ink-600 sm:text-xl"
          >
            BESSER is an open-source low-code platform to quickly build all types of (smart) applications.
            Model once — generate APIs, databases, agents, and full deployments.
          </motion.p>

          <motion.div
            {...fade}
            transition={{ ...fade.transition, delay: 0.15 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <a href="https://editor.besser-pearl.org" target="_blank" rel="noopener" className="btn-primary">
              <PlayCircle className="h-4 w-4" /> Start now — open the editor
            </a>
            <a href="https://besser.readthedocs.io/en/latest/" target="_blank" rel="noopener" className="btn-secondary">
              <BookOpen className="h-4 w-4" /> Read the docs
            </a>
            <a href="https://github.com/BESSER-PEARL/BESSER" target="_blank" rel="noopener" className="btn-ghost">
              <Github className="h-4 w-4" /> Star on GitHub
            </a>
          </motion.div>

          {/* Editor video */}
          <motion.div
            {...fade}
            transition={{ ...fade.transition, delay: 0.2 }}
            className="mt-14"
          >
            <div className="relative mx-auto max-w-5xl">
              <div className="absolute -inset-x-10 -inset-y-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-brand-200/40 via-brand-100/30 to-transparent blur-2xl" />
              <div className="overflow-hidden rounded-2xl border border-ink-200 bg-ink-900 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.35)]">
                {/* Window chrome */}
                <div className="flex items-center justify-between border-b border-white/5 bg-ink-900/70 px-4 py-2.5">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="font-mono text-[11px] text-white/50">editor.besser-pearl.org</div>
                  <div className="w-12" />
                </div>
                <video
                  className="block w-full"
                  src={import.meta.env.BASE_URL + 'media/editor.mp4'}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="BESSER online editor in action"
                />
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-ink-500">
              The BESSER online editor — model, generate, deploy. Zero install.
            </p>
          </motion.div>

          {/* Stack strip */}
          <motion.div
            {...fade}
            transition={{ ...fade.transition, delay: 0.3 }}
            className="mt-20"
          >
            <p className="text-center text-xs font-medium uppercase tracking-wider text-ink-500">
              Generates for the stacks you already use
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {techStack.map((t) => (
                <span key={t} className="rounded-full border border-ink-200 bg-white px-3 py-1.5 text-sm text-ink-700">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="border-y border-ink-200/70 bg-ink-50/40">
        <div className="container-wide py-20">
          <motion.div {...fade} className="max-w-2xl">
            <span className="section-eyebrow">What BESSER gives you</span>
            <h2 className="h2 mt-4">A complete low-code toolchain — open, AI-powered, and modular.</h2>
            <p className="lede">From a single model, BESSER produces working software: APIs, databases, full back-ends, AI agents, and deployment manifests.</p>
          </motion.div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {heroFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                {...fade}
                transition={{ ...fade.transition, delay: 0.04 * i }}
                className="card card-hover"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-ink-900">{f.title}</h3>
                <p className="mt-2 text-sm text-ink-600">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fade} className="mt-10">
            <Link to="/features" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800">
              See all features <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 3 columns explainer */}
      <section className="container-wide py-24">
        <motion.div {...fade} className="max-w-2xl">
          <span className="section-eyebrow">How it works</span>
          <h2 className="h2 mt-4">Model once. Generate everything.</h2>
        </motion.div>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {[
            { n: '01', t: 'Model-based', d: 'Model all aspects of your software system in the same tool — class diagrams, state machines, agents, deployment specs.' },
            { n: '02', t: 'No installation', d: 'Use our online editor to model, generate, and deploy. Nothing to install. Free forever.' },
            { n: '03', t: 'Customizable',   d: 'All aspects of BESSER can be tailored to your needs — generators, modeling languages, even the editor.' },
          ].map((s, i) => (
            <motion.div key={s.n} {...fade} transition={{ ...fade.transition, delay: 0.05 * i }}>
              <div className="font-mono text-xs font-medium tracking-widest text-brand-600">{s.n}</div>
              <h3 className="mt-3 font-display text-2xl font-semibold text-ink-900">{s.t}</h3>
              <p className="mt-3 text-ink-600">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="container-wide pb-24">
        <motion.div
          {...fade}
          className="relative overflow-hidden rounded-3xl border border-brand-200/50 bg-gradient-to-br from-brand-50 via-white to-brand-50 p-10 sm:p-14"
        >
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
              Wondering whether BESSER is right for you?
            </h2>
            <p className="mt-3 max-w-xl text-ink-600">
              Open the editor and try it in your browser, or talk to us — we love a good problem statement.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://editor.besser-pearl.org" target="_blank" rel="noopener" className="btn-primary">
                <PlayCircle className="h-4 w-4" /> Try BESSER
              </a>
              <Link to="/contact" className="btn-secondary">
                Let’s chat
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
