const express = require("express")
const upload = require("../Middlewares/song.middleware.js")
const SongController = require("../Controllers/song.controller.js")


const SongRoute = express.Router()




SongRoute.post("/", upload.single("song"), SongController)


module.exports = SongRoute