'use strict'

import { checkUpdate } from '../utils/validator.js'
import Category from './category.model.js'

export const defaultCatgory = async () => {
    try {
        const exists = await Category.findOne({ name: 'DEFAULT' })
        if (exists) return
        let data = {
            name: 'DEFAULT',
            description: 'Categoría por defecto'
        }
        let category = new Category(data)
        await category.save()
        return
    } catch (err) {
        console.error(err)
    }
}

export const create = async (req, res) => {
    try {
        let data = req.body
        //Validación nombre/descripción vacío
        if (data.name == '' || data.description == '') return res.status(400).send({ message: 'Please enter a valid name or description for category' })
        //Validación nombre de categoría ya existe
        let exists = await Category.findOne({ name: data.name })
        if (exists) return res.send({ message: 'Category already exists' })
        //Guardar Categoría
        let category = new Category(data)
        await category.save()
        return res.send({ message: 'Category created Successfully!!' })
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
        let deletedCategory = await Category.deleteOne({_id: id})
        if(deletedCategory.deletedCount == 0)return res.status(404).send({message: 'Category not found, not deleted'})
        return res.send({message: 'Category deleted successfully!!'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting category' })
    }
}