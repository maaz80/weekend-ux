"use client";

import { useEffect, useState } from "react";
import { useHomeData } from "@/context/HomeDataContext";
import { usePathname } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import OptimizedImage from "@/components/ui/OptimizedImage";

const staticBlogs = [
     {
          id: 1,
          image: "/images/weekend-ux-hero-bg-template.webp",
          title: "Why should a learner prefer to on campus rather",
          slug: "why-should-a-learner-prefer-to-on-campus-rather"
     },
     {
          id: 2,
          image: "/images/weekend-ux-hero-bg-template.webp",
          title: "Why should a learner prefer to study on campus",
          slug: "why-should-a-learner-prefer-to-study-on-campus"
     },
     {
          id: 3,
          image: "/images/weekend-ux-hero-bg-template.webp",
          title: "Why should a learner prefer to study on campus rather than other options",
          slug: "why-should-a-learner-prefer-to-study-on-campus-rather-than-other-options"
     },
];

export default function RelatedBlogs({ data }) {
     const { homeData, blogsData } = useHomeData();

     const config = data || homeData?.relatedBlogs;

     const activeBlogs = (blogsData?.blogs && Array.isArray(blogsData.blogs) && blogsData.blogs.length > 0)
          ? blogsData.blogs.slice(0, 3)
          : staticBlogs;

     const title = (config?.title && config.title.trim())
          ? config.title
          : "BLOGS";

     const startheading = (config?.startheading && config.startheading.trim())
          ? config.startheading
          : "All You";

     const midheading = (config?.midheading && config.midheading.trim())
          ? config.midheading
          : "Need";

     const endheading = (config?.endheading && config.endheading.trim())
          ? config.endheading
          : " To Know";

     const description = (config?.description && config.description.trim())
          ? config.description
          : "Our students have gone on to build successful careers with leading organizations across diverse industries, showcasing the skills, knowledge, and confidence they gained through our programs.";

     const pathname = usePathname();

     return (
          <section className="relative overflow-hidden ">
               {/* Background Image */}
               <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                         backgroundImage: "url('/images/weekend-ux-related-blogs-bg.webp')",
                    }}
               />

               {/* Yellow Overlay */}
               <div className="absolute inset-0 bg-official/25" />

               {/* Content */}
               <div className="relative z-10 mx-auto max-w-360 px-5 py-16 md:px-8 md:py-20 xl:px-12 xl:py-24">


                    {/* Heading */}
                    <div className={`mx-auto max-w-212.5 text-center ${pathname === '/' ? 'pt-0' : 'pt-0'}`}>
                         <span className="font-urbanist text-[11px] font-bold uppercase tracking-[0.45em] text-white">
                              {title}
                         </span>

                         <h2 className="mt-4 font-playfair text-[38px] leading-[1.05] text-neutral-900 md:text-[58px] lg:text-[72px]">
                              {startheading}{" "}
                              {midheading && <span className="italic text-white">{midheading}</span>}
                              {endheading && <>{endheading.startsWith(" ") ? "" : " "}{endheading}</>}
                         </h2>

                         <p className="mx-auto mt-5 max-w-200 font-urbanist text-[15px] leading-7 text-neutral-900/80 md:text-[17px]">
                              {description}
                         </p>
                    </div>

                    {/* Blog Grid */}
                    <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                         {activeBlogs.map((blog) => {
                              const slugOrId = blog.slug || blog._id || blog.id;
                              const imageSrc = blog.image && blog.image.trim() ? blog.image.trim() : "/images/hero-bg.webp";
                              return (
                                   <Link
                                        key={slugOrId}
                                        href={`/${slugOrId}`}
                                        className="group block cursor-pointer"
                                   >
                                        {/* Image */}
                                        <div className="overflow-hidden rounded-md bg-zinc-100">
                                             <OptimizedImage
                                                  src={imageSrc}
                                                  alt={blog.alt || ""}
                                                  className="h-62.5 w-full object-fill transition duration-700 group-hover:scale-105 md:h-70"
                                                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                             />
                                        </div>

                                        {/* Title */}
                                        <div className="mt-2 md:mt-5 flex items-start justify-between gap-4">
                                             <h2 className="font-urbanist text-[20px] md:text-[26px] leading-[1.35] text-neutral-900 line-clamp-2">
                                                  {blog.title}
                                             </h2>

                                             <IoIosArrowForward
                                                  size={22}
                                                  className="mt-1 md:mt-2 shrink-0 text-neutral-900 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                                             />
                                        </div>
                                   </Link>
                              );
                         })}
                    </div>
               </div>
          </section>
     );
}