import mongoose, { Schema, model } from "mongoose"

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    purchased:{
        type: Number,
        default: 0,
        required: true
    },
    category:{
        type: Schema.ObjectId,
        ref: 'category',
        required: true
    }
})

export default model('product', productSchema)