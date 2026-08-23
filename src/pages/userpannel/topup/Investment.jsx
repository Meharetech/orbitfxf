import React, { useState, useEffect } from 'react';
import api from '../../../api/apiConfig';
import { 
    Zap, Briefcase, Wallet, Clock, 
    ArrowRightCircle, CheckCircle2, 
    ShieldAlert, Loader2, ArrowUpRight, Plus,
    History, TrendingUp, AlertCircle, Ban,
    ArrowDownCircle, Lock, Info, Activity,
    ShieldCheck, Globe, Target, CreditCard, Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PremiumModal from '../../../components/common/PremiumModal';

const Investment = () => {
    const [amount, setAmount] = useState('');
    const [isActivated, setIsActivated] = useState(false);
    const [balance, setBalance] = useState(0);
    const [investments, setInvestments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isInvestConfirmOpen, setIsInvestConfirmOpen] = useState(false);
    const [selectedInvestmentId, setSelectedInvestmentId] = useState(null);

    useEffect(() => {
        fetchUserData();
        fetchHistory();
    }, []);

    const fetchUserData = async () => {
        try {
            const res = await api.get('/auth/profile');
            setIsActivated(res.data.isActivated);
            setBalance(res.data.balance);
        } catch (err) {
            console.error('Error fetching user:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchHistory = async () => {
        try {
            const res = await api.get('/investments/history');
            setInvestments(res.data);
        } catch (err) {
            console.error('Error fetching history:', err);
        }
    };

    const handleInvest = async (e) => {
        e.preventDefault();
        const numAmount = Number(amount);
        if (!amount || numAmount < 50) return setMessage({ type: 'error', text: 'Minimum investment is $50' });
        
        // Open confirmation instead of immediate execution
        setIsInvestConfirmOpen(true);
    };

    const confirmInvestment = async () => {
        setIsInvestConfirmOpen(false);
        setActionLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const numAmount = Number(amount);
            const res = await api.post('/investments/purchase', 
                { amount: numAmount }
            );
            
            setMessage({ type: 'success', text: res.data.message });
            setAmount('');
            fetchUserData();
            fetchHistory();
        } catch (err) {
            setMessage({ 
                type: 'error', 
                text: err.response?.data?.message || 'Transaction failed.' 
            });
        } finally {
            setActionLoading(false);
        }
    };

    const handleWithdrawCapital = (investmentId) => {
        setSelectedInvestmentId(investmentId);
        setIsModalOpen(true);
    };

    const confirmWithdrawal = async () => {
        setIsModalOpen(false);
        setActionLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const res = await api.post('/investments/withdraw', { investmentId: selectedInvestmentId });
            setMessage({ type: 'success', text: res.data.message });
            fetchUserData(); // Instantly update available wallet balance
            fetchHistory();  // Instantly update investments table
        } catch (err) {
            setMessage({ 
                type: 'error', 
                text: err.response?.data?.message || 'Withdrawal request failed.' 
            });
        } finally {
            setActionLoading(false);
            setSelectedInvestmentId(null);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                <p className="text-gray-600 text-[9px] font-black uppercase tracking-widest italic opacity-50">Synchronizing Nodes...</p>
            </div>
        );
    }

    const totalActiveCapital = investments.filter(i => i.status === 'Active').reduce((sum, i) => sum + i.amount, 0);

    return (
        <div className="space-y-6 animate-in fade-in duration-700">

            {/* ── Header (Compact) ── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/5">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">
                        Portfolio <span className="text-blue-500">Injection</span>
                    </h2>
                    <p className="text-gray-600 text-[8px] font-black uppercase tracking-[0.3em]">Institutional Algorithmic Growth Engine</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-5 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center gap-3">
                        <Wallet size={14} className="text-blue-400" />
                        <div>
                             <p className="text-[7px] text-blue-400 font-black uppercase tracking-widest leading-none mb-0.5 opacity-60">Liquidity</p>
                             <p className="text-lg font-black text-white italic leading-none">${balance.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Case 2: ACTIVATED (Full Width List) ── */}
            {true && (
                <div className="flex flex-col gap-6 w-full">
                    
                    {/* Summary Row (Compact) */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                            { label: 'Active Capital', value: `$${totalActiveCapital.toLocaleString()}`, icon: Activity, color: 'text-blue-500', bg: 'bg-blue-500/5' },
                            { label: 'Active Nodes', value: `${investments.filter(i => i.status === 'Active').length} SLOTS`, icon: Target, color: 'text-emerald-400', bg: 'bg-emerald-500/5' },
                            { label: 'Network ROI', value: 'PROTOCOL LIVE', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/5' },
                            { label: 'Withdrawal', value: '24/7 OPEN', icon: ShieldCheck, color: 'text-crypto-violet', bg: 'bg-crypto-violet/5' },
                        ].map((stat, i) => (
                            <div key={i} className={`p-4 rounded-2xl border border-white/5 bg-white/[0.01] flex items-center justify-between group hover:bg-white/[0.03] transition-all`}>
                                 <div className="space-y-0.5">
                                    <p className="text-[7px] text-gray-500 font-black uppercase tracking-widest">{stat.label}</p>
                                    <p className="text-sm font-black text-white italic tracking-tighter uppercase tabular-nums">{stat.value}</p>
                                 </div>
                                 <stat.icon className={`${stat.color} w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity`} />
                            </div>
                        ))}
                    </div>

                    {/* Compact Injection Terminal (Stacked Vertical) */}
                    <div className="glass-card p-6 border-white/5 bg-white/[0.01] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                            <TrendingUp size={64} className="text-blue-500" />
                        </div>
                        
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10 w-full">
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20">
                                        <TrendingUp size={18} className="text-blue-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-black uppercase text-[11px] italic tracking-widest leading-none mb-1">New Node Activation</h4>
                                        <p className="text-gray-600 text-[8px] font-bold uppercase tracking-widest leading-none">Min Protocol entry: $50.00</p>
                                    </div>
                                </div>

                                <form onSubmit={handleInvest} className="flex flex-col md:flex-row gap-4 w-full">
                                    <div className="flex-1 relative group">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-blue-500/30">
                                            <span className="text-xl font-black italic">$</span>
                                        </div>
                                        <input 
                                            type="number" 
                                            step="0.01"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="50.00"
                                            className="w-full bg-white/[0.02] border-2 border-white/5 rounded-2xl py-4 pl-12 pr-6 text-2xl font-black text-white focus:outline-none focus:border-blue-500/30 transition-all placeholder:text-gray-900 group-hover:bg-white/[0.04]"
                                        />
                                    </div>
                                    <button 
                                        disabled={actionLoading}
                                        className="px-10 py-4 bg-blue-500 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_10px_20px_rgba(59,130,246,0.3)] disabled:opacity-50 flex items-center justify-center gap-3 group whitespace-nowrap"
                                    >
                                        {actionLoading ? <Loader2 size={16} className="animate-spin" /> : <><Plus size={16} strokeWidth={4} /> Invest Now</>}
                                    </button>
                                </form>
                            </div>

                            {/* Alert/Message compact */}
                            {message.text && (
                                <div className={`md:max-w-xs w-full p-4 rounded-xl flex items-center gap-3 animate-in slide-in-from-right-4 duration-500 ${message.type === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-500'}`}>
                                    {message.type === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                                    <span className="text-[10px] font-black uppercase tracking-widest leading-tight">{message.text}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Nodes History Table (Full Width) */}
                    <div className="glass-card border-white/5 bg-white/[0.01] overflow-hidden">
                        <div className="p-5 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <History size={16} className="text-gray-500" />
                                <h4 className="text-white font-black uppercase text-[10px] italic tracking-widest">Active nodes Ledger</h4>
                            </div>
                            <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-gray-700 italic">
                                <span className="flex items-center gap-1.5"><Globe size={11} className="text-blue-500/50" /> Protocol OFX-H24</span>
                                <span className="opacity-30">|</span>
                                <span className="flex items-center gap-1.5"><ShieldCheck size={11} className="text-emerald-500/50" /> Verified History</span>
                            </div>
                        </div>

                        <div className="overflow-x-auto min-h-[300px]">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-white/[0.02] border-b border-white/5">
                                        <th className="p-4 text-[9px] font-black uppercase tracking-widest text-gray-700">Protocol Node</th>
                                        <th className="p-4 text-[9px] font-black uppercase tracking-widest text-gray-700">Principal Yield</th>
                                        <th className="p-4 text-[9px] font-black uppercase tracking-widest text-gray-700 text-center">Status Matrix</th>
                                        <th className="p-4 text-[9px] font-black uppercase tracking-widest text-gray-700 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/[0.03]">
                                    {investments.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="p-24 text-center">
                                                <p className="text-gray-800 text-[10px] font-black uppercase tracking-[0.3em] flex flex-col items-center gap-4 opacity-30 italic">
                                                    <Briefcase size={40} /> No active capital nodes archived
                                                </p>
                                            </td>
                                        </tr>
                                    ) : (
                                        [...investments].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).map((inv, idx) => (
                                            <tr key={inv._id} className="hover:bg-white/[0.02] transition-all group">
                                                <td className="p-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-inner transition-all ${inv.status === 'Completed' ? 'bg-white/5 border-white/5' : 'bg-blue-500/10 border-blue-500/20 group-hover:scale-110'}`}>
                                                            <Briefcase size={16} className={inv.status === 'Completed' ? 'text-gray-800' : 'text-blue-500'} />
                                                        </div>
                                                        <div>
                                                            <p className={`text-[12px] font-black tracking-tighter uppercase italic leading-none mb-1 ${inv.status === 'Completed' ? 'text-gray-700' : 'text-white'}`}>#OFX-{inv._id.slice(-8).toUpperCase()}</p>
                                                            <p className="text-[8px] text-gray-700 font-black uppercase tracking-widest flex items-center gap-1.5 leading-none">
                                                                <Calendar size={10} /> {new Date(inv.createdAt).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex flex-col">
                                                        <span className={`text-xl font-black italic tracking-tighter tabular-nums ${inv.status === 'Completed' ? 'text-gray-700 opacity-30 line-through' : 'text-white'}`}>${inv.amount.toLocaleString()}</span>
                                                        <span className="text-[8px] text-gray-600 font-black uppercase tracking-[0.2em] mt-1 italic">Capital Asset</span>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-center">
                                                     <div className="flex flex-col items-center gap-1.5">
                                                        {inv.status === 'Active' ? (
                                                            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[9px] font-black uppercase tracking-widest rounded-lg flex items-center gap-1.5 shadow-lg shadow-emerald-500/5">
                                                                <CheckCircle2 size={10} /> LIVE
                                                            </span>
                                                        ) : (
                                                            <span className="px-3 py-1 bg-white/5 text-gray-700 border border-white/10 text-[9px] font-black uppercase tracking-widest rounded-lg flex items-center gap-1.5 opacity-40">
                                                                <Lock size={10} /> {inv.status}
                                                            </span>
                                                        )}
                                                        {inv.adminNote && (
                                                            <p className="text-[7px] text-blue-500 font-black uppercase italic tracking-tighter max-w-[120px] line-clamp-1 opacity-60">Note: {inv.adminNote}</p>
                                                        )}
                                                     </div>
                                                </td>
                                                <td className="p-4 text-right">
                                                    {inv.status === 'Active' && (
                                                        <button 
                                                            onClick={() => handleWithdrawCapital(inv._id)}
                                                            className="px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all hover:bg-red-500 hover:text-white hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] shadow-lg shadow-red-500/5 group"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <ArrowDownCircle size={12} className="group-hover:translate-y-0.5 transition-transform" />
                                                                Withdraw Now
                                                            </div>
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Bottom Insight (Compact) */}
            <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl flex flex-col md:flex-row items-center gap-3 justify-between">
                 <div className="flex items-center gap-2 opacity-50">
                    <ShieldCheck size={12} className="text-blue-400" />
                    <p className="text-[8px] text-gray-500 font-black uppercase tracking-[0.2em] italic">Protocol HK-99 Institutional Trading Verification Active</p>
                 </div>
                 <div className="flex gap-4 items-center">
                     <span className="text-[8px] text-gray-700 font-black uppercase tracking-[0.2em]">Data Feed: Real-Time</span>
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                 </div>
            </div>

            <PremiumModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmWithdrawal}
                title="Confirm Instant Capital Withdrawal?"
                message="Are you sure you want to withdraw your core trading capital? Your invested capital will be refunded instantly to your available wallet liquidity balance."
                type="warning"
                confirmText="Instant Withdraw Now"
                cancelText="Retain Investment"
            />

            <PremiumModal 
                isOpen={isInvestConfirmOpen}
                onClose={() => setIsInvestConfirmOpen(false)}
                onConfirm={confirmInvestment}
                title="Authorize Portfolio Investment?"
                message={`You are about to inject $${amount} into the institutional trading node. Please confirm you want to proceed with this investment.`}
                type="info"
                confirmText="Yes, Invest Now"
                cancelText="No, Change Amount"
            />
        </div>
    );
};

export default Investment;
