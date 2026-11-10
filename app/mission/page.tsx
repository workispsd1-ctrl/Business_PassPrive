import type { CSSProperties } from 'react';

/** Absolute placement in Figma 1440 frame units (scaled by --u in CSS). */
const at = (x: number, y: number, w?: number, h?: number) =>
  ({ '--x': x, '--y': y, ...(w !== undefined && { '--w': w }), ...(h !== undefined && { '--h': h }) }) as CSSProperties;

const visionPoints = [
  { icon: 'ic-credit-card.svg', label: 'Contextual payment benefits' },
  { icon: 'ic-storefront.svg', label: 'Merchant growth infrastructure' },
  { icon: 'ic-layers.svg', label: 'Plug-and-play engagement layer' },
];

export default function MissionPage() {
  return (
    <div className="pp pp-mission">
      {/* ── HERO ── */}
      <section className="pp-mission-hero">
        <div className="pp-canvas pp-mission-hero__canvas">
          <div className="pa pp-mission-hero__media" style={at(623.25, 39, 1172.25, 1275.75)}>
            <img src="/figma/mission-hero.png" alt="Smiling Passprivé member holding the app" />
          </div>
          <div className="pa pp-mission-hero__text" style={at(120, 503.25, 617.25)}>
            <div className="pp-mission-hero__head">
              <span className="pp-chip pp-chip--icon">
                <img src="/figma/paper-plane.png" alt="" width={28} height={28} />
                Vision &amp; Mission
              </span>
              <h1 className="pp-h2">
                Commerce That Becomes
                <br />
                <em className="pp-serif-accent">Recurring Economic Value</em>
              </h1>
            </div>
            <p className="pp-mission-hero__lede">
              <strong>Passprivé</strong> sits at the intersection of payments, loyalty, and merchant growth, turning
              everyday transactions into intelligent, measurable value for consumers, businesses, banks, and
              corporates.
            </p>
          </div>
        </div>
      </section>

      {/* ── VISION / MISSION ── */}
      <div className="pp-canvas pp-mission-body">
        {/* Decorative outlines */}
        <span className="pa pp-outline" style={at(725, 266, 344, 636)} aria-hidden="true" />
        <img className="pa pp-outline-svg" src="/figma/mission-frame.svg" alt="" aria-hidden="true" style={at(928.625, 1027.625, 272.75, 212.75)} />
        <span className="pa pp-outline" style={at(725, 0, 516, 212)} aria-hidden="true" />
        <span className="pa pp-outline pp-outline--left" style={at(53, 168, 644, 1028)} aria-hidden="true" />
        <span className="pa pp-outline pp-outline--left pp-outline--blue" style={at(418, 1241, 220, 604)} aria-hidden="true" />

        <img className="pa pp-glow" src="/figma/mission-glow-orange.svg" alt="" aria-hidden="true" style={at(-235.5, 833.25 - 1200, 991.5, 991.5)} />

        {/* Vision */}
        <section className="pa pp-vm pp-vm--vision" style={at(129, -94, 740, 1076)}>
          <img className="pa pp-glow" src="/figma/mission-glow-orange.svg" alt="" aria-hidden="true" style={at(180.75, 259.5, 991.5, 991.5)} />
          <div className="pa pp-vm__content" style={at(64, 116, 584)}>
            <div className="pp-vm__copy">
              <h2 className="pp-vm__title">Become the default rewards and commerce layer across global ecosystems.</h2>
              <p>
                We envision a world where every payment unlocks intelligent, contextual benefits, every merchant has
                access to enterprise-grade growth tools, and every bank or corporate can offer deeply engaging,
                personalized experiences without building from scratch.
              </p>
              <p>
                <strong>Passprivé</strong> aims to power this shift by creating scalable infrastructure for loyalty,
                commerce, and financial services, starting with high-impact markets and expanding globally.
              </p>
            </div>
            <ul className="pp-vm__points">
              {visionPoints.map((point) => (
                <li key={point.label}>
                  <span className="pp-vm__point-icon">
                    <img src={`/figma/${point.icon}`} alt="" width={24} height={24} />
                  </span>
                  {point.label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="pa pp-vm-tag pp-vm-tag--vision" style={at(376, -166)}>
          <span className="pp-vm-tag__label">VISION</span>
          <span className="pp-vm-tag__square" aria-hidden="true" />
          <span className="pp-vm-tag__bar" aria-hidden="true" />
        </div>

        <img className="pa pp-glow" src="/figma/mission-glow-blue.svg" alt="" aria-hidden="true" style={at(772.5, 1426.5, 775.5, 775.5)} />

        {/* Mission */}
        <section className="pa pp-vm pp-vm--mission" style={at(623.25, 1086.75, 690, 864)}>
          <img className="pa pp-glow" src="/figma/mission-glow-blue.svg" alt="" aria-hidden="true" style={at(-306.75, -342.75, 775.5, 775.5)} />
          <div className="pp-vm__mission-copy">
            <h2 className="pa pp-vm__title" style={at(72, 132.75, 546)}>
              Make everyday commerce more rewarding, intelligent, and connected.
            </h2>
            <p className="pa" style={at(72, 322.5, 546)}>
              We are building a platform that enables consumers to get more value from every transaction, while
              helping businesses drive repeat usage, higher spend, and measurable ROI.
            </p>
            <p className="pa" style={at(72, 483.75, 546)}>
              For merchants, we go beyond discovery with direct revenue-generation tools like table reservations,
              QR-based ordering, and digital storefronts. For banks and corporates, we become a plug-and-play
              engagement layer that drives customer stickiness and incremental spend.
            </p>
            <p className="pa" style={at(72, 705, 546)}>
              At its core, <strong>Passprivé</strong> is designed to turn fragmented transactions into structured,
              recurring economic value for every participant in the ecosystem.
            </p>
          </div>
        </section>

        <div className="pa pp-vm-tag pp-vm-tag--mission" style={at(870, 1020)}>
          <span className="pp-vm-tag__label">MISSION</span>
          <span className="pp-vm-tag__square" aria-hidden="true" />
          <span className="pp-vm-tag__bar" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
