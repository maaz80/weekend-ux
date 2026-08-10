"use client";

import React from "react";

/**
 * Utility function to dynamically insert transformation parameters into a Cloudinary URL.
 * Uses f_auto,q_auto:eco for maximum compression and respects crop mode (fill vs fit/contain).
 */
export function getOptimizedCloudinaryUrl(url, { width, height, quality = "auto:eco", format = "auto", crop = "fill" } = {}) {
     if (!url) return "";
     if (!url.includes("cloudinary.com")) return url;

     // Locate the /upload/ section of the Cloudinary URL
     const uploadIndex = url.indexOf("/upload/");
     if (uploadIndex === -1) return url;

     const baseUrl = url.substring(0, uploadIndex + 8);
     const remainingUrl = url.substring(uploadIndex + 8);

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
     return `${baseUrl}${transformString}/${remainingUrl}`;
}

/**
 * OptimizedImage component for ultra-high-performance responsive images.
 * Implements Cloudinary auto-format (f_auto), aggressive auto-quality (q_auto:eco),
 * exact aspect-ratio cropping, adaptive srcSet, and LCP fetchPriority.
 */
export default function OptimizedImage({
     src,
     alt = "",
     className = "",
     priority = false, // Set to true if this image appears above the fold (e.g. Hero banner)
     sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px",
     objectFit = "cover",
     fallbackSrc = "/images/weekend-ux-hero-bg-template.webp",
     fetchPriority = undefined, // Optional fetch priority attribute
     width = undefined,
     height = undefined,
     crop = undefined
}) {
     const imageSrc = src || fallbackSrc;
     const isCloudinary = imageSrc.includes("cloudinary.com");

     const finalFetchPriority = fetchPriority || (priority ? "high" : undefined);
     const loadingMode = priority ? "eager" : "lazy";

     if (!isCloudinary) {
          return (
               <img
                    src={imageSrc}
                    alt={alt}
                    width={width}
                    height={height}
                    className={`${className}`}
                    loading={loadingMode}
                    decoding="async"
                    style={{ objectFit }}
                    fetchPriority={finalFetchPriority}
               />
          );
     }

     const isSmallImage = width && width <= 320;
     const srcsetWidths = isSmallImage
          ? [90, 120, 150, 180, 220, 260, 320]
          : [160, 240, 320, 420, 480, 560, 640, 768];

     // Calculate aspect ratio if width & height are provided
     const aspectRatio = (width && height) ? height / width : null;
     const selectedCrop = crop || (objectFit === "contain" ? "fit" : "fill");

     const srcSet = srcsetWidths
          .map((w) => {
               const calculatedHeight = (aspectRatio && selectedCrop !== "fit" && selectedCrop !== "contain") ? Math.round(w * aspectRatio) : undefined;
               const transformUrl = getOptimizedCloudinaryUrl(imageSrc, {
                    width: w,
                    height: calculatedHeight,
                    quality: "auto:eco",
                    format: "auto",
                    crop: selectedCrop
               });
               return `${transformUrl} ${w}w`;
          })
          .join(", ");

     // Default fallback width based on component size hint
     const defaultWidth = width ? width : 420;
     const defaultHeight = (aspectRatio && selectedCrop !== "fit" && selectedCrop !== "contain") ? Math.round(defaultWidth * aspectRatio) : undefined;
     const defaultSrc = getOptimizedCloudinaryUrl(imageSrc, {
          width: defaultWidth,
          height: defaultHeight,
          quality: "auto:eco",
          format: "auto",
          crop: selectedCrop
     });

     return (
          <img
               src={defaultSrc}
               srcSet={srcSet}
               sizes={sizes}
               alt={alt}
               width={width}
               height={height}
               className={`${className}`}
               loading={loadingMode}
               decoding="async"
               style={{ objectFit }}
               fetchPriority={finalFetchPriority}
          />
     );
}
