import React, { useState, useEffect } from 'react';
import api from '../../../api/apiConfig';
import { 
  Send, User as UserIcon, DollarSign, 
  CheckCircle2, AlertCircle, Loader2, 
  ArrowRight, ShieldCheck, History,
  Info, Wallet, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InternalTransfer = () => {
    const [amount, setAmount] = useState('');
    const [targetUsername, setTargetUsername] = useState('');
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [balance, setBalance] = useState(0);
    const [targetUser, setTargetUser] = useState(null);
    const [lookingUp, setLookingUp] = useState(false);

    useEffect(() => {
        fetchBalance();
    }, []);

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            if (targetUsername) lookupTarget();
            else setTargetUser(null);
        }, 800);
        return () => clearTimeout(delaySearch);
    }, [targetUsername]);

    const lookupTarget = async () => {
        setLookingUp(true);
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const res = await api.get(`/auth/lookup/${targetUsername}`);
            setTargetUser(res.data);
        } catch (err) {
            setTargetUser(null);
        } finally {
            setLookingUp(false);
        }
    };

    const fetchBalance = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user?.token;
            if (!token) return;
            const res = await api.get('/auth/profile');
            setBalance(res.data.balance || 0);
        } catch (err) {
            console.error('Error fetching balance:', err.response?.data || err.message);
        }
    };

    const handleTransfer = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user?.token;
            if (!token) return setError('Please login first');

            const res = await api.post('/transfers', { amount, targetUsername, note });

            setSuccess(true);
            setBalance(res.data.newBalance);
            setAmount('');
            setTargetUsername('');
            setNote('');
        } catch (err) {
            setError(err.response?.data?.message || 'Transfer failed');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="max-w-2xl mx-auto py-20 text-center animate-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/10">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Transfer Successful</h2>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-[0.3em] mt-4">Funds have been dispatched to the target node.</p>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button 
                        onClick={() => setSuccess(false)}
                        className="px-10 py-4 bg-amber-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-amber-600 transition-all shadow-xl shadow-amber-500/20"
                    >
                        New Transfer
                    </button>
                    <button 
                        onClick={() => window.location.href = '/user/fund/transfer-history'}
                        className="px-10 py-4 bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all"
                    >
                        View History
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
                <div className="space-y-2">
                    <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">Internal Dispatch</h2>
                    <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.3em] ml-1">Secure P2P Wallet Transfer Protocol</p>
                </div>
                <div className="glass-card px-8 py-3 bg-amber-500/5 border-amber-500/20">
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-1">Available Liquidity</p>
                    <p className="text-2xl font-black text-white">${balance.toFixed(2)}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                {/* Transfer Form */}
                <div className="lg:col-span-3 space-y-8">
                    <div className="glass-card p-10 border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full -mr-32 -mt-32"></div>
                        
                        <form onSubmit={handleTransfer} className="space-y-8 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] text-gray-600 font-black uppercase tracking-widest ml-1 flex items-center gap-2">
                                        <UserIcon size={12} className="text-amber-500" /> Target Node (Username)
                                    </label>
                                    <input 
                                        type="text" 
                                        required
                                        placeholder="Enter username..."
                                        value={targetUsername}
                                        onChange={(e) => setTargetUsername(e.target.value)}
                                        className="w-full bg-white/[0.02] border border-white/5 py-4 px-6 rounded-2xl text-white font-black uppercase tracking-widest text-xs focus:outline-none focus:border-amber-500/50 transition-all placeholder:text-gray-800"
                                    />
                                    <AnimatePresence>
                                        {lookingUp ? (
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 mt-2 ml-1">
                                                <Loader2 size={10} className="animate-spin text-amber-500" />
                                                <span className="text-[9px] text-gray-700 font-black uppercase tracking-widest">Identifying Node...</span>
                                            </motion.div>
                                        ) : targetUser ? (
                                            <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 mt-2 ml-1">
                                                <CheckCircle2 size={10} className="text-green-500" />
                                                <span className="text-[10px] text-white font-black uppercase tracking-widest">{targetUser.fullName}</span>
                                                {targetUser.position && (
                                                    <span className={`px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase border ${targetUser.position === 'L' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-blue-500/10 text-blue-500 border-blue-500/20'}`}>
                                                        {targetUser.position === 'L' ? 'Left Leg' : 'Right Leg'}
                                                    </span>
                                                )}
                                            </motion.div>
                                        ) : targetUsername && (
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 mt-2 ml-1 text-red-500">
                                                <AlertCircle size={10} />
                                                <span className="text-[9px] font-black uppercase tracking-widest">Node Not Found</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] text-gray-600 font-black uppercase tracking-widest ml-1 flex items-center gap-2">
                                        <DollarSign size={12} className="text-amber-500" /> Dispatch Amount (USD)
                                    </label>
                                    <input 
                                        type="number" 
                                        required
                                        placeholder="0.00"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className={`w-full bg-white/[0.02] border py-4 px-6 rounded-2xl text-white font-black text-lg focus:outline-none transition-all placeholder:text-gray-800 ${Number(amount) > balance ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.1)]' : 'border-white/5 focus:border-amber-500/50'}`}
                                    />
                                    <AnimatePresence>
                                        {amount && Number(amount) > balance && (
                                            <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mt-2 ml-1 text-red-500">
                                                <AlertCircle size={10} />
                                                <span className="text-[9px] font-black uppercase tracking-widest">Insufficient Liquidity</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] text-gray-600 font-black uppercase tracking-widest ml-1">Transfer Note (Optional)</label>
                                <textarea 
                                    rows={2}
                                    placeholder="Add a reference note..."
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    className="w-full bg-white/[0.02] border border-white/5 py-4 px-6 rounded-2xl text-white text-xs focus:outline-none focus:border-amber-500/50 transition-all italic placeholder:text-gray-800 resize-none"
                                />
                            </div>

                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, y: -10 }} 
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-xs font-bold"
                                >
                                    <AlertCircle size={16} /> {error}
                                </motion.div>
                            )}

                            <div className="bg-amber-500/5 border border-amber-500/10 p-6 rounded-2xl space-y-3">
                                <div className="flex items-center gap-3 text-amber-500">
                                    <ShieldCheck size={18} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Verification Protocol Active</span>
                                </div>
                                <p className="text-[9px] text-gray-600 leading-relaxed font-bold uppercase tracking-widest">
                                    By proceeding, you authorize the permanent transmission of funds to target node <span className="text-white">@{targetUsername || '...'}</span>. This operation is irreversible once confirmed.
                                </p>
                            </div>

                            <button 
                                type="submit"
                                disabled={loading || !amount || !targetUsername || Number(amount) > balance || !targetUser}
                                className="w-full py-5 bg-amber-500 text-white font-black uppercase tracking-widest text-sm rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-amber-500/20 hover:bg-amber-600 active:scale-95 disabled:opacity-30 disabled:grayscale transition-all"
                            >
                                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <><Send size={18} /> Execute Transmission</>}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Info Sidebar */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="glass-card p-8 border-white/5 space-y-6">
                        <div className="flex items-center gap-3 text-white font-black text-sm uppercase tracking-widest">
                            <Info size={18} className="text-amber-500" /> Transfer Rules
                        </div>
                        <div className="space-y-4">
                            {[
                                'Minimum transfer amount is $1.00 USD.',
                                'Funds are transferred instantly to the target wallet.',
                                'Username must be precisely correct.',
                                'Dispatch logs are recorded in history permanently.',
                                'Internal transfers are tax-free within the ecosystem.'
                            ].map((rule, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">{rule}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button 
                        onClick={() => window.location.href = '/user/fund/transfer-history'}
                        className="w-full glass-card p-6 border-white/5 flex items-center justify-between group hover:bg-white/[0.03] transition-all"
                    >
                        <div className="flex items-center gap-4 text-left">
                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-gray-500 group-hover:text-amber-500 transition-colors">
                                <History size={20} />
                            </div>
                            <div>
                                <p className="text-white text-xs font-black uppercase tracking-widest">View History</p>
                                <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest mt-0.5">Audit past transmissions</p>
                            </div>
                        </div>
                        <ChevronRight className="text-gray-700 group-hover:text-white transition-colors" size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InternalTransfer;
