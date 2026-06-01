// BESSER website UI kit — pages
const D = window.BESSER_DATA;

function Home({ go }) {
  return (
    <>
      {/* Hero */}
      <section className="bz-hero">
        <div className="bz-hero-grid" />
        <div className="bz-hero-wash" />
        <div className="bz-blob bz-blob-1" />
        <div className="bz-blob bz-blob-2" />
        <div className="bz-container-narrow bz-hero-inner">
          <Reveal as="h1" className="bz-hero-title">
            Better software, <span className="ds-gradient-text">faster</span>.
          </Reveal>
          <Reveal as="p" delay={0.1} className="bz-hero-lede">
            BESSER is an open-source low-code platform to quickly build all types of (smart) applications.
            Model once — generate APIs, databases, agents, and full deployments.
          </Reveal>
          <Reveal delay={0.15} className="bz-hero-cta">
            <Button variant="primary" icon="play-circle" href="https://editor.besser-pearl.org">Start now — open the editor</Button>
            <Button variant="secondary" icon="book-open" href="https://besser.readthedocs.io/en/latest/">Read the docs</Button>
            <Button variant="ghost" icon="github" href="https://github.com/BESSER-PEARL/BESSER">Star on GitHub</Button>
          </Reveal>

          {/* Product frame */}
          <Reveal delay={0.2} className="bz-product-wrap">
            <div className="bz-product-halo" />
            <div className="bz-product">
              <div className="bz-product-chrome">
                <div className="bz-dots">
                  <span style={{ background: 'rgba(248,113,113,.8)' }} />
                  <span style={{ background: 'rgba(251,191,36,.8)' }} />
                  <span style={{ background: 'rgba(52,211,153,.8)' }} />
                </div>
                <div className="bz-product-url">editor.besser-pearl.org</div>
                <div style={{ width: 48 }} />
              </div>
              <div className="bz-product-body">
                <div className="bz-editor-mock">
                  <div className="bz-editor-canvas">
                    <div className="bz-uml-node">
                      <div className="bz-uml-head">Library</div>
                      <div className="bz-uml-row">+ name: str</div>
                      <div className="bz-uml-row">+ address: str</div>
                    </div>
                    <div className="bz-uml-node">
                      <div className="bz-uml-head">Book</div>
                      <div className="bz-uml-row">+ title: str</div>
                      <div className="bz-uml-row">+ pages: int</div>
                    </div>
                  </div>
                  <p className="bz-product-cap">model · generate · deploy — zero install</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Stack strip */}
          <Reveal delay={0.3} className="bz-stack">
            <p className="bz-stack-label">Generates for the stacks you already use</p>
            <div className="bz-pills">
              {D.techStack.map(t => <span key={t} className="bz-pill">{t}</span>)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Feature band */}
      <section className="bz-band">
        <div className="bz-container-wide">
          <Reveal style={{ maxWidth: 640 }}>
            <Eyebrow>What BESSER gives you</Eyebrow>
            <h2 className="bz-h2" style={{ marginTop: 16 }}>A complete low-code toolchain — open, AI-powered, and modular.</h2>
            <p className="bz-lede">From a single model, BESSER produces working software: APIs, databases, full back-ends, AI agents, and deployment manifests.</p>
          </Reveal>
          <div className="bz-grid-4" style={{ marginTop: 48 }}>
            {D.heroFeatures.map((f, i) => (
              <Reveal key={f.title} delay={0.04 * i}><FeatureCard {...f} /></Reveal>
            ))}
          </div>
          <Reveal style={{ marginTop: 40 }}>
            <button className="bz-textlink" onClick={() => go('features')}>See all features <Icon name="arrow-right" size={16} /></button>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="bz-stats-section">
        <div className="bz-container-wide bz-stats">
          {D.stats.map((s, i) => (
            <Reveal key={s.l} delay={0.04 * i} className="bz-stat">
              <div className="bz-stat-n ds-gradient-text">{s.n}</div>
              <div className="bz-stat-l">{s.l}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bz-container-wide" style={{ padding: '96px 32px' }}>
        <Reveal style={{ maxWidth: 640 }}>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="bz-h2" style={{ marginTop: 16 }}>Model once. Generate everything.</h2>
          <p className="bz-lede">From a single, simple model — code, infrastructure, AI agents, and deployments fall out the other side.</p>
        </Reveal>
        <div className="bz-grid-3" style={{ marginTop: 56 }}>
          {D.howItWorks.map((s, i) => (
            <Reveal key={s.n} delay={0.05 * i}>
              <div className="bz-stepnum">{s.n}</div>
              <h3 className="bz-step-t">{s.t}</h3>
              <p className="bz-step-d">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bz-container-wide" style={{ paddingBottom: 96 }}>
        <CTABanner go={go} />
      </section>
    </>
  );
}

function CTABanner({ go }) {
  return (
    <Reveal className="bz-cta">
      <div className="bz-cta-halo" />
      <div style={{ position: 'relative' }}>
        <h2 className="bz-cta-title">Wondering whether BESSER is right for you?</h2>
        <p className="bz-cta-sub">Open the editor and try it in your browser, or talk to us — we love a good problem statement.</p>
        <div className="bz-cta-actions">
          <Button variant="primary" icon="play-circle" href="https://editor.besser-pearl.org">Try BESSER</Button>
          <Button variant="secondary" onClick={() => go('contact')}>Let’s chat</Button>
        </div>
      </div>
    </Reveal>
  );
}

function Features() {
  return (
    <section className="bz-container-wide" style={{ padding: '80px 32px 96px' }}>
      <Reveal style={{ maxWidth: 720 }}>
        <Eyebrow>Features</Eyebrow>
        <h1 className="bz-h1" style={{ marginTop: 16 }}>Everything BESSER gives you, in one place.</h1>
        <p className="bz-lede">A complete, open-source low-code toolchain — from modeling to deployment, with AI baked in.</p>
      </Reveal>
      <div className="bz-grid-3" style={{ marginTop: 56 }}>
        {D.allFeatures.map((f, i) => (
          <Reveal key={f.title} delay={0.025 * (i % 6)}><FeatureCard {...f} /></Reveal>
        ))}
      </div>
    </section>
  );
}

function Services({ go }) {
  return (
    <>
      <section className="bz-container-wide" style={{ padding: '80px 32px 40px' }}>
        <Reveal style={{ maxWidth: 720 }}>
          <Eyebrow>Services</Eyebrow>
          <h1 className="bz-h1" style={{ marginTop: 16 }}>Discover what else BESSER can do for you.</h1>
          <p className="bz-lede">BESSER is <strong style={{ color: 'var(--ink-900)' }}>free and open source</strong> — no freemium, no hidden fees. Below are a few areas where we typically collaborate with research and engineering teams.</p>
        </Reveal>
      </section>
      <section className="bz-container-wide" style={{ paddingBottom: 48 }}>
        <div className="bz-grid-3">
          {D.services.map((s, i) => (
            <Reveal key={s.title} delay={0.05 * i}><FeatureCard {...s} /></Reveal>
          ))}
        </div>
      </section>
      <section className="bz-container-wide" style={{ paddingBottom: 96 }}>
        <Reveal className="bz-cta">
          <div className="bz-cta-halo" />
          <div className="bz-cta-split">
            <div>
              <Eyebrow icon="sparkles">Anything else?</Eyebrow>
              <h2 className="bz-cta-title" style={{ marginTop: 12 }}>Don’t see what you need?</h2>
              <p className="bz-cta-sub">Let’s just have a chat. Tell us your problem — we’ll tell you whether BESSER fits.</p>
            </div>
            <Button variant="primary" icon="message-circle" onClick={() => go('contact')}>Get in touch</Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function Team() {
  return (
    <>
      <section className="bz-container-wide" style={{ padding: '80px 32px 40px' }}>
        <Reveal style={{ maxWidth: 760 }}>
          <Eyebrow>Team</Eyebrow>
          <h1 className="bz-h1" style={{ marginTop: 16 }}>The people behind BESSER.</h1>
          <p className="bz-lede">A research-led team based at the Luxembourg Institute of Science &amp; Technology and SnT / University of Luxembourg, working on the next generation of low-code, AI-assisted software engineering.</p>
        </Reveal>
      </section>
      <section className="bz-container-wide" style={{ paddingBottom: 96 }}>
        <div className="bz-team-grid">
          {D.team.map((m, i) => (
            <Reveal key={m.name} delay={0.015 * (i % 10)}>
              <a className="bz-team-card" href="#" onClick={e => e.preventDefault()}>
                <div className="bz-team-img"><img src={`../../assets/team/${m.photo}`} alt={m.name} loading="lazy" /></div>
                <div className="bz-team-meta">
                  <h3 className="bz-team-name">{m.name}</h3>
                  <span className="bz-team-link">Profile <Icon name="external-link" size={12} /></span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

function Contact() {
  return (
    <section className="bz-container-narrow" style={{ padding: '80px 32px 96px' }}>
      <Reveal>
        <Eyebrow>Contact</Eyebrow>
        <h1 className="bz-h1" style={{ marginTop: 16 }}>Let’s talk.</h1>
        <p className="bz-lede">Questions about BESSER, partnership ideas, research collaborations, or hiring conversations — pick the channel that fits.</p>
      </Reveal>
      <div className="bz-grid-2" style={{ marginTop: 48 }}>
        {[
          { icon: 'message-square', t: 'Open a discussion', d: 'Best for product questions, ideas, and feature requests. The whole team is there.' },
          { icon: 'github', t: 'File a bug', d: 'Reproducible issue? Open it on GitHub. We triage weekly.' },
        ].map((c, i) => (
          <Reveal key={c.t} delay={0.05 * i}>
            <a className="bz-card bz-card-hover" href="#" onClick={e => e.preventDefault()} style={{ display: 'block', textDecoration: 'none' }}>
              <IconChip name={c.icon} />
              <h3 className="bz-card-title">{c.t}</h3>
              <p className="bz-card-desc">{c.d}</p>
            </a>
          </Reveal>
        ))}
      </div>
      <Reveal style={{ marginTop: 40 }}>
        <div className="bz-card" style={{ padding: 24 }}>
          <div className="bz-grid-2">
            <div>
              <IconChip name="mail" />
              <h3 className="bz-card-title">Email</h3>
              <p className="bz-card-desc">For partnerships, press, and serious inquiries.</p>
              <p className="ds-mono" style={{ marginTop: 12 }}>contact@besser-pearl.org</p>
            </div>
            <div>
              <IconChip name="map-pin" />
              <h3 className="bz-card-title">Where we are</h3>
              <p className="bz-card-desc">Luxembourg Institute of Science &amp; Technology (LIST)<br />Belval, Esch-sur-Alzette · Luxembourg</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Research() {
  const projects = [
    { name: 'CLIMABOROUGH', tag: 'Low-code to fight climate change', desc: 'EU Horizon project bridging the gap between design and implementation of urban innovations. BESSER powers smart-city dashboards for real-time urban-data monitoring.' },
    { name: '6G-TWIN', tag: 'Network digital twins for AI-driven 6G', desc: 'EU Horizon project (€4M, 2024–2026) coordinated by LIST with 11 partners — integrating network digital twins into AI-driven 6G systems.' },
    { name: 'LangBiTe', tag: 'Open-source bias testing for LLMs', desc: 'An open-source platform to automate bias testing of large language models. Published in Software X, vol. 31.' },
    { name: 'Digital Product Passport', tag: 'Data interoperability for circular economy', desc: 'A model-driven approach for designing and operating Digital Product Passport ecosystems with strong data interoperability guarantees.' },
  ];
  return (
    <section className="bz-container-wide" style={{ padding: '80px 32px 96px' }}>
      <Reveal style={{ maxWidth: 760 }}>
        <Eyebrow>Research</Eyebrow>
        <h1 className="bz-h1" style={{ marginTop: 16 }}>Research that ships as software.</h1>
        <p className="bz-lede">BESSER is built in the open by a research team. Active EU Horizon projects and peer-reviewed work feed directly back into the platform.</p>
      </Reveal>
      <div className="bz-grid-2" style={{ marginTop: 56 }}>
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={0.05 * (i % 4)}>
            <article className="bz-card bz-card-hover">
              <div className="bz-research-name">{p.name}</div>
              <div className="bz-research-tag">{p.tag}</div>
              <p className="bz-card-desc" style={{ marginTop: 12 }}>{p.desc}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { Home, Features, Services, Team, Contact, Research });
