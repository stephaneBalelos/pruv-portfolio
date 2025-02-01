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
        links: {
            type: 'repeater',
            options: {
                subfields: {
                    label: {
                        type: 'text',
                        options: {
                            required: true,
                        },
                    },
                    url: {
                        type: 'text',
                        options: {
                            required: true,
                        },
                    },
                }
            }
        }
    }
})