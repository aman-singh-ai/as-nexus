'use client'
import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import SearchBar from '../components/SearchBar'
import { Code, Brain, ArrowRight } from 'lucide-react'

const resources = [
  {
    icon: Code,
    title: 'Free Coding Websites',
    desc: 'Top platforms jahan se tum free mein coding seekh sakte ho — freeCodeCamp, W3Schools, and more.',
    link: '#',
  },
  {
    icon: Brain,
    title: 'AI Learning Platforms',
    desc: 'Best AI & ML learning resources — courses, tutorials, aur hands-on projects.',
    link: '#',
  },
]

export default function Resources() {
  const [query, setQuery] = useState('')

  const filteredResources = resources.filter(r => 
    r.title.toLowerCase().includes(query.toLowerCase()) || 
    r.desc.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <main>
      <PageHeader title="Resources" subtitle="Useful resources for learning and development" />

      <div className="page-content">
        <SearchBar value={query} onChange={setQuery} placeholder="Search resources..." />

        <div className="cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {filteredResources.map((resource, i) => (
            <a key={i} href={resource.link} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="glass-card resource-card">
                <div
                  className="feature-card-icon"
                  style={{ margin: '0 auto 1.25rem' }}
                >
                  <resource.icon size={26} />
                </div>
                <h3>{resource.title}</h3>
                <p>{resource.desc}</p>
                <span className="blog-card-link" style={{ marginTop: '1rem', justifyContent: 'center' }}>
                  Explore <ArrowRight size={14} />
                </span>
              </div>
            </a>
          ))}
          {filteredResources.length === 0 && (
            <p style={{ color: '#94a3b8', textAlign: 'center', gridColumn: '1 / -1', padding: '2rem 0' }}>
              No resources found matching "{query}"
            </p>
          )}
        </div>
      </div>
    </main>
  )
}