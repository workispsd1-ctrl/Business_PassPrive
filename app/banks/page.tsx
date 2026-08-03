import Link from 'next/link';

export default function BanksPage() {
  return (
    <section id="banks" className="section-gap section-dark page-shell">
      <div className="container">
        <div
          className="section-label eyebrow-lg"
          style={{ display: 'block', width: '30%', padding: '10px 28px' }}
        >
          For Banks & Financial Institutions
        </div>
        <h1 className="section-title light">Turn Your Payment App<br /><em>Into a Daily Habit</em></h1>
        <p className="section-intro light">Most banking and fintech apps are opened once a month to check a balance. PASSPRIVÉ turns your app into something people open every single day.</p>

        <div className="banks-layout">
          <div className="banks-stats">
            <div className="bank-stat"><div className="bs-num">50K+</div><div className="bs-label">Projected active marketplace users in Year 1</div></div>
            <div className="bank-stat"><div className="bs-num">MUR 65M</div><div className="bs-label">Estimated total ecosystem value generated</div></div>
            <div className="bank-stat"><div className="bs-num">0</div><div className="bs-label">Tech investment required from your side</div></div>
            <div className="bank-stat"><div className="bs-num">Daily</div><div className="bs-label">Target app engagement vs monthly today</div></div>
          </div>
          <div className="banks-cards">
            <div className="bank-card"><div className="bank-card-icon"><i className="fas fa-plug" /></div><h3>Plug-and-Play Integration</h3><p>No development resources needed from your team. PASSPRIVÉ integrates into your existing app or digital wallet as a fully-managed lifestyle marketplace module.</p></div>
            <div className="bank-card"><div className="bank-card-icon"><i className="fas fa-credit-card" /></div><h3>Drive Card &amp; Wallet Usage</h3><p>Every deal redeemed, booking made and purchase completed drives a transaction through your payment rails. Lifestyle rewards = more card swipes.</p></div>
            <div className="bank-card"><div className="bank-card-icon"><i className="fas fa-hand-holding-usd" /></div><h3>BNPL &amp; Consumer Lending</h3><p>Embedded Buy Now Pay Later for lifestyle purchases. Drive consumer finance uptake through the PASSPRIVÉ marketplace — natural credit touchpoints at the moment of desire.</p></div>
            <div className="bank-card"><div className="bank-card-icon"><i className="fas fa-coins" /></div><h3>Loyalty Points Engine</h3><p>Integrate your points currency into the PASSPRIVÉ ecosystem. Members earn and burn points on dining, shopping and experiences — creating a powerful retention loop.</p></div>
            <div className="bank-card"><div className="bank-card-icon"><i className="fas fa-chart-pie" /></div><h3>Rich Spend Data</h3><p>Understand where, when and how your customers spend on lifestyle. First-party data that powers better offers, personalised products and smarter risk modelling.</p></div>
            <div className="bank-card"><div className="bank-card-icon"><i className="fas fa-star" /></div><h3>Premium Card Positioning</h3><p>Bundle PASSPRIVÉ Privé Plus or Privé Black membership with your premium card products. A tangible, daily-use benefit that justifies annual fees and drives upgrades.</p></div>
          </div>
        </div>

        <div className="partnership-models">
          <div className="pm-title">Partnership Models for Financial Institutions</div>
          <div className="pm-grid">
            <div className="pm-card"><div className="pm-icon">🔌</div><h4>White-Label Integration</h4><p>Embed PASSPRIVÉ's full marketplace inside your mobile banking or payment app under your brand identity. Seamless for your customers — zero build for you.</p></div>
            <div className="pm-card"><div className="pm-icon">💳</div><h4>Card Bundle Partnership</h4><p>Include a PASSPRIVÉ membership as a core benefit with specific card tiers. Instantly elevate your value proposition and give cardholders a reason to use their card daily.</p></div>
            <div className="pm-card"><div className="pm-icon">🏦</div><h4>Strategic Acquiring Partner</h4><p>Become the exclusive payment acquirer for Mauritius' lifestyle marketplace. Process every transaction on PassPrivé — driving acquiring revenue and card-on-file growth.</p></div>
            <div className="pm-card"><div className="pm-icon">📊</div><h4>Data &amp; Loyalty Partner</h4><p>Leverage PASSPRIVÉ's merchant network to enrich your customer profiles. Power personalised offers and BNPL approvals with real lifestyle spend data.</p></div>
          </div>
        </div>

        <div className="bank-cta-bar">
          <div className="bcta-text">
            <strong>Interested in a strategic partnership?</strong>
            <p>Let's build the Mauritius lifestyle economy together</p>
          </div>
          <a href="#contact" className="btn btn-gold">Explore Partnership</a>
        </div>
      </div>
    </section>
  );
}