const mongoose = require("mongoose")


const songSchema = new mongoose.Schema({
    url:{
        type: String,
        required: true,
    },
    posterUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
    },
    mood: {
        type: String,
        enum: ["sad", "happy", "surprised"],
        message: "Enum is not found"
    }
})

const songModel = mongoose.model("song", songSchema)

module.exports = songModel