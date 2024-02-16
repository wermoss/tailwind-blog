import blacklistNumberModel from "~/server/models/blacklist-number";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const blacklistNumber = await blacklistNumberModel.findOne({number: body.number})

    if (blacklistNumber) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Numer już istnieje'
        })
    }

    await blacklistNumberModel.create({number: body.number})

    return { message: 'ok' }

})