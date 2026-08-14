'use client';

import { useCallback, useEffect, useState } from 'react';
import { LoginPopup, openLoginPopup } from '@/components/LoginPopup';
import { RestaurantOnboardingForm } from '@/components/RestaurantOnboardingForm';
import { supabaseBrowser } from '@/lib/supabaseBrowser';
import { verifyAdminSession, type AdminUser } from '@/app/actions/auth';

type Status = 'checking' | 'signedOut' | 'signedIn';

export function OnboardingClient() {
  const [status, setStatus] = useState<Status>('checking');
  const [admin, setAdmin] = useState<AdminUser | null>(null);

  // On load, reuse an existing Supabase session if it belongs to an admin —
  // otherwise fall through to the login popup.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data } = await supabaseBrowser.auth.getSession();
      const token = data.session?.access_token;

      if (!token) {
        if (!cancelled) setStatus('signedOut');
        return;
      }

      const result = await verifyAdminSession(token);
      if (cancelled) return;

      if (result.status === 200) {
        setAdmin(result.user);
        setStatus('signedIn');
      } else {
        await supabaseBrowser.auth.signOut();
        setStatus('signedOut');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSuccess = useCallback((user: AdminUser) => {
    setAdmin(user);
    setStatus('signedIn');
  }, []);

  async function handleSignOut() {
    await supabaseBrowser.auth.signOut();
    setAdmin(null);
    setStatus('signedOut');
    openLoginPopup();
  }

  if (status === 'checking') {
    return (
      <div className="onboarding-prompt">
        <p className="onboarding-intro">Checking your session…</p>
      </div>
    );
  }

  if (status === 'signedIn' && admin) {
    const firstName = admin.fullName.trim().split(/\s+/)[0];

    return (
      <div className="onboarding-panel">
        <div className="onboarding-bar">
          <div className="onboarding-bar-user">
            <div className="onboarding-avatar" aria-hidden="true">
              {firstName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="onboarding-hello">
                Welcome, <strong>{firstName}</strong>
              </p>
              <p className="onboarding-meta">
                {admin.email} · {admin.role === 'superadmin' ? 'Super Admin' : 'Admin'}
              </p>
            </div>
          </div>
          <button type="button" className="btn btn-secondary btn-sm" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>

        <RestaurantOnboardingForm adminName={firstName} />
      </div>
    );
  }

  return (
    <>
      <div className="onboarding-prompt">
        <h1 className="onboarding-title">
          Partner <em>Onboarding.</em>
        </h1>
        <p className="onboarding-intro">
          Admin sign-in required to add restaurant details on PASSPRIVÉ.
        </p>
        <button type="button" className="btn btn-primary" onClick={openLoginPopup}>
          Sign In →
        </button>
      </div>
      {/* The login modal pops open as soon as an unauthenticated visitor lands here. */}
      <LoginPopup openOnMount onSuccess={handleSuccess} />
    </>
  );
}
