import { generateBlurDataUrl, isELigibleForBlurDataUrl } from '@/collections/Media/lib/generate-blur-data-url'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
    slug: 'media',
    access: {
        read: () => true,
    },
    admin: {
        group: 'Users & Medias',
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
        },
        {
            name: 'blurDataUrl',
            type: 'text',
            admin: {
                hidden: true,
            }
        },
    ],
    upload: true,
    hooks: {
        beforeChange: [
            async ({operation, data, req}) => {
                if(operation !== "create") return data
                if(!isELigibleForBlurDataUrl(req?.file?.mimetype)) return data
                const base64 = await generateBlurDataUrl(req?.file?.data)
                if(!base64) return data
                data.blurDataUrl = base64
                console.log(`Generated blur data url for ${data.filename}`)
                return data
            }
        ]
    }
}
