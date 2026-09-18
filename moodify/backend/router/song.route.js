const express = require("express")
const upload = require("../Middlewares/song.middleware.js")
const songController = require("../Controllers/song.controller.js")
const identifyUser = require("../Middlewares/auth.middleware.js")


const SongRoute = express.Router()




SongRoute.post("/", upload.single("song"), songController.uploadSong)
SongRoute.get("/", identifyUser,songController.getSong)
SongRoute.get("/all",identifyUser,songController.allSong)


module.exports = SongRoute