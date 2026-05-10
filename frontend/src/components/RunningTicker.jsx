export default function RunningTicker({ items = [], speed = 30, logoUrl = '' }) {
  if (items.length === 0) return null;

  const renderItems = () =>
    items.map((item, index) => (
      <span
        key={index}
        className={`inline-flex items-center gap-3 whitespace-nowrap ${
          item.urgent
            ? 'bg-error/90 text-white px-5 py-2 rounded-full shadow-sm'
            : ''
        }`}
      >
        {item.urgent ? (
          <span className="material-symbols-outlined text-white animate-pulse text-lg">warning</span>
        ) : (
          <span className="inline-block w-2 h-2 rounded-full bg-secondary-fixed shrink-0"></span>
        )}
        <span className={item.urgent ? 'font-bold tracking-wide' : ''}>{item.text}</span>
      </span>
    ));

  return (
    <div className="bg-primary text-on-primary h-20 flex items-center shrink-0 border-t-4 border-secondary overflow-hidden w-full relative z-20">
      <div className="flex items-center px-6 h-full bg-primary-container z-10 shadow-[4px_0_12px_rgba(0,0,0,0.5)]">
        <span className="font-label-bold text-label-bold uppercase tracking-wider text-secondary-fixed whitespace-nowrap pr-4 border-r border-outline/30 flex items-center gap-2">
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="h-10 w-auto object-contain" />
          ) : (
            <span className="material-symbols-outlined align-middle text-xl">rss_feed</span>
          )}
          Campus News
        </span>
      </div>
      <div className="flex-1 overflow-hidden h-full flex items-center">
        <div
          className="inline-flex items-center gap-16 whitespace-nowrap font-body-lg text-body-lg animate-ticker"
          style={{ animationDuration: `${speed}s` }}
        >
          {renderItems()}
          {renderItems()}
        </div>
      </div>
    </div>
  );
}
