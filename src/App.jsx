import { useState, useEffect } from 'react'
import './index.css'

const STATS = [
  { num: '5', label: "Jours d'immersion" },
  { num: '40+', label: 'Jeunes participants' },
  { num: '10', label: "Équipes Innovation" },
  { num: '3', label: "Domaines d'impact" },
]

const FEATURES = [
  { icon: '🤖', label: 'AI & Data Literacy Workshops' },
  { icon: '🏆', label: 'Social Good Challenge (Hackathon)' },
  { icon: '🌱', label: 'Agriculture & Santé IA' },
  { icon: '🧑‍🏫', label: 'Mentorat & Coaching' },
  { icon: '🚀', label: 'Toolkit Numérique Open-Source' },
  { icon: '🤝', label: 'Échange Réciproque US–Cameroun' },
]

const TESTIMONIALS = [
  {
    quote: "Ce programme est une opportunité unique pour les jeunes camerounais de développer des solutions IA concrètes qui répondent aux vrais défis de notre pays.",
    name: 'Prof. Aimé Takoukam', role: 'ENSPD – École Nationale Supérieure Polytechnique de Douala', emoji: '🎓',
  },
  {
    quote: "Georgia State University est fière de ce partenariat. Nous croyons que l'innovation portée par les jeunes peut transformer les systèmes de santé et d'éducation en Afrique.",
    name: 'Dr. Sarah Mitchell', role: 'Innovation Center, Georgia State University', emoji: '🏛️',
  },
  {
    quote: "Les échanges réciproques entre nos institutions incarnent la mission de diplomatie éducative de l'Ambassade. Nous soutenons pleinement cette initiative.",
    name: 'James Whitfield', role: 'Ambassade des États-Unis au Cameroun', emoji: '🇺🇸',
  },
  {
    quote: "Georgia Tech est enthousiaste à l'idée de collaborer sur l'IA pour le bien social en Afrique. Le potentiel de ces jeunes innovateurs est immense.",
    name: 'Prof. Ana Rodrigues', role: 'Georgia Institute of Technology', emoji: '⚙️',
  },
]

const SERVICES = [
  { title: 'AI & Data Literacy Workshops', body: "Formations interactives animées par des experts de Georgia State et Georgia Tech. Couvre Python, PyTorch, TFLite et les applications IA adaptées au contexte africain à faibles ressources." },
  { title: 'AI for Social Good Challenge', body: "Hackathon de 3 jours où les équipes développent des prototypes IA fonctionnels pour la santé, l'agriculture et l'éducation. Prix remis lors du Showcase public final." },
  { title: 'Mentorship & Entrepreneurship Coaching', body: "Sessions de mentorat avec des professionnels américains et camerounais. Focus sur la trajectoire du prototype vers le produit, et le dépôt open-source du code." },
]

const BLOG_POSTS = [
  { tag: 'Workshop', date: '06 Avril 2027', title: "Atelier IA & Data Literacy : Construire avec Python et TensorFlow dans un contexte africain", bg: '#1140a8', emoji: '📊' },
  { tag: 'Hackathon', date: '08 Avril 2027', title: "AI for Social Good Challenge : 48h pour prototyper une solution IA à fort impact camerounais", bg: '#0a3070', emoji: '💡' },
  { tag: 'Showcase', date: '11 Avril 2027', title: "Showcase Public : Les équipes présentent leurs prototypes devant jurys et partenaires US", bg: '#0d3b8e', emoji: '🏆' },
]

const SCHOOLS = [
  'Agriculture Camerounaise','Santé Rurale','Éducation Bilingue','Cybersécurité',
  'Télémédecine','AgriTech','EdTech','Détection de maladies','Prévision météo locale',
  'Fintech mobile','Langue Bassa/Bamiléké IA','Eau potable IoT','Supply chain cacao',
  'Diagnostic dermatologique','Yield prediction maïs',
]

const DOMAIN_OPTIONS = ['Agriculture Camerounaise','Santé Rurale','Éducation Bilingue','Cybersécurité Locale (faibles ressources)','Autre (décrire ci-dessous)']
const STACK_OPTIONS = ['Python / PyTorch','C / Embarqué','Git / GitHub','Streamlit / Flask (démos)','Federated Learning Edge']
const ROLE_OPTIONS = ['ML Coder','Prototype Developer','Cameroon Field Tester','MVP Delivery PM']
const STEP_LABELS = ['Infos de base','Projet IA','Compétences','Engagement']
const INIT = { fullName:'', email:'', level:'', major:'', domains:[], otherDomain:'', teamStatus:'', programmingLevel:0, stack:[], projects:'', prototypeIdea:'', roles:[] }

