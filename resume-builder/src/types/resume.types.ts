import { Types } from "mongoose";

export interface IPersonInfo{
    fullname: string;
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedIn: string;
}

export interface IWorkExperience{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
}

export interface IProjects{
    title: string;
    description: string;
    githubUrl: string;
    liveUrl: string;
    techStack: string[];
}

export interface IEducation{
    institute: string;
    degree: string;
    startDate: string;
    endDate: string;

}

export interface IResume{
    _id?: string;
    userId: Types.ObjectId;
    title: string;
    summary: string;
    personalInfo: IPersonInfo;
    workExperience?: IWorkExperience[];
    projects: IProjects[];
    Skills: string[];
    education: IEducation[];
    certifications?: string;
    createdAt?: Date,
    updatedAt?: Date
}
