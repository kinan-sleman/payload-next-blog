import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Article, Media, ArticleAuthor } from '@/payload-types'
import { RichTextRenderer } from '@/components/RichTextRenderer'
import Link from 'next/link'
import { ARTICLE_STATUS_OPTIONS } from '@/collections/Articles/constants'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  
  const payload = await getPayload({ config })
  const result = await payload.find({ 
    collection: 'articles', 
    where: { slug: { equals: slug }, status: { equals: ARTICLE_STATUS_OPTIONS.PUBLISHED } },
    depth: 1,
    limit: 1,
  })

  if (!result.docs || result.docs.length === 0) {
    notFound()
  }

  const article = result.docs[0] as Article
  const media = article.coverImage as Media
  const auth = article.author as ArticleAuthor
  const authorImage = auth?.avatar as Media

  return (
    <article className="pb-24">
      {/* Hero Section */}
      <div className="bg-neutral-50 dark:bg-neutral-900/30 border-b border-neutral-200 dark:border-neutral-800 pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="container mx-auto px-4 max-w-4xl text-center flex flex-col items-center">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-8 hover:text-indigo-500 transition-colors">
            &larr; Back to all articles
          </Link>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 text-neutral-900 dark:text-white leading-[1.1]">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-neutral-600 dark:text-neutral-400 mt-4">
            <div className="flex items-center gap-2 bg-white dark:bg-neutral-900 py-1.5 px-3 rounded-full border border-neutral-200 dark:border-neutral-800 shadow-sm">
                {authorImage && authorImage.url ? (
                  <Image src={authorImage.url} alt={auth?.name || "Author"} width={24} height={24} className="rounded-full object-cover ring-1 ring-neutral-200 dark:ring-neutral-800" unoptimized />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-[10px] font-bold">
                    {auth?.name?.charAt(0) || "U"}
                  </div>
                )}
                <span className="text-neutral-900 dark:text-white">{auth?.name || "Unknown Author"}</span>
            </div>
            
            <span className="text-neutral-300 dark:text-neutral-700">&bull;</span>
            
            <span>
              {article.published_at 
                  ? new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(article.published_at)) 
                  : "Draft"}
            </span>
            
            <span className="text-neutral-300 dark:text-neutral-700">&bull;</span>
            
            <span>{article.readTimeInMins || 5} min read</span>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="container mx-auto px-4 max-w-5xl -mt-12 md:-mt-20 relative z-10 mb-16 md:mb-24">
        <div className="aspect-video w-full relative rounded-3xl overflow-hidden shadow-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/50 dark:border-white/10">
          {media && media.url ? (
            <Image 
              src={media.url} 
              alt={media.alt || article.title} 
              fill 
              className="object-cover" 
              priority
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-neutral-400 text-lg">
              No Cover Image
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-3xl">
        {article.contentSummary && (
          <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed mb-12 pb-12 border-b border-neutral-200 dark:border-neutral-800">
            {article.contentSummary}
          </p>
        )}
        
        <div className="text-lg">
          <RichTextRenderer content={article.content} />
        </div>
      </div>
    </article>
  )
}
