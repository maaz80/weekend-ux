import { generatePageMetadata } from "@/utils/seo";

export async function generateMetadata() {
     return generatePageMetadata("about-us", "About Us - Weekend UX", "Learn more about Weekend UX, our team, mission, and philosophy behind designing premium learning experiences.", "/about-us");
}

export default function AboutLayout({ children }) {
     return <>{children}</>;
}
