import { updateTestimonial, deleteTestimonial } from "@/controllers/testimonialController";

export async function PUT(request, context) {
     return updateTestimonial(request, context);
}

export async function DELETE(request, context) {
     return deleteTestimonial(request, context);
}
