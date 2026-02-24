const express = require("express");
const authController = require("../controller/auth.Controller")

const authRouter = express.Router()



//Register User Data 

authRouter.post("/register",authController.registerController)


//LOGIN USER

authRouter.post("/login", authController.loginController)


module.exports = authRouter