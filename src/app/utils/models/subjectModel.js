import mongoose from "mongoose";
const subjectSchema = new mongoose.Schema({
    title:{
      type:String,
      required:true,
    },
    description:{
      type:String,
      required:true,
    },
    course:{
      type:String,
      required:true,
    },
    course:{
      type:String,
      required:true,
    },
    subject:{
      type:String,
      required:true,
    },
    category:{
      type:String,
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
      type:String,
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