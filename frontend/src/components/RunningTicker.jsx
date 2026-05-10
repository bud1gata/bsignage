export default function RunningTicker({ items = [] }) {
  if (items.length === 0) return null;

  return (
    <div className="bg-primary text-on-primary h-20 flex items-center shrink-0 border-t-4 border-secondary overflow-hidden w-full relative z-20">
      <div className="flex items-center px-6 h-full bg-primary-container z-10 shadow-[4px_0_12px_rgba(0,0,0,0.5)]">
        <span className="font-label-bold text-label-bold uppercase tracking-wider text-secondary-fixed whitespace-nowrap pr-4 border-r border-outline/30">
          <span className="material-symbols-outlined align-middle mr-2 text-xl">rss_feed</span> Campus News
        </span>
      </div>
      <div className="flex-1 overflow-hidden h-full flex items-center relative">
        <div className="flex items-center gap-16 px-8 font-body-lg text-body-lg animate-ticker w-max">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-3 shrink-0">
              <span className={`w-2 h-2 rounded-full ${item.urgent ? 'bg-error' : 'bg-secondary-fixed'}`}></span>
              <span>{item.text}</span>
            </div>
          ))}
          {/* Duplicate items for infinite scroll effect */}
          {items.map((item, index) => (
            <div key={`dup-${index}`} className="flex items-center gap-3 shrink-0">
              <span className={`w-2 h-2 rounded-full ${item.urgent ? 'bg-error' : 'bg-secondary-fixed'}`}></span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
