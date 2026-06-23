import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Initialize Cloudinary config
cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function GET(req) {
     try {
          const timestamp = Math.round(new Date().getTime() / 1000);
          
          const url = new URL(req.url);
          const folder = url.searchParams.get("folder") || "courses/videos";
          const publicId = url.searchParams.get("public_id");

          const paramsToSign = {
               timestamp,
               folder
          };
          
          if (publicId) {
               paramsToSign.public_id = publicId;
          }

          // Generate signature
          const signature = cloudinary.utils.api_sign_request(
               paramsToSign,
               process.env.CLOUDINARY_API_SECRET
          );

          return NextResponse.json({
               signature,
               timestamp,
               apiKey: process.env.CLOUDINARY_API_KEY,
               cloudName: process.env.CLOUDINARY_CLOUD_NAME,
               folder,
               publicId
          });
     } catch (error) {
          console.error("Signature generation error:", error);
          return NextResponse.json({ error: error.message }, { status: 500 });
     }
}
