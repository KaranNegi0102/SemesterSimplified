
import Subject from "@/app/utils/models/subjectModel";
import dbConnection from "@/app/utils/database/dbConnections";
import { ApiSuccess, ApiError } from "@/app/services/apiResponse";
import  User  from "@/app/utils/models/userModel";
import {cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedUser extends JwtPayload {
  id: string;
}

export async function POST(req:Request){

  try{
    await dbConnection();

    const {title,description,course,subject,category,uploadedBy,university,url} = await req.json();

    if(!title || !description || !course || !subject || !category || !uploadedBy || !university){
      return ApiError("Missing required fields",400);
    }

    const cookieStore = await cookies();
    const token = cookieStore.get('AuthToken')?.value;

    if(!token){
      return ApiError("Unauthorized",401);
    }

    // verifying the user
    const decodedUser = jwt.verify(token,process.env.JWT_SECRET as string) as DecodedUser;
    console.log(decodedUser);
    

    const newDoc = await Subject.create({
      title,
      description,
      course,
      subject,
      category,
      uploadedBy:decodedUser.id,
      university,
      url,
    })

    await User.findByIdAndUpdate(
      decodedUser.id,
      {
        $push:{materialUploaded:newDoc.id}
      },
      {new:true}
    )

    return ApiSuccess("Document uploaded successfully",200,newDoc);

  }catch(error){
    console.log(error);
  }

}
