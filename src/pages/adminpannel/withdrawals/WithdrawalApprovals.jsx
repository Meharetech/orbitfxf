import React, { useState, useEffect } from 'react';
import api from '../../../api/apiConfig';
import { 
  CheckCircle2, XCircle, Clock, 
  Loader2, RefreshCw, AlertCircle,
  ShieldCheck, Wallet, User as UserIcon,
  Search, Filter, ArrowDownToLine,
  ExternalLink, MessageSquare,
  TrendingUp, TrendingDown, Activity,
  Database, HardDrive, Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WithdrawalApprovals = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);
    const [adminNote, setAdminNote] = useState('');
    const [showNoteModal, setShowNoteModal] = useState(null);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const res = await api.get('/withdrawals/admin');
            setRequests(res.data);
        } catch (err) {
            console.error('Error fetching requests');
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (id, status) => {
        setActionLoading(id);
        try {
            await api.patch(`/withdrawals/${id}/review`, { status, adminNote });
            fetchRequests();
            setShowNoteModal(null);
            setAdminNote('');
        } catch (err) {
            alert(err.response?.data?.message || 'Action failed');
        } finally {
            setActionLoading(null);
        }
    };

    const stats = {
        totalDone: requests.filter(r => r.status === 'Approved').reduce((s, r) => s + r.amount, 0),
        pending: requests.filter(r => r.status === 'Pending').length,
        rejected: requests.filter(r => r.status === 'Rejected').length,
        volume: requests.reduce((s, r) => s + r.amount, 0)
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="text-amber-500 animate-spin w-10 h-10" />
                <p className="text-gray-600 text-[9px] font-black uppercase tracking-widest italic animate-pulse">Scanning Extraction Queue...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-700 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/10">
                        <ArrowDownToLine className="text-amber-500 w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                        <h2 className="text-xl font-black text-white uppercase tracking-tight italic leading-none">
                            Extraction <span className="text-amber-500">Protocols</span>
                        </h2>
                        <p className="text-gray-600 text-[9px] font-black uppercase tracking-widest">Global Asset Liquidation Authorization</p>
                    </div>
                </div>
                
                <button 
                    onClick={fetchRequests}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-tighter text-gray-500 hover:text-white transition-all transform active:scale-95 shadow-lg shadow-black/20"
                >
                    <RefreshCw size={12} className={loading ? 'animate-spin' : ''} /> Sync Queue
                </button>
            </div>

            {/* Stats Banner - High Density */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Withdrawal Done', value: `$${stats.totalDone.toLocaleString()}`, icon: CheckCircle2, color: 'emerald', detail: 'Completed Protocols' },
                    { label: 'Live Extractions', value: stats.pending, icon: Activity, color: 'amber', detail: 'Awaiting Authorization' },
                    { label: 'Failed Attempts', value: stats.rejected, icon: XCircle, color: 'red', detail: 'Security Rejections' },
                    { label: 'Gross Volume', value: `$${stats.volume.toLocaleString()}`, icon: Database, color: 'blue', detail: 'Total Asset Circulation' }
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

            {requests.length === 0 ? (
                <div className="py-20 text-center glass-card border-white/5 bg-white/[0.01]">
                    <AlertCircle className="w-10 h-10 text-gray-800 mx-auto mb-4" />
                    <p className="text-gray-700 text-[10px] font-black uppercase tracking-[0.2em] italic">Queue Empty: All Protocol Nodes Synchronized.</p>
                </div>
            ) : (
                <div className="glass-card overflow-hidden border-white/5 bg-[#0a0f1d]/50">
                    <div className="p-4 border-b border-white/5 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                             <Cpu className="text-amber-500 w-3.5 h-3.5" />
                             <h4 className="text-white font-black uppercase text-[10px] italic tracking-widest">Active Redemption Matrix</h4>
                         </div>
                         <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              <span className="text-[8px] text-gray-700 font-black uppercase">Sequencing Real-time</span>
                         </div>
                    </div>

                    <div className="overflow-x-auto text-[11px]">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white/[0.01] border-b border-white/5">
                                    <th className="px-5 py-3 text-[9px] font-black text-gray-700 uppercase tracking-widest">Subject Node</th>
                                    <th className="px-5 py-3 text-[9px] font-black text-gray-700 uppercase tracking-widest text-center">Protocol Net</th>
                                    <th className="px-5 py-3 text-[9px] font-black text-gray-700 uppercase tracking-widest">Destination Layer</th>
                                    <th className="px-5 py-3 text-[9px] font-black text-gray-700 uppercase tracking-widest">Status / Date</th>
                                    <th className="px-5 py-3 text-[9px] font-black text-gray-700 uppercase tracking-widest text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.03]">
                                {requests.map((req) => (
                                    <tr key={req._id} className="hover:bg-amber-500/[0.02] transition-all group">
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-7 h-7 bg-white/5 rounded flex items-center justify-center font-black text-xs text-gray-700 group-hover:bg-amber-500/10 group-hover:text-amber-500 transition-colors">
                                                    {req.userId?.username?.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-white font-black uppercase italic leading-none group-hover:text-amber-500 transition-colors">@{req.userId?.username}</span>
                                                    <span className="text-[8px] text-gray-700 font-bold uppercase tracking-tight mt-0.5">{req.userId?.fullName}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 text-center">
                                            <div className="flex flex-col items-center">
                                                <span className="text-white font-black italic text-xs leading-none mb-1">${req.amount.toFixed(0)}</span>
                                                <div className="flex items-center gap-1.5 text-[7px] font-black uppercase tracking-tighter opacity-70">
                                                    <span className="text-emerald-500">Net: ${req.netAmount.toFixed(0)}</span>
                                                    <span className="text-red-500">Fee: ${req.serviceFee.toFixed(0)}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] text-amber-500 font-black uppercase tracking-tighter italic leading-none mb-1">{req.walletNetwork}</span>
                                                <span className="text-[8px] text-white/50 font-mono break-all max-w-[150px]">{req.walletAddress}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3">
                                            <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter mb-1 ${
                                                req.status === 'Pending' ? 'bg-amber-500/5 text-amber-500 border border-amber-500/10' :
                                                req.status === 'Approved' ? 'bg-emerald-500/5 text-emerald-500 border border-emerald-500/10' :
                                                'bg-red-500/5 text-red-500 border border-red-500/10'
                                            }`}>
                                                <div className={`w-1 h-1 rounded-full ${
                                                    req.status === 'Pending' ? 'bg-amber-500' :
                                                    req.status === 'Approved' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' :
                                                    'bg-red-500'
                                                }`} />
                                                {req.status}
                                            </div>
                                            <p className="text-[8px] text-gray-700 font-bold uppercase tracking-tight">
                                                {new Date(req.createdAt).toLocaleDateString()}
                                            </p>
                                        </td>
                                        <td className="px-5 py-3 text-right">
                                            {req.status === 'Pending' ? (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button 
                                                        onClick={() => setShowNoteModal({ id: req._id, action: 'Approved' })}
                                                        className="p-1.5 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-black rounded-lg transition-all transform active:scale-95"
                                                    >
                                                        <CheckCircle2 size={13} />
                                                    </button>
                                                    <button 
                                                        onClick={() => setShowNoteModal({ id: req._id, action: 'Rejected' })}
                                                        className="p-1.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-black rounded-lg transition-all transform active:scale-95"
                                                    >
                                                        <XCircle size={13} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="max-w-[120px] ml-auto">
                                                    <p className="text-[8px] text-white/40 font-black uppercase tracking-tighter truncate leading-none mb-0.5 italic">Protocol Log:</p>
                                                    <p className="text-[9px] text-white/50 font-bold lowercase tracking-tight truncate italic">{req.adminNote || 'No Manual Note'}</p>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Note Modal */}
            <AnimatePresence>
                {showNoteModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-sm glass-card p-8 border-white/10 shadow-2xl space-y-6"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${showNoteModal.action === 'Approved' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'}`}>
                                    {showNoteModal.action === 'Approved' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                                </div>
                                <div>
                                    <h3 className="text-white text-[15px] font-black uppercase tracking-tight italic leading-tight">Authorize Protocol</h3>
                                    <p className="text-gray-500 text-[8px] font-black uppercase tracking-[0.2em]">Manual Review Override</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] text-gray-700 font-black uppercase tracking-widest ml-1 flex items-center gap-2 italic">
                                    <MessageSquare size={10} className="text-amber-500" /> Administrative Audit Note
                                </label>
                                <textarea 
                                    rows={3}
                                    placeholder="Enter reference node or rationale..."
                                    value={adminNote}
                                    onChange={(e) => setAdminNote(e.target.value)}
                                    className="w-full bg-white/[0.02] border border-white/5 py-4 px-5 rounded-xl text-white text-[10px] focus:outline-none focus:border-amber-500/30 transition-all italic placeholder:text-gray-900 resize-none font-bold"
                                />
                            </div>

                            <div className="flex gap-3">
                                <button onClick={() => setShowNoteModal(null)} className="flex-1 py-3 bg-white/5 border border-white/5 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all">Cancel</button>
                                <button 
                                    onClick={() => handleAction(showNoteModal.id, showNoteModal.action)}
                                    disabled={actionLoading}
                                    className={`flex-1 py-3 text-black text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                                        showNoteModal.action === 'Approved' ? 'bg-emerald-500 hover:bg-emerald-400' : 'bg-red-500 hover:bg-red-400'
                                    }`}
                                >
                                    {actionLoading ? <Loader2 className="animate-spin w-4 h-4 mx-auto" /> : `Confirm ${showNoteModal.action}`}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WithdrawalApprovals;
