'use client'
import { useState } from 'react'
import SearchBar from './SearchBar'
import BlogFeaturedPost from './BlogFeaturedPost'
import BlogCardPremium from './BlogCardPremium'
import type { BlogPostInfo } from '../../lib/markdown'

interface BlogListProps {
  posts: BlogPostInfo[]
}

export default function BlogList({ posts }: BlogListProps) {
  const [query, setQuery] = useState('')

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(query.toLowerCase()) || 
    (post.description && post.description.toLowerCase().includes(query.toLowerCase())) ||
    (post.category && post.category.toLowerCase().includes(query.toLowerCase()))
  )

  const showFeatured = query === '' && filteredPosts.length > 0
  const featuredPost = showFeatured ? filteredPosts[0] : null
  const gridPosts = showFeatured ? filteredPosts.slice(1) : filteredPosts

  return (
    /* ── Root Container ── */
    <div className="py-12 w-full">
      
      {/* 1. Search - Balanced Wide Center Search with Breathable Space */}
      <div className="mb-4 md:mb-8 w-full flex justify-center px-6">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        {/* 2. Featured Section - Spacing Fix */}
        {showFeatured && featuredPost && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
            <div className="pl-1">
              <h2 className="text-3xl font-bold text-white inline-block border-b-4 border-blue-600 pb-2">
                Featured Article
              </h2>
            </div>
            {/* Dedicated Spacer for Professional Gap */}
            <div className="h-10 md:h-16" />
            <BlogFeaturedPost post={featuredPost} />
            
            {/* Deep Section Divider for Professional Flow */}
            <div className="h-20 md:h-28" />
          </section>
        )}

        {/* 3. Latest Insights - Section spacing fix */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
          <div className="pl-1">
            <h2 className="text-3xl font-bold text-white inline-block border-b-4 border-blue-600 pb-2">
              {query ? 'Results' : 'Latest Insights'}
            </h2>
          </div>
          {/* Dedicated Spacer for Professional Gap */}
          <div className="h-10 md:h-14" />

          {/* Layout Grid: 32px-48px gap for breathable professional look */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-12 gap-8">
            {gridPosts.map((post) => (
              <div key={post.slug} className="flex h-auto">
                <BlogCardPremium post={post} />
              </div>
            ))}
            
            {filteredPosts.length === 0 && (
              <div className="col-span-full py-24 text-center">
                <p className="text-xl text-slate-400">No signals found matching &quot;{query}&quot;</p>
                <p className="mt-2 text-sm text-slate-600">Try adjusting your keywords.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
