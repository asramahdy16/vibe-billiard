import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate, startTime, className = '' }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!targetDate || !startTime) return;

    // Construct target datetime
    const [hours, minutes] = startTime.split(':');
    const target = new Date(targetDate);
    target.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = target - now;

      if (diff <= 0) {
        setIsReady(true);
        setTimeLeft('SEKARANG');
        clearInterval(interval);
      } else {
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);
        setTimeLeft(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, startTime]);

  if (!timeLeft) return null;

  return (
    <div className={`font-mono font-bold tracking-widest ${isReady ? 'text-tertiary animate-pulse' : 'text-primary'} ${className}`}>
      {timeLeft}
    </div>
  );
};

export default CountdownTimer;
