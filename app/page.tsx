import Link from 'next/link';
import type { CSSProperties } from 'react';

/** Absolute placement in Figma 1440 frame units (scaled by --u in CSS). */
const at = (x: number, y: number, w?: number, h?: number) =>
  ({ '--x': x, '--y': y, ...(w !== undefined && { '--w': w }), ...(h !== undefined && { '--h': h }) }) as CSSProperties;

const pills = [
  { icon: 'ic-restaurant.svg', label: 'Dining' },
  { icon: 'ic-sell.svg', label: 'Retail' },
  { icon: 'ic-hotel.svg', label: 'Hotels' },
  { icon: 'ic-theater.svg', label: 'Experiences' },
  { icon: 'ic-credit-card-o.svg', label: 'Payments' },
  { icon: 'ic-cards-star.svg', label: 'Loyalty' },
];

const realityCards = [
  {
    key: 'consumers',
    icon: 'icon-customer.png',
    iconSize: 36,
    title: 'Consumers',
    lead: 'Want curated value, easy discovery and seamless payments',
    rest: ' - but deals are scattered across chats and calls.',
  },
  {
    key: 'merchants',
    icon: 'icon-order.png',
    iconSize: 42,
    title: 'Merchants',
    lead: 'Struggle with unpredictable footfall, empty tables',
    rest: ' at off-peak hours, and zero digital loyalty tools.',
  },
  {
    key: 'corporates',
    icon: 'icon-building.png',
    iconSize: 36,
    title: 'Corporates',
    lead: 'Need high-perceived-value benefits',
    rest: ' for staff and customer rewards without admin-heavy programs.',
  },
  {
    key: 'banks',
    icon: 'icon-bank.png',
    iconSize: 36,
    title: 'Banks & Financial Institutions',
    lead: 'Want daily app engagement, card usage, and loyalty',
    rest: ' - but most banking apps are used once a month.',
  },
];

const features = [
  { icon: 'ic-mobile.svg', label: 'App-first experience' },
  { icon: 'ic-power.svg', label: 'Plug-and-play for partners' },
  { icon: 'ic-trending.svg', label: 'Real-time analytics dashboard' },
  { icon: 'ic-security.svg', label: 'Zero tech investment required' },
];

const audienceTiles = [
  { key: 'merchants', img: 'aud-merchants.png', label: 'MERCHANTS', href: '/merchants' },
  { key: 'consumers', img: 'aud-consumers.png', label: 'CONSUMERS', href: '/consumers' },
  { key: 'corporates', img: 'aud-corporates.png', label: 'CORPORATES', href: '/corporates' },
  { key: 'banks', img: 'aud-banks.png', label: 'BANK & FINANCIAL INSTITUTIONS', href: '/banks' },
];

const stats = [
  { key: 'pop', value: '1.4M', label: 'Population ready for a lifestyle platform' },
  { key: 'eco', value: 'MUR 65M', label: 'Projected ecosystem value in Year 1' },
  { key: 'users', value: '50K+', label: 'Active marketplace users projected - Year 1' },
  { key: 'merchants', value: '200+', label: 'Merchant categories - dining, retail, hotels, experiences' },
  { key: 'tech', value: '0', label: 'Tech investment required from partners' },
  { key: 'onboard', value: '48hrs', label: 'Average merchant onboarding time' },
];

