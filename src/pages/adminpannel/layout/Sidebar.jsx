import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  BarChart3, Users, Network, Settings, 
  LogOut, ShieldCheck, Wallet, 
  History, UserPlus, Menu, X, Landmark, 
  LayoutDashboard, TrendingUp, HandCoins, Activity
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const menuCategories = [
    {
      label: 'Main Overview',
      items: [
        { title: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/admin/dashboard' },
      ]
    },
    {
      label: 'User Management',
      items: [
        { title: 'User List', icon: <Users size={18} />, path: '/admin/users' },
        { title: 'Direct Team', icon: <UserPlus size={18} />, path: '/admin/network/direct' },
        { title: 'Level Matrix (L - R)', icon: <Network size={18} />, path: '/admin/network/levels' },
      ]
    },
    {
      label: 'Financial Control',
      items: [
        { title: 'Daily Investment % give', icon: <Landmark size={18} />, path: '/admin/investments' },
        { title: 'Deposit Funds Approvals', icon: <History size={18} />, path: '/admin/funds' },
        { title: 'portfolio Withdrawals', icon: <Landmark size={18} />, path: '/admin/investment-withdrawals' },
        { title: 'Withdrawal Funds Approvals', icon: <HandCoins size={18} />, path: '/admin/withdrawals' },
        { title: 'Add Payment Gateways', icon: <Wallet size={18} />, path: '/admin/payments' },
      ]
    },
    {
      label: 'Reports & Analytics',
      items: [
        { title: '% Investment Reports', icon: <TrendingUp size={18} />, path: '/admin/reports' },
        { title: 'Admin edit wallet', icon: <ShieldCheck size={18} />, path: '/admin/adjustment-history' },
      ]
    },
    {
      label: 'System Settings',
      items: [
        { title: 'Platform Settings', icon: <Settings size={18} />, path: '/admin/settings' },
      ]
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside className={`fixed inset-y-0 left-0 w-72 bg-[#0a0f1d] border-r border-white/5 z-50 transform lg:translate-x-0 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-8 border-b border-white/5 bg-[#070b14]/50">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0a0f1d] border border-white/10 rounded-xl flex items-center justify-center shadow-lg shadow-white/5 overflow-hidden">
                    <img src="/logo1.jpg" alt="OrbitFX Logo" className="w-full h-full object-cover" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-white leading-none">ORBIT<span className="text-amber-500">FX</span></h2>
                    <p className="text-[10px] font-black tracking-widest text-amber-500/80 uppercase mt-1">Admin Panel</p>
                </div>
             </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-4 py-6 scrollbar-hide space-y-8">
            {menuCategories.map((category, catIndex) => (
              <div key={catIndex} className="space-y-2">
                <h4 className="px-4 text-[9px] font-black uppercase text-gray-600 tracking-[0.2em] mb-4">
                  {category.label}
                </h4>
                <div className="space-y-1">
                  {category.items.map((item, index) => (
                    <NavLink
                      key={index}
                      to={item.path}
                      onClick={() => window.innerWidth < 1024 && toggleSidebar()}
                      className={({ isActive }) => `
                        flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden
                        ${isActive 
                          ? 'bg-amber-500/10 text-amber-500 shadow-[0_4px_15px_-5px_rgba(245,158,11,0.2)]' 
                          : 'text-gray-500 hover:text-white hover:bg-white/[0.03]'}
                      `}
                    >
                      {({ isActive }) => (
                        <>
                          <div className={`${isActive ? 'text-amber-500' : 'group-hover:text-amber-500/50 transition-colors'}`}>
                            {item.icon}
                          </div>
                          <span className="font-bold text-xs tracking-wide uppercase italic">{item.title}</span>
                          {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-amber-500 rounded-r-full"></div>
                          )}
                        </>
                      )}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Footer Control */}
          <div className="p-6 border-t border-white/5 bg-[#070b14]/50">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-4 w-full px-4 py-4 text-red-500/70 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all duration-300 font-bold text-sm group"
            >
              <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
              <span>System Log-Out</span>
            </button>
            <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-amber-500" />
                </div>
                <div className="leading-tight">
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Active System</p>
                    <p className="text-[9px] text-amber-500/70 font-bold">Latency: 14ms</p>
                </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
