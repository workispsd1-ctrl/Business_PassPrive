'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const logoSrc = '/images/Logo.png';

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

// Routes that use the light page design get the light header.
const lightRoutes = new Set(['/', '/about']);

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav id="navbar" className={lightRoutes.has(pathname) ? 'nav-light' : undefined}>
      <div className="nav-inner">
        <Link href="/" className="logo" aria-label="PassPrivé home">
          <Image src={logoSrc} alt="PASSPRIVÉ" className="logo-mark" width={2400} height={800} priority />
        </Link>

        <ul className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`} id="mainNav">
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
          <li className="nav-cta-mobile">
            <Link href={ctaItem.href} className="nav-cta" onClick={() => setMobileOpen(false)}>
              {ctaItem.label}
            </Link>
          </li>
        </ul>

        <Link
          href={ctaItem.href}
          className="nav-cta nav-cta-desktop"
          aria-current={pathname === ctaItem.href ? 'page' : undefined}
        >
          {ctaItem.label}
        </Link>

        <button
          type="button"
          className={`hamburger ${mobileOpen ? 'open' : ''}`}
          aria-label="Menu"
          aria-expanded={mobileOpen}
          aria-controls="mainNav"
          onClick={() => setMobileOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}