const express = require("express");
const cookieParser = require("cookie-parser");
const AuthRoute = require("../router/auth.route.js");
const SongRoute = require("../router/song.route.js")
const cors = require("cors")

const App = express();

App.use(express.json());
App.use(cookieParser());
App.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

//Routes
App.use("/api/auth", AuthRoute);
App.use("/api/songs", SongRoute);

module.exports = App;
