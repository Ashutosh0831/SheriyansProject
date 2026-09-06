const express = require("express");
const cookieParser = require("cookie-parser");
const AuthRoute = require("../router/auth.router.js");
const cors = require("cors")

const App = express();

App.use(express.json());
App.use(cookieParser());
App.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

//Authentication Roues
App.use("/api/auth", AuthRoute);

module.exports = App;
