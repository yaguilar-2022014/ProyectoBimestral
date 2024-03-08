'use strict'

import express from "express"
import { isAdmin, validateJwt } from "../middlewares/validate-jwt.js"
import { addProduct, buyProducts, test } from "./shopping.controller.js"

const api = express.Router()

api.get('/test', [validateJwt, isAdmin],test)
api.put('/addProduct/:id', [validateJwt], addProduct)
api.put('/buyProducts/:id', [validateJwt], buyProducts)

export default api