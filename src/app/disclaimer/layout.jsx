import { generatePageMetadata } from "@/utils/seo";

export async function generateMetadata() {
     return generatePageMetadata("disclaimer", "Disclaimer - Weekend UX", "Read the disclaimer policy of Weekend UX containing terms, limitations of liability, and usage conditions.", "/disclaimer");
}

export default function DisclaimerLayout({ children }) {
     return <>{children}</>;
}
