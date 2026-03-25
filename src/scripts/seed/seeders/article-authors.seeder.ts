import { getPayload } from "payload"
import {faker} from "@faker-js/faker"
import { isDuplicateError } from "../lib/is-duplicate-error"
import { createMediaFromImageUrl } from "../lib/create-media-from-image-url"
import { ARTICLE_AUTHOR_ROLE_OPTIONS } from "@/collections/ArticleAuthors/constants"

export async function seedArticleAuthors(payload: Awaited<ReturnType<typeof getPayload>>) {
    try {
        const imageUrl = faker.image.personPortrait({size: 256})
        const avatar = await createMediaFromImageUrl(payload, imageUrl)
        if(!avatar) {
            console.warn('Stopped seeding article author because no avatar was created')
            return
        }
        await payload.create({
            collection: "article-authors",
            data: {
                name: faker.person.fullName(),
                role: faker.helpers.arrayElement(Object.values(ARTICLE_AUTHOR_ROLE_OPTIONS)),
                avatar: avatar.id
            },
        })
    } catch (error) {
        console.error('Failed To Seed Article Authors: ',error)
    }
}