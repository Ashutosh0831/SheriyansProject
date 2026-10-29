import mongoose from "mongoose";
import {IResume} from "@/types/resume.types"

export const resumeSchema = new mongoose.Schema<IResume>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title:{
        type: String,
        default: ''
    },
    summary:{
        type: String,
        default: ''
    },
    personalInfo:{
        type: {
            fullname: String,
            email: String,
            phone: String,
            location: String,
            github: String,
            linkedIn: String,
        },
        default: {}
    },
    education: {
        type: [
            {
                institute: String,
                degree: String,
                startDate: String,
                endDate: String
            }
        ]
    },
    workExperience:{
        type:[
            {
                company: String,
                position: String,
                startDate: String,
                endDate: String,
                description: String
            }
        ],
        default: []
    },
    projects:{
        type:[{
            title: String,
            description: String,
            techStack: [String],
            githubUrl: String,
            liveUrl: String,
        }],
        default: []
    },
    Skills: {
        type: [String],
        default: []
    },
    certifications:{
        type: String,
        default: ''
    },
},{
    timestamps: true
})

const resumeModel = mongoose.model('resumes', resumeSchema)

export default resumeModel