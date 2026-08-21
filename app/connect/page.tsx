import PageHeader from '../components/PageHeader'
import { Github, Linkedin, Mail, Link } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface SocialLink {
  icon: LucideIcon
  name: string
  url: string
  handle: string
}

const socials: SocialLink[] = [
  {
    icon: Link,
    name: 'Linktree',
    url: 'https://aman-singh-ai.github.io/aman-singh-ai-linktree/',
    handle: '@aman-singh-ai',
  },

  {
    icon: Github,
    name: 'GitHub',
    url: 'https://github.com/aman-singh-ai',
    handle: '@aman-singh-ai',
  },
  
  {
    icon: Linkedin,
    name: 'LinkedIn',
    url: '#',
    handle: 'in/amansingh',
  },
  {
    icon: Mail,
    name: 'Email',
    url: 'mailto:contact@asnexus.com',
    handle: 'contact@asnexus.com',
  },
]

export default function Connect() {
  return (
    <main>
      <PageHeader title="Connect" subtitle="Follow us on social media" />

      <div className="page-content">
        <div className="cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', maxWidth: '800px', margin: '0 auto' }}>
          {socials.map((social, i) => (
            <a
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="glass-card social-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div className="social-card-icon" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <social.icon size={28} />
                </div>
                <h3>{social.name}</h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.3rem' }}>
                  {social.handle}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  )
}