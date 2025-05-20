import { NextRequest } from "next/server";
import Subject from "@/app/utils/models/subjectModel";
import User from "@/app/utils/models/userModel";
import dbConnection from "@/app/utils/database/dbConnections";
import { ApiSuccess, ApiError } from "@/app/services/apiResponse";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

interface DecodedUser {
  userId: string;
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await dbConnection();

    const cookieStore = await cookies();
    const token = cookieStore.get("AuthToken")?.value;

    if (!token) {
      return ApiError("Unauthorized", 401);
    }

    const decodedUser = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedUser;

    if (!decodedUser || !decodedUser.userId) {
      return ApiError("Invalid user token", 401);
    }

    const document = await Subject.findById(context.params.id);

    if (!document) {
      return ApiError("Document not found", 404);
    }

    // Check if the user is the owner of the document
    if (document.uploadedBy.toString() !== decodedUser.userId) {
      return ApiError("Unauthorized to delete this document", 403);
    }

    // Delete the document
    await Subject.findByIdAndDelete(context.params.id);

    // Remove the document reference from user's materialUploaded array
    await User.findByIdAndUpdate(
      decodedUser.userId,
      { $pull: { materialUploaded: context.params.id } }
    );

    return ApiSuccess("Document deleted successfully", null, 200);
  } catch (error) {
    console.error("Error deleting document:", error);
    return ApiError("Failed to delete document", 500);
  }
} 