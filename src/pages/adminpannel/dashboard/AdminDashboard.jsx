import React, { useState, useEffect } from 'react';
import api from '../../../api/apiConfig';
import { motion } from 'framer-motion';
import { 
  Users, TrendingUp, Wallet, ShieldCheck, 
  ArrowUpRight, ArrowDownRight, Activity, 
  MapPin, Globe, Clock, Landmark, UserPlus 
} from 'lucide-react';

const StatCard = ({ title, value, change, icon, color }) => (
  <div className="glass-card p-6 border-white/5 bg-white/[0.02] relative overflow-hidden group hover:border-white/10 transition-all">
    <div className={`absolute -right-4 -top-4 w-24 h-24 blur-[50px] opacity-10 rounded-full bg-${color}-500 group-hover:opacity-20 transition-all duration-700`}></div>
    <div className="flex flex-col gap-4 relative z-10">
      <div className="flex items-center justify-between">
        <div className={`w-12 h-12 rounded-2xl bg-${color}-500/10 flex items-center justify-center border border-${color}-500/20`}>
          {React.cloneElement(icon, { className: `text-${color}-500` })}
        </div>
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${change > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
          {change > 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
          {Math.abs(change)}%
        </div>
      </div>
      <div>
        <p className="text-gray-500 text-xs font-black uppercase tracking-widest leading-none mb-2">{title}</p>
        <h3 className="text-3xl font-black text-white">{value}</h3>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await api.get('/admin/dashboard-stats');
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching admin stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="w-12 h-12 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">Loading Global Analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">System Overview</h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">Administrative Command Center • Global Analytics</p>
        </div>
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 shadow-xl">
           <div className="flex items-center gap-2 pr-6 border-r border-white/10">
                <Globe size={18} className="text-amber-500" />
                <span className="text-xs text-white font-black uppercase">Live System Users</span>
           </div>
           <div className="flex items-center gap-4">
                <div className="text-right leading-none">
                    <p className="text-xs text-white font-black">{stats?.totalUsers || 0} Total Profiles</p>
                    <p className="text-[9px] text-gray-600 font-bold uppercase tracking-tighter">Connected User Network</p>
                </div>
           </div>
        </div>
      </div>

      {/* Stats Grid - Financial */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Total Network Assets" value={`$${stats?.totalAssets?.toLocaleString() || '0'}`} change={1} icon={<Wallet size={20} />} color="emerald" />
        <StatCard title="Total Approved Recharges" value={`$${stats?.totalRecharges?.toLocaleString() || '0'}`} change={8.4} icon={<Activity size={20} />} color="blue" />
        <StatCard title="Total Distributed ROI" value={`$${stats?.totalRoi?.toLocaleString() || '0'}`} change={12.5} icon={<Landmark size={20} />} color="amber" />
        <StatCard title="VIP Plan Users" value={stats?.totalActivePlanUsers || 0} change={5} icon={<Users size={20} />} color="crypto-violet" />
      </div>

      {/* Stats Grid - Network */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Total Registered Users" value={stats?.totalUsers || 0} change={1} icon={<ShieldCheck size={20} />} color="blue" />
        <StatCard title="Today's New Users" value={stats?.newUsersToday || 0} change={stats?.newUsersToday > 0 ? 100 : 0} icon={<UserPlus size={20} />} color="emerald" />
        <StatCard title="Inactive Accounts" value={stats?.inactiveUsers || 0} change={-2} icon={<Users size={20} />} color="red" />
      </div>

      {/* Main Charts area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Growth Chart */}
          <div className="lg:col-span-2 glass-card p-8 border-white/5 bg-[#0a0f1d]/50">
             <div className="flex items-center justify-between mb-8">
                 <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">VIP Growth Analysis</h3>
                    <p className="text-gray-500 text-xs font-bold leading-none mt-1 uppercase tracking-widest">Global Network Participation Trend</p>
                 </div>
                 <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                    <TrendingUp className="text-amber-500 w-3 h-3" />
                    <span className="text-[10px] text-amber-500 font-black uppercase tracking-widest">Live Data Stream</span>
                 </div>
             </div>
             
             {/* Chart Visualization */}
             <div className="flex items-end justify-between h-[320px] gap-2 md:gap-4 relative pt-10">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Activity size={150} className="text-amber-500" />
                </div>
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((label, i) => {
                    const dataPoint = stats?.monthlyGrowth?.find(g => g._id.month === i + 1);
                    const count = dataPoint ? dataPoint.count : 0;
                    const maxVal = Math.max(...(stats?.monthlyGrowth?.map(m => m.count) || [10]));
                    const heightPercent = count === 0 ? 5 : (count / maxVal) * 90;

                    return (
                        <div key={i} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                            <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-amber-500 border border-amber-400 px-3 py-1 shadow-lg shadow-amber-500/20 rounded text-[10px] text-black font-black z-10 w-max pointer-events-none">
                                {count} Users
                            </div>
                            <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: `${heightPercent}%` }}
                                transition={{ delay: i * 0.05, duration: 1.2, ease: "circOut" }}
                                className={`w-full max-w-[40px] rounded-t-xl transition-all shadow-lg ${i % 2 === 0 ? 'bg-gradient-to-t from-amber-600 to-amber-400' : 'bg-gradient-to-t from-red-600 to-red-400'}`}
                            ></motion.div>
                            <span className="text-[9px] text-gray-700 font-black uppercase mt-4">{label.charAt(0)}</span>
                        </div>
                    );
                })}
             </div>
          </div>

          {/* Side Info Panel */}
          <div className="space-y-8">
              <div className="glass-card p-6 border-white/5 bg-white/[0.01]">
                 <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Real-time Task Monitor</h4>
                 <div className="space-y-4">
                    {[
                        { title: 'Withdrawal Approvals', tag: `${stats?.pendingWithdrawals || 0} Req`, color: 'amber', path: '/admin/withdrawals' },
                        { title: 'Fund Addition Requests', tag: `${stats?.pendingFunds || 0} Pending`, color: 'blue', path: '/admin/funds' },
                        { title: 'System Node Sync', tag: '100% OK', color: 'emerald', path: null },
                        { title: 'Security Protocol', tag: 'A-LEVEL-6', color: 'crypto-violet', path: null }
                    ].map((task, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 transition-all hover:bg-white/10 cursor-pointer group">
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full bg-${task.color}-500 shadow-[0_0_8px_rgba(255,255,255,0.1)] group-hover:scale-150 transition-transform`}></div>
                                <span className="text-[11px] font-black text-white tracking-tight">{task.title}</span>
                            </div>
                            <span className={`text-[9px] font-black uppercase text-${task.color}-500 tracking-widest`}>{task.tag}</span>
                        </div>
                    ))}
                 </div>
              </div>

              <div className="glass-card p-8 border-white/5 bg-gradient-to-br from-amber-600/10 to-transparent relative overflow-hidden group">
                  <div className="relative z-10">
                    <Clock size={40} className="text-amber-500 mb-6 group-hover:scale-110 transition-transform duration-500" />
                    <h3 className="text-xl font-black text-white uppercase tracking-tight leading-none mb-2">Manual Distribution</h3>
                    <p className="text-gray-500 text-xs font-bold leading-relaxed">
                        Automatic global distribution is <span className="text-amber-500 italic uppercase">Deactivated</span>. Execute Profit injection manually via the control console.
                    </p>
                    <button 
                        onClick={() => window.location.href='/admin/investments'}
                        className="flex items-center gap-3 text-amber-500 text-[10px] font-black uppercase tracking-[0.2em] mt-8 hover:tracking-[0.3em] transition-all"
                    >
                        Access Console <ShieldCheck size={14} />
                    </button>
                  </div>
                  <div className="absolute bottom-[-10%] right-[-10%] opacity-5 group-hover:opacity-10 transition-opacity">
                    <TrendingUp size={150} />
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
