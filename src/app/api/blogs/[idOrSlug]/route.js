import { getBlogBySlug, updateBlog, deleteBlog } from "@/controllers/blogController";

export async function GET(request, context) {
     return getBlogBySlug(request, context);
}

export async function PUT(request, context) {
     return updateBlog(request, context);
}

export async function DELETE(request, context) {
     return deleteBlog(request, context);
}
