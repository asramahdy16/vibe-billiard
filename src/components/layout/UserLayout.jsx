import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { LayoutDashboard, CalendarCheck, Clock, User, LogOut, ChevronLeft, Menu, Target, Home } from 'lucide-react';
import useAuthStore from '../../store/authStore';

const UserLayout = ({ children }) => {
  const { pathname } = useLocation();
  const { user, clearAuth } = useAuthStore();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Booking', path: '/booking', icon: <CalendarCheck className="w-5 h-5" /> },
    { name: 'Riwayat', path: '/my-bookings', icon: <Clock className="w-5 h-5" /> },
    { name: 'Profil', path: '/profile', icon: <User className="w-5 h-5" /> },
  ];

  const handleLogout = () => {
    clearAuth();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside className={`${collapsed ? 'w-20' : 'w-64'} hidden md:flex flex-col bg-surface-container-lowest border-r border-outline-variant/10 h-screen fixed z-40 transition-all duration-300`}>
        {/* Logo */}
        <div className="px-4 flex items-center justify-between h-16 border-b border-outline-variant/10">
          <Link to="/dashboard" className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
              <Target className="w-4 h-4 text-on-primary-container" />
            </div>
            {!collapsed && <span className="text-lg font-black tracking-tighter text-on-surface uppercase whitespace-nowrap">Vibe</span>}
          </Link>
          <button onClick={() => setCollapsed(!collapsed)} className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-container-high transition-all">
            {collapsed ? <Menu className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* User info */}
        {!collapsed && (
          <div className="px-4 py-4 border-b border-outline-variant/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-on-surface truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-on-surface-variant truncate">{user?.email || 'user@email.com'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path === '/booking' && pathname.startsWith('/booking'));
            return (
              <Link key={item.path} to={item.path} title={item.name}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl font-bold transition-all duration-300
                  ${isActive ? 'gradient-primary text-on-primary-container glow-primary' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'}
                  ${collapsed ? 'justify-center' : ''}
                `}>
                {item.icon}
                {!collapsed && <span className="text-sm">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-outline-variant/10 space-y-1">
          <Link to="/" className={`flex items-center gap-3 px-3 py-2.5 w-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-xl transition-all ${collapsed ? 'justify-center' : ''}`}>
            <Home className="w-5 h-5" />
            {!collapsed && <span className="text-sm font-medium">Ke Beranda</span>}
          </Link>
          <button onClick={handleLogout}
            className={`flex items-center gap-3 px-3 py-2.5 w-full text-left text-on-surface-variant hover:text-error hover:bg-error/10 rounded-xl transition-all ${collapsed ? 'justify-center' : ''}`}>
            <LogOut className="w-5 h-5" />
            {!collapsed && <span className="text-sm font-bold">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 w-full z-50 glass-nav shadow-[0_20px_40px_-10px_rgba(0,40,93,0.4)] h-14 flex items-center justify-between px-4">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
            <Target className="w-3.5 h-3.5 text-on-primary-container" />
          </div>
          <span className="text-base font-black tracking-tighter text-on-surface uppercase">Vibe</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/profile" className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
            {user?.name?.charAt(0) || 'U'}
          </Link>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 rounded-t-xl glass-nav border-t border-surface-container-low shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map(item => (
            <Link key={item.path} to={item.path}
              className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1 rounded-2xl transition-all text-[10px] font-medium
                ${(pathname === item.path || (item.path === '/booking' && pathname.startsWith('/booking')))
                  ? 'bg-surface-container-low text-primary' : 'text-on-surface-variant'}`}>
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className={`flex-1 ${collapsed ? 'md:ml-20' : 'md:ml-64'} transition-all duration-300 pt-14 md:pt-0 pb-20 md:pb-0 min-h-screen`}>
        {children}
      </main>
    </div>
  );
};

export default UserLayout;
