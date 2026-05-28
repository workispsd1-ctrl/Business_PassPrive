import Link from 'next/link';

const audienceCards = [
  {
    href: '/consumers',
    label: 'Consumers',
    title: 'Discover, book, pay, and save.',
    description: 'A single membership that surfaces the best dining, retail, hotel, and experience offers across Mauritius.',
  },
  {
    href: '/merchants',
    label: 'Merchants',
    title: 'Fill tables and build loyalty.',
    description: 'Booking, QR menus, ordering, promotions, and analytics without extra tech overhead.',
  },
  {
    href: '/corporates',
    label: 'Corporates',
    title: 'High-value perks employees use.',
    description: 'A premium benefits layer for staff rewards, customer gifts, and simple corporate administration.',
  },
  {
    href: '/banks',
    label: 'Banks',
    title: 'Turn the app into a daily habit.',
    description: 'A plug-and-play lifestyle marketplace that drives engagement, card usage, and loyalty.',
  },
] as const;

export default function HomePage() {
  return (
    <>
      <div id="hero-wrapper">
        <div className="hero-bg-shapes">
          <div className="shape shape-1" />
          <div className="shape shape-2" />
          <div className="shape shape-3" />
        </div>

        <section id="hero">
          <div className="hero-content">
            <div className="hero-badge">🇲🇺 Made for Mauritius</div>
            <h1>
              The Lifestyle Platform<br />
              <em>Every Mauritian Deserves</em>
            </h1>
            <p className="hero-sub">
              PASSPRIVÉ connects consumers, merchants, corporates, and banks and financial institutions inside one
              beautifully simple lifestyle super-app - driving discovery, bookings, loyalty, and payments.
            </p>
            <div className="hero-pills">
              <span className="pill">🍽️ Dining</span>
              <span className="pill">🛍️ Retail</span>
              <span className="pill">🏨 Hotels</span>
              <span className="pill">🎭 Experiences</span>
              <span className="pill">💳 Payments</span>
              <span className="pill">🎁 Loyalty</span>
            </div>
            <div className="hero-ctas">
              <Link href="/merchants" className="btn btn-primary">I'm a Merchant</Link>
              <Link href="/corporates" className="btn btn-secondary">I'm a Corporate</Link>
              <Link href="/banks" className="btn btn-secondary">I'm a Bank/Financial Institution</Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="app-header">
                  <span className="app-greeting">Welcome back, <strong>Kavita</strong> 👋</span>
                  <div className="app-badge-gold">GOLD MEMBER</div>
                </div>
                <div className="app-balance">
                  <span className="balance-label">💰 Benefits received this year</span>
                  <span className="balance-amount">MUR 3,840</span>
                  <div className="balance-sub-row">
                    <span className="balance-sub">🍽️ 12 dining visits saved</span>
                    <span className="balance-sub-green">10× your membership</span>
                  </div>
                </div>
                <div className="app-deals">
                  <div className="deal-label">🔥 Today's Deals</div>
                  <div className="deal-card">
                    <div className="deal-icon">🍷</div>
                    <div>
                      <div className="deal-name">Le Chamarel</div>
                      <div className="deal-off">20% OFF</div>
                    </div>
                  </div>
                  <div className="deal-card">
                    <div className="deal-icon">☕</div>
                    <div>
                      <div className="deal-name">Cafe Lux</div>
                      <div className="deal-off">Free Coffee</div>
                    </div>
                  </div>
                  <div className="deal-card">
                    <div className="deal-icon">🛍️</div>
                    <div>
                      <div className="deal-name">Kaz Kazini</div>
                      <div className="deal-off">15% OFF</div>
                    </div>
                  </div>
                </div>
                <div className="app-tabs">
                  <span className="tab active"><i className="fas fa-home" /></span>
                  <span className="tab"><i className="fas fa-search" /></span>
                  <span className="tab"><i className="fas fa-calendar" /></span>
                  <span className="tab"><i className="fas fa-user" /></span>
                </div>
              </div>
            </div>
            <div className="hero-stats">
              <div className="stat-bubble stat-1">
                <span className="stat-num">50K+</span>
                <span className="stat-label">Active Users</span>
              </div>
              <div className="stat-bubble stat-2">
                <span className="stat-num">MUR 65M</span>
                <span className="stat-label">Ecosystem Value</span>
              </div>
              <div className="stat-bubble stat-3">
                <span className="stat-num">200+</span>
                <span className="stat-label">Merchant Partners</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section id="problem" className="section-gap">
        <div className="container">
          <div className="section-label">The Mauritius Reality</div>
          <h2 className="section-title">
            A Lifestyle Economy That's<br />
            <em>Still Running on WhatsApp</em>
          </h2>
          <div className="problem-grid">
            <div className="problem-card">
              <div className="problem-icon">👩‍💼</div>
              <h3>Consumers</h3>
              <p>Want curated value, easy discovery and seamless payments - but deals are scattered across chats and calls.</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">🍽️</div>
              <h3>Merchants</h3>
              <p>Struggle with unpredictable footfall, empty tables at off-peak hours, and zero digital loyalty tools.</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">🏢</div>
              <h3>Corporates</h3>
              <p>Need high-perceived-value benefits for staff and customer rewards without admin-heavy programs.</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">🏦</div>
              <h3>Banks & Financial Institutions</h3>
              <p>Want daily app engagement, card usage, and loyalty - but most banking apps are used once a month.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="solution" className="section-gap section-dark">
        <div className="container">
          <div className="solution-inner">
            <div className="solution-text">
              <div className="section-label light">One Platform. Four Audiences.</div>
              <h2 className="section-title light">
                PASSPRIVÉ is the<br />
                <em>Missing Link</em>
              </h2>
              <p className="solution-desc">
                We built a single, beautifully simple platform that solves the lifestyle gap for everyone at once.
                Consumers discover and save. Merchants fill tables and build loyalty. Corporates delight their teams.
                Banks drive daily engagement.
              </p>
              <div className="solution-pillars">
                <div className="pillar"><i className="fas fa-mobile-alt" /> <span>App-first experience</span></div>
                <div className="pillar"><i className="fas fa-plug" /> <span>Plug-and-play for partners</span></div>
                <div className="pillar"><i className="fas fa-chart-line" /> <span>Real-time analytics dashboard</span></div>
                <div className="pillar"><i className="fas fa-shield-alt" /> <span>Zero tech investment required</span></div>
              </div>
            </div>
            <div className="solution-ecosystem">
              <div className="eco-center">
                <div className="eco-logo">PASSPRIVÉ</div>
              </div>
              <div className="eco-node eco-n1"><i className="fas fa-utensils" /><span>Merchants</span></div>
              <div className="eco-node eco-n2"><i className="fas fa-building" /><span>Corporates</span></div>
              <div className="eco-node eco-n3"><i className="fas fa-university" /><span>Banks & Financial Institutions</span></div>
              <div className="eco-node eco-n4"><i className="fas fa-users" /><span>Consumers</span></div>
              <svg className="eco-lines" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                <line x1="150" y1="150" x2="150" y2="40" stroke="rgba(255,200,100,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="150" y1="150" x2="260" y2="150" stroke="rgba(255,200,100,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="150" y1="150" x2="150" y2="260" stroke="rgba(255,200,100,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="150" y1="150" x2="40" y2="150" stroke="rgba(255,200,100,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section id="numbers" className="section-gap section-dark">
        <div className="container">
          <div className="section-label light">The Opportunity</div>
          <h2 className="section-title light">
            Mauritius Is Ready.<br />
            <em>The Numbers Speak.</em>
          </h2>
          <div className="numbers-grid">
            <div className="number-card"><div className="number-count">1.4M</div><div className="number-label">Population ready for a lifestyle platform</div></div>
            <div className="number-card"><div className="number-count">MUR 65M</div><div className="number-label">Projected ecosystem value in Year 1</div></div>
            <div className="number-card"><div className="number-count">50K+</div><div className="number-label">Active marketplace users projected - Year 1</div></div>
            <div className="number-card"><div className="number-count">200+</div><div className="number-label">Merchant categories - dining, retail, hotels, experiences</div></div>
            <div className="number-card"><div className="number-count">0</div><div className="number-label">Tech investment required from partners</div></div>
            <div className="number-card"><div className="number-count">48hrs</div><div className="number-label">Average merchant onboarding time</div></div>
          </div>
        </div>
      </section>

      <section id="roadmap" className="section-gap">
        <div className="container">
          <div className="section-label">2026–2029 Roadmap</div>
          <h2 className="section-title">
            Where We're Headed<br />
            <em>Together</em>
          </h2>
          <div className="timeline">
            <div className="timeline-item tl-left">
              <div className="tl-dot">2026</div>
              <div className="tl-card">
                <h4>Foundation & Launch</h4>
                <ul>
                  <li>Core marketplace live - dining, retail, experiences</li>
                  <li>Table booking and QR menus rolled out</li>
                  <li>First financial institution partnership</li>
                  <li>50K consumer members target</li>
                  <li>Corporate benefits program launch</li>
                </ul>
              </div>
            </div>
            <div className="timeline-item tl-right">
              <div className="tl-dot">2027</div>
              <div className="tl-card">
                <h4>Scale & Deepen</h4>
                <ul>
                  <li>BNPL & consumer finance integration</li>
                  <li>Order & Collect fully deployed island-wide</li>
                  <li>Multi-bank loyalty partnerships live</li>
                  <li>Hotel and tourism sector integration</li>
                  <li>150K+ active members</li>
                </ul>
              </div>
            </div>
            <div className="timeline-item tl-left">
              <div className="tl-dot">2028</div>
              <div className="tl-card">
                <h4>Ecosystem Dominance</h4>
                <ul>
                  <li>White-label platform for regional banks</li>
                  <li>Regional expansion to Réunion and Seychelles</li>
                  <li>AI-powered personalised recommendations</li>
                  <li>Full payment super-app capabilities</li>
                  <li>300K+ members</li>
                </ul>
              </div>
            </div>
            <div className="timeline-item tl-right">
              <div className="tl-dot">2029</div>
              <div className="tl-card">
                <h4>Market Leadership</h4>
                <ul>
                  <li>Mauritius' #1 lifestyle super-app</li>
                  <li>Full fintech and lifestyle convergence</li>
                  <li>IPO-ready growth trajectory</li>
                  <li>500K+ active users across the region</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}