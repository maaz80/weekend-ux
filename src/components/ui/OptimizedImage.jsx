"use client";

import React from "react";

/**
 * Utility function to dynamically insert transformation parameters into a Cloudinary URL.
 */
export function getOptimizedCloudinaryUrl(url, { width, height, quality = "auto:good", format = "auto", crop = "fill" } = {}) {
     if (!url) return "";
     if (!url.includes("cloudinary.com")) return url;

     // Locate the /upload/ section of the Cloudinary URL
     const uploadIndex = url.indexOf("/upload/");
     if (uploadIndex === -1) return url;

     const baseUrl = url.substring(0, uploadIndex + 8);
     const remainingUrl = url.substring(uploadIndex + 8);

     const transforms = [];
     if (width) transforms.push(`w_${width}`);
     if (height) transforms.push(`h_${height}`);
     if (crop && (width || height)) transforms.push(`c_${crop}`);
     if (quality) transforms.push(`q_${quality}`);
     if (format) transforms.push(`f_${format}`);
     transforms.push("dpr_auto"); // Automatically adjust image density for retina/high-res displays

     const transformString = transforms.join(",");
     return `${baseUrl}${transformString}/${remainingUrl}`;
}

/**
 * OptimizedImage component for highly optimized responsive images.
 * Ideal for dynamic Cloudinary images, falling back to static local images seamlessly.
 *
 * Performance Features:
 * - Ultra-lightweight Cloudinary delivery using f_auto,q_auto:good
 * - Adaptive srcSet breakpoints for logos (90-320px) & general images (160-1600px)
 * - Priority LCP support: auto fetchPriority="high", loading="eager", decoding="async"
 * - Non-priority lazy loading: loading="lazy", decoding="async"
 * - Explicit width & height props to prevent Cumulative Layout Shift (CLS)
 */
export default function OptimizedImage({
     src,
     alt = "",
     className = "",
     priority = false, // Set to true if this image appears above the fold (e.g. Hero banner)
     sizes = "(max-width: 768px) 100vw, 50vw",
     objectFit = "cover",
     fallbackSrc = "/images/weekend-ux-hero-bg-template.webp",
     fetchPriority = undefined, // Optional fetch priority attribute
     width = undefined,
     height = undefined
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
          : [160, 320, 480, 600, 800, 1024, 1280, 1600];

     const srcSet = srcsetWidths
          .map((w) => `${getOptimizedCloudinaryUrl(imageSrc, { width: w, quality: "auto:good", format: "auto" })} ${w}w`)
          .join(", ");

     // Default fallback width based on component size hint
     const defaultWidth = width ? width : 480;
     const defaultSrc = getOptimizedCloudinaryUrl(imageSrc, { width: defaultWidth, quality: "auto:good", format: "auto" });

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
