import slide1Bg from '@/assets/slide-1-bg.jpg';
import slide2Bg from '@/assets/slide-2-bg.jpg';
import slide3Bg from '@/assets/slide-3-bg.jpg';
import { SlideData } from './types';

export const slides: SlideData[] = [
  {
    id: 1,
    headline: "Flash Sale — Anime Drops",
    subtext: "Limited-time deals on trending titles, figures, and apparel. Don't miss out!",
    ctaText: "Shop Now",
    ctaLink: "#shop",
    badge: "UP TO 50% OFF",
    badgeIcon: "tag",
    countdownHours: 48,
    backgroundImage: slide1Bg,
    accentColor: 'pink',
  },
  {
    id: 2,
    headline: "Collector Bundle — Limited Stock",
    subtext: "Premium figurines, exclusive manga sets, and rare collector items. While supplies last.",
    ctaText: "Grab Bundle",
    ctaLink: "#bundles",
    badge: "EXCLUSIVE DEAL",
    badgeIcon: "gift",
    countdownHours: 24,
    backgroundImage: slide2Bg,
    accentColor: 'cyan',
  },
  {
    id: 3,
    headline: "New Release — Intro Discount",
    subtext: "Be first to own the latest drops with special introductory pricing.",
    ctaText: "Preorder",
    ctaLink: "#preorder",
    badge: "EARLY ACCESS",
    badgeIcon: "sparkles",
    countdownHours: 72,
    backgroundImage: slide3Bg,
    accentColor: 'gold',
  },
];
