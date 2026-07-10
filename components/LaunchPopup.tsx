'use client';

import { useEffect, useRef, useState } from 'react';

// Google Apps Script Web App URL that appends submissions to the Google Sheet.
// Set NEXT_PUBLIC_LAUNCH_SHEET_URL in your environment (see components/launch-sheet.gs for setup).
const SHEET_ENDPOINT = process.env.NEXT_PUBLIC_LAUNCH_SHEET_URL ?? '';

const STORAGE_KEY = 'passprive_launch_popup_seen';

export function LaunchPopup() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Show once per browser, shortly after first load.
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) {
        return;
      }
    } catch {
      // localStorage unavailable (private mode) — still show once for this session.
    }

    const timer = window.setTimeout(() => setOpen(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  // Lock body scroll while the popup is open, and allow Esc to close.
  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function markSeen() {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore — nothing more we can do
    }
  }

  function close() {
    markSeen();
    setOpen(false);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorVisible(false);

    if (!formRef.current) {
      return;
    }

    const data = new FormData(formRef.current);
    const payload = {
      name: (data.get('name') as string)?.trim() ?? '',
      phone: (data.get('phone') as string)?.trim() ?? '',
      email: (data.get('email') as string)?.trim() ?? '',
      submitted_at: new Date().toLocaleString(),
      source: typeof window !== 'undefined' ? window.location.pathname : '',
    };

    setSubmitting(true);

    try {
      if (SHEET_ENDPOINT) {
        // Apps Script Web Apps don't send CORS headers, so we fire the request
        // with no-cors and a text/plain body to avoid a preflight. We can't read
        // the response, but the row is written server-side.
        await fetch(SHEET_ENDPOINT, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
        });
      } else {
        console.warn('NEXT_PUBLIC_LAUNCH_SHEET_URL is not set — submission was not saved.');
      }

      markSeen();
      setSubmitted(true);
    } catch (error) {
      console.error('Launch signup failed:', error);
      setErrorVisible(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return null;
  }

  return (
    <div className="launch-overlay" role="dialog" aria-modal="true" aria-labelledby="launchTitle">
      <div className="launch-modal">
        <button type="button" className="launch-close" aria-label="Close" onClick={close}>
          <i className="fas fa-xmark" />
        </button>

        {!submitted ? (
          <>
            <div className="launch-badge">
              <span className="launch-dot" /> Launching Soon
            </div>
            <h2 id="launchTitle" className="launch-title">
              Be First Through<br />
              <em>The Doors.</em>
            </h2>
            <p className="launch-intro">
              PASSPRIVÉ is almost here. Join the founding list now and lock in an exclusive
              launch-day membership deal before we open to everyone.
            </p>

            <form className="launch-form" ref={formRef} onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="launchName">Your Name</label>
                <input id="launchName" type="text" name="name" placeholder="Bruno Martins" required />
              </div>

              <div className="form-group">
                <label htmlFor="launchPhone">Phone Number</label>
                <input id="launchPhone" type="tel" name="phone" placeholder="+230 5xxx xxxx" required />
              </div>

              <div className="form-group">
                <label htmlFor="launchEmail">Email <span className="launch-optional">(optional)</span></label>
                <input id="launchEmail" type="email" name="email" placeholder="hello@yourcompany.mu" />
              </div>

              <button type="submit" className="btn btn-primary btn-full" disabled={submitting}>
                {submitting ? 'Reserving your spot…' : 'Claim My Launch Deal →'}
              </button>

              <div className={`form-success form-error launch-msg ${errorVisible ? '' : 'hidden'}`}>
                <i className="fas fa-circle-exclamation" /> Something went wrong. Please try again.
              </div>

              <p className="launch-fineprint">
                No spam — just one message when we go live. You can opt out anytime.
              </p>
            </form>
          </>
        ) : (
          <div className="launch-thanks">
            <div className="launch-check">
              <i className="fas fa-check" />
            </div>
            <h2 className="launch-title">
              You're On The List!
            </h2>
            <p className="launch-intro">
              Thank you — your spot is reserved. We'll reach out the moment PASSPRIVÉ launches
              with your exclusive founding-member deal. Welcome to the privé.
            </p>
            <button type="button" className="btn btn-primary btn-full" onClick={close}>
              Explore in the meantime →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
