'use stritc'

import express from 'express'
import { create, deleteCategory, listCategory, update } from './category.controller.js'
import { isAdmin, validateJwt } from '../middlewares/validate-jwt.js'

const api = express.Router()
//ROLE ADMIN
api.post('/create', [validateJwt, isAdmin], create)
api.get('/listCategory', [validateJwt, isAdmin], listCategory)
api.put('/update/:id', [validateJwt, isAdmin], update)
api.delete('/deleteCategory/:id', [validateJwt, isAdmin], deleteCategory)

//ROLE CLIENT

export default api