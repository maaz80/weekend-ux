import { cache } from "react";
import LocationDetailsView from "@/components/Location/LocationDetailsView";
import Location from "@/models/Location";
import connectDB from "@/config/db";
import { generatePageMetadata, getPageSEOData } from "@/utils/seo";

// Fetch only location data
const getLocationData = cache(async (slug) => {
     try {
          await connectDB();
          const locationDoc = await Location.findOne({ "items.hero.slug": slug }).select("items").lean();
          if (locationDoc) {
               const item = locationDoc.items.find(it => it.hero?.[0]?.slug === slug);
               if (item) return JSON.parse(JSON.stringify(item));
          }
     } catch (error) {
          console.error("Error in getLocationData fetching database:", error);
     }
     return null;
});

export async function generateMetadata({ params }) {
     const { slug } = await params;
     const data = await getLocationData(slug);
     if (!data) {
          return generatePageMetadata("not-found", "Page Not Found - Weekend UX", "The page you are looking for does not exist.", `/location/${slug}`);
     }

     const title = data.hero?.[0]?.seotitle || data.title || "Location";
     const description = data.hero?.[0]?.seodescription || data.title;
     const imageUrl = data.image?.imageurl || "";

     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://weekend-backend.onrender.com";
     const pageUrl = `${baseUrl}/location/${slug}`;
     const finalImageUrl = imageUrl || `${baseUrl}/images/weekend-ux-blogs-hero-bg.webp`;

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
               type: "article",
               images: [
                    {
                         url: finalImageUrl,
                         alt: title,
                    }
               ],
          },
          twitter: {
               card: "summary_large_image",
               title,
               description,
               images: [finalImageUrl],
          },
     };
}

export default async function LocationSlugPage({ params }) {
     const { slug } = await params;
     const data = await getLocationData(slug);

     if (!data) {
          const seo = await getPageSEOData("not-found");
          const displayTitle = seo?.title || "Page Not Found";
          const displayDesc = seo?.description || "The link you followed may be broken, or the page may have been removed.";

          return (
               <div className="min-h-screen bg-neutral text-white flex flex-col items-center justify-center font-urbanist px-4 text-center">
                    <h1 className="text-6xl font-bold font-playfair text-official mb-4">404</h1>
                    <h2 className="text-2xl font-semibold mb-2">{displayTitle}</h2>
                    <p className="text-zinc-400 max-w-md mb-6">
                         {displayDesc}
                    </p>
                    <a href="/" className="px-6 py-3 bg-official text-neutral rounded-lg font-medium hover:opacity-90 transition-all">
                         Go to Homepage
                    </a>
               </div>
          );
     }

     return <LocationDetailsView data={data} />;
}
