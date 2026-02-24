const connectToDb = require("./config/database");
const app = require("./src/app")



connectToDb()



app.listen(3000, ()=>{
    console.log("Server is started...");
    
})