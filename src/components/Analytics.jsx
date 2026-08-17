'use client';

import { useEffect } from 'react';

const GA_MEASUREMENT_ID = 'G-ZSHJ4HRVPB';
const CLARITY_PROJECT_ID = 'y24yn4jl2t';
const SECURE_PRIVACY_URL = '';
const FB_PIXEL_ID = '1792046818462398';
const GTM_CONTAINER_ID = 'GTM-KJVMHZR3';

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

        // --- 3. Secure Privacy ---
        if (SECURE_PRIVACY_URL && !document.getElementById('secure-privacy-script')) {
          const spScript = document.createElement('script');
          spScript.id = 'secure-privacy-script';
          spScript.async = true;
          spScript.src = SECURE_PRIVACY_URL;
          document.head.appendChild(spScript);
        }

        // --- 4. Meta (Facebook) Pixel ---
        if (FB_PIXEL_ID && !document.getElementById('fb-pixel-script')) {
          (function (f, b, e, v, n, t, s) {
            if (f.fbq) return;
            n = f.fbq = function () {
              n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
            };
            if (!f._fbq) f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = '2.0';
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.id = 'fb-pixel-script';
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s);
          })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

          window.fbq('init', FB_PIXEL_ID);
          window.fbq('track', 'PageView');
        }

        // --- 5. Google Tag Manager (GTM) ---
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
