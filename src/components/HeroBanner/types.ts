export interface SlideData {
  id: number;
  headline: string;
  subtext: string;
  ctaText: string;
  ctaLink: string;
  badge: string;
  badgeIcon: string;
  countdownHours: number;
  backgroundImage: string;
  accentColor: 'pink' | 'cyan' | 'gold';
}

export interface CountdownTime {
  hours: string;
  minutes: string;
  seconds: string;
}
