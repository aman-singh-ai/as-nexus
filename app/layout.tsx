'use client'

import './globals.css'
import Navbar from './components/Navbar'
import StarField from './components/StarField'
import LoadingScreen from './components/LoadingScreen'
import RocketCursor from './components/RocketCursor'
import { LoadingProvider } from './context/LoadingContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>AS Nexus</title>
        <meta name="description" content="AI Tools • Web Apps • Coding Resources — Your one-stop tech hub" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <LoadingProvider>
          <RocketCursor />
          <LoadingScreen />
          <StarField />
          <Navbar />
          {children}
        </LoadingProvider>
      </body>
    </html>
  )
}