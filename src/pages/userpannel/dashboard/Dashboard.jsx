import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Users, Wallet, CreditCard, 
  ArrowUpRight, ArrowDownLeft, BarChart3, 
  Activity, Zap, Clock, ShieldCheck, AlertCircle
} from 'lucide-react';
import ReferralLinks from './ReferralLinks';
import api from '../../../api/apiConfig';

const StatCard = ({ title, value, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="glass-card p-4 border-white/5 hover:border-white/10 transition-all group relative overflow-hidden"
  >
    <div className={`absolute -right-4 -top-4 w-16 h-16 blur-[30px] opacity-0 group-hover:opacity-10 transition-all duration-700 bg-current ${color.replace('text-', 'bg-')}`}></div>
    <div className="flex justify-between items-start mb-3">
      <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${color} group-hover:scale-110 transition-transform shadow-lg shadow-black/20`}>
        <Icon className="w-4 h-4" />
      </div>
    </div>
    <p className="text-gray-500 text-[9px] font-black uppercase tracking-widest truncate">{title}</p>
    <h3 className="text-xl font-black text-white mt-0.5 italic tracking-tighter truncate">{value}</h3>
  </motion.div>
);

const Dashboard = () => {
  const [userProfile, setUserProfile] = React.useState(null);
  const [statsData, setStatsData] = React.useState(null);
  const user = JSON.parse(localStorage.getItem('user')) || { fullName: 'Trader', referralCode: 'OFX000000' };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const resProfile = await api.get('/auth/profile');
        setUserProfile(resProfile.data);
        const resStats = await api.get('/reports/dashboard-stats');
        setStatsData(resStats.data);
      } catch (err) {
        console.error('Error fetching dashboard data');
      }
    };
    fetchData();
  }, [user.token]);

  const allStats = [
    { title: 'Portfolio Invest', value: `$${statsData?.totalInvestment?.toLocaleString() || '0'}`, icon: Wallet, color: 'text-electric-blue' },
    { title: 'Direct Team',      value: statsData?.directReferralCount?.toString() || '0', icon: Users, color: 'text-neon-blue' },
    { title: 'Left Team',        value: statsData?.leftTeamCount?.toString() || '0', icon: Activity, color: 'text-crypto-violet' },
    { title: 'Right Team',       value: statsData?.rightTeamCount?.toString() || '0', icon: Activity, color: 'text-crypto-violet' },
    { title: 'Total Team',       value: statsData?.totalTeamCount?.toString() || '0', icon: Users, color: 'text-neon-blue' },
    { title: 'Trading Profit',   value: `$${statsData?.totalTradingProfit?.toLocaleString() || '0'}`, icon: TrendingUp, color: 'text-green-400' },
    { title: 'Level Income',     value: `$${statsData?.totalLevelRoi?.toLocaleString() || '0'}`, icon: TrendingUp, color: 'text-amber-500' },
    { title: 'Total Earning',    value: `$${statsData?.totalEarnings?.toLocaleString() || '0'}`, icon: Wallet, color: 'text-green-500' },
    { title: 'Total Withdrawal', value: `$${statsData?.totalWithdrawal?.toLocaleString() || '0'}`, icon: ArrowDownLeft, color: 'text-red-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-electric-blue/10 to-transparent p-6 rounded-2xl border border-electric-blue/10"
      >
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl md:text-3xl font-black text-white leading-none">Welcome back, {userProfile?.fullName || user.fullName}!</h1>
            {userProfile?.isActivated ? (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 border border-green-400/20 text-green-400 text-[9px] font-black uppercase tracking-widest rounded-lg">
                    <ShieldCheck size={12} /> VIP
                </span>
            ) : (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-500 text-[9px] font-black uppercase tracking-widest rounded-lg">
                    <AlertCircle size={12} /> Inactive
                </span>
            )}
          </div>
          <p className="text-gray-400 font-medium text-sm">Your AI Trading Bots are performing at peak efficiency today.</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="hidden md:block text-right mr-2">
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Available</div>
                <div className="text-electric-blue font-black">${userProfile?.balance?.toFixed(2) || '0.00'}</div>
            </div>
            <button 
                onClick={() => window.location.href = '/user/fund/request'}
                className="btn-primary flex items-center gap-2 w-max px-6 py-3"
            >
                Deposit <Zap className="w-4 h-4 fill-current" />
            </button>
        </div>
      </motion.div>

      {/* Referral Links Section */}
      <ReferralLinks userCode={userProfile?.referralCode || user.referralCode} />

      {/* High-Density Global Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {allStats.map((stat, i) => (
          <StatCard key={i} {...stat} delay={i * 0.05} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trading Performance Visualization */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 glass-card p-6 border-white/5 h-[400px] flex flex-col"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-electric-blue" />
              Trading Profit Performance
            </h3>
            <div className="flex items-center gap-2 px-3 py-1 bg-electric-blue/10 border border-electric-blue/20 rounded-xl">
                <span className="text-[10px] text-electric-blue font-black uppercase tracking-widest leading-none">12 Month ROI Trend</span>
            </div>
          </div>
          
          <div className="flex-1 flex items-end justify-between gap-2 md:gap-4 px-2 pb-6 relative min-h-0">
            {/* Conditional Data Rendering */}
            {(!statsData?.monthlyProfitGrowth || statsData.monthlyProfitGrowth.length === 0) ? (
               <div className="absolute inset-0 flex flex-col items-center justify-center opacity-20">
                    <TrendingUp size={40} className="mb-2" />
                    <p className="text-[10px] uppercase font-black tracking-widest">Awaiting Profit Accumulation</p>
               </div>
            ) : (
                ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((label, i) => {
                    const monthProfit = statsData.monthlyProfitGrowth.find(g => g._id.month === i + 1);
                    const amount = monthProfit ? monthProfit.total : 0;
                    const maxVal = Math.max(...statsData.monthlyProfitGrowth.map(m => m.total), 1);
                    const heightPercent = amount === 0 ? 5 : (amount / maxVal) * 90;

                    return (
                        <div key={i} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                            {/* Tooltip */}
                            <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-electric-blue border border-white/10 px-3 py-1 shadow-2xl rounded text-[10px] text-black font-black z-20 w-max pointer-events-none">
                                ${amount.toFixed(2)}
                            </div>
                            <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: `${heightPercent}%` }}
                                transition={{ delay: i * 0.05, duration: 1.2, ease: "circOut" }}
                                className={`w-full max-w-[40px] rounded-t-lg transition-all shadow-lg ${amount > 0 ? 'bg-gradient-to-t from-electric-blue via-neon-blue to-crypto-violet brightness-125' : 'bg-white/2 brightness-50'}`}
                            ></motion.div>
                            <span className="text-[8px] text-gray-700 font-extrabold uppercase mt-3">{label.charAt(0)}</span>
                        </div>
                    );
                })
            )}
            
            {/* Grid Lines (Visual Only) */}
            <div className="absolute inset-0 border-b border-white/5 z-0 pointer-events-none"></div>
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-6 border-white/5 flex flex-col"
        >
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-crypto-violet" />
            Recent Activity
          </h3>
          <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scroll">
            {(statsData?.recentActivity && statsData.recentActivity.length > 0) ? (
              statsData.recentActivity.map((tx, i) => {
                const IconComp = {
                  'withdrawal': ArrowDownLeft,
                  'deposit': ArrowUpRight,
                  'profit': TrendingUp,
                  'referral': ShieldCheck
                }[tx.iconType] || Clock;

                return (
                  <div key={i} className="flex items-center justify-between group cursor-pointer animate-in fade-in slide-in-from-right duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${tx.color} group-hover:bg-white/10 transition-all`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white leading-none mb-1">{tx.type}</p>
                        <p className="text-[10px] text-gray-500 font-medium">{new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-black ${tx.color}`}>{tx.amount}</p>
                      <p className="text-[10px] text-gray-600 font-bold uppercase">{tx.status}</p>
                    </div>
                  </div>
                );
              })
            ) : (
                <div className="flex flex-col items-center justify-center h-full opacity-20">
                    <Activity size={40} className="mb-2" />
                    <p className="text-[10px] uppercase font-black">No Recent Activity Recorded</p>
                </div>
            )}
          </div>
          <button className="w-full py-3 mt-6 text-xs font-bold text-gray-500 hover:text-white transition-colors">
            View All Transactions
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
