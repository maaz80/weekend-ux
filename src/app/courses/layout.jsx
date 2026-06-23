import { generatePageMetadata } from "@/utils/seo";

export async function generateMetadata() {
     return generatePageMetadata("courses", "Courses - Weekend UX", "Explore our high-end educational courses for UI/UX Design, AI design tools, video editing, development and product management.", "/courses");
}

export default function CoursesLayout({ children }) {
     return <>{children}</>;
}
