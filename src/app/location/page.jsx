import FAQ from "@/components/FAQ";
import Details from "@/components/Location/Details/Details";
import Feature from "@/components/Location/Features/Feature";
import Hero from "@/components/Location/Hero/Hero";
import Philosophy from "@/components/Location/Philosophy/Philosophy";
import Testimonials from "@/components/Location/Testimonials/Testimonials";
import RelatedBlogs from "@/components/RelatedBlogs";
import Content from "@/components/Location/Content/Content";

export default function Location() {
  return (
    <main className="min-h-screen bg-white text-neutral">
      <Hero />
      <Feature />
      <Content />
      <Details />
      <Philosophy />
      <Testimonials />
      <RelatedBlogs />
      <FAQ />
    </main>
  );
}