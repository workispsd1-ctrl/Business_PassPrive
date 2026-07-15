import Image from 'next/image';
import Link from 'next/link';

const logoSrc = '/images/Logo.png';

export function SiteFooter() {
  return (
    <footer id="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Image src={logoSrc} alt="PASSPRIVÉ" className="footer-logo" width={2400} height={800} />
            <p>Mauritius' Lifestyle Membership Platform.<br />Discover • Book • Pay • Repeat.</p>
            <div className="footer-contact">
              <div className="footer-contact-label">Call Us</div>
              <a className="footer-phone" href="tel:+23055008521">
                <span className="footer-phone-icon" aria-hidden="true">
                  <i className="fas fa-phone" />
                </span>
                <span className="footer-phone-number">+230 5500 8521</span>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="fl-col">
              <div className="fl-title">Platform</div>
              <Link href="/consumers">For Consumers</Link>
              <Link href="/merchants">For Merchants</Link>
              <Link href="/corporates">For Corporates</Link>
              <Link href="/banks">For Banks & Financial Institutions</Link>
            </div>
            <div className="fl-col">
              <div className="fl-title">Features</div>
              <Link href="/merchants">Table Booking</Link>
              <Link href="/merchants">QR Menus</Link>
              <Link href="/merchants">Order & Collect</Link>
              <Link href="/merchants">Loyalty & Points</Link>
            </div>
            <div className="fl-col">
              <div className="fl-title">Company</div>
              <Link href="/about">About The Team</Link>
              <Link href="/mission">Mission & Vision</Link>
              <Link href="/contact">Partner With Us</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 PASSPRIVÉ. All rights reserved. Confidential — For Partner Review.</p>
          <p className="footer-tagline">Made with ❤️ in Mauritius 🇲🇺</p>
        </div>
      </div>
    </footer>
  );
}