import { useState, useEffect } from 'react';

export default function Slideshow({ photos = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (photos.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 10000); // 10 seconds
    return () => clearInterval(interval);
  }, [photos]);

  if (photos.length === 0) return <div className="absolute inset-0 bg-surface-container-highest" />;

  const currentPhoto = photos[currentIndex];

  return (
    <>
      {photos.map((photo, index) => (
        <div
          key={photo.id}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url('${photo.url}')` }}
        >
          {/* Overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-primary/40"></div>
        </div>
      ))}

      {/* Caption Bar */}
      {currentPhoto?.title && (
        <div className="absolute bottom-margin-desktop left-margin-desktop right-margin-desktop z-10 transition-opacity duration-500">
          <div className="bg-inverse-surface/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-outline/20 max-w-4xl animate-[fade-in_0.5s_ease-out]">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-secondary-fixed text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                campaign
              </span>
              <div>
                <h2 className="font-headline-lg text-headline-lg text-on-primary mb-2">{currentPhoto.title}</h2>
                {currentPhoto.description && (
                  <p className="font-body-lg text-body-lg text-surface-variant">{currentPhoto.description}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide Indicators */}
      {photos.length > 1 && (
        <div className="absolute bottom-margin-desktop right-margin-desktop z-10 flex gap-2">
          {photos.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === currentIndex ? 'w-12 bg-secondary-fixed' : 'w-3 bg-surface-variant/50'
              }`}
            ></div>
          ))}
        </div>
      )}
    </>
  );
}
