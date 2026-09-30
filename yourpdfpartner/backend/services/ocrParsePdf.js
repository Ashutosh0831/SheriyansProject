import Tesseract from "tesseract.js";

export const extractTextFromImage = async (imagePath) => {
  const { data } = await Tesseract.recognize(imagePath, "eng", {
    logger: () => {},
  });

  return data.text.trim();
};