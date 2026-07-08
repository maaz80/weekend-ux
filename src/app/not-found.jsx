import React from "react";
import Link from "next/link";
import { generatePageMetadata, getPageSEOData } from "@/utils/seo";

export async function generateMetadata() {
     return generatePageMetadata(
          "not-found",
          "Page Not Found - Weekend UX",
          "The page you are looking for does not exist.",
          "/not-found"
     );
}

export default async function NotFound() {
     const seo = await getPageSEOData("not-found");
     const displayTitle = seo?.title || "Page Not Found";
     const displayDesc = seo?.description || "The link you followed may be broken, or the page may have been removed.";

     return (
          <div className="min-h-screen bg-neutral text-white flex flex-col items-center justify-center font-urbanist px-4 text-center">
               <h1 className="text-6xl font-bold font-playfair text-official mb-4">404</h1>
               <h2 className="text-2xl font-semibold mb-2">{displayTitle}</h2>
               <p className="text-zinc-400 max-w-md mb-6">
                    {displayDesc}
               </p>
               <Link href="/" className="px-6 py-3 bg-official text-neutral rounded-lg font-medium hover:opacity-90 transition-all">
                    Go to Homepage
               </Link>
          </div>
     );
}
