import { useState, useEffect } from 'react';
import DigitalClock from '../components/DigitalClock';
import Slideshow from '../components/Slideshow';
import RunningTicker from '../components/RunningTicker';
import API_BASE_URL from '../config/api';

export default function DisplayScreen() {
  const [photos, setPhotos] = useState([]);
  const [tickers, setTickers] = useState([]);
  const [tickerSpeed, setTickerSpeed] = useState(30);
  const [captionSize, setCaptionSize] = useState(1);
  const [captionOpacity, setCaptionOpacity] = useState(80);

  const fetchData = async () => {
    try {
      const [photoRes, tickerRes, settingRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/photos`),
        fetch(`${API_BASE_URL}/api/tickers`),
        fetch(`${API_BASE_URL}/api/settings`)
      ]);
      const photoData = await photoRes.json();
      const tickerData = await tickerRes.json();
      const settingData = await settingRes.json();
      
      setPhotos(photoData);
      setTickers(tickerData);
      if (settingData.tickerSpeed) setTickerSpeed(settingData.tickerSpeed);
      if (settingData.captionSize) setCaptionSize(settingData.captionSize);
      if (settingData.captionOpacity !== undefined) setCaptionOpacity(settingData.captionOpacity);
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
        <Slideshow photos={photos} captionSize={captionSize} captionOpacity={captionOpacity} />
        <DigitalClock />
      </main>
      <RunningTicker items={tickers} speed={tickerSpeed} />
    </div>
  );
}

