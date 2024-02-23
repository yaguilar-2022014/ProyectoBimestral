'use strict'

import express from "express"
import {test, register, login, update, deleteUser, listUser} from './user.controller.js'
import { isAdmin, validateJwt } from "../middlewares/validate-jwt.js"

const api = express.Router()
//ROLE ADMIN
api.get('/test', [validateJwt, isAdmin], test)
api.put('/update/:id', [validateJwt, isAdmin], update)
api.delete('/deleteUser/:id', [validateJwt, isAdmin], deleteUser)
api.get('/listUser', [validateJwt, isAdmin], listUser)

//ROLE CLIENT
api.post('/register', register)
api.post('/login', login)


export default api
