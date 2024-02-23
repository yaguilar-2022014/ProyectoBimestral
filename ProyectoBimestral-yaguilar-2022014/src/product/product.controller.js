'use strict'

import Product from './product.model.js'
import Category from '../category/category.model.js'

export const test = (req, res)=>{
    return res.send({message: 'Product | function test'})
}

export const create = async(req, res)=>{
    try {
        let data = req.body
        let defaultId = await Category.findOne({name:'DEFAULT'})
        if(data.category == '') {
            data.category = defaultId
            let product = new Product(data)
            await product.save()
        }
        let category = await Category.findOne({_id: data.category})
        if(!category)return res.status(404).send({message: 'Category not found'})
        let product = new Product(data)
        await product.save()
        return res.send({message: 'Product Created Successfully!!'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error creating product'})
    }
}

export const get = async(req, res)=>{
    try {
        let products = await Product.find().populate('category', ['name', 'description'])
        return res.send({products})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error getting products'})
    }
}

export const update = async(req,res)=>{
    try {
        
    } catch (err) {
        console.error(err)
    }
}
