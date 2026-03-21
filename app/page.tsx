'use client'

import { Sparkles, ArrowRight, ExternalLink, MessageCircle, Linkedin, Github } from 'lucide-react'
import TransitionLink from './components/TransitionLink'

const navCards = [
  { title: 'AI Tools', href: '/ai-tools', delay: '0.4s' },
  { title: 'Web Apps', href: '/web-apps', delay: '0.5s' },
  { title: 'Blog', href: '/blog', delay: '0.6s' },
  { title: 'Resources', href: '/resources', delay: '0.7s' },
  { title: 'Connect', href: '/connect', delay: '0.8s' },
]

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="hero">
        {/* Blue glow background */}
        <div className="hero-glow" />
        <div className="hero-glow-2" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '900px' }}>
          <div className="hero-badge" style={{ animationDelay: '0.1s' }}>
            <Sparkles size={16} />
            <span>AI + Learning Hub</span>
          </div>

          <h1 className="hero-title-enhanced" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', marginBottom: '1rem' }}>
            <span className="hero-word">AS</span>{' '}
            <span className="hero-word hero-word-glow">NEXUS</span>
          </h1>

          <p className="hero-subtitle" style={{ fontSize: '1.5rem', fontWeight: 500, color: '#e2e8f0', marginBottom: '0.5rem' }}>
            Explore AI tools and web apps
          </p>

          <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
            Your ultimate hub for discovering the best artificial intelligence products, 
            learning materials, and interactive web tools tailored for developers and students.
          </p>

          {/* Navigation cards grid */}
          <div className="hero-nav-grid">
            {navCards.map((card, i) => (
              <TransitionLink
                key={i}
                href={card.href}
                className="hero-nav-card"
                style={{ animationDelay: card.delay }}
              >
                <span>{card.title}</span>
                <ExternalLink size={14} className="hero-nav-card-arrow" />
              </TransitionLink>
            ))}
          </div>
        </div>
      </section>

      {/* SCROLLABLE DESCRIPTIVE SECTIONS */}
      <section className="home-section" style={{ borderTop: 'none', paddingTop: '2rem' }}>
        <h2>AI Tools Directory</h2>
        <p>
          Discover a powerful collection of the best AI tools carefully curated for 
          students, developers, and creators. Explore ChatGPT, Claude, Gemini, and 
          more to supercharge your workflow.
        </p>
        <TransitionLink href="/ai-tools" className="home-section-btn">
          Explore AI Tools <ArrowRight size={16} />
        </TransitionLink>
      </section>

      <section className="home-section">
        <h2>Web Apps & Projects</h2>
        <p>
          Check out real, fully functional web applications and tools that I've built, 
          like VT Study Mitra to help students with notes, quizzes, and exam prep.
        </p>
        <TransitionLink href="/web-apps" className="home-section-btn">
          View Projects <ArrowRight size={16} />
        </TransitionLink>
      </section>

      <section className="home-section">
        <h2>Tech Blog</h2>
        <p>
          Stay updated with the latest in technology. Read tutorials, tips, and 
          in-depth articles covering Python programming, development tools, and AI news.
        </p>
        <TransitionLink href="/blog" className="home-section-btn">
          Read Articles <ArrowRight size={16} />
        </TransitionLink>
      </section>

      <section className="home-section" style={{ paddingBottom: '7rem', borderBottom: 'none' }}>
        <h2>Development Resources</h2>
        <p>
          Everything you need to learn. Access a curated list of free coding websites, 
          AI learning platforms, courses, and tutorials perfect for beginners and pros.
        </p>
        <TransitionLink href="/resources" className="home-section-btn">
          Browse Resources <ArrowRight size={16} />
        </TransitionLink>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '3rem 2rem', textAlign: 'center', marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
          <TransitionLink href="/connect" style={{ color: '#94a3b8' }}><MessageCircle size={22} className="hover-cyan" /></TransitionLink>
          <TransitionLink href="/connect" style={{ color: '#94a3b8' }}><Linkedin size={22} className="hover-cyan" /></TransitionLink>
          <TransitionLink href="/connect" style={{ color: '#94a3b8' }}><Github size={22} className="hover-cyan" /></TransitionLink>
        </div>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
          © {new Date().getFullYear()} AS NEXUS. Designed for the Future.
        </p>
      </footer>
    </main>
  )
}