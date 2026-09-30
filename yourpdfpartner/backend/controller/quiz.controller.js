import generateMcqs from "../services/generateMcq.js";
import pdfDataModel from "../models/pdfData.model.js";
import cleanJson from "../utils/cleanJson.js";
import quizModel from "../models/quiz.model.js";

const generateQuiz = async (req, res) => {
  try {
    const resume = req.params.id;
    if (!resume) return res.status(404).json({ message: "Not found" });

    const aiResponse = await generateMcqs(resume);

    const clean = cleanJson(aiResponse);

    const mcqs = JSON.parse(clean);
    // fro array ->{quetsion,options,correct,ex} =ar[0]

    try {
      const storedMcq = await quizModel.create({
        pdfId: resume._id,
        questions: mcqs,
      });

      console.log("Stored:", storedMcq);
    } catch (err) {
      console.log("error:", err);
    }

    res.status(200).json({
      success: true,
      mcqs,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Wuiz generation failed",
    });
  }
};



export const getQuiz = async (req, res) => {
  try {

    const quiz =
      await quizModel.findById(
        req.params.id
      );

    res.json({
      success: true,
      quiz,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
    });
  }
};


const submitQuiz = async (req, res) => {

  try {

    const quiz =
      await quizModel.findById(
        req.params.id
      );

    const { answers } = req.body;

    let score = 0;

    answers.forEach((answer) => {

      const originalQuestion =
        quiz.questions[
          answer.questionIndex
        ];

      if (
        originalQuestion.correctAnswer
        === answer.selected
      ) {
        score++;
      }
    });

    res.json({
      success: true,
      score,
      total: quiz.questions.length,
      percentage:
        (score / quiz.questions.length) * 100,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
    });
  }
};

export { generateQuiz,
  submitQuiz
};
