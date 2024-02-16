import { defineMongooseModel } from "#nuxt/mongoose";

export default defineMongooseModel('BlacklistNumber', {
    number: {
        type: String,
        required: true,
    }
})
