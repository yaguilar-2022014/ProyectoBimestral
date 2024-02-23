'use strict'

import express from 'express'
import { create, get, test } from './product.controller.js'
import { isAdmin, validateJwt } from '../middlewares/validate-jwt.js'

const api = express.Router()
//ROLE ADMIN
api.get('/test', [validateJwt, isAdmin], test)
api.post('/create',[validateJwt, isAdmin], create)
api.get('/get', [validateJwt, isAdmin], get)

//ROLE CLIENT

export default api