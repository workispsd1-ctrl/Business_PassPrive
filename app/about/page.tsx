import Image from 'next/image';
import Link from 'next/link';

type Member = {
  name: string;
  role: string;
  photo: string;
  // Portrait backdrop; cards alternate peach/blue down the timeline.
  tone: 'blue' | 'orange';
  lead: string;
  body: string;
};

const members: Member[] = [
  {
    name: 'Kshitij Sharma',
    role: 'Founder & CEO',
    photo: '/images/Kshitj.jpeg',
    tone: 'blue',
    lead: 'Former Head of Global eCommerce at Reckitt, Kshitij brings deep expertise in building and scaling digital businesses across global markets.',
    body: 'His experience spans Reckitt and P&G, where he worked on large-scale brand building, digital transformation, and consumer engagement. At Passprivé, he focuses on product vision, ecosystem partnerships, and building a globally scalable business model.',
  },
  {
    name: 'Bruno Rochecouste',
    role: 'Chief Business Officer',
    photo: '/images/Bruno.png',
    tone: 'orange',
    lead: 'Bruno is a commercial and transformation executive with decades of leadership experience across Mauritius, South Africa, and the Middle East. He brings a broad international perspective together with a deep understanding of commercial strategy, customer experience, and organizational transformation.',
    body: 'At Passprivé, he leads commercial strategy, partnerships, and market expansion.',
  },
  {
    name: 'Pritisha Zalpuri',
    role: 'Technology & Product',
    photo: '/images/Pritisha.jpeg',
    tone: 'blue',
    lead: 'Pritisha leads technology and product execution, with over a decade of experience across financial services and IT.',
    body: 'She has worked with S&P, Old Mutual Bank in South Africa, and Tata Consultancy Services, building and managing complex systems at scale. At Passprivé, she drives platform architecture, product reliability, and execution velocity.',
  },
  {
    name: 'Bharat Nanavathula',
    role: 'Founding Engineer',
    photo: '/images/Bharat.png',
    tone: 'orange',
    lead: 'Bharat leads engineering execution at Passprivé, focused on building reliable, high-performance product experiences across the platform.',
    body: 'He works across frontend and backend systems to translate business goals into scalable technical solutions, ensuring fast iteration, product quality, and dependable delivery as the ecosystem grows.',
  },
];

export default function AboutPage() {
  return (
    <div className="hx-about">
      <div className="container">
        <div className="hx-about-banner">
          <Image src="/images/Logo.png" alt="Passprivé" width={2400} height={800} className="hx-about-logo" priority />
          <div className="hx-about-faces" aria-hidden="true">
            {members.map((member) => (
              <span key={member.name} style={{ backgroundImage: `url(${member.photo})` }} />
            ))}
          </div>
          <p className="hx-about-banner-note">The team behind Passprivé</p>
        </div>

        <div className="hx-about-head">
          <div>
            <div className="hx-label">About the Team</div>
            <h1 className="hx-section-title">
              Built by Operators Who Understand<br />
              <span className="hx-serif">Scale, Systems, and Execution</span>
            </h1>
          </div>
          <p>
            <strong>Passprivé</strong> Platforms Ltd is led by a team with deep experience across consumer internet,
            financial services, hospitality, and global enterprises, with a shared focus on building commercially
            viable, scalable products.
          </p>
        </div>

        <div className="hx-timeline">
          {members.map((member, index) => (
            <article key={member.name} className={`hx-member hx-member-${index + 1}`}>
              <div className={`hx-portrait is-${member.tone}`}>
                <div className="hx-portrait-name">
                  <strong>{member.name}</strong>
                  <span>{member.role}</span>
                </div>
                <div className="hx-portrait-photo" style={{ backgroundImage: `url(${member.photo})` }} />
              </div>
              <div className={`hx-bio ${index % 2 === 0 ? 'is-peach' : 'is-blue'}`}>
                <p className="hx-bio-lead">{member.lead}</p>
                <p>{member.body}</p>
                <p className="hx-bio-date">Oct 15.2026</p>
              </div>
            </article>
          ))}

          <article className="hx-member hx-member-5">
            <div className="hx-portrait is-ops">
              <div className="hx-portrait-name">
                <strong>On-Ground Execution</strong>
                <span>Local Operations</span>
              </div>
              <i className="fas fa-users-gear hx-ops-icon" aria-hidden="true" />
            </div>
            <div className="hx-bio is-peach">
              <p className="hx-bio-lead">
                Our local operations team ensures strong execution across merchant onboarding, partnerships, and
                customer experience.
              </p>
              <p>
                With deep understanding of market dynamics, the team bridges product capabilities with real-world
                adoption, ensuring both merchants and consumers derive consistent value from the platform.
              </p>
              <p className="hx-bio-date">Oct 15.2026</p>
            </div>
          </article>
        </div>

        <div className="hx-about-actions">
          <Link href="/contact" className="hx-about-cta">
            Partner With Us <i className="fas fa-arrow-right" aria-hidden="true" />
          </Link>
          <Link href="/mission" className="hx-about-link">
            <i className="fas fa-bullseye" aria-hidden="true" /> Read Mission
          </Link>
        </div>
      </div>
    </div>
  );
}
