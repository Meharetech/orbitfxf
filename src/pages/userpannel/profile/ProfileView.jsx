import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, ShieldCheck, ShieldAlert, 
  Calendar, Share2, Network, Wallet, 
  ArrowRight, Copy, CheckCircle2, Award, BadgeCheck,
  TrendingUp, Globe, Smartphone, Fingerprint,
  ExternalLink, LogOut
} from 'lucide-react';
import authService from '../../../services/authService';

const ProfileView = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await authService.getProfile();
                setProfile(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-500 font-black uppercase tracking-[0.3em] text-[8px]">Compiling Identity...</span>
            </div>
        );
    }

    if (!profile) return <div className="text-white text-center py-20 font-black uppercase tracking-widest opacity-20">Identity Node Not Found</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-700">

            {/* ── Compact Header ── */}
            <div className="glass-card p-6 border-white/5 bg-white/[0.01] flex flex-col md:flex-row items-center gap-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                    <Fingerprint size={120} className="text-blue-500" />
                </div>
                
                {/* Avatar Avatar */}
                <div className="relative">
                    <div className="w-24 h-24 rounded-2xl bg-blue-500/10 border border-blue-500/20 p-1 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] transition-all">
                        <div className="w-full h-full rounded-xl bg-dark-bg flex items-center justify-center overflow-hidden">
                            <User className="w-12 h-12 text-white/80" />
                        </div>
                    </div>
                    {profile.isActivated && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center border-2 border-dark-bg shadow-lg">
                            <BadgeCheck size={14} className="text-white" />
                        </div>
                    )}
                </div>

                <div className="flex-1 text-center md:text-left space-y-1 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <h1 className="text-2xl font-black text-white uppercase tracking-tighter italic">
                            {profile.fullName}
                        </h1>
                        <div className="flex items-center justify-center gap-2">
                             <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest border ${profile.isActivated ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                                {profile.isActivated ? '● Verified User' : '○ Inactive Account'}
                             </span>
                        </div>
                    </div>
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest flex items-center justify-center md:justify-start gap-2">
                         <span className="text-blue-500">@{profile.username}</span> 
                         <span className="opacity-20">|</span> 
                         <span className="text-white/40">Member ID: {profile._id.slice(-6).toUpperCase()}</span>
                    </p>
                </div>

                <div className="flex items-center gap-2 pb-2">
                    <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-500/20">
                         Modify Settings <ArrowRight size={14} />
                    </button>
                </div>
            </div>

            {/* ── Narrow Stats Matrix ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Available Balance', value: `$${profile.balance?.toLocaleString() || '0.00'}`, icon: Wallet, color: 'text-blue-400' },
                    { label: 'Total Commissions', value: `$${profile.totalEarned?.toLocaleString() || '0.00'}`, icon: Award, color: 'text-emerald-400' },
                    { label: 'Affiliate Code', value: profile.referralCode, icon: Share2, color: 'text-amber-500', isCopyable: true },
                    { label: 'Authored Position', value: profile.position || 'MASTER', icon: Network, color: 'text-purple-400' }
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-4 border-white/5 bg-white/[0.01] flex flex-col justify-between group hover:bg-white/[0.03] transition-all h-24">
                        <div className="flex items-center justify-between">
                            <p className="text-[8px] text-gray-500 font-black uppercase tracking-widest opacity-60 leading-none">{stat.label}</p>
                            <stat.icon size={12} className={`${stat.color} opacity-40 group-hover:opacity-100 transition-opacity`} />
                        </div>
                        <div className="flex items-center justify-between">
                             <p className="text-[13px] font-black text-white uppercase italic tracking-tighter leading-none">{stat.value}</p>
                             {stat.isCopyable && (
                                <button onClick={() => copyToClipboard(stat.value)} className="p-1 hover:bg-white/5 rounded text-gray-700 hover:text-white transition-colors">
                                    {copied ? <CheckCircle2 size={10} className="text-green-500" /> : <Copy size={10} />}
                                </button>
                             )}
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Main Bio Section (Narrow) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Details List */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="glass-card border-white/5 bg-white/[0.01]">
                        <div className="p-4 border-b border-white/5 flex items-center gap-3">
                            <TrendingUp size={14} className="text-white/40" />
                            <h3 className="text-[10px] font-black text-white uppercase tracking-widest leading-none italic">Security Specification</h3>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            {[
                                { label: 'Full Verified Name', value: profile.fullName, icon: User, color: 'text-blue-500' },
                                { label: 'Contact Channel', value: profile.email, icon: Mail, color: 'text-crypto-violet' },
                                { label: 'Mobile Frequency', value: profile.phone, icon: Smartphone, color: 'text-amber-500' },
                                { label: 'Protocol Initialization', value: new Date(profile.createdAt).toLocaleDateString(), icon: Calendar, color: 'text-emerald-500' }
                            ].map((item, i) => (
                                <div key={i} className="space-y-1.5 group">
                                    <div className="flex items-center gap-2 opacity-50">
                                        <item.icon size={11} className={item.color} />
                                        <label className="text-[8px] font-black text-gray-500 uppercase tracking-widest leading-none">{item.label}</label>
                                    </div>
                                    <div className="pl-4.5 font-black text-white text-[11px] uppercase tracking-tighter italic border-l border-white/5 ml-1.5 pl-3 group-hover:border-blue-500/30 transition-colors">
                                        {item.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Compact Sponsor Block */}
                    <div className="glass-card p-4 border-white/5 bg-white/[0.01] flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-700 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-all">
                                <Globe size={18} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none mb-1 italic">Upline Referral</p>
                                <p className="text-[8px] text-gray-700 font-bold uppercase tracking-widest leading-none">Strategic Sponsor: <span className="text-blue-500">{profile.sponsorRef || 'GENESIS'}</span></p>
                            </div>
                        </div>
                        <div className="px-3 py-1 bg-white/5 rounded-lg text-[8px] text-gray-700 font-black uppercase tracking-widest">
                            MASTER NODE
                        </div>
                    </div>
                </div>

                {/* Sidebar Actions */}
                <div className="space-y-4">
                    <div className="glass-card p-6 border-blue-500/20 bg-blue-500/[0.03] space-y-4 group relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full" />
                        <div className="relative z-10 space-y-4">
                            <div>
                                <h4 className="text-white font-black uppercase text-[11px] italic tracking-widest mb-1">Affiliate Link</h4>
                                <p className="text-gray-600 text-[8px] font-bold uppercase tracking-widest leading-relaxed">Expand your network to capitalize on 20% trade volume bonuses.</p>
                            </div>
                            <button className="w-full py-3 bg-blue-500 text-white font-black rounded-xl text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all">
                                Generate Link
                            </button>
                        </div>
                    </div>

                    <div className="glass-card p-5 border-white/5 bg-white/[0.01] space-y-3">
                         <h4 className="text-[9px] text-gray-500 font-black uppercase tracking-widest">System Protocols</h4>
                         <div className="space-y-2">
                             {[
                                { label: 'Two Factor Auth', status: 'ACTIVE', color: 'text-green-500', icon: ShieldCheck },
                                { label: 'Account Termination', status: 'LOCKED', color: 'text-red-500/40', icon: LogOut }
                             ].map((sys, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-all cursor-pointer">
                                     <div className="flex items-center gap-3">
                                         <sys.icon size={12} className="text-gray-700 group-hover:text-white transition-colors" />
                                         <span className="text-[9px] font-bold text-gray-500 group-hover:text-gray-300 transition-colors uppercase tracking-widest">{sys.label}</span>
                                     </div>
                                     <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${sys.color}`}>{sys.status}</span>
                                </div>
                             ))}
                         </div>
                    </div>
                </div>

            </div>

            {/* Verification Notice */}
            <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl flex flex-col md:flex-row items-center gap-3 justify-between">
                 <div className="flex items-center gap-2 opacity-50">
                    <ShieldCheck size={12} className="text-blue-500" />
                    <p className="text-[8px] text-gray-500 font-black uppercase tracking-[0.2em] italic">Identity Protocol Verified Under OrbitFX Institutional Security V3.1</p>
                 </div>
                 <div className="flex gap-4 items-center">
                     <span className="text-[8px] text-gray-700 font-black uppercase tracking-[0.2em]">Hash: 2W9-B4X-912-EED</span>
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                 </div>
            </div>

        </div>
    );
};

export default ProfileView;
