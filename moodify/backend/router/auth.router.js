const express = require("express")
const AuthController = require("../Controllers/auth.controller.js")
const identifyUser = require("../Middlewares/auth.middleware.js")



const AuthRoute = express.Router()

AuthRoute.post("/register",AuthController.registerController)
AuthRoute.post("/login",AuthController.loginController)
AuthRoute.get("/get-user", identifyUser, AuthController.getUserController)
AuthRoute.post("/logout", identifyUser, AuthController.logoutController)

module.exports = AuthRoute


