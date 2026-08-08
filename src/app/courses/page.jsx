import CoursesPageClient from "@/components/Courses/CoursesPageClient";
import connectDB from "@/config/db";
import CoursesModel from "@/models/Courses";

// Fetch courses data at BUILD TIME — no runtime API calls
async function getCoursesData() {
     try {
          await connectDB();
          const coursesDoc = await CoursesModel.findOne().lean();
          return coursesDoc ? JSON.parse(JSON.stringify(coursesDoc)) : null;
     } catch (e) {
          console.error("Failed to fetch courses data at build time:", e);
          return null;
     }
}

export default async function CoursesPage() {
     const coursesData = await getCoursesData();
     return <CoursesPageClient coursesData={coursesData} />;
}
