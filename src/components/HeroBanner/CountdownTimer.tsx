import React from 'react';
import { useCountdown } from './useCountdown';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  hours: number;
  accentColor: 'pink' | 'cyan' | 'gold';
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ hours, accentColor }) => {
  const time = useCountdown(hours);

  const getColorClasses = () => {
    switch (accentColor) {
      case 'pink':
        return 'text-primary border-primary/30 bg-primary/10';
      case 'cyan':
        return 'text-secondary border-secondary/30 bg-secondary/10';
      case 'gold':
        return 'text-accent border-accent/30 bg-accent/10';
    }
  };

  const getGlowClass = () => {
    switch (accentColor) {
      case 'pink':
        return 'text-glow-pink';
      case 'cyan':
        return 'text-glow-cyan';
      case 'gold':
        return 'text-glow-gold';
    }
  };

  return (
    <div 
      className="hero-timer flex items-center gap-3"
      role="timer"
      aria-label={`Sale ends in ${time.hours} hours, ${time.minutes} minutes, and ${time.seconds} seconds`}
    >
      <Clock className={`w-5 h-5 ${getColorClasses().split(' ')[0]}`} aria-hidden="true" />
      <span className="text-muted-foreground font-body text-sm uppercase tracking-wider">
        Ends in
      </span>
      <div className="flex items-center gap-1">
        <div className={`timer-digit px-3 py-2 rounded-lg border font-display text-2xl font-bold ${getColorClasses()} ${getGlowClass()}`}>
          {time.hours}
        </div>
        <span className="text-muted-foreground text-xl font-bold">:</span>
        <div className={`timer-digit px-3 py-2 rounded-lg border font-display text-2xl font-bold ${getColorClasses()} ${getGlowClass()}`}>
          {time.minutes}
        </div>
        <span className="text-muted-foreground text-xl font-bold">:</span>
        <div className={`timer-digit px-3 py-2 rounded-lg border font-display text-2xl font-bold ${getColorClasses()} ${getGlowClass()}`}>
          {time.seconds}
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
