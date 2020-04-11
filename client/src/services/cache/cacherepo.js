// Cache dependencies on api
// Once api invoked, the depended cache needs to be cleaned

export const cacheRepository = {
    upload_textbook: [
        'fetching-uploads'
    ],
    delete_uploads: [
        'fetching-uploads'
    ]
}
