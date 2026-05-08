import { Link } from 'react-router-dom';
import { Github, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-ink-50/60">
      <div className="container-wide grid gap-10 py-14 md:grid-cols-4">
        <div>
          <Link to="/" className="inline-flex items-center" aria-label="BESSER home">
            <img
              src={import.meta.env.BASE_URL + 'brand/besser_logo.webp'}
              alt="BESSER"
              className="h-9 w-auto"
              decoding="async"
            />
          </Link>
          <p className="mt-4 max-w-xs text-sm text-ink-600">
            An open-source low-code platform for building smart, AI-enhanced applications faster.
          </p>
          <div className="mt-5 flex items-center gap-2">
            <a className="rounded-lg p-2 text-ink-600 hover:bg-ink-100 hover:text-ink-900" href="https://github.com/BESSER-PEARL" target="_blank" rel="noopener" aria-label="GitHub"><Github className="h-5 w-5" /></a>
            <a className="rounded-lg p-2 text-ink-600 hover:bg-ink-100 hover:text-ink-900" href="https://www.linkedin.com/company/besser-pearl" target="_blank" rel="noopener" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
            <a className="rounded-lg p-2 text-ink-600 hover:bg-ink-100 hover:text-ink-900" href="https://www.youtube.com/@BESSER-PEARL" target="_blank" rel="noopener" aria-label="YouTube"><Youtube className="h-5 w-5" /></a>
          </div>
        </div>

        <FooterCol title="Product" links={[
          { to: '/features',     label: 'Features' },
          { to: '/services',     label: 'Services' },
          { href: 'https://editor.besser-pearl.org',         label: 'Online editor', external: true },
          { href: 'https://besser.readthedocs.io/en/latest/', label: 'Documentation', external: true },
          { href: 'https://github.com/BESSER-PEARL/BESSER',   label: 'Source code',   external: true },
        ]} />

        <FooterCol title="Resources" links={[
          { href: 'https://modeling-languages.com/',   label: 'Blog',               external: true },
          { href: 'https://lowcode-book.com/',         label: 'Low-code Handbook',  external: true },
          { to: '/research',                            label: 'Research' },
        ]} />

        <FooterCol title="Project" links={[
          { to: '/team',     label: 'Team' },
          { to: '/contact',  label: 'Contact' },
          { href: 'https://www.list.lu/',                            label: 'LIST',  external: true },
          { href: 'https://www.fnr.lu/',                             label: 'FNR',   external: true },
        ]} />
      </div>

      <div className="border-t border-ink-200/80">
        <div className="container-wide flex flex-col items-start justify-between gap-3 py-6 text-xs text-ink-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} BESSER · Open source under MIT.</p>
          <p>Funded by <a className="hover:text-ink-700" href="https://www.fnr.lu/" target="_blank" rel="noopener">FNR PEARL</a> at the <a className="hover:text-ink-700" href="https://www.list.lu/" target="_blank" rel="noopener">Luxembourg Institute of Science &amp; Technology</a>.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-ink-900">{title}</h4>
      <ul className="mt-4 space-y-2">
        {links.map((l) => (
          <li key={l.to || l.href}>
            {l.to ? (
              <Link className="text-sm text-ink-600 hover:text-ink-900" to={l.to}>{l.label}</Link>
            ) : (
              <a className="text-sm text-ink-600 hover:text-ink-900" href={l.href} target="_blank" rel="noopener">{l.label}</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
