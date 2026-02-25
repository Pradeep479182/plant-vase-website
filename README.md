# 🌿 Verdana – Plant Vase Studio Website

A professional, animated React + TypeScript website for a handcrafted plant vase brand.  
Built with Vite, CSS Modules, and pure CSS animations — no external animation libraries required.

---

## 📁 Project Structure

```
plant-vase-website/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.tsx            # Sticky nav with mobile menu & scroll effect
│   │   ├── Navbar.module.css
│   │   ├── Hero.tsx              # Full-height hero with animated SVG vase
│   │   ├── Hero.module.css
│   │   ├── VaseSVG.tsx           # Custom animated SVG vase illustration
│   │   ├── VaseSVG.module.css
│   │   ├── Features.tsx          # 4-column features grid
│   │   ├── Features.module.css
│   │   ├── Collection.tsx        # Product grid with hover effects
│   │   ├── Collection.module.css
│   │   ├── Process.tsx           # Interactive process stepper
│   │   ├── Process.module.css
│   │   ├── Testimonials.tsx      # Rotating testimonial carousel
│   │   ├── Testimonials.module.css
│   │   ├── Newsletter.tsx        # Email signup section
│   │   ├── Newsletter.module.css
│   │   ├── Footer.tsx            # Multi-column footer
│   │   ├── Footer.module.css
│   │   ├── FloatingPetals.tsx    # Ambient falling petals animation
│   │   └── FloatingPetals.module.css
│   ├── styles/
│   │   └── global.css            # Design tokens, keyframes, utilities
│   ├── App.tsx                   # Root component + custom cursor logic
│   └── main.tsx                  # React entry point
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone or download the project
cd plant-vase-website

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## ✨ Features & Animations

### Custom Cursor
- Dual-layer cursor (dot + follower) with lag for organic feel
- Hover state changes color and size when over interactive elements

### Hero Section
- Full-height landing with animated SVG vase illustration
- Floating vase with gentle breathing motion
- Orbiting ring decoration
- Animated scroll hint

### SVG Vase Illustration
- Fully hand-crafted SVG with gradient fills
- Animated leaves with swaying motion
- Bobbing flowers with petal animations
- Stem sway effect
- Floating shadow

### Floating Petals
- Ambient 🌸 🍃 ✿ ❀ particles falling across the page
- Randomized size, speed, position, and opacity
- Auto-managed DOM count (max 12 petals at once)

### Product Collection
- 4-column product grid
- Mini SVG vases per product with unique colors
- Hover overlay with Quick Add + Wishlist buttons
- Staggered entrance animations

### Process Section
- Dark-themed section with interactive step selector
- Auto-cycling every 3 seconds
- Animated card transitions and progress dots

### Intersection Observer Animations
- All sections animate in when scrolled into view
- Staggered delays for sequential reveals
- Uses `fadeUp`, `scaleIn`, `fadeIn` keyframe classes

---

## 🎨 Design System

### Color Palette
| Token | Hex | Usage |
|---|---|---|
| `--cream` | `#f5f0e8` | Backgrounds |
| `--warm-white` | `#faf8f4` | Cards |
| `--sage` | `#7a9e7e` | Primary brand |
| `--sage-dark` | `#5a7a5e` | CTAs, accents |
| `--earth` | `#8b6f47` | Warm accents |
| `--terracotta` | `#c4704a` | Highlights |
| `--charcoal` | `#2c2c2c` | Text, dark sections |

### Typography
- **Display**: Cormorant Garamond (serif) — for headlines, prices, numbers
- **Body**: DM Sans (sans-serif) — for UI text, labels, descriptions

### Easing
- `--ease-organic`: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- `--ease-bounce`: `cubic-bezier(0.34, 1.56, 0.64, 1)`

---

## 🛠 Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| CSS Modules | Scoped component styles |
| Google Fonts | Cormorant Garamond + DM Sans |

---

## 📱 Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| `> 900px` | Full desktop layout |
| `≤ 900px` | 2-col grids, stacked hero |
| `≤ 768px` | Mobile nav overlay |
| `≤ 480px` | Single-column, compact spacing |

---

## 🌱 Extending the Project

### Add a new product
Edit the `products` array in `Collection.tsx`:
```tsx
{
  id: 5,
  name: 'Your Vase Name',
  subtitle: 'Glaze series name',
  price: '$XXX',
  tag: 'New' | null,
  color: '#hexcolor',
  accent: '#hexcolor',
  height: 'XX cm',
}
```

### Change the color palette
Edit CSS variables in `src/styles/global.css` inside `:root`.

### Add a new page section
1. Create `src/components/MySection.tsx`
2. Create `src/components/MySection.module.css`
3. Import and add to `App.tsx`

---

## 📄 License

MIT — free for personal and commercial use.

---

*Crafted with care, just like the vases themselves.*
