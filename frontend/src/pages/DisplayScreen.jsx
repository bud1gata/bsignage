import DigitalClock from '../components/DigitalClock';
import Slideshow from '../components/Slideshow';
import RunningTicker from '../components/RunningTicker';

const mockPhotos = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop',
    title: 'Spring 2024 Registration Opens Next Week',
    description: 'Ensure your academic advising appointments are scheduled before November 1st to guarantee your preferred course selection.'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop',
    title: 'New Library Wing Opens',
    description: 'Join us for the grand opening ceremony of the new North Wing this Friday at 10 AM.'
  }
];

const mockTickerItems = [
  { text: 'Library closing early at 5PM today for maintenance.', urgent: true },
  { text: 'Guest Lecture: Dr. Jane Smith in Science Hall Auditorium at 7PM.', urgent: false },
  { text: 'Varsity Soccer vs State University this Saturday - Tickets available now!', urgent: false },
  { text: 'Cafeteria Special: Taco Tuesday.', urgent: false },
];

export default function DisplayScreen() {
  return (
    <div className="bg-background text-on-background h-screen w-screen overflow-hidden flex flex-col">
      <main className="flex-grow relative w-full bg-surface-container-highest">
        <Slideshow photos={mockPhotos} />
        <DigitalClock />
      </main>
      <RunningTicker items={mockTickerItems} />
    </div>
  );
}

