import { postgresAdapter } from '@payloadcms/db-postgres'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media/config'
import { Articles } from './collections/Articles/config'
import { env } from '@/env'
import { ArticleAuthors } from '@/collections/ArticleAuthors/config'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { cloudinaryAdapter } from '@/adapters/cloudinary.adapter'
import { cloudinary } from '@/lib/cloudinary'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
        components: {
            graphics: {
                Logo: '/components/AdminLogo#AdminLogo',
                Icon: '/components/AdminIcon#AdminIcon',
            },
            views: {
                dashboard: { 
                    Component: '/components/CustomDashboard',
                },
            },
        },
        // autoLogin: {
        //     email: env.CMS_SEED_ADMIN_EMAIL,
        //     password: env.CMS_SEED_ADMIN_PASSWORD,
        // },
    },
    // every new collection we need to add it here, after that run (npm run generate:types) to generate TypeScript for it
    collections: [Users, Media, Articles, ArticleAuthors],
    // by this we can enhance editor more by adding toolbar
    editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()],
    }),
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URL || '',
        },
    }),
    sharp,
    plugins: [
        cloudStoragePlugin({
            collections: {
                media: {
                    adapter: cloudinaryAdapter,

                    disableLocalStorage: true, // Prevent Payload from saving files to disk

                    generateFileURL: ({ filename }) => {
                        const path = filename.startsWith('media/') ? filename : `media/${filename}`
                        return cloudinary.url(path, { secure: true })
                    },
                },
            },
        }),
    ],
})
