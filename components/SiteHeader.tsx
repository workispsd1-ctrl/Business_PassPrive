'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PPLogo } from '@/components/figma/PPLogo';

const navItems = [
  { href: '/about', label: 'About Us' },
  { href: '/mission', label: 'Vision & Mission' },
  { href: '/consumers', label: 'Consumers' },
  { href: '/merchants', label: 'Merchants' },
  { href: '/corporates', label: 'Corporates' },
  { href: '/banks', label: 'Institutions' },
  { href: '/platforms', label: 'Platforms' },
];

const ctaItem = { href: '/contact', label: 'Partner With Us' };

type HeaderVariant = 'home' | 'about' | 'mission';

// Header treatment per route (from the Figma frames). Every other page sits on the
// light peach hero band, so it uses the translucent "home" header.
const routeVariants: Record<string, HeaderVariant> = {
  '/about': 'about',
  '/mission': 'mission',
  '/onboarding': 'about',
};

/** Keeps --vw equal to the viewport width without the scrollbar, so the design unit is exact. */
function useViewportWidthVar() {
  useEffect(() => {
    const root = document.documentElement;
    const update = () => root.style.setProperty('--vw', `${root.clientWidth}px`);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  useViewportWidthVar();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const variant: HeaderVariant = routeVariants[pathname] ?? 'home';

  return (
    <header className={`pp pp-header pp-header--${variant}`}>
      <div className="pp-header__inner">
        <Link href="/" className="pp-header__logo" aria-label="Passprivé home">
          <PPLogo variant={variant === 'mission' ? 'light' : 'orange'} />
        </Link>

        <nav className={`pp-nav ${mobileOpen ? 'is-open' : ''}`} id="ppNav" aria-label="Main">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pp-nav__cta-mobile">
              <Link href={ctaItem.href} onClick={() => setMobileOpen(false)}>
                {ctaItem.label}
              </Link>
            </li>
          </ul>
        </nav>

        <Link href={ctaItem.href} className="pp-header__cta">
          {ctaItem.label}
        </Link>

        <button
          type="button"
          className={`pp-burger ${mobileOpen ? 'is-open' : ''}`}
          aria-label="Menu"
          aria-expanded={mobileOpen}
          aria-controls="ppNav"
          onClick={() => setMobileOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
