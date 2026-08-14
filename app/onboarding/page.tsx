import type { Metadata } from 'next';
import { OnboardingClient } from '@/components/OnboardingClient';

export const metadata: Metadata = {
  title: 'Admin Onboarding — PASSPRIVÉ',
  description: 'Admin sign-in to add and manage restaurant details on PASSPRIVÉ.',
};

export default function OnboardingPage() {
  return (
    <section className="page-shell onboarding-shell">
      <OnboardingClient />
    </section>
  );
}
