import fs from "fs";
import hybridParser from "../services/hybridParser.js";
import resumeParser from "../services/resumeParser.js";
import pdfDataModel from "../models/pdfData.model.js";

// import cleanText from "../utils/cleanText.js";
// import resumeParser from "../services/resumeParser.js";

async function pdfParserController(req, res) {
  const filePath = req.file?.path;

  try {
    // 1. Validate file upload
    if (!filePath) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // 2. Extract text using hybrid pipeline
    const rawText = await hybridParser(filePath);

    if (!rawText || rawText.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "No text could be extracted from file",
      });
    }

    // 3. Clean text (enable when ready)
    const cleanedText = rawText; // replace with cleanText(rawText)

    // 4. Parse structured data (enable when ready)
    const parsedData = resumeParser(cleanedText); // replace with resumeParser(cleanedText)

    const storedData = await pdfDataModel.create({
      filename: filePath,
      rawtext: rawText,
      cleanedText,
      parseData: parsedData,
    });

    return res.status(201).json({
      message: "Parse Detail sasved suceessfully.",
      parsedData,
    });
  } catch (error) {
    console.error("PDF Upload Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error while processing PDF",
      error: error.message,
    });
  } finally {
    // 5. Always cleanup uploaded file
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}

export default pdfParserController;
