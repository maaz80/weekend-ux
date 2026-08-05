import Hero from "@/components/About/Hero";
import FeatureStrip from "@/components/About/FeatureStrip";
import Testimonials from "@/components/Home/Testimonials/Testimonials";
import RelatedBlogs from "@/components/RelatedBlogs";
import FAQ from "@/components/FAQ";
import Content from "@/components/About/Content";
import Details from "@/components/About/Details";
import TeamSection from "@/components/About/TeamSection";

// Database imports for server-side pre-rendering
import connectDB from "@/config/db";
import AboutModel from "@/models/About";
import { getPageSEOData } from "@/utils/seo";
import SchemaRenderer from "@/components/SchemaRenderer";

export default async function About() {
     let aboutData = null;
     let seoData = null;
     try {
          await connectDB();
          const [doc, seo] = await Promise.all([
               AboutModel.findOne().lean(),
               getPageSEOData("about-us")
          ]);
          if (doc) {
               aboutData = JSON.parse(JSON.stringify(doc));
          }
          if (seo) {
               seoData = JSON.parse(JSON.stringify(seo));
          }
     } catch (error) {
          console.error("Failed to fetch about page config on server:", error);
     }

     return (
          <div className="bg-white text-neutral">
               {seoData?.schemas && Array.isArray(seoData.schemas) && seoData.schemas.map((schemaStr, idx) => (
                    <SchemaRenderer key={idx} schema={schemaStr} />
               ))}
               
               <Hero data={aboutData?.hero?.[0]} />
               <FeatureStrip data={aboutData?.features} />
               <Content data={aboutData?.quote} />
               <Details data={aboutData?.why} />
               <TeamSection data={aboutData?.team} />
               <Testimonials />
               <RelatedBlogs data={aboutData?.relatedBlogs} />
               <FAQ />
          </div>
     );
}
