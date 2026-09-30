const express = require("express");
const cookieParser = require("cookie-parser")
const authRouter = require("../routes/auth.routes")
const followRouter = require("../routes/follow.routes")
const postRouter = require("../routes/post.routes")
const cors = require("cors")

const app = express()
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))

app.use(express.json())
app.use(cookieParser())

//Routes
app.use("/api/auth", authRouter)
app.use("/api/post",postRouter)
app.use("/api/follow",followRouter)





module.exports = app