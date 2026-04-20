import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Grid, Package, CalendarCheck, Banknote, LogOut, ChevronLeft, Menu } from 'lucide-react';
import useAuthStore from '../../store/authStore';

const Sidebar = () => {
  const { pathname } = useLocation();
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Meja', path: '/admin/tables', icon: <Grid className="w-5 h-5" /> },
    { name: 'Paket', path: '/admin/packages', icon: <Package className="w-5 h-5" /> },
    { name: 'Booking', path: '/admin/bookings', icon: <CalendarCheck className="w-5 h-5" /> },
    { name: 'Transaksi', path: '/admin/transactions', icon: <Banknote className="w-5 h-5" /> },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className={`${collapsed ? 'w-20' : 'w-64'} bg-surface-container-lowest border-r border-outline-variant/10 h-screen flex flex-col fixed z-40 transition-all duration-300`}>
      {/* Logo */}
      <div className="p-4 flex items-center justify-between h-16 border-b border-outline-variant/10">
        <Link to="/" className="flex items-center gap-2 overflow-hidden">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-black text-on-primary-container">VB</span>
          </div>
          {!collapsed && <span className="text-lg font-black tracking-tighter text-on-surface uppercase whitespace-nowrap">Admin</span>}
        </Link>
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-container-high transition-all"
        >
          {collapsed ? <Menu className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path}
              title={item.name}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl font-bold transition-all duration-300 
                ${isActive 
                  ? 'gradient-primary text-on-primary-container glow-primary' 
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }
                ${collapsed ? 'justify-center' : ''}
              `}
            >
              {item.icon}
              {!collapsed && <span className="text-sm">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-outline-variant/10">
        <button 
          onClick={handleLogout}
          className={`flex items-center gap-3 px-3 py-3 w-full text-left text-on-surface-variant hover:text-error hover:bg-error/10 rounded-xl transition-all duration-300 ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="text-sm font-bold">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
