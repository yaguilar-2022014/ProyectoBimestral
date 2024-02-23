import express from "express"
import cors from 'cors'
import morgan from "morgan"
import helmet from "helmet"
import { config } from "dotenv"
import userRoutes from '../src/user/user.routes.js'
import categoryRoutes from '../src/category/category.routes.js'

//Configuraciones
const app = express()
config()
const port = process.env.PORT || 3200

//Configurar Server de Express
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

//Declaración de rutas
app.use('/user', userRoutes)
app.use('/category', categoryRoutes)

//Levantar Servidor
export const initServer = () => {
    app.listen(port)
    console.log(`Server HTTP runing in port ${port}`)
}