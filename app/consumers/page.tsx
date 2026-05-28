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
                  <div className="c-gold-badge">GOLD</div>
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
                <h4>Earn Points on Everything</h4>
                <p>Every purchase earns PASSPRIVÉ points. Redeem them for free meals, shopping vouchers or exclusive experiences. The more you use it, the more you save.</p>
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
          <div className="smb-label">💡 Does it pay for itself?</div>
          <div className="smb-title">The maths are pretty simple.</div>
          <div className="smb-calc">
            <div className="smb-step">
              <div className="smb-val">MUR 2,000</div>
              <div className="smb-desc">Average dining bill per outing</div>
            </div>
            <div className="smb-op">×</div>
            <div className="smb-step">
              <div className="smb-val">20%</div>
              <div className="smb-desc">Average discount on deals</div>
            </div>
            <div className="smb-op">×</div>
            <div className="smb-step">
              <div className="smb-val">3×/month</div>
              <div className="smb-desc">Times you dine out per month</div>
            </div>
            <div className="smb-op">=</div>
            <div className="smb-step smb-result">
              <div className="smb-val">MUR 14,400</div>
              <div className="smb-desc">Saved on dining alone per year</div>
            </div>
          </div>
          <div className="smb-footer">
            Gold membership costs <strong>MUR 4,000/year</strong>. That's a <strong className="smb-highlight">10× return</strong> just on restaurant savings — before retail, events and experiences even count.
          </div>
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
                <li>See available deals (blurred preview)</li>
                <li>Explore events &amp; experiences</li>
              </ul>
              <div className="mtc-locked-note">🔒 Deals &amp; bookings require a paid membership</div>
            </div>

            <div className="mtc-card gold">
              <div className="mtc-popular-tag">⭐ Best Value</div>
              <div className="mtc-price-row">
                <div className="mtc-badge">🥇 Gold</div>
                <div className="mtc-price">MUR 4,000 <span className="mtc-per">/year</span></div>
              </div>
              <div className="mtc-tagline">The full lifestyle experience</div>
              <ul>
                <li>Everything in Free</li>
                <li>Access deals from <strong>10% off</strong> across restaurants, stores, activities &amp; events</li>
                <li>Table reservations at partner restaurants</li>
                <li>Access to exclusive events, invites &amp; premieres</li>
                <li>Free access to the <strong>Brefnew App</strong></li>
                <li>Member-only flash offers</li>
              </ul>
              <div className="mtc-roi">📈 Pays for itself after just 2 restaurant visits</div>
              <a href="#contact" className="btn btn-primary mtc-btn">Get Gold →</a>
            </div>

            <div className="mtc-card platinum">
              <div className="mtc-price-row">
                <div className="mtc-badge">💎 Platinum</div>
                <div className="mtc-price">MUR 7,000 <span className="mtc-per">/year</span></div>
              </div>
              <div className="mtc-tagline">Maximum savings, maximum lifestyle</div>
              <ul>
                <li>Everything in Gold</li>
                <li>+10% <em>additional cashback</em> exclusively from PASSPRIVÉ on top of merchant deals</li>
                <li>Early access to new restaurants &amp; brand launches</li>
                <li>Priority table booking &amp; concierge service</li>
                <li>Exclusive Platinum-only member events</li>
                <li>Dedicated support line</li>
              </ul>
              <div className="mtc-roi">💰 Members typically save MUR 20,000+ per year</div>
              <a href="#contact" className="btn btn-primary mtc-btn mtc-btn-plat">Get Platinum →</a>
            </div>
          </div>
          <p className="mtc-footnote">* 10% additional cashback applied on selected PASSPRIVÉ partner transactions. Terms apply.</p>
        </div>

        <div className="page-actions">
          <Link href="/merchants" className="btn btn-primary">See Merchant Value</Link>
          <Link href="/contact" className="btn btn-secondary">Join Now</Link>
        </div>
      </div>
    </section>
  );
}