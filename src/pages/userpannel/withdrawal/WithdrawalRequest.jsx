import React, { useState, useEffect } from 'react';
import api from '../../../api/apiConfig';
import { 
  DollarSign, Wallet, ShieldCheck, 
  Clock, AlertCircle, CheckCircle2, 
  Loader2, ArrowUpRight, History, 
  Zap, Info, ChevronRight, Calculator,
  X, HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WithdrawalRequest = () => {
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [balance, setBalance] = useState(0);
    const [wallet, setWallet] = useState({ address: '', network: '' });
    const [settings, setSettings] = useState({ withdrawalFee: 10, minWithdrawal: 1 });
    
    // Modal & Confirmation State
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    useEffect(() => {
        fetchProfile();
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await api.get('/settings');
            setSettings(res.data);
        } catch (err) {
            console.error('Error fetching settings');
        }
    };

    const fetchProfile = async () => {
        setFetching(true);
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const res = await api.get('/auth/profile');
            setBalance(res.data.balance || 0);
            setWallet({ 
                address: res.data.walletAddress || '', 
                network: res.data.walletNetwork || '' 
            });
        } catch (err) {
            console.error('Error fetching profile');
        } finally {
            setFetching(false);
        }
    };

    const handlePreAuth = (e) => {
        e.preventDefault();
        setError('');
        if (!wallet.address) {
            setError('Please configure your withdrawal wallet in Profile > Wallet first.');
            return;
        }
        if (Number(amount) < settings.minWithdrawal) {
             setError(`Minimum liquidation is $${settings.minWithdrawal}`);
             return;
        }
        setShowConfirm(true);
    };

    const handleWithdrawal = async () => {
        if (!confirmed) return;
        
        setLoading(true);
        setShowConfirm(false);

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            await api.post('/withdrawals/request', { amount });
            setSuccess(true);
            setAmount('');
            setConfirmed(false);
            fetchProfile(); // Refresh balance
        } catch (err) {
            setError(err.response?.data?.message || 'Liquidation protocol failed');
        } finally {
            setLoading(false);
        }
    };

    const serviceFee = (Number(amount || 0) * (settings.withdrawalFee / 100)).toFixed(2);
    const netAmount = (Number(amount || 0) - serviceFee).toFixed(2);

    if (fetching) {
        return (
            <div className="py-24 flex justify-center">
                <Loader2 className="text-amber-500 animate-spin w-12 h-12" />
            </div>
        );
    }

    if (success) {
        return (
            <div className="max-w-2xl mx-auto py-24 text-center animate-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-green-500/10">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Request Received</h2>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-[0.3em] mt-6 leading-loose">
                    Your assets are now in the authorization queue. <br/>
                    Liquidation will be finalized within <span className="text-amber-500">24 hours</span>.
                </p>
                <div className="mt-12 flex justify-center">
                    <button 
                        onClick={() => setSuccess(false)}
                        className="px-12 py-5 bg-amber-500 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-amber-600 transition-all shadow-2xl shadow-amber-500/20 active:scale-95"
                    >
                        New Liquidation
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
                    <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">Asset Liquidation</h2>
                    <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.3em] ml-1">Secure Internal Capital Withdrawal Protocol</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="glass-card px-8 py-3 bg-amber-500/5 border-amber-500/20">
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-1">Available Liquidity</p>
                        <p className="text-2xl font-black text-white">${balance.toFixed(2)}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                {/* Withdrawal Form */}
                <div className="lg:col-span-3 space-y-8">
                    {/* Wallet Status */}
                    <div className={`glass-card p-6 border ${wallet.address ? 'border-green-500/20 bg-green-500/5' : 'border-red-500/20 bg-red-500/5'} flex items-center justify-between`}>
                        <div className="flex items-center gap-6">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${wallet.address ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                                <Wallet size={20}/>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Connected Wallet Protocol</p>
                                <h4 className="text-white text-xs font-black tracking-widest uppercase font-mono truncate max-w-[250px]">
                                    {wallet.address || 'No Wallet Configured'}
                                </h4>
                                {wallet.network && <span className="text-[9px] text-amber-500/80 font-black uppercase tracking-widest mt-1 block">{wallet.network}</span>}
                            </div>
                        </div>
                        {!wallet.address && (
                            <button 
                                onClick={() => window.location.href = '/user/profile/wallet'}
                                className="px-4 py-2 bg-red-500 text-white text-[9px] font-black uppercase tracking-widest rounded-lg"
                            >
                                Setup
                            </button>
                        )}
                    </div>

                    <div className="glass-card p-10 border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full -mr-32 -mt-32"></div>
                        
                        <form onSubmit={handlePreAuth} className="space-y-10 relative z-10">
                            <div className="space-y-4">
                                <label className="text-[10px] text-gray-600 font-black uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <DollarSign size={12} className="text-amber-500" /> Redemption Amount (USD)
                                </label>
                                <div className="relative group">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-gray-700 group-focus-within:text-amber-500 transition-colors">$</span>
                                    <input 
                                        type="number" 
                                        required
                                        placeholder="0.00"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className={`w-full bg-white/[0.02] border py-6 pl-12 pr-6 rounded-2xl text-white font-black text-3xl focus:outline-none transition-all placeholder:text-gray-800 ${(Number(amount) > balance || (amount > 0 && Number(amount) < settings.minWithdrawal)) ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.1)]' : 'border-white/5 focus:border-amber-500/50'}`}
                                    />
                                </div>
                                {Number(amount) > balance && (
                                    <p className="text-[10px] text-red-500 font-black uppercase tracking-widest ml-1 flex items-center gap-2">
                                        <AlertCircle size={12}/> Insufficient Balance
                                    </p>
                                )}
                                {amount > 0 && Number(amount) < settings.minWithdrawal && (
                                    <p className="text-[10px] text-red-500 font-black uppercase tracking-widest ml-1 flex items-center gap-2">
                                        <AlertCircle size={12}/> Minimum Withdrawal is ${settings.minWithdrawal}
                                    </p>
                                )}
                            </div>

                            {/* Fee Calculation */}
                            {amount > 0 && (
                                <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl space-y-6">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                        <span className="text-gray-600">Liquidation Fee ({settings.withdrawalFee}%)</span>
                                        <span className="text-red-500">-${serviceFee}</span>
                                    </div>
                                    <div className="h-px bg-white/5 w-full"></div>
                                    <div className="flex justify-between items-center">
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest">Net Redemption Value</p>
                                            <p className="text-[8px] text-amber-500/60 font-black uppercase tracking-widest">Arrival in 24 hours</p>
                                        </div>
                                        <span className="text-3xl font-black text-white tracking-tighter">${netAmount}</span>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-5 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4 text-red-500 text-xs font-bold shadow-xl shadow-red-500/5">
                                    <AlertCircle size={20} /> {error}
                                </motion.div>
                            )}

                            <button 
                                type="submit"
                                disabled={loading || !amount || Number(amount) <= 0 || Number(amount) > balance || Number(amount) < settings.minWithdrawal}
                                className="w-full py-6 bg-amber-500 text-white font-black uppercase tracking-[0.4em] text-xs rounded-2xl flex items-center justify-center gap-4 shadow-2xl shadow-amber-500/20 hover:bg-amber-600 active:scale-95 disabled:opacity-30 disabled:grayscale transition-all"
                            >
                                {loading ? <Loader2 className="animate-spin w-6 h-6" /> : <><Zap size={20} /> Authorize Liquidation</>}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Info Sidebar */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="glass-card p-8 border-white/5 space-y-8">
                        <div className="flex items-center gap-3 text-white font-black text-sm uppercase tracking-widest">
                            <Info size={18} className="text-amber-500" /> Operational Rules
                        </div>
                        <div className="space-y-6">
                            {[
                                { title: `${settings.withdrawalFee}% Service Fee`, desc: 'Mandatory network maintenance and liquidity balancing fee applied to all liquidations.' },
                                { title: '24-Hour Protocol', desc: 'All requests undergo multi-signature verification. ETA for wallet arrival is 24 hours.' },
                                { title: 'Irreversible Node', desc: 'Once authorized, the liquidation process cannot be aborted. Ensure wallet accuracy.' },
                                { title: 'AML Compliance', desc: 'Dispatches are monitored for secure internal capital flow alignment.' }
                            ].map((rule, i) => (
                                <div key={i} className="flex gap-5 items-start">
                                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0"></div>
                                    <div className="space-y-1.5">
                                        <p className="text-[10px] text-white font-black uppercase tracking-widest">{rule.title}</p>
                                        <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">{rule.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 bg-green-500/5 border border-green-500/10 rounded-3xl space-y-4">
                        <ShieldCheck className="text-green-500" size={24} />
                        <h4 className="text-white text-xs font-black uppercase tracking-widest">Secure Withdrawal System</h4>
                        <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest leading-relaxed">
                            Your funds are protected by end-to-end encryption and manual treasury authorization.
                        </p>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            <AnimatePresence>
                {showConfirm && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-sm">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="w-full max-w-xl glass-card p-10 border-white/10 shadow-[0_0_100px_rgba(245,158,11,0.1)] relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>
                            
                            <div className="relative z-10 space-y-8">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-amber-500/20 text-amber-500 rounded-2xl flex items-center justify-center">
                                            <HelpCircle size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-white text-xl font-black uppercase tracking-tighter">Confirm Redemption</h3>
                                            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">Final Security Review</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setShowConfirm(false)} className="p-2 text-gray-700 hover:text-white transition-colors">
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Detail Box */}
                                <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">Gross Request</p>
                                            <p className="text-xl font-black text-white tracking-tighter">${Number(amount).toFixed(2)}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">Service Fee ({settings.withdrawalFee}%)</p>
                                            <p className="text-xl font-black text-red-500 tracking-tighter">-${serviceFee}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">Net Arrival</p>
                                            <p className="text-xl font-black text-green-500 tracking-tighter">${netAmount}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">Protocol / Network</p>
                                            <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">{wallet.network}</p>
                                        </div>
                                    </div>
                                    <div className="h-px bg-white/5 w-full"></div>
                                    <div className="space-y-2">
                                        <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">Destination Address</p>
                                        <p className="text-[11px] font-mono text-white/50 break-all bg-black/40 p-4 rounded-xl border border-white/5">{wallet.address}</p>
                                    </div>
                                </div>

                                {/* Confirmation Checkbox */}
                                <label className="flex items-start gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/5 transition-colors cursor-pointer group">
                                    <div className="relative mt-1">
                                        <input 
                                            type="checkbox" 
                                            checked={confirmed}
                                            onChange={(e) => setConfirmed(e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-5 h-5 bg-white/5 border border-white/10 rounded-md peer-checked:bg-amber-500 peer-checked:border-amber-500 transition-all flex items-center justify-center">
                                            {confirmed && <CheckCircle2 size={12} className="text-white" />}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-white text-[11px] font-black uppercase tracking-widest">I verify this address is correct</p>
                                        <p className="text-gray-600 text-[9px] font-bold uppercase leading-relaxed">
                                            I understand that assets sent to an incorrect address are non-recoverable and liquidation follows the 24h protocol.
                                        </p>
                                    </div>
                                </label>

                                <div className="flex gap-4">
                                    <button 
                                        onClick={() => setShowConfirm(false)}
                                        className="flex-1 py-5 bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-white/10 transition-all"
                                    >
                                        No, Cancel
                                    </button>
                                    <button 
                                        onClick={handleWithdrawal}
                                        disabled={!confirmed}
                                        className="flex-1 py-5 bg-amber-500 text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl shadow-2xl shadow-amber-500/20 hover:bg-amber-600 active:scale-95 disabled:opacity-20 disabled:grayscale transition-all"
                                    >
                                        Yes, Authorize
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WithdrawalRequest;
