import { ApiSuccess, ApiError } from "@/app/services/apiResponse";
import { cookies } from "next/headers";
import User from "@/app/utils/models/userModel";
import jwt from 'jsonwebtoken';
import dbConnection from '@/app/utils/database/dbConnections';

interface TYPE_OF_DECODED_USER_DATA {
  userId: string;
  email: string;
}

export async function GET() {
  try {
    await dbConnection();

    const cookieStore = await cookies();
    const token = cookieStore.get('AuthToken');
    console.log("Token from cookie:", token);

    if (!token) {
      return ApiError('No auth token found', 401);
    }

    const decodeToken = jwt.verify(
      token.value,
      process.env.JWT_SECRET as string
    ) as TYPE_OF_DECODED_USER_DATA;

    console.log("this is decodeToken ==>", decodeToken );

    const existingUser = await User.findOne({ _id: decodeToken.userId });
    console.log("this is existingUser",existingUser);

    if (!existingUser) {
      return ApiError('User not found', 401);
    }

    const UserData = {
      userId: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      phone: existingUser.phone,
      token: token.value,
      materialUploaded: existingUser.materialUploaded,
    }

    return ApiSuccess("User data fetched successfully", UserData, 200);
  } catch (error) {
    console.error("Error in checkUser:", error);
    return ApiError("Failed to fetch user data", 500);
  }
}
