import { faker } from '@faker-js/faker'
import { Payload } from 'payload'

export async function createMediaFromImageUrl(payload: Payload, imageUrl: string) {
    const res = await fetch(imageUrl)
    const arrBuffer = await res.arrayBuffer()
    const buffer = Buffer.from(arrBuffer)

    const mimeType = res.headers.get('content-type') || 'image/jpeg'
    const fileSize = buffer.length
    const originalName = res.url.split('/').pop()?.split('?')[0] || 'avatar.png'
    const fileName = `${Date.now()}-${originalName}`

    if (!fileName) throw new Error('Failed to extract filename')

    return await payload.create({
        collection: 'media',
        data: { alt: faker.lorem.words(3) },
        file: {
            data: buffer,
            name: fileName,
            mimetype: mimeType,
            size: fileSize,
        },
    })
}
