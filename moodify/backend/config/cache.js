require("dotenv").config()
const Redis = require("ioredis").default


const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASS,
})

redis.on("connect",()=>{
    console.log("Redis is connected.");
    
})

redis.on("error",()=>{
    console.log("Redis is not connected");
    
})

module.exports = redis