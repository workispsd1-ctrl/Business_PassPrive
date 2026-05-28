import Link from 'next/link';

export default function PlatformsPage() {
  return (
    <section className="section-gap page-shell">
      <div className="container">
        <div className="platforms-section">
          <div className="platforms-header">
            <div className="platforms-eyebrow">Beyond the App</div>
            <h1 className="platforms-title">PASSPRIVÉ <em>Platforms</em></h1>
            <p className="platforms-desc">We're not just a membership app. PASSPRIVÉ Platforms is a full-service agency that
              helps businesses in Mauritius build, grow and digitise — end to end. Think of us as your in-house tech,
              design and marketing team, without the overhead.</p>
          </div>

          <div className="platforms-grid">
            <div className="platform-card" data-aos="fade-up"><div className="pc-icon">💡</div><div className="pc-content"><h4>Business &amp; Tech Consulting</h4><p>We help businesses identify digital opportunities, fix operational bottlenecks, and build strategies that actually work in the Mauritian market.</p><ul className="pc-list"><li>Digital transformation roadmaps</li><li>Process automation consulting</li><li>Market entry &amp; growth strategy</li></ul></div></div>
            <div className="platform-card" data-aos="fade-up" data-delay="100"><div className="pc-icon">🖥️</div><div className="pc-content"><h4>IT Systems &amp; Infrastructure</h4><p>From POS integration to cloud systems to custom software — we design, deploy and manage the technology layer your business runs on.</p><ul className="pc-list"><li>POS &amp; ERP integration</li><li>Cloud migration &amp; management</li><li>Custom software development</li></ul></div></div>
            <div className="platform-card" data-aos="fade-up" data-delay="200"><div className="pc-icon">🎨</div><div className="pc-content"><h4>Design Agency</h4><p>Brand identity, UI/UX, print, packaging, social content — our creative team builds visuals that make your business unmissable.</p><ul className="pc-list"><li>Brand identity &amp; logo design</li><li>App &amp; website UI/UX</li><li>Marketing collateral &amp; packaging</li></ul></div></div>
            <div className="platform-card" data-aos="fade-up" data-delay="300"><div className="pc-icon">📣</div><div className="pc-content"><h4>Digital Marketing</h4><p>SEO, social media, paid advertising, email campaigns, influencer activations — we run full-funnel campaigns that drive real footfall and conversions.</p><ul className="pc-list"><li>Social media management</li><li>Google &amp; Meta ad campaigns</li><li>Email &amp; WhatsApp marketing</li></ul></div></div>
            <div className="platform-card" data-aos="fade-up" data-delay="400"><div className="pc-icon">🌐</div><div className="pc-content"><h4>Website &amp; App Development</h4><p>Custom websites, e-commerce stores, order &amp; collect apps, booking systems — we build digital products that look great and actually convert.</p><ul className="pc-list"><li>Business websites (fast, SEO-ready)</li><li>E-commerce &amp; online ordering</li><li>Mobile app development</li></ul></div></div>
            <div className="platform-card" data-aos="fade-up" data-delay="500"><div className="pc-icon">🤝</div><div className="pc-content"><h4>Technology Advisory</h4><p>Not sure which systems to invest in? Our advisors cut through the noise and help leadership teams make smart, future-proof technology decisions.</p><ul className="pc-list"><li>Vendor selection &amp; procurement</li><li>Technology due diligence</li><li>CTO-as-a-service engagements</li></ul></div></div>
          </div>

          <div className="platforms-cta-bar">
            <div className="pcta-left">
              <div className="pcta-tag">One partner. Every capability.</div>
              <div className="pcta-title">We build the technology and brand behind Mauritius' best businesses.</div>
            </div>
            <Link href="/contact" className="btn btn-primary">Talk to PASSPRIVÉ Platforms</Link>
          </div>
        </div>
      </div>
    </section>
  );
}