'use strict'

import User from './user.model.js'
import {encrypt} from '../utils/validator.js'

export const test = (req, res)=>{
    return res.send('User | Función Test')
}

export const register = async(req, res)=>{
    try {
        let data = req.body
        data.password = await encrypt(data.password)
        data.role = 'CLIENT'
        let user = new User(data)
        await user.save()
        return res.send({message:'Registered Successfully!!'})
    } catch (err) {
        console.error(err)
    }
}
