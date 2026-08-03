import PageSEO from "@/models/PageSEO";
import connectDB from "@/config/db";
import { headers } from "next/headers";

export async function getPageSEOData(pageId) {
     try {
          await connectDB();
          return await PageSEO.findOne({ pageSlug: pageId });
     } catch (e) {
          console.error(`Error fetching PageSEO for ${pageId}:`, e);
          return null;
     }
}

// Dynamically detect current host from request headers
// Works on Netlify, Hostinger, localhost — no hardcoded URL needed
async function getBaseUrl() {
     try {
          const headersList = await headers();
          const host = headersList.get("x-forwarded-host") || headersList.get("host") || "";
          const proto = headersList.get("x-forwarded-proto") || "https";
          if (host) return `${proto}://${host}`;
     } catch {}
     // Fallback to env variable if headers not available
     return process.env.NEXT_PUBLIC_BASE_URL || "https://www.weekendux.com";
}

export async function generatePageMetadata(pageId, defaultTitle, defaultDesc, pathname = "") {
     const [seo, baseUrl] = await Promise.all([
          getPageSEOData(pageId),
          getBaseUrl(),
     ]);

     const title = seo?.title || defaultTitle || "Weekend UX";
     const description = seo?.description || defaultDesc || "Weekend UX learning platform";
     const pageUrl = `${baseUrl}${pathname}`;

     // Default decorative fallback image from public folder
     const imageUrl = `${baseUrl}/images/weekend-ux-blogs-hero-bg.webp`;

     return {
          title,
          description,
          alternates: {
               canonical: pageUrl,
          },
          openGraph: {
               title,
               description,
               url: pageUrl,
               type: "website",
               images: [
                    {
                         url: imageUrl,
                         width: 1200,
                         height: 630,
                         alt: title,
                    }
               ],
          },
          twitter: {
               card: "summary_large_image",
               title,
               description,
               images: [imageUrl],
          },
     };
}
