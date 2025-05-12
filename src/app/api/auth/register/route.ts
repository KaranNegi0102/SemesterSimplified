import {NextRequest} from "next/server";
import User from "@/app/utils/models/userModel";
import dbConnection from "@/app/utils/database/dbConnections";


// registering the user in the database
export async function POST(req: NextRequest) {
  try {
    const {email, password} = await req.json();
    await dbConnection();

    if(!email || !password) {
      return new Response("Missing email or password", {status: 400});
    }

    const existingUser = await User.findOne({email});
    if(existingUser) {
      return new Response("User already exists", {status: 400});
    }

    const user = await User.create({
    email, 
    password
  });
  
    return new Response("User created successfully", {status: 201});

  } catch(error) {
    console.error("Registration error:", error);
    return new Response("Registration failed", {status: 500});
  }
}