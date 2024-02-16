import { defineMongooseModel } from "#nuxt/mongoose";

export default defineMongooseModel('PhoneNumber', {
    number: {
        type: String,
        required: true,
    },
    expires_at: {
        type: Date,
        required: true,
    }
})
