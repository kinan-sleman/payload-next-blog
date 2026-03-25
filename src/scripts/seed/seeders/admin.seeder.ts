import { getPayload } from "payload";
import { isDuplicateError } from "@/scripts/seed/lib/is-duplicate-error";
import { env } from "@/env";

export async function seedAdmin (payload: Awaited<ReturnType<typeof getPayload>>) {
    try {
        const response = await payload.create({
            collection: "users",
            data: {
                email: env.CMS_SEED_ADMIN_EMAIL,
                password: env.CMS_SEED_ADMIN_PASSWORD
            }
        })
        console.log('Admin User Created: ', response)
    } catch (error) {
        if(isDuplicateError(error, 'email')) {
            console.error('Admin user already exist')
        } else {
            console.error('Error seeding admin user: ',error)
        }
    }
}