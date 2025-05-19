import mongoose from "mongoose" ;

export default async function connectionDB (){
  try{
    await mongoose.connect(process.env.DatabaseUrl, { useNewUrlParser: true, useUnifiedTopology: true }  )
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.error("MongoDB Connection Error : ", err));
  }catch(error){
    console.log("error in connecting to MongoDB: ", error);
  }  
}