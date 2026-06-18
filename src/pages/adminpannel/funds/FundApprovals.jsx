import React, { useState, useEffect } from 'react';
import api from '../../../api/apiConfig';
import { 
  CheckCircle2, XCircle, Clock, 
  Loader2, RefreshCw, ChevronDown,
  ChevronUp, Image, AlertCircle,
  ShieldCheck, Wallet, Activity,
  Database, ArrowUpToLine, Cpu,
  Search, MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FundApprovals = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState('Pending');
    const [expandedRow, setExpandedRow] = useState(null);
    const [noteMap, setNoteMap] = useState({});
    const [processing, setProcessing] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => { fetchRequests(); }, []);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const res = await api.get('/funds/admin');
            setRequests(res.data);
        } catch (err) {
            console.error('Error fetching requests');
        } finally {
            setLoading(false);
        }
    };

    const handleReview = async (id, status) => {
        setProcessing(id + status);
        try {
            await api.patch(`/funds/${id}/review`, {
                status,
                adminNote: noteMap[id] || ''
            });
            setNoteMap(prev => { const n = {...prev}; delete n[id]; return n; });
            setExpandedRow(null);
            fetchRequests();
        } catch (err) {
            alert('Review failed');
        } finally {
            setProcessing(null);
        }
    };

    const safeRequests = Array.isArray(requests) ? requests : [];
    const stats = {
        totalRecharge: safeRequests.filter(r => r.status === 'Approved').reduce((s, r) => s + Number(r.amount || 0), 0),
        pending: safeRequests.filter(r => r.status === 'Pending').length,
        rejected: safeRequests.filter(r => r.status === 'Rejected').length,
        volume: safeRequests.reduce((s, r) => s + Number(r.amount || 0), 0)
    };

    const statusConfig = {
        Pending:  { color: 'text-amber-500',  bg: 'bg-amber-500/5',  border: 'border-amber-500/10',  icon: <Clock size={10} /> },
        Approved: { color: 'text-emerald-500', bg: 'bg-emerald-500/5', border: 'border-emerald-500/10', icon: <CheckCircle2 size={10} /> },
        Rejected: { color: 'text-red-500',    bg: 'bg-red-500/5',    border: 'border-red-500/10',    icon: <XCircle size={10} /> },
    };

    const filtered = safeRequests.filter(r => r.status === tab);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="text-amber-500 animate-spin w-10 h-10" />
                <p className="text-gray-600 text-[9px] font-black uppercase tracking-widest italic animate-pulse">Scanning Inflow Registry...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-700 pb-20">
            {/* Full Proof Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out"
                    >
                        <img src={selectedImage} alt="TX Proof" className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl border border-white/10 p-2" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/10">
                        <ArrowUpToLine className="text-amber-500 w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                        <h2 className="text-xl font-black text-white uppercase tracking-tight italic leading-none">
                            Capital <span className="text-amber-500">Inflow</span>
                        </h2>
                        <p className="text-gray-600 text-[9px] font-black uppercase tracking-widest">Global Deposit Verification Protocol</p>
                    </div>
                </div>
                
                <button 
                    onClick={fetchRequests}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-tighter text-gray-500 hover:text-white transition-all transform active:scale-95 shadow-lg shadow-black/20"
                >
                    <RefreshCw size={12} className={loading ? 'animate-spin' : ''} /> Sync Registry
                </button>
            </div>

            {/* Stats Banner - High Density */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Recharge Done', value: `$${stats.totalRecharge.toLocaleString()}`, icon: CheckCircle2, color: 'emerald', detail: 'Verified Deposits' },
                    { label: 'Awaiting Review', value: stats.pending, icon: Activity, color: 'amber', detail: 'Pending Auth' },
                    { label: 'Security Rejections', value: stats.rejected, icon: XCircle, color: 'red', detail: 'Failed Inflow' },
                    { label: 'Protocol Volume', value: `$${stats.volume.toLocaleString()}`, icon: Database, color: 'blue', detail: 'Sum of Admissions' }
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-4 border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all group overflow-hidden relative">
                         <div className={`absolute -right-2 -top-2 opacity-[0.03] group-hover:scale-150 transition-transform duration-700`}>
                             <stat.icon size={60} />
                         </div>
                         <div className="flex flex-col gap-1">
                             <p className="text-[8px] text-gray-700 font-black uppercase tracking-widest italic">{stat.label}</p>
                             <h4 className="text-lg font-black text-white italic tracking-tighter leading-none">{stat.value}</h4>
                             <p className={`text-[7px] text-${stat.color}-500 font-black uppercase tracking-tighter mt-1`}>{stat.detail}</p>
                         </div>
                    </div>
                ))}
            </div>

            {/* Tab Controls */}
            <div className="flex items-center gap-2 p-1 bg-white/[0.03] border border-white/5 rounded-xl w-max">
                {['Pending', 'Approved', 'Rejected'].map(t => (
                    <button key={t} onClick={() => setTab(t)}
                        className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${tab === t ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'text-gray-500 hover:text-white'}`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* Active Matrix */}
            <div className="glass-card overflow-hidden border-white/5 bg-[#0a0f1d]/50">
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                         <Cpu className="text-amber-500 w-3.5 h-3.5" />
                         <h4 className="text-white font-black uppercase text-[10px] italic tracking-widest">Deposit Admission Matrix</h4>
                     </div>
                     <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[8px] text-gray-700 font-black uppercase">Live Sequencing</span>
                     </div>
                </div>

                <div className="overflow-x-auto text-[11px]">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/[0.01] border-b border-white/5">
                                <th className="px-5 py-3 text-[9px] font-black text-white/40 uppercase tracking-widest">Subject Node</th>
                                <th className="px-5 py-3 text-[9px] font-black text-white/40 uppercase tracking-widest">Quantum</th>
                                <th className="px-5 py-3 text-[9px] font-black text-white/40 uppercase tracking-widest">Method / Network</th>
                                <th className="px-5 py-3 text-[9px] font-black text-white/40 uppercase tracking-widest">TX Reference</th>
                                <th className="px-5 py-3 text-[9px] font-black text-white/40 uppercase tracking-widest">Status / Date</th>
                                <th className="px-5 py-3 text-[9px] font-black text-white/40 uppercase tracking-widest text-right">Audit</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-20 text-center space-y-3">
                                        <AlertCircle className="w-10 h-10 text-gray-900 mx-auto" />
                                        <p className="text-gray-900 text-[10px] font-black uppercase tracking-widest italic">All nodes synchronized.</p>
                                    </td>
                                </tr>
                            ) : filtered.map((req) => {
                                const status = statusConfig[req.status] || statusConfig.Pending;
                                const isExpanded = expandedRow === req._id;
                                return (
                                    <React.Fragment key={req._id}>
                                        <tr className="hover:bg-amber-500/[0.02] transition-colors group">
                                            <td className="px-5 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-7 h-7 bg-white/5 rounded flex items-center justify-center font-black text-[10px] text-gray-700 group-hover:bg-amber-500/10 group-hover:text-amber-500 transition-colors">
                                                        {req.user?.username?.charAt(0)?.toUpperCase() || '?'}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-white font-black uppercase italic leading-none truncate max-w-[100px]">@{req.user?.username || 'Deleted User'}</span>
                                                        <span className="text-[8px] text-gray-700 font-bold uppercase tracking-tight mt-0.5">{req.user?.fullName || 'N/A'}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3">
                                                <span className="text-white font-black italic text-xs leading-none">${Number(req.amount || 0).toFixed(0)}</span>
                                            </td>
                                            <td className="px-5 py-3">
                                                <div className="flex flex-col">
                                                    <span className="text-[9px] text-white/80 font-black uppercase italic leading-none mb-1">{req.paymentMethod?.name || 'Manual Deposit'}</span>
                                                    <span className="text-[7px] text-amber-500 font-black uppercase tracking-tighter">{req.paymentMethod?.network || 'Wallet'}</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3">
                                                <span className="text-[9px] text-white/60 font-mono italic truncate max-w-[80px] block">{req.transactionId || '—'}</span>
                                            </td>
                                            <td className="px-5 py-3">
                                                <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter mb-1 ${status.bg} ${status.color} border ${status.border}`}>
                                                    {status.icon} {req.status}
                                                </div>
                                                <p className="text-[8px] text-gray-700 font-bold uppercase tracking-tight">
                                                    {new Date(req.createdAt).toLocaleDateString()}
                                                </p>
                                            </td>
                                            <td className="px-5 py-3 text-right">
                                                <button onClick={() => setExpandedRow(isExpanded ? null : req._id)}
                                                    className="p-1.5 bg-white/5 hover:bg-amber-500/10 border border-white/5 rounded-lg text-gray-500 hover:text-amber-500 transition-all transform active:scale-95"
                                                >
                                                    {isExpanded ? <ChevronUp size={13}/> : <ChevronDown size={13}/>}
                                                </button>
                                            </td>
                                        </tr>
                                        {isExpanded && (
                                            <tr className="bg-black/40 border-l border-r border-white/5">
                                                <td colSpan={6} className="px-8 py-6">
                                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                                        <div className="lg:col-span-3">
                                                            <p className="text-[8px] font-black text-gray-700 uppercase tracking-widest mb-3 italic">TX Proof Verification</p>
                                                            <img src={req.screenshot} alt="TX Proof" onClick={() => setSelectedImage(req.screenshot)}
                                                                className="w-full h-auto max-h-[180px] object-contain rounded-lg border border-white/5 bg-white/[0.02] p-2 cursor-zoom-in hover:border-amber-500/30 transition-all shadow-2xl" 
                                                            />
                                                        </div>
                                                        <div className="lg:col-span-4 space-y-4">
                                                            <div>
                                                                <p className="text-[8px] font-black text-gray-700 uppercase tracking-widest mb-1.5 italic">Node Connectivity</p>
                                                                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px]">
                                                                    <span className="text-gray-800 font-black uppercase italic">Email:</span>
                                                                    <span className="text-white/60 truncate italic">{req.user?.email}</span>
                                                                    <span className="text-gray-800 font-black uppercase italic">Phone:</span>
                                                                    <span className="text-white/60 italic">{req.user?.phone}</span>
                                                                </div>
                                                            </div>
                                                            {req.transactionId && (
                                                                <div>
                                                                    <p className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1.5 italic">Master Hash Reference</p>
                                                                    <p className="text-[9px] text-white/60 font-mono bg-black/60 border border-white/5 rounded-lg p-3 break-all italic leading-relaxed">{req.transactionId}</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="lg:col-span-5">
                                                            {req.status === 'Pending' ? (
                                                                <div className="space-y-4">
                                                                    <p className="text-[8px] font-black text-gray-700 uppercase tracking-widest italic">Administrative Override</p>
                                                                    <textarea placeholder="Instructional payload or rationale..." rows={3} value={noteMap[req._id] || ''}
                                                                        onChange={e => setNoteMap(prev => ({...prev, [req._id]: e.target.value}))}
                                                                        className="w-full bg-black/60 border border-white/5 rounded-xl p-4 text-[10px] text-white focus:outline-none focus:border-amber-500/20 italic placeholder:text-gray-900 resize-none font-bold"
                                                                    />
                                                                    <div className="grid grid-cols-2 gap-3">
                                                                        <button onClick={() => handleReview(req._id, 'Approved')} disabled={!!processing}
                                                                            className="py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-[10px] uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/10 disabled:opacity-50"
                                                                        >
                                                                            {processing === req._id+'Approved' ? <Loader2 size={12} className="animate-spin"/> : <><CheckCircle2 size={12}/> Confirm Inflow</>}
                                                                        </button>
                                                                        <button onClick={() => handleReview(req._id, 'Rejected')} disabled={!!processing}
                                                                            className="py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-black font-black text-[10px] uppercase tracking-widest rounded-xl transition-all border border-red-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
                                                                        >
                                                                            {processing === req._id+'Rejected' ? <Loader2 size={12} className="animate-spin"/> : <><XCircle size={12}/> Abort Sequence</>}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-2">
                                                                    <p className="text-[8px] font-black text-gray-700 uppercase tracking-widest italic">Protocol Log Audit</p>
                                                                    <p className="text-[10px] text-white/60 italic">"{req.adminNote || 'No manual instructions logged for this node.'}"</p>
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
        </div>
    );
};

export default FundApprovals;
