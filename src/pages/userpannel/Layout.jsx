import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Menu, Bell, User, Home, Wallet, FileText, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const MOBILE_NAV = [
  { label: 'Home',    icon: Home,     path: '/user/dashboard' },
  { label: 'Network', icon: Users,    path: '/user/network/direct' },
  { label: 'Fund',    icon: Wallet,   path: '/user/fund/request' },
  { label: 'Reports', icon: FileText, path: '/user/report/trading-profit' },
  { label: 'Profile', icon: User,     path: '/user/profile/view' },
];

const DashboardLayout = ({ children }) => {
  // Only controls mobile drawer — desktop sidebar is ALWAYS visible
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user')) || { fullName: 'Trader', referralCode: 'OFX0000' };

  // Auto-close drawer on mobile when navigating
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#060912] text-white">

      {/* ── Sidebar: always fixed on desktop, drawer on mobile ── */}
      {/* Desktop Sidebar — always visible, never hides */}
      <div className="hidden lg:flex fixed top-0 left-0 h-full w-72 z-50">
        <Sidebar />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-72 z-50 lg:hidden transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar onClose={() => setMobileOpen(false)} />
      </div>

      {/* ── Main Content — always offset by 72 on desktop ── */}
      <div className="lg:ml-72 flex flex-col min-h-screen">

        {/* Top Bar */}
        <header className="h-16 lg:h-20 bg-[#060912]/80 backdrop-blur-xl border-b border-white/5 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-30">
          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Mobile Logo */}
          <Link to="/" className="flex items-center gap-2 lg:hidden">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden border border-white/10 shadow-lg">
              <img src="/logo1.jpg" alt="OrbitFX Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-black tracking-tighter">ORBIT<span className="text-electric-blue">FX</span></span>
          </Link>

          {/* Desktop spacer / title */}
          <div className="hidden lg:block" />

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-electric-blue rounded-full animate-pulse"></span>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-white/5">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-white leading-none">{user.fullName?.split(' ')[0]}</p>
                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">{user.referralCode}</p>
              </div>
              <div className="relative">
                <div className="w-9 h-9 bg-orbit-gradient rounded-xl flex items-center justify-center p-[2px]">
                  <div className="w-full h-full bg-[#060912] rounded-[10px] flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-[#060912] rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 pb-24 lg:pb-8">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>

        <footer className="hidden lg:block py-5 text-center text-gray-700 border-t border-white/5 text-xs font-semibold">
          © 2026 OrbitFX Intelligent Trading. All Rights Reserved.
        </footer>
      </div>

      {/* ── Mobile Bottom Nav ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-[#060912]/95 backdrop-blur-xl border-t border-white/10">
        <div className="flex items-center justify-around h-16">
          {MOBILE_NAV.map(({ label, icon: Icon, path }) => {
            const isActive = location.pathname.startsWith(path);
            return (
              <Link key={path} to={path} className="flex flex-col items-center justify-center gap-1 flex-1 py-2">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${isActive ? 'bg-amber-500/20 text-amber-400' : 'text-gray-600'}`}>
                  <Icon size={18} />
                </div>
                <span className={`text-[9px] font-black uppercase tracking-wider ${isActive ? 'text-amber-400' : 'text-gray-700'}`}>
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

    </div>
  );
};

export default DashboardLayout;
