'use client';

import { useEffect, useRef, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabaseBrowser';
import { verifyAdminSession, type AdminUser } from '@/app/actions/auth';

// Fire this event on `window` to open the login popup from anywhere.
export const OPEN_LOGIN_EVENT = 'passprive:open-login';

export function openLoginPopup() {
  window.dispatchEvent(new Event(OPEN_LOGIN_EVENT));
}

function isValidEmail(raw: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw.trim());
}

type Props = {
  /** Open the modal as soon as it mounts (used by the onboarding page). */
  openOnMount?: boolean;
  /** Called once an admin has signed in and been verified server-side. */
  onSuccess?: (admin: AdminUser) => void;
};

export function LoginPopup({ openOnMount = false, onSuccess }: Props) {
  const [open, setOpen] = useState(openOnMount);
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [formError, setFormError] = useState('');
  const [notice, setNotice] = useState('');
  const [mode, setMode] = useState<'signIn' | 'forgotPassword'>('signIn');
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Allow any other component to open this popup on demand.
  useEffect(() => {
    const openOnDemand = () => {
      setFormError('');
      setNotice('');
      setMode('signIn');
      setOpen(true);
    };
    window.addEventListener(OPEN_LOGIN_EVENT, openOnDemand);
    return () => window.removeEventListener(OPEN_LOGIN_EVENT, openOnDemand);
  }, []);

  // Lock body scroll while open, allow Esc to close, and focus the email field.
  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    emailRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError('');

    const badEmail = !isValidEmail(email);
    const badPassword = password.length < 8;
    setEmailError(badEmail);
    setPasswordError(badPassword);

    if (badEmail) {
      emailRef.current?.focus();
      return;
    }
    if (badPassword) {
      passwordRef.current?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const { data, error } = await supabaseBrowser.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error || !data.session) {
        setFormError(error?.message || 'Incorrect email or password.');
        return;
      }

      // Confirm the account is an admin before letting them in. Anyone else
      // (customers, merchants) gets signed straight back out.
      const result = await verifyAdminSession(data.session.access_token);
      if (result.status !== 200) {
        await supabaseBrowser.auth.signOut();
        setFormError(result.error);
        return;
      }

      setPassword('');
      setOpen(false);
      onSuccess?.(result.user);
    } catch (error) {
      console.error('Login failed:', error);
      setFormError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleForgotPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError('');
    setNotice('');

    if (!isValidEmail(email)) {
      setEmailError(true);
      emailRef.current?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabaseBrowser.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/onboarding`,
      });
      if (error) {
        setFormError(error.message);
        return;
      }
      setNotice(`Reset link sent to ${email.trim()}. Please check your inbox.`);
    } catch (error) {
      console.error('Password reset failed:', error);
      setFormError('Could not send reset instructions. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return null;
  }

  const forgot = mode === 'forgotPassword';

  return (
    <div className="launch-overlay" role="dialog" aria-modal="true" aria-labelledby="loginTitle">
      <div className="launch-modal login-modal">
        <button
          type="button"
          className="launch-close"
          aria-label="Close"
          onClick={() => setOpen(false)}
        >
          <i className="fas fa-xmark" />
        </button>

        <div className="launch-badge">
          <span className="launch-dot" /> Admin Access
        </div>

        {forgot ? (
          <>
            <h2 id="loginTitle" className="launch-title">
              Forgot Your<br />
              <em>Password?</em>
            </h2>
            <p className="launch-intro">
              Enter your admin email and we&apos;ll send you a link to reset your password.
            </p>
          </>
        ) : (
          <>
            <h2 id="loginTitle" className="launch-title">
              Welcome Back to<br />
              <em>PASSPRIVÉ.</em>
            </h2>
            <p className="launch-intro">
              Admin sign-in. Use your email and password to manage restaurant details.
            </p>
          </>
        )}

        <form
          className="launch-form"
          onSubmit={forgot ? handleForgotPassword : handleSignIn}
          noValidate
        >
          <div className="form-group">
            <label htmlFor="loginEmail">Email</label>
            <input
              id="loginEmail"
              ref={emailRef}
              type="email"
              name="email"
              autoComplete="email"
              className={emailError ? 'input-error' : ''}
              placeholder="admin@passprive.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (emailError) {
                  setEmailError(!isValidEmail(event.target.value));
                }
              }}
              onBlur={(event) =>
                setEmailError(event.target.value.trim() !== '' && !isValidEmail(event.target.value))
              }
              aria-invalid={emailError}
              required
            />
            {emailError && <span className="input-error-text">Please enter a valid email address.</span>}
          </div>

          {!forgot && (
            <div className="form-group">
              <label htmlFor="loginPassword">Password</label>
              <div className="login-password">
                <input
                  id="loginPassword"
                  ref={passwordRef}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  className={passwordError ? 'input-error' : ''}
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    if (passwordError) {
                      setPasswordError(event.target.value.length < 8);
                    }
                  }}
                  aria-invalid={passwordError}
                  required
                />
                <button
                  type="button"
                  className="login-password-toggle"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                  onClick={() => setShowPassword((value) => !value)}
                >
                  <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'} />
                </button>
              </div>
              {passwordError && (
                <span className="input-error-text">Password must be at least 8 characters.</span>
              )}
            </div>
          )}

          <div className="login-row">
            <label className="login-remember">
              <input type="checkbox" name="remember" defaultChecked /> Keep me signed in
            </label>
            <button
              type="button"
              className="login-link login-link-btn"
              onClick={() => {
                setMode(forgot ? 'signIn' : 'forgotPassword');
                setFormError('');
                setNotice('');
              }}
            >
              {forgot ? 'Back to sign in' : 'Forgot password?'}
            </button>
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={submitting}>
            {forgot
              ? submitting
                ? 'Sending link…'
                : 'Send Reset Link →'
              : submitting
                ? 'Signing you in…'
                : 'Sign In →'}
          </button>

          {formError && (
            <div className="form-success form-error launch-msg">
              <i className="fas fa-circle-exclamation" /> {formError}
            </div>
          )}
          {notice && (
            <div className="form-success launch-msg">
              <i className="fas fa-circle-check" /> {notice}
            </div>
          )}

          <p className="launch-fineprint">
            Admin accounts only. Need access?{' '}
            <a className="login-link" href="/contact">
              Contact the PASSPRIVÉ team
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
