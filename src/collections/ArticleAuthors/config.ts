import { ARTICLE_AUTHOR_ROLE_OPTIONS } from "@/collections/ArticleAuthors/constants";
import { CollectionConfig } from "payload";

export const ArticleAuthors: CollectionConfig = {
    slug: 'article-authors',
    admin: {
        useAsTitle: 'name', 
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'role',
            type: 'select',
            options: Object.values(ARTICLE_AUTHOR_ROLE_OPTIONS),
            defaultValue: ARTICLE_AUTHOR_ROLE_OPTIONS.STAFF_WRITER,
            required: true,
        },
        {
            name: 'avatar',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
    ]
}