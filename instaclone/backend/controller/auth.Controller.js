const userModel = require("../model/user.model");
const webtoken = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


 async function registerController(req, res){
    const {username, email, password, bio, profile_image} = req.body

    const isUserAlready = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })

    console.log(isUserAlready);

    if(isUserAlready){
        return res.status(409).json({
            message : "already registered " + (isUserAlready.email == email ? "Email Already exsist" : "Username Already Exsist")
        })
    }

    const hashPassword =await  bcrypt.hash(password,10)

    const user = await userModel.create({
        username, email, password : hashPassword, bio, profile_image
    })

    const token = webtoken.sign({                  
        id : user._id, username : user.username
    }, process.env.JWT_SECRET, {expiresIn : "1h"})


    res.cookie("token", token)

    res.status(201).json({
        message:"Registration successful",
        username : user.username,
        email : user.email,
    })
}                              



async function loginController(req,res){
    const {email, password, username} = req.body

    const user = await userModel.findOne({
        $or:[
            {
                username : username
            },
            {
                email : email
            }
        ]
    })

    if(!user){
        return res.status(404).json({
            message : "user not registred"
        })
   }

   const userPassword = await bcrypt.compare(password, user.password)

   if(!userPassword){
    return res.status(404).json({
        message : "Password mismatch"
    })
   }

   token = webtoken.sign({
    id : user._id,
    username : user.username
   }, process.env.JWT_SECRET, {expiresIn: "1h"})


   res.cookie("token", token)

   res.status(200).json({
    message : `Welcome MR ${user.username}`,
    email : user.email,
    bio : user.bio,
    image : user.profile_image
   })
}

   module.exports = {
    registerController,
    loginController,
   }