let cachedBrochure = null;
let isFetching = false;
let isDownloading = false;
let lastDownloadTime = 0;

// Immediately clear any legacy stale cached brochure from sessionStorage
if (typeof window !== "undefined") {
     try {
          sessionStorage.removeItem("active_brochure");
     } catch (_) {}
}

/**
 * Fetch active brochure from available endpoints in priority:
 * 1. Next.js internal /api/brochure (direct MongoDB access, no CORS, works dev & prod)
 * 2. Local Express backend on port 5000 (if running on localhost)
 */
async function fetchActiveBrochure() {
     const endpoints = ["/api/brochure"];

     if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
          endpoints.push("http://localhost:5000/api/brochure");
     }

     for (const url of endpoints) {
          try {
               const res = await fetch(url, { cache: "no-store" });
               if (res.ok) {
                    const data = await res.json();
                    if (data && data.success && data.brochure && data.brochure.pdfUrl) {
                         cachedBrochure = data.brochure;
                         return data.brochure;
                    }
               }
          } catch (_) {
               // Try next candidate
          }
     }
     return null;
}

/**
 * Pre-fetch brochure info on page load so when forms are submitted,
 * the PDF link is already available in memory for instant opening.
 */
export async function prefetchBrochure() {
     if (typeof window === "undefined") return null;
     if (cachedBrochure || isFetching) return cachedBrochure;

     isFetching = true;
     try {
          await fetchActiveBrochure();
     } catch (err) {
          console.warn("Could not prefetch brochure:", err);
     } finally {
          isFetching = false;
     }

     return cachedBrochure;
}

/**
 * Automatically downloads and opens the brochure:
 * - EXACTLY 1 new tab opened with the PDF
 * - EXACTLY 1 file downloaded silently to user's system
 * - Debounced and guarded against double triggers
 */
export async function downloadAndOpenBrochure() {
     if (typeof window === "undefined") return;

     // Strict debounce & mutex to prevent double triggers
     const now = Date.now();
     if (isDownloading || now - lastDownloadTime < 4000) {
          return;
     }
     isDownloading = true;
     lastDownloadTime = now;

     try {
          let brochure = cachedBrochure;

          // Always fetch latest if not present
          if (!brochure || !brochure.pdfUrl) {
               brochure = await fetchActiveBrochure();
          }

          if (!brochure || !brochure.pdfUrl) {
               console.warn("No brochure PDF configured by admin.");
               return;
          }

          const rawUrl = brochure.pdfUrl;
          const pdfUrl = (rawUrl.startsWith("http://") || rawUrl.startsWith("https://") || rawUrl.startsWith("/"))
               ? rawUrl
               : `/${rawUrl}`;
          const fileName = brochure.fileName || "Weekend-UX-Brochure.pdf";

          // 1. OPEN EXACTLY 1 NEW TAB WITH THE PDF
          try {
               window.open(pdfUrl, "_blank", "noopener,noreferrer");
          } catch (openErr) {
               console.warn("Could not open PDF in new tab:", openErr);
          }

          // 2. DOWNLOAD FILE SILENTLY (WITHOUT OPENING EXTRA TABS)
          try {
               const response = await fetch(pdfUrl, { cache: "no-store" });
               if (response.ok) {
                    const blob = await response.blob();
                    const blobUrl = window.URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.style.display = "none";
                    link.href = blobUrl;
                    link.download = fileName;
                    // Do NOT set target="_blank" — we want silent download without extra tabs!
                    document.body.appendChild(link);
                    link.click();
                    setTimeout(() => {
                         if (document.body.contains(link)) document.body.removeChild(link);
                         window.URL.revokeObjectURL(blobUrl);
                    }, 5000);
                    return;
               }
          } catch (_) {
               // Fallback: direct anchor download without target="_blank"
          }

          const fallbackLink = document.createElement("a");
          fallbackLink.style.display = "none";
          fallbackLink.href = pdfUrl;
          fallbackLink.setAttribute("download", fileName);
          // Do NOT set target="_blank" — prevents opening second tab
          document.body.appendChild(fallbackLink);
          fallbackLink.click();
          setTimeout(() => {
               if (document.body.contains(fallbackLink)) document.body.removeChild(fallbackLink);
          }, 5000);

     } catch (err) {
          console.error("Error executing downloadAndOpenBrochure:", err);
     } finally {
          setTimeout(() => {
               isDownloading = false;
          }, 3500);
     }
}
