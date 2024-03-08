'use strict'

import User from './user.model.js'
import { checkPassword, checkUpdate, encrypt } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'
import { createCart } from '../shopping/shopping.controller.js'

export const test = (req, res) => {
    return res.send('User | Función Test')
}

export const register = async (req, res) => {
    try {
        let data = req.body
        data.password = await encrypt(data.password)
        let user = new User(data)
        await user.save()
        let userfound = user.id
        console.log(userfound)
        await createCart(userfound)
        return res.send({ message: 'Registered Successfully!!' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering user', err })
    }
}

export const login = async (req, res) => {
    try {
        let { username, password, email } = req.body
        let user = await User.findOne({ username })
        let mail = await User.findOne({ email })
        if (user && await checkPassword(password, user.password)) {
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send({ message: `Welcome ${user.name}`, loggedUser, token })
        } else {
            let loggedUser = {
                uid: mail._id,
                username: mail.username,
                name: mail.name,
                role: mail.role
            }
            let token = await generateJwt(loggedUser)
            return res.send({ message: `Welcome ${mail.name}`, loggedUser, token })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: 'Failed to login' })
    }
}

export const admin = async () => {
    try {
        const exists = await User.findOne({ name: 'ADMIN' })
        if (exists) {
            console.log('Admin already exists')
            return
        }
        let data = {
            name: 'ADMIN',
            surname: 'ADMIN',
            email: 'ADMIN@gmail.com',
            username: 'ADMIN',
            password: '12345678',
            addres: 'Tienda',
            phone: '12345678',
            role: 'ADMIN'
        }
        data.password = await encrypt(data.password)
        let user = new User(data)
        await user.save()
        console.log('Admin Created')
        return
    } catch (err) {
        console.error(err)
        return
    }
}

export const update = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({ message: 'Have submited some data that cannot be updated or mising data' })
        let updatedUser = await User.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!updatedUser) return res.status(404).send({ message: 'User not found and not updated' })
        return res.send({ message: 'User updated successfully!!', updatedUser })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating account' })
    }
}

export const updateProfile = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({ message: 'Have submited some data that cannot be updated or mising data' })
        if (data.role) {
            return res.status(400).send({ message: 'Role cannot be updated' })
        } else {
            let updatedUser = await User.findOneAndUpdate(
                { _id: id },
                data,
                { new: true }
            )
            if (!updatedUser) return res.status(404).send({ message: 'User not found and not updated' })
            return res.send({ message: 'User updated successfully!!', updatedUser })
        }

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating account' })
    }
}

export const deleteUser = async (req, res) => {
    try {
        let { id } = req.params
        let { password, username } = req.body
        let user = await User.findOne({ username })
        if (user && await checkPassword(password, user.password)) {
            let deletedUser = await User.deleteOne({ _id: id })
            if (deletedUser.deletedCount == 0) return res.status(404).send({ message: 'User not found, not deleted' })
            return res.send({ message: 'User deleted successfully!!' })
        } else {
            return res.status(400).send({ message: 'Profile cannot be deleted' })
        }
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting user' })
    }
}

export const listUser = async (req, res) => {
    try {
        let user = await User.find({})
        return res.send({ user })
    } catch (err) {
        console.error(err)
    }
}
