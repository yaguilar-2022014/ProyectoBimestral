'use strict'

import Shopping from './shopping.model.js'
import User from '../user/user.model.js'
import Product from '../product/product.model.js'

export const test = (req, res) => {
    return res.send({ message: 'SHOPPING | Function test' })
}

export const createCart = async (userfound) => {
    let data = {
        user: userfound,
    }
    console.log(data.user)
    let cart = new Shopping(data)
    await cart.save()
}

export const addProduct = async (req, res) => {
    try {
        let { id } = req.params
        let { product, amount } = req.body
        if (!product || !amount) return res.status(400).send({ message: 'Mising fields' })

        let foundProduct = await Product.findById(product)
        let foundStock = await foundProduct.stock
        if (!foundProduct) return res.status(400).send({ message: 'Product not found' })


        //Validate Stock
        if (foundStock < amount) return res.status(400).send({ message: 'Insufficient Stock, only ...' })

        //Update shopping cart
        let shoppingCart = await Shopping.findById(id).populate('user')
        //Verify if item exist in shopping cart
        let exist = shoppingCart.item.find((item) => item.product.toString() === product.toString())
        //Update
        if (exist) {
            if ((exist.amount += parseInt(amount)) > foundStock) return res.send({ message: 'Insufficient Stock' })//Callback para determinar si un elemento del arreglo es una coincidencia
        } else {
            shoppingCart.item.push({ product, amount })
        }

        await shoppingCart.save()
        return res.send(shoppingCart)
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error adding products' })
    }
}

export const buyProducts = async (req, res) => {
    let { id } = req.params
    let shoppingCart = await Shopping.findById(id).populate('item.product')

    for(let item of shoppingCart.item){
        item.product.stock -= item.amount
        await item.product.save()
    }
    shoppingCart.item=[]
    await shoppingCart.save()
    return res.send({message: 'Purchase Complete'})
}


export const regist = async(req, res)=>{

}
