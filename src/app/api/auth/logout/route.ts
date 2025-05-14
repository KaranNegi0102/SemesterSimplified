import { NextRequest, NextResponse } from 'next/server';
import  dbConnection  from '@/app/utils/database/dbConnections';
import { ApiError } from '@/app/services/apiResponse';
import jwt from 'jsonwebtoken';
import User from '@/app/utils/models/userModel';

interface TYPE_OF_DECODED_USER_DATA {
  userId:string;
  email:string;
}

export async function  GET(req:NextRequest){
  try{
    dbConnection();

    const token=req.cookies.get("AuthToken")?.value;
    if(!token){
      throw ApiError("token not found");
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as TYPE_OF_DECODED_USER_DATA;

    const existingUser = await User.findById(decoded.userId);
    if(!existingUser){
      throw ApiError("user not found");
    }

    const response = NextResponse.json(
      {
        success:true,
        message:"logout successfully"
      },
      {
        status:200
      });

  response.cookies.delete('AuthToken');

  return response;

  }catch(error:any){
    console.log("error in logout catch ",error);
    return ApiError(error.message);
  }
}