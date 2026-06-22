import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import Link from 'next/link'

const BlogCard = ({ blog, height ='h-62.5 md:h-95'}) => {
     const slugOrId = blog?.slug || blog?._id || blog?.id || "";
     const imageSrc = blog?.image && blog.image.trim() ? blog.image.trim() : "/images/hero-bg.jpg";

     return (
          <div>
               <Link href={`/${slugOrId}`} className="block">
                    <article
                         className="group cursor-pointer"
                    >
                         {/* Image */}
                         <div className="overflow-hidden rounded-md bg-zinc-100">
                              <img
                                   src={imageSrc}
                                   alt={blog?.alt || blog?.title || "Blog Image"}
                                   className={`w-full object-cover transition duration-700 group-hover:scale-105 ${height}`}
                              />
                         </div>

                         {/* Title */}
                         <div className="mt-2 md:mt-5 flex items-start justify-between gap-4">
                              <h3 className="font-urbanist text-[20px] md:text-[26px] leading-[1.35] text-neutral-900 line-clamp-2">
                                   {blog?.title || "Untitled Post"}
                              </h3>

                              <IoIosArrowForward
                                   size={22}
                                   className="mt-1 md:mt-2 shrink-0 text-neutral-900 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                              />
                         </div>
                    </article>
               </Link>
          </div>
     )
}

export default BlogCard;