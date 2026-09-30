import fs from "fs";
import  parsePdf  from "./parsePdf.js";
import { convertPdfToImages } from "./pdfToImage.js";
import { extractTextFromImage } from "./ocrParsePdf.js";
import resumeParser from "./resumeParser.js";

const isPDF = (buffer) => buffer.toString("utf8", 0, 5) === "%PDF-";

const parseFileHybrid = async (filePath) => {
  const buffer = fs.readFileSync(filePath);

  // CASE 1: Not PDF → OCR directly
  if (!isPDF(buffer)) {
    return await extractTextFromImage(filePath);
  }

  try {
    // CASE 2: Try extracting text from PDF
    const text = await parsePdf(filePath);

    if (text && text.length > 30) {
      return text;
    }

    // CASE 3: Scanned PDF → convert to images
    const images = await convertPdfToImages(filePath);

    let finalText = "";

    for (const img of images) {
      try {
        const t = await extractTextFromImage(img);
        finalText += t + "\n";
      } finally {
        if (fs.existsSync(img)) {
          fs.unlinkSync(img);
        }
      }
    }

    return finalText.trim();
  } catch (err) {
    console.error("Hybrid parsing failed:", err);

    // LAST RESORT: OCR everything
    const images = await convertPdfToImages(filePath);

    let text = "";
    for (const img of images) {
      text += (await extractTextFromImage(img)) + "\n";
    }

    return text.trim();
  }
};

export default parseFileHybrid;
