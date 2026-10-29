import {Iuser} from '@/types/user.types'
import mongoose from "mongoose";
import bcrypt from 'bcrypt'


export interface UserDocument extends Omit<Iuser, '_id'>, Document {
    comparePass(candidate_password: string): boolean
}


const userSchema = new mongoose.Schema<UserDocument>({
    name:{
        type: String,
        required: [true, "Name is required."],
    },
    email:{
        type: String,
        required: [true, "Email is required"],
    },
    password:{
        type: String,
        required: [true, "Password is required"],
    },
    phone: {
        type: String,
        minlength: [10, "Numbe should of 10 digit"]
    },
},{
    timestamps: true,
})

userSchema.pre('save', function(): void{
    if(!this.isModified('password')) return
    this.password = bcrypt.hashSync(this.password, 10)
})

userSchema.methods.comparePass = function(candidate_password: string){
    return bcrypt.compareSync(candidate_password, this.password)
}

export const userModel = mongoose.model("user", userSchema)

