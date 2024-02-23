//Ejecutar Servicios
import { initServer } from "./configs/app.js"
import { connect } from "./configs/mongo.js"
import { defaultCatgory } from "./src/category/category.controller.js"
import { admin } from "./src/user/user.controller.js"

initServer()
connect()
admin()
defaultCatgory()