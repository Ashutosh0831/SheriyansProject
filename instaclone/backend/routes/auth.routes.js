const express = require("express");
const authController = require("../controller/auth.Controller");
const identifyUser = require("../middleware/token.middleware");


const authRouter = express.Router()



//Register User Data 

authRouter.post("/register",authController.registerController)


//LOGIN USER

authRouter.post("/login", authController.loginController)


//Get Login user details

authRouter.get("/get-me", identifyUser,authController.getLoginController)


module.exports = authRouter