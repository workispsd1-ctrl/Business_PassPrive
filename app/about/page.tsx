import Link from 'next/link';
import type { CSSProperties } from 'react';
import { PPLogo } from '@/components/figma/PPLogo';

/** Absolute placement in Figma 1440 frame units (scaled by --u in CSS). */
const at = (x: number, y: number, w?: number, h?: number) =>
  ({ '--x': x, '--y': y, ...(w !== undefined && { '--w': w }), ...(h !== undefined && { '--h': h }) }) as CSSProperties;

type Glow = { src: string; x: number; y: number; w: number; h: number };

type Member = {
  key: string;
  tone: 'blue' | 'peach';
  name: React.ReactNode;
  role: string;
  photo: { src: string; alt: string; style: CSSProperties };
  /** Soft glow drawn behind the card, on the canvas. */
  glow: string;
  /** Glow drawn inside the card (relative to it). */
  innerGlow: Glow;
  text: {
    theme: 'peach' | 'blue';
    lead: string;
    /** One or more body paragraphs. */
    copy: string | string[];
  };
};

/**
 * Shared layout for every team row: identical bio boxes, with the photo card
 * alternating left / right. Row `i` (0-based) is placed on the 1440 canvas.
 */
const ROW = { top: 962, pitch: 660, boxW: 760, boxH: 480, cardW: 268, cardH: 368, cardRise: 119, inset: 212 };
const BODY = { w: 540, pad: 141 };
const rowLayout = (i: number) => {
  const left = i % 2 === 0;
  const boxY = ROW.top + i * ROW.pitch;
  const cardX = left ? 120 : 1320 - ROW.cardW;
  const cardY = boxY - ROW.cardRise;
  const boxX = left ? cardX + ROW.inset : cardX + ROW.cardW - ROW.inset - ROW.boxW;
  return {
    card: at(cardX, cardY, ROW.cardW, ROW.cardH),
    glow: at(cardX - 133.5, cardY + 39.5, 535, 583),
    box: at(boxX, boxY, ROW.boxW, ROW.boxH),
    bodyX: left ? BODY.pad : ROW.boxW - BODY.pad - BODY.w,
  };
};

