import { motion } from 'framer-motion';
import { Github, Mail, MapPin, MessageSquare } from 'lucide-react';

const fade = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.4 },
};

export default function Contact() {
  return (
    <section className="container-narrow py-24">
      <motion.div {...fade}>
        <span className="section-eyebrow">Contact</span>
        <h1 className="h2 mt-4 text-4xl sm:text-5xl">Let&rsquo;s talk.</h1>
        <p className="lede">
          Questions about BESSER, partnership ideas, research collaborations, or hiring conversations — pick the channel that fits.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <motion.a
          {...fade}
          href="https://github.com/BESSER-PEARL/BESSER/discussions"
          target="_blank"
          rel="noopener"
          className="card card-hover"
        >
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <MessageSquare className="h-5 w-5" />
          </div>
          <h3 className="mt-5 font-display text-lg font-semibold">Open a discussion</h3>
          <p className="mt-2 text-sm text-ink-600">Best for product questions, ideas, and feature requests. The whole team is there.</p>
        </motion.a>

        <motion.a
          {...fade}
          href="https://github.com/BESSER-PEARL/BESSER/issues/new"
          target="_blank"
          rel="noopener"
          className="card card-hover"
        >
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <Github className="h-5 w-5" />
          </div>
          <h3 className="mt-5 font-display text-lg font-semibold">File a bug</h3>
          <p className="mt-2 text-sm text-ink-600">Reproducible issue? Open it on GitHub. We triage weekly.</p>
        </motion.a>
      </div>

      <motion.div {...fade} className="mt-10 card">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold">Email</h3>
            <p className="mt-1 text-sm text-ink-600">For partnerships, press, and serious inquiries.</p>
            <p className="mt-3 font-mono text-sm text-ink-900">contact@besser-pearl.org</p>
          </div>
          <div>
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <MapPin className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold">Where we are</h3>
            <p className="mt-1 text-sm text-ink-600">
              Luxembourg Institute of Science &amp; Technology (LIST)<br />
              Belval, Esch-sur-Alzette · Luxembourg
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
