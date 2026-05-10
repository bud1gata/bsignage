import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Dashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState({ activePhotos: 0, activeTickers: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:5003/api/auth/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setStats(data);
        }
      } catch (err) {
        console.error('Failed to fetch stats');
      }
    };
    if (token) fetchStats();
  }, [token]);

  return (
    <div>
      <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface rounded-xl p-6 shadow border border-outline-variant">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Active Photos</h3>
          <p className="font-display-lg text-display-lg text-primary">{stats.activePhotos}</p>
        </div>
        <div className="bg-surface rounded-xl p-6 shadow border border-outline-variant">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Active Announcements</h3>
          <p className="font-display-lg text-display-lg text-primary">{stats.activeTickers}</p>
        </div>
      </div>
    </div>
  );
}
