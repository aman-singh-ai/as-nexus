'use client'
import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY
      const currentProgress = (scrollTop / (documentHeight - windowHeight)) * 100
      setProgress(currentProgress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] bg-white/5 z-[10002] pointer-events-none">
      <div 
        className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 shadow-[0_0_12px_rgba(34,211,238,0.7)] transition-all duration-300 ease-out"
        style={{ width: `${Math.min(100, progress)}%` }}
      />
    </div>
  )
}
