import mongoose, { Schema, model } from "mongoose"

const shoppinSchema = mongoose.Schema({
    user:{
        type: Schema.ObjectId,
        ref: 'user',
        //required: true
    },
    item:[{
        product:{
            type: Schema.ObjectId,
            ref: 'product',
            //required: true
        },
        amount:{
            type: Number,
            //required: true
        }
    }]
})

export default model('shopping', shoppinSchema)