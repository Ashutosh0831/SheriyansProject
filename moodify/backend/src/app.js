const express = require("express")
const AuthRoutes = require("../router/Auth.routes.js");
const CookieParser = require("cookieparser");
const cookieParser = require("cookie-parser");
const cors = require("cors")



const App = express();

App.use(express.json());
App.use(cookieParser());
App.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))


//Routes
App.use("/api/auth",AuthRoutes);





module.exports = App 