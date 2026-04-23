import React, { useState, useEffect } from 'react';
import api from '../../../api/apiConfig';
import { 
    Users, DollarSign, History, 
    CheckCircle2, Loader2, ArrowUpRight,
    TrendingUp, Award, Layers,
    Zap, Gem, Target, Sparkles,
    ChevronLeft, ChevronRight
} from 'lucide-react';

const ReferralIncomeReport = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                // 1. Fetch AI Bot Commissions
                const botRes = await api.get('/bots/income');
                const botData = botRes.data.map(item => ({ ...item, type: 'Bot Activation' }));

                // 2. Fetch Trading Profit Level Rewards
                const tradingRes = await api.get('/reports/trading-level');
                const tradingData = tradingRes.data.map(item => ({ ...item, type: 'Trading Level' }));

                // 3. Merge and Sort chronologically
                const merged = [...botData, ...tradingData].sort((a, b) => 
                    new Date(b.createdAt) - new Date(a.createdAt)
                );

                setHistory(merged);
            } catch (err) {
                console.error('Error fetching referral income:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const totalIncome = history.reduce((sum, item) => sum + item.amount, 0);

    // ── Pagination Logic ──
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = history.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(history.length / itemsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-12 h-12 text-green-500 animate-spin" />
                <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">Loading Referral Income...</p>
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-in fade-in duration-1000">

            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/5">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">
                        Referral <span className="text-green-500">Income</span>
                    </h2>
                    <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">
                        Total Network Rewards — Bot Activations & Trading Profit Level Sharing
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-5 py-3 bg-green-500/10 border border-green-500/20 rounded-2xl shadow-[0_0_25px_rgba(34,197,94,0.1)]">
                        <p className="text-[9px] text-green-500 font-black uppercase tracking-widest">Total Commission Received</p>
                        <p className="text-2xl font-black text-white italic underline decoration-green-500/30 underline-offset-4">${totalIncome.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            {/* ── Unified List View ── */}
            <div className="flex flex-col gap-10">
                
                {/* ── Level Protocol Structure (Horizontal Matrix) ── */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-3">
                             <Layers size={18} className="text-green-500" />
                             <h4 className="text-white font-black uppercase text-xs italic tracking-widest">Network Payout Matrix</h4>
                        </div>
                        <span className="text-[10px] text-green-500 font-black uppercase tracking-widest italic opacity-80">35% Unified Protocol Sharing</span>
                    </div>

                    <div className="glass-card border-green-500/20 bg-green-500/[0.02] p-2">
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                            {[
                                { level: 'Level 1', income: '10%' },
                                { level: 'Level 2', income: '5%' },
                                { level: 'Level 3', income: '5%' },
                                { level: 'Level 4', income: '3%' },
                                { level: 'Level 5', income: '2%' },
                                { level: 'L6 - L10', income: '1%' },
                                { level: 'L11 - L20', income: '0.5%' },
                            ].map((row, idx) => (
                                <div key={idx} className="bg-white/[0.03] border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center gap-1 hover:bg-green-500/5 transition-all group">
                                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest group-hover:text-gray-300 transition-colors">{row.level}</span>
                                    <span className="text-2xl font-black text-green-500 italic group-hover:scale-110 transition-transform">{row.income}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Income History (Full Width List) ── */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-3">
                             <TrendingUp size={18} className="text-green-500" />
                             <h4 className="text-white font-black uppercase text-xs italic tracking-widest">Detailed Earning history</h4>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="px-3 py-1 bg-white/5 rounded-lg text-[9px] text-gray-500 font-black uppercase italic tracking-widest">Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, history.length)} of {history.length} Records</span>
                        </div>
                    </div>

                    <div className="glass-card border-white/5 bg-white/[0.01]">
                        <div className="overflow-x-auto min-h-[400px]">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/[0.02] border-b border-white/5">
                                        <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Source Level</th>
                                        <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">From Contributor</th>
                                        <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Amount</th>
                                        <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Date/Time</th>
                                        <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/[0.03]">
                                    {currentItems.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="p-32 text-center text-gray-800 text-[11px] font-black uppercase tracking-widest italic opacity-50">
                                               No network income archived yet
                                            </td>
                                        </tr>
                                    ) : (
                                        currentItems.map((item, idx) => (
                                            <tr key={idx} className="hover:bg-white/[0.01] transition-colors group">
                                                <td className="p-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-[11px] font-black text-green-500 shadow-lg shadow-green-500/5 group-hover:scale-110 transition-transform">
                                                            L{item.level}
                                                        </div>
                                                        <span className="text-[11px] font-black text-gray-300 uppercase italic tracking-widest">Generation {item.level}</span>
                                                    </div>
                                                </td>
                                                <td className="p-5">
                                                    <div className="flex flex-col">
                                                        <span className="text-white font-black text-sm uppercase tracking-tighter decoration-green-500/20 underline underline-offset-4">{item.fromUserId?.fullName}</span>
                                                        <span className="text-[8px] text-green-500 font-bold uppercase tracking-widest mt-1">{item.fromUserId?.username}</span>
                                                    </div>
                                                </td>
                                                <td className="p-5">
                                                    <div className="flex flex-col">
                                                        <span className="text-green-500 font-black text-xl italic tracking-tight">+${item.amount.toLocaleString()}</span>
                                                        <div className={`mt-1.5 px-2 py-0.5 rounded text-[7px] font-black uppercase tracking-widest w-fit ${item.type === 'Bot Activation' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
                                                            {item.type || 'Commission'}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-5">
                                                    <p className="text-[10px] text-gray-500 font-bold">{new Date(item.createdAt).toLocaleDateString()}</p>
                                                    <p className="text-[8px] text-gray-700 font-bold uppercase tracking-tighter mt-0.5">{new Date(item.createdAt).toLocaleTimeString()}</p>
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

                        {/* ── Pagination Controls ── */}
                        {totalPages > 1 && (
                            <div className="p-6 border-t border-white/5 flex items-center justify-between bg-white/[0.01]">
                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest italic tabular-nums">
                                    Page <span className="text-white">{currentPage}</span> of {totalPages}
                                </p>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => paginate(Math.max(1, currentPage - 1))}
                                        disabled={currentPage === 1}
                                        className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 disabled:opacity-20 transition-all"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                    
                                    <div className="flex items-center gap-1.5">
                                        {[...Array(totalPages)].map((_, i) => {
                                            const page = i + 1;
                                            // Show only current, first, last and surrounding pages
                                            if (
                                                page === 1 || 
                                                page === totalPages || 
                                                (page >= currentPage - 1 && page <= currentPage + 1)
                                            ) {
                                                return (
                                                    <button
                                                        key={page}
                                                        onClick={() => paginate(page)}
                                                        className={`w-8 h-8 rounded-lg text-[10px] font-black transition-all ${
                                                            currentPage === page 
                                                                ? 'bg-green-500 text-black shadow-lg shadow-green-500/20' 
                                                                : 'bg-white/5 text-gray-500 hover:text-white hover:bg-white/10'
                                                        }`}
                                                    >
                                                        {page}
                                                    </button>
                                                );
                                            } else if (
                                                (page === currentPage - 2 && page > 1) ||
                                                (page === currentPage + 2 && page < totalPages)
                                            ) {
                                                return <span key={page} className="text-gray-700 text-xs">..</span>;
                                            }
                                            return null;
                                        })}
                                    </div>

                                    <button
                                        onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                                        disabled={currentPage === totalPages}
                                        className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 disabled:opacity-20 transition-all"
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ReferralIncomeReport;
