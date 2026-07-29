import { generatePageMetadata } from "@/utils/seo";

export async function generateMetadata() {
     return generatePageMetadata("category-blogs", "Blogs & Educational Stories - Weekend UX", "Explore latest insights, articles, design tutorials, and expert views on UI/UX, product design, and development.", "/blog");
}

export default function BlogListingLayout({ children }) {
     return <>{children}</>;
}
