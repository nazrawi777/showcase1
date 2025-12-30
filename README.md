# Anime Store Hero Banner

A production-ready, high-converting hero banner for anime-themed e-commerce stores. Features a smooth 3-slide carousel with countdown timers, pure CSS/JS animations, and full accessibility support.

## Features

- **3 Unique Slides** with distinct headlines, subtexts, countdown timers, and CTAs
- **Smooth Animations** using pure CSS/JS (no GSAP or external animation libraries)
- **Countdown Timers** that are configurable per slide (48h, 24h, 72h)
- **Autoplay** with configurable interval, pause on hover/focus
- **Touch Swipe Support** for mobile devices
- **Keyboard Navigation** (left/right arrows, Home/End keys)
- **Accessible** with ARIA labels, focus states, semantic HTML
- **Reduced Motion Support** respects `prefers-reduced-motion`
- **Fully Responsive** for desktop and mobile
- **No-JS Fallback** displays first slide statically

## Structure

```
├── public/                 # Static export (production asset)
│   ├── index.html         # Standalone HTML file
│   ├── css/
│   │   └── style.css      # All styles
│   ├── js/
│   │   └── main.js        # Vanilla JavaScript
│   └── assets/
│       └── images/        # Background images
│
└── src/                   # React source (live preview)
    ├── components/
    │   └── HeroBanner/    # React component files
    ├── assets/            # Source images
    └── pages/
        └── Index.tsx      # Main page
```

## Phase A: React (Live Preview)

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The React version will run at `http://localhost:5173` with hot reload.

### React Component Usage

```tsx
import { HeroBanner } from '@/components/HeroBanner';

function App() {
  return <HeroBanner />;
}
```

## Phase B: Static Export (Production Asset)

The static export in `public/` is ready to use immediately.

### Quick Start

Simply open `public/index.html` in any browser. All paths are relative, no build step required.

### Integration

Copy the following files to your project:

1. **HTML** - Copy the `<section id="hero-banner">` from `public/index.html`
2. **CSS** - Include `public/css/style.css`
3. **JavaScript** - Include `public/js/main.js` before `</body>`
4. **Assets** - Copy `public/assets/` folder

### CDN/External Fonts

The banner uses Google Fonts. Include in your `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

## Customization

### Slide Content

Edit the HTML in `public/index.html`:

- `data-countdown-hours` - Set countdown duration per slide
- Headlines, subtexts, badge text, CTA text and links

### Autoplay Interval

In `public/js/main.js`, modify:

```javascript
const CONFIG = {
  autoplayInterval: 5000, // milliseconds
  // ...
};
```

### Colors

Modify CSS custom properties in `public/css/style.css`:

```css
:root {
  --neon-pink: 320 100% 60%;
  --neon-cyan: 185 100% 50%;
  --neon-gold: 45 100% 55%;
}
```

### Background Images

Replace images in `public/assets/images/`:

- `slide-1-bg.jpg` - Flash Sale background
- `slide-2-bg.jpg` - Collector Bundle background
- `slide-3-bg.jpg` - New Release background

Recommended size: 1920x1080px, optimized for web.

## Accessibility

- ARIA roles and labels for carousel, slides, navigation
- Keyboard navigation (← → Home End)
- Focus indicators on all interactive elements
- Respects `prefers-reduced-motion` preference
- Semantic HTML structure

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance Tips

1. Optimize images with WebP format where supported
2. Preload hero images for faster LCP
3. Consider lazy loading for below-fold content

## License

MIT License - Free for commercial and personal use.
