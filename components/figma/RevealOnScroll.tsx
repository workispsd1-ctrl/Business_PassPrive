'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/** Blocks on the themed pages that fade/slide in as they scroll into view. */
const REVEAL_SELECTOR = [
  '.section-label',
  '.section-title',
  '.section-intro',
  '.platforms-header',
  '.feature-showcase',
  '.extras-title',
  '.extra-card',
  '.corp-card',
  '.corp-why',
  '.tiers-title',
  '.tier-card',
  '.mtc-title',
  '.mtc-card',
  '.platform-card',
  '.cb-item',
  '.consumer-phone',
  '.bank-stat',
  '.bank-card',
  '.pm-title',
  '.pm-card',
  '.savings-math-banner',
  '.smb-step',
  '.cashback-rewards',
  '.merchant-cta-bar',
  '.bank-cta-bar',
  '.platforms-cta-bar',
  '.contact-layout',
  '.contact-option',
  '.contact-phone',
  '.page-actions',
]
  .map((selector) => `.ppt ${selector}`)
  .join(',');

/**
 * Adds a scroll-reveal to the themed pages. Classes are only added once JS runs, so content
 * is never hidden without it, and reduced-motion users get no animation.
 */
export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    if (!elements.length) return;

    const timers: number[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add('is-in');
          observer.unobserve(el);
          // Drop the stagger once revealed so hover transitions stay instant.
          timers.push(window.setTimeout(() => el.style.removeProperty('transition-delay'), 1400));
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );

    elements.forEach((el) => {
      const siblings = el.parentElement ? Array.from(el.parentElement.children) : [el];
      const index = siblings.indexOf(el);
      el.style.transitionDelay = `${(index % 4) * 90}ms`;
      el.classList.add('pp-reveal');
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [pathname]);

  return null;
}
