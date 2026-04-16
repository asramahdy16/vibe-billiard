import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { Target, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  const navLinks = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Tentang', href: '#tentang' },
    { label: 'Lokasi', href: '#lokasi' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 glass-nav shadow-[0_20px_40px_-10px_rgba(0,40,93,0.4)]">
      <div className="flex justify-between items-center px-6 lg:px-8 h-16 w-full max-w-screen-2xl mx-auto">
        <Link to="/" className="text-xl font-black tracking-tighter text-on-surface uppercase">
          Vibe Billiard
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className="text-on-surface-variant hover:text-on-surface transition-all duration-300 font-medium">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="text-on-surface-variant hover:text-on-surface font-medium transition-all">Login</Link>
          <Link to="/register" className="btn-primary !px-6 !py-2 text-sm">Daftar</Link>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-on-surface-variant">
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass-panel border-t border-outline-variant/10 px-6 pb-6 pt-2 space-y-3">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block py-2 text-lg font-medium text-on-surface-variant">
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-outline-variant/10 flex gap-3">
            <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1 text-center py-2.5 rounded-xl bg-surface-container-high text-on-surface font-medium">Login</Link>
            <Link to="/register" onClick={() => setMobileOpen(false)} className="flex-1 btn-primary text-center !py-2.5 text-sm">Daftar</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
