//Email Extractor

const extractEmail = (text) => {

  const emailRegex =
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/;

  const match = text.match(emailRegex);

  return match ? match[0] : null;
};



// Phone Extractor

export const extractPhone = (text) => {

  const phoneRegex =
    /(\+91)?[6-9]\d{9}/;

  const match = text.match(phoneRegex);

  return match ? match[0] : null;
};

// Skill Extractor

export const extractSkills = (text) => {

  const skills = [
    "React",
    "Node.js",
    "MongoDB",
    "JavaScript",
    "Python",
    "Django",
    "Express",
    "HTML5",
    "CSS3"
  ];

  const foundSkills = skills.filter(skill =>
    text.toLowerCase().includes(
      skill.toLowerCase()
    )
  );

  return foundSkills;
};



export default extractEmail;
