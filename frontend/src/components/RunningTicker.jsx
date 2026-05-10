export default function RunningTicker({ items = [] }) {
  if (items.length === 0) return null;

  const hasUrgent = items.some(item => item.urgent);

  return (
    <div className={`${hasUrgent ? 'bg-error/95 text-on-error' : 'bg-primary text-on-primary'} h-20 flex items-center shrink-0 border-t-4 ${hasUrgent ? 'border-red-400' : 'border-secondary'} overflow-hidden w-full relative z-20 transition-colors duration-500`}>
      <div className={`flex items-center px-6 h-full ${hasUrgent ? 'bg-error shadow-red-900/50' : 'bg-primary-container shadow-black/50'} z-10 shadow-[4px_0_12px_var(--tw-shadow-color)] transition-colors duration-500`}>
        <span className={`font-label-bold text-label-bold uppercase tracking-wider ${hasUrgent ? 'text-white' : 'text-secondary-fixed'} whitespace-nowrap pr-4 border-r border-outline/30`}>
          <span className="material-symbols-outlined align-middle mr-2 text-xl">{hasUrgent ? 'warning' : 'rss_feed'}</span> 
          {hasUrgent ? 'Important Alert' : 'Campus News'}
        </span>
      </div>
      <div className="flex-1 overflow-hidden h-full flex items-center relative">
        <div className="flex items-center gap-16 px-8 font-body-lg text-body-lg animate-ticker w-max">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-3 shrink-0">
              <span className={`w-2 h-2 rounded-full ${item.urgent ? (hasUrgent ? 'bg-white animate-pulse' : 'bg-error') : (hasUrgent ? 'bg-white/50' : 'bg-secondary-fixed')}`}></span>
              <span className={item.urgent ? 'font-bold tracking-wide' : ''}>{item.text}</span>
            </div>
          ))}
          {/* Duplicate items for infinite scroll effect */}
          {items.map((item, index) => (
            <div key={`dup-${index}`} className="flex items-center gap-3 shrink-0">
              <span className={`w-2 h-2 rounded-full ${item.urgent ? (hasUrgent ? 'bg-white animate-pulse' : 'bg-error') : (hasUrgent ? 'bg-white/50' : 'bg-secondary-fixed')}`}></span>
              <span className={item.urgent ? 'font-bold tracking-wide' : ''}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
