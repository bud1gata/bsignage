export default function Dashboard() {
  return (
    <div>
      <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface rounded-xl p-6 shadow border border-outline-variant">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Active Photos</h3>
          <p className="font-display-lg text-display-lg text-primary">5</p>
        </div>
        <div className="bg-surface rounded-xl p-6 shadow border border-outline-variant">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Active Announcements</h3>
          <p className="font-display-lg text-display-lg text-primary">3</p>
        </div>
      </div>
    </div>
  );
}
