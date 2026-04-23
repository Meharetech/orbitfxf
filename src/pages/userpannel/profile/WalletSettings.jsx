import React, { useState, useEffect } from 'react';
import api from '../../../api/apiConfig';
import { 
  Wallet, ShieldCheck, AlertCircle, 
  CheckCircle2, Loader2, Save,
  Zap, Globe, Network, Info, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WalletSettings = () => {
    const [address, setAddress] = useState('');
    const [network, setNetwork] = useState('USDT (TRC20)');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchWallet();
    }, []);

    const fetchWallet = async () => {
        setFetching(true);
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const res = await api.get('/auth/profile');
            setAddress(res.data.walletAddress || '');
            setNetwork(res.data.walletNetwork || 'USDT (TRC20)');
        } catch (err) {
            console.error('Error fetching wallet');
        } finally {
            setFetching(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            await api.put('/auth/updatewallet', { address, network });
            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            setError(err.response?.data?.message || 'Update failed');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="py-24 flex justify-center">
                <Loader2 className="text-amber-500 animate-spin w-12 h-12" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
                <div className="space-y-2">
                    <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">Wallet Protocol</h2>
                    <p className="text-amber-500 text-[10px] font-black uppercase tracking-[0.3em] ml-1">Secure Destination for Asset Liquidation</p>
                </div>
                <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl">
                    <ShieldCheck size={16} className="text-amber-500" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">End-to-End Encrypted</span>
                </div>
            </div>

            {/* Already Setup Info Card */}
            {address && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-8 border-green-500/20 bg-green-500/5 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative"
                >
                    <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-green-500/20 rounded-2xl flex items-center justify-center text-green-500 shrink-0">
                            <ShieldCheck size={28} />
                        </div>
                        <div>
                            <p className="text-[10px] text-green-500/60 font-black uppercase tracking-[0.2em] mb-1">Active Configuration Detected</p>
                            <h3 className="text-white text-xl font-black tracking-tight font-mono break-all">{address}</h3>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="px-2 py-0.5 bg-green-500/20 text-green-500 text-[8px] font-black uppercase rounded border border-green-500/20">{network}</span>
                                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest leading-none flex items-center gap-1.5"><Zap size={10} className="text-green-500"/> Verified Node</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-[10px] text-white font-black uppercase tracking-widest">Operational</span>
                    </div>
                </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Settings */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="glass-card p-10 border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full -mr-32 -mt-32"></div>
                        
                        <form onSubmit={handleUpdate} className="space-y-8 relative z-10">
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] text-gray-600 font-black uppercase tracking-widest ml-1 flex items-center gap-2">
                                        <Network size={12} className="text-amber-500" /> Network Selection Protocol
                                    </label>
                                    <div className="relative">
                                        <select 
                                            value={network}
                                            onChange={(e) => setNetwork(e.target.value)}
                                            className="w-full bg-white/[0.03] border border-white/10 py-4 px-6 rounded-2xl text-white font-black uppercase tracking-widest text-[11px] focus:outline-none focus:border-amber-500/50 appearance-none cursor-pointer"
                                        >
                                            {['USDT (TRC20)', 'USDT (ERC20)', 'BITCOIN', 'ETHEREUM', 'BNB (BEP20)'].map(n => (
                                                <option key={n} value={n} className="bg-[#0a0f1d] text-white py-2">{n}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                            <ChevronRight className="rotate-90" size={16} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] text-gray-600 font-black uppercase tracking-widest ml-1 flex items-center gap-2">
                                        <Globe size={12} className="text-amber-500" /> Destination Address
                                    </label>
                                    <div className="relative group">
                                        <Wallet className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-amber-500 transition-colors" size={20} />
                                        <input 
                                            type="text" 
                                            required
                                            placeholder="Enter your wallet address..."
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className="w-full bg-white/[0.02] border border-white/5 py-5 pl-14 pr-6 rounded-2xl text-white font-black tracking-widest text-xs focus:outline-none focus:border-amber-500/50 transition-all placeholder:text-gray-800"
                                        />
                                    </div>
                                    <p className="text-[9px] text-gray-700 font-bold uppercase tracking-widest mt-2 ml-1">
                                        Note: Ensure the address matches the selected network to avoid permanent loss of funds.
                                    </p>
                                </div>
                            </div>

                            <AnimatePresence>
                                {error && (
                                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-xs font-bold">
                                        <AlertCircle size={16} /> {error}
                                    </motion.div>
                                )}
                                {success && (
                                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-3 text-green-500 text-xs font-bold">
                                        <CheckCircle2 size={16} /> Security protocols updated successfully.
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button 
                                type="submit"
                                disabled={loading || !address}
                                className="w-full py-5 bg-amber-500 text-white font-black uppercase tracking-widest text-sm rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-amber-500/20 hover:bg-amber-600 active:scale-95 disabled:opacity-30 disabled:grayscale transition-all"
                            >
                                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <><Save size={18} /> Update Security Node</>}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Requirements Sidebar */}
                <div className="space-y-8">
                    <div className="glass-card p-8 border-white/5 space-y-6">
                        <div className="flex items-center gap-3 text-white font-black text-sm uppercase tracking-widest">
                            <Info size={18} className="text-amber-500" /> Security Rules
                        </div>
                        <div className="space-y-5">
                            {[
                                { t: 'Verification', d: 'Address change requires system authorization logs.' },
                                { t: 'Accuracy', d: 'Incorrect addresses result in irreversible asset loss.' },
                                { t: 'Whitelist', d: 'Only verified TRC20 and ERC20 endpoints allowed.' },
                                { t: 'Protocol', d: 'Do not use exchange internal memo addresses.' }
                            ].map((rule, i) => (
                                <div key={i} className="space-y-1">
                                    <p className="text-[10px] text-white/60 font-black uppercase tracking-widest">{rule.t}</p>
                                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">{rule.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 bg-amber-500/5 border border-amber-500/10 rounded-3xl space-y-4">
                        <Zap className="text-amber-500" size={24} />
                        <h4 className="text-white text-xs font-black uppercase tracking-widest">Instant Liquidity</h4>
                        <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest leading-relaxed">
                            Once set, this address becomes the default for all future liquidation requests from your main balance.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletSettings;
