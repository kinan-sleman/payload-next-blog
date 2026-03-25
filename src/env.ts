import { createEnv } from '@t3-oss/env-nextjs'
import * as z from 'zod'

export const env = createEnv({
    server: {
        CMS_SEED_ADMIN_EMAIL: z.email(),
        CMS_SEED_ADMIN_PASSWORD: z.string().min(8),
        CLOUDINARY_NAME: z.string(),
        CLOUDINARY_API_KEY: z.string(),
        CLOUDINARY_API_SECRET: z.string(),
    },
    client: {
        //
    },
    runtimeEnv: {
        CMS_SEED_ADMIN_EMAIL: process.env.CMS_SEED_ADMIN_EMAIL,
        CMS_SEED_ADMIN_PASSWORD: process.env.CMS_SEED_ADMIN_PASSWORD,
        CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    },
})
