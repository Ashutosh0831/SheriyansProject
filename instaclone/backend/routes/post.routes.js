const express = require("express")
const postRouter = express.Router()
const multer = require("multer")
const postController = require("../controller/post.Controller")
const identifyUser = require("../middleware/token.middleware")

const upload = multer({storage : multer.memoryStorage()})


postRouter.post("/",upload.single("Image"),identifyUser,postController.postController)
postRouter.get("/",identifyUser,postController.getPostController);
postRouter.get("/:postId",identifyUser, postController.getPostDetail);
postRouter.post("/:postId", identifyUser, postController.postlikeController)



module.exports = postRouter