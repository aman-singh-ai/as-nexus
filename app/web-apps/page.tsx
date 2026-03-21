'use client'
import { useState } from 'react'
import Card from '../components/Card'
import PageHeader from '../components/PageHeader'
import SearchBar from '../components/SearchBar'
import { BookOpen, Bot } from 'lucide-react'

const projects = [
  {
    icon: BookOpen,
    title: 'VT Study Mitra',
    desc: 'AI powered study companion for students — notes, quizzes, aur exam prep sab ek jagah.',
    link: '#',
    iconClass: 'icon-blue',
  },
  {
    icon: Bot,
    title: 'AI Tools Directory',
    desc: 'My own AI hub — curated collection of the best AI tools available.',
    link: '#',
    iconClass: 'icon-violet',
  },
]

export default function WebApps() {
  const [query, setQuery] = useState('')

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(query.toLowerCase()) || 
    p.desc.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <main>
      <PageHeader title="Web Apps" subtitle="List of useful web apps" />

      <div className="page-content">
        <SearchBar value={query} onChange={setQuery} placeholder="Search web apps..." />

        <div className="cards-grid">
          {filteredProjects.map((p, i) => (
            <Card
              key={i}
              icon={p.icon}
              title={p.title}
              desc={p.desc}
              link={p.link}
              iconClass={p.iconClass}
            />
          ))}
          {filteredProjects.length === 0 && (
            <p style={{ color: '#94a3b8', textAlign: 'center', gridColumn: '1 / -1', padding: '2rem 0' }}>
              No web apps found matching "{query}"
            </p>
          )}
        </div>
      </div>
    </main>
  )
}