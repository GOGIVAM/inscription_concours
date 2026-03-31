import { useState, useEffect, useRef } from 'react'
import {
  Calendar, Users, Trophy, Rocket, Bot, Leaf, GraduationCap,
  Handshake, BookOpen, ChevronRight, MapPin, Mail, ExternalLink,
  ArrowRight, Cpu, Globe, Zap, ChevronLeft, CheckCircle2, Menu, X, Phone,
  UserPlus, UsersRound,
} from 'lucide-react'
import './index.css'

// ─── Social icons ───────────────────────────────────────────
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
        <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
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

// ─── Constants ──────────────────────────────────────────────
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyUcGXqQ2gbEfQmkA5Uyt9SqmRIcjoO5TV-BaHIJbsAQwWsbzS7CiEgor3ex_C7NUVk/exec'

const STATS = [
  { num: '5',   label: 'Days of Immersion' },
  { num: '40+', label: 'Young Participants' },
  { num: '10',  label: 'Innovation Teams' },
  { num: '3',   label: 'Impact Domains' },
]

const FEATURES = [
  { label: 'AI & Data Literacy Workshops', img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=40&h=40&fit=crop&q=60' },
  { label: 'Social Good Challenge (Hackathon)', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=40&h=40&fit=crop&q=60' },
  { label: 'Agriculture & Health AI', img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=40&h=40&fit=crop&q=60' },
  { label: 'Mentorship & Coaching', img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=40&h=40&fit=crop&q=60' },
  { label: 'Open-Source Digital Toolkit', img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=40&h=40&fit=crop&q=60' },
  { label: 'Reciprocal US–Cameroon Exchange', img: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=40&h=40&fit=crop&q=60' },
]

const PROJECT_LEADERS = [
  {
    name: 'Dr. Armielle Noulapeu Ngaffo',
    role: 'AI Lecturer · ENSPD, University of Douala',
    contact: 'armiellengaffo@gmail.com',
    photo: '/armielle_ngaffo.png',
    initials: 'AN',
    tags: ['Artificial Intelligence', 'ICT', 'Ethics & Innovation'],
    bio: 'Armielle Noulapeu Ngaffo is an AI Lecturer at ENSPD with over eight years of experience in Information and Communication Technologies. She holds a PhD specialising in AI and is a Mandela Washington Fellowship alumna. Committed to cultivating critical thinking and ethical AI practices, she actively inspires the next generation — particularly women — to pursue STEM careers and leverage AI for positive change in Cameroon.',
  },
  {
    name: 'Prof. Dr. habil. Patrick Njionou Sadjang',
    role: 'Associate Professor · ENSPD, University of Douala',
    contact: 'pnjionou@yahoo.fr',
    photo: '/njionou.png',
    initials: 'PN',
    tags: ['(p,q)-Calculus', 'Machine Learning', 'AI & Data Science'],
    bio: 'A distinguished Cameroonian mathematician, Patrick Njionou Sadjang holds a PhD (2013) and a Dr. habil. (2024) from the University of Kassel, Germany. With over 35 peer-reviewed publications in (p,q)-calculus and hypergeometric polynomials, he has extended his expertise into Machine Learning and AI. Secretary General of the Cameroon Mathematical Union (CAMU) and General Coordinator of Easy-Maths, he mentors the next generation of African scientists at AIMS-Cameroon and beyond.',
  },
  {
    name: 'Dr. Jean Ndoumbe',
    role: 'Associate Professor & Lab Coordinator · ENSPD, University of Douala',
    contact: 'jean.ndoumbe02@gmail.com',
    photo: '/jean_ndoumbe.png',
    initials: 'JN',
    tags: ['Electrical Engineering', 'Numerical Simulation', 'AI & Communications'],
    bio: 'Jean Ndoumbe holds a PhD in Electrical Engineering (2014) from the École Centrale de Lyon, France. He currently serves as Associate Professor and coordinator of the Computer Engineering, Data Science and Artificial Intelligence laboratory at ENSPD. His research bridges dielectric materials, numerical simulation, and the integration of artificial intelligence into communication systems.',
  },
  {
    name: 'Dr. Ebenezer Maka Maka',
    role: 'Head of Department, Computer Engineering & Telecom · ENSPD, University of Douala',
    contact: '',
    photo: '/ebenezer_maka.png',
    initials: 'EM',
    tags: ['Cybersecurity', 'Medical Imaging', 'Digital Innovation'],
    bio: 'Ebenezer Maka Maka holds a PhD (2022) and serves as Head of the Department of Computer Engineering and Telecommunications at ENSPD. He coordinates the Computer Engineering axis within the Lab of Computer Engineering, Data Science and AI. His research focuses on securing medical images through hybrid cryptographic methods. Deeply engaged in student supervision and engineering program design, he champions digital innovation and cybersecurity across Africa.',
  },
   {
    name: 'Bryan Cox',
    role: 'Lead CS Program Specialist · Georgia Department of Education',
    contact: '',
    photo: '/bryan_cox.png',
    initials: 'BC',
    tags: ['Computer Science Education', 'K-12 STEM', 'Computational Thinking'],
    bio: 'Bryan Cox leads Computer Science education initiatives at the Georgia DOE, where he broadens participation in CS experiences statewide and builds CS into a K-12 discipline. A former 8-year high school STEM teacher in mathematics, computer science, and engineering, he is pursuing a PhD in Instructional Technology at Georgia State University with a focus on online learning and computational thinking. He holds an M.A.T. in Mathematics from GSU and a B.S. in Computer Information Systems from Florida A&M University.',
  },
  {
    name: 'Dr. Recha Reid',
    role: 'Associate Director, Entrepreneurship & Innovation Institute · Georgia State University',
    contact: 'rreid16@gsu.edu',
    photo: '/recha_reid.png',
    initials: 'RR',
    tags: ['Entrepreneurship', 'Innovation', 'Program Management'],
    bio: 'Recha Reid oversees university-wide entrepreneurship events and strategic partnerships at Georgia State University\'s Entrepreneurship & Innovation Institute. Previously at Georgia Tech, she managed the Emmy Award-winning InVenture Prize and undergraduate research programs. A recipient of the 2021 Southeast Regional Emmy Award and the 2023 Atlanta Startup Awards Equity Champion Award, she holds a PhD from GSU, an MA from the University of Birmingham, and a BA from Wesleyan College.',
  },
]


const SERVICES = [
  { icon: Cpu,      title: 'AI & Data Literacy Workshops',         body: 'Interactive training sessions led by experts from Georgia State and Georgia Tech. Covers Python, PyTorch, TFLite and AI applications adapted to the African low-resource context.' },
  { icon: Zap,      title: 'AI for Social Good Challenge',          body: '3-day hackathon where teams develop functional AI prototypes for health, agriculture and education. Awards presented at the final public Showcase.' },
  { icon: BookOpen, title: 'Mentorship & Entrepreneurship Coaching', body: 'Mentoring sessions with American and Cameroonian professionals. Focus on the prototype-to-product trajectory and open-source code repositories on GitHub.' },
]

const EVENTS = [
  { tag: 'Workshop',  date: 'April 6, 2026',    title: 'AI & Data Literacy Workshop',    desc: 'Building with Python and TensorFlow in an African Context',         img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80&fit=crop' },
  { tag: 'Hackathon', date: 'April 8–10, 2026', title: 'AI for Social Good Challenge',   desc: '48 hours to prototype a high-impact AI solution for Cameroon',       img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80&fit=crop' },
  { tag: 'Showcase',  date: 'April 10, 2026',   title: 'Public Showcase',                desc: 'Teams present prototypes to US & Cameroonian judges and partners',   img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80&fit=crop' },
]

const PARTNERS = [
  { name: 'ENSPD Douala',            abbr: 'ENSPD',    url: 'https://www.enspd.univ-douala.com', logo: '/polytech_douala.png' },
  { name: 'University of Douala',    abbr: 'UNIV-DLA', url: 'https://www.univ-douala.com',       logo: '/universite_de_douala.png' },
  { name: 'U.S. Embassy Cameroon',   abbr: 'US EMB',   url: 'https://cm.usembassy.gov',          logo: '/us_embassy_logo.png' },
  { name: 'Georgia State University',abbr: 'GSU',      url: 'https://www.gsu.edu',               logo: '/georgia_state_university.png' },
  { name: 'Georgia Tech',            abbr: 'GT',       url: 'https://www.gatech.edu',            logo: '/georgia_tech.png' },
]

// ── Day Program Data ──
const DAY_PROGRAM = [
  {
    num: '01', shortDate: 'Lun 06/04', fullDate: 'Monday, April 6, 2026',
    theme: 'Foundations + Team Formation', focus: 'Awareness & Direction',
    outcome: 'Teams formed + problem selected',
    img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1400&q=80&auto=format&fit=crop',
    sessions: [
      { slot: 'Morning',   time: '9:00 – 12:00', items: ['Welcome & Program Overview', 'Introduction to AI (real-world examples in Africa)', 'Discussion: Local challenges (health, agriculture, education)'] },
      { slot: 'Afternoon', time: '13:00 – 15:00', items: ['Problem Identification Activity', 'Team Formation (8–10 teams)', 'Initial Idea Sharing'] },
    ],
  },
  {
    num: '02', shortDate: 'Mar 07/04', fullDate: 'Tuesday, April 7, 2026',
    theme: 'AI Tools + Hands-On Learning', focus: 'Exposure & Application',
    outcome: 'Teams begin applying AI to their ideas',
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1400&q=80&auto=format&fit=crop',
    sessions: [
      { slot: 'Morning',   time: '9:00 – 12:00', items: ['Introduction to AI tools (no-code + technical)', 'Demonstrations: simple models & real examples'] },
      { slot: 'Afternoon', time: '13:00 – 17:00', items: ['Team Work Session', 'Mentorship rotation (feedback from facilitators)', 'Progress check-ins'] },
    ],
  },
  {
    num: '03', shortDate: 'Mer 08/04', fullDate: 'Wednesday, April 8, 2026',
    theme: 'Challenge Development', focus: 'Build & Structure',
    outcome: 'Clear solution + structure defined',
    img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1400&q=80&auto=format&fit=crop',
    sessions: [
      { slot: 'Morning',   time: '9:00 – 12:00', items: ['Introduction to AI for Social Good Challenge', 'Problem → Solution framework', 'How to design impactful solutions'] },
      { slot: 'Afternoon', time: '13:00 – 17:00', items: ['Team Development Session', 'Mentor feedback', 'Early pitch practice'] },
    ],
  },
  {
    num: '04', shortDate: 'Jeu 09/04', fullDate: 'Thursday, April 9, 2026',
    theme: 'Pitch + Refinement', focus: 'Communication & Confidence',
    outcome: 'Pitch-ready teams',
    img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1400&q=80&auto=format&fit=crop',
    sessions: [
      { slot: 'Morning',   time: '9:00 – 12:00', items: ['Pitch training: storytelling + structure', 'What judges look for'] },
      { slot: 'Afternoon', time: '13:00 – 17:00', items: ['Mock pitch sessions', 'Final refinements', 'Coaching'] },
    ],
  },
  {
    num: '05', shortDate: 'Ven 10/04', fullDate: 'Friday, April 10, 2026',
    theme: 'Showcase + Toolkit Launch', focus: 'Presentation & Legacy',
    outcome: 'Final presentations + program close',
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=80&auto=format&fit=crop',
    sessions: [
      { slot: 'Morning',   time: '9:00 – 12:00', items: ['Final pitch competition (teams present)', 'Judges evaluate'] },
      { slot: 'Midday',    time: '12:00 – 13:30', items: ['Awards + recognition ceremony'] },
      { slot: 'Afternoon', time: '13:30 – 17:00', items: ['Digital toolkit introduction', 'Next steps & continued learning', 'Program close'] },
    ],
  },
]

// ── Domains Data ──
const DOMAINS_CAROUSEL = [
  { tag: 'Agriculture', title: 'Cameroonian Agriculture & AgriTech', desc: 'AI-powered tools for smallholder farmers — crop disease detection, yield prediction and precision agriculture adapted to the African low-resource context.', img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1400&q=80&auto=format&fit=crop' },
  { tag: 'Health',      title: 'Rural Health & Telemedicine',        desc: 'Bridging the health gap with AI diagnostics, disease detection and remote patient monitoring that work on low-end devices with no internet.',             img: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=1400&q=80&auto=format&fit=crop' },
  { tag: 'Education',   title: 'Bilingual Education & EdTech',        desc: 'Adaptive learning platforms supporting both French and English, designed for Cameroon\'s unique bilingual educational context.',                          img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1400&q=80&auto=format&fit=crop' },
  { tag: 'Fintech',     title: 'Mobile Fintech & Financial Inclusion', desc: 'AI-driven mobile money platforms, credit scoring and fraud detection tailored to the realities of Cameroon\'s informal economy.',                         img: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1400&q=80&auto=format&fit=crop' },
  { tag: 'Language AI', title: 'Local Language AI — Bassa, Bamiléké', desc: 'NLP models, speech recognition and translation tools preserving and empowering Cameroonian languages for education and governance.',                        img: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1400&q=80&auto=format&fit=crop' },
  { tag: 'Clean Water', title: 'IoT & Clean Water Access',            desc: 'Smart sensor networks and AI analytics to monitor water quality, predict shortages and optimize distribution across rural Cameroon.',                       img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1400&q=80&auto=format&fit=crop' },
]

const DOMAIN_OPTIONS = ['Cameroonian Agriculture / AgriTech','Rural Health & Telemedicine','Bilingual Education & EdTech','Cybersecurity (low-resource context)','Mobile Fintech & Financial Inclusion','Local Language AI (Bassa, Bamiléké, etc.)','IoT & Clean Water','Other (describe below)']
const STACK_OPTIONS   = ['Python / PyTorch / TensorFlow','C / C++ / Embedded Systems','JavaScript / React / Node.js','Git / GitHub','Streamlit / Flask (demos & APIs)','Mobile Development (Android / Flutter)','Federated Learning / Edge AI','Data Analysis (Pandas, SQL)']
const ROLE_OPTIONS    = ['ML Engineer / AI Developer','Prototype Developer (Frontend/Backend)','Field Tester & User Researcher (Cameroon)','Project Manager / Team Lead','Data Collector & Annotator','Business / Impact Analyst']
const STEP_LABELS     = ['Profile', 'Participation', 'Technical Skills', 'Project Idea']

const INIT = {
  fullName:'', email:'', phone:'', level:'', major:'', university:'',
  participationMode:'', teamName:'', teamSize:'', teamMembersDescription:'',
  teamLeader:'', lookingForTeammates:'', programmingLevel:0,
  stack:[], projects:'', domains:[], otherDomain:'', prototypeIdea:'',
  cameroonImpact:'', roles:[], motivation:'',
}

// ─── Reveal hook ─────────────────────────────────────────────
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

// ─── TopBar ──────────────────────────────────────────────────
function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-inner">
        <span>
          <Calendar size={12} style={{ display:'inline', verticalAlign:'middle', marginRight:5 }} />
          April 6–10, 2026 &nbsp;·&nbsp; University of Douala, Cameroon
        </span>
        <a href="#register" className="topbar-cta">
          Apply Now <ArrowRight size={11} style={{ display:'inline', verticalAlign:'middle', marginLeft:3 }} />
        </a>
      </div>
    </div>
  )
}

// ─── Header ──────────────────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <a href="#home" className="site-logo">
          <div className="logo-icon">
            <img src="/logosdia.png" alt="AI for Social Good logo" className="logo-img"
              onError={e => { e.target.style.display='none' }} />
          </div>
          <div className="logo-text">
            <strong>AI for Social Good</strong>
            <span>Youth Exchange · Cameroon 2026</span>
          </div>
        </a>
        <nav className="site-nav">
          <a href="#about">About</a>
          <a href="#programme">Program</a>
          <a href="#day-program">Schedule</a>
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
          <a href="#day-program">Schedule</a>
          <a href="#domaines">Domains</a>
          <a href="#partenaires">Partners</a>
          <a href="#register" className="mobile-menu-btn">Apply Now</a>
        </nav>
      )}
    </header>
  )
}

// ─── Hero ─────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        <div className="hero-content">
          <p className="hero-eyebrow">Reciprocal Exchange Award · ENSPD × GSU × Georgia Tech</p>
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
            <span><Calendar size={13} style={{ verticalAlign:'middle', marginRight:5 }} />April 6–10, 2026</span>
            <span><MapPin size={13} style={{ verticalAlign:'middle', marginRight:5 }} />University of Douala</span>
            <span><Users size={13} style={{ verticalAlign:'middle', marginRight:5 }} />30–40 Young Innovators</span>
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

// ─── Partners Bar ────────────────────────────────────────────
function PartnersBar() {
  const [ref, visible] = useReveal()
  return (
    <section className={`partners-section fade-up ${visible ? 'visible' : ''}`} id="partenaires" ref={ref}>
      <div className="partners-inner">
        <p className="partners-label">In Partnership With</p>
        <div className="partners-row">
          {PARTNERS.map(p => (
            <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
               className="partner-logo-link" title={p.name}>
              <img src={p.logo} alt={p.name} className="partner-logo-img"
                onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }} />
              <span className="partner-logo-fallback" style={{ display:'none' }}>{p.abbr}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Animated number ─────────────────────────────────────────
function AnimatedNumber({ target, suffix='', duration=1400, started }) {
  const [display, setDisplay] = useState(0)
  const rafRef = useRef(null)
  useEffect(() => {
    if (!started) return
    const start = performance.now()
    const to = parseInt(target, 10)
    const ease = t => 1 - Math.pow(1 - t, 3)
    const tick = now => {
      const progress = Math.min((now - start) / duration, 1)
      setDisplay(Math.round(to * ease(progress)))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [started, target, duration])
  return <>{display}{suffix}</>
}

// ─── Countdown ───────────────────────────────────────────────
function Countdown() {
  const EVENT_DATE = new Date('2026-04-06T08:00:00')
  const calc = () => {
    const diff = EVENT_DATE - new Date()
    if (diff <= 0) return null
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => { const t = setInterval(() => setTime(calc()), 1000); return () => clearInterval(t) }, [])
  const [ref, visible] = useReveal()

  if (!time) return (
    <div className="countdown-section" ref={ref}>
      <div className="countdown-inner"><p className="countdown-label">The event has begun — follow live!</p></div>
    </div>
  )
  const units = [
    { val: time.days,    label: 'Days' },
    { val: time.hours,   label: 'Hours' },
    { val: time.minutes, label: 'Min' },
    { val: time.seconds, label: 'Sec' },
  ]
  return (
    <div className={`countdown-section fade-up ${visible ? 'visible' : ''}`} ref={ref}>
      <div className="countdown-inner">
        <p className="countdown-title">Event starts in</p>
        <div className="countdown-grid">
          {units.map(u => (
            <div className="countdown-unit" key={u.label}>
              <div className="countdown-val">{String(u.val).padStart(2, '0')}</div>
              <div className="countdown-unit-label">{u.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Stats ───────────────────────────────────────────────────
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
          {STATS.map((s, i) => {
            const match = s.num.match(/^(\d+)(\D*)$/)
            const numVal = match ? match[1] : s.num
            const suffix = match ? match[2] : ''
            return (
              <div key={s.label} className={`stat-card fade-up ${visible ? 'visible' : ''}`}
                   style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="stat-num">
                  <AnimatedNumber target={numVal} suffix={suffix} started={visible} duration={1200 + i * 200} />
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── About ───────────────────────────────────────────────────
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
            Apply to the program <ArrowRight size={14} style={{ display:'inline', verticalAlign:'middle', marginLeft:4 }} />
          </a>
        </div>
        <div className={`about-right fade-up ${visible ? 'visible' : ''}`} id="programme" style={{ transitionDelay:'0.15s' }}>
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

// ─── Features Strip ──────────────────────────────────────────
function FeaturesStrip() {
  const [ref, visible] = useReveal()
  return (
    <div className="features-strip" ref={ref}>
      <div className="features-inner">
        {FEATURES.map((f, i) => (
          <div key={f.label} className={`feature-item fade-up ${visible ? 'visible' : ''}`}
               style={{ transitionDelay:`${i * 0.07}s` }}>
            <img src={f.img} alt="" style={{ width:20, height:20, borderRadius:'50%', objectFit:'cover', flexShrink:0, opacity:0.7 }} />
            <span>{f.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectLeaders() {
  const [active, setActive] = useState(0)
  const [ref, visible] = useReveal()
  const leader = PROJECT_LEADERS[active]

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % PROJECT_LEADERS.length), 7000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className={`project-leaders-section fade-up ${visible ? 'visible' : ''}`} ref={ref}>
      <div className="project-leaders-inner">

        {/* ── LEFT ── */}
        <div className="pl-left">
          <p className="section-label">Meet the Team</p>
          <h2>The People<br />Behind the Program</h2>
          <p className="pl-tagline">
            Researchers, educators and innovators driving this US–Cameroon exchange.
          </p>

          <div className="pl-dots">
            {PROJECT_LEADERS.map((l, i) => (
              <button
                key={i}
                className={`pl-dot ${i === active ? 'active' : ''}`}
                onClick={() => setActive(i)}
                title={l.name}
              />
            ))}
          </div>

          <div className="pl-arrows">
            <button onClick={() => setActive(a => (a - 1 + PROJECT_LEADERS.length) % PROJECT_LEADERS.length)}>
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => setActive(a => (a + 1) % PROJECT_LEADERS.length)}>
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="pl-mini-avatars">
            {PROJECT_LEADERS.map((l, i) => (
              <button
                key={i}
                className={`pl-mini-avatar-btn ${i === active ? 'active' : ''}`}
                onClick={() => setActive(i)}
              >
                <img
                  src={l.photo}
                  alt={l.name}
                  onError={e => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <span className="pl-mini-avatar-fallback">{l.initials}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="pl-card" key={active}>
          <div className="pl-counter">
            {String(active + 1).padStart(2, '0')} / {String(PROJECT_LEADERS.length).padStart(2, '0')}
          </div>

          <div className="pl-identity">
            <div className="pl-photo-wrap">
              <img
                src={leader.photo}
                alt={leader.name}
                onError={e => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <span className="pl-photo-fallback">{leader.initials}</span>
            </div>
            <div>
              <div className="pl-name">{leader.name}</div>
              <div className="pl-role">{leader.role}</div>
              {leader.contact && (
                <a href={`mailto:${leader.contact}`} className="pl-email">
                  {leader.contact}
                </a>
              )}
            </div>
          </div>

          <div className="pl-tags">
            {leader.tags.map(t => (
              <span key={t} className="pl-tag">{t}</span>
            ))}
          </div>

          <p className="pl-bio">{leader.bio}</p>
        </div>

      </div>
    </section>
  )
}

// ─── DIAL WHEEL SVG ─────────────────────────────────────────
function DialWheel({ rotation = 0, activeDay = 0 }) {
  const cx = 500, cy = 500
  const total = DAY_PROGRAM.length

  return (
    <svg viewBox="0 0 1000 1000" style={{ width:'100%', height:'100%', overflow:'visible' }}>
      <defs>
        <radialGradient id="dialGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a5fd4" stopOpacity="0.07" />
          <stop offset="60%" stopColor="#1a5fd4" stopOpacity="0.02" />
          <stop offset="100%" stopColor="#1a5fd4" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={cx} cy={cy} r={490} fill="url(#dialGlow)" />

      {/* Concentric rings */}
      {[490, 480, 460, 400, 340, 260, 180].map((r, i) => (
        <circle key={r} cx={cx} cy={cy} r={r} fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={i === 1 ? 1 : 0.5}
          strokeDasharray={i === 3 ? '4 8' : i === 5 ? '2 6' : undefined}
        />
      ))}

      {/* Rotating tick ring */}
      <g style={{ transformOrigin:'500px 500px', transform:`rotate(${rotation}deg)`, transition:'transform 0.06s linear' }}>
        {Array.from({ length: 72 }).map((_, i) => {
          const angle = (i / 72) * 2 * Math.PI
          const major = i % 6 === 0
          const r1 = major ? 468 : 476
          const x1 = cx + r1 * Math.cos(angle), y1 = cy + r1 * Math.sin(angle)
          const x2 = cx + 490 * Math.cos(angle), y2 = cy + 490 * Math.sin(angle)
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={major ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.06)'}
            strokeWidth={major ? 1.5 : 0.4} />
        })}

        {/* Day labels on ring */}
        {DAY_PROGRAM.map((d, i) => {
          const angle = (i / total) * 2 * Math.PI - Math.PI / 2
          const r = 430
          const x = cx + r * Math.cos(angle)
          const y = cy + r * Math.sin(angle)
          const deg = (angle * 180 / Math.PI) + 90
          return (
            <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="central"
              fill="rgba(255,255,255,0.1)" fontSize="8" fontFamily="monospace"
              fontWeight="600" letterSpacing="0.12em"
              transform={`rotate(${deg} ${x} ${y})`}
            >
              JOUR {d.num}
            </text>
          )
        })}
      </g>

      {/* Day dots at fixed positions */}
      {DAY_PROGRAM.map((_, i) => {
        const angle = (i / total) * 2 * Math.PI - Math.PI / 2
        const r = 380
        const x = cx + r * Math.cos(angle)
        const y = cy + r * Math.sin(angle)
        const isActive = i === activeDay
        return (
          <g key={i}>
            {isActive && <>
              <circle cx={x} cy={y} r={20} fill="none" stroke="rgba(26,95,212,0.25)" strokeWidth={1} />
              <circle cx={x} cy={y} r={13} fill="none" stroke="rgba(26,95,212,0.45)" strokeWidth={1} />
            </>}
            <line x1={cx} y1={cy} x2={x} y2={y}
              stroke={isActive ? 'rgba(26,95,212,0.5)' : 'rgba(255,255,255,0.03)'}
              strokeWidth={isActive ? 1 : 0.3}
              strokeDasharray={isActive ? 'none' : '3 6'}
              style={{ transition:'all 0.5s ease' }}
            />
            <circle cx={x} cy={y} r={isActive ? 7 : 3}
              fill={isActive ? '#1a5fd4' : 'rgba(255,255,255,0.18)'}
              style={{ transition:'all 0.4s ease' }}
            />
          </g>
        )
      })}

      {/* Active needle */}
      {(() => {
        const angle = (activeDay / total) * 2 * Math.PI - Math.PI / 2
        const ex = cx + 490 * Math.cos(angle)
        const ey = cy + 490 * Math.sin(angle)
        return <line x1={cx} y1={cy} x2={ex} y2={ey}
          stroke="rgba(26,95,212,0.5)" strokeWidth={1}
          style={{ transition:'all 0.5s ease' }} />
      })()}

      {/* Center */}
      <circle cx={cx} cy={cy} r={8} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={0.4} />
      <circle cx={cx} cy={cy} r={3} fill="rgba(255,255,255,0.12)" />
      <circle cx={cx} cy={cy} r={1} fill="rgba(26,95,212,0.6)" />
    </svg>
  )
}

// ─── Day Program Section — remplace l'ancienne dans App.jsx ──────────────────
// Garde la roue (DialWheel) intacte.
// Phase 1 (scroll 0) : grand titre cinématique sur la roue.
// Phase 2 (scroll) : titre fade-out → contenu du jour en layout horizontal pleine largeur.

function DayProgramSection() {
  const sectionRef = useRef(null)
  const [activeDay, setActiveDay] = useState(0)
  const [dialRotation, setDialRotation] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  // introProgress 0→1 : à quel point on a quitté l'écran d'intro (titre)
  // => 0 = titre pleinement visible, 1 = titre sorti, contenu du jour visible
  const [introProgress, setIntroProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const sectionH = el.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const progress = Math.max(0, Math.min(1, scrolled / sectionH))
      setScrollProgress(progress)

      // 1 "écran" supplémentaire pour l'intro → progress 0..1/6 = intro, 1/6..1 = jours
      const totalSteps = DAY_PROGRAM.length + 1 // 1 intro + 5 jours
      const introEnd = 1 / totalSteps
      const ip = Math.min(1, progress / introEnd)   // 0→1 pendant la phase intro
      setIntroProgress(ip)

      const dayProgress = Math.max(0, (progress - introEnd) / (1 - introEnd))
      setActiveDay(Math.min(DAY_PROGRAM.length - 1, Math.floor(dayProgress * DAY_PROGRAM.length)))
      setDialRotation(progress * 360)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const day = DAY_PROGRAM[activeDay]

  // opacités pilotées par introProgress
  const introOpacity  = Math.max(0, 1 - introProgress * 2.5)   // disparaît vite
  const contentOpacity = Math.max(0, (introProgress - 0.4) / 0.6) // apparaît après

  return (
    <section
      ref={sectionRef}
      id="day-program"
      style={{
        height: `${(DAY_PROGRAM.length + 2) * 100}vh`, // +1 pour l'intro
        position: 'relative',
        background: 'var(--navy)',
      }}
    >
      {/* Sticky viewport */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* Ambient gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse 70% 70% at 65% 50%, rgba(26,95,212,${0.05 + activeDay * 0.015}) 0%, transparent 65%)`,
          transition: 'background 0.8s ease',
        }} />

        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 25%, #0d2240 80%)',
        }} />

        {/* ── ROUE (toujours là, en fond à droite) ── */}
        <div style={{
          position: 'absolute',
          top: '50%', right: '-12%',
          transform: 'translateY(-50%)',
          width: 'min(140vw, 1000px)',
          height: 'min(140vw, 1000px)',
          pointerEvents: 'none', zIndex: 1,
        }}>
          <DialWheel rotation={dialRotation} activeDay={activeDay} />
        </div>

        {/* ── PHASE 1 : TITRE CINÉMATIQUE ── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          display: 'flex', alignItems: 'center',
          opacity: introOpacity,
          transform: `translateY(${-introProgress * 40}px)`,
          transition: 'none',
          pointerEvents: introOpacity > 0.1 ? 'all' : 'none',
        }}>
          <div style={{
            paddingLeft: 'clamp(24px, 5vw, 80px)',
            paddingRight: '40px',
            maxWidth: 620,
          }}>
            <p className="section-label" style={{ color: 'rgba(26,95,212,0.8)' }}>
              Full Schedule
            </p>
            <h2 style={{
              color: '#fff',
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              marginTop: 8,
              marginBottom: 24,
            }}>
              5 days,<br />
              <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.55)' }}>
                from foundation<br />to showcase.
              </em>
            </h2>
            <p style={{
              fontSize: '0.92rem',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.7,
              maxWidth: 440,
            }}>
              Workshops, hackathon, mentorship, and a public presentation
              of AI prototypes built for Cameroon.
            </p>
            <div style={{
              marginTop: 36,
              display: 'flex', alignItems: 'center', gap: 8,
              color: 'rgba(255,255,255,0.3)',
              fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              <span>Scroll to explore</span>
              <div style={{ height: 1, width: 40, background: 'rgba(255,255,255,0.2)' }} />
            </div>
          </div>
        </div>

        {/* ── PHASE 2 : CONTENU DU JOUR en layout HORIZONTAL ── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          opacity: contentOpacity,
          transform: `translateY(${(1 - introProgress) * 30}px)`,
          transition: 'none',
          pointerEvents: contentOpacity > 0.1 ? 'all' : 'none',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>

          {/* En-tête du jour — pleine largeur */}
          <div key={`header-${activeDay}`} style={{
            paddingLeft: 'clamp(24px, 5vw, 80px)',
            paddingRight: '40%', // laisse de la place à la roue
            marginBottom: 32,
            animation: 'dayBlockIn 0.5s cubic-bezier(0.4,0,0.2,1)',
          }}>
            <span style={{
              display: 'block',
              fontFamily: 'monospace',
              fontSize: '0.65rem', letterSpacing: '0.2em',
              color: 'rgba(26,95,212,0.7)',
              textTransform: 'uppercase', marginBottom: 10,
            }}>
              {day.num} / 0{DAY_PROGRAM.length}
            </span>
            <div style={{
              display: 'inline-block',
              fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'var(--blue-lt)',
              background: 'rgba(26,95,212,0.12)', border: '1px solid rgba(26,95,212,0.3)',
              borderRadius: 40, padding: '4px 14px', marginBottom: 12,
            }}>
              {day.fullDate}
            </div>
            <h3 style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 400, color: '#fff', lineHeight: 1.2,
              marginBottom: 4,
            }}>
              {day.theme}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
              Focus : <em style={{ fontStyle: 'normal', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{day.focus}</em>
            </p>
          </div>

          {/* ── Sessions en HORIZONTAL — pleine largeur, pas centrées ── */}
          <div key={`sessions-${activeDay}`} style={{
            display: 'flex',
            alignItems: 'flex-start',
            paddingLeft: 'clamp(24px, 5vw, 80px)',
            gap: 0,
            animation: 'dayBlockIn 0.55s cubic-bezier(0.4,0,0.2,1)',
          }}>
            {day.sessions.map((s, si) => (
              <div key={si} style={{
                flex: si === day.sessions.length - 1 ? '1 1 auto' : '0 0 auto',
                minWidth: 200,
                maxWidth: si === day.sessions.length - 1 ? '35%' : 280,
                paddingRight: 40,
                borderRight: si < day.sessions.length - 1
                  ? '1px solid rgba(255,255,255,0.07)'
                  : 'none',
                paddingLeft: si > 0 ? 40 : 0,
              }}>
                {/* Slot label */}
                <div style={{
                  fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
                  marginBottom: 4,
                }}>
                  {s.slot}
                </div>
                {/* Time */}
                <div style={{
                  fontSize: '0.7rem', color: 'var(--blue-lt)',
                  fontWeight: 600, marginBottom: 16, opacity: 0.7,
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {s.time}
                </div>
                {/* Items — texte brut, pas de card */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {s.items.map((item, ii) => (
                    <div key={ii} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 10,
                      fontSize: '0.83rem', color: 'rgba(255,255,255,0.65)',
                      lineHeight: 1.5,
                    }}>
                      <span style={{
                        width: 5, height: 5, borderRadius: '50%',
                        background: 'var(--blue)', flexShrink: 0, marginTop: 5,
                      }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Progress dots */}
          <div style={{
            display: 'flex', gap: 8, alignItems: 'center',
            paddingLeft: 'clamp(24px, 5vw, 80px)',
            marginTop: 36,
          }}>
            {DAY_PROGRAM.map((_, i) => (
              <div key={i} style={{
                height: 4, borderRadius: 2,
                width: i === activeDay ? 20 : 8,
                background: i === activeDay
                  ? 'var(--blue)'
                  : i < activeDay
                    ? 'rgba(26,95,212,0.4)'
                    : 'rgba(255,255,255,0.15)',
                transition: 'all 0.3s ease',
              }} />
            ))}
          </div>
        </div>

        {/* Image fantôme du jour */}
        <div style={{
          position: 'absolute', bottom: 0, right: 0,
          width: '42%', height: '52%',
          zIndex: 3, pointerEvents: 'none', overflow: 'hidden',
          maskImage: 'linear-gradient(to top left, rgba(0,0,0,0.3) 0%, transparent 65%)',
          WebkitMaskImage: 'linear-gradient(to top left, rgba(0,0,0,0.3) 0%, transparent 65%)',
        }}>
          <img key={activeDay} src={day.img} alt={day.theme}
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.12, animation: 'dayImgFade 0.7s ease' }} />
        </div>

        {/* Scroll bar latérale */}
        <div style={{
          position: 'absolute', right: 24, top: '20%', bottom: '20%',
          width: 2, background: 'rgba(255,255,255,0.05)', borderRadius: 2, zIndex: 10,
        }}>
          <div style={{
            background: 'var(--blue)', width: '100%', borderRadius: 2,
            height: `${scrollProgress * 100}%`, transition: 'height 0.1s linear',
          }} />
        </div>

      </div>
    </section>
  )
}

// ─── Domains Section (image carousel) ───────────────────────
function DomainsSection() {
  const [active, setActive] = useState(0)
  const autoRef = useRef(null)
  const [ref, visible] = useReveal()

  const startAuto = () => { autoRef.current = setInterval(() => setActive(a => (a + 1) % DOMAINS_CAROUSEL.length), 5500) }
  const stopAuto  = () => clearInterval(autoRef.current)
  useEffect(() => { startAuto(); return stopAuto }, [])

  const goTo = (i) => { stopAuto(); setActive(i); startAuto() }
  const prev = () => goTo((active - 1 + DOMAINS_CAROUSEL.length) % DOMAINS_CAROUSEL.length)
  const next = () => goTo((active + 1) % DOMAINS_CAROUSEL.length)

  const d = DOMAINS_CAROUSEL[active]

  return (
    <section className={`domains-section fade-up ${visible ? 'visible' : ''}`} id="domaines" ref={ref}>
      <div className="domains-inner">
        <div className="domains-header">
          <p className="section-label">Priority Areas</p>
          <h2>Your Prototypes Target<br />Real Challenges</h2>
          <p className="body-text" style={{ maxWidth:480 }}>
            Teams develop AI prototypes rooted in the concrete challenges facing Cameroon — across health, agriculture, education and beyond.
          </p>
        </div>

        {/* Carousel */}
        <div className="domain-carousel" onMouseEnter={stopAuto} onMouseLeave={startAuto}>
          <div className="domain-img-wrap">
            <img key={active} src={d.img} alt={d.title} className="domain-img" />
            <div className="domain-img-overlay" />
          </div>
          <div className="domain-carousel-content" key={active + '-content'}>
            <span className="domain-carousel-tag">{d.tag}</span>
            <h3 className="domain-carousel-title">{d.title}</h3>
            <p className="domain-carousel-desc">{d.desc}</p>
          </div>
          <div className="domain-counter">
            <span className="domain-counter-active">{String(active + 1).padStart(2,'0')}</span>
            <span className="domain-counter-sep">/</span>
            <span className="domain-counter-total">{String(DOMAINS_CAROUSEL.length).padStart(2,'0')}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="domain-controls">
          <div className="domain-pills">
            {DOMAINS_CAROUSEL.map((dom, i) => (
              <button key={i} className={`domain-pill ${i === active ? 'active' : ''}`} onClick={() => goTo(i)}>
                {dom.tag}
              </button>
            ))}
          </div>
          <div className="domain-nav-row">
            <div className="domain-progressbar">
              <div className="domain-progressbar-fill" style={{ width:`${((active + 1) / DOMAINS_CAROUSEL.length) * 100}%` }} />
            </div>
            <button className="domain-arrow" onClick={prev}>&#8592;</button>
            <button className="domain-arrow" onClick={next}>&#8594;</button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Events Section ──────────────────────────────────────────
function EventsSection() {
  const [ref, visible] = useReveal()
  return (
    <section className="events-section" ref={ref}>
      <div className="events-inner">
        <div className="events-header">
          <div>
            <p className="section-label light">Schedule</p>
            <h2 style={{ color:'#fff' }}>Key Events</h2>
          </div>
          <a href="#register" className="events-cta">
            Register Now <ArrowRight size={13} style={{ display:'inline', verticalAlign:'middle', marginLeft:4 }} />
          </a>
        </div>
        <div className="events-grid">
          {EVENTS.map((e, i) => (
            <div key={e.title} className={`event-card fade-up ${visible ? 'visible' : ''}`}
                 style={{ transitionDelay:`${i * 0.12}s`, position:'relative', overflow:'hidden' }}>
              {/* Subtle image bg */}
              <img src={e.img} alt="" style={{
                position:'absolute', inset:0, width:'100%', height:'100%',
                objectFit:'cover', opacity:0.07, pointerEvents:'none',
              }} />
              <div style={{ position:'relative', zIndex:1 }}>
                <div className="event-tag">{e.tag}</div>
                <h3 className="event-title">{e.title}</h3>
                <p className="event-desc">{e.desc}</p>
                <div className="event-date">
                  <Calendar size={12} style={{ display:'inline', verticalAlign:'middle', marginRight:5 }} />
                  {e.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Register Steps ──────────────────────────────────────────
function Step1({ form, set }) {
  return (
    <>
      <h3 className="step-title">Your Profile</h3>
      <p className="step-sub">Tell us about yourself and your academic background.</p>
      <div className="form-row">
        <div className="form-group">
          <label>Full Name *</label>
          <input type="text" placeholder="e.g.Georges EKAMBI" value={form.fullName} onChange={e => set('fullName', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email Address *</label>
          <input type="email" placeholder="your.name@univ-douala.cm" value={form.email} onChange={e => set('email', e.target.value)} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Phone / WhatsApp</label>
          <input type="tel" placeholder="e.g. +237 6XX XXX XXX" value={form.phone} onChange={e => set('phone', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Level of Study *</label>
          <select value={form.level} onChange={e => set('level', e.target.value)}>
            <option value="">Select…</option>
            <option>L3</option><option>M1</option><option>M2</option>
            <option>PhD</option><option>Professional / Other</option>
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Field / Department *</label>
          <input type="text" placeholder="e.g. Computer Engineering, Data Science" value={form.major} onChange={e => set('major', e.target.value)} />
        </div>
        <div className="form-group">
          <label>University / Institution *</label>
          <input type="text" placeholder="e.g. ENSPD, University of Douala" value={form.university} onChange={e => set('university', e.target.value)} />
        </div>
      </div>
    </>
  )
}

function Step2({ form, set }) {
  return (
    <>
      <h3 className="step-title">Participation Mode</h3>
      <p className="step-sub">Are you applying solo or as part of a team? Both are welcome.</p>
      <div className="form-group">
        <label>How are you participating? *</label>
        <div className="mode-selector">
          <button type="button" className={`mode-card ${form.participationMode === 'solo' ? 'active' : ''}`} onClick={() => set('participationMode','solo')}>
            <UserPlus size={28} strokeWidth={1.5} />
            <strong>Solo</strong>
            <span>I'm applying alone and open to joining or forming a team</span>
          </button>
          <button type="button" className={`mode-card ${form.participationMode === 'team' ? 'active' : ''}`} onClick={() => set('participationMode','team')}>
            <UsersRound size={28} strokeWidth={1.5} />
            <strong>As a Team</strong>
            <span>I'm applying with a pre-formed team (2–5 members)</span>
          </button>
        </div>
      </div>

      {form.participationMode === 'solo' && (
        <div className="form-group">
          <label>Are you open to being matched with other participants?</label>
          <div className="check-list">
            {['Yes, I want to be matched with a team','No, I prefer to compete solo (individual track)'].map(s => (
              <label className="check-item" key={s}>
                <input type="radio" name="lookingForTeammates" checked={form.lookingForTeammates === s} onChange={() => set('lookingForTeammates', s)} />
                <span className="check-box radio" /><span>{s}</span>
              </label>
            ))}
          </div>
          {form.lookingForTeammates === 'Yes, I want to be matched with a team' && (
            <div style={{ marginTop:'0.8rem' }}>
              <label style={{ fontSize:'0.82rem', fontWeight:600, marginBottom:'0.35rem', display:'block' }}>What skills are you looking for in teammates?</label>
              <textarea rows={3} placeholder="e.g. Looking for someone with mobile dev skills…" value={form.teamMembersDescription} onChange={e => set('teamMembersDescription', e.target.value)} />
            </div>
          )}
        </div>
      )}

      {form.participationMode === 'team' && (
        <>
          <div className="form-row">
            <div className="form-group">
              <label>Team Name *</label>
              <input type="text" placeholder="e.g. AgriVision Cameroon" value={form.teamName} onChange={e => set('teamName', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Number of Team Members *</label>
              <select value={form.teamSize} onChange={e => set('teamSize', e.target.value)}>
                <option value="">Select…</option>
                <option>2</option><option>3</option><option>4</option><option>5</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Are you the Team Leader? *</label>
            <div className="check-list">
              {['Yes, I am the team leader / main contact','No, I am a team member (the leader will apply separately)'].map(s => (
                <label className="check-item" key={s}>
                  <input type="radio" name="teamLeader" checked={form.teamLeader === s} onChange={() => set('teamLeader', s)} />
                  <span className="check-box radio" /><span>{s}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Briefly describe your team members</label>
            <textarea rows={4} placeholder={"e.g.\n- Jean Mballa (M2 AI, ENSPD) — ML Engineer\n- Fatima Aliou (L3 Telecom) — Data Collector"} value={form.teamMembersDescription} onChange={e => set('teamMembersDescription', e.target.value)} />
            <small style={{ color:'#888', fontSize:'0.76rem' }}>Each team member should ideally submit their own application as well.</small>
          </div>
          <div className="form-group">
            <label>Is your team still looking for additional members?</label>
            <div className="check-list">
              {['Yes, we are open to 1–2 more members','No, our team is complete'].map(s => (
                <label className="check-item" key={s}>
                  <input type="radio" name="lookingForTeammates2" checked={form.lookingForTeammates === s} onChange={() => set('lookingForTeammates', s)} />
                  <span className="check-box radio" /><span>{s}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}

function Step3({ form, set, toggleArr }) {
  return (
    <>
      <h3 className="step-title">Technical Skills</h3>
      <p className="step-sub">Help us understand your technical background so we can place you in the right track.</p>
      <div className="form-group">
        <label>Overall Programming / Technical Level</label>
        <div className="scale-row">
          <span className="scale-label">Beginner</span>
          {[1,2,3,4,5].map(n => (
            <button key={n} type="button" className={`scale-btn ${form.programmingLevel === n ? 'active' : ''}`} onClick={() => set('programmingLevel', n)}>{n}</button>
          ))}
          <span className="scale-label">Expert</span>
        </div>
        <div className="scale-hints">
          <span>1 = No coding experience</span>
          <span>3 = Comfortable with Python/ML basics</span>
          <span>5 = Deployed AI projects</span>
        </div>
      </div>
      <div className="form-group">
        <label>Technologies & Tools you are comfortable with</label>
        <div className="check-list two-col">
          {STACK_OPTIONS.map(s => (
            <label className="check-item" key={s}>
              <input type="checkbox" checked={form.stack.includes(s)} onChange={() => toggleArr('stack', s)} />
              <span className="check-box" /><span>{s}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label>Existing Projects or Portfolio</label>
        <textarea rows={4} placeholder="Share GitHub links, demos, or brief descriptions…" value={form.projects} onChange={e => set('projects', e.target.value)} />
      </div>
    </>
  )
}

function Step4({ form, set, toggleArr }) {
  return (
    <>
      <h3 className="step-title">Your Project Idea</h3>
      <p className="step-sub">Describe the AI solution you want to build and the impact it could have in Cameroon.</p>
      <div className="form-group">
        <label>Target Domain(s) *</label>
        <div className="check-list two-col">
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
          <textarea rows={2} placeholder="Briefly describe the problem area…" value={form.otherDomain} onChange={e => set('otherDomain', e.target.value)} />
        </div>
      )}
      <div className="form-group">
        <label>Prototype Idea *</label>
        <textarea rows={4} placeholder={'Describe the AI solution you want to build…'} value={form.prototypeIdea} onChange={e => set('prototypeIdea', e.target.value)} />
      </div>
      <div className="form-group">
        <label>Expected Impact in Cameroon</label>
        <textarea rows={3} placeholder={'Who will benefit and how?'} value={form.cameroonImpact} onChange={e => set('cameroonImpact', e.target.value)} />
      </div>
      <div className="form-group">
        <label>Desired Role(s) in the Team</label>
        <div className="check-list two-col">
          {ROLE_OPTIONS.map(r => (
            <label className="check-item" key={r}>
              <input type="checkbox" checked={form.roles.includes(r)} onChange={() => toggleArr('roles', r)} />
              <span className="check-box" /><span>{r}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label>Why do you want to join this program?</label>
        <textarea rows={3} placeholder="Tell us your motivation…" value={form.motivation} onChange={e => set('motivation', e.target.value)} />
      </div>
    </>
  )
}

// ─── Register Section ────────────────────────────────────────
function RegisterSection() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(INIT)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const TOTAL = 4

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const toggleArr = (k, v) => setForm(f => ({
    ...f, [k]: f[k].includes(v) ? f[k].filter(x => x !== v) : [...f[k], v],
  }))

  const progress = ((step - 1) / (TOTAL - 1)) * 100
  const [ref, visible] = useReveal()

  const handleSubmit = async () => {
    setSending(true); setError(null)
    try {
      await fetch(APPS_SCRIPT_URL, {
        method:'POST', mode:'no-cors',
        headers:{ 'Content-Type':'text/plain' },
        body: JSON.stringify({
          fullName:form.fullName, email:form.email, phone:form.phone,
          level:form.level, major:form.major, university:form.university,
          participationMode:form.participationMode, teamName:form.teamName,
          teamSize:form.teamSize, teamLeader:form.teamLeader,
          teamMembersDescription:form.teamMembersDescription,
          lookingForTeammates:form.lookingForTeammates,
          programmingLevel:form.programmingLevel, stack:form.stack.join(', '),
          projects:form.projects, domains:form.domains.join(', '),
          otherDomain:form.otherDomain, prototypeIdea:form.prototypeIdea,
          cameroonImpact:form.cameroonImpact, roles:form.roles.join(', '),
          motivation:form.motivation,
        }),
      })
      setSubmitted(true)
    } catch { setError('Network error. Check your connection and try again.') }
    finally { setSending(false) }
  }

  return (
    <section className={`register-section fade-up ${visible ? 'visible' : ''}`} id="register" ref={ref}>
      <div className="register-inner">
        <div className="register-left">
          <p className="section-label">2026 Application</p>
          <h2>Join the Exchange</h2>
          <p className="body-text">
            Complete the 4-step form to apply for the <strong>AI for Social Good Youth Innovation Exchange</strong>.
            Open to L3, M1/M2 and PhD students from Cameroonian universities — solo or as a team.
          </p>
          <div className="register-mode-callout">
            <div className="callout-item">
              <UserPlus size={18} />
              <div><strong>Solo Track</strong><span>Apply alone — we'll help match you with a team, or you can compete individually.</span></div>
            </div>
            <div className="callout-item">
              <UsersRound size={18} />
              <div><strong>Team Track</strong><span>Apply with your team of 2–5 members. Each member should ideally submit their own form.</span></div>
            </div>
          </div>
          <div className="register-info-list">
            <div className="register-info-item"><Calendar size={16} /><span>April 6–10, 2026</span></div>
            <div className="register-info-item"><MapPin size={16} /><span>University of Douala, Cameroon</span></div>
            <div className="register-info-item"><Mail size={16} /><span>jean.ndoumbe02@gmail.com</span></div>
            <div className="register-info-item"><Mail size={16} /><span>armiellengaffo@gmail.com</span></div>
          </div>
        </div>

        <div className="register-right">
          {!submitted ? (
            <>
              <div className="form-steps-nav">
                {STEP_LABELS.map((l, i) => (
                  <div key={l} className={`form-step-dot ${i + 1 < step ? 'done' : i + 1 === step ? 'active' : ''}`}>
                    <div className="step-dot-circle">{i + 1 < step ? <CheckCircle2 size={14} /> : i + 1}</div>
                    <span>{l}</span>
                  </div>
                ))}
              </div>
              <div className="form-progress"><div className="form-progress-fill" style={{ width:`${progress}%` }} /></div>
              <div className="form-body">
                {step === 1 && <Step1 form={form} set={set} />}
                {step === 2 && <Step2 form={form} set={set} toggleArr={toggleArr} />}
                {step === 3 && <Step3 form={form} set={set} toggleArr={toggleArr} />}
                {step === 4 && <Step4 form={form} set={set} toggleArr={toggleArr} />}
              </div>
              {error && <p className="form-error">{error}</p>}
              <div className="form-footer-nav">
                {step > 1 ? <button className="btn-back-form" onClick={() => setStep(s => s - 1)}>← Back</button> : <span />}
                <button className="btn-primary" disabled={sending} onClick={() => step < TOTAL ? setStep(s => s + 1) : handleSubmit()}>
                  {step === TOTAL ? (sending ? 'Sending…' : 'Submit Application') : 'Continue →'}
                </button>
              </div>
            </>
          ) : (
            <div className="success-card">
              <CheckCircle2 size={48} strokeWidth={1.5} />
              <h3>Application Submitted!</h3>
              <p>
                Thank you, <strong>{form.fullName}</strong>!
                {form.participationMode === 'team' && form.teamName && <> Your team <strong>"{form.teamName}"</strong> is registered.</>}
                <br /><br />
                We will contact you at <em>{form.email}</em> within 2 weeks.<br /><br />
                Start preparing your prototype — <strong>Cameroon needs you.</strong>
              </p>
              {form.participationMode === 'team' && (
                <p style={{ marginTop:'0.8rem', fontSize:'0.85rem', opacity:0.8 }}>Remind your teammates to submit their own applications as well.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/logo.png" alt="AI for Social Good" style={{ height:28, width:'auto', borderRadius:4 }} onError={e => { e.target.style.display='none' }} />
            <span>AI for Social Good · Cameroon 2026</span>
          </div>
          <p>A reciprocal exchange program between ENSPD / University of Douala, Georgia State University, Georgia Tech and the U.S. Embassy in Cameroon.</p>
          <div className="footer-contacts">
            <a href="mailto:jean.ndoumbe02@gmail.com"><Mail size={13} /> jean.ndoumbe02@gmail.com</a>
            <a href="mailto:armiellengaffo@gmail.com"><Mail size={13} /> armiellengaffo@gmail.com</a>
            <a href="https://maps.google.com/?q=University+of+Douala+Cameroon" target="_blank" rel="noopener noreferrer"><MapPin size={13} /> University of Douala, Cameroon</a>
          </div>
          <div className="footer-social">
            <a href="https://twitter.com/AIforGoodCMR" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><SocialIcon name="twitter" size={15} /></a>
            <a href="https://www.facebook.com/AIforSocialGoodCameroon" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><SocialIcon name="facebook" size={16} /></a>
            <a href="https://www.linkedin.com/company/ai-for-social-good-cameroon" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><SocialIcon name="linkedin" size={16} /></a>
            <a href="https://www.instagram.com/aiforsocialgoodcmr" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><SocialIcon name="instagram" size={16} /></a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Program</h4>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#day-program">5-Day Schedule</a></li>
            <li><a href="#programme">AI Workshops</a></li>
            <li><a href="#programme">Hackathon</a></li>
            <li><a href="#programme">Public Showcase</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Partners</h4>
          <ul>
            {PARTNERS.map(p => (
              <li key={p.name}>
                <a href={p.url} target="_blank" rel="noopener noreferrer">
                  {p.name} <ExternalLink size={10} style={{ display:'inline', verticalAlign:'middle', marginLeft:3 }} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h4>Information</h4>
          <ul>
            <li><a href="#home">April 6–10, 2026</a></li>
            <li><a href="#register">Application</a></li>
            <li><a href="mailto:jean.ndoumbe02@gmail.com">Contact</a></li>
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

// ─── App ─────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <TopBar />
      <Header />
      <Hero />
      <Countdown />
      <PartnersBar />
      <StatsSection />
      <AboutSection />
      <FeaturesStrip />
      <ProjectLeaders />
      <DayProgramSection />
      <DomainsSection />
      <EventsSection />
      <RegisterSection />
      <Footer />
    </>
  )
}