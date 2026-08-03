// Dynamic Sitemap — automatically generates XML sitemap from live MongoDB data
// Accessed at: https://www.weekendux.com/sitemap.xml
// Next.js automatically converts this file's return value into a valid sitemap.xml response

const BASE_URL = "https://www.weekendux.com";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://weekend-backend.onrender.com";

// Static pages that are always in sitemap
const staticRoutes = [
     { url: "/", priority: 1.0, changeFrequency: "weekly" },
     { url: "/about-us", priority: 0.8, changeFrequency: "monthly" },
     { url: "/courses", priority: 0.9, changeFrequency: "weekly" },
     { url: "/blog", priority: 0.9, changeFrequency: "daily" },
     { url: "/contact-us", priority: 0.7, changeFrequency: "monthly" },
     { url: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
     { url: "/disclaimer", priority: 0.3, changeFrequency: "yearly" },
];

// Fetch all blog slugs from MongoDB via backend API
async function getBlogSlugs() {
     try {
          const res = await fetch(`${API_URL}/api/blog`, {
               next: { revalidate: 3600 }, // Revalidate every 1 hour
          });
          if (!res.ok) return [];
          const data = await res.json();
          const blogs = data?.blogs || data?.data || data || [];
          return Array.isArray(blogs) ? blogs : [];
     } catch {
          return [];
     }
}

// Fetch all course slugs from MongoDB via backend API
async function getCourseSlugs() {
     try {
          const res = await fetch(`${API_URL}/api/courses`, {
               next: { revalidate: 3600 }, // Revalidate every 1 hour
          });
          if (!res.ok) return [];
          const data = await res.json();
          const coursesPage = data?.coursesPage || data || {};
          const courses = coursesPage?.course || [];
          return Array.isArray(courses) ? courses : [];
     } catch {
          return [];
     }
}

export default async function sitemap() {
     const [blogs, courses] = await Promise.all([getBlogSlugs(), getCourseSlugs()]);

     // Static routes
     const staticEntries = staticRoutes.map(({ url, priority, changeFrequency }) => ({
          url: `${BASE_URL}${url}`,
          lastModified: new Date(),
          changeFrequency,
          priority,
     }));

     // Dynamic blog routes — auto-generates for every blog in MongoDB
     const blogEntries = blogs
          .filter((blog) => blog?.slug)
          .map((blog) => ({
               url: `${BASE_URL}/blog/${blog.slug}`,
               lastModified: blog.updatedAt ? new Date(blog.updatedAt) : new Date(),
               changeFrequency: "weekly",
               priority: 0.8,
          }));

     // Dynamic course routes — auto-generates for every course in MongoDB
     const courseEntries = courses
          .filter((course) => course?.slug)
          .map((course) => ({
               url: `${BASE_URL}/courses/${course.slug}`,
               lastModified: new Date(),
               changeFrequency: "monthly",
               priority: 0.9,
          }));

     return [...staticEntries, ...blogEntries, ...courseEntries];
}
