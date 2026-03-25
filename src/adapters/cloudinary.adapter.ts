import { cloudinary } from '@/lib/cloudinary'
import type { HandleUpload, HandleDelete } from '@payloadcms/plugin-cloud-storage/types'
import type { UploadApiResponse } from 'cloudinary'

export const cloudinaryAdapter = () => ({
    name: 'cloudinary-adapter',
    async handleUpload({
        file,
        collection,
        data,
        req,
        clientUploadContext,
    }: Parameters<HandleUpload>[0]) {
        try {
            // createing a function that will upload your file in cloudinary
            // Uploading the file to Cloudinary using upload_stream.
            // Since Cloudinary's upload_stream is callback-based, we wrap it in a Promise
            // so we can use async/await syntax for cleaner, easier handling.
            // It uploads the file with a specific public_id under "media/", without overwriting existing files.
            const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: 'auto', // auto-detect file type (image, video, etc.)
                        public_id: `media/${file.filename.replace(/\.[^/.]+$/, '')}`, // Strip extension for Cloudinary public_id
                        overwrite: true,
                        use_filename: true,
                    },
                    (error, result) => {
                        if (error) return reject(error)
                        if (!result) return reject(new Error('No result returned from Cloudinary'))
                        resolve(result) // hanlde result
                    },
                )
                uploadStream.end(file.buffer) // this line send the file to cloudinary it means entire file is already in memory and will be send whole thing at once not in chunk
            })
            // file.filename = uploadResult.public_id  <- DO NOT CHANGE filename, keep original with extension
            file.mimeType = `${uploadResult.format}`
            file.filesize = uploadResult.bytes
        } catch (err) {
            console.error('Upload Error', err)
        }
    },

    async handleDelete({ collection, doc, filename, req }: Parameters<HandleDelete>[0]) {
        console.log('handleDelete has been called')

        // if filename is present then we will look for that file
        try {
            // stripping extension is necessary for destroy since public_id doesn't have it
            await cloudinary.uploader.destroy(`media/${filename.replace(/\.[^/.]+$/, '')}`)
        } catch (error) {
            // if something error occured we will catch the error and respond the error in console
            console.error('Cloudinary Delete Error:', error)
        }
    },
    staticHandler() {
        return new Response('Not implemented', { status: 501 })
    },
})
