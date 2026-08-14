import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Hash data using SHA-256 as required by Meta CAPI specification
function hashData(value) {
  if (!value || typeof value !== 'string') return undefined;
  const trimmed = value.trim().toLowerCase();
  if (!trimmed) return undefined;
  if (/^[a-f0-9]{64}$/.test(trimmed)) return trimmed; // Already SHA256 hashed
  return crypto.createHash('sha256').update(trimmed).digest('hex');
}

function normalizePhone(phone) {
  if (!phone || typeof phone !== 'string') return undefined;
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly ? hashData(digitsOnly) : undefined;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { event_name, event_id, event_source_url, user_data = {}, custom_data } = body;

    const pixelId = process.env.META_PIXEL_ID || '1792046818462398';
    const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

    if (!accessToken || accessToken === 'YOUR_META_CAPI_ACCESS_TOKEN_HERE') {
      console.warn('Meta CAPI: META_CAPI_ACCESS_TOKEN is missing or not set in .env file.');
      return NextResponse.json(
        { success: false, message: 'META_CAPI_ACCESS_TOKEN missing in environment' },
        { status: 200 }
      );
    }

    // Extract client IP address & User Agent
    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      undefined;
    const userAgent = request.headers.get('user-agent') || undefined;

    // Hash user data server-side
    const processedUserData = {
      ...(clientIp && { client_ip_address: clientIp }),
      ...(userAgent && { client_user_agent: userAgent }),
      ...(user_data.em && { em: [hashData(user_data.em)] }),
      ...(user_data.ph && { ph: [normalizePhone(user_data.ph)] }),
      ...(user_data.fn && { fn: [hashData(user_data.fn)] }),
      ...(user_data.ln && { ln: [hashData(user_data.ln)] }),
    };

    const eventPayload = {
      data: [
        {
          event_name: event_name || 'Lead',
          event_time: Math.floor(Date.now() / 1000),
          event_id: event_id || `evt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          action_source: 'website',
          ...(event_source_url && { event_source_url }),
          user_data: processedUserData,
          ...(custom_data && { custom_data }),
        },
      ],
    };

    const response = await fetch(
      `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventPayload),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('Meta CAPI Error Response:', result);
      return NextResponse.json({ success: false, error: result }, { status: response.status });
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Meta CAPI Endpoint Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
