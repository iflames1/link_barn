import { NextRequest, NextResponse } from "next/server";
import { cloudinary } from "@/config/cloudinary";
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";

type UploadResponse =
  | { success: true; result?: UploadApiResponse }
  | { success: false; error: UploadApiErrorResponse };

const uploadToCloudinary = async (
  fileUri: string,
  fileName: string
): Promise<UploadResponse> => {
  try {
    const result = await cloudinary.uploader.upload(fileUri, {
      invalidate: true,
      resource_type: "auto",
      filename_override: fileName,
      folder: "profile-pictures",
      use_filename: true,
    });

    return { success: true, result };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return { success: false, error: error as UploadApiErrorResponse };
  }
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 }
      );
    }

    const fileBuffer = await file.arrayBuffer();
    const mimeType = file.type;
    const encoding = "base64";
    const base64Data = Buffer.from(fileBuffer).toString("base64");

    // This will be used to upload the file to Cloudinary
    const fileUri = `data:${mimeType};${encoding},${base64Data}`;

    // Upload to Cloudinary
    const res = await uploadToCloudinary(fileUri, file.name);

    if (res.success && res.result) {
      return NextResponse.json({
        message: "success",
        imgUrl: res.result.secure_url,
      });
    } else {
      return NextResponse.json(
        {
          message: "Cloudinary upload failed",
          error: res.error,
        },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("API POST error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
