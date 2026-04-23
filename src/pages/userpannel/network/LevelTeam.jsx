import React, { useState, useEffect } from 'react';
import api from '../../../api/apiConfig';
import { 
  ChevronDown, ChevronUp, ShieldCheck, 
  ShieldAlert, TrendingUp, Info, BadgeCheck, Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LevelTeam = () => {
    const [levelsData, setLevelsData] = useState({});
    const [loading, setLoading] = useState(true);
    const [expandedLevel, setExpandedLevel] = useState(null);

    const getCommission = (level) => {
        const lvl = parseInt(level);
        if (lvl === 1) return '10%';
        if (lvl === 2) return '5%';
        if (lvl === 3) return '5%';
        if (lvl === 4) return '3%';
        if (lvl === 5) return '2%';
        if (lvl >= 6 && lvl <= 10) return '1%';
        if (lvl >= 11 && lvl <= 20) return '0.5%';
        return '0%';
    };

    useEffect(() => {
        const fetchLevels = async () => {
            try {
                const res = await api.get('/network/levels');
                setLevelsData(res.data);
                // Expand first level by default if data exists
                if (Object.keys(res.data).length > 0) {
                    setExpandedLevel('1');
                }
            } catch (err) {
                console.error('Error fetching level team:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchLevels();
    }, []);

    const toggleLevel = (level) => {
        setExpandedLevel(expandedLevel === level ? null : level);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="w-10 h-10 border-2 border-electric-blue border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-500 font-bold uppercase tracking-widest text-xs">Analyzing Network...</span>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-black text-white">Referral Level Team</h1>
                <p className="text-gray-500 font-medium">Visualize your network structure and track commissions up to 20 levels deep.</p>
            </div>

            {/* Income Plan Teaser */}
            <div className="glass-card p-6 bg-orbit-gradient/5 border-white/5 overflow-hidden relative">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-electric-blue/10 flex items-center justify-center border border-electric-blue/20">
                            <TrendingUp className="w-6 h-6 text-electric-blue" />
                        </div>
                        <div>
                            <h3 className="text-white font-black text-lg">35% Total Distribution</h3>
                            <p className="text-gray-500 text-sm font-bold">Comprehensive 20-Level AI Bot Profit Sharing</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-white uppercase tracking-tighter opacity-70">Power Level</span>
                        <div className="flex gap-1">
                           {[10, 5, 5, 3, 2, 1, 0.5].map((p, i) => (
                               <div key={i} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black text-electric-blue">
                                   {p}%
                               </div>
                           ))}
                        </div>
                    </div>
                </div>
                <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-electric-blue/10 rounded-full blur-[100px]"></div>
            </div>

            {/* Levels List */}
            <div className="space-y-4">
                {Object.keys(levelsData).length === 0 ? (
                    <div className="text-center py-20 glass-card border-white/5 italic text-gray-600">
                        No team members registered under your network yet.
                    </div>
                ) : (
                    Object.entries(levelsData).map(([level, users]) => (
                        <div key={level} className="glass-card border-white/5 overflow-hidden transition-all duration-300">
                            <button 
                                onClick={() => toggleLevel(level)}
                                className={`w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors ${expandedLevel === level ? 'bg-white/[0.03]' : ''}`}
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center font-black text-electric-blue border border-white/5">
                                        Lv.{level}
                                    </div>
                                    <div className="text-left">
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-white font-black">Level {level} Team</h4>
                                            <span className="px-2 py-0.5 rounded-lg bg-crypto-violet/10 border border-crypto-violet/20 text-[9px] font-black text-crypto-violet uppercase">
                                                {getCommission(level)} Reward
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3 mt-0.5">
                                            <span className="text-[10px] font-black text-green-500">{users.filter(u => u.isActivated).length} Active</span>
                                            <span className="text-gray-700 text-[10px]">·</span>
                                            <span className="text-[10px] font-black text-red-500">{users.filter(u => !u.isActivated).length} Inactive</span>
                                            <span className="text-gray-700 text-[10px]">·</span>
                                            <span className="text-[10px] font-bold text-gray-600">{users.length} Total</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                     <div className="flex -space-x-3 mr-4">
                                        {users.slice(0, 3).map((u, i) => (
                                            <div key={i} className="w-8 h-8 rounded-full border-2 border-dark-bg bg-orbit-gradient p-[1px]">
                                                <div className="w-full h-full rounded-full bg-dark-bg flex items-center justify-center text-[10px] font-bold text-white uppercase">
                                                    {u.fullName.charAt(0)}
                                                </div>
                                            </div>
                                        ))}
                                        {users.length > 3 && (
                                            <div className="w-8 h-8 rounded-full border-2 border-dark-bg bg-white/5 flex items-center justify-center text-[10px] font-bold text-gray-500">
                                                +{users.length - 3}
                                            </div>
                                        )}
                                     </div>
                                     {expandedLevel === level ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
                                </div>
                            </button>

                            <AnimatePresence>
                                {expandedLevel === level && (
                                    <motion.div 
                                        initial={{ height: 0 }}
                                        animate={{ height: 'auto' }}
                                        exit={{ height: 0 }}
                                        className="overflow-hidden bg-black/20"
                                    >
                                        <div className="p-4 overflow-x-auto">
                                            <table className="w-full text-left">
                                                <thead>
                                                    <tr className="border-b border-white/5 text-[10px] font-black text-gray-600 uppercase tracking-widest">
                                                        <th className="px-4 py-3">Member Details</th>
                                                        <th className="px-4 py-3">Referral Code</th>
                                                        <th className="px-4 py-3 text-center">Node Status</th>
                                                        <th className="px-4 py-3">Expiry</th>
                                                        <th className="px-4 py-3 text-right">Join Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-white/5">
                                                    {users.map((member) => (
                                                        <tr key={member._id} className="hover:bg-white/[0.03] transition-colors">
                                                            <td className="px-4 py-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="relative shrink-0">
                                                                        <div className={`w-9 h-9 rounded-xl p-[1.5px] ${member.isActivated ? 'bg-gradient-to-br from-blue-500 to-cyan-400' : 'bg-white/10'}`}>
                                                                            <div className="w-full h-full rounded-[9px] bg-[#080912] flex items-center justify-center font-black text-sm text-white">
                                                                                {member.fullName.charAt(0).toUpperCase()}
                                                                            </div>
                                                                        </div>
                                                                        {member.isActivated && (
                                                                            <BadgeCheck size={11} className="absolute -bottom-1 -right-1 text-blue-500 fill-blue-500/20 bg-[#080912] rounded-full" />
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <div className="text-white font-black text-sm leading-none">{member.fullName}</div>
                                                                        <div className="text-gray-600 text-[10px] mt-0.5 font-bold">@{member.username}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-4">
                                                                <span className="font-mono text-xs text-electric-blue bg-electric-blue/5 border border-electric-blue/10 px-2 py-1 rounded-lg">
                                                                    {member.referralCode}
                                                                </span>
                                                            </td>
                                                            <td className="px-4 py-4">
                                                                <div className="flex justify-center">
                                                                    {member.isActivated ? (
                                                                        <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-green-500/10 text-green-500 border border-green-500/20 text-[9px] font-black uppercase tracking-wider">
                                                                            <ShieldCheck className="w-3 h-3" /> VIP
                                                                        </span>
                                                                    ) : (
                                                                        <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 text-[9px] font-black uppercase tracking-wider">
                                                                            <ShieldAlert className="w-3 h-3" /> Not Active
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-4">
                                                                {member.isActivated && member.activationExpiry ? (
                                                                    <div className="flex items-center gap-1.5">
                                                                        <Calendar size={10} className="text-amber-500" />
                                                                        <span className="text-[10px] text-amber-500 font-black">
                                                                            {new Date(member.activationExpiry).toLocaleDateString()}
                                                                        </span>
                                                                    </div>
                                                                ) : (
                                                                    <span className="text-[10px] text-gray-700">—</span>
                                                                )}
                                                            </td>
                                                            <td className="px-4 py-4 text-right text-gray-600 text-[10px] font-bold">
                                                                {new Date(member.createdAt).toLocaleDateString()}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))
                )}
            </div>

            {/* Hint Box */}
            <div className="p-5 rounded-2xl bg-electric-blue/5 border border-white/5 flex items-start gap-4">
                <Info className="w-5 h-5 text-electric-blue mt-0.5" />
                <div className="space-y-1">
                    <h5 className="text-white font-bold text-sm">Automated Commission System</h5>
                    <p className="text-gray-500 text-xs leading-relaxed font-medium">
                        The 35% commission is distributed instantly when any member of your 20-level network activates their AI Trading Bot. Earnings are credited directly to your total balance.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LevelTeam;
