import {NextRequest} from "next/server";
import User from "@/app/utils/models/userModel";
import dbConnection from "@/app/utils/database/dbConnections";
import { ApiSuccess, ApiError } from "@/app/services/apiResponse";

// registering the user in the database
export async function POST(req: NextRequest) {
  try {
    const {email, password, name, phone} = await req.json();
    console.log("Received data:", {email, password, name, phone});
    
    await dbConnection();

    if(!email || !password || !name || !phone) {
      return ApiError("Missing required fields", 400);
    }

    const existingUser = await User.findOne({email});
    if(existingUser) {
      return ApiError("User with this email or phone already exists", 400);
    }

    const user = await User.create({
      name,
      email,
      password,
      phone
    });

    return ApiSuccess("User registered successfully",
       { userId: user._id }
       , 201);

  } catch(error) {
    console.error("Registration error:", error);
    return ApiError(error, 500);
  }
}