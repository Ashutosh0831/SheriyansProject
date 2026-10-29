export interface generateSummaryBody{
    exprienceLevel: string;
    skills: string[];
    jobTitle: string;
}

export interface generateSkillsBody{
    experienceLevel: string;
    jobTitle: string;
}

export interface generateWorkExperienceDescBody{
    experienceLevel: string;
    skills: string[];
    companyName: string;
    workDuration: string;
    workedAs: string;
}

export interface generateProjectDescBody{
    projectName: string,
    projectIdea: string,
    techStack: string[]
}

export interface improveResumeBody{
    content: string
}

