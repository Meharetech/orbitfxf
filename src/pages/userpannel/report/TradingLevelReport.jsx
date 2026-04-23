import React, { useState, useEffect } from 'react';
import api from '../../../api/apiConfig';
import { 
    Layers, Users, History, 
    Award, Loader2, ArrowUpRight,
    TrendingUp, ShieldCheck, Zap
} from 'lucide-react';

const TradingLevelReport = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const res = await api.get('/reports/trading-level');
                setHistory(res.data);
            } catch (err) {
                console.error('Error fetching trading level income:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const totalIncome = history.reduce((sum, item) => sum + item.amount, 0);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
                <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">Compiling Level Earnings...</p>
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-in fade-in duration-1000">

            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/5">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">
                        Trading <span className="text-purple-500">Level ROI</span>
                    </h2>
                    <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">
                        Profits Shared From Your Downline Network
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-6 py-3 bg-purple-500/10 border border-purple-500/20 rounded-2xl shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                        <p className="text-[9px] text-purple-400 font-black uppercase tracking-widest">Accumulated Level Sharing</p>
                        <p className="text-2xl font-black text-white italic underline decoration-purple-500/30 underline-offset-4">${totalIncome.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            {/* ── Summary Stats ── */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="glass-card p-6 border-white/5 bg-white/[0.01] space-y-2">
                    <Layers className="text-purple-500 w-5 h-5" />
                    <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest leading-none">Generations</p>
                    <p className="text-xl font-black text-white italic tracking-tighter">20 LEVELS</p>
                </div>
                <div className="glass-card p-6 border-white/5 bg-white/[0.01] space-y-2">
                    <Users className="text-pink-500 w-5 h-5" />
                    <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest leading-none">Unique Contributors</p>
                    <p className="text-xl font-black text-white italic tracking-tighter">{[...new Set(history.map(item => item.fromUserId?._id))].length}</p>
                </div>
                <div className="glass-card p-6 border-white/5 bg-white/[0.01] space-y-2">
                    <TrendingUp className="text-green-500 w-5 h-5" />
                    <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest leading-none">Matrix Share</p>
                    <p className="text-xl font-black text-white italic tracking-tighter">25.0%</p>
                </div>
                <div className="glass-card p-6 border-white/5 bg-white/[0.01] space-y-2">
                    <ShieldCheck className="text-blue-500 w-5 h-5" />
                    <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest leading-none">Network Protection</p>
                    <p className="text-xl font-black text-blue-400 italic tracking-tighter">GUARANTEED</p>
                </div>
            </div>

            {/* ── Level Profit Log ── */}
            <div className="glass-card overflow-hidden border-white/5">
                <div className="p-6 border-b border-white/5 flex items-center gap-4">
                    <History size={18} className="text-gray-600" />
                    <h4 className="text-white font-black uppercase text-xs italic tracking-widest">Network Sharing History</h4>
                </div>

                <div className="overflow-x-auto min-h-[400px]">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/[0.02] border-b border-white/5">
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Source Level</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Investor Path</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Earnings Share</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Processed At</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            {history.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-32 text-center text-gray-800 text-[11px] font-black uppercase tracking-widest italic">
                                        No network sharing recorded in this cycle
                                    </td>
                                </tr>
                            ) : (
                                history.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-white/[0.01] transition-colors group">
                                        <td className="p-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[10px] font-black text-purple-400 group-hover:scale-110 transition-transform">
                                                    L{item.level}
                                                </div>
                                                <span className="text-[11px] font-black text-gray-300 uppercase tracking-widest">Level {item.level}</span>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex flex-col">
                                                <span className="text-white font-black text-sm uppercase italic tracking-tighter decoration-purple-500/30 underline-offset-4 decoration-2">{item.fromUserId?.fullName}</span>
                                                <span className="text-[8px] text-purple-500 font-bold uppercase tracking-widest mt-0.5">{item.fromUserId?.username}</span>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex flex-col">
                                                <span className="text-green-500 font-black text-lg italic tracking-tight">+${item.amount.toLocaleString()}</span>
                                                <span className="text-[8px] text-gray-700 font-black uppercase tracking-[0.1em] mt-0.5">
                                                    Matrix Share {item.levelRate ? (item.levelRate * 100).toFixed(0) : '...'}% of 25% Pool
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <p className="text-[10px] text-gray-500 font-bold">{new Date(item.createdAt).toLocaleDateString()}</p>
                                            <p className="text-[8px] text-gray-700 font-bold">{new Date(item.createdAt).toLocaleTimeString()}</p>
                                        </td>
                                        <td className="p-5 text-center">
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-green-500/10 text-green-500 border border-green-500/20 text-[9px] font-black uppercase tracking-widest shadow-lg shadow-green-500/5">
                                                <Award size={10} /> Credited
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="p-4 bg-purple-500/5 border border-purple-500/10 rounded-2xl flex items-center gap-3 justify-center">
                <Zap size={12} className="text-purple-500" />
                <span className="text-purple-400/80 text-[9px] font-black uppercase tracking-[0.2em] text-center">
                    Level ROI is credited daily based on the active trading profits of your generation network (20 levels)
                </span>
            </div>
        </div>
    );
};

export default TradingLevelReport;
