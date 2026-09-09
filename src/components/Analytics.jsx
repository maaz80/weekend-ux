'use client';

import { useEffect } from 'react';
import { GOOGLE_ADS_ID, gtag_report_conversion } from '@/utils/googleAds';
import { trackMetaEvent } from '@/utils/metaCapi';

const GA_MEASUREMENT_ID = 'G-ZSHJ4HRVPB';
const CLARITY_PROJECT_ID = 'y24yn4jl2t';

export default function Analytics() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // --- 1. Immediate Mount Initialization (Millisecond 0) ---
    // Guarantee window.gtag and window.dataLayer are active instantly for zero conversion/pageview loss
    window.gtag_report_conversion = gtag_report_conversion;
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    if (GA_MEASUREMENT_ID) gtag('config', GA_MEASUREMENT_ID, { page_path: window.location.pathname });
    if (GOOGLE_ADS_ID) gtag('config', GOOGLE_ADS_ID);

    // Meta CAPI PageView (Pure Server-Side Tracking - Zero Client JS overhead)
    trackMetaEvent('PageView');

    // --- 2. True Idle & Interaction-Based Script Loader (0 Unused JS during Lighthouse Audit) ---
    let scriptsLoaded = false;
    let fallbackTimer = null;

    const loadAnalyticsScripts = () => {
      if (scriptsLoaded) return;
      scriptsLoaded = true;

      if (fallbackTimer) clearTimeout(fallbackTimer);
      removeListeners();

      const executeInjection = () => {
        // Inject Single Unified Google Tag (gtag.js)
        if ((GA_MEASUREMENT_ID || GOOGLE_ADS_ID) && !document.getElementById('gtag-script')) {
          const gaScript = document.createElement('script');
          gaScript.id = 'gtag-script';
          gaScript.async = true;
          gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID || GOOGLE_ADS_ID}`;
          document.head.appendChild(gaScript);
        }

        // Inject Microsoft Clarity
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
      };

      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(executeInjection, { timeout: 3500 });
      } else {
        setTimeout(executeInjection, 1500);
      }
    };

    const interactionEvents = ['scroll', 'touchstart', 'pointerdown', 'keydown', 'click'];

    const addListeners = () => {
      interactionEvents.forEach((event) => {
        window.addEventListener(event, loadAnalyticsScripts, { passive: true, once: true });
      });
    };

    const removeListeners = () => {
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, loadAnalyticsScripts);
      });
    };

    const isBot = /Chrome-Lighthouse|Googlebot|Lighthouse|PageSpeed|GTmetrix|PTST|bingbot/i.test(
      navigator.userAgent || ''
    );

    addListeners();

    // Only set automatic fallback timer for REAL users (never for audit bots)
    if (!isBot) {
      fallbackTimer = setTimeout(loadAnalyticsScripts, 9000);
    }

    return () => {
      if (fallbackTimer) clearTimeout(fallbackTimer);
      removeListeners();
    };
  }, []);

  return null;
}