function Swirl({ x, y }: { x: number; y: number }) {
  return (
    <div className="pa pp-swirl" style={at(x, y, 538.64, 600.638)} aria-hidden="true">
      <div className="pp-swirl__rot">
        <img src="/figma/swirl.svg" alt="" />
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="pp pp-home">
      {/* ── HERO ── */}
      <section className="pp-home-hero">
        <div className="pp-canvas pp-home-hero__canvas">
          <img className="pa pp-home-hero__glow" src="/figma/hero-glow.svg" alt="" aria-hidden="true" style={at(382.5, -213.37, 1957.5, 1957.5)} />

          <div className="pa pp-home-hero__tags" style={at(120, 143.63)}>
            <span className="pp-chip pp-chip--flag">
              <img src="/figma/flag-mu.png" alt="" width={27} height={18} />
              Made For Mauritius
            </span>
            <span className="pp-home-hero__pills">
              {pills.map((pill) => (
                <span className="pp-pill" key={pill.label}>
                  <img src={`/figma/${pill.icon}`} alt="" width={18} height={18} />
                  {pill.label}
                </span>
              ))}
            </span>
          </div>

          <div className="pa pp-home-hero__content" style={at(120, 244.88, 656)}>
            <div className="pp-home-hero__intro">
              <div className="pp-home-hero__text">
                <h1 className="pp-home-hero__title">
                  <span className="pp-home-hero__title-1">The Lifestyle Platform</span>
                  <span className="pp-home-hero__title-2">Every Mauritian Deserves</span>
                </h1>
                <p className="pp-home-hero__sub">
                  <strong>Passprivé</strong> connects consumers, merchants, corporates, and banks and financial
                  institutions inside one beautifully simple lifestyle super-app - driving discovery, bookings,
                  loyalty, and payments.
                </p>
              </div>
              <div className="pp-home-hero__roles">
                <Link href="/merchants" className="pp-role pp-role--active">I’m a Merchant</Link>
                <Link href="/corporates" className="pp-role">I’m a Corporate</Link>
                <Link href="/banks" className="pp-role">I’m a Bank/Financial Institution</Link>
              </div>
            </div>

            <div className="pp-waitlist">
              <a
                href="https://waitlist.passprive.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="pp-waitlist__btn"
              >
                Join Early Waitlist
                <img src="/figma/ic-arrow-circle.svg" alt="" width={24} height={24} />
              </a>
              <span className="pp-waitlist__note">
                <img src="/figma/star-badge.png" alt="" width={26} height={24} />
                <span>
                  <em className="pp-waitlist__special">Special benefits</em>{' '}
                  <em className="pp-waitlist__early">early members</em>
                </span>
              </span>
            </div>
          </div>

          <div className="pp-home-hero__visual">
            <img className="pa pp-home-hero__shadow" src="/figma/hero-shadow.svg" alt="" aria-hidden="true" style={at(848.28, 677.63, 794.56, 93.75)} />
            <div className="pa pp-home-hero__phone" style={at(863.5, 203.63, 387, 462)}>
              <img src="/figma/app-mockup.png" alt="Passprivé app home screen" />
            </div>
            <div className="pa pp-home-hero__stats" style={at(848, 675.63)}>
              <div className="pp-hstat" style={{ '--w': 134 } as CSSProperties}>
                <strong>50K+</strong>
                <span className="pp-hstat__green">Active Users</span>
              </div>
              <span className="pp-hstat__link" aria-hidden="true" />
              <div className="pp-hstat" style={{ '--w': 134 } as CSSProperties}>
                <strong>200+</strong>
                <span>Merchant Partners</span>
              </div>
              <span className="pp-hstat__link" aria-hidden="true" />
              <div className="pp-hstat" style={{ '--w': 168 } as CSSProperties}>
                <strong>MUR 65M</strong>
                <span>Ecosystem Value</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <div className="pp-canvas pp-home-body">
        <Swirl x={1092} y={1644.38 - 800.38} />
        <Swirl x={-159.75} y={780.37 - 800.38} />
        <Swirl x={-314.25} y={2080.13 - 800.38} />

        <div className="pa pp-home-body__flow" style={at(120, 48, 1200)}>
          {/* The Mauritius Reality */}
          <section className="pp-home-block">
            <span className="pp-chip">The Mauritius Reality</span>
            <div className="pp-home-block__inner">
              <h2 className="pp-h2 pp-home-reality__title">
                A Lifestyle Economy
                <br />
                That&apos;s Still Running on <em className="pp-whatsapp">WhatsApp.</em>
              </h2>
              <div className="pp-reality">
                {realityCards.map((card) => (
                  <article className={`pp-reality__card pp-reality__card--${card.key}`} key={card.key}>
                    <img
                      className="pp-reality__icon"
                      src={`/figma/${card.icon}`}
                      alt=""
                      style={{ '--s': card.iconSize } as CSSProperties}
                    />
                    <div className="pp-reality__text">
                      <h3>{card.title}</h3>
                      <p>
                        <span className="pp-reality__lead">{card.lead}</span>
                        {card.rest}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* One Platform. Four Audiences. */}
          <section className="pp-home-block">
            <span className="pp-chip">One Platform. Four Audiences.</span>
            <div className="pp-home-block__inner">
              <div className="pp-link-row">
                <h2 className="pp-h2 pp-link-row__title">
                  Passprivé is the <em className="pp-serif-accent">Missing Link</em>
                </h2>
                <p className="pp-link-row__desc">
                  We built a single, beautifully simple platform that solves the lifestyle gap for everyone at once.
                  Consumers discover and save. Merchants fill tables and build loyalty. Corporates delight their teams.
                  Banks drive daily engagement.
                </p>
              </div>
              <div className="pp-link-body">
                <ul className="pp-features">
                  {features.map((feature) => (
                    <li key={feature.label}>
                      <span className="pp-features__icon">
                        <img src={`/figma/${feature.icon}`} alt="" width={24} height={24} />
                      </span>
                      {feature.label}
                    </li>
                  ))}
                </ul>
                <div className="pp-collage">
                  {audienceTiles.map((tile) => (
                    <Link href={tile.href} className={`pp-collage__tile pp-collage__tile--${tile.key}`} key={tile.key}>
                      <img src={`/figma/${tile.img}`} alt="" />
                      <span className="pp-collage__label">{tile.label}</span>
                    </Link>
                  ))}
                  <span className="pp-collage__hub" aria-hidden="true">
                    <span className="pp-collage__hub-inner">
                      <img src="/figma/hub-glyph.svg" alt="" />
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* The Opportunity */}
          <section className="pp-opportunity">
            <div className="pp-opp-card">
              <h2 className="pp-opp-card__title">The Opportunity</h2>
              <div className="pp-opp-words" aria-label="Mauritius Is Ready. The Numbers Speak.">
                <span className="pp-word pp-word--fill" style={at(36, 151.5)}>Mauritius</span>
                <span className="pp-word-box" style={at(36, 198.75, 62.294, 52.138)}>
                  <span className="pp-word pp-word--fill" style={{ rotate: '-8.24deg' }}>Is</span>
                </span>
                <span className="pp-word" style={at(102.75, 200.25)}>Ready</span>
                <span className="pp-word pp-word--fill pp-word--icon" style={at(36, 252.75)}>
                  <img src="/figma/ic-asterisk.svg" alt="" width={18} height={18} />
                </span>
                <span className="pp-word-box" style={at(93, 244.5, 89.851, 60.013)}>
                  <span className="pp-word pp-word--serif" style={{ rotate: '-12.25deg' }}>The</span>
                </span>
                <span className="pp-word-box" style={at(181.5, 247.5, 145.349, 63.565)}>
                  <span className="pp-word pp-word--serif" style={{ rotate: '8.4deg' }}>Numbers</span>
                </span>
                <span className="pp-word pp-word--fill pp-word--peach" style={at(36, 306)}>Speak</span>
              </div>
            </div>
            <div className="pp-stats">
              {stats.map((stat) => (
                <div className={`pp-stats__cell pp-stats__cell--${stat.key}`} key={stat.key}>
                  <div>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
