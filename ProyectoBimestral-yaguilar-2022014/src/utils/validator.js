import { compare, hash } from "bcrypt"

export const encrypt = (password) => {
    try {
        return hash(password, 10)
    } catch (err) {
        console.error(err)
        return err
    }
}

export const checkPassword = async (password, hash) => {
    try {
        return await compare(password, hash)
    } catch (err) {
        console.error(err)
        return err
    }
}

export const checkUpdate = (data, userId)=>{
    if(userId){
        if(
            Object.entries(data).length === 0 ||
            data.password || data.password == '' ||
            data.role == ''
        )return false
        return true
    }else{
        if(
            Object.entries(data).length === 0 ||
            data.name == '' ||
            data.description == ''
        )return false
    }return true
}