const members: Member[] = [
  {
    key: 'kshitij',
    tone: 'blue',
    name: (
      <>
        <b>Kshitij</b> <b>Sharma</b>
      </>
    ),
    role: 'FOUNDER & CEO',
    photo: {
      src: '/figma/team-kshitij.png',
      alt: 'Kshitij Sharma',
      style: { ...at(-21.84, 83.86, 311.65, 284.26), objectFit: 'fill' },
    },
    glow: '/figma/about-e14.svg',
    innerGlow: { src: '/figma/about-e12.svg', x: -157.5, y: -21.75, w: 480.75, h: 480.75 },
    text: {
      theme: 'peach',
      lead: 'Former Head of Global eCommerce at Reckitt, Kshitij brings deep expertise in building and scaling digital businesses across global markets.',
      copy: 'His experience spans Reckitt and P&G, where he worked on large-scale brand building, digital transformation, and consumer engagement. At Passprivé, he focuses on product vision, ecosystem partnerships, and building a globally scalable business model.',
    },
  },
  {
    key: 'bruno',
    tone: 'peach',
    name: 'Bruno Rochecouste',
    role: 'CHIEF BUSINESS OFFICER',
    photo: {
      src: '/figma/team-bruno.png',
      alt: 'Bruno Rochecouste',
      style: { ...at(0.25, 76.25, 268, 341) },
    },
    glow: '/figma/about-e17.svg',
    innerGlow: { src: '/figma/about-e18.svg', x: -157.5, y: -21.75, w: 480.75, h: 480.75 },
    text: {
      theme: 'blue',
      lead: 'A senior commercial and business executive, Bruno brings decades of experience across South Africa, Mauritius, and the Middle East, with a strong track record in driving growth, strategic change, and market expansion.',
      copy: ['His experience spans financial services, hospitality, tourism, and real estate, where he has built high-performing teams, repositioned businesses, strengthened customer propositions, and delivered sustainable commercial growth.', 'At Passprivé, Bruno leads and drives the business in Mauritius, with responsibility for commercial strategy, merchant acquisition and growth, strategic partnerships, market development, stakeholder engagement, and the execution of the company’s local growth agenda.'],
    },
  },
  {
    key: 'pritisha',
    tone: 'blue',
    name: 'Pritisha Zalpuri',
    role: 'TECHNOLOGY & PRODUCT',
    photo: {
      src: '/figma/team-pritisha.png',
      alt: 'Pritisha Zalpuri',
      style: { ...at(-0.4, 92, 242.308, 315) },
    },
    glow: '/figma/about-e15.svg',
    innerGlow: { src: '/figma/about-e16.svg', x: -201.75, y: -36.75, w: 500.2, h: 500.2 },
    text: {
      theme: 'peach',
      lead: 'Pritisha leads technology and product execution, with over a decade of experience across financial services and IT.',
      copy: 'She has worked with S&P, Old Mutual Bank in South Africa, and Tata Consultancy Services, building and managing complex systems at scale. At Passprivé, she drives platform architecture, product reliability, and execution velocity.',
    },
  },
  {
    key: 'bharat',
    tone: 'peach',
    name: 'Bharat Nanavathula',
    role: 'FOUNDING ENGINEER',
    photo: {
      src: '/figma/team-bharat-cutout.png',
      alt: 'Bharat Nanavathula',
      style: { ...at(-41, 66, 350, 374) },
    },
    glow: '/figma/about-e17.svg',
    innerGlow: { src: '/figma/about-e18.svg', x: -166.5, y: -74.25, w: 480.75, h: 480.75 },
    text: {
      theme: 'blue',
      lead: 'Bharat leads engineering execution at Passprivé, focused on building reliable, high-performance product experiences across the platform.',
      copy: 'He works across frontend and backend systems to translate business goals into scalable technical solutions, ensuring fast iteration, product quality, and dependable delivery as the ecosystem grows.',
    },
  },
  {
    // Not in the Figma frames — continues the same alternating collage pattern.
    key: 'yeshna',
    tone: 'blue',
    name: 'Yeshna Ramdooharika',
    role: 'HEAD OF MERCHANT GROWTH & PARTNERSHIPS',
    photo: {
      src: '/figma/team-yeshna-cutout.png',
      alt: 'Yeshna Ramdooharika',
      style: { ...at(-26, 96, 320, 326) },
    },
    glow: '/figma/about-e14.svg',
    innerGlow: { src: '/figma/about-e12.svg', x: -157.5, y: -21.75, w: 480.75, h: 480.75 },
    text: {
      theme: 'peach',
      lead: 'Yeshna brings strong experience across merchant relationships, banking, marketing, operations and customer engagement. Prior to joining Passprivé, she spent several years with SBM Bank (Mauritius), where she worked closely with merchants, supported point-of-sale operations, drove merchant adoption and helped promote banking products and services.',
      copy: 'At Passprivé, Yeshna focuses on building strong merchant relationships, supporting onboarding and driving merchant growth and engagement across the platform.',
    },
  },
];

/** Round faces in the team banner (original photos, as in the earlier About page). */
const bannerFaces = [
  '/images/Kshitj.jpeg',
  '/images/Bruno.png',
  '/images/Pritisha.jpeg',
  '/images/Bharat.png',
  '/images/Yeshna.png',
];

/** Height of the page canvas (footer starts here) on the 1440 frame. */
const opsRow = rowLayout(members.length);
const ACTIONS_Y = ROW.top + (members.length + 1) * ROW.pitch - 100;
const CANVAS_HEIGHT = ACTIONS_Y + 220;

