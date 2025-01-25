import { defineCollection } from '#pruvious'
import { pageLikeCollection } from '#pruvious/standard'

export default defineCollection(
  pageLikeCollection({
    name: 'legal-pages',
    pathPrefix: 'legal',
    allowedLayouts: ['legal'],
    additionalFields: {
        title: {
        type: 'text',
        options: {
          required: true,
        },
      },
        content: {
            type: 'editor',
            options: {
            required: true,
            },
        },
    },
    additionalPublicPagesFields: ['title', 'content'],
  }),
)