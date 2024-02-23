import mongoose, { model } from "mongoose"


const categorySchema = mongoose.Schema({
    name: {
        type: String,
        uppercase: true,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

export default model('category', categorySchema)