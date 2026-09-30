import Router from "express";
import upload from "../middleware/upload.middleware.js";
import pdfParserController from "../controller/pdfParser.controller.js";
import searchController from "../controller/search.controller.js";

const pdfRoute = Router();

pdfRoute.post("/upload", upload.single("pdf"), pdfParserController);
pdfRoute.get("/search", searchController);

export default pdfRoute;
