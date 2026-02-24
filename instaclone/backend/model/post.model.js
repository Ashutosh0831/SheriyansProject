const  mongoose = require("mongoose")


const postSchema = new mongoose.Schema({
    caption : {
        type : String,
        default : "Good Caption"
    },
    image_url : {
        type : String,
        required : [true, "Image is required."]
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required :[true, "Id is required"]
    }
})




const postModel = mongoose.model("post", postSchema)


module.exports = postModel