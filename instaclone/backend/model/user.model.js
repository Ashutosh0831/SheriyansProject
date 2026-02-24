const mongoose = require("mongoose");




const userSchema = new mongoose.Schema({
    username : {
        type: String,
        unique:[true, "Username Already exsist"],
        required : [true, "Username is required"]
    },
    email:{
        type : String,
        unique : [true, ""],
        required : [true,"Email required"]
    },
    password : {
        type : String,
        required:[true,'Pasasword is required']
    },
    bio : String,
    profile_image : {
        type : String,
        default : "data:image/png;base64,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"
    }

})


const userModel = mongoose.model("user", userSchema);



module.exports = userModel