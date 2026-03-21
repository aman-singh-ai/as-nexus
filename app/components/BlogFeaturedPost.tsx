import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import type { BlogPostInfo } from '../../lib/markdown'

interface Props { post: BlogPostInfo }

export default function BlogFeaturedPost({ post }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-xl overflow-hidden border border-white/10 bg-slate-900/40 backdrop-blur-md transition-all duration-700 hover:scale-[1.015] hover:border-blue-500/30 hover:shadow-[0_20px_40px_rgba(37,99,235,0.1)] focus:outline-none h-auto w-full relative z-10 animate-in fade-in duration-1000"
      style={{ boxSizing: 'border-box' }}
    >
      <div className="flex flex-col md:flex-row min-h-[380px]">
        {/* Thumbnail - Original 1/2 Column Balance */}
        <div className="relative w-full md:w-1/2 overflow-hidden aspect-video md:aspect-auto min-h-[220px] md:min-h-[420px] shrink-0">
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800/40">
              <span className="text-slate-500 text-[12px] font-bold uppercase tracking-[4px]">Featured Article</span>
            </div>
          )}
          
          {/* Subtle Blue Readability Overlay (Reverted to Blue style) */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-slate-950/80 hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent md:hidden" />

          {post.category && (
            <div className="absolute top-4 left-4 z-10 md:top-6 md:left-6">
              <span className="bg-blue-600/30 text-blue-100 border border-blue-600/20 px-4 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-[3px] backdrop-blur-md">
                {post.category}
              </span>
            </div>
          )}
        </div>

        {/* Content Section - 16px-24px Padding as specified */}
        <div className="flex-1 flex flex-col p-6 md:p-10 lg:p-12 gap-y-6">
          <div className="flex flex-col gap-y-3">
            {/* Title - Maintain Original Font & Style */}
            <h2 className="text-2xl md:text-4xl font-bold text-white group-hover:text-blue-400 transition-colors duration-400 leading-tight line-clamp-2">
              {post.title}
            </h2>

            {/* Meta Row - Aligned Under Title */}
            {post.date && (
              <div className="flex items-center gap-2 text-slate-400 text-[11px] md:text-sm font-semibold tracking-wider uppercase opacity-80">
                <Calendar size={14} className="text-blue-500" />
                <span>{post.date}</span>
              </div>
            )}
          </div>

          {/* Description - Clamped precisely to 3 lines */}
          <p className="text-slate-400 text-sm md:text-base leading-relaxed line-clamp-3">
            {post.description}
          </p>

          {/* Original Action Links - Reverted to Blue system */}
          <div className="mt-auto pt-6 border-t border-white/[0.05]">
            <span className="inline-flex items-center gap-2 text-blue-500 font-bold text-xs md:text-sm uppercase tracking-[3px] group-hover:gap-4 transition-all duration-500">
              Read Story <ArrowRight size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
