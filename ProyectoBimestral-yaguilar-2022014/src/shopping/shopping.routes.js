'use strict'

import express from "express"
import { isAdmin, validateJwt } from "../middlewares/validate-jwt.js"
import { addProduct, test } from "./shopping.controller.js"

const api = express.Router()

api.get('/test', [validateJwt, isAdmin],test)
api.put('/addProduct/:id', [validateJwt], addProduct)

export default api