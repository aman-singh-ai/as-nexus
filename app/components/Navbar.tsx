'use client'

import TransitionLink from './TransitionLink'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'

const links = [
  { href: '/', label: 'Home' },
  { href: '/ai-tools', label: 'AI Tools' },
  { href: '/web-apps', label: 'Web Apps' },
  { href: '/blog', label: 'Blog' },
  { href: '/resources', label: 'Resources' },
  { href: '/connect', label: 'Connect' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="navbar">
      <TransitionLink href="/" className="navbar-logo">
        <div className="relative flex items-center justify-center shrink-0 rounded-full overflow-hidden" style={{ width: '40px', height: '40px' }}>
          <Image 
            src="/logo-v3.png" 
            alt="AS Nexus Logo" 
            fill 
            priority 
            className="object-contain" 
          />
        </div>
        <span className="logo-text ml-3">AS NEXUS</span>
      </TransitionLink>

      <button
        className="mobile-menu-btn"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`navbar-links${open ? ' open' : ''}`}>
        {links.map(link => (
          <div key={link.href} onClick={() => setOpen(false)}>
            <TransitionLink
              href={link.href}
              style={pathname === link.href ? { color: '#22d3ee' } : undefined}
            >
              {link.label}
            </TransitionLink>
          </div>
        ))}
      </div>
    </nav>
  )
}
