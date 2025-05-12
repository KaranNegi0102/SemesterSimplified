import mongoose from "mongoose" ;

export default async function connectionDB (){
  try{
    await mongoose.connect("mongodb+srv://karan0102:Gautamn49@projects.yrofojl.mongodb.net/SemSemesterDB")
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.error("MongoDB Connection Error : ", err));
  }catch(error){
    console.log("error in connecting to MongoDB: ", error);
  }  
}