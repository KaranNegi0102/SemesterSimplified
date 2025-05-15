import mongoose from "mongoose";
const subjectSchema = new mongoose.Schema({
    title:{
      type:string,
      required:true,

    },
    description:{
      type:string,
      required:true,
    },
    course:{
      type:string,
      required:true,
    },
    course:{
      type:string,
      required:true,
    },
    subject:{
      type:string,
      required:true,
    },
    category:{
      type:string,
      required:true,
      enum:["assignments", "notes", "books", "papers"],
      default:"notes",
    },
    url: {
      type: String,
      required: true,
    },
    uploadedBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,
    },
    university:{
      type:string,
      required:true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
    
},
{timestamps:true})

const Subject = mongoose.models.Subject || mongoose.model("Subject", subjectSchema);

export default Subject;


  // title: "",
          // description: "",
          // course: "",
          // subject: "",
          // category: "select",
          // uploadedBy: "",
          // university: "",