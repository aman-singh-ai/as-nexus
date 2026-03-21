import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import type { BlogPostInfo } from '../../lib/markdown'

interface Props { post: BlogPostInfo }

export default function BlogCardPremium({ post }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-xl overflow-hidden border border-white/10 bg-slate-900/50 transition-all duration-500 hover:scale-[1.02] hover:bg-slate-900/70 hover:shadow-[0_12px_40px_rgba(37,99,235,0.15)] focus:outline-none h-auto w-full relative z-10 animate-in fade-in duration-700"
      style={{ boxSizing: 'border-box' }}
    >
      {/* Image Container - Maintain Original Aspect Logic */}
      <div className="relative w-full aspect-video overflow-hidden shrink-0">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 bg-slate-800/40" />
        )}
      </div>

      {/* Spacing Fix: Content Padding 16px as requested */}
      <div className="flex-1 flex flex-col p-4 md:p-5 gap-y-3">
        {/* Title - Keep Original Font & Style */}
        <div className="flex flex-col gap-y-1">
          <h3 className="text-xl font-bold text-white group-hover:text-blue-500 transition-colors duration-300 leading-tight line-clamp-2">
            {post.title}
          </h3>

          {/* Date Row */}
          {post.date && (
            <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium">
              <Calendar size={12} className="text-blue-600/60" />
              <span>{post.date}</span>
            </div>
          )}
        </div>

        {/* Description - Ensure stays inside card with 3 line clamping */}
        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
          {post.description}
        </p>

        {/* Action Link Reverted to original Blue-Focused style */}
        <div className="mt-auto pt-2">
          <div className="inline-flex items-center text-blue-500 font-bold text-xs uppercase tracking-widest group-hover:gap-2 transition-all duration-300">
            Read Story <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  )
}
