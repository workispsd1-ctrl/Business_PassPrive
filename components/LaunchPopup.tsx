'use client';

import { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'passprive_launch_popup_seen';

const audienceTypes = [
  { key: 'customer', label: "I'm a Customer", icon: '👤' },
  { key: 'merchant', label: "I'm a Merchant", icon: '🍽️' },
] as const;

type AudienceType = (typeof audienceTypes)[number]['key'];

// A valid phone has 7–15 digits (E.164 range), optionally prefixed with "+".
function isValidPhone(raw: string): boolean {
  const trimmed = raw.trim();
  if (!/^\+?[\d\s()-]+$/.test(trimmed)) {
    return false;
  }
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

type EndState = 'success' | 'duplicate';

export function LaunchPopup() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [endState, setEndState] = useState<EndState | null>(null);
  const [errorVisible, setErrorVisible] = useState(false);
  const [audience, setAudience] = useState<AudienceType>('customer');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
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

    // Validate the phone before sending; flag the field in red if it's off.
    if (!isValidPhone(phone)) {
      setPhoneError(true);
      formRef.current.querySelector<HTMLInputElement>('#launchPhone')?.focus();
      return;
    }
    setPhoneError(false);

    const data = new FormData(formRef.current);
    const payload = {
      name: (data.get('name') as string)?.trim() ?? '',
      phone: phone.trim(),
      email: (data.get('email') as string)?.trim() ?? '',
      type: audience === 'merchant' ? 'Merchant' : 'Customer',
      submitted_at: new Date().toLocaleString(),
      source: typeof window !== 'undefined' ? window.location.pathname : '',
    };

    setSubmitting(true);

    try {
      const response = await fetch('/api/launch-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => ({}))) as { result?: string };

      if (!response.ok || result.result === 'error') {
        throw new Error('Submission failed');
      }

      markSeen();
      setEndState(result.result === 'duplicate' ? 'duplicate' : 'success');
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

        {!endState ? (
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
              <div className="launch-toggle" role="group" aria-label="I am a">
                {audienceTypes.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    className={`launch-toggle-btn ${audience === option.key ? 'selected' : ''}`}
                    aria-pressed={audience === option.key}
                    onClick={() => setAudience(option.key)}
                  >
                    <span className="launch-toggle-icon">{option.icon}</span>
                    {option.label}
                  </button>
                ))}
              </div>

              <div className="form-group">
                <label htmlFor="launchName">Your Name</label>
                <input id="launchName" type="text" name="name" placeholder="Bruno Martins" required />
              </div>

              <div className="form-group">
                <label htmlFor="launchPhone">Phone Number</label>
                <input
                  id="launchPhone"
                  type="tel"
                  name="phone"
                  className={phoneError ? 'input-error' : ''}
                  placeholder="+230 5xxx xxxx"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                    if (phoneError) {
                      setPhoneError(!isValidPhone(event.target.value));
                    }
                  }}
                  onBlur={(event) => setPhoneError(event.target.value.trim() !== '' && !isValidPhone(event.target.value))}
                  aria-invalid={phoneError}
                  required
                />
                {phoneError && (
                  <span className="input-error-text">Please enter a valid phone number (7–15 digits).</span>
                )}
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
              <i className={endState === 'duplicate' ? 'fas fa-clock' : 'fas fa-check'} />
            </div>
            {endState === 'duplicate' ? (
              <>
                <h2 className="launch-title">You're Already In!</h2>
                <p className="launch-intro">
                  We already have your details — thank you! Sit tight; we'll get back to you the
                  moment PASSPRIVÉ launches with your exclusive founding-member deal.
                </p>
              </>
            ) : (
              <>
                <h2 className="launch-title">You're On The List!</h2>
                <p className="launch-intro">
                  Thank you — your spot is reserved. We'll reach out the moment PASSPRIVÉ launches
                  with your exclusive founding-member deal. Welcome to the privé.
                </p>
              </>
            )}
            <button type="button" className="btn btn-primary btn-full" onClick={close}>
              Explore in the meantime →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
