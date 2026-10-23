import connectDB from "@/config/db";
import Blog from "@/models/Blog";
import Courses from "@/models/Courses";
import Location from "@/models/Location";
import { buildCanonicalUrl, getSiteUrl } from "@/utils/siteUrl";

const STATIC_PATHS = [
  "/",
  "/about-us",
  "/courses",
  "/course-details",
  "/contact-us",
  "/blog",
  "/location",
  "/privacy-policy",
  "/disclaimer",
  "/terms-and-conditions-enrolment",
];

function asDate(value) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function encodedSlug(value) {
  return typeof value === "string" ? encodeURIComponent(value.trim()) : "";
}

export async function getSeoUrlEntries() {
  const entries = new Map(
    STATIC_PATHS.map((pathname) => [buildCanonicalUrl(pathname), { url: buildCanonicalUrl(pathname) }])
  );

  try {
    await connectDB();
    const [blogDoc, coursesDoc, locationDocs] = await Promise.all([
      Blog.findOne().select("blogs.slug updatedAt").lean(),
      Courses.findOne().select("course.slug updatedAt").lean(),
      Location.find().select("items.hero.slug items.slug updatedAt").lean(),
    ]);

    const addEntry = (pathname, updatedAt) => {
      const url = buildCanonicalUrl(pathname);
      entries.set(url, { url, lastModified: asDate(updatedAt) });
    };

    for (const blog of blogDoc?.blogs || []) {
      const slug = encodedSlug(blog?.slug);
      if (slug) addEntry(`/blog/${slug}`, blog.updatedAt || blogDoc.updatedAt);
    }

    for (const course of coursesDoc?.course || []) {
      const slug = encodedSlug(course?.slug);
      if (slug) addEntry(`/courses/${slug}`, course.updatedAt || coursesDoc.updatedAt);
    }

    for (const group of locationDocs || []) {
      for (const item of group.items || []) {
        const slug = encodedSlug(item?.hero?.[0]?.slug || item?.hero?.slug || item?.slug);
        if (slug) addEntry(`/location/${slug}`, item.updatedAt || group.updatedAt);
      }
    }
  } catch (error) {
    console.error("Failed to load CMS URLs for SEO files:", error);
  }

  return Array.from(entries.values());
}

export function getSeoSiteRoot() {
  return getSiteUrl();
}
