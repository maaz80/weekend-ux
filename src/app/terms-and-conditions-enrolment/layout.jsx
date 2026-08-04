import { generatePageMetadata } from "@/utils/seo";

export async function generateMetadata() {
     return generatePageMetadata("terms-and-conditions-enrolment", "Terms & Conditions - Weekend UX", "Read the terms and conditions of Weekend UX containing usage terms, service agreements, and legal obligations.", "/terms-and-conditions-enrolment");
}

export default function TermsLayout({ children }) {
     return <>{children}</>;
}
