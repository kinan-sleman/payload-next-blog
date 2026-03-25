import { z } from "zod"

const payloadErrorSchema = z.object({
    status: z.number(),
    name: z.string(),
    data: z.object({
        collection: z.string(),
        errors: z.array(z.object({
            message: z.string(),
            path: z.string()
        }))
    })
})

type PayloadErrorLike = z.infer<typeof payloadErrorSchema>

function isPayloadError(error: unknown): error is PayloadErrorLike {
    return payloadErrorSchema.safeParse(error).success
}

export function isDuplicateError(error: unknown, field: string) {
    return isPayloadError(error) && 
            error.data.errors.some(
                (e) => e.path === field 
                && /already registered/i.test(e.message)
            )
}