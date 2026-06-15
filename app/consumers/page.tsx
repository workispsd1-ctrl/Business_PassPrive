import Link from 'next/link';

export default function ConsumersPage() {
  return (
    <section id="consumers" className="section-gap page-shell">
      <div className="container">
        <div className="section-label">For Consumers</div>
        <h1 className="section-title">One Membership.<br /><em>The Best of Mauritius.</em></h1>
        <p className="section-intro">Whether you're a local, an expat or a tourist — PASSPRIVÉ puts the finest dining,
          shopping and experiences at your fingertips, with real savings every time.</p>

        <div className="consumer-layout">
          <div className="consumer-app">
            <div className="consumer-phone">
              <div className="c-screen">
                <div className="c-topbar">
                  <span>PASSPRIVÉ</span>
                  <div className="c-gold-badge">Premium</div>
                </div>
                <div className="c-explore">
                  <div className="c-explore-title">Explore Near You</div>
                  <div className="c-category-row">
                    <div className="c-cat active">🍽️ Dining</div>
                    <div className="c-cat">🛍️ Retail</div>
                    <div className="c-cat">🏨 Hotels</div>
                    <div className="c-cat">🎭 Expat.</div>
                  </div>
                </div>
                <div className="c-deals">
                  <div className="c-deal-card">
                    <div className="c-deal-top">
                      <div className="c-deal-name">The Riverside Bistro</div>
                      <div className="c-deal-badge">20% OFF</div>
                    </div>
                    <div className="c-deal-meta">🌿 Grand Baie · ⭐ 4.8 · 0.3 km</div>
                    <div className="c-book-btn">Book Table →</div>
                  </div>
                  <div className="c-deal-card">
                    <div className="c-deal-top">
                      <div className="c-deal-name">Kaz Kazini Boutique</div>
                      <div className="c-deal-badge">15% OFF</div>
                    </div>
                    <div className="c-deal-meta">🛍️ Caudan · ⭐ 4.6 · 1.1 km</div>
                    <div className="c-book-btn">View Deal →</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="consumer-benefits">
            <div className="cb-item">
              <div className="cb-icon">🗺️</div>
              <div className="cb-content">
                <h4>Discover the Best of Mauritius</h4>
                <p>Browse curated dining, shopping, hotels and experiences — all in one place. No more scrolling Facebook groups or asking friends for recommendations.</p>
              </div>
            </div>
            <div className="cb-item">
              <div className="cb-icon">💰</div>
              <div className="cb-content">
                <h4>Real Savings, Every Week</h4>
                <p>Members save on average hundreds of MUR every month. Exclusive deals, member-only prices and cashback — the membership pays for itself on your first outing.</p>
              </div>
            </div>
            <div className="cb-item">
              <div className="cb-icon">📱</div>
              <div className="cb-content">
                <h4>Book, Order &amp; Pay — In One App</h4>
                <p>Reserve your table, browse the QR menu before you arrive, order and collect your lunch, or pay and earn points — all without switching apps.</p>
              </div>
            </div>
            <div className="cb-item">
              <div className="cb-icon">🎖️</div>
              <div className="cb-content">
                <h4>Earn Cashback on Every Payment</h4>
                <p>Pay with PASSPRIVÉ and earn cashback points on every transaction — <strong>1 point = MUR 1</strong>. Spend them like cash on your next meal, purchase or experience. The higher your tier, the more you earn.</p>
              </div>
            </div>
            <div className="cb-item">
              <div className="cb-icon">🌍</div>
              <div className="cb-content">
                <h4>Perfect for Expats &amp; Tourists</h4>
                <p>New to Mauritius? PASSPRIVÉ is the fastest way to discover where locals actually eat and shop — with deals not available anywhere else.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="savings-math-banner" data-aos="fade-up">
          <div className="smb-label">💡 How much cashback can you earn?</div>
          <div className="smb-title">The maths are pretty simple.</div>
          <div className="smb-calc">
            <div className="smb-step">
              <div className="smb-val">MUR 10,000</div>
              <div className="smb-desc">Spent at Preferred Partners per month</div>
            </div>
            <div className="smb-op">×</div>
            <div className="smb-step">
              <div className="smb-val">4%</div>
              <div className="smb-desc">Black member cashback rate</div>
            </div>
            <div className="smb-op">×</div>
            <div className="smb-step">
              <div className="smb-val">12 months</div>
              <div className="smb-desc">Earning all year round</div>
            </div>
            <div className="smb-op">=</div>
            <div className="smb-step smb-result">
              <div className="smb-val">MUR 4,800</div>
              <div className="smb-desc">Cashback points earned per year</div>
            </div>
          </div>
          <div className="smb-footer">
            Cashback points are worth <strong>1 point = MUR 1</strong> — that's <strong className="smb-highlight">real money back</strong> on dining, retail and experiences, on top of every member deal you already enjoy.
          </div>
        </div>

        <div className="cashback-rewards" data-aos="fade-up">
          <div className="cr-title">Earn Cashback at Every PASSPRIVÉ Partner</div>
          <p className="cr-intro">Pay with PASSPRIVÉ and earn cashback points automatically. How much you earn depends on the partner type and your membership tier. <strong>1 point = MUR 1.</strong></p>
          <div className="cr-table">
            <div className="cr-row cr-head">
              <div className="cr-cell cr-partner">Partner type</div>
              <div className="cr-cell">🆓 Free</div>
              <div className="cr-cell">⭐ Premium</div>
              <div className="cr-cell">🖤 Black</div>
            </div>
            <div className="cr-row">
              <div className="cr-cell cr-partner">
                <strong>✅ Verified Pay Partner</strong>
                <span>Every customer earns the same rate</span>
              </div>
              <div className="cr-cell cr-rate">0.5%</div>
              <div className="cr-cell cr-rate">0.5%</div>
              <div className="cr-cell cr-rate">0.5%</div>
            </div>
            <div className="cr-row">
              <div className="cr-cell cr-partner">
                <strong>👑 Preferred Partner</strong>
                <span>Higher cashback that scales with your tier</span>
              </div>
              <div className="cr-cell cr-rate">0.5%</div>
              <div className="cr-cell cr-rate cr-rate-up">2%</div>
              <div className="cr-cell cr-rate cr-rate-up">4%</div>
            </div>
          </div>
          <p className="cr-footnote">Cashback at Preferred Partners may include merchant-funded rewards credited instantly to your account. Use these credits within <strong>14 days</strong> (1 point = MUR 1).</p>
        </div>

        <div className="membership-tiers-consumer">
          <div className="mtc-title">Pick Your Membership</div>
          <div className="mtc-grid mtc-grid-3">
            <div className="mtc-card free">
              <div className="mtc-price-row">
                <div className="mtc-badge">🆓 Free</div>
                <div className="mtc-price">MUR 0</div>
              </div>
              <div className="mtc-tagline">Discover what Mauritius has to offer</div>
              <ul>
                <li>Browse all restaurants, stores &amp; experiences</li>
                <li>View menus and venue profiles</li>
                <li>Earn <strong>0.5% cashback</strong> at every PASSPRIVÉ partner</li>
                <li>Explore events &amp; experiences</li>
              </ul>
              <div className="mtc-locked-note">🔒 Premium deals &amp; bookings require a paid membership</div>
            </div>

            <div className="mtc-card gold">
              <div className="mtc-popular-tag">⭐ Best Value</div>
              <div className="mtc-price-row">
                <div className="mtc-badge">⭐ Premium</div>
                <div className="mtc-price">MUR 4,000 <span className="mtc-per">/year</span></div>
              </div>
              <div className="mtc-tagline">The full lifestyle experience</div>
              <ul>
               
                <li>Earn <strong>2% cashback</strong> at Preferred Partners (0.5% at Verified)</li>
                <li>Table reservations at partner restaurants</li>
                <li>Access to exclusive events, invites &amp; premieres</li>
                <li>Member-only flash offers</li>
              </ul>
              <div className="mtc-roi">📈 Pays for itself after just 2 restaurant visits</div>
              {/* <a href="#contact" className="btn btn-primary mtc-btn">Get Premium →</a> */}
            </div>

            <div className="mtc-card platinum">
              <div className="mtc-price-row">
                <div className="mtc-badge">🖤 Black</div>
                <div className="mtc-price">MUR 7,000 <span className="mtc-per">/year</span></div>
              </div>
              <div className="mtc-tagline">Maximum savings, maximum lifestyle</div>
              <ul>
               
                <li>Earn <strong>4% cashback</strong> at Preferred Partners — the highest tier</li>
                <li>Early access to new restaurants &amp; brand launches</li>
                <li>Priority table booking &amp; concierge service</li>
                <li>Exclusive Black-only member events</li>
                <li>Dedicated support line</li>
              </ul>
              <div className="mtc-roi">💰 Members typically save MUR 20,000+ per year</div>
              {/* <a href="#contact" className="btn btn-primary mtc-btn mtc-btn-plat">Get Black →</a> */}
            </div>
          </div>
          <p className="mtc-footnote">* Cashback earned as points (1 point = MUR 1). Rates shown apply at Preferred Partners; all tiers earn 0.5% at Verified Pay Partners. Terms apply.</p>
        </div>

        <div className="page-actions">
          <Link href="/merchants" className="btn btn-primary">See Merchant Value</Link>
          <Link href="/contact" className="btn btn-secondary">Join Now</Link>
        </div>
      </div>
    </section>
  );
}