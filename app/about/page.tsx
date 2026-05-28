import Link from 'next/link';

export default function AboutPage() {
  return (
    <section id="team" className="section-gap section-dark team-section page-shell">
      <div className="container">
        <div className="team-header">
          <div>
            <div className="section-label light">About the Team</div>
            <h2 className="section-title light">
              Built by Operators Who Understand<br />
              <em>Scale, Systems, and Execution</em>
            </h2>
          </div>
          <p>
            PASSPRIVÉ Platforms Ltd is led by a team with deep experience across consumer internet, financial
            services, hospitality, and global enterprises, with a shared focus on building commercially viable,
            scalable products.
          </p>
        </div>

        <div className="team-layout">
          <div className="team-portraits">
            <article className="team-card team-card-featured team-card-kshitij-solo" data-aos="fade-up">
              <div className="team-photo team-photo-kshitij" />
              <div className="team-info">
                <div className="team-role">Founder &amp; CEO</div>
                <h3>Kshitij Sharma</h3>
                <p>
                  Former Head of Global eCommerce at Reckitt, Kshitij brings deep expertise in building and scaling
                  digital businesses across global markets.
                </p>
                <p>
                  His experience spans Reckitt and P&amp;G, where he worked on large-scale brand building, digital
                  transformation, and consumer engagement. At PASSPRIVÉ, he focuses on product vision, ecosystem
                  partnerships, and building a globally scalable business model.
                </p>
              </div>
            </article>

            <article className="team-card team-card-featured" data-aos="fade-up" data-delay="100">
              <div className="team-photo team-photo-bruno" />
              <div className="team-info">
                <div className="team-role">Chief Business Officer</div>
                <h3>Bruno Rochecouste</h3>
                <p>Bruno brings extensive leadership experience across banking, insurance, and hospitality.</p>
                <p>
                  He has held senior roles including CEO, Chief Commercial Officer, and Executive Director across
                  Mauritius, South Africa, and the Middle East. Most recently, he served as Regional Sales &amp; Business
                  Development Manager for Holiday Inn in Mauritius. At PASSPRIVÉ, he leads commercial strategy,
                  partnerships, and market expansion.
                </p>
              </div>
            </article>

            <article className="team-card team-card-text" data-aos="fade-up" data-delay="200">
              <div className="team-icon-mark"><i className="fas fa-code-branch" /></div>
              <div className="team-role">Technology &amp; Product</div>
              <h3>Pritisha Zalpuri</h3>
              <p>
                Pritisha leads technology and product execution, with over a decade of experience across financial
                services and IT.
              </p>
              <p>
                She has worked with S&amp;P, Old Mutual Bank in South Africa, and Tata Consultancy Services, building and
                managing complex systems at scale. At PASSPRIVÉ, she drives platform architecture, product reliability,
                and execution velocity.
              </p>
            </article>
          </div>

          <div className="team-support-grid">
              <article className="team-card team-card-featured" data-aos="fade-up" data-delay="200">
                <div className="team-photo team-photo-bharat" />
              <div className="team-info">
                <div className="team-role">Founding Engineer</div>
                <h3>Bharat Nanavathula</h3>
                <p>
                  Bharat leads engineering execution at PASSPRIVÉ, focused on building reliable, high-performance
                  product experiences across the platform.
                </p>
                <p>
                  He works across frontend and backend systems to translate business goals into scalable technical
                  solutions, ensuring fast iteration, product quality, and dependable delivery as the ecosystem grows.
                </p>
              </div>
            </article>

            <article className="team-card team-ops-panel" data-aos="fade-up" data-delay="300">
              <div className="ops-visual">
                <span><i className="fas fa-users-gear" /></span>
              </div>
              <div className="ops-content">
                <div className="team-role">Local Operations</div>
                <h3>On-Ground Execution</h3>
                <p>
                  Our local operations team ensures strong execution across merchant onboarding, partnerships, and
                  customer experience.
                </p>
                <p>
                  With deep understanding of market dynamics, the team bridges product capabilities with real-world
                  adoption, ensuring both merchants and consumers derive consistent value from the platform.
                </p>
              </div>
            </article>
          </div>
        </div>

        <div className="page-actions">
          <Link href="/mission" className="btn btn-primary">Read Mission</Link>
          <Link href="/contact" className="btn btn-secondary">Partner With Us</Link>
        </div>
      </div>
    </section>
  );
}