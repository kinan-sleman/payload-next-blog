import Link from 'next/link'
import Image from 'next/image'
import { Article, Media, ArticleAuthor } from '@/payload-types'

export function ArticleCard({ article }: { article: Article }) {
  const { title, slug, contentSummary, coverImage, author, published_at, readTimeInMins } = article
  const media = coverImage as Media
  const auth = author as ArticleAuthor
  const authorImage = auth?.avatar as Media

  return (
    <Link 
      href={`/articles/${slug}`} 
      className="group flex flex-col h-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1"
    >
      <div className="relative aspect-16/10 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        {media && media.url ? (
          <Image 
            src={media.url} 
            alt={media.alt || title} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105" 
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
            No Image
          </div>
        )}
      </div>
      
      <div className="flex flex-col flex-1 p-6 md:p-8">
        <h2 className="text-2xl font-bold leading-tight mb-3 text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
          {title}
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 line-clamp-3 mb-6 flex-1 text-base leading-relaxed">
          {contentSummary || "No summary available for this article."}
        </p>

        <div className="flex items-center gap-4 mt-auto pt-6 border-t border-neutral-100 dark:border-neutral-800">
          {authorImage && authorImage.url ? (
            <Image 
              src={authorImage.url} 
              alt={auth?.name || "Author"} 
              width={40} 
              height={40} 
              className="rounded-full ring-2 ring-white dark:ring-neutral-900 object-cover" 
              unoptimized
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 ring-2 ring-white dark:ring-neutral-900">
              {auth?.name?.charAt(0) || "U"}
            </div>
          )}
          <div className="flex flex-col text-sm text-neutral-500 dark:text-neutral-400">
            <span className="font-semibold text-neutral-900 dark:text-white">{auth?.name || "Unknown Author"}</span>
            <div className="flex items-center gap-1.5 text-xs">
              <span>
                {published_at 
                  ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(published_at)) 
                  : "Draft"}
              </span>
              <span className="text-neutral-300 dark:text-neutral-600">&bull;</span>
              <span>{readTimeInMins || 5} min read</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
