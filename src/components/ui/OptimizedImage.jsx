"use client";

import React from "react";

/**
 * Utility function to dynamically insert transformation parameters into a Cloudinary URL.
 */
export function getOptimizedCloudinaryUrl(url, { width, height, quality = "auto", format = "auto", crop = "fill" } = {}) {
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
 */
export default function OptimizedImage({
     src,
     alt = "Optimized Image",
     className = "",
     priority = false, // Set to true if this image appears above the fold (e.g. Hero banner)
     sizes = "100vw",
     objectFit = "cover",
     fallbackSrc = "/images/weekend-ux-hero-bg-template.webp"
}) {
     const imageSrc = src || fallbackSrc;
     const isCloudinary = imageSrc.includes("cloudinary.com");

     if (!isCloudinary) {
          return (
               <img
                    src={imageSrc}
                    alt={alt}
                    className={`${className}`}
                    loading={priority ? "eager" : "lazy"}
                    style={{ objectFit }}
               />
          );
     }

     // Generate a responsive srcSet using Cloudinary widths
     const srcSet = [
          `${getOptimizedCloudinaryUrl(imageSrc, { width: 640, quality: "auto" })} 640w`,
          `${getOptimizedCloudinaryUrl(imageSrc, { width: 1024, quality: "auto" })} 1024w`,
          `${getOptimizedCloudinaryUrl(imageSrc, { width: 1920, quality: "auto" })} 1920w`,
          `${getOptimizedCloudinaryUrl(imageSrc, { width: 2560, quality: "auto" })} 2560w`
     ].join(", ");

     const defaultSrc = getOptimizedCloudinaryUrl(imageSrc, { width: 1920, quality: "auto" });

     return (
          <img
               src={defaultSrc}
               srcSet={srcSet}
               sizes={sizes}
               alt={alt}
               className={`${className}`}
               loading={priority ? "eager" : "lazy"}
               style={{ objectFit }}
          />
     );
}
