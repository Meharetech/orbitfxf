import React, { useState, useEffect } from 'react';
import api from '../../../api/apiConfig';
import { 
    Briefcase, User, Calendar, CheckCircle2, 
    XCircle, Clock, Loader2, Search,
    ArrowDownRight, ShieldCheck, Wallet, AlertCircle
} from 'lucide-react';
import PremiumModal from '../../../components/common/PremiumModal';

const AdminInvestmentWithdrawals = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [processingId, setProcessingId] = useState(null);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [adminNote, setAdminNote] = useState('');
    const [forceTerminate, setForceTerminate] = useState(false);
    const [selectedAction, setSelectedAction] = useState({ id: null, status: '' });

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const res = await api.get('/admin/investment-withdrawals');
            setRequests(res.data);
        } catch (err) {
            console.error('Error fetching liquidation requests:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleProcess = async (requestId, status) => {
        setAdminNote('');
        setForceTerminate(false);
        setSelectedAction({ id: requestId, status });
        setIsModalOpen(true);
    };

    const confirmProcess = async () => {
        const { id, status } = selectedAction;
        setIsModalOpen(false);
        setProcessingId(id);
        setMessage({ type: '', text: '' });

        try {
            const res = await api.post('/admin/investment-withdrawals/process', {
                requestId: id,
                status,
                adminNote,
                forceTerminate: status === 'Rejected' ? forceTerminate : false
            });
            setMessage({ type: 'success', text: res.data.message });
            fetchRequests();
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.message || 'Processing failed.' });
        } finally {
            setProcessingId(null);
            setSelectedAction({ id: null, status: '' });
        }
    };

    const filtered = requests.filter(r => 
        r.userId?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">Loading Requests...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">
                        Capital <span className="text-amber-500">Withdrawals</span>
                    </h2>
                    <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">
                        Investment Liquidation Management Center
                    </p>
                </div>

                <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 px-5 py-3 rounded-2xl w-full md:w-96">
                    <Search className="text-gray-600 w-4 h-4" />
                    <input 
                        type="text" 
                        placeholder="Search by username or status..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-transparent border-none outline-none text-[11px] font-black uppercase text-white placeholder:text-gray-700 w-full"
                    />
                </div>
            </div>

            {message.text && (
                <div className={`p-4 rounded-xl flex items-center gap-3 animate-in slide-in-from-top ${message.type === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-500' : 'bg-red-500/10 border border-red-500/20 text-red-500'}`}>
                    <AlertCircle size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{message.text}</span>
                </div>
            )}

            {/* ── Requests Table ── */}
            <div className="glass-card overflow-hidden border-white/5">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/[0.02] border-b border-white/5">
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-600">Investor</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-600">Principal Amount</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-600">Requested On</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-600 text-center">Status</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-20 text-center text-gray-800 text-[10px] font-black uppercase tracking-widest italic">
                                        No liquidation requests found
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((req) => (
                                    <tr key={req._id} className="hover:bg-white/[0.01] transition-colors group">
                                        <td className="p-5">
                                            <div className="flex items-center gap-4 text-left">
                                                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-black text-amber-500 text-sm">
                                                    {req.userId?.username?.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-white font-black text-sm uppercase">@{req.userId?.username}</p>
                                                    <p className="text-gray-600 text-[9px] font-bold uppercase tracking-widest">{req.userId?.fullName}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex items-center gap-2">
                                                <span className="text-white font-black text-lg italic decoration-amber-500/30 underline decoration-2 underline-offset-4">${req.amount?.toLocaleString()}</span>
                                                <div className="px-2 py-0.5 bg-white/5 rounded text-[8px] text-gray-600 font-black uppercase tracking-widest">
                                                    Principal
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-5">
                                            <div className="space-y-0.5">
                                                <p className="text-[10px] text-gray-500 font-bold italic">{new Date(req.createdAt).toLocaleDateString()}</p>
                                                <p className="text-[8px] text-gray-700 font-bold">{new Date(req.createdAt).toLocaleTimeString()}</p>
                                            </div>
                                        </td>
                                        <td className="p-5 text-center">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border
                                                ${req.status === 'Pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                                                  req.status === 'Approved' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                                                  'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                                                {req.status === 'Pending' ? <Clock size={12} /> : 
                                                 req.status === 'Approved' ? <CheckCircle2 size={12} /> : 
                                                 <XCircle size={12} />}
                                                {req.status}
                                            </div>
                                            {req.adminNote && (
                                                <p className="text-[7px] text-gray-700 font-bold uppercase mt-1.5 opacity-60">Note: {req.adminNote}</p>
                                            )}
                                        </td>
                                        <td className="p-5 text-right">
                                            {req.status === 'Pending' ? (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button 
                                                        disabled={processingId === req._id}
                                                        onClick={() => handleProcess(req._id, 'Approved')}
                                                        className="px-4 py-2 bg-green-500 rounded-xl text-white font-black text-[9px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-green-500/20 disabled:opacity-50"
                                                    >
                                                        {processingId === req._id ? <Loader2 size={10} className="animate-spin" /> : 'Approve'}
                                                    </button>
                                                    <button 
                                                        disabled={processingId === req._id}
                                                        onClick={() => handleProcess(req._id, 'Rejected')}
                                                        className="px-4 py-2 bg-red-500 rounded-xl text-white font-black text-[9px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-red-500/20 disabled:opacity-50"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            ) : (
                                                <p className="text-[9px] text-gray-700 font-black uppercase italic tracking-widest">Processed</p>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <PremiumModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmProcess}
                title={`${selectedAction.status} Request?`}
                message={`Are you sure you want to ${selectedAction.status?.toLowerCase()} this capital withdrawal request for $${requests.find(r => r._id === selectedAction.id)?.amount?.toLocaleString()}?`}
                type={selectedAction.status === 'Approved' ? 'success' : 'danger'}
                confirmText={`Confirm ${selectedAction.status}`}
                cancelText="Decline Action"
                showInput={true}
                inputValue={adminNote}
                onInputChange={setAdminNote}
                inputPlaceholder={`Optional ${selectedAction.status?.toLowerCase()} reason...`}
            >
                {selectedAction.status === 'Rejected' && (
                    <div className="flex items-center gap-3 mt-4 p-3 bg-red-500/5 border border-red-500/10 rounded-xl transition-all hover:bg-red-500/10 group cursor-pointer" onClick={() => setForceTerminate(!forceTerminate)}>
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${forceTerminate ? 'bg-red-500 border-red-500' : 'border-gray-800 bg-transparent'}`}>
                            {forceTerminate && <CheckCircle2 size={12} className="text-white" />}
                        </div>
                        <div>
                             <p className="text-[10px] font-black text-red-500 uppercase tracking-tighter italic">REJECT & TERMINATE INVESTMENT</p>
                             <p className="text-[8px] text-gray-700 font-bold uppercase leading-none mt-0.5">Note: This will remove funds (Capital) from user active portfolio without payout.</p>
                        </div>
                    </div>
                )}
            </PremiumModal>
        </div>
    );
};

export default AdminInvestmentWithdrawals;
