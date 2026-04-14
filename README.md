# Pass Privé — Landing Page

## Project Overview
A high-quality, fully responsive marketing landing page for **Pass Privé**, Mauritius' #1 Lifestyle Membership Platform. Built to serve as a pitch tool for the Chief Business Officer (Bruno) when approaching merchants, corporates, and financial institutions.

## Live URL
`index.html` — Root landing page

---

## Completed Features

### ✅ Sections
1. **Navbar** — Sticky, scroll-aware, mobile hamburger menu, active section highlight
2. **Hero** — Full-screen dark hero with animated phone mockup, floating stats, and animated background shapes
3. **The Problem** — Four-audience pain point cards (Consumers, Merchants, Corporates, Banks)
4. **Solution** — Ecosystem diagram, platform pillars
5. **Merchants** — Full detail section with 3 interactive feature showcases:
   - Table Booking widget mockup
   - QR Code Menu mockup
   - Order & Collect mockup
   - 6-card extras grid
   - CTA bar
6. **Corporates** — 4 value-prop cards, numbered benefit list, 3-tier pricing (Silver/Gold/Platinum)
7. **Banks & Financial Institutions** — Stats panel, 6 feature cards, 4 partnership models, CTA
8. **Consumers** — App UI mockup, 5 benefit rows, 3-tier membership cards
9. **Numbers** — 6 key metrics in dark section
10. **Roadmap** — 4-year visual timeline (2026–2029)
11. **Contact Form** — Audience selector + form with success state
12. **Footer** — Full links, social icons, tagline

### ✅ Design Features
- Dark / warm / light section alternation for visual rhythm
- DM Serif Display (headings) + Inter (body) typography
- Gold brand palette (#C9A84C) throughout
- Animated floating phone mockup
- Scroll-triggered fade-in animations on all cards
- Parallax background shapes in hero
- Fully responsive down to 320px

### ✅ Interactivity
- Navbar scroll effect + mobile hamburger
- Smooth anchor scrolling
- Scroll-triggered entrance animations (custom AOS)
- Active nav link highlighting
- Interactive table slot selection in booking widget
- QR cart quantity buttons
- Contact form audience selector with contextual placeholders
- Form success state

---

## Audience Focus
| Audience | Section | Key Messages |
|---|---|---|
| **Merchants** | `#merchants` | Table booking, QR menus, Order & Collect, loyalty, analytics |
| **Corporates** | `#corporates` | Staff benefits, customer rewards, white-label, zero admin |
| **Banks / Fintech** | `#banks` | Daily engagement, card usage, BNPL, loyalty points, acquiring |
| **Consumers** | `#consumers` | Discover, save, book, earn points |

---

## Tech Stack
- Pure HTML5, CSS3, Vanilla JavaScript
- Google Fonts: DM Serif Display + Inter
- Font Awesome 6.5 (CDN)
- No frameworks, no build step — deploy-ready

## File Structure
```
index.html
style.css
main.txt
vercel.json
README.md
```

## Local Preview
Open `index.html` directly in your browser, or run a simple local server:

```bash
cd /Users/Bharat/Work/Nandak/PassPrive_Business
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## GitHub + Vercel Deployment
This project is a static site, so there is no build step.

1. Initialize Git locally:
   ```bash
   cd /Users/Bharat/Work/Nandak/PassPrive_Business
   git init
   git add .
   git commit -m "Initial landing page"
   ```
2. Create a new empty GitHub repository.
3. Connect your local folder to GitHub and push:
   ```bash
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
4. In Vercel, import the GitHub repository and deploy it.

Vercel will automatically redeploy whenever you push new commits to GitHub.

---

## Next Steps / Enhancements
- [ ] Add real merchant logos / partner testimonials
- [ ] Integrate a video demo / app walkthrough
- [ ] Add a pricing section for merchant subscription tiers
- [ ] Connect contact form to a backend or email service (e.g. Formspree)
- [ ] Add Google Analytics / Meta Pixel
- [ ] A/B test hero CTAs for Merchants vs Corporates
- [ ] Localise to French for broader Mauritius reach
