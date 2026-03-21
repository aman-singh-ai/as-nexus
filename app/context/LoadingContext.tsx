'use client'
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

type LoadingContextType = {
  isLoading: boolean;
  isAnimatingOut: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: true,
  isAnimatingOut: false,
  startLoading: () => {},
  stopLoading: () => {},
})

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)
  
  // Initial page load completion
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsAnimatingOut(true)
      const timer2 = setTimeout(() => {
        setIsLoading(false)
      }, 600) // Match fade-out duration
      return () => clearTimeout(timer2)
    }, 2200) // Original animation duration
    return () => clearTimeout(timer1)
  }, [])

  const startLoading = () => {
    setIsAnimatingOut(false)
    setIsLoading(true)
  }

  const stopLoading = () => {
    setIsAnimatingOut(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 600)
  }

  return (
    <LoadingContext.Provider value={{
      isLoading,
      isAnimatingOut,
      startLoading,
      stopLoading
    }}>
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => useContext(LoadingContext)
