"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronRight } from "react-icons/fi";

const formatSegment = (segment) => {
     const overrides = {
          "about-us": "About Us",
          "contact-us": "Contact Us",
          "privacy-policy": "Privacy Policy",
          "course-details": "Course Details",
          "disclaimer": "Disclaimer",
          "blogs": "Blogs",
          "courses": "Courses",
          "search": "Search",
     };

     if (overrides[segment]) {
          return overrides[segment];
     }

     return segment
          .split("-")
          .map(word => {
               if (word.toLowerCase() === "ui") return "UI";
               if (word.toLowerCase() === "ux") return "UX";
               return word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join(" ");
};

const getPathForSegment = (segment, originalSegments) => {
     if (segment === "blogs") {
          return "/category/blogs";
     }
     const originalIndex = originalSegments.indexOf(segment);
     const pathSegments = originalSegments.slice(0, originalIndex + 1);
     return "/" + pathSegments.join("/");
};

export default function Breadcrumb() {
     const pathname = usePathname();

     // Do not show breadcrumbs on the Home page
     if (pathname === "/") return null;

     const originalSegments = pathname.split("/").filter(Boolean);
     const segments = originalSegments.filter(s => s !== "category");

     return (
          <nav className="absolute left-0 w-full z-40 backdrop-blur-xl  py-2.5 md:py-3 top-30 md:top-29 select-none">
               <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 flex items-center gap-1.5 md:gap-2 text-[13px] md:text-[14px] font-medium text-white/70 font-urbanist">
                    <Link href="/" className="hover:text-white transition-colors duration-200 shrink-0">
                         Home
                    </Link>

                    {segments.map((segment, idx) => {
                         const label = formatSegment(segment);
                         const isLast = idx === segments.length - 1;
                         const path = getPathForSegment(segment, originalSegments);

                         return (
                              <div key={idx} className="flex items-center gap-1.5 md:gap-2 min-w-0">
                                   <FiChevronRight size={12} className="text-white/40 shrink-0" />
                                   {isLast ? (
                                        <span className="text-white font-semibold truncate max-w-37.5 sm:max-w-62.5 md:max-w-none">
                                             {label}
                                        </span>
                                   ) : (
                                        <Link href={path} className="hover:text-white transition-colors duration-200 truncate max-w-25 sm:max-w-45 md:max-w-none shrink-0">
                                             {label}
                                        </Link>
                                   )}
                              </div>
                         );
                    })}
               </div>
          </nav>
     );
}
