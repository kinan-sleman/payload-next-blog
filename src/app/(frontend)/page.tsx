import { getPayload } from 'payload'
import config from '@/payload.config'
import { ArticleCard } from '@/components/ArticleCard'
import { Article } from '@/payload-types'
import { ARTICLE_STATUS_OPTIONS } from '@/collections/Articles/constants'

export default async function Home() {
  const payload = await getPayload({ config })
  const result = await payload.find({ 
    collection: 'articles', 
    where: { status: { equals: ARTICLE_STATUS_OPTIONS.PUBLISHED } },
    sort: '-published_at',
    depth: 1,
    limit: 10,
  })

  const articles = result.docs as Article[]

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mb-16 md:mb-24 text-center mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-neutral-900 dark:text-white leading-[1.1]">
          Insights, thoughts, and <span className="text-indigo-600 dark:text-indigo-400">stories.</span>
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Discover our latest articles spanning development, design, and everything in between.
        </p>
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center bg-neutral-50 dark:bg-neutral-900/50 rounded-3xl border border-neutral-200 dark:border-neutral-800">
          <h3 className="text-2xl font-semibold mb-3 text-neutral-900 dark:text-white">No articles found</h3>
          <p className="text-neutral-500 dark:text-neutral-400 mb-6">It looks like there aren't any published articles yet.</p>
        </div>
      )}
    </div>
  )
}