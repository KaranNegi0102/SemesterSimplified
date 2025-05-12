import {NextRequest} from "next/server";
import User from "@/app/utils/models/userModel";
import dbConnection from "@/app/utils/database/dbConnections";

export async function POST(req : NextRequest){
    try{

      const {email,password} = await req.json();
      console.log(email,password);

      await dbConnection();

      const existingUser = await User.findOne({email});

      if(!existingUser){
        throw new Error("User doesn't exists");
      }

      const UserData={
        email:existingUser.email,
        password:existingUser.password
      }

      return new Response("User Logged in Successfully");


    }catch(error){
      console.log("error in the login backend code", error);
    }
}