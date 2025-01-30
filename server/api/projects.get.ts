import { query } from '#pruvious/server'


export default defineEventHandler(async (event) => {

const headers = event.headers

const language = headers.get('accept-language')

    try {

        const result = await query('projects').where('language', language).selectAll().populate().all()

        setResponseStatus(event, 200)
        return result

    } catch (error) {
        console.error(error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
        })
    }
})