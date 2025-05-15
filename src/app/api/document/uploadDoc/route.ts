import Subject from "@/app/utils/models/subjectModel";
import dbConnection from "@/app/utils/database/dbConnections";
import { ApiSuccess, ApiError } from "@/app/services/apiResponse";
import User from "@/app/utils/models/userModel";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import cloudinary from "@/lib/cloudinary";

interface DecodedUser  {
  userId: string;
}

export async function POST(req: Request) {
  try {
    await dbConnection();

    const formData = await req.formData();
    const file = formData.get("pdf");
    
    if (!file || !(file instanceof File)) {
      return ApiError("No file uploaded", 400);
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResponse = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "raw",
            folder: "pdfs",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    const url = uploadResponse.secure_url;

    const fields = Object.fromEntries(formData.entries());
    const { title, description, course, subject, category, university } = fields;

    if (!title || !description || !course || !subject || !category || !university) {
      return ApiError("Missing required fields", 400);
    }

    const cookieStore = await cookies();
    const token = cookieStore.get('AuthToken')?.value;
    console.log("Token from cookie:", token);

    if (!token) {
      return ApiError("Unauthorized", 401);
    }

    const decodedUser = jwt.verify(token, process.env.JWT_SECRET as string) as unknown as DecodedUser;
    console.log("Decoded user:", decodedUser);
    
    if (!decodedUser || !decodedUser.userId) {  
      console.log("Invalid decoded user:", decodedUser);
      return ApiError("Invalid user token", 401);
    }

    console.log("Creating document with uploadedBy:", decodedUser.userId);
    const newDoc = await Subject.create({
      title,
      description,
      course,
      subject,
      category,
      uploadedBy: decodedUser.userId,
      university,
      url,
    });

    await User.findByIdAndUpdate(
      decodedUser.userId,
      { $push: { materialUploaded: newDoc.id } },
      { new: true }
    );

    return ApiSuccess("Document uploaded successfully",newDoc,200);
  } catch (error) {
    console.log("this is error line 80 in uploadDoc.ts", error);
    return ApiError("Internal Server Error", 500);
  }
}
