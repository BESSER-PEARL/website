import { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Github, ExternalLink, ChevronDown } from 'lucide-react';

const items = [
  { to: '/',         label: 'Home', end: true },
  { to: '/features', label: 'Features' },
  { to: '/services', label: 'Services' },
];

const itemsAfter = [
  { to: '/team',    label: 'Team' },
  { to: '/contact', label: 'Contact' },
];

const researchLinks = [
  { to: '/research/publications', label: 'Publications', desc: 'Peer-reviewed papers' },
  { to: '/research/projects',     label: 'Projects',     desc: 'Active research initiatives' },
];

const learnLinks = [
  { href: 'https://besser.readthedocs.io/en/latest/', label: 'Docs', desc: 'API reference & guides' },
  { href: 'https://modeling-languages.com/',          label: 'Blog', desc: 'Articles from the team' },
  { href: 'https://lowcode-book.com/',                label: 'Book', desc: 'The low-code companion' },
];

function navLinkClass({ isActive }) {
  return [
    'rounded-lg px-3 py-2 text-sm font-medium transition',
    isActive
      ? 'text-brand-700'
      : 'text-ink-600 hover:text-ink-900 hover:bg-ink-100',
  ].join(' ');
}

function Dropdown({ label, isActive, children }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={[
          'inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition',
          isActive
            ? 'text-brand-700'
            : 'text-ink-600 hover:text-ink-900 hover:bg-ink-100',
        ].join(' ')}
      >
        {label}
        <ChevronDown className={['h-3.5 w-3.5 opacity-70 transition', open ? 'rotate-180' : ''].join(' ')} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-1/2 top-full z-50 mt-1 w-64 -translate-x-1/2 rounded-xl border border-ink-200/80 bg-white p-2 shadow-lg shadow-ink-900/5"
        >
          {children({ close: () => setOpen(false) })}
        </div>
      )}
    </div>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileResearchOpen, setMobileResearchOpen] = useState(false);
  const [mobileLearnOpen, setMobileLearnOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const researchActive = location.pathname.startsWith('/research');

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
            <NavLink key={it.to} to={it.to} end={it.end} className={navLinkClass}>
              {it.label}
            </NavLink>
          ))}

          <Dropdown label="Research" isActive={researchActive}>
            {({ close }) => (
              <>
                {researchLinks.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={close}
                    className={({ isActive }) =>
                      [
                        'block rounded-lg px-3 py-2 text-sm transition',
                        isActive
                          ? 'bg-brand-50 text-brand-700'
                          : 'text-ink-700 hover:bg-ink-100',
                      ].join(' ')
                    }
                  >
                    <div className="font-medium">{l.label}</div>
                    <div className="text-xs text-ink-500">{l.desc}</div>
                  </NavLink>
                ))}
              </>
            )}
          </Dropdown>

          {itemsAfter.map((it) => (
            <NavLink key={it.to} to={it.to} className={navLinkClass}>
              {it.label}
            </NavLink>
          ))}

          <span className="mx-2 h-5 w-px bg-ink-200" />

          <Dropdown label="Learn" isActive={false}>
            {() => (
              <>
                {learnLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener"
                    className="flex items-start justify-between gap-3 rounded-lg px-3 py-2 text-sm text-ink-700 transition hover:bg-ink-100"
                  >
                    <div>
                      <div className="font-medium">{l.label}</div>
                      <div className="text-xs text-ink-500">{l.desc}</div>
                    </div>
                    <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 opacity-60" />
                  </a>
                ))}
              </>
            )}
          </Dropdown>
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
                end={it.end}
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

            {/* Research group */}
            <button
              type="button"
              onClick={() => setMobileResearchOpen((o) => !o)}
              aria-expanded={mobileResearchOpen}
              className={[
                'flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium',
                researchActive ? 'bg-brand-50 text-brand-700' : 'text-ink-700 hover:bg-ink-100',
              ].join(' ')}
            >
              Research
              <ChevronDown className={['h-4 w-4 transition', mobileResearchOpen ? 'rotate-180' : ''].join(' ')} />
            </button>
            {mobileResearchOpen && (
              <div className="ml-3 mt-1 flex flex-col border-l border-ink-200 pl-3">
                {researchLinks.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    className={({ isActive }) =>
                      [
                        'rounded-lg px-3 py-2 text-sm font-medium',
                        isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-700 hover:bg-ink-100',
                      ].join(' ')
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
              </div>
            )}

            {itemsAfter.map((it) => (
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

            {/* Learn group */}
            <button
              type="button"
              onClick={() => setMobileLearnOpen((o) => !o)}
              aria-expanded={mobileLearnOpen}
              className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-ink-700 hover:bg-ink-100"
            >
              Learn
              <ChevronDown className={['h-4 w-4 transition', mobileLearnOpen ? 'rotate-180' : ''].join(' ')} />
            </button>
            {mobileLearnOpen && (
              <div className="ml-3 mt-1 flex flex-col border-l border-ink-200 pl-3">
                {learnLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener"
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-100"
                  >
                    {l.label}
                    <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                  </a>
                ))}
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
