const express = require("express")
const AuthController = require("../Controller/Auth.controller.js")
const AuthMiddleware = require("../Middleware/auth.middleware.js")


const AuthRoutes = express.Router()


AuthRoutes.post("/register",AuthController.UserRegisterController);
AuthRoutes.post("/user-login",AuthController.UserLoginController);
AuthRoutes.get("/get-user",AuthMiddleware.identifyUser,AuthController.getUser);
AuthRoutes.post("/logout",AuthMiddleware.identifyUser,AuthController.UserLogoutController);


module.exports = AuthRoutes




