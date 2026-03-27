import { useState, useEffect, useRef } from 'react'
import {
  Calendar, Users, Trophy, Rocket, Bot, Leaf, GraduationCap,
  Handshake, BookOpen, ChevronRight, MapPin, Mail, ExternalLink,
  ArrowRight, Cpu, Globe, Zap, ChevronLeft, CheckCircle2, Menu, X, Phone
} from 'lucide-react'
import './index.css'

// ─── SOCIAL ICONS (SVG inline, pas de dépendance) ────────────────────────────

function SocialIcon({ name, size = 16 }) {
  const paths = {
    twitter: (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    linkedin: (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    instagram: (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    facebook: (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  }
  return paths[name] ?? null
}

// ─── CONFIG ───────────────────────────────────────────────────────────────────
// Remplace par l'URL de ton déploiement Apps Script
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyUcGXqQ2gbEfQmkA5Uyt9SqmRIcjoO5TV-BaHIJbsAQwWsbzS7CiEgor3ex_C7NUVk/exec'

// ─── DATA ─────────────────────────────────────────────────────────────────────

const STATS = [
  { num: '5',   label: 'Days of Immersion' },
  { num: '40+', label: 'Young Participants' },
  { num: '10',  label: 'Innovation Teams' },
  { num: '3',   label: 'Impact Domains' },
]

const FEATURES = [
  { icon: Bot,          label: 'AI & Data Literacy Workshops' },
  { icon: Trophy,       label: 'Social Good Challenge (Hackathon)' },
  { icon: Leaf,         label: 'Agriculture & Health AI' },
  { icon: GraduationCap,label: 'Mentorship & Coaching' },
  { icon: Rocket,       label: 'Open-Source Digital Toolkit' },
  { icon: Handshake,    label: 'Reciprocal US–Cameroon Exchange' },
]

const TESTIMONIALS = [
  {
    quote: "This program is a unique opportunity for young Cameroonians to develop concrete AI solutions that address the real challenges of our country.",
    name: 'Prof. Aimé Takoukam',
    role: 'ENSPD – École Nationale Supérieure Polytechnique de Douala',
    initials: 'AT',
  },
  {
    quote: "Georgia State University is proud of this partnership. We believe that youth-driven innovation can transform healthcare and education systems across Africa.",
    name: 'Dr. Sarah Mitchell',
    role: 'Innovation Center, Georgia State University',
    initials: 'SM',
  },
  {
    quote: "The reciprocal exchanges between our institutions embody the educational diplomacy mission of the Embassy. We fully support this initiative.",
    name: 'James Whitfield',
    role: 'U.S. Embassy Cameroon',
    initials: 'JW',
  },
  {
    quote: "Georgia Tech is excited to collaborate on AI for social good in Africa. The potential of these young innovators is immense and inspiring.",
    name: 'Prof. Ana Rodrigues',
    role: 'Georgia Institute of Technology',
    initials: 'AR',
  },
]

const SERVICES = [
  {
    icon: Cpu,
    title: 'AI & Data Literacy Workshops',
    body: 'Interactive training sessions led by experts from Georgia State and Georgia Tech. Covers Python, PyTorch, TFLite and AI applications adapted to the African low-resource context.',
  },
  {
    icon: Zap,
    title: 'AI for Social Good Challenge',
    body: '3-day hackathon where teams develop functional AI prototypes for health, agriculture and education. Awards presented at the final public Showcase.',
  },
  {
    icon: BookOpen,
    title: 'Mentorship & Entrepreneurship Coaching',
    body: 'Mentoring sessions with American and Cameroonian professionals. Focus on the prototype-to-product trajectory and open-source code repositories on GitHub.',
  },
]

const DOMAINS = [
  'Cameroonian Agriculture', 'Rural Health', 'Bilingual Education', 'Cybersecurity',
  'Telemedicine', 'AgriTech', 'EdTech', 'Disease Detection', 'Local Weather Forecasting',
  'Mobile Fintech', 'Bassa/Bamiléké Language AI', 'IoT Clean Water', 'Cocoa Supply Chain',
  'Dermatological Diagnosis', 'Maize Yield Prediction',
]

const EVENTS = [
  {
    tag: 'Workshop',
    date: 'April 6, 2026',
    title: 'AI & Data Literacy Workshop',
    desc: 'Building with Python and TensorFlow in an African Context',
    icon: Cpu,
  },
  {
    tag: 'Hackathon',
    date: 'April 8–10, 2026',
    title: 'AI for Social Good Challenge',
    desc: '48 hours to prototype a high-impact AI solution for Cameroon',
    icon: Zap,
  },
  {
    tag: 'Showcase',
    date: 'April 11, 2026',
    title: 'Public Showcase',
    desc: 'Teams present prototypes to US & Cameroonian judges and partners',
    icon: Trophy,
  },
]

const PARTNERS = [
  { name: 'ENSPD Douala',           abbr: 'ENSPD',   url: 'https://www.enspd.univ-douala.com', logo: '/polytech_douala.png' },
  { name: 'University of Douala',   abbr: 'UNIV-DLA', url: 'https://www.univ-douala.com',       logo: '/universite_de_douala.png' },
  { name: 'U.S. Embassy Cameroon',  abbr: 'US EMB',   url: 'https://cm.usembassy.gov',          logo: '/us_embassy_logo.png' },
  { name: 'Georgia State University',abbr: 'GSU',     url: 'https://www.gsu.edu',               logo: '/georgia_state_university.png' },
  { name: 'Georgia Tech',           abbr: 'GT',       url: 'https://www.gatech.edu',            logo: '/georgia_tech.png' },
]

const DOMAIN_OPTIONS = [
  'Cameroonian Agriculture',
  'Rural Health',
  'Bilingual Education',
  'Local Cybersecurity (low-resource)',
  'Other (describe below)',
]
const STACK_OPTIONS = [
  'Python / PyTorch',
  'C / Embedded',
  'Git / GitHub',
  'Streamlit / Flask (demos)',
  'Federated Learning Edge',
]
const ROLE_OPTIONS = ['ML Coder', 'Prototype Developer', 'Cameroon Field Tester', 'MVP Delivery PM']
const STEP_LABELS  = ['Basic Info', 'AI Project', 'Skills', 'Commitment']
const INIT = {
  fullName: '', email: '', level: '', major: '', university: '',
  domains: [], otherDomain: '', teamStatus: '',
  programmingLevel: 0, stack: [], projects: '',
  prototypeIdea: '', roles: [],
}

// ─── HOOKS ────────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.1) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

// ─── TOP BAR ──────────────────────────────────────────────────────────────────

function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-inner">
        <span>
          <Calendar size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 5 }} />
          April 6–11, 2026 &nbsp;·&nbsp; University of Douala, Cameroon
        </span>
        <a href="#register" className="topbar-cta">
          Apply Now <ArrowRight size={11} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 3 }} />
        </a>
      </div>
    </div>
  )
}

