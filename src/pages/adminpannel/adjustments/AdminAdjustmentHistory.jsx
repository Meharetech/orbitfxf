import React, { useState, useEffect } from 'react';
import api from '../../../api/apiConfig';
import { 
    History, User, DollarSign, Calendar, 
    ArrowDownRight, ArrowUpRight, ShieldCheck, 
    Loader2, Search, Filter, Wallet, Briefcase,
    MessageSquare
} from 'lucide-react';

const AdminAdjustmentHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const res = await api.get('/admin/adjustment-history');
            setHistory(res.data);
        } catch (err) {
            console.error('Error fetching audit history:', err);
        } finally {
            setLoading(false);
        }
    };

    const filtered = history.filter(h => 
        h.userId?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.note?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">Loading Audit Ledger...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">
                        Fiscal <span className="text-amber-500">Audit Ledger</span>
                    </h2>
                    <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">
                        Planetary Administrative Override History
                    </p>
                </div>

                <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 px-5 py-3 rounded-2xl w-full md:w-96">
                    <Search className="text-gray-600 w-4 h-4" />
                    <input 
                        type="text" 
                        placeholder="Search by username or audit note..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-transparent border-none outline-none text-[11px] font-black uppercase text-white placeholder:text-gray-700 w-full"
                    />
                </div>
            </div>

            {/* ── Ledger Legend ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl flex items-center gap-4">
                    <Wallet size={20} className="text-blue-500" />
                    <div>
                        <p className="text-[10px] text-white font-black uppercase italic">Wallet Assets</p>
                        <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest leading-none mt-1">Liquid Balance Adjustments</p>
                    </div>
                </div>
                <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl flex items-center gap-4">
                    <Briefcase size={20} className="text-amber-500" />
                    <div>
                        <p className="text-[10px] text-white font-black uppercase italic">Investment Portfolio</p>
                        <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest leading-none mt-1">Principal Capital Overrides</p>
                    </div>
                </div>
            </div>

            {/* ── Audit Table ── */}
            <div className="glass-card overflow-hidden border-white/5 bg-[#0a0f1d]/50 shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/[0.02] border-b border-white/5">
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Administrative Log</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Target Node</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Mutation Type</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Amount</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Audit Note</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700 text-right">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-20 text-center text-gray-800 text-[10px] font-black uppercase tracking-widest italic">
                                        Audit Ledger Empty
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((log) => (
                                    <tr key={log._id} className="hover:bg-white/[0.01] transition-all group">
                                        <td className="p-5">
                                            <div className="flex items-center gap-4 text-left">
                                                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-xs text-gray-500 group-hover:border-white/20 transition-all">
                                                    {log.userId?.username?.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-white font-black text-[13px] uppercase italic">@{log.userId?.username}</p>
                                                    <p className="text-gray-700 text-[8px] font-black uppercase tracking-[0.1em]">{log.adminId || 'TRD-001'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase border tracking-widest
                                                ${log.target === 'Wallet' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                                                {log.target === 'Wallet' ? <Wallet size={12} /> : <Briefcase size={12} />}
                                                {log.target}
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <div className={`flex items-center gap-2 font-black uppercase text-[10px] italic tracking-widest ${log.type === 'Withdraw' ? 'text-red-500' : 'text-emerald-500'}`}>
                                                {log.type === 'Withdraw' ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
                                                {log.type}al
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <span className={`text-lg font-black italic tracking-tighter ${log.type === 'Withdraw' ? 'text-red-500' : 'text-emerald-500'}`}>
                                                {log.type === 'Withdraw' ? '-' : '+'}${log.amount.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="p-5 max-w-xs">
                                            <div className="flex items-start gap-3">
                                                <MessageSquare size={12} className="text-gray-700 mt-0.5 shrink-0" />
                                                <p className="text-[10px] text-gray-500 font-bold leading-relaxed italic">{log.note || 'No administrative justification provided.'}</p>
                                            </div>
                                        </td>
                                        <td className="p-5 text-right flex flex-col items-end">
                                            <p className="text-[11px] text-white font-black italic leading-none mb-1">{new Date(log.createdAt).toLocaleDateString()}</p>
                                            <p className="text-[9px] text-gray-700 font-bold uppercase tracking-widest">{new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
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

export default AdminAdjustmentHistory;
