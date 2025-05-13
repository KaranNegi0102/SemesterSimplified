import {NextRequest} from "next/server";
import User from "@/app/utils/models/userModel";
import dbConnection from "@/app/utils/database/dbConnections";
import {ApiSuccess , ApiError } from "@/app/services/apiResponse";
import jwt from "jsonwebtoken";

export async function POST(req : NextRequest){
    try{

      const {email,password} = await req.json();
      console.log(email,password);

      await dbConnection();

      const existingUser = await User.findOne({email});
      // console.log("this is existingUser email in backend",existingUser.email)
      // console.log("this is existingUser password in backend",existingUser.password)

      if(!existingUser){
        throw ApiError("User doesn't exists",400);
      }

      const token = jwt.sign(
        {userId:existingUser._id,email:existingUser.email},
        process.env.JWT_SECRET as string,
        {expiresIn : '7d'}
      );

      const cookieOptions = {
        httpOnly:true,
        maxAge:7*24*60*60,
        path:'/' //with this cookie can be accessbile in the whole site
      }


      const UserData={
        userId:existingUser._id,
        email:existingUser.email,
        password:existingUser.password,
        name:existingUser.name,
        phone:existingUser.phone
      }

      return ApiSuccess("User Logged in Successfully",{user:UserData},200,
        {   //api response me jakar dekho kaise chal rha h yeh 
        name:"AuthToken",
        value:token,
        options:cookieOptions,
      });


    }catch(error){
      console.log("error in the login backend code", error);
    }
}