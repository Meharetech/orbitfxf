import React, { useState, useEffect } from 'react';
import api from '../../api/apiConfig';
import { 
  Settings as SettingsIcon, Save, 
  Loader2, Percent, DollarSign, 
  ShieldCheck, AlertCircle, RefreshCw,
  Info, Zap, Bell, Globe, CheckCircle2,
  Lock, Activity, Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminSettings = () => {
    const [withdrawalFee, setWithdrawalFee] = useState(0);
    const [minWithdrawal, setMinWithdrawal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setFetching(true);
        try {
            const res = await api.get('/settings');
            setWithdrawalFee(res.data.withdrawalFee);
            setMinWithdrawal(res.data.minWithdrawal);
        } catch (err) {
            console.error('Error fetching settings');
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
            await api.put('/settings/update', { withdrawalFee, minWithdrawal });
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
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="text-amber-500 animate-spin w-10 h-10" />
                <p className="text-gray-600 text-[9px] font-black uppercase tracking-widest italic animate-pulse">Syncing Protocols...</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6 pb-20 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/10">
                        <Cpu className="text-amber-500 w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                        <h2 className="text-xl font-black text-white uppercase tracking-tight italic leading-none">
                            System <span className="text-amber-500">Protocols</span>
                        </h2>
                        <p className="text-gray-600 text-[9px] font-black uppercase tracking-widest">Global Economic Parameter Control</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-2">
                    <button onClick={fetchSettings} className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-500 hover:text-white transition-all transform active:scale-95">
                        <RefreshCw size={14} />
                    </button>
                    <div className="px-3 py-1.5 bg-amber-500/5 border border-amber-500/10 rounded-lg flex items-center gap-2">
                        <ShieldCheck size={14} className="text-amber-500" />
                        <span className="text-[9px] font-black text-amber-500/80 uppercase tracking-widest">Master Auth Level: 4</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Main Settings Form */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="glass-card p-6 border-white/5 bg-[#0a0f1d]/50 relative overflow-hidden">
                        <form onSubmit={handleUpdate} className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-[9px] text-gray-600 font-black uppercase tracking-widest flex items-center gap-2 italic">
                                        <Percent size={12} className="text-amber-500" /> Service Liquidation Fee
                                    </label>
                                    <div className="relative group">
                                        <input 
                                            type="number" 
                                            required
                                            value={withdrawalFee}
                                            onChange={(e) => setWithdrawalFee(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 py-3 px-4 rounded-xl text-white font-black text-lg focus:outline-none focus:border-amber-500/30 transition-all placeholder:text-gray-800"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700 font-black text-xs">%</span>
                                    </div>
                                    <p className="text-[7px] text-gray-700 font-bold uppercase tracking-tight italic">Applied to all gross liquidation cycles.</p>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[9px] text-gray-600 font-black uppercase tracking-widest flex items-center gap-2 italic">
                                        <DollarSign size={12} className="text-amber-500" /> Minimum Liquidation Floor
                                    </label>
                                    <div className="relative group">
                                        <input 
                                            type="number" 
                                            required
                                            value={minWithdrawal}
                                            onChange={(e) => setMinWithdrawal(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 py-3 px-4 rounded-xl text-white font-black text-lg focus:outline-none focus:border-amber-500/30 transition-all placeholder:text-gray-800"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700 font-black text-xs">$</span>
                                    </div>
                                    <p className="text-[7px] text-gray-700 font-bold uppercase tracking-tight italic">Minimum threshold for asset extraction.</p>
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                {error && (
                                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-3 bg-red-500/5 border border-red-500/10 rounded-xl flex items-center gap-3 text-red-500 text-[10px] font-black uppercase tracking-wider italic">
                                        <AlertCircle size={14} /> {error}
                                    </motion.div>
                                )}
                                {success && (
                                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-center gap-3 text-emerald-500 text-[10px] font-black uppercase tracking-wider italic">
                                        <CheckCircle2 size={14} /> Global Economic Protocols Synchronized.
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button 
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-amber-500 text-black font-black uppercase tracking-[0.3em] text-[10px] rounded-xl flex items-center justify-center gap-3 shadow-xl shadow-amber-500/10 hover:bg-amber-400 active:scale-[0.98] disabled:opacity-20 transition-all"
                            >
                                {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <><Zap size={16} /> Execute Pulse Update</>}
                            </button>
                        </form>
                    </div>

                    <div className="px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Lock size={12} className="text-gray-700" />
                            <p className="text-gray-700 text-[8px] font-black uppercase tracking-widest italic">Sequence encryption: SHA-256 Enabled</p>
                        </div>
                        <div className="flex items-center gap-2">
                             <div className="w-1 h-1 rounded-full bg-emerald-500" />
                             <p className="text-[8px] text-emerald-500/50 font-black uppercase tracking-widest italic">System Online</p>
                        </div>
                    </div>
                </div>

                {/* Sidebar Context */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="glass-card p-5 border-white/5 space-y-4 bg-white/[0.01]">
                        <div className="flex items-center gap-2.5 text-white font-black text-[10px] uppercase tracking-widest italic">
                            <Info size={14} className="text-amber-500" /> Admin Logic Core
                        </div>
                        <div className="space-y-4">
                            {[
                                { title: 'Fee Elasticity', desc: 'Real-time adjustment of asset liquidation overhead.' },
                                { title: 'Liquidity Floor', desc: 'Micro-request mitigation for treasury stability.' },
                                { title: 'Propagation', desc: 'Instant push to all ecosystem nodes.' }
                            ].map((info, i) => (
                                <div key={i} className="space-y-1.5 border-l-2 border-amber-500/20 pl-3 py-0.5">
                                    <p className="text-[9px] text-white/70 font-black uppercase tracking-tighter">{info.title}</p>
                                    <p className="text-[8px] text-gray-700 font-bold uppercase tracking-tight leading-tight">{info.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-5 bg-blue-500/5 border border-blue-500/10 rounded-2xl space-y-3">
                        <Globe className="text-blue-500" size={18} />
                        <h4 className="text-white text-[10px] font-black uppercase tracking-widest italic">Global Synchrony</h4>
                        <p className="text-[8px] text-gray-700 font-black uppercase tracking-tight leading-relaxed italic">
                            Authorized changes are transmitted to the master ledger and reflected across all user portals instantly.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
