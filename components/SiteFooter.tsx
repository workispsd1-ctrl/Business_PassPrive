import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer id="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">PASSPRIVÉ</div>
            <p>Mauritius' Lifestyle Membership Platform.<br />Discover • Book • Pay • Repeat.</p>
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