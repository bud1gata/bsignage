import { Outlet, Navigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Images, Rss, LogOut } from 'lucide-react';

export default function AdminLayout() {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/admin/gallery', icon: Images, label: 'Gallery' },
    { to: '/admin/ticker', icon: Rss, label: 'Running Text' },
  ];

  return (
    <div className="flex h-screen bg-surface-container-lowest font-body-md">
      <aside className="w-64 bg-surface-container shadow-md flex flex-col">
        <div className="p-6 border-b border-outline-variant">
          <h1 className="font-headline-md text-headline-md text-on-surface">Kampus Admin</h1>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container'
                    : 'text-on-surface hover:bg-surface-variant'
                }`
              }
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}
          <button
            onClick={logout}
            className="mt-auto flex items-center gap-3 px-4 py-3 text-error hover:bg-error-container rounded-lg font-medium transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-auto bg-surface-container-lowest">
        <Outlet />
      </main>
    </div>
  );
}
