/**
 * Utility function to dynamically insert transformation parameters into a Cloudinary URL.
 * Uses f_auto,q_auto:eco for maximum compression and respects crop mode (fill vs fit/contain).
 * Safe for use in both Server Components and Client Components.
 */
export function getOptimizedCloudinaryUrl(url, { width, height, quality = "auto:low", format = "auto", crop = "fill" } = {}) {
     if (!url) return "";
     if (!url.includes("cloudinary.com")) return url;

     // Locate the /upload/ section of the Cloudinary URL
     const uploadIndex = url.indexOf("/upload/");
     if (uploadIndex === -1) return url;

     const baseUrl = url.substring(0, uploadIndex + 8);
     let rest = url.substring(uploadIndex + 8);

     // Strip any pre-existing transformation segments before the version or asset path
     const versionMatch = rest.match(/v\d+\//);
     if (versionMatch) {
          rest = rest.substring(versionMatch.index);
     } else {
          // If no version string, strip leading transformation flags (e.g. f_auto,q_auto:eco,w_768/)
          rest = rest.replace(/^([a-z]{1,3}_[^/]+\/?)+/, "");
          rest = rest.replace(/^\//, "");
     }

     const transforms = [];
     if (format) transforms.push(`f_${format}`);
     if (quality) transforms.push(`q_${quality}`);
     if (width) transforms.push(`w_${Math.round(width)}`);
     if (height && crop !== "fit" && crop !== "contain") {
          transforms.push(`h_${Math.round(height)}`);
     }
     if (crop && (width || height)) {
          if (crop === "contain" || crop === "fit") {
               transforms.push("c_fit");
          } else if (crop === "limit") {
               transforms.push("c_limit");
          } else {
               transforms.push(`c_${crop},g_auto`);
          }
     }

     const transformString = transforms.join(",");
     return `${baseUrl}${transformString}/${rest}`;
}
