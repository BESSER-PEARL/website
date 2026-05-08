import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Github, ExternalLink } from 'lucide-react';

const items = [
  { to: '/features', label: 'Features' },
  { to: '/services', label: 'Services' },
  { to: '/research', label: 'Research' },
  { to: '/team',     label: 'Team' },
  { to: '/contact',  label: 'Contact' },
];

const externals = [
  { href: 'https://besser.readthedocs.io/en/latest/', label: 'Docs' },
  { href: 'https://modeling-languages.com/',          label: 'Blog' },
  { href: 'https://lowcode-book.com/',                label: 'Book' },
];

export default function Nav() {
  const [open, setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        'sticky top-0 z-40 w-full transition',
        scrolled
          ? 'border-b border-ink-200/80 bg-white/80 backdrop-blur'
          : 'border-b border-transparent bg-transparent',
      ].join(' ')}
    >
      <div className="container-wide flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center" aria-label="BESSER home">
          <img
            src={import.meta.env.BASE_URL + 'brand/besser_logo.webp'}
            alt="BESSER"
            className="h-9 w-auto"
            decoding="async"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              className={({ isActive }) =>
                [
                  'rounded-lg px-3 py-2 text-sm font-medium transition',
                  isActive
                    ? 'text-brand-700'
                    : 'text-ink-600 hover:text-ink-900 hover:bg-ink-100',
                ].join(' ')
              }
            >
              {it.label}
            </NavLink>
          ))}
          <span className="mx-2 h-5 w-px bg-ink-200" />
          {externals.map((e) => (
            <a
              key={e.href}
              href={e.href}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-ink-600 hover:bg-ink-100 hover:text-ink-900"
            >
              {e.label}
              <ExternalLink className="h-3.5 w-3.5 opacity-60" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/BESSER-PEARL/BESSER"
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
            className="hidden h-10 w-10 items-center justify-center rounded-lg text-ink-600 hover:bg-ink-100 hover:text-ink-900 sm:inline-flex"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://editor.besser-pearl.org"
            target="_blank"
            rel="noopener"
            className="btn-primary py-2.5 text-sm"
          >
            Try BESSER
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-700 hover:bg-ink-100 md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-ink-200/80 bg-white md:hidden">
          <nav className="container-wide flex flex-col py-3">
            {items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                className={({ isActive }) =>
                  [
                    'rounded-lg px-3 py-3 text-sm font-medium',
                    isActive
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-ink-700 hover:bg-ink-100',
                  ].join(' ')
                }
              >
                {it.label}
              </NavLink>
            ))}
            <hr className="my-2 border-ink-200" />
            {externals.map((e) => (
              <a
                key={e.href}
                href={e.href}
                target="_blank"
                rel="noopener"
                className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-ink-700 hover:bg-ink-100"
              >
                {e.label}
                <ExternalLink className="h-3.5 w-3.5 opacity-60" />
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
