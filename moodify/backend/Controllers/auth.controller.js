const authModel = require("../models/auth.model.js")
const webtoken = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const redis = require("../config/cache.js")

async function registerController(req, res){
    const {name, email, username, password, confirmpassword } = req.body

    if(name == "" || email == "" || username == "" || password == "" || confirmpassword == ""){
        return res.status(401).json({
            message: "All fields need to be filled."
        })
    }

    if (password != confirmpassword){
        return res.status(400).json({
            message: "Confirm passwrod mismatch."
        })
    }

    const isUser = await authModel.findOne({username
    });

    if(isUser){
        return res.status(400).json({
            message: "User already exists."
        })
    }
    
    const hashpassword = await bcrypt.hash(password,10);

    const user = await authModel.create({
        name: name,
        email: email,
        username: username,
        password: hashpassword
    })

    const token = webtoken.sign({
        id:user._id,
        username: user.username,
    },process.env.JWT_TOKEN)

    res.cookie("token", token)

    const safeUser = await authModel.findOne({username})

    res.status(201).json({
        message: "User registred successfully.",
        user:safeUser
    })  
}

async function loginController(req, res){
    const {username, email, password} = req.body;

    if(username == "" || email == "" || password == ""){
        return res.status(400).json({
            message: "Fields are required."
        })
    }

    const isUser = await authModel.findOne({
        $or:[
            {username},
            {email}
        ]
    }).select("+password");

    

    if(!isUser){
        return res.status(400).json({
            message: "User does not exists"
        })
    }

    const isPassword = await bcrypt.compare(password,isUser.password)

    if(!isPassword){
        return res.status(400).json({
            message: "password is incoorect."
        })
    }

    const token = webtoken.sign({
        id: isUser._id,
        username: isUser.username
    }, process.env.JWT_TOKEN)

    res.cookie("token", token)

    res.status(200).json({
        message: "Login Successfull."
    })
}

async function getUserController(req, res){
    const user = await authModel.findById(req.user.id)

    if(!user){
        return res.staus(400).json({
            message: "User not avilable"
        })
    }

    res.status(200).json({
        message: "user found",
        user
    })





}

async function logoutController(req,res){
    const token = req.cookies.token

    if(!token){
        return res.status(400).json({
            message: "Login First"
        })
    }

    res.clearCookie("token")

    await redis.set(token, Date.now().toString());

    res.status(200).json({
        message: "User Logout successfully"
    })
}

module.exports = {
    loginController,
    logoutController,
    getUserController,
    registerController,
}