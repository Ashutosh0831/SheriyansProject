import extractEmail,{extractPhone,extractSkills} from "./extractor.js"

const resumeParser = (text) => {

  return {
    email: extractEmail(text),
    phone: extractPhone(text),
    skills: extractSkills(text),
  };
};

export default resumeParser;