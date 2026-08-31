"use client";

import Image from "next/image";
import Details from "@/components/Course Details/Details";
import RelatedBlogs from "@/components/RelatedBlogs";
import FAQ from "@/components/FAQ";
import Breadcrumb from "@/components/Breadcrumb";

import CourseHero from "@/components/Course Details/CourseHero";

export default function CoursesPage() {
     return (
          <div className="min-h-screen bg-neutral text-white font-urbanist flex flex-col relative pt-15 md:pt-11">
               <Breadcrumb />

               {/* Hero Header Section */}
               <CourseHero heroTitle="Advance Certificate in AI for UI UX" />
               {/* <Details/> */}
               <RelatedBlogs/>
               <FAQ/>
          </div>
     );
}