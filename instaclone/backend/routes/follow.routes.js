const express = require("express")
const identifyUser = require("../middleware/token.middleware")
const followerController = require("../controller/follower.Controller")


const followRouter = express.Router()



followRouter.post("/:username",identifyUser,followerController.followController)
followRouter.delete("/:username", identifyUser, followerController.unfollowController)



module.exports = followRouter