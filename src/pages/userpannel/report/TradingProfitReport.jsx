import React, { useState, useEffect } from 'react';
import api from '../../../api/apiConfig';
import { 
    TrendingUp, DollarSign, History, 
    CheckCircle2, Loader2, Calendar,
    ArrowUpRight, PieChart, Activity
} from 'lucide-react';

const TradingProfitReport = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const res = await api.get('/reports/trading-profit');
                setHistory(res.data);
            } catch (err) {
                console.error('Error fetching trading profit:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const totalProfit = history.reduce((sum, item) => sum + item.amount, 0);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">Calculating Daily Profits...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-1000">

            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/5">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">
                        Trading <span className="text-blue-500">Profit ROI</span>
                    </h2>
                    <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">
                        Daily Portfolio Performance Recap
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-5 py-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                        <p className="text-[9px] text-blue-400 font-black uppercase tracking-widest">Total ROI Earned</p>
                        <p className="text-2xl font-black text-white italic underline decoration-blue-500/30 underline-offset-4">${totalProfit.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            {/* ── Summary Stats ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 border-white/5 bg-white/[0.01] flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                        <Activity className="text-blue-500" />
                    </div>
                    <div>
                        <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Daily Rate</p>
                        <p className="text-xl font-black text-white italic">~1.00%</p>
                    </div>
                </div>
                <div className="glass-card p-6 border-white/5 bg-white/[0.01] flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                        <PieChart className="text-purple-500" />
                    </div>
                    <div>
                        <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Active Portfolios</p>
                        <p className="text-xl font-black text-white italic">{[...new Set(history.map(h => h.investmentId?._id))].length}</p>
                    </div>
                </div>
                <div className="glass-card p-6 border-white/5 bg-white/[0.01] flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
                        <CheckCircle2 className="text-green-500" />
                    </div>
                    <div>
                        <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Profit Status</p>
                        <p className="text-xl font-black text-green-500 italic uppercase">Ongoing</p>
                    </div>
                </div>
            </div>

            {/* ── Daily Profit Log ── */}
            <div className="glass-card overflow-hidden border-white/5">
                <div className="p-6 border-b border-white/5 flex items-center gap-4">
                    <History size={18} className="text-gray-600" />
                    <h4 className="text-white font-black uppercase text-xs italic tracking-widest">Personal Profit Log</h4>
                </div>

                <div className="overflow-x-auto min-h-[400px]">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/[0.02] border-b border-white/5">
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Date</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Investment Base</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">ROI Rate</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Earning</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            {history.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-32 text-center text-gray-800 text-[11px] font-black uppercase tracking-widest">
                                        Waiting for first trading cycle...
                                    </td>
                                </tr>
                            ) : (
                                history.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-white/[0.01] transition-colors group">
                                        <td className="p-5">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-blue-500/30 transition-all">
                                                    <Calendar size={14} className="text-gray-600" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-white font-black text-xs uppercase italic">{new Date(item.createdAt).toLocaleDateString()}</span>
                                                    <span className="text-[8px] text-gray-700 font-bold uppercase tracking-widest">{new Date(item.createdAt).toLocaleTimeString()}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex flex-col">
                                                <span className="text-gray-400 font-black text-xs">${item.investmentId?.amount?.toLocaleString()}</span>
                                                <span className="text-[8px] text-gray-800 font-bold uppercase">Base Capital</span>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <span className="text-blue-500 font-black text-sm italic">{item.percentage}% Daily</span>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex flex-col">
                                                <span className="text-green-500 font-black text-lg italic tracking-tighter underline underline-offset-4 decoration-green-500/20">+${item.amount.toLocaleString()}</span>
                                                <span className="text-[8px] text-gray-700 font-black uppercase mt-0.5">Credited</span>
                                            </div>
                                        </td>
                                        <td className="p-5 text-center">
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-green-500/10 text-green-500 border border-green-500/20 text-[9px] font-black uppercase tracking-widest">
                                                <CheckCircle2 size={12} /> Received
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TradingProfitReport;
