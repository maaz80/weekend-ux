'use client';

import { useEffect } from 'react';
import { GOOGLE_ADS_ID, gtag_report_conversion } from '@/utils/googleAds';
import { trackMetaEvent } from '@/utils/metaCapi';

const GA_MEASUREMENT_ID = 'G-ZSHJ4HRVPB';
const CLARITY_PROJECT_ID = 'y24yn4jl2t';
const SECURE_PRIVACY_URL = '';
const FB_PIXEL_ID = '1792046818462398';
const GTM_CONTAINER_ID = 'GTM-KJVMHZR3';

export default function Analytics() {
  useEffect(() => {
    // Attach gtag_report_conversion globally to window immediately on mount
    if (typeof window !== 'undefined') {
      window.gtag_report_conversion = gtag_report_conversion;
    }

    // --- 1. Immediate Google Tag (gtag.js) Injection for Google Ads & Analytics Tag Verification ---
    const tagId = GOOGLE_ADS_ID || GA_MEASUREMENT_ID;
    if (tagId && typeof document !== 'undefined' && !document.getElementById('gtag-script')) {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      gtag('js', new Date());
      if (GOOGLE_ADS_ID) gtag('config', GOOGLE_ADS_ID);
      if (GA_MEASUREMENT_ID) gtag('config', GA_MEASUREMENT_ID);

      const gaScript = document.createElement('script');
      gaScript.id = 'gtag-script';
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${tagId}`;
      document.head.appendChild(gaScript);
    }

    // --- 2. Lazy Load Secondary Third-Party Analytics (Clarity, Meta Pixel, GTM) ---
    let secondaryLoaded = false;
    let fallbackTimer = null;

    const injectSecondaryScripts = () => {
      if (secondaryLoaded) return;
      secondaryLoaded = true;

      if (fallbackTimer) clearTimeout(fallbackTimer);
      removeListeners();

      const executeSecondary = () => {
        // Microsoft Clarity
        if (CLARITY_PROJECT_ID && !document.getElementById('clarity-script')) {
          (function (c, l, a, r, i, t, y) {
            c[a] =
              c[a] ||
              function () {
                (c[a].q = c[a].q || []).push(arguments);
              };
            t = l.createElement(r);
            t.async = 1;
            t.id = 'clarity-script';
            t.src = 'https://www.clarity.ms/tag/' + i;
            y = l.getElementsByTagName(r)[0];
            y.parentNode.insertBefore(t, y);
          })(window, document, 'clarity', 'script', CLARITY_PROJECT_ID);
        }

        // Meta (Facebook) CAPI PageView (Pure Server-Side Tracking - No Heavy Client JS)
        trackMetaEvent('PageView');

        // Google Tag Manager (GTM)
        if (GTM_CONTAINER_ID && !document.getElementById('gtm-container-script')) {
          (function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
            var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s),
              dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.id = 'gtm-container-script';
            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
          })(window, document, 'script', 'dataLayer', GTM_CONTAINER_ID);
        }
      };

      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(executeSecondary, { timeout: 2000 });
      } else {
        setTimeout(executeSecondary, 500);
      }
    };

    const interactionEvents = ['scroll', 'touchstart', 'keydown', 'click', 'pointerdown'];

    const addListeners = () => {
      interactionEvents.forEach((event) => {
        window.addEventListener(event, injectSecondaryScripts, { passive: true, once: true });
      });
    };

    const removeListeners = () => {
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, injectSecondaryScripts);
      });
    };

    addListeners();

    // 4 seconds fallback for secondary scripts if no user interaction
    fallbackTimer = setTimeout(injectSecondaryScripts, 4000);

    return () => {
      if (fallbackTimer) clearTimeout(fallbackTimer);
      removeListeners();
    };
  }, []);

  return null;
}
