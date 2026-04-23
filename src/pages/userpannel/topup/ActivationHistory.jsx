import React, { useState, useEffect } from 'react';
import api from '../../../api/apiConfig';
import {
    Zap, Calendar, ShieldCheck, Clock,
    CheckCircle2, AlertCircle, Loader2,
    TrendingUp, HistoryIcon, Globe,
    ArrowUpRight, ShieldAlert, Award,
    CheckCircle, XCircle, Ban
} from 'lucide-react';

const ActivationHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await api.get('/reports/activation-history');
                setHistory(res.data);
            } catch (err) {
                console.error('Error fetching activation history:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const activeRecord = history.find(h => !h.isExpired);

    // Days countdown color
    const daysColor = (days) => {
        if (days > 90) return 'text-green-500';
        if (days > 30) return 'text-amber-500';
        return 'text-red-500';
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
                <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">Compiling Node History...</p>
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-in fade-in duration-1000">

            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">
                        Protocol <span className="text-amber-500">History</span>
                    </h2>
                    <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">
                        Node Authorization — Annual Subscription Archive
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="px-6 py-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                        <p className="text-[9px] text-amber-500 font-black uppercase tracking-widest leading-none mb-1">Authorization Status</p>
                        <p className={`text-xl font-black italic tracking-tighter ${activeRecord ? 'text-white' : 'text-red-500'}`}>
                            {activeRecord ? 'ACTIVE PROTOCOL' : 'NODES DEACTIVATED'}
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Summary Matrix ── */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="glass-card p-6 border-white/5 bg-white/[0.01] space-y-2 group">
                     <div className="flex items-center justify-between">
                        <ShieldCheck className={`w-5 h-5 ${activeRecord ? 'text-green-500' : 'text-gray-700'}`} />
                        <span className={`text-[10px] font-black uppercase tracking-widest ${activeRecord ? 'text-green-500' : 'text-gray-700'}`}>
                            {activeRecord ? 'Verified' : 'Required'}
                        </span>
                     </div>
                     <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest leading-none">Security Node</p>
                     <p className="text-xl font-black text-white italic tracking-tighter">{activeRecord ? 'VIP AUTHORIZED' : 'INACTIVE'}</p>
                </div>
                <div className="glass-card p-6 border-white/5 bg-white/[0.01] space-y-2 group">
                     <div className="flex items-center justify-between">
                        <Calendar className="text-blue-500 w-5 h-5" />
                        <span className="text-[10px] text-blue-500 font-black uppercase tracking-widest">Archive</span>
                     </div>
                     <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest leading-none">Total Cycles</p>
                     <p className="text-xl font-black text-white italic tracking-tighter">{history.length} ACTIVATIONS</p>
                </div>
                <div className="glass-card p-6 border-white/5 bg-white/[0.01] space-y-2 group">
                     <div className="flex items-center justify-between">
                        <Zap className="text-amber-500 w-5 h-5 group-hover:animate-pulse transition-all" />
                        <span className="text-[10px] text-amber-500 font-black uppercase tracking-widest">Integrity</span>
                     </div>
                     <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest leading-none">Global Coverage</p>
                     <p className="text-xl font-black text-white italic tracking-tighter font-orbitron">20 LEVELS</p>
                </div>
                <div className="glass-card p-6 border-white/5 bg-white/[0.01] space-y-2 group">
                     <div className="flex items-center justify-between">
                        <Clock className="text-purple-500 w-5 h-5" />
                        <span className="text-[10px] text-purple-500 font-black uppercase tracking-widest">Countdown</span>
                     </div>
                     <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest leading-none">Cycle Expiration</p>
                     <p className={`text-xl font-black italic tracking-tighter ${activeRecord ? 'text-white' : 'text-red-500'}`}>
                        {activeRecord ? `${activeRecord.daysRemaining} DAYS LEFT` : 'PROTOCOL EXPIRED'}
                     </p>
                </div>
            </div>

            {/* ── High-Fidelity History Ledger ── */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-3">
                         <HistoryIcon size={18} className="text-amber-500" />
                         <h4 className="text-white font-black uppercase text-xs italic tracking-widest">Full Authorization Archive</h4>
                    </div>
                </div>

                <div className="glass-card border-white/5 bg-white/[0.01] overflow-hidden">
                    <div className="overflow-x-auto min-h-[400px]">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/[0.02] border-b border-white/5">
                                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-700">Protocol Node</th>
                                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-700">Cost Basis</th>
                                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-700">Authorization Cycle</th>
                                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-700">Status Vector</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.03]">
                                {history.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="p-32 text-center">
                                            <div className="flex flex-col items-center gap-4 opacity-20">
                                               <ShieldAlert size={48} className="text-gray-500" />
                                               <p className="text-gray-500 text-[11px] font-black uppercase tracking-widest italic leading-none">No authorization history detected</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    history.map((record, idx) => (
                                        <tr key={record._id} className={`hover:bg-white/[0.02] transition-all group ${!record.isExpired ? 'bg-amber-500/[0.02]' : ''}`}>
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner border transition-all ${record.isExpired ? 'bg-white/5 border-white/5' : 'bg-amber-500/10 border-amber-500/20 shadow-amber-500/5 group-hover:scale-110'}`}>
                                                        <Zap size={18} className={record.isExpired ? 'text-gray-700' : 'text-amber-500'} />
                                                    </div>
                                                    <div>
                                                        <p className={`text-[12px] font-black uppercase italic leading-none mb-1 ${record.isExpired ? 'text-gray-600' : 'text-white'}`}>{record.planName}</p>
                                                        <p className="text-gray-700 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 leading-none">
                                                            <Globe size={10} /> OFX-PROTOCOL-{record._id.slice(-6).toUpperCase()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex flex-col">
                                                    <p className={`text-xl font-black italic tabular-nums leading-none ${record.isExpired ? 'text-gray-700 opacity-50' : 'text-white'}`}>${record.amount.toLocaleString()}</p>
                                                    <span className="text-[9px] text-gray-700 font-black uppercase tracking-[0.2em] mt-1.5 italic">Annual Fee</span>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-8">
                                                    <div>
                                                        <span className="text-[10px] text-gray-700 font-black uppercase tracking-widest block mb-1">Activated</span>
                                                        <div className="flex items-center gap-2">
                                                            <Calendar size={11} className="text-gray-700" />
                                                            <span className="text-[11px] text-gray-400 font-bold">{new Date(record.activatedOn).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                    <div className="w-px h-8 bg-white/5" />
                                                    <div>
                                                        <span className="text-[10px] text-gray-700 font-black uppercase tracking-widest block mb-1">Expired</span>
                                                        <div className="flex items-center gap-2">
                                                            <Clock size={11} className="text-gray-700" />
                                                            <span className={`text-[11px] font-bold ${record.isExpired ? 'text-red-500/60' : 'text-amber-500/80'}`}>{new Date(record.expiryDate).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6 text-right">
                                                <div className="flex flex-col items-center justify-center gap-2">
                                                    {record.isExpired ? (
                                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-gray-700 border border-white/10 text-[10px] font-black uppercase tracking-widest opacity-40">
                                                            <Ban size={12} /> Cycle Terminated
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 text-green-500 border border-green-500/20 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-green-500/10">
                                                                <Award size={12} fill="currentColor" className="opacity-20" /> VIP Node
                                                            </div>
                                                            <p className={`text-[10px] font-black italic ${daysColor(record.daysRemaining)} animate-pulse`}>
                                                                {record.daysRemaining} Days Left
                                                            </p>
                                                        </>
                                                    )}
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

            {/* Bottom Insight */}
            <div className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-3xl flex flex-col md:flex-row items-center gap-4 justify-between">
                 <div className="flex items-center gap-3">
                    <CheckCircle className="text-amber-500" size={16} />
                    <p className="text-[10px] text-amber-400 font-black uppercase tracking-[0.2em]">Node Integrity Check: HK-X2 Protocol Verified</p>
                 </div>
                 <div className="flex gap-6">
                     <p className="text-[9px] text-gray-700 font-black uppercase tracking-widest flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-amber-500" /> Auto-Renewal: Manual
                     </p>
                     <p className="text-[9px] text-gray-700 font-black uppercase tracking-widest flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-blue-500" /> Encryption: PGP-4096
                     </p>
                 </div>
            </div>

        </div>
    );
};

export default ActivationHistory;
