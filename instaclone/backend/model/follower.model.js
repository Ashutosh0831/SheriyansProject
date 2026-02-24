const mongoose = require("mongoose")




const followerSchema = new mongoose.Schema({
    Follower  :{
        type : String,
    },
    Followee :{
        type: String,
    },
    status :{
        type : String,
        default : "pending",
        enum :{
            values :["pending", "accept", "reject"],
            message :"Staus can be only pending accept or reject"
        }
    }
},{timestamps : true})

followerSchema.index({Follower :1, Followee :1}, {unique :true})

const followerModel = mongoose.model("follow", followerSchema)

module.exports = followerModel