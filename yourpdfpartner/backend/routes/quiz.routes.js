import Router from 'express';
import { generateQuiz , getQuiz, submitQuiz} from '../controller/quiz.controller.js';


const quizRoute = Router();

quizRoute.get('/resume/:id',generateQuiz);
quizRoute.get('/quiz/:id',getQuiz)
quizRoute.post('/quiz/submit/:id',submitQuiz)


export default quizRoute