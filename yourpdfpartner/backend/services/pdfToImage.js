import { fromPath } from "pdf2pic";

export const convertPdfToImages = async (pdfPath) => {
  const converter = fromPath(pdfPath, {
    density: 150,
    saveFilename: "page",
    savePath: "./temp_images",
    format: "png",
    width: 1200,
    height: 1200,
  });

  const result = await converter.bulk(-1);

  // returns array of image paths
  return result.map((r) => r.path);
};