import PageSEO from "@/models/PageSEO";
import connectDB from "@/config/db";

export async function getPageSEOData(pageId) {
     try {
          await connectDB();
          return await PageSEO.findOne({ pageSlug: pageId });
     } catch (e) {
          console.error(`Error fetching PageSEO for ${pageId}:`, e);
          return null;
     }
}

export async function generatePageMetadata(pageId, defaultTitle, defaultDesc, pathname = "") {
     const seo = await getPageSEOData(pageId);
     const title = seo?.title || defaultTitle || "Weekend UX";
     const description = seo?.description || defaultDesc || "Weekend UX learning platform";
     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://weekendux.co";
     const pageUrl = `${baseUrl}${pathname}`;
     
     // Default decorative fallback image from public folder
     const imageUrl = `${baseUrl}/images/weekend-ux-blogs-hero-bg.webp`;

     return {
          title,
          description,
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
