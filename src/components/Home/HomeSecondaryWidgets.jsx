"use client";

import dynamic from "next/dynamic";

const Testimonials = dynamic(() => import("@/components/Home/Testimonials/Testimonials"), { ssr: false });
const RelatedBlogs = dynamic(() => import("@/components/RelatedBlogs"), { ssr: false });
const FAQ = dynamic(() => import("@/components/FAQ"), { ssr: false });

export default function HomeSecondaryWidgets() {
  return (
    <>
      <Testimonials />
      <RelatedBlogs />
      <FAQ />
    </>
  );
}
