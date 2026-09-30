import express from 'express'
import cors from 'cors';
import pdfRoute from '../routes/pdf.routes.js';
import quizRoute from '../routes/quiz.routes.js';



const App = express()

const allowedOrigins = "*";
App.use(cors());
App.use(express.json())


//PDF Route
App.use('/api/pdf',pdfRoute);

//Quiz Route 
App.use('/api/pdf',quizRoute);






export default App


