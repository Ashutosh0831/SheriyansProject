import App from './src/app.js'
import connectToDatabase from './config/database.js';


connectToDatabase();





App.listen(3000,()=>{
    console.log("Server Started...");
})