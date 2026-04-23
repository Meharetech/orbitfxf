import React, { useState, useEffect } from 'react';
import api from '../../../api/apiConfig';
import { 
  History, Wallet, ShieldCheck, Clock, 
  CheckCircle2, XCircle, Loader2, 
  Hash, Image, ChevronDown, ChevronUp,
  AlertCircle, Landmark, RefreshCw
} from 'lucide-react';

const FundRequestHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedRow, setExpandedRow] = useState(null);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user?.token;
            if (!token) return;
            const res = await api.get('/funds/history');
            setHistory(res.data);
        } catch (err) {
            console.error('Error fetching history:', err);
        } finally {
            setLoading(false);
        }
    };

    const statusConfig = {
        Pending:  { color: 'text-amber-400',  bg: 'bg-amber-400/10',  border: 'border-amber-400/20',  icon: <Clock size={12} /> },
        Approved: { color: 'text-green-400',  bg: 'bg-green-400/10',  border: 'border-green-400/20',  icon: <CheckCircle2 size={12} /> },
        Rejected: { color: 'text-red-400',    bg: 'bg-red-400/10',    border: 'border-red-400/20',    icon: <XCircle size={12} /> },
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
                <div>
                    <h2 className="text-3xl font-black text-white tracking-tight uppercase flex items-center gap-3">
                        <History className="text-amber-500 w-7 h-7" /> Fund History
                    </h2>
                    <p className="text-gray-500 text-[11px] font-bold uppercase tracking-[0.25em] mt-1 ml-10">
                        Complete Deposit Transmission Log
                    </p>
                </div>
                <button
                    onClick={fetchHistory}
                    className="self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all text-[10px] font-black uppercase tracking-widest"
                >
                    <RefreshCw size={14} /> Refresh
                </button>
            </div>

            {/* Summary Strip */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: 'Total Requests', value: history.length, color: 'text-white' },
                    { label: 'Approved',       value: history.filter(h => h.status === 'Approved').length, color: 'text-green-400' },
                    { label: 'Pending',        value: history.filter(h => h.status === 'Pending').length,  color: 'text-amber-400' },
                ].map((stat) => (
                    <div key={stat.label} className="glass-card p-5 border-white/5 bg-white/[0.01] text-center">
                        <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                        <p className="text-gray-600 text-[9px] font-black uppercase tracking-widest mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Table */}
            {loading ? (
                <div className="py-24 flex justify-center">
                    <Loader2 className="text-amber-500 animate-spin w-10 h-10" />
                </div>
            ) : history.length === 0 ? (
                <div className="py-24 text-center glass-card border-white/5 bg-white/[0.01] space-y-4">
                    <AlertCircle className="w-10 h-10 text-gray-700 mx-auto" />
                    <p className="text-gray-700 text-xs font-black uppercase tracking-[0.3em] italic">No fund requests submitted yet.</p>
                </div>
            ) : (
                <div className="glass-card overflow-hidden border-white/5 bg-white/[0.01]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="bg-white/[0.03] border-b border-white/5">
                                    {['#', 'Date', 'Amount', 'Method', 'Transaction ID', 'Status', 'Note', 'Proof'].map((h) => (
                                        <th key={h} className="px-5 py-4 text-[9px] font-black text-white/40 uppercase tracking-[0.2em] whitespace-nowrap">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.03]">
                                {history.map((req, index) => {
                                    const status = statusConfig[req.status] || statusConfig.Pending;
                                    const isExpanded = expandedRow === req._id;
                                    return (
                                        <React.Fragment key={req._id}>
                                            <tr className="hover:bg-white/[0.015] transition-colors group">
                                                {/* # */}
                                                <td className="px-5 py-4">
                                                    <span className="text-[10px] text-gray-700 font-black">#{index + 1}</span>
                                                </td>

                                                {/* Date */}
                                                <td className="px-5 py-4 whitespace-nowrap">
                                                    <p className="text-[11px] text-white/70 font-bold">
                                                        {new Date(req.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                    </p>
                                                    <p className="text-[9px] text-gray-700 font-bold mt-0.5">
                                                        {new Date(req.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </td>

                                                {/* Amount */}
                                                <td className="px-5 py-4">
                                                    <span className="text-white font-black text-base tracking-tight">${Number(req.amount).toFixed(2)}</span>
                                                </td>

                                                {/* Method */}
                                                <td className="px-5 py-4 whitespace-nowrap">
                                                    <div className="flex flex-col gap-0.5">
                                                        <span className="text-[11px] text-white/80 font-black uppercase">{req.paymentMethod?.name || '—'}</span>
                                                        <span className="text-[9px] text-amber-500/70 font-bold uppercase tracking-widest">{req.paymentMethod?.network || ''}</span>
                                                    </div>
                                                </td>

                                                {/* Transaction ID */}
                                                <td className="px-5 py-4 max-w-[160px]">
                                                    <p className="text-[10px] text-white/40 font-mono truncate" title={req.transactionId}>
                                                        {req.transactionId}
                                                    </p>
                                                </td>

                                                {/* Status */}
                                                <td className="px-5 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${status.color} ${status.bg} ${status.border}`}>
                                                        {status.icon} {req.status}
                                                    </span>
                                                </td>

                                                {/* Admin Note */}
                                                <td className="px-5 py-4 max-w-[140px]">
                                                    {req.adminNote ? (
                                                        <p className="text-[10px] text-gray-500 italic truncate" title={req.adminNote}>"{req.adminNote}"</p>
                                                    ) : (
                                                        <span className="text-gray-800 text-[9px] font-bold">—</span>
                                                    )}
                                                </td>

                                                {/* Proof / Screenshot */}
                                                <td className="px-5 py-4">
                                                    <button
                                                        onClick={() => setExpandedRow(isExpanded ? null : req._id)}
                                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all"
                                                    >
                                                        <Image size={12} />
                                                        {isExpanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
                                                    </button>
                                                </td>
                                            </tr>

                                            {/* Expandable Screenshot Row */}
                                            {isExpanded && (
                                                <tr className="bg-black/20">
                                                    <td colSpan={8} className="px-6 py-6">
                                                        <div className="flex flex-col sm:flex-row gap-6 items-start">
                                                            <div className="shrink-0">
                                                                <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-3">Payment Proof Screenshot</p>
                                                                <img
                                                                    src={req.screenshot}
                                                                    alt="Payment Screenshot"
                                                                    className="w-48 max-h-48 object-contain rounded-xl border border-white/10 bg-white/5 p-2"
                                                                />
                                                            </div>
                                                            <div className="space-y-4 flex-1">
                                                                <div>
                                                                    <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1.5">Full Transaction Hash</p>
                                                                    <p className="text-[11px] text-white/60 font-mono bg-black/30 border border-white/5 rounded-xl px-4 py-3 break-all">{req.transactionId}</p>
                                                                </div>
                                                                {req.paymentMethod?.walletAddress && (
                                                                    <div>
                                                                        <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1.5">Sent To Address</p>
                                                                        <p className="text-[11px] text-amber-500/60 font-mono bg-black/30 border border-white/5 rounded-xl px-4 py-3 break-all">{req.paymentMethod.walletAddress}</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FundRequestHistory;
