import { compare, hash } from "bcrypt"

export const encrypt = (password) => {
    try {
        return hash(password, 10)
    } catch (err) {
        console.error(err)
        return err
    }
}

export const checkPassword = async () => {
    try {
        return await compare(password, hash)
    } catch (err) {
        console.error(err)
        return err
    }
}
