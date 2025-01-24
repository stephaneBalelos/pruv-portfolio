import { query } from '#pruvious/server'


export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    try {
        const result = await query('contact-requests').create({
            name: body.name,
            email: body.email,
            message: body.message,
          })
          if (result.success) {
            setResponseStatus(event, 201)
            return true
          } else {
            setResponseStatus(event, 400)
            return false
          }
    } catch (error) {
        console.error(error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
        })
    }
  })