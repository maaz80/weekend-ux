export default function CourseDetailsLayout({ children }) {
     return (
          <>
               <link rel="preload" as="image" href="/images/weekend-ux-course-details-hero-bg.webp" fetchPriority="high" />
               {children}
          </>
     );
}
