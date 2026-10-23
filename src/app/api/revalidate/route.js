import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Revalidation is not configured" }, { status: 503 });
  }

  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // The root layout contains shared CMS data, so clear all route caches.
  // Next regenerates a page on its next request; it does not run a full build.
  revalidatePath("/", "layout");
  revalidatePath("/sitemap.xml");
  revalidatePath("/llms.txt");
  return NextResponse.json({ revalidated: true });
}
