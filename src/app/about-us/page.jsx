import Image from "next/image";
import Hero from "@/components/About/Hero";
import FeatureStrip from "@/components/About/FeatureStrip";
import RelatedBlogs from "@/components/RelatedBlogs";
import FAQ from "@/components/FAQ";
import Content from "@/components/About/Content";
import Details from "@/components/About/Details";
import TeamSection from "@/components/About/TeamSection";

export default function About() {
     return (
          <div className="bg-white text-neutral-900">
               <Hero />
               <FeatureStrip />
               <Content />
               <Details />
               <TeamSection />
               <RelatedBlogs />
               <FAQ />
          </div>
     );
}
