"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Hero from "@/components/About/Hero";
import FeatureStrip from "@/components/About/FeatureStrip";
import RelatedBlogs from "@/components/RelatedBlogs";
import FAQ from "@/components/FAQ";
import Content from "@/components/About/Content";
import Details from "@/components/About/Details";
import TeamSection from "@/components/About/TeamSection";

export default function About() {
     const [aboutData, setAboutData] = useState(null);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          async function fetchAbout() {
               try {
                    const res = await fetch("/api/about");
                    if (res.ok) {
                         const data = await res.json();
                         setAboutData(data);
                    }
               } catch (error) {
                    console.error("Failed to fetch about page config:", error);
               } finally {
                    setLoading(false);
               }
          }
          fetchAbout();
     }, []);

     return (
          <div className="bg-white text-neutral-900">
               <Hero data={aboutData?.hero?.[0]} />
               <FeatureStrip data={aboutData?.features} />
               <Content data={aboutData?.quote} />
               <Details data={aboutData?.why} />
               <TeamSection data={aboutData?.team} />
               <RelatedBlogs data={aboutData?.relatedBlogs} />
               <FAQ />
          </div>
     );
}
