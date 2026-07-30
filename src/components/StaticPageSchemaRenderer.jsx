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

          // Skip dynamic route pages (they are handled locally in their page.jsx files)
          const skipSlugs = ["blog/", "courses/", "location/"];
          if (skipSlugs.some(slug => pageSlug.startsWith(slug))) {
               return;
          }

          async function fetchSEO() {
               try {
                    const res = await fetch(`${API_URL}/pages/${pageSlug}/seo`);
                    if (res.ok) {
                         const data = await res.json();
                         setSchemas(data.schemas || []);
                    }
               } catch (e) {
                    console.error("Error fetching page schemas:", e);
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
                    console.error("Invalid static JSON-LD script:", schemaStr, e);
               }
          });

          return () => {
               const existing = document.querySelectorAll("script[data-static-schema='true']");
               existing.forEach(el => el.remove());
          };
     }, [schemas]);

     return null;
}
