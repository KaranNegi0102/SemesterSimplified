import {NextRequest} from "next/server";
import User from "@/app/utils/models/userModel";
import dbConnection from "@/app/utils/database/dbConnections";
import {ApiSuccess , ApiError } from "@/app/services/apiResponse";


export async function POST(req : NextRequest){
    try{

      const {email,password} = await req.json();
      console.log(email,password);

      await dbConnection();

      const existingUser = await User.findOne({email});
      console.log("this is existingUser email in backend",existingUser.email)
      console.log("this is existingUser password in backend",existingUser.password)

      if(!existingUser){
        throw ApiError("User doesn't exists",400);
      }

      const UserData={
        email:existingUser.email,
        password:existingUser.password,
        name:existingUser.name,
        phone:existingUser.phone
        
      }

      return ApiSuccess("User Logged in Successfully",UserData,200);


    }catch(error){
      console.log("error in the login backend code", error);
    }
}