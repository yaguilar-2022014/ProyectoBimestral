'use strict'

import Product from './product.model.js'
import Category from '../category/category.model.js'

export const test = (req, res) => {
    return res.send({ message: 'Product | function test' })
}

export const addProduct = async (req, res) => {
    try {
        let data = req.body
        let category = await Category.findOne({ _id: data.category })
        if (!category) return res.status(404).send({ message: 'Category not found' })

        let product = new Product(data)
        await product.save()
        return res.send({ message: 'Product added successfuly !!' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error creating product' })
    }
}

export const listProduct = async (req, res) => {
    try {
        let products = await Product.find().populate('category', ['name'])
        return res.send(products)
    } catch (err) {
        console.error(err)
    }
}

export const listIndividual = async (req, res) => {
    try {
        let { id } = req.params
        let product = await Product.findOne({ _id: id }).populate('category', ['name'])
        return res.send(product)
    } catch (err) {
        console.error(err)
    }
}

export const listOutOfStock = async (req, res) => {
    try {
        let products = await Product.findOne({ stock: 0 }).populate('category', ['name'])
        return res.send(products)
    } catch (err) {
        console.error(err)
    }
}

export const listMorePurchased = async (req, res) => {
    try {
        let products = await Product.find().populate('category', ['name']).sort({ purchased: 'desc' })
        return res.send(products)
    } catch (err) {
        console.error(err)
    }
}

export const searchByName = async (req, res) => {
    try {
        let { search } = req.body

        const regex = new RegExp(search, 'i')//Regex and 'i' for case insensitive

        let products = await Product.find({ name: regex }).populate('category', ['name'])
        if (!products) return res.status(400).send({ message: 'Products not found' })
        return res.send(products)
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error searching Products' })
    }
}

export const searchByCategory = async(req, res)=>{
    try {
        let {search} = req.body
        let products = await Product.find({category: search})
        if(!products)return res.status(400).send({message: 'Products not found'})
        return res.send(products)
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error searching products'})
    }
}


export const updateProduct = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let product = await Product.findOne({ _id: id })
        if (!product) return res.status(404).send({ message: 'Product not found' })
        let updatedProduct = await Product.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        ).populate('category', ['name'])
        return res.send({ message: 'Product updated Successfuly !!', updatedProduct })
    } catch (err) {
        console.error(err)
    }
}

export const deleteProduct = async (req, res) => {
    try {
        let { id } = req.params
        let deleted = await Product.deleteOne({ _id: id })
        if (!deleted) return res.status(404).send({ message: 'Product not fount, not deleted' })
        return res.send({ message: 'Product deleted Successfuly !!' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting Product' })
    }
}
