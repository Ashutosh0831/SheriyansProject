import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config();




async function connectToDatabase(){
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected successfully...");
}


export default connectToDatabase