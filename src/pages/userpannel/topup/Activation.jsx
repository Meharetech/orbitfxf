import React, { useState, useEffect } from 'react';
import api from '../../../api/apiConfig';
import { 
  Zap, ShieldCheck, Clock, 
  CheckCircle2, AlertCircle, Loader2,
  Gem, Trophy, Star, ChevronRight,
  DollarSign, Activity, Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Activation = () => {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [status, setStatus] = useState(null);
    const [balance, setBalance] = useState(0);
    const [rewardStatus, setRewardStatus] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setFetching(true);
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const [statusRes, profileRes, rewardRes] = await Promise.all([
                api.get('/activations/status'),
                api.get('/auth/profile'),
                api.get('/activations/reward-status').catch(() => ({ data: null }))
            ]);
            setStatus(statusRes.data);
            setBalance(profileRes.data.balance || 0);
            setRewardStatus(rewardRes.data);
        } catch (err) {
            console.error('Error fetching data');
        } finally {
            setFetching(false);
        }
    };

    const handleActivate = async () => {
        setLoading(true);
        setError('');
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            await api.post('/activations/activate', {});
            setSuccess(true);
            fetchData(); // Refresh info
        } catch (err) {
            setError(err.response?.data?.message || 'Activation failed');
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
        <div className="max-w-6xl mx-auto space-y-12 pb-20 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
                <div className="space-y-2">
                    <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none italic">
                        User <span className="text-amber-500">Activation</span>
                    </h2>
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] ml-1 leading-loose">
                        Authorize Your Account for <span className="text-white">Full Protocol Rewards</span>
                    </p>
                </div>
                <div className="glass-card px-8 py-3 bg-white/[0.02] border-white/5">
                    <p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em] mb-1">Available Liquidity</p>
                    <p className="text-2xl font-black text-white italic">${balance.toFixed(2)}</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Package Card */}
                <div className="lg:col-span-12">
                    {status?.isActivated ? (
                        <div className="glass-card p-1 pb-2 bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20 overflow-hidden relative">
                             <div className="p-10 space-y-8 relative z-10 text-center">
                                <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(34,197,94,0.1)]">
                                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                                </div>
                                <h3 className="text-4xl font-black text-white uppercase tracking-tighter italic">Protocol <span className="text-green-500">Active</span></h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                                    <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                                        <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-1">Activation Date</p>
                                        <p className="text-white font-black">{new Date(status.activationDate).toLocaleDateString()}</p>
                                    </div>
                                    <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                                        <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-1">Status Expiry</p>
                                        <p className="text-amber-500 font-black">{new Date(status.activationExpiry).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-[11px] font-bold uppercase tracking-[0.3em]">YOU ARE NOW ELIGIBLE FOR ALL REFERRAL AND PAIRING REWARDS.</p>
                             </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Visual Side */}
                            <div className="space-y-8">
                                <div className="glass-card p-12 bg-gradient-to-br from-amber-500/10 to-transparent border-white/5 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full group-hover:bg-amber-500/10 transition-all duration-700"></div>
                                    <div className="relative z-10 space-y-10">
                                        <div className="space-y-1">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500 text-black text-[9px] font-black uppercase tracking-widest rounded-md mb-4 shadow-lg shadow-amber-500/20">
                                                <Star size={10} /> Best Value
                                            </div>
                                            <h3 className="text-5xl font-black text-white uppercase tracking-tighter italic">Activation <br/><span className="text-amber-500">Package</span></h3>
                                            <p className="text-gray-500 text-[11px] font-black uppercase tracking-widest leading-relaxed pt-2">Unlock the full monetization protocol of <br/> OrbitFX for a duration of 365 Days.</p>
                                        </div>

                                        <div className="flex items-baseline gap-2">
                                            <span className="text-6xl font-black text-white tracking-tighter italic">$150</span>
                                            <span className="text-gray-600 font-black uppercase text-xs tracking-widest">/ Per Year</span>
                                        </div>

                                        <ul className="space-y-5">
                                            {[
                                                '12 Months Full Account Validity',
                                                'Binary Matching Qualification',
                                                'Global Pool Shared Revenue',
                                                'Direct Referral Reward Matching',
                                                '24/7 Priority Support Access'
                                            ].map((f, i) => (
                                                <li key={i} className="flex items-center gap-4 text-xs font-bold text-white/60">
                                                    <CheckCircle2 size={16} className="text-amber-500 shrink-0" /> {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Action Side */}
                            <div className="space-y-8">
                                <div className="glass-card p-10 border-white/5 bg-white/[0.01]">
                                    <h4 className="text-white text-xs font-black uppercase tracking-widest mb-8 flex items-center gap-3">
                                        <Zap size={16} className="text-amber-500" /> Administrative Authorization
                                    </h4>
                                    
                                    <div className="space-y-6">
                                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between">
                                            <div>
                                                <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-1">Current Balance</p>
                                                <p className="text-xl font-black text-white italic">${balance.toFixed(2)}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-1">Activation Cost</p>
                                                <p className="text-xl font-black text-red-500 italic">$150.00</p>
                                            </div>
                                        </div>

                                        {balance < 150 && (
                                            <div className="p-5 bg-red-500/10 border border-red-500/20 rounded-2xl flex gap-4 items-start">
                                                <AlertCircle className="text-red-500 shrink-0" size={18} />
                                                <div className="space-y-1">
                                                    <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">Insufficient Capital</p>
                                                    <p className="text-gray-500 text-[9px] font-bold uppercase leading-relaxed">Please deposit or transfer at least $150 to your account balance to proceed with account activation.</p>
                                                </div>
                                            </div>
                                        )}

                                        <button 
                                            onClick={handleActivate}
                                            disabled={balance < 150 || loading}
                                            className="w-full py-6 bg-amber-500 text-white font-black uppercase tracking-[0.4em] text-xs rounded-2xl flex items-center justify-center gap-4 shadow-2xl shadow-amber-500/20 hover:bg-amber-600 active:scale-95 disabled:opacity-20 disabled:grayscale transition-all"
                                        >
                                            {loading ? <Loader2 className="animate-spin w-6 h-6" /> : <><ShieldCheck size={20} /> Start Protocol</>}
                                        </button>

                                        <p className="text-[9px] text-gray-700 text-center font-bold uppercase tracking-widest pt-4">
                                            Account stays valid for 1 year from activation date. <br/>
                                            Funds are non-refundable once account is operational.
                                        </p>
                                    </div>
                                </div>

                                <div className="p-8 bg-amber-500/5 border border-amber-500/10 rounded-3xl space-y-4">
                                    <Trophy className="text-amber-500" size={24} />
                                    <h4 className="text-white text-xs font-black uppercase tracking-widest">Binary Qualification</h4>
                                    <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest leading-relaxed">
                                        Activation is mandatory to receive any binary matching rewards or direct referral bonuses within the network.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Direct Referral Bonus Banner */}
                <div className="lg:col-span-12">
                    {rewardStatus ? (
                        /* ── QUALIFIED: Show Live Reward Tracker ── */
                        <div className="glass-card p-8 bg-indigo-500/[0.03] border-indigo-500/10 space-y-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 text-[9px] font-black uppercase tracking-widest rounded-md border border-green-500/20 mb-2">
                                        <CheckCircle2 size={10} /> Direct Reward — Active
                                    </div>
                                    <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic">
                                        $10 / Month Reward <span className="text-indigo-400">Tracker</span>
                                    </h3>
                                    <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">
                                        Qualified on {new Date(rewardStatus.qualifiedDate).toLocaleDateString()} — 12 monthly payments of $10
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="glass-card px-6 py-4 bg-green-500/[0.03] border-green-500/10 text-center">
                                        <p className="text-[9px] text-green-500 font-black uppercase tracking-widest mb-1">Paid Out</p>
                                        <p className="text-2xl font-black text-green-400">${rewardStatus.paidCount * 10}</p>
                                        <p className="text-[9px] text-gray-700 font-black uppercase">{rewardStatus.paidCount} / 12 months</p>
                                    </div>
                                    <div className="glass-card px-6 py-4 bg-indigo-500/[0.03] border-indigo-500/10 text-center">
                                        <p className="text-[9px] text-indigo-400 font-black uppercase tracking-widest mb-1">Remaining</p>
                                        <p className="text-2xl font-black text-white">${(12 - rewardStatus.paidCount) * 10}</p>
                                        <p className="text-[9px] text-gray-700 font-black uppercase">{12 - rewardStatus.paidCount} months left</p>
                                    </div>
                                    {!rewardStatus.isCompleted && rewardStatus.nextPaymentDate && (
                                        <div className="glass-card px-6 py-4 bg-amber-500/[0.03] border-amber-500/10 text-center">
                                            <p className="text-[9px] text-amber-400 font-black uppercase tracking-widest mb-1">Next Payout</p>
                                            <p className="text-sm font-black text-amber-400">{new Date(rewardStatus.nextPaymentDate).toLocaleDateString()}</p>
                                            <p className="text-[9px] text-gray-700 font-black uppercase">in ~30 days</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Progress bar */}
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">Payment Progress</p>
                                    <p className="text-[9px] text-indigo-400 font-black uppercase">{rewardStatus.paidCount} of 12 paid</p>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full transition-all duration-700"
                                        style={{ width: `${(rewardStatus.paidCount / 12) * 100}%` }}
                                    />
                                </div>
                                <div className="flex gap-1 mt-2">
                                    {Array.from({ length: 12 }).map((_, i) => (
                                        <div key={i} className={`flex-1 h-1.5 rounded-full ${i < rewardStatus.paidCount ? 'bg-green-500' : 'bg-white/5'}`} />
                                    ))}
                                </div>
                            </div>

                            {/* Payment History */}
                            {rewardStatus.payments?.length > 0 && (
                                <div className="space-y-3">
                                    <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest border-t border-white/5 pt-4">Payment History</p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                        {rewardStatus.payments.map((p, i) => (
                                            <div key={i} className="glass-card p-3 bg-green-500/[0.02] border-green-500/10 text-center">
                                                <p className="text-[8px] text-green-500 font-black uppercase tracking-widest mb-1">Month {p.month}</p>
                                                <p className="text-sm font-black text-white">$10</p>
                                                <p className="text-[8px] text-gray-700 font-bold">{new Date(p.paidAt).toLocaleDateString()}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* ── NOT YET QUALIFIED: Show criteria ── */
                        <div className="glass-card p-12 bg-indigo-500/5 border-indigo-500/10 relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full group-hover:bg-indigo-500/10 transition-all" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10 items-center">
                                <div className="space-y-6">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500 text-white text-[9px] font-black uppercase tracking-widest rounded-md shadow-lg shadow-indigo-500/20">
                                        <Star size={10} /> Special Incentive
                                    </div>
                                    <h3 className="text-4xl font-black text-white tracking-tighter uppercase italic leading-none">
                                        Direct <span className="text-indigo-400">Referral Reward</span>
                                    </h3>
                                    <div className="flex items-baseline gap-3">
                                        <span className="text-6xl font-black text-indigo-400">$10</span>
                                        <span className="text-white/60 font-black uppercase text-[10px] tracking-widest leading-relaxed italic">Every Month <br/> For 1 Year Only</span>
                                    </div>
                                    <div className="p-4 bg-green-500/5 border border-green-500/10 rounded-xl">
                                        <p className="text-green-400 text-[10px] font-black uppercase tracking-widest">
                                            ✓ First $10 is credited the SAME DAY both L+R activate — not next month!
                                        </p>
                                    </div>
                                </div>
                                <div className="glass-card p-8 bg-black/40 border-white/5 space-y-6">
                                    <p className="text-white text-xs font-black uppercase tracking-widest border-b border-white/10 pb-4">Qualification Criteria</p>
                                    <div className="space-y-4">
                                        <div className="flex gap-4 items-start">
                                            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 font-black">1</div>
                                            <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest leading-relaxed pt-1">
                                                Complete <span className="text-white font-black">Two Direct Signups</span> (One on Left leg & One on Right leg).
                                            </p>
                                        </div>
                                        <div className="flex gap-4 items-start">
                                            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 font-black">2</div>
                                            <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest leading-relaxed pt-1">
                                                Both direct referrals must <span className="text-indigo-400 font-black text-xs">ACTIVATE</span> ($150 each) within <span className="text-indigo-400 font-black text-xs">30 DAYS</span> of your joining.
                                            </p>
                                        </div>
                                        <div className="flex gap-4 items-start">
                                            <div className="w-8 h-8 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center shrink-0 font-black">✓</div>
                                            <p className="text-[10px] font-bold text-green-500/70 uppercase tracking-widest leading-relaxed pt-1">
                                                First $10 credited <span className="text-green-400 font-black">same day</span>, then every 30 days for 11 more months.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Activation;
