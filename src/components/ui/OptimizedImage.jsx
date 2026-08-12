"use client";

import React from "react";
import { getOptimizedCloudinaryUrl } from "@/utils/cloudinary";

export { getOptimizedCloudinaryUrl };

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
     objectFit = undefined,
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
                    style={objectFit ? { objectFit } : undefined}
                    fetchPriority={finalFetchPriority}
               />
          );
     }

     const isSmallImage = width && width <= 320;
     const srcsetWidths = isSmallImage
          ? [90, 120, 150, 180, 220, 260, 320]
          : [160, 240, 320, 380, 420, 480, 540, 600, 680, 768, 900, 1080, 1280];

     // Calculate aspect ratio if width & height are provided
     const aspectRatio = (width && height) ? height / width : null;
     const selectedCrop = crop || (objectFit === "contain" ? "fit" : "fill");

     const srcSet = srcsetWidths
          .map((w) => {
               const calculatedHeight = (aspectRatio && selectedCrop !== "fit" && selectedCrop !== "contain") ? Math.round(w * aspectRatio) : undefined;
               const transformUrl = getOptimizedCloudinaryUrl(imageSrc, {
                    width: w,
                    height: calculatedHeight,
                    quality: "auto:low",
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
          quality: "auto:low",
          format: "auto",
          crop: selectedCrop
     });

     const renderWidth = width || 420;
     const renderHeight = height || (defaultHeight ? defaultHeight : 245);
     const inlineStyle = {
          ...(objectFit ? { objectFit } : {}),
          aspectRatio: `${renderWidth} / ${renderHeight}`
     };

     return (
          <img
               src={defaultSrc}
               srcSet={srcSet}
               sizes={sizes}
               alt={alt}
               width={renderWidth}
               height={renderHeight}
               className={`${className}`}
               loading={loadingMode}
               decoding="async"
               style={inlineStyle}
               fetchPriority={finalFetchPriority}
          />
     );
}
