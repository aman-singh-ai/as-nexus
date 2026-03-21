'use client'

import { useState, useEffect } from 'react'
import { useLoading } from '../context/LoadingContext'
import Image from 'next/image'

export default function LoadingScreen() {
  const { isLoading, isAnimatingOut } = useLoading()

  // Only render particles on the client to avoid SSR hydration mismatch
  const [particles, setParticles] = useState<Array<{left: string, top: string, delay: string, duration: string, size: string}>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${2 + Math.random() * 3}s`,
      size: `${2 + Math.random() * 3}px`,
    }))
    setParticles(newParticles)
  }, [])

  if (!isLoading) return null

  return (
    <div className={`loading-screen${isAnimatingOut ? ' loading-fade-out' : ''}`}>
      {/* Animated rings */}
      <div className="loading-rings">
        <div className="loading-ring loading-ring-1" />
        <div className="loading-ring loading-ring-2" />
        <div className="loading-ring loading-ring-3" />
      </div>

      {/* Logo Image */}
      <div className="loading-logo relative flex items-center justify-center rounded-full overflow-hidden" style={{ width: '5rem', height: '5rem', marginBottom: '1.5rem', zIndex: 10 }}>
        <Image 
          src="/logo-v3.png" 
          alt="AS Nexus Logo" 
          fill 
          priority 
          className="object-contain" 
        />
      </div>

      {/* HTML Text */}
      <div className="loading-text" style={{ fontFamily: 'var(--font-space)', fontWeight: 700 }}>
        <span className="loading-letter" style={{ animationDelay: '0.3s' }}>A</span>
        <span className="loading-letter" style={{ animationDelay: '0.4s' }}>S</span>
        <span className="loading-letter loading-space" style={{ animationDelay: '0.5s' }}>&nbsp;</span>
        <span className="loading-letter loading-accent" style={{ animationDelay: '0.5s' }}>N</span>
        <span className="loading-letter loading-accent" style={{ animationDelay: '0.6s' }}>E</span>
        <span className="loading-letter loading-accent" style={{ animationDelay: '0.7s' }}>X</span>
        <span className="loading-letter loading-accent" style={{ animationDelay: '0.8s' }}>U</span>
        <span className="loading-letter loading-accent" style={{ animationDelay: '0.9s' }}>S</span>
      </div>

      {/* Loading bar */}
      <div className="loading-bar-track">
        <div className="loading-bar-fill" />
      </div>

      {/* Particles */}
      <div className="loading-particles">
        {particles.map((p, i) => (
          <div
            key={i}
            className="loading-particle"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>
    </div>
  )
}
