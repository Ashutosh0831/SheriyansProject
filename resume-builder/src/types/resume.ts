export type PersonalInfo = {
  fullname: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedIn: string;
};

export type WorkExperience = {
  company: string;
  position: string;
  postion?: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type Project = {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
};

export type Education = {
  institute: string;
  degree: string;
  startDate: string;
  endDate: string;
};

export type Resume = {
  _id: string;
  title: string;
  summary: string;
  personalInfo: Partial<PersonalInfo>;
  workExperience: WorkExperience[];
  projects: Project[];
  education: Education[];
  Skills: string[];
  certifications: string | string[];
  updatedAt?: string;
};

export const blankPersonalInfo: PersonalInfo = {
  fullname: "",
  email: "",
  phone: "",
  location: "",
  github: "",
  linkedIn: "",
};
