"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function StaticPageSchemaRenderer() {
     const pathname = usePathname();
     const [schemas, setSchemas] = useState([]);

     useEffect(() => {
          // Normalize paths for mapping to PageSEO page slugs
          let pageSlug = pathname;
          if (pathname === "/") {
               pageSlug = "home";
          } else if (pathname.startsWith("/")) {
               pageSlug = pathname.substring(1);
          }

          // Skip routes that handle their own schemas server-side or don't use dynamic page SEO endpoints
          const skipSlugs = ["home", "", "blog", "courses", "location", "dashboard", "search", "contact-us", "about-us", "privacy-policy", "disclaimer", "terms-and-conditions-enrolment"];
          const baseSlug = pageSlug.split("/")[0];

          if (skipSlugs.includes(baseSlug) || skipSlugs.includes(pageSlug)) {
               return;
          }

          async function fetchSEO() {
               try {
                    const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
                    const API_URL = rawApiUrl.endsWith("/api") ? rawApiUrl : `${rawApiUrl.replace(/\/$/, "")}/api`;
                    const res = await fetch(`${API_URL}/pages/${pageSlug}/seo`);
                    if (res.ok) {
                         const data = await res.json();
                         setSchemas(data.schemas || []);
                    }
               } catch (e) {
                    // Suppress network error logging to prevent browser console clutter
               }
          }

          fetchSEO();
     }, [pathname]);

     useEffect(() => {
          if (!schemas.length) return;

          // Remove any existing dynamic static schemas first to prevent duplication
          const existing = document.querySelectorAll("script[data-static-schema='true']");
          existing.forEach(el => el.remove());

          schemas.forEach(schemaStr => {
               if (!schemaStr || !schemaStr.trim()) return;
               try {
                    const parsed = JSON.parse(schemaStr);
                    const script = document.createElement("script");
                    script.type = "application/ld+json";
                    script.setAttribute("data-static-schema", "true");
                    script.text = JSON.stringify(parsed);
                    document.head.appendChild(script);
               } catch (e) {
                    // Invalid JSON-LD script string
               }
          });

          return () => {
               const existing = document.querySelectorAll("script[data-static-schema='true']");
               existing.forEach(el => el.remove());
          };
     }, [schemas]);

     return null;
}
