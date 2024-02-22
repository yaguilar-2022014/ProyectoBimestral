'use strict'

import express from "express"
import {test, register} from './user.controller.js'

const api = express.Router()
//ROLE ADMIN
api.get('/test', test)

//ROLE CLIENT
api.post('/register', register)

export default api
