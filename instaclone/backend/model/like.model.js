const mongoose = require("mongoose")


const likeSchema = new mongoose.Schema({
    postId :{
        type : mongoose.Schema.Types.ObjectId,
        ref :"post",
        required :[true, "Post ID is required"]
    },
    username : {
        type : String,
        required: [true, "Username is required"]
    }
},{timestamps: true})

likeSchema.index({postId :1, username : 1},{unique : true})


const likeModel = mongoose.model("likes", likeSchema)

module.exports = likeModel