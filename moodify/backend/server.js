const App = require("./src/App.js")
const connectToDb = require("./config/database.js")

connectToDb()





App.listen(5000,()=>{
    console.log("Server started successfully...")
})