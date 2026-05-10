import { useState, useEffect } from 'react';

export default function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  const dateString = time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="absolute top-margin-desktop left-margin-desktop z-10 text-on-primary">
      <div className="font-display-lg text-display-lg drop-shadow-lg">{timeString}</div>
      <div className="font-headline-md text-headline-md opacity-90 drop-shadow-md mt-base">{dateString}</div>
    </div>
  );
}
