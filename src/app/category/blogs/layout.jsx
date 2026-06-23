import { generatePageMetadata } from "@/utils/seo";

export async function generateMetadata() {
     return generatePageMetadata("category-blogs", "Blogs & Educational Stories - Weekend UX", "Explore latest insights, articles, design tutorials, and expert views on UI/UX, product design, and development.", "/category/blogs");
}

export default function CategoryBlogsLayout({ children }) {
     return <>{children}</>;
}
