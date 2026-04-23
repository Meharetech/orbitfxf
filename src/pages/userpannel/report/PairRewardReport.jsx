import React, { useState, useEffect } from 'react';
import api from '../../../api/apiConfig';
import {
    Activity, Trophy, Target, Award,
    ChevronRight, CheckCircle2, Clock,
    Loader2, Users, Star, 
    ArrowUpCircle, Info, TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';

const PairRewardReport = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSyncing, setIsSyncing] = useState(false);

    const fetchReport = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const res = await api.get('/reports/pair-reward');
            setData(res.data);
        } catch (err) {
            console.error('Error fetching pair reward report:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReport();
    }, []);

    const handleSync = async () => {
        setIsSyncing(true);
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            await api.get('/reports/sync-pairs');
            await fetchReport(); // Refresh data
            alert('Binary counts synchronized successfully!');
        } catch (err) {
            console.error('Sync failed:', err);
            alert('Sync failed. Please try again.');
        } finally {
            setIsSyncing(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-12 h-12 text-electric-blue animate-spin" />
                <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">Loading Reward Stats...</p>
            </div>
        );
    }

    // Find next rank requirements
    const currentRankIdx = data.rankPlans?.findIndex(p => p.rank === data.currentRank);
    const nextRank = data.rankPlans?.[currentRankIdx + 1] || null;
    const progressToNext = nextRank ? (data.totalPairs / nextRank.pairs) * 100 : 100;

    // Calculate detailed earnings
    const totalMonthlyEarned = data.payments?.filter(p => p.month > 0).reduce((sum, p) => sum + p.amount, 0) || 0;
    const totalOneTimeEarned = data.rankPlans?.filter(p => data.claimedOneTimeRewards?.includes(p.rank)).reduce((sum, p) => sum + p.oneTimeReward, 0) || 0;
    const totalEarnedOverall = totalMonthlyEarned + totalOneTimeEarned;

    return (
        <div className="space-y-8 animate-in fade-in duration-700">

            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/5">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">
                        Pair Matching <span className="text-electric-blue">Monthly Reward</span>
                    </h2>
                    <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">
                        Rank-Based Monthly Incentives — $30 to $100,000 protocol
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={handleSync}
                        disabled={isSyncing}
                        className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all disabled:opacity-50"
                    >
                        {isSyncing ? (
                            <Loader2 size={14} className="text-gray-400 animate-spin" />
                        ) : (
                             <Activity size={14} className="text-indigo-400" />
                        )}
                        <span className="text-gray-400 text-[9px] font-black uppercase tracking-widest">{isSyncing ? 'Syncing...' : 'Sync Data'}</span>
                    </button>

                    {data.currentRank && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-electric-blue/10 border border-electric-blue/20 rounded-xl shadow-[0_0_20px_rgba(0,198,255,0.1)]">
                            <Trophy size={16} className="text-electric-blue" />
                            <span className="text-white text-[10px] font-black uppercase tracking-widest">Rank: <span className="text-electric-blue">{data.currentRank}</span></span>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Progress Stats ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Team Counts */}
                <div className="glass-card p-6 bg-white/[0.01] border-white/5 space-y-6">
                    <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest flex items-center gap-2">
                        <Users size={14} className="text-electric-blue" /> Binary Team Counts
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-[8px] text-gray-500 font-black uppercase">Left activated</p>
                            <p className="text-2xl font-black text-white italic">{data.leftCount}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[8px] text-gray-500 font-black uppercase">Right activated</p>
                            <p className="text-2xl font-black text-white italic">{data.rightCount}</p>
                        </div>
                    </div>
                    <div className="pt-4 border-t border-white/5">
                        <p className="text-[8px] text-amber-500 font-black uppercase mb-1">Total Pairs (Min of L/R)</p>
                        <p className="text-4xl font-black text-amber-500 italic">{data.totalPairs}</p>
                    </div>
                </div>

                {/* Next Rank Progress */}
                <div className="lg:col-span-2 glass-card p-6 bg-white/[0.01] border-white/5 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest flex items-center gap-2">
                            <Target size={14} className="text-amber-500" /> Rank Progression
                        </p>
                        {nextRank && (
                            <p className="text-[9px] font-black uppercase">
                                <span className="text-white">{data.totalPairs}</span> / <span className="text-gray-600">{nextRank.pairs} Pairs for</span> <span className="text-amber-400">{nextRank.rank}</span>
                            </p>
                        )}
                    </div>

                    <div className="space-y-6">
                        {/* Progress Bar */}
                        <div className="space-y-2">
                            <div className="h-3 bg-white/5 rounded-full overflow-hidden p-[1px]">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(100, progressToNext)}%` }}
                                    className="h-full bg-gradient-to-r from-electric-blue via-crypto-violet to-amber-500 rounded-full relative"
                                >
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_white]" />
                                </motion.div>
                            </div>
                            <div className="flex justify-between text-[8px] font-black uppercase text-gray-700">
                                <span>Current: {data.currentRank || 'NONE'}</span>
                                <span>Target: {nextRank?.rank || 'MAX RANK'}</span>
                            </div>
                        </div>

                        {/* Summary Info */}
                        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 pt-4 border-t border-white/5">
                            <div className="space-y-1">
                                <p className="text-[8px] text-gray-600 font-black uppercase tracking-tight">Monthly Payouts</p>
                                <p className="text-xl font-black text-white italic">${totalMonthlyEarned.toLocaleString()}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[8px] text-amber-500/70 font-black uppercase tracking-tight italic">One-Time Prizes</p>
                                <p className="text-xl font-black text-amber-500 italic">${totalOneTimeEarned.toLocaleString()}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[8px] text-green-500 font-black uppercase tracking-tight">Total Combined</p>
                                <p className="text-xl font-black text-green-500 italic">${totalEarnedOverall.toLocaleString()}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[8px] text-gray-600 font-black uppercase">Next Payout</p>
                                <p className="text-sm font-black text-white">{data.nextPaymentDate ? new Date(data.nextPaymentDate).toLocaleDateString() : 'N/A'}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[8px] text-gray-600 font-black uppercase">Status</p>
                                <p className={`text-[10px] font-black uppercase ${data.isRewarded ? 'text-green-500' : 'text-gray-600'}`}>
                                    {data.isRewarded ? '● Activated' : '○ Not Qualified'}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[8px] text-gray-600 font-black uppercase">Installments</p>
                                <p className="text-sm font-black text-white">{data.paidCount || 0}/12 Paid</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Rank Rewards Table ── */}
            <div className="glass-card border-white/5 bg-white/[0.01]">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Award size={18} className="text-amber-500" />
                        <h3 className="text-sm font-black text-white uppercase tracking-widest italic">Rank Reward <span className="text-amber-500">Plan</span></h3>
                    </div>
                    <div className="flex items-center gap-2 group cursor-pointer">
                        <Info size={14} className="text-gray-600 group-hover:text-amber-500 transition-colors" />
                        <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest">Achieve pairs to unlock 1 year monthly salary</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/[0.02] border-b border-white/5">
                                <th className="p-4 text-[9px] font-black uppercase tracking-widest text-gray-600">Rank</th>
                                <th className="p-4 text-[9px] font-black uppercase tracking-widest text-gray-600 text-center">Pairs Required</th>
                                <th className="p-4 text-[9px] font-black uppercase tracking-widest text-gray-600 text-center">Monthly Reward</th>
                                <th className="p-4 text-[9px] font-black uppercase tracking-widest text-gray-600 text-center">One-Time Prize</th>
                                <th className="p-4 text-[9px] font-black uppercase tracking-widest text-gray-600 text-center">Duration</th>
                                <th className="p-4 text-[9px] font-black uppercase tracking-widest text-gray-600 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            {data.rankPlans?.map((plan, idx) => {
                                const isAchieved = data.totalPairs >= plan.pairs;
                                const isCurrent = data.currentRank === plan.rank;
                                const isNext = nextRank?.rank === plan.rank;

                                return (
                                    <tr key={idx} className={`group transition-all ${isAchieved ? 'bg-green-500/[0.01]' : isNext ? 'bg-amber-500/[0.01]' : ''}`}>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div 
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center border-2"
                                                    style={{ borderColor: plan.color + '44', background: plan.color + '11', color: plan.color }}
                                                >
                                                    <Star size={14} fill={isAchieved ? plan.color : 'transparent'} />
                                                </div>
                                                <span className={`text-xs font-black uppercase tracking-wider ${isAchieved ? 'text-white' : 'text-gray-600'}`}>
                                                    {plan.rank}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="flex flex-col items-center">
                                                <span className={`text-sm font-black ${isAchieved ? 'text-white' : 'text-gray-600'}`}>{plan.pairs.toLocaleString()}</span>
                                                <span className="text-[7px] text-gray-700 font-bold uppercase">Binary Pairs</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-500/5 border border-green-500/10">
                                                <span className="text-sm font-black text-green-500 italic">${plan.monthlyReward.toLocaleString()}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/5 border border-orange-500/10">
                                                <span className="text-sm font-black text-orange-500 italic">${plan.oneTimeReward?.toLocaleString()}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className="text-[10px] font-black text-gray-600 uppercase">1 YEAR</span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex flex-col items-end gap-1.5">
                                                {isAchieved ? (
                                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-500 border border-green-500/20 text-[9px] font-black uppercase tracking-widest w-max">
                                                        <CheckCircle2 size={12} /> Achieved
                                                    </div>
                                                ) : isNext ? (
                                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[9px] font-black uppercase tracking-widest animate-pulse w-max">
                                                        <TrendingUp size={12} /> Target
                                                    </div>
                                                ) : (
                                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-gray-700 border border-white/5 text-[9px] font-black uppercase tracking-widest w-max">
                                                        <Clock size={12} /> Pending
                                                    </div>
                                                )}
                                                
                                                {/* One-Time Status Badge */}
                                                {isAchieved && (
                                                    <span className={`text-[7px] font-black uppercase px-2 py-0.5 rounded ${data.claimedOneTimeRewards?.includes(plan.rank) ? 'text-green-500/60' : 'text-orange-500 animate-pulse'}`}>
                                                        {data.claimedOneTimeRewards?.includes(plan.rank) ? 'One-Time Paid' : 'One-Time Pending'}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── Payment History ── */}
            {data.payments?.length > 0 && (
                <div className="glass-card overflow-hidden border-white/5 bg-white/[0.01]">
                    <div className="p-6 border-b border-white/5 flex items-center gap-3">
                        <HistoryIcon size={16} className="text-electric-blue" />
                        <h3 className="text-[10px] text-white font-black uppercase tracking-widest">Monthly Payment Log</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white/[0.02] border-b border-white/5">
                                    <th className="p-4 text-[9px] font-black uppercase tracking-widest text-gray-600">Month</th>
                                    <th className="p-4 text-[9px] font-black uppercase tracking-widest text-gray-600">Rank Achieved</th>
                                    <th className="p-4 text-[9px] font-black uppercase tracking-widest text-gray-600">Amount Paid</th>
                                    <th className="p-4 text-[9px] font-black uppercase tracking-widest text-gray-600">Date Credited</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.03]">
                                {data.payments.map((p, i) => (
                                    <tr key={i} className={`hover:bg-white/[0.02] transition-colors ${p.month === 0 ? 'bg-amber-500/[0.02]' : ''}`}>
                                        <td className="p-4">
                                            {p.month === 0 ? (
                                                <span className="flex items-center gap-2">
                                                    <Award size={12} className="text-amber-500" />
                                                    <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest italic">One-Time Prize</span>
                                                </span>
                                            ) : (
                                                <span className="text-xs font-black text-white uppercase italic">Installment #{p.month}</span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <span className="px-2 py-0.5 bg-electric-blue/10 text-electric-blue border border-electric-blue/20 rounded-md text-[9px] font-black">
                                                {p.rank}
                                            </span>
                                        </td>
                                        <td className="p-4 text-green-500 font-black text-sm">${p.amount}</td>
                                        <td className="p-4 text-[10px] text-gray-500 font-bold">{new Date(p.paidAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

// Help helper
const HistoryIcon = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export default PairRewardReport;
