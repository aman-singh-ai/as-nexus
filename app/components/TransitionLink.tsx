'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useLoading } from '../context/LoadingContext'
import { ReactNode } from 'react'

export default function TransitionLink({ 
  href, 
  children, 
  className,
  style
}: { 
  href: string; 
  children: ReactNode; 
  className?: string;
  style?: React.CSSProperties;
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { startLoading, stopLoading } = useLoading()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    
    // If already on the same page, do nothing
    if (pathname === href) return

    // Start animation
    startLoading()
    
    // Wait for screen to cover
    setTimeout(() => {
      router.push(href)
      // Allow slight delay for page to render before fading out
      setTimeout(() => {
        stopLoading()
      }, 500)
    }, 800)
  }

  return (
    <Link href={href} className={className} style={style} onClick={handleClick}>
      {children}
    </Link>
  )
}
