const cleanText = (text) => {

  return text
    .replace(/\r/g, "")
    .replace(/\n+/g, "\n")
    .replace(/\s+/g, " ")
    .trim();
};

export default cleanText;