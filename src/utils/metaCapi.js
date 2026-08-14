/**
 * Utility to send Meta Pixel (client-side) and Meta Conversions API (server-side) events with deduplication.
 * @param {string} eventName - Standard Meta Event Name (e.g. 'Lead', 'PageView', 'Contact', 'Purchase')
 * @param {Object} userData - User details (e.g. { em: 'email@example.com', ph: '9876543210', fn: 'John' })
 * @param {Object} customData - Additional event metadata (e.g. { content_name: 'UI UX Course' })
 */
export async function trackMetaEvent(eventName = 'Lead', userData = {}, customData = {}) {
  if (typeof window === 'undefined') return;

  // Generate unique event_id for Meta deduplication between Pixel & CAPI
  const eventId =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `evt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  const eventSourceUrl = window.location.href;

  // 1. Client-Side Meta Pixel Tracking
  if (window.fbq) {
    try {
      window.fbq('track', eventName, customData, { eventID: eventId });
    } catch (pixelErr) {
      console.warn('Meta Pixel tracking error:', pixelErr);
    }
  }

  // 2. Server-Side Meta Conversions API (CAPI) Tracking
  try {
    const backendBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const capiEndpoint = backendBaseUrl ? `${backendBaseUrl}/api/meta-capi` : '/api/meta-capi';

    fetch(capiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_name: eventName,
        event_id: eventId,
        event_source_url: eventSourceUrl,
        user_data: userData,
        custom_data: customData,
      }),
    }).catch((err) => console.warn('Meta CAPI fetch background error:', err));
  } catch (err) {
    console.warn('Meta CAPI trigger error:', err);
  }
}
