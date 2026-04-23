import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, TrendingUp, Wallet, ArrowUpRight } from 'lucide-react';

const LiveStats = () => {
  const [stats, setStats] = useState({
    activeMembers: 24580,
    totalPayout: 1540200,
    totalInvested: 4280500,
    countries: 42
  });

  const [recentPayouts, setRecentPayouts] = useState([
    { id: 1, user: 'John D.', amount: 450.50, time: '2 mins ago' },
    { id: 2, user: 'Maria S.', amount: 1200.00, time: '5 mins ago' },
    { id: 3, user: 'Ahmed K.', amount: 85.00, time: '8 mins ago' },
  ]);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        activeMembers: prev.activeMembers + Math.floor(Math.random() * 3),
        totalPayout: prev.totalPayout + (Math.random() * 50),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-container pt-0">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Real-time Ticker */}
        <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard 
            icon={Users} 
            label="Active Members" 
            value={stats.activeMembers.toLocaleString()} 
            color="text-electric-blue"
          />
          <StatCard 
            icon={Wallet} 
            label="Total Payouts" 
            value={`$${stats.totalPayout.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} 
            color="text-green-400"
          />
          <StatCard 
            icon={TrendingUp} 
            label="Total Invested" 
            value={`$${stats.totalInvested.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} 
            color="text-crypto-violet"
          />
          <StatCard 
            icon={ArrowUpRight} 
            label="Countries" 
            value={stats.countries} 
            color="text-orange-400"
          />
        </div>

        {/* Mini Payout Feed */}
        <div className="glass-card p-4 bg-white/[0.03] border-white/5 overflow-hidden">
          <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4 flex justify-between items-center">
            <span>Live Payouts</span>
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          </div>
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {recentPayouts.map((payout) => (
                <motion.div 
                  key={payout.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5"
                >
                  <div>
                    <div className="text-xs font-bold">{payout.user}</div>
                    <div className="text-[10px] text-gray-500">{payout.time}</div>
                  </div>
                  <div className="text-xs font-black text-electric-blue">+${payout.amount.toFixed(2)}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="glass-card p-4 md:p-6 bg-white/[0.02] border-white/5 flex flex-col items-center justify-center text-center group">
    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
      <Icon className={`w-5 h-5 md:w-6 md:h-6 ${color}`} />
    </div>
    <div className="text-xl md:text-2xl font-black mb-1 tracking-tight">{value}</div>
    <div className="text-[10px] md:text-xs text-gray-500 uppercase font-bold tracking-widest">{label}</div>
  </div>
);

export default LiveStats;
