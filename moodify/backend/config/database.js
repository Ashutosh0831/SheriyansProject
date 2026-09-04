require("dotenv").config()
const mongoose = require("mongoose")



const ConnectToDb = async function ConnectToDb(){
    await mongoose.connect(process.env.MONGO_URI)

    console.log("Database Connected Successfully...");
    
}

module.exports = ConnectToDb