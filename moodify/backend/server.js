const App = require("./src/app.js")
const ConnectToDb = require("./config/database.js")


ConnectToDb();



App.listen(5000,()=>{
    console.log("Server started...");
    
})