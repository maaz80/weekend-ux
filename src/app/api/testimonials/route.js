import { getTestimonials, createTestimonial } from "@/controllers/testimonialController";

export async function GET(request) {
     return getTestimonials(request);
}

export async function POST(request) {
     return createTestimonial(request);
}
