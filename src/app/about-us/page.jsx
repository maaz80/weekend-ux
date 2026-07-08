import Hero from "@/components/About/Hero";
import FeatureStrip from "@/components/About/FeatureStrip";
import RelatedBlogs from "@/components/RelatedBlogs";
import FAQ from "@/components/FAQ";
import Content from "@/components/About/Content";
import Details from "@/components/About/Details";
import TeamSection from "@/components/About/TeamSection";

// Database imports for server-side pre-rendering
import connectDB from "@/config/db";
import AboutModel from "@/models/About";

export default async function About() {
     let aboutData = null;
     try {
          await connectDB();
          const doc = await AboutModel.findOne().lean();
          if (doc) {
               aboutData = JSON.parse(JSON.stringify(doc));
          }
     } catch (error) {
          console.error("Failed to fetch about page config on server:", error);
     }

     return (
          <div className="bg-white text-neutral">
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
