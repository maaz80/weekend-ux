import { generatePageMetadata } from "@/utils/seo";

export async function generateMetadata() {
     return generatePageMetadata("contact-us", "Contact Us - Weekend UX", "Get in touch with Weekend UX. Request callbacks, ask questions, or enroll in our elite UI/UX design courses.", "/contact-us");
}

export default function ContactLayout({ children }) {
     return (
          <>
               <link rel="preload" as="image" href="/images/weekend-ux-contact-hero-bg.webp" fetchPriority="high" />
               {children}
          </>
     );
}
