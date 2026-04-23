import React, { useState, useEffect } from 'react';
import api from '../../../api/apiConfig';
import {
    Calendar, DollarSign, History,
    CheckCircle2, Loader2, Trophy,
    TrendingUp, Briefcase, Award,
    Star, Target, Zap
} from 'lucide-react';

const PairMonthlyHistory = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const res = await api.get('/reports/pair-reward');
                setData(res.data);
            } catch (err) {
                console.error('Error fetching pair monthly history:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchReport();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
                <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">Loading Reward Ledger...</p>
            </div>
        );
    }

    const payments = data?.payments || [];
    const totalEarned = payments.reduce((sum, p) => sum + p.amount, 0);
    const oneTimeTotal = payments.filter(p => p.month === 0).reduce((sum, p) => sum + p.amount, 0);
    const monthlyTotal = payments.filter(p => p.month > 0).reduce((sum, p) => sum + p.amount, 0);

    return (
        <div className="space-y-8 animate-in fade-in duration-700">

            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/5">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">
                        Reward <span className="text-indigo-400">Archive</span>
                    </h2>
                    <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">
                        Unified History — One-Time Achievement Prizes & Monthly Salaries
                    </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl shadow-[0_0_15px_rgba(129,140,248,0.1)]">
                    <History size={14} className="text-indigo-400" />
                    <span className="text-white text-[10px] font-black uppercase tracking-widest">{payments.length} Settlements Archived</span>
                </div>
            </div>

            {/* ── Summary Matrix ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 border-indigo-500/20 bg-indigo-500/[0.03] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                        <Trophy size={48} className="text-indigo-400" />
                    </div>
                    <p className="text-[9px] text-indigo-400 font-black uppercase tracking-widest leading-none mb-2">Total Wealth Gained</p>
                    <p className="text-4xl font-black text-white italic tracking-tighter underline underline-offset-8 decoration-indigo-500/30 font-orbitron">${totalEarned.toLocaleString()}</p>
                    <div className="mt-4 flex items-center gap-3">
                         <div className="flex flex-col">
                            <span className="text-[8px] text-gray-500 font-black uppercase">Current Rank</span>
                            <span className="text-[11px] text-indigo-400 font-black uppercase italic tracking-widest">{data?.currentRank || 'STARTER'}</span>
                         </div>
                         <div className="w-px h-6 bg-white/10" />
                         <div className="flex flex-col">
                            <span className="text-[8px] text-gray-500 font-black uppercase">Binary Pairs</span>
                            <span className="text-[11px] text-white font-black italic">{data?.totalPairs || 0}</span>
                         </div>
                    </div>
                </div>

                <div className="glass-card p-6 border-amber-500/20 bg-amber-500/[0.02] space-y-3">
                    <div className="flex items-center gap-2">
                        <Award size={16} className="text-amber-500" />
                        <p className="text-[9px] text-amber-500 font-black uppercase tracking-widest">One-Time Prizes</p>
                    </div>
                    <p className="text-3xl font-black text-white italic tracking-tighter">${oneTimeTotal.toLocaleString()}</p>
                    <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest italic">{payments.filter(p => p.month === 0).length} Achievements Unlocked</p>
                </div>

                <div className="glass-card p-6 border-green-500/20 bg-green-500/[0.02] space-y-3">
                    <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-green-500" />
                        <p className="text-[9px] text-green-500 font-black uppercase tracking-widest">Monthly Salary</p>
                    </div>
                    <p className="text-3xl font-black text-white italic tracking-tighter">${monthlyTotal.toLocaleString()}</p>
                    <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest italic">{monthlyTotal > 0 ? (data?.paidCount || 0) : 0}/12 Installments Credited</p>
                </div>
            </div>

            {/* ── Payment List Ledger ── */}
            <div className="glass-card border-white/5 bg-white/[0.01]">
                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                    <div className="flex items-center gap-3">
                        <Star size={16} className="text-indigo-400" />
                        <h4 className="text-white font-black uppercase text-xs italic tracking-widest">Settlement History</h4>
                    </div>
                    <span className="px-3 py-1 bg-white/5 rounded-lg text-[9px] text-gray-600 font-black uppercase tracking-tighter">Verified Protocol Records</span>
                </div>

                <div className="overflow-x-auto min-h-[400px]">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/[0.02] border-b border-white/5">
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Category</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Rank Milestone</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Yield Amount</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Date Processed</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            {payments.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-32 text-center text-gray-800 text-[11px] font-black uppercase tracking-widest italic opacity-50">
                                        No reward settlements archived in this cycle.
                                    </td>
                                </tr>
                            ) : (
                                [...payments].sort((a,b) => new Date(b.paidAt) - new Date(a.paidAt)).map((p, i) => (
                                    <tr key={i} className={`hover:bg-white/[0.02] transition-all group ${p.month === 0 ? 'bg-amber-500/[0.02]' : ''}`}>
                                        <td className="p-5">
                                            {p.month === 0 ? (
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shadow-lg shadow-amber-500/5 group-hover:scale-110 transition-transform">
                                                        <Award size={18} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest italic leading-none mb-1">One-Time Prize</span>
                                                        <span className="text-[8px] text-gray-700 font-black uppercase tracking-tighter">Achievement Reward</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-500/5 group-hover:scale-110 transition-transform">
                                                        <Zap size={18} />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] font-black text-white uppercase tracking-widest italic leading-none mb-1">Monthly Salary</span>
                                                        <span className="text-[8px] text-gray-700 font-black uppercase tracking-tighter">Installment #{p.month}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-5">
                                            <div className="flex items-center gap-2">
                                                <Trophy size={12} className="text-amber-500/70" />
                                                <span className="px-2.5 py-1 bg-white/5 text-gray-300 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest italic">
                                                    {p.rank}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex flex-col">
                                                <span className="text-green-500 font-black text-xl italic tracking-tight">+${p.amount.toLocaleString()}</span>
                                                <span className="text-[8px] text-gray-700 font-black uppercase tracking-[0.2em] mt-1">Matrix Credit</span>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <Calendar size={12} className="opacity-50" />
                                                <p className="text-[11px] font-bold">{new Date(p.paidAt).toLocaleDateString()}</p>
                                            </div>
                                            <p className="text-[8px] text-gray-700 font-black uppercase tracking-tighter mt-1 ml-5">{new Date(p.paidAt).toLocaleTimeString()}</p>
                                        </td>
                                        <td className="p-5 text-center">
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-green-500/10 text-green-500 border border-green-500/20 text-[9px] font-black uppercase tracking-widest shadow-lg shadow-green-500/5">
                                                <CheckCircle2 size={10} /> Credited
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl flex items-center gap-3 justify-center">
                <Info size={12} className="text-indigo-400" />
                <span className="text-indigo-400/80 text-[10px] font-black uppercase tracking-[0.2em] text-center">
                    All rank milestones and monthly salary payments are processed through the automated OrbitFX reward protocol
                </span>
            </div>
        </div>
    );
};

// Help helper
const Info = ({ size, className }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
);

export default PairMonthlyHistory;
