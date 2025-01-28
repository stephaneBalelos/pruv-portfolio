import { query } from '#pruvious/server'


export default defineEventHandler(async (event) => {

    try {

        const result = await query('projects').select({ title: true, image: true, description: true }).all()

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