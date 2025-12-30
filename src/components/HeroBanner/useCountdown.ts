import { useState, useEffect, useCallback } from 'react';
import { CountdownTime } from './types';

export const useCountdown = (initialHours: number): CountdownTime => {
  const calculateTimeLeft = useCallback(() => {
    const totalSeconds = initialHours * 3600;
    const now = Math.floor(Date.now() / 1000);
    const startTime = Math.floor(Date.now() / 1000) - (now % totalSeconds);
    const elapsed = now - startTime;
    const remaining = totalSeconds - elapsed;

    const hours = Math.floor(remaining / 3600);
    const minutes = Math.floor((remaining % 3600) / 60);
    const seconds = remaining % 60;

    return {
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
    };
  }, [initialHours]);

  const [time, setTime] = useState<CountdownTime>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return time;
};
