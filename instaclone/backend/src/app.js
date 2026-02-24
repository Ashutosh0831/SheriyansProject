const express = require("express");
const cookieParser = require("cookie-parser")
const authRouter = require("../routes/auth.routes")
const followRouter = require("../routes/follow.routes")
const postRouter = require("../routes/post.routes")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRouter)
app.use("/api/post",postRouter)
app.use("/api/follow",followRouter)





module.exports = app