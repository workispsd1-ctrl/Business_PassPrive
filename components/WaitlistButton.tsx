'use client';

import { openLaunchPopup } from '@/components/LaunchPopup';

export function WaitlistButton() {
  return (
    <div className="waitlist-cta">
      <button type="button" className="waitlist-btn" onClick={openLaunchPopup}>
        Join Early Waitlist
        <i className="fas fa-circle-arrow-right" aria-hidden="true" />
      </button>
      <span className="waitlist-note">
        <span aria-hidden="true">⭐</span> Special benefits <em>early members</em>
      </span>
    </div>
  );
}
