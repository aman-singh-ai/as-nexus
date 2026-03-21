import { getPostBySlug, getAllPosts } from '../../../lib/markdown'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

// Generate static params for all known blog posts
export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const post = getPostBySlug(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="blog-post-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem' }}>
      <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-accent-cyan)', textDecoration: 'none', marginBottom: '2rem' }}>
        <ArrowLeft size={16} /> Back to Blog
      </Link>
      
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', background: 'linear-gradient(135deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {post.title}
        </h1>
        <div style={{ display: 'flex', gap: '1rem', color: '#94a3b8', fontSize: '0.9rem' }}>
          {post.date && <span>{post.date}</span>}
          {post.tags && <span>• {post.tags.join(', ')}</span>}
        </div>
      </header>
      
      <div className="markdown-content">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  )
}
