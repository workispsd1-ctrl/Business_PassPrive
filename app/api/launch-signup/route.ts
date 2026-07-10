import { NextResponse } from 'next/server';

// Server-side URL of the Google Apps Script Web App (see components/launch-sheet.gs).
// Prefer a non-public var; fall back to the NEXT_PUBLIC one if that's all that's set.
const SHEET_ENDPOINT =
  process.env.LAUNCH_SHEET_URL ?? process.env.NEXT_PUBLIC_LAUNCH_SHEET_URL ?? '';

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ result: 'error', error: 'Invalid request body.' }, { status: 400 });
  }

  const name = String(body.name ?? '').trim();
  const phone = String(body.phone ?? '').trim();

  if (!name || !phone) {
    return NextResponse.json({ result: 'error', error: 'Name and phone are required.' }, { status: 400 });
  }

  if (!SHEET_ENDPOINT) {
    console.warn('LAUNCH_SHEET_URL is not set — submission was not saved.');
    // Don't block the user if the sheet isn't configured yet.
    return NextResponse.json({ result: 'success', saved: false });
  }

  try {
    // Server-to-server call: no CORS restriction, so we can read the JSON reply
    // (used to detect duplicates).
    const upstream = await fetch(SHEET_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      redirect: 'follow',
    });

    const text = await upstream.text();
    let data: Record<string, unknown> = {};
    try {
      data = JSON.parse(text);
    } catch {
      // Not JSON — Apps Script returned an HTML page (usually a sign-in / access
      // wall, or an execution error). Log it so we can see what went wrong.
      console.error(
        `Launch signup: sheet endpoint returned non-JSON (status ${upstream.status}). ` +
          `First 300 chars: ${text.slice(0, 300)}`
      );
      if (!upstream.ok || /<html|sign in|accounts\.google\.com|authorization/i.test(text)) {
        return NextResponse.json(
          { result: 'error', error: `Sheet endpoint returned status ${upstream.status}. Check the Apps Script deployment access ("Anyone").` },
          { status: 502 }
        );
      }
      data = { result: 'success' };
    }

    if (data.result === 'error') {
      console.error('Launch signup: Apps Script reported an error:', data.error);
      return NextResponse.json({ result: 'error', error: String(data.error ?? 'Apps Script error') }, { status: 502 });
    }

    return NextResponse.json({
      result: data.result === 'duplicate' ? 'duplicate' : 'success',
    });
  } catch (error) {
    console.error('Launch signup upstream failed:', error);
    return NextResponse.json({ result: 'error', error: 'Upstream request failed.' }, { status: 502 });
  }
}
