require("dotenv").config()
const webtoken = require("jsonwebtoken")
const redis = require("../config/cache.js")


async function identifyUser(req,res,next){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: "Token not Provided"
        })
    }

    const isTokenBlackListed = await redis.get(token)

    if(isTokenBlackListed){
        return res.status(401).json({
            message: "Unauthorised"
        })
    }
    

    let decoded = null;

    try{
        decoded =await webtoken.verify(token,process.env.JWT_TOKEN)

        req.user= decoded;
    }catch(err){
        return res.status(400).json({
            message: "Error while decoding the token"
        })
    }

    next();

}

module.exports = identifyUser