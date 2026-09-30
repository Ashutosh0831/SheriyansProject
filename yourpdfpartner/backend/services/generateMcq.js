import model from "../config/gemini.js";

const generateMcqs = async (text) => {

  const prompt = `
Generate 20 multiple choice questions like in interview
from the following content on the basis of the role he is applying for.

Rules:
- Return ONLY valid JSON
- Each question must have:
  - question
  - options
  - correctAnswer
  - explanation

Format:

[
  {
    "question": "",
    "options": [
      "A",
      "B",
      "C",
      "D"
    ],
    "correctAnswer": "",
    "explanation": ""
  }
]

Content:
${text}
`;

  const result = await model.generateContent(
    prompt
  );

  const response =
    result.response.text();

  return response;
};

export default generateMcqs;