// ─── HEADER ───────────────────────────────────────────────────────────────────

function Header() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">

        {/* LOGO — image logosdia.png + texte */}
        <a href="#home" className="site-logo">
          <div className="logo-icon">
            <img
              src="/logosdia.png"
              alt="AI for Social Good logo"
              className="logo-img"
              onError={e => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            {/* Fallback si logo.png absent */}
            <span className="logo-icon-fallback" style={{ display: 'none' }}>
              <Bot size={20} color="#fff" strokeWidth={2.2} />
            </span>
          </div>
          <div className="logo-text">
            <strong>AI for Social Good</strong>
            <span>Youth Exchange · Cameroon 2026</span>
          </div>
        </a>

        <nav className="site-nav">
          <a href="#about">About</a>
          <a href="#programme">Program</a>
          <a href="#domaines">Domains</a>
          <a href="#partenaires">Partners</a>
          <a href="#register" className="nav-btn">Apply Now</a>
        </nav>

        <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="mobile-menu" onClick={() => setMenuOpen(false)}>
          <a href="#about">About</a>
          <a href="#programme">Program</a>
          <a href="#domaines">Domains</a>
          <a href="#partenaires">Partners</a>
          <a href="#register" className="mobile-menu-btn">Apply Now</a>
        </nav>
      )}
    </header>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-overlay" />
      <div className="hero-inner">
        <div className="hero-content">
          <p className="hero-eyebrow">
            Reciprocal Exchange Award · ENSPD × GSU × Georgia Tech
          </p>
          <h1 className="hero-title">
            AI for Social Good:<br />
            <em>Youth Innovation<br />Exchange in Cameroon</em>
          </h1>
          <p className="hero-sub">
            Five days of workshops, hackathon and mentorship at the University of Douala —
            building high-impact AI solutions for health, agriculture and education.
          </p>
          <div className="hero-actions">
            <a href="#register" className="btn-primary">Apply Now</a>
            <a href="#about" className="btn-outline">Explore the Program</a>
          </div>
          <div className="hero-meta">
            <span><Calendar size={13} style={{ verticalAlign: 'middle', marginRight: 5 }} />April 6–11, 2026</span>
            <span><MapPin size={13} style={{ verticalAlign: 'middle', marginRight: 5 }} />University of Douala</span>
            <span><Users size={13} style={{ verticalAlign: 'middle', marginRight: 5 }} />30–40 Young Innovators</span>
          </div>
        </div>
      </div>
      <div className="hero-scroll-hint">
        <span>Scroll to explore</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}

