import { cache } from "react";
import LocationDetailsView from "@/components/Location/LocationDetailsView";
import Location from "@/models/Location";
import connectDB from "@/config/db";
import { generatePageMetadata, getPageSEOData } from "@/utils/seo";
import { buildCanonicalUrl, getSiteUrl } from "@/utils/siteUrl";
import SchemaRenderer from "@/components/SchemaRenderer";

export const dynamicParams = false;

const staticLocationSlugs = [
     "ui-ux-design-course-in-bangalore",
     "ui-ux-design-course-in-mumbai",
     "ui-ux-design-course-in-delhi",
     "ui-ux-design-course-in-pune",
     "ui-ux-design-course-in-hyderabad",
     "ui-ux-design-course-in-ahmedabad",
     "ui-ux-design-course-in-agra",
     "ui-ux-design-course-in-noida",
     "ui-ux-design-course-in-gurgaon",
     "ui-ux-design-course-in-kolkata",
     "ui-ux-design-course-in-jaipur",
     "ui-ux-design-course-in-chandigarh",
     "ui-ux-design-course-in-chennai",
     "ui-ux-design-course-in-indore",
     "ui-ux-design-course-in-lucknow"
];

function getDefaultLocationData(slug) {
     const rawCity = (slug || "").replace("ui-ux-design-course-in-", "").replace(/-/g, " ");
     const city = rawCity ? rawCity.replace(/\b\w/g, c => c.toUpperCase()) : "India";

     return {
          slug,
          title: `UI UX Design Course in ${city}`,
          hero: [
               {
                    heading: `UI UX Design Course in ${city}`,
                    seotitle: `UI UX Design Course in ${city} | Weekend UX`,
                    seodescription: `Master UI UX design with hands-on projects, industry mentors, and portfolio guidance in ${city}.`,
                    buttonName: "Explore Programs",
                    slug,
                    cityname: city
               }
          ]
     };
}

export async function generateStaticParams() {
     const slugsSet = new Set(staticLocationSlugs);
     try {
          const dbPromise = (async () => {
               await connectDB();
               const locations = await Location.find().select("items.hero.slug items.slug").lean();
               if (Array.isArray(locations)) {
                    locations.forEach((group) => {
                         if (group.items && Array.isArray(group.items)) {
                              group.items.forEach((item) => {
                                   const s = item.hero?.[0]?.slug || item.slug;
                                   if (s) slugsSet.add(s);
                              });
                         }
                    });
               }
          })();

          const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 1500));
          await Promise.race([dbPromise, timeoutPromise]);
     } catch (error) {
          console.error("Error generating location static params:", error);
     }
     return Array.from(slugsSet).map((slug) => ({ slug }));
}

// Fetch only location data
const getLocationData = cache(async (slug) => {
     try {
          const dbPromise = (async () => {
               await connectDB();
               const locationDoc = await Location.findOne({
                    $or: [
                         { "items.hero.slug": slug },
                         { "items.slug": slug }
                    ]
               }).select("items").lean();

               if (locationDoc && Array.isArray(locationDoc.items)) {
                    const item = locationDoc.items.find(it => (it.hero?.[0]?.slug === slug || it.slug === slug));
                    if (item) return JSON.parse(JSON.stringify(item));
               }
               return null;
          })();

          const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(null), 1500));
          const dbResult = await Promise.race([dbPromise, timeoutPromise]);
          if (dbResult) return dbResult;
     } catch (error) {
          console.error("Error in getLocationData fetching database:", error);
     }

     return getDefaultLocationData(slug);
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
     const baseUrl = getSiteUrl();
     const pageUrl = buildCanonicalUrl(`/location/${slug}`);
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

     return (
          <>
               <SchemaRenderer schemas={data?.schemas} />

               {/* Server-rendered static JSON-LD fallback for No-JS/Control+U */}
               {data?.schemas && Array.isArray(data.schemas) && data.schemas.length > 0 ? (
                    data.schemas.map((schemaStr, idx) => {
                         if (!schemaStr || !schemaStr.trim()) return null;
                         try {
                              const cleanJson = JSON.stringify(JSON.parse(schemaStr));
                              return (
                                   <script
                                        key={idx}
                                        type="application/ld+json"
                                        dangerouslySetInnerHTML={{ __html: cleanJson }}
                                   />
                              );
                         } catch (e) {
                              return null;
                         }
                    })
               ) : (
                    <script
                         type="application/ld+json"
                         dangerouslySetInnerHTML={{
                              __html: JSON.stringify({
                                   "@context": "https://schema.org",
                                   "@type": "EducationalOrganization",
                                   "name": `Weekend UX - ${data?.title || "Training Center"}`,
                                   "url": `https://www.weekendux.in/location/${data?.slug || ""}`,
                                   "description": data?.seodescription || `UI/UX Design Training Center in ${data?.title || "India"}`,
                                   "aggregateRating": {
                                        "@type": "AggregateRating",
                                        "ratingValue": "4.9",
                                        "reviewCount": "520",
                                        "bestRating": "5",
                                        "worstRating": "1"
                                   }
                              })
                         }}
                    />
               )}

               <LocationDetailsView data={data} />
          </>
     );
}
