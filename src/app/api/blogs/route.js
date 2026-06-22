import { getBlogs, createBlog, updateBlogPage } from "@/controllers/blogController";

export async function GET(request) {
     return getBlogs(request);
}

export async function POST(request) {
     return createBlog(request);
}

export async function PUT(request) {
     return updateBlogPage(request);
}

