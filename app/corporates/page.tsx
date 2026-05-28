import Link from 'next/link';

export default function CorporatesPage() {
  return (
    <section id="corporates" className="section-gap section-warm page-shell">
      <div className="container">
        <div className="section-label">For Corporates</div>
        <h1 className="section-title">The Employee Benefit<br /><em>Your Team Actually Wants</em></h1>
        <p className="section-intro">Stop giving vouchers that expire in a drawer. Give your team access to Mauritius' best lifestyle experiences — and watch engagement soar.</p>

        <div className="corp-layout">
          <div className="corp-cards">
            <div className="corp-card">
              <div className="corp-card-icon">🎁</div>
              <h3>Staff Benefits &amp; Perks</h3>
              <p>Give every employee a PASSPRIVÉ membership loaded with curated dining, retail, hotel and experience deals — a benefit they'll actually use and talk about.</p>
              <div className="corp-tags"><span>🍽️ Dining privileges</span><span>🛍️ Shopping discounts</span><span>🏨 Hotel rates</span><span>🎭 Experiences</span></div>
            </div>
            <div className="corp-card">
              <div className="corp-card-icon">🏆</div>
              <h3>Customer Loyalty Rewards</h3>
              <p>Reward your top customers with PASSPRIVÉ memberships. High perceived value, zero admin burden. A gift that drives retention and word-of-mouth.</p>
              <div className="corp-tags"><span>💎 Premium gifting</span><span>🔄 Recurring value</span><span>📈 Drives retention</span></div>
            </div>
            <div className="corp-card">
              <div className="corp-card-icon">📋</div>
              <h3>Simple Corporate Dashboard</h3>
              <p>Manage memberships for your entire team from one admin panel. Allocate budgets, track usage and report on ROI — in minutes, not days.</p>
              <div className="corp-tags"><span>📊 Usage reporting</span><span>💼 Budget control</span><span>👥 Team management</span></div>
            </div>
            <div className="corp-card">
              <div className="corp-card-icon">🤝</div>
              <h3>White-Label Options</h3>
              <p>Want your own branded lifestyle app? We can white-label PASSPRIVÉ under your corporate identity — your colors, your logo, powered by our platform.</p>
              <div className="corp-tags"><span>🎨 Custom branding</span><span>🔒 Exclusive deals</span><span>⚡ Fast to launch</span></div>
            </div>
          </div>

          <div className="corp-why">
            <div className="corp-why-title">Why It Works for HR &amp; Marketing Teams</div>
            <div className="corp-benefit"><div className="cb-num">01</div><div className="cb-content"><h4>High Perceived Value, Low Cost</h4><p>A PASSPRIVÉ membership feels like a premium gift — but costs a fraction of traditional benefit programs. Members see real MUR savings every week.</p></div></div>
            <div className="corp-benefit"><div className="cb-num">02</div><div className="cb-content"><h4>Zero Administration Burden</h4><p>No voucher books to manage. No expiry dates to track. No vendor negotiations to run. Just add your team, set a budget, and we handle the rest.</p></div></div>
            <div className="corp-benefit"><div className="cb-num">03</div><div className="cb-content"><h4>Measurable ROI</h4><p>Track exactly how much your team is saving and using their benefits. Prove the value of your program with real data — at every board review.</p></div></div>
            <div className="corp-benefit"><div className="cb-num">04</div><div className="cb-content"><h4>Improves Staff Retention</h4><p>Employees who feel valued stay longer. Lifestyle perks rank among the top reasons Mauritians choose one employer over another.</p></div></div>

            <div className="corp-cta">
              <a href="#contact" className="btn btn-primary">Get a Corporate Quote</a>
            </div>
          </div>
        </div>

        <div className="corp-tiers">
          <div className="tiers-title">Corporate Membership Tiers</div>
          <div className="tiers-grid">
            <div className="tier-card">
              <div className="tier-name">Silver</div>
              <div className="tier-size">5–25 employees</div>
              <ul>
                <li><i className="fas fa-check" /> Access to 100+ merchant deals</li>
                <li><i className="fas fa-check" /> Digital membership cards</li>
                <li><i className="fas fa-check" /> Monthly usage report</li>
              </ul>
            </div>
            <div className="tier-card tier-gold">
              <div className="tier-popular">Most Popular</div>
              <div className="tier-name">Gold</div>
              <div className="tier-size">26–100 employees</div>
              <ul>
                <li><i className="fas fa-check" /> Access to 200+ exclusive deals</li>
                <li><i className="fas fa-check" /> Table booking privileges</li>
                <li><i className="fas fa-check" /> Corporate dashboard</li>
                <li><i className="fas fa-check" /> Priority customer service</li>
                <li><i className="fas fa-check" /> Custom onboarding session</li>
              </ul>
            </div>
            <div className="tier-card tier-platinum">
              <div className="tier-name">Platinum</div>
              <div className="tier-size">100+ employees</div>
              <ul>
                <li><i className="fas fa-check" /> Full exclusive deals portfolio</li>
                <li><i className="fas fa-check" /> White-label option available</li>
                <li><i className="fas fa-check" /> Dedicated account manager</li>
                <li><i className="fas fa-check" /> Custom branded benefits</li>
                <li><i className="fas fa-check" /> Quarterly business review</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="page-actions">
          <Link href="/contact" className="btn btn-primary">Get a Corporate Quote</Link>
          <Link href="/banks" className="btn btn-secondary">See Bank Partnerships</Link>
        </div>
      </div>
    </section>
  );
}