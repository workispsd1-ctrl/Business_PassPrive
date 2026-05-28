'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const logoSrc = '/images/Logo.png';

const navItems = [
  { href: '/about', label: 'About The Team' },
  { href: '/mission', label: 'Vision & Mission' },
  { href: '/consumers', label: 'Consumers' },
  { href: '/merchants', label: 'Merchants' },
  { href: '/corporates', label: 'Corporates' },
  { href: '/banks', label: 'Banks/Financial Institutions' },
  { href: '/platforms', label: 'Platforms' },
  { href: '/contact', label: 'Partner With Us', cta: true },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav id="navbar">
      <div className="nav-inner">
        <Link href="/" className="logo" aria-label="PassPrivé home">
          <Image src={logoSrc} alt="PASSPRIVÉ logo" className="logo-mark" width={50} height={50} priority />
          <span className="logo-text">PASSPRIVÉ</span>
        </Link>

        <ul className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`} id="mainNav">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={item.cta ? 'nav-cta' : ''}
                aria-current={pathname === item.href ? 'page' : undefined}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

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