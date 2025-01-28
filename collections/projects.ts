import { defineCollection } from '#pruvious'
import { pageLikeCollection } from '#pruvious/standard'

export default defineCollection(
    pageLikeCollection({
        name: 'projects',
        pathPrefix: 'projects',
        allowedLayouts: ['default'],
        additionalFields: {
            title: {
                type: 'text',
                options: {
                    required: true,
                },
            },
            image: {
                type: 'image',
                options: {
                    required: true,
                },
            },
            description: {
                type: 'editor',
                options: {
                    required: true,
                },
            },
        },
        additionalPublicPagesFields: ['title', 'image', 'description'],
    })
)