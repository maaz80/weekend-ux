import React from "react";
import CorporateHero from "@/components/CorporateTraining/CorporateHero";
import CorporateStatsBanner from "@/components/CorporateTraining/CorporateStatsBanner";
import CorporateTrustedBy from "@/components/CorporateTraining/CorporateTrustedBy";
import CorporateWhyUs from "@/components/CorporateTraining/CorporateWhyUs";
import CorporateLearningModel from "@/components/CorporateTraining/CorporateLearningModel";
import CorporateOutcomes from "@/components/CorporateTraining/CorporateOutcomes";
import TalkToExpert from "@/components/CorporateTraining/TalkToExpert";
import Testimonials from "@/components/Home/Testimonials/Testimonials";
import Philosophy from "@/components/Home/Philosophy/Philosophy";
import FAQ from "@/components/FAQ";
import RelatedBlogs from "@/components/RelatedBlogs.jsx";
// import Testimonials from "@/components/Home/Testimonials/Testimonials.jsx";
import FeatureStrip from "@/components/About/FeatureStrip.jsx";
import connectDB from "@/config/db";
import CorporateTrainingModel from "@/models/CorporateTraining";
import FaqModel from "@/models/Faq";
import { generatePageMetadata } from "@/utils/seo";


export async function generateMetadata() {
  return generatePageMetadata(
    "corporate-training",
    "Corporate Training | Upskill Your Workforce | Weekend UX",
    "Upskill your workforce, accelerate AI & digital readiness with Weekend UX corporate training programs.",
    "/corporate-training"
  );
}

export default async function CorporateTrainingPage() {
  let corporateTraining = null;
  let corporateTrainingFaq = null;
  try {
    await connectDB();
    const [content, faq] = await Promise.all([
      CorporateTrainingModel.findOne().lean(),
      FaqModel.findOne({ pageSlug: "corporate-training" }).lean(),
    ]);
    corporateTraining = content ? JSON.parse(JSON.stringify(content)) : null;
    corporateTrainingFaq = faq ? JSON.parse(JSON.stringify(faq)) : null;
  } catch (error) {
    console.error("Failed to load Corporate Training page content and FAQ:", error);
  }

  return (
    <div className="bg-white text-neutral min-h-screen">
      {/* 1. Hero Section (image-5.png) */}
      <CorporateHero data={corporateTraining?.hero} />

      {/* 2. Stats & Mission Banner (image-6.png) */}
      {/* <CorporateStatsBanner /> */}
      <FeatureStrip />
      {/* 3. Trusted By Organizations (image.png) */}
      <CorporateTrustedBy data={corporateTraining?.trustedBy} />
<Philosophy />
      {/* 4. Why Top Companies Prefer WeekendUX (image-1.png) */}
      <CorporateWhyUs data={corporateTraining?.whyUs} />

      {/* 5. Training Options / Learning Model (image-2.png) */}
      <CorporateLearningModel data={corporateTraining?.trainingOptions} />

      <RelatedBlogs />
      <Testimonials />
      {/* 6. Proven Outcomes (image-3.png) */}
      <CorporateOutcomes data={corporateTraining?.outcomes} />
      <TalkToExpert data={corporateTraining?.talkToExpert} />

      {/* Social Proof & FAQs */}
      {/* <Testimonials /> */}
      <FAQ faqData={corporateTrainingFaq} />
    </div>
  );
}
