import Subject from "@/app/utils/models/subjectModel";
import dbConnection from "@/app/utils/database/dbConnections";
import { ApiSuccess, ApiError } from "@/app/services/apiResponse";

export async function GET() {
  try {
    await dbConnection();

    const documents = await Subject.find({})
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(10); // Limit to 10 most recent documents

    return ApiSuccess("Documents fetched successfully", documents, 200);
  } catch (error) {
    console.error("Error fetching documents:", error);
    return ApiError("Failed to fetch documents", 500);
  }
}
