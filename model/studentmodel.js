import mongoose from "mongoose";


const studentSchema=mongoose.Schema(

    {
        name:{
            type:String,
            required:true
        },
        age:{
            type:Number,
            required:true
        },
        totalMarks:{
            type:Number,
            required:true
        },
    },
    {
        timestamps:true,
    }

);

export const student = mongoose.model("Students",studentSchema)