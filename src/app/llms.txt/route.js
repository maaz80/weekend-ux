import { getSeoUrlEntries, getSeoSiteRoot } from "@/utils/seoUrlEntries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const entries = await getSeoUrlEntries();
  const body = [
    `# ${getSeoSiteRoot()} Site Summary for AI Crawlers`,
    "",
    "> This list is generated from the current published pages.",
    "",
    "## Primary Pages",
    "",
    ...entries.map(({ url }) => `- [${url}](${url})`),
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
