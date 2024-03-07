'use strict'

import Shopping from './shopping.model.js'
import User from '../user/user.model.js'
import Product from '../product/product.model.js'

export const test = (req, res) => {
    return res.send({ message: 'SHOPPING | Function test' })
}

export const createCart = async (userfound) => {
    console.log('El user es: ', userfound)
    let data = {
        user: userfound,
    }
    console.log(data.user)
    let cart = new Shopping(data)
    await cart.save()
    console.log('Se creó')
}

export const addProduct = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let product = await Product.findOne({ _id: data.product })
        if (!product) return res.status(404).send({ message: 'Product not found' })
        let shoppingUpdated = await Shopping.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        console.log('Data: ',data)
        return res.send(shoppingUpdated)
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error adding products' })
    }
}
