import { getCourses, updateCourses } from "@/controllers/coursesController";

export const dynamic = "force-dynamic";

export async function GET(request) {
     return getCourses(request);
}

export async function PUT(request) {
     return updateCourses(request);
}
