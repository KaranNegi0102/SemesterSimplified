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

const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];

export async function POST(req: Request) {
  try {
    await dbConnection();

    const formData = await req.formData();
    const file = formData.get("file");
    
    if (!file || !(file instanceof File)) {
      return ApiError("No file uploaded", 400);
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return ApiError("Invalid file type. Only PDF and images (JPEG, PNG) are allowed.", 400);
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Determine folder based on file type
    const folder = file.type === 'application/pdf' ? 'PDFs' : 'Images';

    const uploadResponse = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
            folder: folder,
            public_id: `${Date.now()}-${file.name}`,
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(error);
            } else {
              console.log("Cloudinary upload success:", result);
              resolve(result);
            }
          }
        )
        .end(buffer);
    });

    if (!uploadResponse || !uploadResponse.secure_url) {
      console.error("Upload response missing secure_url:", uploadResponse);
      return ApiError("Failed to upload file to Cloudinary", 500);
    }

    console.log("uploadResponse", uploadResponse);
    console.log("uploadResponse url", uploadResponse.secure_url);

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
      fileType: file.type,
    });

    await User.findByIdAndUpdate(
      decodedUser.userId,
      { $push: { materialUploaded: newDoc.id } },
      { new: true }
    );

    return ApiSuccess("File uploaded successfully", newDoc, 200);
  } catch (error) {
    console.log("this is error line 80 in uploadDoc.ts", error);
    return ApiError("Internal Server Error", 500);
  }
}
