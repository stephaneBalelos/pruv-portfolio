import { defineCollection } from '#pruvious'

export default defineCollection({
    name: 'projects',
    mode: 'multi',
    translatable: true,
    fields: {
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
    }
})