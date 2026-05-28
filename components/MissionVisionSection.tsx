export function MissionVisionSection() {
  return (
    <section id="mission" className="section-gap mission-section page-shell">
      <div className="container">
        <div className="mission-hero">
          <div>
            <div className="section-label">Mission &amp; Vision</div>
            <h2 className="section-title">Commerce That Becomes<br /><em>Recurring Economic Value</em></h2>
          </div>
          <p className="mission-lede">
            PASSPRIVÉ sits at the intersection of payments, loyalty, and merchant growth, turning everyday
            transactions into intelligent, measurable value for consumers, businesses, banks, and corporates.
          </p>
        </div>

        <div className="mission-grid">
          <article className="mission-card mission-card-dark" data-aos="fade-up">
            <span className="mission-kicker">Our Mission</span>
            <h3>Make everyday commerce more rewarding, intelligent, and connected.</h3>
            <p>
              We are building a platform that enables consumers to get more value from every transaction, while helping
              businesses drive repeat usage, higher spend, and measurable ROI.
            </p>
            <p>
              For merchants, we go beyond discovery with direct revenue-generation tools like table reservations,
              QR-based ordering, and digital storefronts. For banks and corporates, we become a plug-and-play
              engagement layer that drives customer stickiness and incremental spend.
            </p>
            <p>
              At its core, PASSPRIVÉ is designed to turn fragmented transactions into structured, recurring economic
              value for every participant in the ecosystem.
            </p>
          </article>

          <article className="mission-card" data-aos="fade-up" data-delay="100">
            <span className="mission-kicker">Our Vision</span>
            <h3>Become the default rewards and commerce layer across global ecosystems.</h3>
            <p>
              We envision a world where every payment unlocks intelligent, contextual benefits, every merchant has
              access to enterprise-grade growth tools, and every bank or corporate can offer deeply engaging,
              personalized experiences without building from scratch.
            </p>
            <p>
              PASSPRIVÉ aims to power this shift by creating scalable infrastructure for loyalty, commerce, and
              financial services, starting with high-impact markets and expanding globally.
            </p>
            <div className="vision-list">
              <span><i className="fas fa-credit-card" /> Contextual payment benefits</span>
              <span><i className="fas fa-store" /> Merchant growth infrastructure</span>
              <span><i className="fas fa-layer-group" /> Plug-and-play engagement layer</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}