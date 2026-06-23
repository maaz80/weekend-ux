import { generatePageMetadata } from "@/utils/seo";

export async function generateMetadata() {
     return generatePageMetadata("location", "Location - Weekend UX", "Find details about our premium learning academy locations and nearby training centers.", "/location");
}

export default function LocationLayout({ children }) {
     return <>{children}</>;
}
