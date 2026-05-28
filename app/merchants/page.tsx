import Link from 'next/link';

export default function MerchantsPage() {
  return (
    <section id="merchants" className="section-gap page-shell">
      <div className="container">
        <div className="section-label">For Merchants</div>
        <h1 className="section-title">More Covers. More Repeat Business.<br /><em>Zero Extra Work.</em></h1>
        <p className="section-intro">PASSPRIVÉ gives dining and retail merchants a complete digital toolkit — without hiring a
          developer or changing how you run your business.</p>

        <div className="merchant-features">
          <div className="feature-showcase feature-left">
            <div className="feature-visual dining-vis">
              <div className="booking-widget">
                <div className="widget-header"><i className="fas fa-calendar-check" /> Table Booking</div>
                <div className="widget-restaurant">Le Chamarel Restaurant</div>
                <div className="widget-details">
                  <span>📅 Saturday, 15 Feb</span>
                  <span>🕖 7:30 PM</span>
                  <span>👥 2 Guests</span>
                </div>
                <div className="widget-tables">
                  <div className="table-slot available">T1</div>
                  <div className="table-slot available">T2</div>
                  <div className="table-slot booked">T3</div>
                  <div className="table-slot available">T4</div>
                  <div className="table-slot booked">T5</div>
                  <div className="table-slot available">T6</div>
                </div>
                <button className="widget-btn">Confirm Booking</button>
                <div className="widget-footer">✅ Instant confirmation · No call needed</div>
              </div>
            </div>
            <div className="feature-text">
              <div className="feature-tag">🗓️ Table Booking</div>
              <h3>Fill Every Table,<br />Every Night</h3>
              <p>Guests book directly through PASSPRIVÉ — no phone calls, no double bookings, no no-shows left untracked. You get a real-time dashboard showing covers booked, peak times and cancellations.</p>
              <ul className="feature-list">
                <li><i className="fas fa-check-circle" /> Real-time table availability management</li>
                <li><i className="fas fa-check-circle" /> Instant booking confirmation for guests</li>
                <li><i className="fas fa-check-circle" /> Off-peak slot promotions to fill quiet hours</li>
                <li><i className="fas fa-check-circle" /> Automated reminders to reduce no-shows</li>
                <li><i className="fas fa-check-circle" /> Full booking history and analytics</li>
              </ul>
            </div>
          </div>

          <div className="feature-showcase feature-right">
            <div className="feature-text">
              <div className="feature-tag">📱 QR Code Menus</div>
              <h3>Your Menu,<br />Always Up to Date</h3>
              <p>Replace printed menus with a beautiful, dynamic digital menu accessed by scanning a QR code on the table. Update prices, add specials and remove sold-out items in seconds — from your phone.</p>
              <ul className="feature-list">
                <li><i className="fas fa-check-circle" /> Stunning digital menus with photos</li>
                <li><i className="fas fa-check-circle" /> Update items in real time — no reprinting</li>
                <li><i className="fas fa-check-circle" /> Multi-language support</li>
                <li><i className="fas fa-check-circle" /> Allergen and dietary tags built in</li>
                <li><i className="fas fa-check-circle" /> Track what dishes customers browse most</li>
              </ul>
            </div>
            <div className="feature-visual qr-vis">
              <div className="qr-mockup">
                <div className="qr-header">
                  <div className="qr-logo">Café Lux</div>
                  <div className="qr-sub">Scan to view our menu</div>
                </div>
                <div className="qr-code-placeholder">
                  <div className="qr-grid">
                    <div className="qr-block dark"></div><div className="qr-block"></div><div className="qr-block dark"></div><div className="qr-block dark"></div>
                    <div className="qr-block"></div><div className="qr-block dark"></div><div className="qr-block"></div><div className="qr-block dark"></div>
                    <div className="qr-block dark"></div><div className="qr-block dark"></div><div className="qr-block"></div><div className="qr-block"></div>
                    <div className="qr-block dark"></div><div className="qr-block"></div><div className="qr-block dark"></div><div className="qr-block dark"></div>
                  </div>
                </div>
                <div className="qr-menu-preview">
                  <div className="menu-item-row"><span>🥗 Caesar Salad</span><span className="menu-price">MUR 380</span></div>
                  <div className="menu-item-row"><span>🍝 Pasta Pesto</span><span className="menu-price">MUR 450</span></div>
                  <div className="menu-item-row"><span className="new-badge">NEW</span><span>🐟 Fish Curry</span><span className="menu-price">MUR 520</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="feature-showcase feature-left">
            <div className="feature-visual oc-vis">
              <div className="oc-mockup">
                <div className="oc-header">
                  <div className="oc-title">Order &amp; Collect</div>
                  <div className="oc-sub">Pizzeria Roma • Ready in 15 min</div>
                </div>
                <div className="oc-cart">
                  <div className="oc-item">
                    <span>🍕 Margherita</span>
                    <div className="oc-qty"><button>−</button><span>2</span><button>+</button></div>
                    <span>MUR 680</span>
                  </div>
                  <div className="oc-item">
                    <span>🥤 Fresh Juice</span>
                    <div className="oc-qty"><button>−</button><span>2</span><button>+</button></div>
                    <span>MUR 160</span>
                  </div>
                </div>
                <div className="oc-total">
                  <span>Total</span>
                  <span className="oc-amount">MUR 840</span>
                </div>
                <div className="oc-status">
                  <div className="status-step done"><i className="fas fa-check" /> Order Placed</div>
                  <div className="status-step done"><i className="fas fa-check" /> Preparing</div>
                  <div className="status-step active"><i className="fas fa-clock" /> Ready Soon</div>
                </div>
                <button className="widget-btn">Pay &amp; Collect</button>
              </div>
            </div>
            <div className="feature-text">
              <div className="feature-tag">🛵 Order &amp; Collect Website</div>
              <h3>Your Own Online<br />Ordering System</h3>
              <p>Give your restaurant a professional order-ahead and collect website — branded to your restaurant, ready to take orders and payments in minutes. No third-party commission. Your brand, your revenue.</p>
              <ul className="feature-list">
                <li><i className="fas fa-check-circle" /> Branded ordering website, ready in 48 hours</li>
                <li><i className="fas fa-check-circle" /> No commission to Uber Eats or third parties</li>
                <li><i className="fas fa-check-circle" /> Integrated payments and order management</li>
                <li><i className="fas fa-check-circle" /> Pre-order for lunch rush — reduce wait times</li>
                <li><i className="fas fa-check-circle" /> Order history and customer re-targeting</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="merchant-extras">
          <h3 className="extras-title">Everything Else Merchants Get</h3>
          <div className="extras-grid">
            <div className="extra-card"><div className="extra-icon">🎯</div><h4>Targeted Promotions</h4><p>Push deals to members near you, or to specific membership tiers. Run flash offers to fill off-peak hours in minutes.</p></div>
            <div className="extra-card"><div className="extra-icon">⭐</div><h4>Loyalty &amp; Rewards</h4><p>Build a loyal following with points, stamps and cashback — all managed automatically inside PASSPRIVÉ.</p></div>
            <div className="extra-card"><div className="extra-icon">📊</div><h4>Smart Analytics</h4><p>Know exactly who your best customers are, when they visit, what they spend, and how to bring them back more often.</p></div>
            <div className="extra-card"><div className="extra-icon">📢</div><h4>Free Marketing</h4><p>Your restaurant or store is featured to thousands of active PASSPRIVÉ members — at no extra advertising cost.</p></div>
            <div className="extra-card"><div className="extra-icon">💬</div><h4>Direct Messaging</h4><p>Send offers and updates straight to your customers' phones. No algorithm. No boosting fees. Direct.</p></div>
            <div className="extra-card"><div className="extra-icon">🔗</div><h4>Zero Tech Headache</h4><p>We set everything up for you. No IT team required. Full onboarding support included in every partnership.</p></div>
            <div className="extra-card extra-card-highlight"><div className="extra-icon">🌐</div><h4>Custom Website, Built for You</h4><p>Need a full business website? PASSPRIVÉ Platforms designs and builds beautiful, fast, mobile-ready websites for merchants — branded, SEO-ready, and connected to your PASSPRIVÉ profile from day one.</p><div className="extra-tag">New Service</div></div>
          </div>
        </div>

        <div className="merchant-cta-bar">
          <div className="mcta-text">
            <strong>Ready to fill your tables and grow your business?</strong>
            <p>Join 200+ merchants already on PASSPRIVÉ</p>
          </div>
          <a href="#contact" className="btn btn-primary">Become a Merchant Partner</a>
        </div>
      </div>
    </section>
  );
}