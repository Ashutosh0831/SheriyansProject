const express = require("express")
const upload = require("../Middlewares/song.middleware.js")
const songController = require("../Controllers/song.controller.js")


const SongRoute = express.Router()




SongRoute.post("/", upload.single("song"), songController.uploadSong)
SongRoute.get("/", songController.getSong)
SongRoute.get("/all",songController.allSong)


module.exports = SongRoute