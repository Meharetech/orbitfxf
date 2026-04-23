import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, Search, Menu, User, 
  Settings, ChevronDown, Activity, 
  ShieldCheck, ArrowUpRight 
} from 'lucide-react';
import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070b14] flex font-sans selection:bg-amber-500/30">
      {/* Background Layer */}
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
      
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:pl-72 relative z-10">
        
        {/* Navbar */}
        <header className="sticky top-0 z-40 bg-[#070b14]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 lg:hidden">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all"
            >
              <Menu size={20} />
            </button>
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                <ShieldCheck size={16} className="text-white" />
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4 group">
             <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-500/20 group-hover:border-amber-500/50 transition-all">
                <Activity size={20} className="text-amber-500" />
             </div>
             <div className="leading-tight">
                <h4 className="text-white font-black text-sm uppercase tracking-widest">OrbitFX Node-A1</h4>
                <p className="text-[10px] text-green-500/70 font-bold uppercase tracking-tighter">System Status: Optimal</p>
             </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-3.5 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Global System Search..." 
                className="bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-11 pr-5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500/50 transition-all w-64 lg:w-80"
              />
            </div>

            <div className="flex items-center gap-3 pr-2 border-r border-white/5">
                <button className="relative p-2.5 text-gray-500 hover:text-white bg-white/5 rounded-xl transition-all">
                    <Bell size={20} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-[#070b14] rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
                </button>
                <button className="p-2.5 text-gray-500 hover:text-white bg-white/5 rounded-xl transition-all">
                    <Settings size={20} />
                </button>
            </div>

            <div className="relative">
              <button 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-3 p-1 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-amber-500/20">
                    AD
                </div>
                <div className="hidden sm:block text-left pr-2 leading-tight">
                    <p className="text-white text-xs font-black uppercase tracking-tight">SysAdmin</p>
                    <p className="text-amber-500/60 text-[9px] font-bold uppercase tracking-widest">Level-0 Access</p>
                </div>
                <ChevronDown size={14} className={`text-gray-600 mr-1 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute right-0 mt-4 w-56 bg-[#0a0f1d] border border-white/5 rounded-2xl shadow-2xl p-2 z-50 overflow-hidden"
                  >
                    <div className="p-3 mb-2 border-b border-white/5 bg-white/[0.02]">
                        <p className="text-xs text-gray-600 font-bold uppercase tracking-widest leading-none">Administrative Profile</p>
                        <p className="text-white text-sm font-black mt-2">admin@orbitfx.org</p>
                    </div>
                    <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all text-xs font-bold leading-none">
                      <User size={16} /> Update Profile
                    </button>
                    <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-500/10 text-red-500/70 hover:text-red-500 transition-all text-xs font-bold leading-none">
                      <ShieldCheck size={16} /> Security Settings
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Global Stats Overlay/Strip */}
        <div className="bg-amber-500/10 px-6 py-2 flex items-center gap-8 overflow-x-auto scrollbar-hide border-b border-amber-500/10">
            <div className="flex items-center gap-3 whitespace-nowrap">
                <span className="text-[10px] text-amber-500/60 font-black uppercase tracking-widest">Total Nodes</span>
                <span className="text-xs text-white font-black">12,482</span>
                <div className="flex items-center text-[9px] text-green-500 font-bold">
                    <ArrowUpRight size={10} /> +14
                </div>
            </div>
            <div className="w-px h-3 bg-amber-500/20"></div>
            <div className="flex items-center gap-3 whitespace-nowrap">
                <span className="text-[10px] text-amber-500/60 font-black uppercase tracking-widest">Active Pool</span>
                <span className="text-xs text-white font-black">$452,000</span>
                <div className="flex items-center text-[9px] text-green-500 font-bold">
                    <ArrowUpRight size={10} /> 8%
                </div>
            </div>
            <div className="w-px h-3 bg-amber-500/20"></div>
            <div className="flex items-center gap-3 whitespace-nowrap">
                <span className="text-[10px] text-amber-500/60 font-black uppercase tracking-widest">Pending WD</span>
                <span className="text-xs text-amber-500 font-black">24 Req</span>
            </div>
        </div>

        {/* Dynamic Content Body */}
        <main className="flex-1 p-6 md:p-10 scrollbar-hide">
            <AnimatePresence mode="wait">
                <motion.div
                    key={window.location.pathname}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </main>

        {/* Admin Footer */}
        <footer className="p-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-700">
            <p className="text-[10px] font-bold uppercase tracking-widest italic">OrbitFX Core v2.4.0 Engine</p>
            <div className="flex items-center gap-6">
                 <span className="text-[10px] font-black hover:text-gray-500 cursor-pointer transition-colors">Emergency Protocol</span>
                 <span className="text-[10px] font-black hover:text-gray-500 cursor-pointer transition-colors text-amber-500/50">Admin Center Support</span>
            </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
