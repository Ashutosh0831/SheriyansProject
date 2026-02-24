const webtoken = require("jsonwebtoken")



async function identifyUser(req, res, next){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message : "Unauthorized access"
        })
    }
    let decode = null

    try{
         decode = webtoken.verify(token, process.env.JWT_SECRET)
         
    }catch(err){
        return res.status(401).json({
            message: "User not authorized",
        })
    }

    req.user = decode

    next()
}


module.exports = identifyUser