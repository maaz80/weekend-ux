"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import BlogDetailsView from "./Details";
import CourseDetailsView from "@/components/Course Details/Details";
import LocationDetailsView from "@/components/Location/LocationDetailsView";
import FAQ from "@/components/FAQ";
import RelatedBlogs from "@/components/RelatedBlogs";

export default function DynamicSlugPage() {
     const params = useParams();
     const slug = params?.slug;

     const [data, setData] = useState(null);
     const [dataType, setDataType] = useState(null); // "blog" | "course" | "location" | "not_found"
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          if (!slug) return;
          
          async function fetchDetails() {
               try {
                    // Fetch all in parallel to reduce loading latency (optimized Approach A dispatcher)
                    const [blogRes, courseRes, locationRes] = await Promise.all([
                         fetch(`/api/blogs/${slug}`),
                         fetch(`/api/courses/${slug}`),
                         fetch(`/api/location-items/${slug}`)
                    ]);

                    if (blogRes.ok) {
                         const blogData = await blogRes.json();
                         setDataType("blog");
                         setData(blogData);
                    } else if (courseRes.ok) {
                         const courseData = await courseRes.json();
                         setDataType("course");
                         setData(courseData);
                    } else if (locationRes.ok) {
                         const locationData = await locationRes.json();
                         setDataType("location");
                         setData(locationData);
                    } else {
                         setDataType("not_found");
                     }
               } catch (error) {
                    console.error("Failed to fetch dynamic content:", error);
                    setDataType("not_found");
               } finally {
                    setLoading(false);
               }
          }

          fetchDetails();
     }, [slug]);

     if (loading) {
          return (
               <div className="min-h-screen bg-black text-white flex items-center justify-center font-urbanist">
                    <div className="text-center animate-pulse">
                         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-official mx-auto mb-4"></div>
                         <p className="text-zinc-400">Loading details...</p>
                    </div>
               </div>
          );
     }

     if (dataType === "not_found" || !data) {
          return (
               <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-urbanist px-4 text-center">
                    <h1 className="text-6xl font-bold font-playfair text-official mb-4">404</h1>
                    <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
                    <p className="text-zinc-400 max-w-md mb-6">
                         The link you followed may be broken, or the page may have been removed.
                    </p>
                    <a href="/" className="px-6 py-3 bg-official text-black rounded-lg font-medium hover:opacity-90 transition-all">
                         Go to Homepage
                    </a>
               </div>
          );
     }

     if (dataType === "location") {
          return <LocationDetailsView data={data} />;
     }

     if (dataType === "course") {
          const heroTitle = data?.title && data.title.trim()
               ? data.title.trim()
               : "Advance Certificate in AI for UI UX";

          return (
               <div className="min-h-screen bg-black text-white font-urbanist flex flex-col">
                    {/* Hero Header Section */}
                    <section className="relative h-62.5 md:h-100 w-full flex items-center justify-center bg-zinc-950 overflow-hidden">
                         <Image
                              src="/images/weekend-ux-course-details-hero-bg.webp"
                              alt="weekend-ux-course-details-hero-bg"
                              fill
                              priority
                              className="object-cover object-center opacity-60 z-0"
                         />
                         {/* Content */}
                         <h1 className="text-[22px] md:text-[38px] 2xl:text-[56px] leading-10 md:leading-15 2xl:leading-20 text-white relative z-50 font-playfair text-center px-4">
                              {heroTitle}
                         </h1>
                    </section>
                    <CourseDetailsView data={data} />
                    <RelatedBlogs />
                    <FAQ />
               </div>
          );
     }

     // Default fallback to blog layout
     const heroTitle = data?.title && data.title.trim()
          ? data.title.trim()
          : "Explore Our Blogs";

     return (
          <div className="min-h-screen bg-white text-white font-urbanist flex flex-col">
               {/* Hero Header Section */}
               <section className="relative h-52.5 md:h-100 w-full flex items-center justify-center bg-zinc-950 ">
                    <Image
                         src="/images/weekend-ux-blogs-hero-bg.webp"
                         alt="weekend-ux-policy-hero-bg"
                         fill
                         priority
                         className="object-cover object-center opacity-65 z-0"
                     />
                    
                    {/* Content */}
                    <h1 className="custom-width text-[22px] md:text-[38px] 2xl:text-[56px] text-center leading-10 md:leading-15 2xl:leading-20 text-white relative z-50 font-playfair px-4">
                         {heroTitle}
                    </h1>
                    <Image src="/images/weekend-ux-decorative-diamond.webp" alt="weekend-ux-decorative-diamond" className="w-24 md:w-50 h-auto absolute left-3 md:left-10 -bottom-8 md:-bottom-16 z-30" width={200} height={200} style={{ height: "auto" }} />
               </section>
               
               <BlogDetailsView data={data} />
               <RelatedBlogs />
               <FAQ />
          </div>
     );
}


