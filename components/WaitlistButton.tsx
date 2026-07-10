'use client';

import { openLaunchPopup } from '@/components/LaunchPopup';

export function WaitlistButton() {
  return (
    <div className="waitlist-cta">
      <button type="button" className="btn btn-gold waitlist-btn" onClick={openLaunchPopup}>
        ✨ Join Early Waitlist
      </button>
      <span className="waitlist-note">Special benefits for early members</span>
    </div>
  );
}
