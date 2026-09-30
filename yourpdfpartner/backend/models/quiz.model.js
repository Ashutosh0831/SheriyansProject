import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({

  pdfId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Pdf-Data",
  },

  questions: [
    {
      question: String,

      options: [String],

      correctAnswer: String,

      explanation: String,
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  }
});


const quizModel = mongoose.model("quizData" , quizSchema)


export default quizModel