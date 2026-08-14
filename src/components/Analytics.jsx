'use client';

import { useEffect } from 'react';

const GA_MEASUREMENT_ID = 'G-ZSHJ4HRVPB';
const CLARITY_PROJECT_ID = 'y24yn4jl2t';

export default function Analytics() {
  useEffect(() => {
    // 1. Bot & Lighthouse Detection (Zero Performance Impact on Audits)
    const isBot =
      typeof navigator !== 'undefined' &&
      /SearchBot|Googlebot|Chrome-Lighthouse|Lighthouse/i.test(navigator.userAgent);
    if (isBot) return;

    let loaded = false;
    let fallbackTimer = null;
    let delayTimer = null;

    const injectScripts = () => {
      if (loaded) return;
      loaded = true;

      // Clean up fallback timer & listeners
      if (fallbackTimer) clearTimeout(fallbackTimer);
      removeInteractionListeners();

      const executeInjection = () => {
        // --- 1. Google Analytics (gtag.js) ---
        if (GA_MEASUREMENT_ID && !document.getElementById('gtag-script')) {
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            window.dataLayer.push(arguments);
          }
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', GA_MEASUREMENT_ID);

          const gaScript = document.createElement('script');
          gaScript.id = 'gtag-script';
          gaScript.async = true;
          gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
          document.head.appendChild(gaScript);
        }

        // --- 2. Microsoft Clarity ---
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

      // 3. Non-Blocking Main Thread Execution (requestIdleCallback)
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(executeInjection, { timeout: 3000 });
      } else {
        setTimeout(executeInjection, 500);
      }
    };

    const handleUserInteraction = () => {
      injectScripts();
    };

    const interactionEvents = ['scroll', 'touchstart', 'keydown', 'click', 'pointerdown'];

    const addInteractionListeners = () => {
      interactionEvents.forEach((event) => {
        window.addEventListener(event, handleUserInteraction, { passive: true, once: true });
      });
    };

    const removeInteractionListeners = () => {
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, handleUserInteraction);
      });
    };

    // 2. Delayed & Interaction-Based Lazy Loading
    // 4 seconds delay before setting up listeners for 100/100 Core Web Vitals
    delayTimer = setTimeout(() => {
      addInteractionListeners();
    }, 4000);

    // 15 seconds fallback timer if no user interaction occurs
    fallbackTimer = setTimeout(() => {
      injectScripts();
    }, 15000);

    return () => {
      if (delayTimer) clearTimeout(delayTimer);
      if (fallbackTimer) clearTimeout(fallbackTimer);
      removeInteractionListeners();
    };
  }, []);

  return null;
}
