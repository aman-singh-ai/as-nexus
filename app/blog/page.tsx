import PageHeader from '../components/PageHeader'
import BlogList from '../components/BlogList'
import { getAllPosts } from '../../lib/markdown'

export default function Blog() {
  const posts = getAllPosts()

  return (
    /* ── Definitive Centering Wrapper ── */
    <main className="bg-[#02040a] min-h-screen w-full flex flex-col items-center">
      {/* Outer Flex Centerer */}
      <div className="w-full flex justify-center">
        {/* Inner Constrained Content Box */}
        <div className="w-full max-w-[1100px] px-6 md:px-10 lg:px-12">
          <PageHeader title="Blog" subtitle="Articles about AI, coding and technology." />
          <div className="pt-4 md:pt-12" /> 
          <BlogList posts={posts} />
        </div>
      </div>
    </main>
  )
}