import { defineCollection } from '~/.pruvious'

export default defineCollection({
    name: 'contact-requests',
    mode: 'multi',
    translatable: false,
    fields: {
        name: {
            type: 'text',
            options: {
                required: true,
            },
        },
        email: {
            type: 'text',
            options: {
                required: true,
            },
        },
        message: {
            type: 'text',
            options: {
                required: true,
            },
        },
    },
})