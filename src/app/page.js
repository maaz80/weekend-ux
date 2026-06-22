import FAQ from "@/components/FAQ";
import Details from "@/components/Home/Details/Details";
import Feature from "@/components/Home/Features/Feature";
import Hero from "@/components/Home/Hero/Hero";
import OurPrograms from "@/components/Home/OurPrograms/OurPrograms";
import Philosophy from "@/components/Home/Philosophy/Philosophy";
import Testimonials from "@/components/Home/Testimonials/Testimonials";
import RelatedBlogs from "@/components/RelatedBlogs";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <Feature />
      <OurPrograms />
      <Details />
      <Philosophy />
      <Testimonials />
      <RelatedBlogs/>
      <FAQ />
    </main>
  );
}