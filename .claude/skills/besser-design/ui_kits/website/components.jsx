// BESSER website UI kit — shared components
const { useState, useEffect, useRef } = React;

// ---- Lucide icon as a React component ----
function Icon({ name, size = 20, color, style, className }) {
  const ref = useRef(null);
  useEffect(() => {
    const host = ref.current;
    if (!host || !window.lucide) return;
    host.innerHTML = '';
    const i = document.createElement('i');
    i.setAttribute('data-lucide', name);
    host.appendChild(i);
    window.lucide.createIcons();
    const svg = host.querySelector('svg');
    if (svg) {
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);
      svg.style.display = 'block';
    }
  }, [name, size]);
  return <span ref={ref} className={className} style={{ display: 'inline-flex', color, ...style }} />;
}

// ---- Scroll reveal (fade up) ----
function Reveal({ children, delay = 0, as = 'div', className, style }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { rootMargin: '-60px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  return (
    <Tag ref={ref} className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity .5s var(--ease-out) ${delay}s, transform .5s var(--ease-out) ${delay}s`,
        ...style,
      }}>
      {children}
    </Tag>
  );
}

// ---- Button ----
function Button({ variant = 'primary', icon, iconRight, children, onClick, href }) {
  const cls = `bz-btn bz-btn-${variant}`;
  const inner = (
    <>
      {icon && <Icon name={icon} size={16} />}
      {children}
      {iconRight && <Icon name={iconRight} size={16} />}
    </>
  );
  if (href) return <a className={cls} href={href} target="_blank" rel="noopener" onClick={onClick}>{inner}</a>;
  return <button className={cls} onClick={onClick}>{inner}</button>;
}

// ---- Eyebrow ----
function Eyebrow({ icon, children }) {
  return (
    <span className="bz-eyebrow">
      {icon && <Icon name={icon} size={14} />}
      {children}
    </span>
  );
}

// ---- Icon chip ----
function IconChip({ name }) {
  return <div className="bz-chip"><Icon name={name} size={20} /></div>;
}

// ---- Feature card ----
function FeatureCard({ icon, title, desc, hover = true }) {
  return (
    <article className={`bz-card ${hover ? 'bz-card-hover' : ''}`}>
      <IconChip name={icon} />
      <h3 className="bz-card-title">{title}</h3>
      <p className="bz-card-desc">{desc}</p>
    </article>
  );
}

// ---- Nav ----
function Nav({ page, go }) {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const scroller = document.querySelector('.bz-scroll');
    if (!scroller) return;
    const onScroll = () => setScrolled(scroller.scrollTop > 8);
    scroller.addEventListener('scroll', onScroll, { passive: true });
    return () => scroller.removeEventListener('scroll', onScroll);
  }, []);

  const items = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'services', label: 'Services' },
  ];
  const after = [
    { id: 'team', label: 'Team' },
    { id: 'contact', label: 'Contact' },
  ];

  const navlink = (it) => (
    <button key={it.id}
      className={`bz-navlink ${page === it.id ? 'is-active' : ''}`}
      onClick={() => { go(it.id); setMobile(false); }}>
      {it.label}
    </button>
  );

  return (
    <header className={`bz-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="bz-nav-inner">
        <button className="bz-logo" onClick={() => go('home')} aria-label="BESSER home">
          <img src="../../assets/besser_logo.webp" alt="BESSER" />
        </button>

        <nav className="bz-nav-links">
          {items.map(navlink)}
          <div className="bz-dd"
            onMouseEnter={() => setOpenMenu('research')}
            onMouseLeave={() => setOpenMenu(null)}>
            <button className={`bz-navlink ${page === 'research' ? 'is-active' : ''}`}>
              Research <Icon name="chevron-down" size={14} style={{ opacity: .6 }} />
            </button>
            {openMenu === 'research' && (
              <div className="bz-dd-menu">
                <button className="bz-dd-item" onClick={() => { go('research'); setOpenMenu(null); }}>
                  <div className="bz-dd-label">Publications</div>
                  <div className="bz-dd-desc">Peer-reviewed papers</div>
                </button>
                <button className="bz-dd-item" onClick={() => { go('research'); setOpenMenu(null); }}>
                  <div className="bz-dd-label">Projects</div>
                  <div className="bz-dd-desc">Active research initiatives</div>
                </button>
              </div>
            )}
          </div>
          {after.map(navlink)}
          <span className="bz-nav-sep" />
          <div className="bz-dd"
            onMouseEnter={() => setOpenMenu('learn')}
            onMouseLeave={() => setOpenMenu(null)}>
            <button className="bz-navlink">
              Learn <Icon name="chevron-down" size={14} style={{ opacity: .6 }} />
            </button>
            {openMenu === 'learn' && (
              <div className="bz-dd-menu">
                {[['Docs', 'API reference & guides'], ['Blog', 'Articles from the team'], ['Book', 'The low-code companion']].map(([l, d]) => (
                  <a key={l} className="bz-dd-item" href="#" onClick={(e) => e.preventDefault()}>
                    <div className="bz-dd-row">
                      <div>
                        <div className="bz-dd-label">{l}</div>
                        <div className="bz-dd-desc">{d}</div>
                      </div>
                      <Icon name="external-link" size={14} style={{ opacity: .6, marginTop: 2 }} />
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="bz-nav-right">
          <a className="bz-nav-gh" href="https://github.com/BESSER-PEARL/BESSER" target="_blank" rel="noopener" aria-label="GitHub">
            <Icon name="github" size={20} />
          </a>
          <Button variant="primary" href="https://editor.besser-pearl.org">Try BESSER</Button>
          <button className="bz-burger" onClick={() => setMobile(m => !m)} aria-label="Menu">
            <Icon name={mobile ? 'x' : 'menu'} size={20} />
          </button>
        </div>
      </div>

      {mobile && (
        <div className="bz-mobile">
          {[...items, ...after].map(it => (
            <button key={it.id} className={`bz-mobile-link ${page === it.id ? 'is-active' : ''}`}
              onClick={() => { go(it.id); setMobile(false); }}>{it.label}</button>
          ))}
        </div>
      )}
    </header>
  );
}

// ---- Footer ----
function Footer({ go }) {
  const cols = [
    { title: 'Product', links: [['Features', () => go('features')], ['Services', () => go('services')], ['Online editor'], ['Documentation'], ['Source code']] },
    { title: 'Resources', links: [['Blog'], ['Low-code Handbook'], ['Research', () => go('research')]] },
    { title: 'Project', links: [['Team', () => go('team')], ['Contact', () => go('contact')], ['LIST'], ['FNR']] },
  ];
  return (
    <footer className="bz-footer">
      <div className="bz-footer-grid">
        <div>
          <button className="bz-logo" onClick={() => go('home')}><img src="../../assets/besser_logo.webp" alt="BESSER" style={{ height: 30 }} /></button>
          <p className="bz-footer-blurb">An open-source low-code platform for building smart, AI-enhanced applications faster.</p>
          <div className="bz-footer-social">
            {['github', 'linkedin', 'youtube'].map(n => (
              <a key={n} href="#" onClick={e => e.preventDefault()} aria-label={n}><Icon name={n} size={18} /></a>
            ))}
          </div>
        </div>
        {cols.map(c => (
          <div key={c.title}>
            <h4 className="bz-footer-h">{c.title}</h4>
            <ul className="bz-footer-list">
              {c.links.map(([label, fn]) => (
                <li key={label}><button className="bz-footer-link" onClick={fn || (() => {})}>{label}</button></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="bz-footer-bar">
        <div className="bz-footer-barwrap">
          <p>© {new Date().getFullYear()} BESSER · Open source under MIT.</p>
          <p>Funded by FNR PEARL at the Luxembourg Institute of Science &amp; Technology.</p>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Icon, Reveal, Button, Eyebrow, IconChip, FeatureCard, Nav, Footer });
