import FreeResourcesHero from "@/components/FreeResources/FreeResourcesHero";
import FeatureStrip from "@/components/About/FeatureStrip";
import FeaturedResources from "@/components/FreeResources/FeaturedResources";
import PopularTutorials from "@/components/FreeResources/PopularTutorials";
import OurPrograms from "@/components/Home/OurPrograms/OurPrograms";
import RelatedBlogs from "@/components/RelatedBlogs";
import FAQ from "@/components/FAQ";
import connectDB from "@/config/db";
import FreeResourcesModel from "@/models/FreeResources";
import CoursesModel from "@/models/Courses";
import { generatePageMetadata } from "@/utils/seo";

export async function generateMetadata() {
  return generatePageMetadata(
    "free-resources",
    "Free Resources | Weekend UX",
    "Explore free learning resources from Weekend UX.",
    "/free-resources"
  );
}

export default async function FreeResourcesPage() {
  let freeResources = null;
  let courses = [];
  try {
    await connectDB();
    const [content, coursesPage] = await Promise.all([
      FreeResourcesModel.findOne().lean(),
      CoursesModel.findOne().select("course").lean(),
    ]);
    freeResources = content ? JSON.parse(JSON.stringify(content)) : null;

    const allCourses = coursesPage?.course || [];
    const selectedSlugs = freeResources?.featuredResources?.courseSlugs;
    const selectedCourses = Array.isArray(selectedSlugs) && selectedSlugs.length
      ? allCourses.filter((course) => selectedSlugs.includes(course.slug || course._id.toString()))
      : allCourses.slice(0, 4);
    courses = JSON.parse(JSON.stringify(selectedCourses));
  } catch (error) {
    console.error("Failed to load Free Resources page content:", error);
  }

  return (
    <div className="bg-white text-neutral min-h-screen">
      <FreeResourcesHero data={freeResources?.hero} />
      <FeatureStrip />
      <FeaturedResources data={freeResources?.featuredResources} courses={courses} />
      <PopularTutorials data={freeResources?.popularTutorials} />
      <OurPrograms />
      <RelatedBlogs />
      <FAQ />
    </div>
  );
}
