
import pdfDataModel from "../models/pdfData.model.js";



async function searchController (req, res){
  try {
    const { skill } = req.query;

    if (!skill) {
      return res.status(400).json({ message: "Skill query parameter is required" });
    }

    // Search inside parseData.skills array (case-insensitive)
    const resumes = await pdfDataModel.find({
      "parseData.skills": { $regex: new RegExp(skill, "i") }
    });

    res.status(200).json({ count: resumes.length, resumes });
  } catch (error) {
    res.status(500).json({ message: "Error searching resumes", error: error.message });
  }
}

export default searchController;
