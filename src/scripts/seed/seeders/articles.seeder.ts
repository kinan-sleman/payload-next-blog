import { faker } from '@faker-js/faker'
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import { Payload } from 'payload'
import config from '@/payload.config'
import { ARTICLE_STATUS_OPTIONS, MAX_SUMMARY_LENGTH } from '@/collections/Articles/constants'
import { createMediaFromImageUrl } from '@/scripts/seed/lib/create-media-from-image-url'
import { slugify } from 'payload/shared'

const ARTICLES_COUNT = 5

export async function seedArticles(payload: Payload) {
    for (let i = 0; i < ARTICLES_COUNT; i++) {
        try {
            const content = faker.lorem.paragraphs(3)
            const contentLexical = convertMarkdownToLexical({
                markdown: content,
                editorConfig: await editorConfigFactory.default({ config: await config }),
            })
            const imageUrl = faker.image.url({ width: 1920, height: 1080 })
            const coverImage = await createMediaFromImageUrl(payload, imageUrl)
            if (!coverImage) {
                console.warn('Stopped seeding article because no cover image was created')
                return
            }
            const title = faker.lorem.sentence()
            const status = faker.helpers.arrayElement(Object.values(ARTICLE_STATUS_OPTIONS))
            await payload.create({
                collection: 'articles',
                data: {
                    title,
                    slug: slugify(title),
                    content: contentLexical,
                    contentSummary: content.slice(0, MAX_SUMMARY_LENGTH),
                    readTimeInMins: faker.number.int({ min: 1, max: 10 }),
                    coverImage: coverImage.id,
                    author: 1,
                    status,
                    ...(status === ARTICLE_STATUS_OPTIONS.PUBLISHED && {
                        published_at: faker.date.recent() as unknown as string,
                    }),
                },
            })
        } catch (error) {
            console.error('Failed To Seed Articles: ', error)
        }
    }
}
