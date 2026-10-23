import { getSeoUrlEntries } from "@/utils/seoUrlEntries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function sitemap() {
  return getSeoUrlEntries();
}
