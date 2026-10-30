import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Brochure from "@/models/Brochure";

export const dynamic = "force-dynamic";

export async function GET() {
     try {
          await connectDB();
          const brochure = await Brochure.findOne().sort({ updatedAt: -1 });
          return NextResponse.json(
               {
                    success: true,
                    brochure: brochure || null
               },
               {
                    headers: {
                         "Cache-Control": "no-store, max-age=0"
                    }
               }
          );
     } catch (err) {
          console.error("Next.js /api/brochure error:", err);
          return NextResponse.json(
               {
                    success: false,
                    error: err.message || "Failed to fetch brochure"
               },
               { status: 500 }
          );
     }
}
