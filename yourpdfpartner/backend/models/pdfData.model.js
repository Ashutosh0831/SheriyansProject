import mongoose, { SchemaTypes } from "mongoose";


const pdfDataSchema =new mongoose.Schema({
    filename :{
        type : String,
    },
    rawtext : {
        type : String
    },
    cleanedText :{
        type : String
    },
    parseData : {
        type : SchemaTypes.Mixed   
    },
    uploadedAt :{
        type : Date,
        default : Date.now
    }
});



const pdfDataModel = mongoose.model("Pdf-Data",pdfDataSchema);


export default pdfDataModel