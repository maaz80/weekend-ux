'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { GOOGLE_ADS_ID, gtag_report_conversion } from '@/utils/googleAds';
import { trackMetaEvent } from '@/utils/metaCapi';

const GA_MEASUREMENT_ID = 'G-ZSHJ4HRVPB';
const CLARITY_PROJECT_ID = 'y24yn4jl2t';

export default function Analytics() {
  useEffect(() => {
    // Attach gtag_report_conversion and global dataLayer / gtag helpers immediately on mount
    if (typeof window !== 'undefined') {
      window.gtag_report_conversion = gtag_report_conversion;
      window.dataLayer = window.dataLayer || [];
      if (typeof window.gtag !== 'function') {
        window.gtag = function () {
          window.dataLayer.push(arguments);
        };
      }
    }

    // Trigger Meta (Facebook) CAPI PageView (Pure Server-Side Tracking)
    trackMetaEvent('PageView');
  }, []);

  return (
    <>
      {/* --- 1. Single Unified Google Tag (gtag.js) for GA4 & Google Ads --- */}
      <Script
        id="gtag-base"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', { page_path: window.location.pathname });
            if ('${GOOGLE_ADS_ID}') {
              gtag('config', '${GOOGLE_ADS_ID}');
            }
          `,
        }}
      />

      {/* --- 2. Microsoft Clarity (Non-critical, Lazy-loaded for Heatmaps & Session Recording) --- */}
      {CLARITY_PROJECT_ID && (
        <Script
          id="clarity-init"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
            `,
          }}
        />
      )}
    </>
  );
}
