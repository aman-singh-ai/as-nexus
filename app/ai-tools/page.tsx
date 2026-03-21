'use client'
import { useState } from 'react'
import Card from '../components/Card'
import PageHeader from '../components/PageHeader'
import SearchBar from '../components/SearchBar'

const tools = [
  {
    imgSrc: 'https://api.iconify.design/simple-icons:openai.svg?color=%23ffffff',
    title: 'ChatGPT',
    desc: 'The most powerful all-rounder AI — best for writing, coding, and research.',
    link: 'https://chat.openai.com',
    iconClass: 'icon-green',
  },
  {
    imgSrc: 'https://cdn.simpleicons.org/anthropic/d97757',
    title: 'Claude AI',
    desc: 'Best for coding and long-form writing — detailed and highly accurate responses.',
    link: 'https://claude.ai',
    iconClass: 'icon-violet',
  },
  {
    imgSrc: 'https://cdn.simpleicons.org/googlegemini/8e75e9',
    title: 'Gemini',
    desc: "Google's fastest AI — real-time answers with deep search integration.",
    link: 'https://gemini.google.com',
    iconClass: 'icon-blue',
  },
  {
    imgSrc: 'https://cdn.simpleicons.org/perplexity/22d3ee',
    title: 'Perplexity',
    desc: 'Real-time research AI — verified information with immediate source citations.',
    link: 'https://perplexity.ai',
    iconClass: 'icon-cyan',
  },
  {
    imgSrc: 'https://cdn.simpleicons.org/x/ffffff',
    title: 'Grok',
    desc: '24/7 AI research assistant. Turn on DeepSearch mode to generate detailed consultant-level reports with data, insights, and references instantly.',
    link: 'https://grok.x.ai',
    iconClass: 'icon-cyan',
  },
  {
    imgSrc: 'https://api.iconify.design/lucide:layers.svg?color=%23ffffff',
    title: 'Multi',
    desc: 'All-in-one AI powerhouse. Compare 500+ models (GPT, Claude, Gemini, DeepSeek etc.) at the same time and pick the best output.',
    link: 'https://app.getmulti.ai',
    iconClass: 'icon-violet',
  },
  {
    imgSrc: 'https://api.iconify.design/lucide:mic.svg?color=%23ffffff',
    title: 'Wispr Flow AI',
    desc: 'Voice-powered writing tool. Just speak – it converts your voice into clean, professional text instantly (no typing, zero typos).',
    link: 'https://wisprflow.ai',
    iconClass: 'icon-blue',
  },
  {
    imgSrc: 'https://api.iconify.design/lucide:book-open.svg?color=%23ffffff',
    title: 'NotebookLM',
    desc: 'Smart document analyzer. Upload any PDF, audio, or link to instantly get summaries, podcasts, mind maps, and quizzes.',
    link: 'https://notebooklm.google.com',
    iconClass: 'icon-green',
  },
]

export default function AITools() {
  const [query, setQuery] = useState('')

  const filteredTools = tools.filter(tool => 
    tool.title.toLowerCase().includes(query.toLowerCase()) || 
    tool.desc.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <main>
      <PageHeader title="AI Tools" subtitle="Best AI tools curated for students & developers" />

      <div className="page-content">
        <SearchBar value={query} onChange={setQuery} placeholder="Search AI tools..." />
        
        <div className="cards-grid">
          {filteredTools.map((tool, i) => (
            <Card
              key={i}
              imgSrc={tool.imgSrc}
              title={tool.title}
              desc={tool.desc}
              link={tool.link}
              iconClass={tool.iconClass}
            />
          ))}
          {filteredTools.length === 0 && (
            <p style={{ color: '#94a3b8', textAlign: 'center', gridColumn: '1 / -1', padding: '2rem 0' }}>
              No tools found matching "{query}"
            </p>
          )}
        </div>
      </div>
    </main>
  )
}