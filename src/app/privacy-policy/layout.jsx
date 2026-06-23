import { generatePageMetadata } from "@/utils/seo";

export async function generateMetadata() {
     return generatePageMetadata("privacy-policy", "Privacy Policy - Weekend UX", "Read the privacy policy of Weekend UX explaining how we protect and handle your personal data.", "/privacy-policy");
}

export default function PrivacyLayout({ children }) {
     return <>{children}</>;
}
