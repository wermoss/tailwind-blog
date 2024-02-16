export default defineEventHandler(async (event) => {
    try {
      const body = await readBody(event)
      // You can now use the information comes with request body
      console.log('Email', body.email)
      console.log('Status', body.event)
    } catch (error) {
      console.error(error)
    }
  })