// ─── PARTNERS BAR ─────────────────────────────────────────────────────────────

function PartnersBar() {
  const [ref, visible] = useReveal()
  return (
    <section className={`partners-section fade-up ${visible ? 'visible' : ''}`} id="partenaires" ref={ref}>
      <div className="partners-inner">
        <p className="partners-label">In Partnership With</p>
        <div className="partners-row">
          {PARTNERS.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="partner-logo-link"
              title={p.name}
            >
              <img
                src={p.logo}
                alt={p.name}
                className="partner-logo-img"
                onError={e => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <span className="partner-logo-fallback" style={{ display: 'none' }}>
                {p.abbr}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── STATS ────────────────────────────────────────────────────────────────────

function StatsSection() {
  const [ref, visible] = useReveal()
  return (
    <section className="stats-section" ref={ref}>
      <div className="stats-inner">
        <div className="stats-text">
          <p className="section-label">The Program</p>
          <h2>Innovating to change<br />lives in Cameroon.</h2>
        </div>
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`stat-card fade-up ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────

function AboutSection() {
  const [ref, visible] = useReveal()
  return (
    <section className="about-section" id="about" ref={ref}>
      <div className="about-inner">
        <div className={`about-left fade-up ${visible ? 'visible' : ''}`}>
          <p className="section-label">About the Event</p>
          <h2>Transforming lives through<br />artificial intelligence.</h2>
          <p className="body-text">
            This reciprocal exchange program brings together young Cameroonian innovators with
            professionals from Georgia State University and Georgia Tech. Over 5 days at the
            University of Douala, they co-build AI prototypes for health, education and agriculture.
          </p>
          <p className="body-text">
            The program includes interactive workshops, an AI for Social Good hackathon,
            entrepreneurship mentoring sessions, and concludes with a public Showcase. A free
            digital toolkit will be launched to sustain impact in universities across Cameroon.
          </p>
          <a href="#register" className="text-link">
            Apply to the program <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
          </a>
        </div>

        <div className={`about-right fade-up ${visible ? 'visible' : ''}`} id="programme" style={{ transitionDelay: '0.15s' }}>
          {SERVICES.map((s, i) => (
            <div className="service-card" key={s.title}>
              <div className="service-num">0{i + 1}</div>
              <div className="service-body">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FEATURES STRIP ───────────────────────────────────────────────────────────

function FeaturesStrip() {
  const [ref, visible] = useReveal()
  return (
    <div className="features-strip" ref={ref}>
      <div className="features-inner">
        {FEATURES.map((f, i) => (
          <div
            key={f.label}
            className={`feature-item fade-up ${visible ? 'visible' : ''}`}
            style={{ transitionDelay: `${i * 0.07}s` }}
          >
            <f.icon size={20} strokeWidth={1.8} />
            <span>{f.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── TESTIMONIALS ──────────────────────────────────────────────────────────────

function Testimonials() {
  const [active, setActive] = useState(0)
  const [ref, visible]      = useReveal()

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % TESTIMONIALS.length), 6000)
    return () => clearInterval(t)
  }, [])

  const t = TESTIMONIALS[active]

  return (
    <section className={`testimonials-section fade-up ${visible ? 'visible' : ''}`} ref={ref}>
      <div className="testimonials-inner">
        <div className="testimonials-left">
          <p className="section-label">What They Say</p>
          <h2>Backed by Leading<br />Institutions</h2>
          <div className="testimonial-dots">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} className={`tdot ${i === active ? 'active' : ''}`} onClick={() => setActive(i)} />
            ))}
          </div>
          <div className="testimonial-arrows">
            <button onClick={() => setActive(a => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}>
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => setActive(a => (a + 1) % TESTIMONIALS.length)}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="testimonials-right">
          <div className="testimonial-card" key={active}>
            <div className="quote-glyph">&ldquo;</div>
            <p className="quote-text">{t.quote}</p>
            <div className="quote-author">
              <div className="author-avatar">{t.initials}</div>
              <div>
                <div className="author-name">{t.name}</div>
                <div className="author-role">{t.role}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── DOMAINS ───────────────────────────────────────────────────────────────────

function DomainsSection() {
  const [ref, visible] = useReveal()
  return (
    <section className="domains-section" id="domaines" ref={ref}>
      <div className="domains-inner">
        <div className="domains-header">
          <p className="section-label">Priority Areas</p>
          <h2>Your Prototypes Target<br />Real Challenges</h2>
          <p className="body-text" style={{ maxWidth: 480 }}>
            Teams develop AI prototypes rooted in the concrete challenges facing Cameroon.
          </p>
        </div>
        <div className="domains-tags">
          {DOMAINS.map((d, i) => (
            <span
              key={d}
              className={`domain-tag fade-up ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 0.035}s` }}
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── EVENTS ────────────────────────────────────────────────────────────────────

function EventsSection() {
  const [ref, visible] = useReveal()
  return (
    <section className="events-section" ref={ref}>
      <div className="events-inner">
        <div className="events-header">
          <div>
            <p className="section-label light">Schedule</p>
            <h2 style={{ color: '#fff' }}>Key Events</h2>
          </div>
          <a href="#register" className="events-cta">
            Register Now <ArrowRight size={13} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />
          </a>
        </div>
        <div className="events-grid">
          {EVENTS.map((e, i) => (
            <div
              key={e.title}
              className={`event-card fade-up ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="event-icon-wrap">
                <e.icon size={28} strokeWidth={1.5} />
              </div>
              <div className="event-tag">{e.tag}</div>
              <h3 className="event-title">{e.title}</h3>
              <p className="event-desc">{e.desc}</p>
              <div className="event-date">
                <Calendar size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 5 }} />
                {e.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FORM STEPS ────────────────────────────────────────────────────────────────

function Step1({ form, set }) {
  return (
    <>
      <h3 className="step-title">Personal Information</h3>
      <p className="step-sub">Tell us who you are and your institution.</p>
      <div className="form-row">
        <div className="form-group">
          <label>Full Name *</label>
          <input type="text" placeholder="e.g. Marie Nguetsa" value={form.fullName} onChange={e => set('fullName', e.target.value)} />
        </div>
        <div className="form-group">
          <label>University Email *</label>
          <input type="email" placeholder="firstname.lastname@univ-douala.cm" value={form.email} onChange={e => set('email', e.target.value)} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Level of Study *</label>
          <select value={form.level} onChange={e => set('level', e.target.value)}>
            <option value="">Select…</option>
            <option>L3</option>
            <option>M1/M2</option>
            <option>PhD</option>
          </select>
        </div>
        <div className="form-group">
          <label>Field / Department *</label>
          <input type="text" placeholder="e.g. Computer Engineering, ENSPD" value={form.major} onChange={e => set('major', e.target.value)} />
        </div>
      </div>
      <div className="form-group">
        <label>University / Institution *</label>
        <input type="text" placeholder="e.g. University of Douala, ENSPD" value={form.university} onChange={e => set('university', e.target.value)} />
      </div>
    </>
  )
}

function Step2({ form, set, toggleArr }) {
  return (
    <>
      <h3 className="step-title">Your AI Project</h3>
      <p className="step-sub">Describe the domain you are targeting and your team status.</p>
      <div className="form-group">
        <label>Target Domain</label>
        <div className="check-list">
          {DOMAIN_OPTIONS.map(d => (
            <label className="check-item" key={d}>
              <input type="checkbox" checked={form.domains.includes(d)} onChange={() => toggleArr('domains', d)} />
              <span className="check-box" /><span>{d}</span>
            </label>
          ))}
        </div>
      </div>
      {form.domains.includes('Other (describe below)') && (
        <div className="form-group">
          <label>Describe your domain</label>
          <textarea placeholder="Briefly describe…" value={form.otherDomain} onChange={e => set('otherDomain', e.target.value)} />
        </div>
      )}
      <div className="form-group">
        <label>Team Status</label>
        <div className="check-list">
          {['Existing team / startup', 'Team in formation'].map(s => (
            <label className="check-item" key={s}>
              <input type="radio" name="teamStatus" checked={form.teamStatus === s} onChange={() => set('teamStatus', s)} />
              <span className="check-box radio" /><span>{s}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  )
}

function Step3({ form, set, toggleArr }) {
  return (
    <>
      <h3 className="step-title">Technical Skills</h3>
      <p className="step-sub">Rate your level and the tools you master.</p>
      <div className="form-group">
        <label>Programming Level (1 = Beginner → 5 = Expert)</label>
        <div className="scale-row">
          <span className="scale-label">Beginner</span>
          {[1, 2, 3, 4, 5].map(n => (
            <button
              key={n}
              type="button"
              className={`scale-btn ${form.programmingLevel === n ? 'active' : ''}`}
              onClick={() => set('programmingLevel', n)}
            >
              {n}
            </button>
          ))}
          <span className="scale-label">Expert</span>
        </div>
      </div>
      <div className="form-group">
        <label>Technical Stack</label>
        <div className="check-list">
          {STACK_OPTIONS.map(s => (
            <label className="check-item" key={s}>
              <input type="checkbox" checked={form.stack.includes(s)} onChange={() => toggleArr('stack', s)} />
              <span className="check-box" /><span>{s}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label>Existing Projects (GitHub links welcome)</label>
        <textarea
          rows={4}
          placeholder="e.g. github.com/myprofile/agro-detect – banana disease detection (TFLite, 84% accuracy)"
          value={form.projects}
          onChange={e => set('projects', e.target.value)}
        />
      </div>
    </>
  )
}

function Step4({ form, set, toggleArr }) {
  return (
    <>
      <h3 className="step-title">Your Commitment</h3>
      <p className="step-sub">Describe your prototype idea and desired role.</p>
      <div className="form-group">
        <label>Prototype Idea + Cameroonian Impact</label>
        <textarea
          rows={5}
          placeholder={`e.g. "Banana disease app, tested in Douala — detects Fusarium wilt via smartphone photo without internet."`}
          value={form.prototypeIdea}
          onChange={e => set('prototypeIdea', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Desired Roles in the Team</label>
        <div className="check-list">
          {ROLE_OPTIONS.map(r => (
            <label className="check-item" key={r}>
              <input type="checkbox" checked={form.roles.includes(r)} onChange={() => toggleArr('roles', r)} />
              <span className="check-box" /><span>{r}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  )
}

// ─── REGISTER SECTION ──────────────────────────────────────────────────────────

function RegisterSection() {
  const [step, setStep]         = useState(1)
  const [form, setForm]         = useState(INIT)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending]   = useState(false)
  const [error, setError]       = useState(null)
  const TOTAL = 4

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const toggleArr = (k, v) => setForm(f => ({
    ...f,
    [k]: f[k].includes(v) ? f[k].filter(x => x !== v) : [...f[k], v],
  }))

  const progress = ((step - 1) / (TOTAL - 1)) * 100
  const [ref, visible] = useReveal()

  const handleSubmit = async () => {
    setSending(true)
    setError(null)
    try {
      // mode: 'no-cors' est obligatoire pour Apps Script — on ne peut pas lire la réponse
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          fullName:         form.fullName,
          email:            form.email,
          level:            form.level,
          major:            form.major,
          university:       form.university,
          domains:          form.domains.join(', '),
          otherDomain:      form.otherDomain,
          teamStatus:       form.teamStatus,
          programmingLevel: form.programmingLevel,
          stack:            form.stack.join(', '),
          projects:         form.projects,
          prototypeIdea:    form.prototypeIdea,
          roles:            form.roles.join(', '),
        }),
      })
      // Avec no-cors on suppose succès si pas d'exception réseau
      setSubmitted(true)
    } catch {
      setError('Network error. Check your connection and try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section className={`register-section fade-up ${visible ? 'visible' : ''}`} id="register" ref={ref}>
      <div className="register-inner">

        {/* Colonne gauche — infos */}
        <div className="register-left">
          <p className="section-label">2026 Application</p>
          <h2>Join the Exchange</h2>
          <p className="body-text">
            Complete the 4-step form to apply for the <strong>AI for Social Good Youth Innovation Exchange</strong>.
            Open to L3, M1/M2 and PhD students from Cameroonian universities.
          </p>
          <div className="register-info-list">
            <div className="register-info-item">
              <Calendar size={16} />
              <span>April 6–11, 2026</span>
            </div>
            <div className="register-info-item">
              <MapPin size={16} />
              <span>University of Douala, Cameroon</span>
            </div>
            <div className="register-info-item">
              <Mail size={16} />
              <span>contact@aiforsocialgood-cameroon.org</span>
            </div>
          </div>
        </div>

        {/* Colonne droite — formulaire */}
        <div className="register-right">
          {!submitted ? (
            <>
              {/* Étapes nav */}
              <div className="form-steps-nav">
                {STEP_LABELS.map((l, i) => (
                  <div key={l} className={`form-step-dot ${i + 1 < step ? 'done' : i + 1 === step ? 'active' : ''}`}>
                    <div className="step-dot-circle">
                      {i + 1 < step ? <CheckCircle2 size={14} /> : i + 1}
                    </div>
                    <span>{l}</span>
                  </div>
                ))}
              </div>

              {/* Barre de progression */}
              <div className="form-progress">
                <div className="form-progress-fill" style={{ width: `${progress}%` }} />
              </div>

              {/* Contenu de l'étape */}
              <div className="form-body">
                {step === 1 && <Step1 form={form} set={set} />}
                {step === 2 && <Step2 form={form} set={set} toggleArr={toggleArr} />}
                {step === 3 && <Step3 form={form} set={set} toggleArr={toggleArr} />}
                {step === 4 && <Step4 form={form} set={set} toggleArr={toggleArr} />}
              </div>

              {/* Message d'erreur */}
              {error && <p className="form-error">{error}</p>}

              {/* Navigation bas */}
              <div className="form-footer-nav">
                {step > 1
                  ? <button className="btn-back-form" onClick={() => setStep(s => s - 1)}>← Back</button>
                  : <span />
                }
                <button
                  className="btn-primary"
                  disabled={sending}
                  onClick={() => step < TOTAL ? setStep(s => s + 1) : handleSubmit()}
                >
                  {step === TOTAL
                    ? (sending ? 'Sending…' : 'Submit Application')
                    : 'Continue →'}
                </button>
              </div>
            </>
          ) : (
            <div className="success-card">
              <CheckCircle2 size={48} strokeWidth={1.5} />
              <h3>Application Submitted!</h3>
              <p>
                Thank you, <strong>{form.fullName}</strong>! We will contact you at <em>{form.email}</em> within 2 weeks.
                <br /><br />
                Start preparing your prototype — <strong>Cameroon needs you.</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">

        <div className="footer-brand">
          <div className="footer-logo">
            <img
              src="/logo.png"
              alt="AI for Social Good"
              style={{ height: 28, width: 'auto', borderRadius: 4 }}
              onError={e => { e.target.style.display = 'none' }}
            />
            <span>AI for Social Good · Cameroon 2026</span>
          </div>
          <p>
            A reciprocal exchange program between ENSPD / University of Douala,
            Georgia State University, Georgia Tech and the U.S. Embassy in Cameroon.
          </p>
          <div className="footer-contacts">
            <a href="mailto:contact@aiforsocialgood-cameroon.org">
              <Mail size={13} /> contact@aiforsocialgood-cameroon.org
            </a>
            <a href="https://maps.google.com/?q=University+of+Douala+Cameroon" target="_blank" rel="noopener noreferrer">
              <MapPin size={13} /> University of Douala, Cameroon
            </a>
          </div>
          <div className="footer-social">
            <a href="https://twitter.com/AIforGoodCMR" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X">
              <SocialIcon name="twitter" size={15} />
            </a>
            <a href="https://www.facebook.com/AIforSocialGoodCameroon" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <SocialIcon name="facebook" size={16} />
            </a>
            <a href="https://www.linkedin.com/company/ai-for-social-good-cameroon" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <SocialIcon name="linkedin" size={16} />
            </a>
            <a href="https://www.instagram.com/aiforsocialgoodcmr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <SocialIcon name="instagram" size={16} />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Program</h4>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#programme">AI Workshops</a></li>
            <li><a href="#programme">Hackathon</a></li>
            <li><a href="#programme">Public Showcase</a></li>
            <li><a href="#programme">Open-Source Toolkit</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Partners</h4>
          <ul>
            {PARTNERS.map(p => (
              <li key={p.name}>
                <a href={p.url} target="_blank" rel="noopener noreferrer">
                  {p.name} <ExternalLink size={10} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 3 }} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Information</h4>
          <ul>
            <li><a href="#home">April 6–11, 2026</a></li>
            <li><a href="#register">Application</a></li>
            <li><a href="mailto:contact@aiforsocialgood-cameroon.org">Contact</a></li>
            <li><a href="#about">FAQ</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 AI for Social Good – Youth Innovation Exchange in Cameroon</span>
        <span>Reciprocal Exchange Award · ENSPD × Georgia State University × Georgia Tech</span>
      </div>
    </footer>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <TopBar />
      <Header />
      <Hero />
      <PartnersBar />
      <StatsSection />
      <AboutSection />
      <FeaturesStrip />
      <Testimonials />
      <DomainsSection />
      <EventsSection />
      <RegisterSection />
      <Footer />
    </>
  )
}