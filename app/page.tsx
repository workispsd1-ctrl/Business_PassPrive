import Image from 'next/image';
import Link from 'next/link';
import { WaitlistButton } from '@/components/WaitlistButton';

const categories = [
  { label: 'Dining', icon: 'fa-utensils' },
  { label: 'Retail', icon: 'fa-tag' },
  { label: 'Hotels', icon: 'fa-bed' },
  { label: 'Experiences', icon: 'fa-masks-theater' },
  { label: 'Payments', icon: 'fa-credit-card' },
  { label: 'Loyalty', icon: 'fa-gift' },
] as const;

const problems = [
  {
    tone: 'navy',
    icon: '/images/icon-consumers.png',
    title: 'Consumers',
    lead: 'Looking for handpicked deals, easy discovery, and smooth payments,',
    rest: 'without having to hunt through chats and calls.',
  },
  {
    tone: 'orange',
    icon: '/images/icon-merchants.png',
    title: 'Merchants',
    lead: 'Struggling with unpredictable customer crowds, empty tables during slow hours,',
    rest: 'and no digital way to keep customers coming back.',
  },
  {
    tone: 'blue',
    icon: '/images/icon-corporates.png',
    title: 'Corporates',
    lead: 'Looking for high-value perks for your staff and rewards for your customers,',
    rest: 'without the heavy administrative hassle.',
  },
  {
    tone: 'light',
    icon: '/images/icon-banks.png',
    title: 'Banks & Financial Institutions',
    lead: 'Want daily app use, card transactions, and customer loyalty,',
    rest: 'even though most banking apps are only opened once a month.',
  },
] as const;

const pillars = [
  { label: 'App-first experience', icon: 'fa-mobile-screen' },
  { label: 'Plug-and-play for partners', icon: 'fa-plug' },
  { label: 'Real-time analytics dashboard', icon: 'fa-arrow-trend-up' },
  { label: 'Zero tech investment required', icon: 'fa-shield-halved' },
] as const;

// The corporates and banks photos already have their caption baked into the artwork.
const audiences = [
  { key: 'merchants', href: '/merchants', label: 'Merchants', photo: '/images/ecosystem-merchants.png', captioned: false },
  { key: 'consumers', href: '/consumers', label: 'Consumers', photo: '/images/ecosystem-consumers.png', captioned: false },
  { key: 'corporates', href: '/corporates', label: 'Corporates', photo: '/images/ecosystem-corporates.png', captioned: true },
  { key: 'banks', href: '/banks', label: 'Bank & Financial Institutions', photo: '/images/ecosystem-banks.png', captioned: true },
] as const;

const numbers = [
  { value: '1.4M', label: 'Population ready for a lifestyle platform', tone: 'navy' },
  { value: 'MUR 65M', label: 'Projected ecosystem value in Year 1', tone: 'accent' },
  { value: '50K+', label: 'Active marketplace users projected - Year 1', tone: 'plain' },
  { value: '200+', label: 'Merchant categories - dining, retail, hotels, experiences', tone: 'orange' },
  { value: '0', label: 'Tech investment required from partners', tone: 'blue' },
  { value: '48hrs', label: 'Average merchant onboarding time', tone: 'plain' },
] as const;

