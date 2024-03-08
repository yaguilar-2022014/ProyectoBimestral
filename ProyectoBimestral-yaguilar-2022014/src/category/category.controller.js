'use strict'

import { checkUpdate } from '../utils/validator.js'
import Category from './category.model.js'
import Product from '../product/product.model.js'

export const defaultCatgory = async () => {
    try {
        const exists = await Category.findOne({ name: 'DEFAULT' })
        if (exists) return console.log('Default category already exists')
        let data = {
            name: 'DEFAULT',
            description: 'Categoría por defecto'
        }
        let category = new Category(data)
        await category.save()
        return console.log('Default category created')
    } catch (err) {
        console.error(err)
    }
}

export const create = async (req, res) => {
    try {
        let data = req.body
        //Validate Empty name
        if (data.name == '' || data.description == '') return res.status(400).send({ message: 'Please enter a valid name or description for category' })
        //Validate Category name exists
        let exists = await Category.findOne({ name: data.name })
        if (exists) return res.send({ message: 'Category already exists' })
        //Save Category
        let category = new Category(data)
        await category.save()
        return res.send({ message: 'Category created Successfully!!', category})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error creating category' })
    }
}

export const listCategory = async (req, res) => {
    try {
        let category = await Category.find({})
        return res.send({ category })
    } catch (err) {
        console.error(err)
    }
}

export const listCategoryUser = async(req, res)=>{
    try {
        let category = await Category.find({name: {$ne: 'Default'}})//$ne (Not Equal)
        return res.send(category)
    } catch (err) {
        console.error(err)
    }
}

export const update = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, false)
        if (!update) return res.status(400).send({ message: 'Have submited some data that cannot be updated or missing data' })
        let updatedCategory = await Category.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!updatedCategory) return res.status(404).send({ message: 'Category not found, not updated' })
        return res.send({ message: 'Category updated successfully!!', updatedCategory })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating category' })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        let { id } = req.params

        const defaultCatgory = await Category.findOne({name: 'DEFAULT'})
        await Product.updateMany({category: id}, {category: defaultCatgory._id})

        let deletedCategory = await Category.deleteOne({_id: id})
        if(!deletedCategory)return res.status(404).send({message: 'Category not found, not deleted'})
        return res.send({message: 'Category deleted successfully!!'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting category' })
    }
}