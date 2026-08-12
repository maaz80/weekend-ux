import dynamic from "next/dynamic";
import Hero from "@/components/Home/Hero/Hero";
import OurPrograms from "@/components/Home/OurPrograms/OurPrograms";
import { generatePageMetadata } from "@/utils/seo";

// Below-the-fold components dynamically imported for automatic code-splitting & ultra-fast initial page load
const Details = dynamic(() => import("@/components/Home/Details/Details"));
const Philosophy = dynamic(() => import("@/components/Home/Philosophy/Philosophy"));
const Testimonials = dynamic(() => import("@/components/Home/Testimonials/Testimonials"));
const RelatedBlogs = dynamic(() => import("@/components/RelatedBlogs"));
const FAQ = dynamic(() => import("@/components/FAQ"));

export async function generateMetadata() {
     return generatePageMetadata("home", "Weekend UX - Learn UI/UX Design & Development", "Join Weekend UX to kickstart your career in UI/UX design, AI design tools, video editing, and product design with expert-led courses.");
}

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral text-white">
      <Hero />
      <OurPrograms />
      <Details />
      <Philosophy />
      <Testimonials />
      <RelatedBlogs />
      <FAQ />
    </main>
  );
}