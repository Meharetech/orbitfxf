import React, { useState, useEffect } from 'react';
import api from '../../api/apiConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, User, Users, Share2, 
  Wallet, FileText, CreditCard, LogOut, 
  ChevronDown, Activity, X,
  FolderTree, UserPlus, UserCheck, 
  TrendingUp, History, Send, Download, 
  Award, Briefcase, BarChart3,
  Key, Wallet2, PlusCircle, BadgeCheck
} from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/user/dashboard',
  },
  {
    title: 'Profile',
    icon: User,
    id: 'profile',
    subItems: [
      { title: 'View Profile',     path: '/user/profile/view',     icon: UserCheck },
      { title: 'Change Password',  path: '/user/profile/password', icon: Key },
      { title: 'Add Wallet',       path: '/user/profile/wallet',   icon: Wallet2 },
    ]
  },
  {
    title: 'My Network',
    icon: Users,
    id: 'network',
    subItems: [
      { title: 'Direct Team', path: '/user/network/direct', icon: UserPlus },
      { title: 'Level Team',  path: '/user/network/level',  icon: UserPlus },
      { title: 'Left Team',   path: '/user/network/left',   icon: UserPlus },
      { title: 'Right Team',  path: '/user/network/right',  icon: UserPlus },
      { title: 'Tree View',   path: '/user/network/tree',   icon: FolderTree },
    ]
  },
  {
    title: 'Top Up',
    icon: Share2,
    id: 'topup',
    subItems: [
      { title: 'Portfolio Investment', path: '/user/topup/investment', icon: Activity },
      { title: 'Activation',           path: '/user/topup/activation', icon: Key },
      { title: 'Activation History',   path: '/user/topup/history',    icon: History },
    ]
  },
  {
    title: 'Fund',
    icon: Wallet,
    id: 'fund',
    subItems: [
      { title: 'Fund Request',          path: '/user/fund/request',          icon: PlusCircle },
      { title: 'Fund Request History',  path: '/user/fund/request-history',  icon: History },
      { title: 'Fund Transfer',         path: '/user/fund/transfer',         icon: Send },
      { title: 'Fund Transfer History', path: '/user/fund/transfer-history', icon: History },
      { title: 'Fund Received History', path: '/user/fund/received-history', icon: History },
    ]
  },
  {
    title: 'Report',
    icon: FileText,
    id: 'report',
    subItems: [
      { title: 'Trading Profit Income', path: '/user/report/trading-profit',  icon: BarChart3 },
      { title: 'Referral Income',       path: '/user/report/referral-income', icon: Users },
      { title: 'Direct Referral Reward',path: '/user/report/direct-reward',   icon: Award },
      { title: 'Pair Matching Reward',  path: '/user/report/pair-reward',     icon: Briefcase },
      { title: 'Pair Matching Monthly', path: '/user/report/pair-monthly',    icon: Activity },
      { title: 'Trading Profit Level',  path: '/user/report/trading-level',   icon: TrendingUp },
    ]
  },
  {
    title: 'Withdrawal',
    icon: CreditCard,
    id: 'withdrawal',
    subItems: [
      { title: 'Withdrawal',         path: '/user/withdrawal',         icon: Download },
      { title: 'Withdrawal History', path: '/user/withdrawal/history', icon: History },
    ]
  }
];

const Sidebar = ({ onClose }) => {
  const [profile, setProfile] = useState(null);
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState('');
  const user = JSON.parse(localStorage.getItem('user')) || { fullName: 'Trader', referralCode: 'OFX0000' };

  useEffect(() => {
    const fetchProfile = async () => {
        try {
            const res = await api.get('/auth/profile');
            setProfile(res.data);
        } catch (err) { }
    };
    fetchProfile();
  }, [user.token]);

  const toggleMenu = (id) => setOpenMenu(openMenu === id ? '' : id);

  return (
    <div className="w-full h-full bg-[#08091a] border-r border-white/[0.06] flex flex-col overflow-hidden">
      
      {/* Header */}
      <div className="px-6 py-6 border-b border-white/[0.06] flex items-center justify-between shrink-0">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden border border-white/10 shadow-lg shadow-electric-blue/10">
            <img src="/logo1.jpg" alt="OrbitFX Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-lg font-black tracking-tighter text-white">ORBIT<span className="text-electric-blue">FX</span></span>
        </Link>
        {/* Close btn for mobile only */}
        {onClose && (
          <button onClick={onClose} className="p-1.5 text-gray-600 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <X size={18} />
          </button>
        )}
      </div>

      {/* User Badge */}
      <div className="px-4 py-4 shrink-0">
        <div className="flex items-center gap-3 p-3 bg-white/[0.03] rounded-2xl border border-white/[0.05]">
          <div className="w-9 h-9 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
             <img src="/logo1.jpg" alt="OrbitFX Logo" className="w-full h-full object-cover opacity-80" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-white font-black text-sm truncate uppercase tracking-tight">{profile?.fullName || user.fullName}</p>
              {profile?.isActivated && (
                <BadgeCheck size={14} className="text-blue-500 fill-blue-500/20 shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
                <p className="text-electric-blue text-[10px] font-black uppercase tracking-widest">{profile?.referralCode || user.referralCode}</p>
                <div className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${profile?.isActivated ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                    {profile?.isActivated ? 'VIP' : 'Inactive'}
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation — scrollable */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
        {menuItems.map((item) => (
          <div key={item.title}>
            {item.subItems ? (
              <>
                <button
                  onClick={() => toggleMenu(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-sm ${
                    openMenu === item.id ? 'bg-white/[0.06] text-white' : 'text-gray-500 hover:bg-white/[0.04] hover:text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-[18px] h-[18px] shrink-0" />
                    <span className="font-semibold truncate">{item.title}</span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${openMenu === item.id ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {openMenu === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden ml-4 border-l border-white/[0.06] pl-3 mt-0.5 space-y-0.5"
                    >
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          onClick={onClose}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all ${
                            location.pathname === sub.path
                              ? 'bg-orbit-gradient text-white font-bold'
                              : 'text-gray-600 hover:text-gray-300 hover:bg-white/[0.04]'
                          }`}
                        >
                          <sub.icon className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{sub.title}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <Link
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  location.pathname === item.path
                    ? 'bg-orbit-gradient text-white font-bold'
                    : 'text-gray-500 hover:bg-white/[0.04] hover:text-gray-300'
                }`}
              >
                <item.icon className="w-[18px] h-[18px] shrink-0" />
                <span className="font-semibold truncate">{item.title}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Activation Prompt */}
      <AnimatePresence>
        {(!user.isActivated) && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 pb-2 shrink-0"
          >
            <Link 
              to="/user/topup/activation"
              className="group block p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl hover:bg-amber-500/10 transition-all border-dashed"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
                  <Key size={14} className="group-hover:rotate-12 transition-transform" />
                </div>
                <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Security Protocol</p>
              </div>
              <p className="text-[9px] text-gray-500 font-bold uppercase leading-relaxed">
                Node Activation <span className="text-white">Required</span> to unlock matching rewards.
              </p>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout */}
      <div className="p-3 border-t border-white/[0.06] shrink-0">
        <Link
          to="/"
          onClick={() => localStorage.removeItem('user')}
          className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:text-red-400 hover:bg-red-400/[0.06] rounded-xl transition-all text-sm"
        >
          <LogOut className="w-[18px] h-[18px] shrink-0" />
          <span className="font-bold">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