export default function AboutPage() {
  return (
    <div className="pp pp-about">
      <div className="pp-canvas pp-about__canvas" style={{ '--h': CANVAS_HEIGHT } as CSSProperties}>
        {/* Team images banner */}
        <div className="pa pp-team-banner" style={at(120, 138, 1200, 420)}>
          <img className="pp-team-banner__glow" src="/figma/about-hero-ellipse.svg" alt="" aria-hidden="true" />
          <PPLogo variant="white" className="pp-team-banner__logo" />
          <div className="pp-team-banner__team">
            <div className="pp-team-banner__faces" aria-hidden="true">
              {bannerFaces.map((src) => (
                <span key={src} style={{ backgroundImage: `url(${src})` }} />
              ))}
            </div>
            <p className="pp-team-banner__note">The team behind Passprivé</p>
          </div>
        </div>

        {/* Intro */}
        <div className="pa pp-about-intro" style={at(120, 624, 617.25)}>
          <span className="pp-chip">About the Team</span>
          <h1 className="pp-h2">
            Built by Operators Who Understand
            <br />
            <em className="pp-serif-accent">Scale, Systems, and Execution</em>
          </h1>
        </div>
        <p className="pa pp-about-lede" style={at(840, 686, 480)}>
          <strong>Passprivé</strong> Platforms Ltd is led by a team with deep experience across consumer internet,
          financial services, hospitality, and global enterprises, with a shared focus on building commercially
          viable, scalable products.
        </p>

        {/* Team members */}
        {members.map((m, i) => {
          const L = rowLayout(i);
          return (
          <section className={`pp-member pp-member--${m.key}`} key={m.key}>
            <img className="pa pp-member__backglow" src={m.glow} alt="" aria-hidden="true" style={L.glow} />
            <div className={`pa pp-person pp-person--${m.tone}`} style={L.card}>
              <img
                className="pa pp-person__glow"
                src={m.innerGlow.src}
                alt=""
                aria-hidden="true"
                style={at(m.innerGlow.x, m.innerGlow.y, m.innerGlow.w, m.innerGlow.h)}
              />
              <div className="pp-person__name">
                <p className="pp-person__title">{m.name}</p>
                <p className="pp-person__role">{m.role}</p>
              </div>
              <img className="pa pp-person__photo" src={m.photo.src} alt={m.photo.alt} style={m.photo.style} />
              <span className="pp-person__fade" aria-hidden="true" />
            </div>
            <article className={`pa pp-bio pp-bio--${m.text.theme}`} style={L.box}>
              <div className="pp-bio__body" style={{ '--bx': L.bodyX, '--bw': BODY.w } as CSSProperties}>
                <p className="pp-bio__lead">{m.text.lead}</p>
                {[m.text.copy].flat().map((c) => (
                  <p className="pp-bio__copy" key={c}>
                    {c}
                  </p>
                ))}
              </div>
            </article>
          </section>
          );
        })}

        {/* Local operations */}
        <section className="pp-member pp-member--ops">
          <img className="pa pp-member__backglow" src="/figma/about-e13.svg" alt="" aria-hidden="true" style={opsRow.glow} />
          <div className="pa pp-person pp-person--ops" style={opsRow.card}>
            <img className="pa pp-person__ops-icon" src="/figma/team-ops-icon.png" alt="" style={at(35.43, 147.5, 195.411, 191.25)} />
            <span className="pp-person__ops-tint" aria-hidden="true" />
            <div className="pp-person__name pp-person__name--ops">
              <p className="pp-person__title">On-Ground Execution</p>
              <p className="pp-person__role">LOCAL OPERATIONS</p>
            </div>
          </div>
          <article className="pa pp-bio pp-bio--blue" style={opsRow.box}>
            <div className="pp-bio__body" style={{ '--bx': opsRow.bodyX, '--bw': BODY.w } as CSSProperties}>
              <p className="pp-bio__lead">
                Our local operations team ensures strong execution across merchant onboarding, partnerships, and
                customer experience.
              </p>
              <p className="pp-bio__copy">
                With deep understanding of market dynamics, the team bridges product capabilities with real-world
                adoption, ensuring both merchants and consumers derive consistent value from the platform.
              </p>
            </div>
          </article>
        </section>

        {/* Actions */}
        <div className="pa pp-about-actions" style={at(590, ACTIONS_Y, 260)}>
          <Link href="/contact" className="pp-btn pp-btn--gradient">
            Partner With Us
            <img src="/figma/ic-trending-flat.svg" alt="" width={24} height={24} />
          </Link>
          <Link href="/mission" className="pp-btn pp-btn--outline">
            <img src="/figma/ic-rocket.svg" alt="" width={24} height={24} />
            Read Mission
          </Link>
        </div>
      </div>
    </div>
  );
}
