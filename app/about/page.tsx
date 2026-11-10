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
  /** Card position on the 1440 canvas. */
  card: [number, number];
  /** Soft glow drawn behind the card, on the canvas. */
  backGlow: Glow;
  /** Glow drawn inside the card (relative to it). */
  innerGlow: Glow;
  text: {
    pos: [number, number, number, number];
    theme: 'peach' | 'blue';
    radius: number;
    body: [number, number, number];
    lead: string;
    copy: string;
    date: [number, number];
    notch?: 'kshitij' | 'pritisha' | 'tab-left' | 'tab-right';
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
    card: [120, 843],
    backGlow: { src: '/figma/about-e14.svg', x: -13.5, y: 882.5, w: 535, h: 583 },
    innerGlow: { src: '/figma/about-e12.svg', x: -157.5, y: -21.75, w: 480.75, h: 480.75 },
    text: {
      pos: [332, 962, 740, 476],
      theme: 'peach',
      radius: 76,
      body: [141, 57, 480],
      lead: 'Former Head of Global eCommerce at Reckitt, Kshitij brings deep expertise in building and scaling digital businesses across global markets.',
      copy: 'His experience spans Reckitt and P&G, where he worked on large-scale brand building, digital transformation, and consumer engagement. At Passprivé, he focuses on product vision, ecosystem partnerships, and building a globally scalable business model.',
      date: [141, 430],
      notch: 'kshitij',
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
    card: [572.75, 1560.75],
    backGlow: { src: '/figma/about-e17.svg', x: 500.75, y: 1584.75, w: 534, h: 585 },
    innerGlow: { src: '/figma/about-e18.svg', x: -157.5, y: -21.75, w: 480.75, h: 480.75 },
    text: {
      pos: [818, 1417.5, 468, 666],
      theme: 'blue',
      radius: 76,
      body: [61, 61.5, 357.75],
      lead: 'Bruno is a commercial and transformation executive with decades of leadership experience across Mauritius, South Africa, and the Middle East. He brings a broad international perspective together with a deep understanding of commercial strategy, customer experience, and organizational transformation.',
      copy: 'At Passprivé, he leads commercial strategy, partnerships, and market expansion.',
      date: [317, 620],
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
    card: [776, 2246],
    backGlow: { src: '/figma/about-e15.svg', x: 531.75, y: 1974.75, w: 534, h: 585 },
    innerGlow: { src: '/figma/about-e16.svg', x: -201.75, y: -36.75, w: 500.2, h: 500.2 },
    text: {
      pos: [120, 1995.75, 738, 480],
      theme: 'peach',
      radius: 75,
      body: [65, 53, 480],
      lead: 'Pritisha leads technology and product execution, with over a decade of experience across financial services and IT.',
      copy: 'She has worked with S&P, Old Mutual Bank in South Africa, and Tata Consultancy Services, building and managing complex systems at scale. At Passprivé, she drives platform architecture, product reliability, and execution velocity.',
      date: [65, 434],
      notch: 'pritisha',
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
    card: [422.25, 2996.25],
    backGlow: { src: '/figma/about-e17.svg', x: 400.75, y: 2824.5, w: 534, h: 585 },
    innerGlow: { src: '/figma/about-e18.svg', x: -166.5, y: -74.25, w: 480.75, h: 480.75 },
    text: {
      pos: [612, 2595.75, 675, 609],
      theme: 'blue',
      radius: 75,
      body: [65, 121, 537],
      lead: 'Bharat leads engineering execution at Passprivé, focused on building reliable, high-performance product experiences across the platform.',
      copy: 'He works across frontend and backend systems to translate business goals into scalable technical solutions, ensuring fast iteration, product quality, and dependable delivery as the ecosystem grows.',
      date: [501, 563],
      notch: 'tab-left',
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
    card: [724, 3686],
    backGlow: { src: '/figma/about-e14.svg', x: 590.5, y: 3725.5, w: 535, h: 583 },
    innerGlow: { src: '/figma/about-e12.svg', x: -157.5, y: -21.75, w: 480.75, h: 480.75 },
    text: {
      pos: [120, 3325, 672, 680],
      theme: 'peach',
      radius: 45,
      body: [65, 113, 480],
      lead: 'Yeshna brings strong experience across merchant relationships, banking, marketing, operations and customer engagement. Prior to joining Passprivé, she spent several years with SBM Bank (Mauritius), where she worked closely with merchants, supported point-of-sale operations, drove merchant adoption and helped promote banking products and services.',
      copy: 'At Passprivé, Yeshna focuses on building strong merchant relationships, supporting onboarding and driving merchant growth and engagement across the platform.',
      date: [66, 634],
      notch: 'tab-right',
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
const CANVAS_HEIGHT = 4886.25;

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
        {members.map((m) => (
          <section className={`pp-member pp-member--${m.key}`} key={m.key}>
            <img
              className="pa pp-member__backglow"
              src={m.backGlow.src}
              alt=""
              aria-hidden="true"
              style={at(m.backGlow.x, m.backGlow.y, m.backGlow.w, m.backGlow.h)}
            />
            <div className={`pa pp-person pp-person--${m.tone}`} style={at(m.card[0], m.card[1], 268, 368)}>
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
            <article
              className={`pa pp-bio pp-bio--${m.text.theme}`}
              style={{ ...at(...m.text.pos), '--r': m.text.radius } as CSSProperties}
            >
              {m.text.notch && <span className={`pp-bio__notch pp-bio__notch--${m.text.notch}`} aria-hidden="true" />}
              <div className="pa pp-bio__body" style={at(m.text.body[0], m.text.body[1], m.text.body[2])}>
                <p className="pp-bio__lead">{m.text.lead}</p>
                <p className="pp-bio__copy">{m.text.copy}</p>
              </div>
           
            </article>
          </section>
        ))}

        {/* Local operations */}
        <section className="pp-member pp-member--ops">
          <img
            className="pa pp-member__backglow"
            src="/figma/about-e13.svg"
            alt=""
            aria-hidden="true"
            style={at(98.5, 4332.25, 561, 622.5)}
          />
          <div className="pa pp-person pp-person--ops" style={at(370.25, 4436.25, 268, 368)}>
            <img className="pa pp-person__ops-icon" src="/figma/team-ops-icon.png" alt="" style={at(35.43, 147.5, 195.411, 191.25)} />
            <span className="pp-person__ops-tint" aria-hidden="true" />
            <div className="pp-person__name pp-person__name--ops">
              <p className="pp-person__title">On-Ground Execution</p>
              <p className="pp-person__role">LOCAL OPERATIONS</p>
            </div>
          </div>
          <article className="pa pp-bio pp-bio--blue" style={{ ...at(560, 4035.75, 675, 609), '--r': 75 } as CSSProperties}>
            <span className="pp-bio__notch pp-bio__notch--tab-left" aria-hidden="true" />
            <div className="pa pp-bio__body" style={at(65, 121, 537)}>
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
        <div className="pa pp-about-actions" style={at(1060, 4682, 260)}>
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
