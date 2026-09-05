/**
 * Utility for Google Ads Conversion Tracking (AW-18407334859)
 * Supports both Click/Submit Conversions (gtag_report_conversion) & Page Load Conversions.
 */

export const GOOGLE_ADS_ID = 'AW-18407334859';
export const GOOGLE_ADS_CONVERSION_SEND_TO = 'AW-18407334859/tb_2CK2EiO4cEMvHpslE';

/**
 * Triggers Google Ads Click / Form Submit Conversion event (gtag_report_conversion)
 * Matches exact function signature specified in Google Ads snippet.
 * @param {string} [url] - Optional destination URL if clicking a link/button
 * @returns {boolean} Returns false to prevent default link action when used inline
 */
export function gtag_report_conversion(url) {
  if (typeof window === 'undefined') return false;

  const callback = function () {
    if (typeof url !== 'undefined' && url) {
      window.location = url;
    }
  };

  window.dataLayer = window.dataLayer || [];

  if (typeof window.gtag === 'function') {
    try {
      window.gtag('event', 'conversion', {
        'send_to': GOOGLE_ADS_CONVERSION_SEND_TO,
        'value': 1.0,
        'currency': 'INR',
        'event_callback': callback
      });
    } catch (err) {
      console.warn('Google Ads Conversion tracking error:', err);
      if (url) callback();
    }
  } else {
    // If gtag script has not finished loading (lazy-loaded), push conversion directly to dataLayer
    window.dataLayer.push({
      'event': 'conversion',
      'send_to': GOOGLE_ADS_CONVERSION_SEND_TO,
      'value': 1.0,
      'currency': 'INR',
      'event_callback': callback
    });
    // Safety timer for link redirection if gtag fails to fire callback
    if (url) {
      setTimeout(callback, 500);
    }
  }

  return false;
}

/**
 * Triggers Google Ads Page Load Conversion Event
 */
export function trackGoogleAdsPageLoadConversion() {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];

  if (typeof window.gtag === 'function') {
    try {
      window.gtag('event', 'conversion', {
        'send_to': GOOGLE_ADS_CONVERSION_SEND_TO,
        'value': 1.0,
        'currency': 'INR'
      });
    } catch (err) {
      console.warn('Google Ads Page Load Conversion error:', err);
    }
  } else {
    window.dataLayer.push({
      'event': 'conversion',
      'send_to': GOOGLE_ADS_CONVERSION_SEND_TO,
      'value': 1.0,
      'currency': 'INR'
    });
  }
}
