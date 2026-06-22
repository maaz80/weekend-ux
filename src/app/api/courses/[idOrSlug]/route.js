import { getCourseBySlug } from "@/controllers/coursesController";

export async function GET(request, context) {
     return getCourseBySlug(request, context);
}