function TopBar() {
  return (
    <div className="top-bar">
      📅 06–11 Avril 2027 · Université de Douala, Cameroun &nbsp;|&nbsp; <a href="#register">Candidature ouverte — Postuler maintenant →</a>
    </div>
  )
}

function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="site-logo">
          <div className="site-logo-text">
            <strong>AI for Social Good</strong>
            <span>Youth Innovation Exchange · Cameroon 2027</span>
          </div>
        </div>
        <nav className="site-nav">
          <a href="#about">À propos</a>
          <a href="#programme">Programme</a>
          <a href="#domaines">Domaines</a>
          <a href="#partenaires">Partenaires</a>
          <a href="#register" className="nav-cta">S'inscrire</a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg-img" />
      <div className="hero-bg-overlay" />
      <div className="hero-content">
        <div className="hero-left">
          <span className="hero-eyebrow">Reciprocal Exchange Award · ENSPD × GSU × Georgia Tech</span>
          <h1 className="hero-title">
            <em>AI for Social Good:</em><br/>Youth Innovation<br/>Exchange in Cameroon
          </h1>
          <p className="hero-desc">
            Cinq jours d'ateliers, de hackathon et de mentorat à l'Université de Douala pour construire des solutions IA à fort impact pour le Cameroun — santé, agriculture, éducation.
          </p>
          <div className="hero-buttons">
            <a href="#register" className="btn btn-primary">Postuler maintenant</a>
            <a href="#about" className="btn btn-secondary">Découvrir le programme</a>
          </div>
        </div>
        <div className="hero-right">
          {[
            { icon: '📅', title: '06 – 11 Avril 2027', sub: 'Université de Douala, Cameroun' },
            { icon: '👥', title: '30 – 40 jeunes innovateurs', sub: '8–10 équipes · L3, M1/M2, PhD' },
            { icon: '🏆', title: 'Showcase public final', sub: 'Présentation devant jurys US & CM' },
            { icon: '🚀', title: 'Toolkit Open-Source', sub: 'Ressources gratuites pour les universités' },
          ].map(c => (
            <div className="hero-info-card" key={c.title}>
              <div className="hero-info-icon">{c.icon}</div>
              <div><h4>{c.title}</h4><p>{c.sub}</p></div>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-wave">
        <svg viewBox="0 0 1000 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,80 L0,40 Q250,0 500,40 Q750,80 1000,40 L1000,80 Z" fill="#ffffff" opacity="0.4"/>
          <path d="M0,80 L0,55 Q250,15 500,55 Q750,95 1000,55 L1000,80 Z" fill="#ffffff"/>
        </svg>
      </div>
    </section>
  )
}

function PartnersBar() {
  return (
    <div className="partners-bar" id="partenaires">
      <div className="partners-bar-inner">
        <p>En partenariat avec</p>
        <div className="partners-logos">
          {[
            { name: 'ENSPD Douala', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Georgia_Tech_seal.svg/200px-Georgia_Tech_seal.svg.png' },
            { name: 'Université de Douala', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Georgia_State_University_logo.svg/200px-Georgia_State_University_logo.svg.png' },
            { name: 'Georgia State University', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Georgia_State_University_logo.svg/200px-Georgia_State_University_logo.svg.png' },
            { name: 'Georgia Tech', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Georgia_Tech_seal.svg/200px-Georgia_Tech_seal.svg.png' },
            { name: 'U.S. Embassy Cameroon', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Seal_of_the_United_States_Department_of_State.svg/200px-Seal_of_the_United_States_Department_of_State.svg.png' },
          ].map(p => (
            <div className="partner-item" key={p.name}>
              <img src={p.logo} alt={p.name} onError={e=>e.target.style.display='none'}/>
              <span>{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatsSection() {
  return (
    <section className="stats-section">
      <div className="stats-wave-top">
        <svg viewBox="0 0 1000 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 L1000,0 L1000,40 Q500,80 0,40 Z" fill="#ffffff"/>
        </svg>
      </div>
      <div className="stats-inner">
        <p className="stats-tagline">Innover pour changer des vies au Cameroun.</p>
        <div className="stats-grid">
          {STATS.map(s => (
            <div className="stat-item" key={s.label}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="stats-wave-bottom">
        <svg viewBox="0 0 1000 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,60 L1000,60 L1000,20 Q500,-20 0,20 Z" fill="#f7f9fc"/>
        </svg>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-inner">
        <div>
          <p className="section-eyebrow">À propos de l'événement</p>
          <h2 className="section-title">
            <span className="underline-accent">Changer des vies</span> grâce à<br/>l'intelligence artificielle.
          </h2>
          <p className="section-body">
            Ce programme d'échange réciproque réunit des jeunes innovateurs camerounais avec des professionnels de Georgia State University et Georgia Tech. Pendant 5 jours à l'Université de Douala, ils co-construisent des prototypes IA pour la santé, l'éducation et l'agriculture.
          </p>
          <p className="section-body">
            Le programme inclut des ateliers interactifs, un hackathon AI for Social Good, des sessions de mentorat en entrepreneuriat, et se conclut par un Showcase public. Un toolkit numérique gratuit sera lancé pour pérenniser l'impact dans les universités.
          </p>
          <a href="#register" className="text-link">Postuler au programme →</a>
        </div>
        <div id="programme">
          <div className="about-services-list">
            {SERVICES.map(s => (
              <div className="service-item" key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <a href="#register">En savoir plus…</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturesStrip() {
  return (
    <div className="features-strip">
      <div className="features-strip-inner">
        <div className="features-grid">
          {FEATURES.map(f => (
            <div className="feature-item" key={f.label}>
              <div className="feature-icon-wrap">{f.icon}</div>
              <span>{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Testimonials() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a+1) % TESTIMONIALS.length), 5000)
    return () => clearInterval(t)
  }, [])
  return (
    <section className="testimonials-section">
      <div className="testimonials-inner">
        <p className="section-eyebrow">Ce qu'ils disent</p>
        <h2 className="section-title">Soutenu par des institutions de premier plan</h2>
        <div className="testimonial-slider">
          <div className="testimonial-track" style={{transform:`translateX(-${active*100}%)`}}>
            {TESTIMONIALS.map((t,i) => (
              <div className="testimonial-slide" key={i}>
                <div className="testimonial-card">
                  <p className="testimonial-quote">"{t.quote}"</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">{t.emoji}</div>
                    <div>
                      <div className="author-name">{t.name}</div>
                      <div className="author-role">{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="slider-dots">
          {TESTIMONIALS.map((_,i) => (
            <button key={i} className={`slider-dot ${i===active?'active':''}`} onClick={()=>setActive(i)}/>
          ))}
        </div>
      </div>
    </section>
  )
}

function DomainsSection() {
  return (
    <section className="schools-section" id="domaines">
      <div className="schools-inner">
        <p className="section-eyebrow">Domaines prioritaires</p>
        <h2 className="section-title">Vos prototypes ciblent des enjeux réels</h2>
        <p className="schools-subtitle">Les équipes développent des prototypes IA ancrés dans les défis concrets du Cameroun.</p>
        <div className="schools-grid">
          {SCHOOLS.map(s => <span className="school-tag" key={s}>{s}</span>)}
        </div>
      </div>
    </section>
  )
}

function BlogSection() {
  return (
    <section className="blog-section">
      <div className="blog-inner">
        <div className="blog-header">
          <div>
            <p className="section-eyebrow">Programme</p>
            <h2 className="section-title">Événements clés</h2>
          </div>
          <a href="#register" className="blog-see-all">Voir tout →</a>
        </div>
        <div className="blog-grid">
          {BLOG_POSTS.map(p => (
            <article className="blog-card" key={p.title}>
              <div className="blog-card-img-placeholder" style={{background:p.bg}}>
                <span style={{fontSize:'3rem'}}>{p.emoji}</span>
              </div>
              <div className="blog-card-body">
                <div className="blog-card-tag">{p.tag}</div>
                <h3>{p.title}</h3>
                <div className="blog-card-meta">{p.date}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Step1({form,set}) {
  return (
    <>
      <div className="form-card-title">Informations personnelles</div>
      <div className="form-card-subtitle">Dites-nous qui vous êtes et votre établissement.</div>
      <div className="form-row">
        <div className="form-group"><label>Nom complet *</label><input type="text" placeholder="ex : Marie Nguetsa" value={form.fullName} onChange={e=>set('fullName',e.target.value)}/></div>
        <div className="form-group"><label>Email universitaire *</label><input type="email" placeholder="prenom.nom@univ-douala.cm" value={form.email} onChange={e=>set('email',e.target.value)}/></div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Niveau d'études *</label>
          <select value={form.level} onChange={e=>set('level',e.target.value)}>
            <option value="">Sélectionner…</option>
            <option>L3</option><option>M1/M2</option><option>PhD</option>
          </select>
        </div>
        <div className="form-group"><label>Filière / Département *</label><input type="text" placeholder="ex : Génie Informatique, ENSPD" value={form.major} onChange={e=>set('major',e.target.value)}/></div>
      </div>
    </>
  )
}

function Step2({form,set,toggleArr}) {
  return (
    <>
      <div className="form-card-title">Votre projet IA camerounais</div>
      <div className="form-card-subtitle">Décrivez le domaine ciblé et le statut de votre équipe.</div>
      <div className="form-group">
        <label>Domaine ciblé (choix multiple)</label>
        <div className="checkbox-list">
          {DOMAIN_OPTIONS.map(d => (
            <label className="check-row" key={d}>
              <input type="checkbox" checked={form.domains.includes(d)} onChange={()=>toggleArr('domains',d)}/>
              <span className="check-box-custom"/><span>{d}</span>
            </label>
          ))}
        </div>
      </div>
      {form.domains.includes('Autre (décrire ci-dessous)') && (
        <div className="form-group">
          <label>Précisez votre domaine</label>
          <textarea placeholder="Décrivez brièvement…" value={form.otherDomain} onChange={e=>set('otherDomain',e.target.value)}/>
        </div>
      )}
      <div className="form-group">
        <label>Statut de l'équipe</label>
        <div className="radio-list">
          {['Entreprise existante','Entreprise en cours de création'].map(s => (
            <label className="radio-row" key={s}>
              <input type="radio" name="teamStatus" checked={form.teamStatus===s} onChange={()=>set('teamStatus',s)}/>
              <span className="radio-box-custom"/><span>{s}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  )
}

function Step3({form,set,toggleArr}) {
  return (
    <>
      <div className="form-card-title">Compétences techniques concrètes</div>
      <div className="form-card-subtitle">Évaluez votre niveau et vos outils maîtrisés.</div>
      <div className="form-group">
        <label>Niveau de programmation (1 = Débutant → 5 = Expert)</label>
        <div className="scale-row">
          <span className="scale-end-label">Débutant</span>
          {[1,2,3,4,5].map(n => (
            <button key={n} type="button" className={`scale-item ${form.programmingLevel===n?'selected':''}`} onClick={()=>set('programmingLevel',n)}>{n}</button>
          ))}
          <span className="scale-end-label">Expert</span>
        </div>
      </div>
      <div className="form-group">
        <label>Stack technique maîtrisé</label>
        <div className="checkbox-list">
          {STACK_OPTIONS.map(s => (
            <label className="check-row" key={s}>
              <input type="checkbox" checked={form.stack.includes(s)} onChange={()=>toggleArr('stack',s)}/>
              <span className="check-box-custom"/><span>{s}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label>Prototypes / Projets existants (liens GitHub bienvenus)</label>
        <textarea rows={4} placeholder="ex : github.com/monprofil/agro-detect – détection maladies bananiers (TFLite, 84% accuracy)" value={form.projects} onChange={e=>set('projects',e.target.value)}/>
      </div>
    </>
  )
}

function Step4({form,set,toggleArr}) {
  return (
    <>
      <div className="form-card-title">Votre engagement concret</div>
      <div className="form-card-subtitle">Décrivez votre idée de prototype et votre rôle souhaité.</div>
      <div className="form-group">
        <label>Idée de prototype + impact camerounais</label>
        <textarea rows={5} placeholder={`ex : "Application bananiers, tests à Douala, code open-source — détecte la Fusariose via photo smartphone sans connexion internet."`} value={form.prototypeIdea} onChange={e=>set('prototypeIdea',e.target.value)}/>
      </div>
      <div className="form-group">
        <label>Rôles souhaités dans l'équipe</label>
        <div className="checkbox-list">
          {ROLE_OPTIONS.map(r => (
            <label className="check-row" key={r}>
              <input type="checkbox" checked={form.roles.includes(r)} onChange={()=>toggleArr('roles',r)}/>
              <span className="check-box-custom"/><span>{r}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  )
}

function RegisterSection() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(INIT)
  const [submitted, setSubmitted] = useState(false)
  const TOTAL = 4
  const set = (k,v) => setForm(f=>({...f,[k]:v}))
  const toggleArr = (k,v) => setForm(f=>({...f,[k]:f[k].includes(v)?f[k].filter(x=>x!==v):[...f[k],v]}))
  const progress = ((step-1)/TOTAL)*100

  return (
    <section className="register-section" id="register">
      <div className="register-inner">
        <p className="section-eyebrow">Candidature 2027</p>
        <h2 className="section-title">Rejoignez l'échange</h2>
        <p className="register-subtitle">
          Remplissez le formulaire en 4 étapes pour candidater à l'<strong>AI for Social Good Youth Innovation Exchange</strong>. Ouvert aux étudiants L3, M1/M2 et PhD des universités camerounaises.
        </p>
        {!submitted && (
          <>
            <div className="form-progress-wrap">
              <div className="form-progress-bar" style={{width:`${progress}%`}}/>
            </div>
            <div className="form-steps-labels">
              {STEP_LABELS.map((l,i) => (
                <span key={l} className={`form-step-label ${i+1===step?'active':i+1<step?'done':''}`}>
                  {i+1<step?'✓ ':`${i+1}. `}{l}
                </span>
              ))}
            </div>
          </>
        )}
        <div className="form-card">
          {submitted ? (
            <div className="success-wrap">
              <div className="success-icon">🎉</div>
              <h2>Candidature envoyée !</h2>
              <p>Merci <strong>{form.fullName}</strong> ! Votre candidature a bien été reçue.<br/>Nous vous contacterons à <em>{form.email}</em> dans les 2 semaines.<br/><br/>Préparez votre prototype — <strong>le Cameroun a besoin de vous.</strong></p>
            </div>
          ) : (
            <>
              {step===1 && <Step1 form={form} set={set}/>}
              {step===2 && <Step2 form={form} set={set} toggleArr={toggleArr}/>}
              {step===3 && <Step3 form={form} set={set} toggleArr={toggleArr}/>}
              {step===4 && <Step4 form={form} set={set} toggleArr={toggleArr}/>}
              <div className="form-nav">
                {step>1 ? <button className="btn-back" onClick={()=>setStep(s=>s-1)}>← Retour</button> : <span/>}
                <button className="btn-next" onClick={()=>step<TOTAL?setStep(s=>s+1):setSubmitted(true)}>
                  {step===TOTAL?'✓ Soumettre ma candidature':'Suivant →'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <div className="footer-brand-logo">AI for Social Good<br/>Youth Innovation Exchange · Cameroon 2027</div>
          <p>Un programme d'échange réciproque entre ENSPD / Université de Douala, Georgia State University, Georgia Tech et l'Ambassade américaine au Cameroun.</p>
          <div className="footer-social">
            <a href="#">🐦</a><a href="#">📘</a><a href="#">💼</a><a href="#">📸</a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Programme</h4>
          <ul>
            <li><a href="#about">À propos</a></li>
            <li><a href="#programme">Ateliers IA</a></li>
            <li><a href="#programme">Hackathon</a></li>
            <li><a href="#programme">Showcase Public</a></li>
            <li><a href="#programme">Toolkit Open-Source</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Partenaires</h4>
          <ul>
            <li><a href="#">ENSPD Douala</a></li>
            <li><a href="#">Université de Douala</a></li>
            <li><a href="#">Georgia State University</a></li>
            <li><a href="#">Georgia Tech</a></li>
            <li><a href="#">U.S. Embassy Cameroon</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Informations</h4>
          <ul>
            <li><a href="#">06–11 Avril 2027</a></li>
            <li><a href="#">Douala, Cameroun</a></li>
            <li><a href="#register">Candidature</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        © 2027 AI for Social Good – Youth Innovation Exchange in Cameroon &nbsp;|&nbsp; Reciprocal Exchange Award · ENSPD × Georgia State University × Georgia Tech
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <TopBar/>
      <Header/>
      <Hero/>
      <PartnersBar/>
      <StatsSection/>
      <AboutSection/>
      <FeaturesStrip/>
      <Testimonials/>
      <DomainsSection/>
      <BlogSection/>
      <RegisterSection/>
      <Footer/>
    </>
  )
}
