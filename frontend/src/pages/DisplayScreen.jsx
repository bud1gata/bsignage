import { useState, useEffect } from 'react';
import DigitalClock from '../components/DigitalClock';
import Slideshow from '../components/Slideshow';
import RunningTicker from '../components/RunningTicker';

export default function DisplayScreen() {
  const [photos, setPhotos] = useState([]);
  const [tickers, setTickers] = useState([]);

  const fetchData = async () => {
    try {
      const [photoRes, tickerRes] = await Promise.all([
        fetch('http://localhost:5003/api/photos'),
        fetch('http://localhost:5003/api/tickers')
      ]);
      const photoData = await photoRes.json();
      const tickerData = await tickerRes.json();
      setPhotos(photoData);
      setTickers(tickerData);
    } catch (err) {
      console.error('Failed to fetch display data');
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-background text-on-background h-screen w-screen overflow-hidden flex flex-col">
      <main className="flex-grow relative w-full bg-surface-container-highest">
        <Slideshow photos={photos} />
        <DigitalClock />
      </main>
      <RunningTicker items={tickers} />
    </div>
  );
}

