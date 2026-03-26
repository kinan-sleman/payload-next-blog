import { ARTICLE_STATUS_OPTIONS } from "@/collections/Articles/constants";
import { generateContentSummaryHook } from "@/collections/Articles/hooks/generate-content.hook";
import { generateSlugHook } from "@/collections/Articles/hooks/generate-slug.hook";
import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext";
import { CollectionConfig } from "payload";



export const Articles: CollectionConfig = {
    slug: 'articles', // It's the unique id for this collection (because when we fetching | creating | updating data we can make it by this slug)
    admin: {
        useAsTitle: 'title',
        group: 'Articles & Authors',
    },
    fields: [
        { name: 'title', type: 'text', required: true, unique: true },
        { name: 'slug', type: 'text', unique: true, hooks: { beforeValidate: [generateSlugHook] } },
        { name: 'content', type: 'richText', required: true },
        { name: 'contentSummary', type: 'textarea', hooks: { beforeChange: [generateContentSummaryHook] } },
        { name: 'readTimeInMins', type: 'number', defaultValue: 0, hooks: {
            beforeChange: [
                ({siblingData}) => {
                    // ensure that the data is not stored in DB
                    delete siblingData.readTimeInMins
                }
            ],
            afterRead: [
                ({data}) => {
                    const text = convertLexicalToPlaintext({data: data?.content})
                    const WORDS_PER_MINUTE = 200
                    const words = text.trim().split(/\s+/).length
                    const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
                    return minutes
                }
            ]
        } },
        { name: 'coverImage', type: 'upload', relationTo: 'media', required: true },
        { name: 'author', type: 'relationship', relationTo: 'article-authors', required: true, },
        { name: 'status', type: 'select', options: Object.values(ARTICLE_STATUS_OPTIONS), defaultValue: ARTICLE_STATUS_OPTIONS.DRAFT },
        { name: 'published_at', type: 'date', required: true, admin: {
            condition: (data) => data?.status === ARTICLE_STATUS_OPTIONS.PUBLISHED,
            date: {
                pickerAppearance: 'dayAndTime'
            }
        } },
    ],
    timestamps: true,
}