export default function HomePage() {
  return (
    <>
      <div id="hero-wrapper" className="hx-hero-wrapper">

        <section id="hero" className="hx-hero">
          <div className="hx-pills" aria-label="What Passprivé covers">
            <span className="hx-pill hx-pill-origin">
              <span className="hx-flag" aria-hidden="true"><i /><i /><i /><i /></span>
              Made For Mauritius
            </span>
            {categories.map((item) => (
              <span key={item.label} className="hx-pill">
                <i className={`fas ${item.icon}`} aria-hidden="true" />
                {item.label}
              </span>
            ))}
          </div>

          <div className="hx-grid">
            <div className="hx-content">
              <h1 className="hx-title">
                One App.
                <em>Every Mauritian<br />Lifestyle.</em>
              </h1>
              <p className="hx-sub">
                Unifying consumers, merchants, and financial networks to power seamless discovery, rewards, and
                payments.
              </p>
              <div className="hx-audiences">
                <Link href="/merchants" className="hx-audience is-active">I&apos;m a Merchant</Link>
                <Link href="/corporates" className="hx-audience">I&apos;m a Corporate</Link>
                <Link href="/banks" className="hx-audience">I&apos;m a Bank/Financial Institution</Link>
              </div>
              <WaitlistButton />
            </div>

            <div className="hx-visual">
              <div className="hx-phone-clip">
                <Image
                  src="/images/home-hero-phone.png"
                  alt="Passprivé app showing PrivéPlus cashback, savings and stamp rewards"
                  width={2064}
                  height={2412}
                  sizes="(max-width: 900px) 80vw, 460px"
                  className="hx-phone-img"
                  priority
                />
              </div>

              <div className="hx-stats">
                <div className="hx-stat"><span className="hx-stat-num">50K+</span><span className="hx-stat-label">Active Users</span></div>
                <div className="hx-stat"><span className="hx-stat-num">200+</span><span className="hx-stat-label">Merchant Partners</span></div>
                <div className="hx-stat"><span className="hx-stat-num">MUR 65M</span><span className="hx-stat-label">Ecosystem Value</span></div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section id="problem" className="hx-section hx-problem">
        <div className="container">
          <div className="hx-label">The Mauritius Reality</div>
          <h2 className="hx-section-title">
            A Lifestyle Economy<br />
            That&apos;s Still Running on <em>WhatsApp.</em>
          </h2>
          <div className="hx-problem-grid">
            {problems.map((item) => (
              <article key={item.title} className={`hx-pcard is-${item.tone}`}>
                <Image src={item.icon} alt="" width={56} height={56} className="hx-pcard-icon" />
                <h3>{item.title}</h3>
                <p><span className="hx-hl">{item.lead}</span> {item.rest}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="solution" className="hx-section hx-solution">
        <div className="container hx-solution-grid">
          <div className="hx-solution-text">
            <div className="hx-label">One Platform. Four Audiences.</div>
            <h2 className="hx-section-title">
              Passprivé is the<br />
              <span className="hx-serif">Missing Link</span>
            </h2>
            <ul className="hx-pillars">
              {pillars.map((item) => (
                <li key={item.label}>
                  <span className="hx-pillar-icon"><i className={`fas ${item.icon}`} aria-hidden="true" /></span>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="hx-solution-visual">
            <p className="hx-solution-desc">
              We built one simple platform that brings everyone together: consumers discover and save, merchants
              fill empty tables and build loyalty, companies reward their teams, and banks drive daily use.
            </p>
            <div className="hx-eco">
              {audiences.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`hx-eco-tile is-${item.key}`}
                  aria-label={item.label}
                >
                  <Image src={item.photo} alt="" fill sizes="(max-width: 900px) 50vw, 400px" className="hx-eco-photo" />
                  {!item.captioned && <span className="hx-eco-label">{item.label}</span>}
                </Link>
              ))}
              <span className="hx-eco-hub" aria-hidden="true">
                <Image src="/images/logo-badge.png" alt="" width={84} height={84} />
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="numbers" className="hx-section hx-numbers">
        <div className="container hx-bento">
          <div className="hx-bento-intro">
            <h2>The Opportunity</h2>
            <div className="hx-words" aria-label="Mauritius is ready. The numbers speak.">
              <div><span className="hx-word is-dark">Mauritius</span></div>
              <div>
                <span className="hx-word is-dark">Is</span>
                <span className="hx-word is-outline tilt-l">Ready</span>
              </div>
              <div>
                <span className="hx-word is-star">✳</span>
                <span className="hx-word is-outline is-serif tilt-r">The</span>
                <span className="hx-word is-outline is-serif tilt-r2">Numbers</span>
              </div>
              <div><span className="hx-word is-dark is-serif">Speak</span></div>
            </div>
          </div>
          {numbers.map((item) => (
            <div key={item.value} className={`hx-num is-${item.tone}`}>
              <div className="hx-num-value">{item.value}</div>
              <div className="hx-num-label">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

    </>
  );
}