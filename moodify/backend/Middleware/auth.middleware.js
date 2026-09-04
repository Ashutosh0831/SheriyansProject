require("dotenv").config();
const webtoken = require("jsonwebtoken");
const redis = require("../config/cache.js")
const userModel = require("../Model/Auth.model.js");

async function identifyUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorised",
    });
  }

  const isBlacklistToken = await redis.get(token)

  if(isBlacklistToken){
    return res.status(401).json({
      message: "Unnauthorised access"
    })
  }

  let decodedToken = null;

  try {
    decodedToken = webtoken.verify(token, process.env.JWT_SECRET);

    req.user = decodedToken;
    next();
  } catch (err) {
    return res.json({
      message: err,
    });
  }
}

module.exports = {
  identifyUser,
};
