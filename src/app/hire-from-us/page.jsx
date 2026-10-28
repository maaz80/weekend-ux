import HireHero from "@/components/HireFromUs/HireHero";
import CandidateSearch from "@/components/HireFromUs/CandidateSearch";
import RecruiterBenefits from "@/components/HireFromUs/RecruiterBenefits";
import HiringStats from "@/components/HireFromUs/HiringStats";
import CandidatePools from "@/components/HireFromUs/CandidatePools";
import { generatePageMetadata } from "@/utils/seo";
import Testimonials from '../../components/Home/Testimonials/Testimonials.jsx';
import RelatedBlogs from '../../components/RelatedBlogs.jsx';
import FAQ from '../../components/FAQ.jsx';
import connectDB from "@/config/db";
import HireFromUsModel from "@/models/HireFromUs";
export async function generateMetadata() {
  return generatePageMetadata(
    "hire-from-us",
    "Hire Designers from Weekend UX",
    "Connect with job-ready UI/UX designers trained at Weekend UX.",
    "/hire-from-us"
  );
}

export default async function HireFromUsPage() {
  let hireFromUs = null;
  try {
    await connectDB();
    const content = await HireFromUsModel.findOne().lean();
    hireFromUs = content ? JSON.parse(JSON.stringify(content)) : null;
  } catch (error) {
    console.error("Failed to load Hire From Us page content:", error);
  }

  return (
    <div className="bg-white text-neutral">
      <HireHero data={hireFromUs?.hero} />
      <CandidateSearch data={hireFromUs?.candidateSearch} />
      <RecruiterBenefits data={hireFromUs?.recruiterBenefits} />
      <HiringStats data={hireFromUs?.hiringStats} />
      <CandidatePools data={hireFromUs?.candidatePools} />
      <Testimonials/>
      <RelatedBlogs/>
      <FAQ />
    </div>
  );
}
