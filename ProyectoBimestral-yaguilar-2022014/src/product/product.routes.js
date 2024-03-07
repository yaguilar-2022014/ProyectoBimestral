'use strict'

import express from 'express'
import {
    addProduct,
    deleteProduct,
    listIndividual,
    listMorePurchased,
    listOutOfStock,
    listProduct,
    searchByCategory,
    searchByName,
    test,
    updateProduct
} from './product.controller.js'
import { isAdmin, validateJwt } from '../middlewares/validate-jwt.js'

const api = express.Router()
//ROLE ADMIN
api.get('/test', [validateJwt, isAdmin], test)
api.post('/addProduct', [validateJwt, isAdmin], addProduct)
api.get('/listProduct', [validateJwt, isAdmin], listProduct)
api.get('/listIndividual/:id', [validateJwt, isAdmin], listIndividual)
api.get('/listOutOfStock', [validateJwt, isAdmin], listOutOfStock)
api.put('/updateProduct/:id', [validateJwt, isAdmin], updateProduct)
api.delete('/deleteProduct/:id', [validateJwt, isAdmin], deleteProduct)

//ROLE CLIENT
api.get('/listMorePurchased', [validateJwt], listMorePurchased)
api.get('/searchByName', [validateJwt], searchByName)
api.get('/searchByCategory', [validateJwt], searchByCategory)

export default api