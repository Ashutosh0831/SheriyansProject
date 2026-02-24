require("dotenv").config()
const Imagekit= require("@imagekit/nodejs")
const postModel = require("../model/post.model")
const webtoken = require("jsonwebtoken")
const likeModel = require("../model/like.model")

const imagekit = new Imagekit({
    privatekey : process.env.IMAGEKIT_PRIVATE_KEY
})

async function postController(req,res){
    console.log(req.body, req.file);


    const file = await imagekit.files.upload({
        file :req.file.buffer.toString("Base64"),
        fileName : 'Test'
    })


    const post =await postModel.create({
        caption : req.body.caption,
        image_url : file.url,
        user : req.user.id
        })

        res.status(201).json({
            message : "Post created successfully"
        })

}

async function getPostController(req,res){

    const user_id = req.user.id

    const post = await postModel.find({
        user : user_id
    })

    res.status(200).json({
        message:"Post fetched successfully",
        post
    })

}

async function getPostDetail(req, res){

    const userId = req.user.id
    const postId = req.params.postId.trim()

    const post = await postModel.findById(postId);


    if(!post){
        return res.status(404).json({
            message : "no post avilable"
        })
    }

    const isUserAlready = post.user.toString() === userId

    if(!isUserAlready){
        return res.status(401).json({
            message:"User is not available"
        })
    }


    res.status(200).json({
        message:"Post feteched successfully",
        post
    })

}

async function postlikeController(req, res){
    postId = req.params.postId
    username = req.user.username

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message : "Post doesn't exist"
        })
    }

    const likePost = await likeModel.create({
        postId : postId,
        username : username,
    })

    res.status(201).json({
        message : "You like a post"
    })
}
module.exports = {
    postController,
    getPostController,
    getPostDetail,
    postlikeController
}