import React, { useState, useEffect } from 'react';
import api from '../../../api/apiConfig';
import { 
    Zap, TrendingUp, Settings, 
    ShieldCheck, AlertCircle, Loader2,
    PieChart, Activity, CheckCircle2,
    Target, ArrowRightCircle, DollarSign,
    Layers, Cpu
} from 'lucide-react';

const AdminInvestments = () => {
    const [percentage, setPercentage] = useState('');
    const [loading, setLoading] = useState(false);
    const [previewLoading, setPreviewLoading] = useState(false);
    const [previewData, setPreviewData] = useState(null);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handlePreview = async () => {
        if (!percentage || percentage <= 0) return setMessage({ type: 'error', text: 'Enter a valid percentage' });
        setPreviewLoading(true);
        setMessage({ type: '', text: '' });
        setIsConfirmed(false);
        try {
            const res = await api.post('/admin/investments/preview-roi', { percentage: Number(percentage) });
            setPreviewData(res.data);
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to generate preview' });
        } finally {
            setPreviewLoading(false);
        }
    };

    const handleDistribute = async (e) => {
        e.preventDefault();
        if (!isConfirmed) return;

        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const res = await api.post('/admin/investments/distribute-roi', { percentage: Number(percentage) });

            setMessage({ type: 'success', text: res.data.message });
            setPercentage('');
            setPreviewData(null);
            setIsConfirmed(false);
        } catch (err) {
            setMessage({ 
                type: 'error', 
                text: err.response?.data?.message || 'Distribution failed. Please try again.' 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-700 pb-20">

            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center">
                        <Cpu className="text-amber-500 w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                        <h2 className="text-xl font-black text-white uppercase tracking-tight italic leading-none">
                            ROI <span className="text-amber-500">Console</span>
                        </h2>
                        <p className="text-gray-600 text-[9px] font-black uppercase tracking-widest">Global Payout Management Engine</p>
                    </div>
                </div>
                <div className="px-3 py-1 bg-amber-500/5 border border-amber-500/10 rounded-lg flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
                    <span className="text-[9px] text-amber-500/80 font-black uppercase tracking-widest">Manual Override Active</span>
                </div>
            </div>

            {/* Main Operational Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Distribution Control Form */}
                <div className="lg:col-span-12 xl:col-span-8">
                    <div className="glass-card relative overflow-hidden p-6 border-white/5 bg-[#0a0f1d]/50">
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            <div className="flex-1 space-y-4">
                                <div className="space-y-1">
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest italic">Initialize Payout Sequence</h3>
                                    <p className="text-gray-600 text-[10px] font-bold">Inject today's trading results. Level commissions will be calculated automatically.</p>
                                </div>
                                
                                <div className="flex gap-2">
                                    <div className="relative flex-1 group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <span className="text-sm font-black text-amber-500 italic">%</span>
                                        </div>
                                        <input 
                                            type="number" 
                                            step="0.01"
                                            value={percentage}
                                            onChange={(e) => setPercentage(e.target.value)}
                                            placeholder="Rate (e.g. 1.5)"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-lg font-black text-white focus:outline-none focus:border-amber-500/30 transition-all placeholder:text-gray-800"
                                        />
                                    </div>
                                    <button 
                                        onClick={handlePreview}
                                        disabled={previewLoading || !percentage}
                                        className="px-6 bg-white/5 text-white font-black text-[10px] uppercase tracking-widest rounded-xl border border-white/10 hover:bg-white/10 transition-all disabled:opacity-20"
                                    >
                                        {previewLoading ? <Loader2 size={16} className="animate-spin" /> : 'Preview'}
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 w-full md:w-80">
                                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                                    <p className="text-[8px] text-gray-700 font-black uppercase mb-1">Status</p>
                                    <p className="text-[10px] text-emerald-500 font-black uppercase">Ready</p>
                                </div>
                                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                                    <p className="text-[8px] text-gray-700 font-black uppercase mb-1">Queue</p>
                                    <p className="text-[10px] text-amber-500 font-black uppercase italic">Manual</p>
                                </div>
                            </div>
                        </div>

                        {/* Preview Report - Compact */}
                        {previewData && (
                            <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-4 animate-in slide-in-from-top duration-500">
                                <div className="bg-white/[0.01] p-4 rounded-xl border border-white/5">
                                    <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest mb-1.5">Nodes Indexed</p>
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-xl font-black text-white italic">{previewData.userCount}</h4>
                                        <Users size={12} className="text-gray-700" />
                                    </div>
                                </div>
                                <div className="bg-white/[0.01] p-4 rounded-xl border border-white/5">
                                    <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest mb-1.5">Level Pool (25%)</p>
                                    <h4 className="text-xl font-black text-blue-500 italic">${previewData.totalLevelSharing.toFixed(1)}</h4>
                                </div>
                                <div className="bg-amber-500/5 p-4 rounded-xl border border-amber-500/10 col-span-2">
                                    <p className="text-[8px] text-amber-700 font-black uppercase tracking-widest mb-1.5">Net Network Payout</p>
                                    <h4 className="text-2xl font-black text-amber-500 italic">${previewData.totalSystemOutflow.toFixed(1)}</h4>
                                </div>

                                <div className="col-span-2 md:col-span-4 flex items-center justify-between p-3 bg-white/[0.02] rounded-xl mt-2">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input 
                                            type="checkbox" 
                                            className="peer sr-only"
                                            checked={isConfirmed}
                                            onChange={(e) => setIsConfirmed(e.target.checked)}
                                        />
                                        <div className="w-5 h-5 border border-white/20 rounded peer-checked:bg-amber-500 peer-checked:border-amber-500 transition-all flex items-center justify-center">
                                            <CheckCircle2 size={12} className="text-black scale-0 peer-checked:scale-100" />
                                        </div>
                                        <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest group-hover:text-white transition-colors italic">Authorization Confirmed</span>
                                    </label>
                                    <button 
                                        onClick={handleDistribute}
                                        disabled={loading || !isConfirmed}
                                        className="px-6 py-2.5 bg-amber-500 text-black font-black text-[10px] uppercase tracking-widest rounded-lg hover:scale-105 transition-all shadow-xl shadow-amber-500/10 disabled:opacity-10"
                                    >
                                        {loading ? <Loader2 size={16} className="animate-spin" /> : 'Execute Distribute'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {message.text && (
                            <div className={`mt-4 p-4 rounded-xl flex items-center gap-3 animate-in slide-in-from-top duration-300 ${message.type === 'success' ? 'bg-green-500/5 border border-green-500/10 text-green-500' : 'bg-red-500/5 border border-red-500/10 text-red-500'}`}>
                                {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                                <span className="text-[10px] font-black uppercase tracking-widest italic">{message.text}</span>
                            </div>
                        )}
                    </div>

                    {/* Security Badge */}
                    <div className="mt-4 flex items-center gap-3 px-4 py-2 bg-white/[0.02] border border-white/5 rounded-lg max-w-fit">
                        <ShieldCheck size={12} className="text-gray-700" />
                        <p className="text-gray-700 text-[9px] font-bold uppercase tracking-widest italic">Sequence encryption: active / Admin ID: TRD-001</p>
                    </div>
                </div>

                {/* Level Protocol Drilldown */}
                <div className="lg:col-span-12 xl:col-span-4 space-y-4">
                    <div className="glass-card border-white/5 bg-[#0a0f1d]/30 overflow-hidden h-full">
                        <div className="p-4 border-b border-white/5 flex items-center gap-3 bg-white/[0.01]">
                             <Layers size={14} className="text-amber-500" />
                             <h4 className="text-white font-black uppercase text-[10px] italic tracking-widest">Payout Protocol</h4>
                        </div>
                        <div className="p-3 grid grid-cols-1 gap-1">
                            {[
                                { level: 'Level 1', share: '30%', color: 'amber' },
                                { level: 'Level 2', share: '15%', color: 'blue' },
                                { level: 'Level 3', share: '12%', color: 'indigo' },
                                { level: 'Level 4', share: '10%', color: 'purple' },
                                { level: 'Level 5', share: '8%', color: 'emerald' },
                                { level: 'L6 - L10', share: '15%', color: 'gray' },
                                { level: 'L11 - L20', share: '10%', color: 'gray' },
                            ].map((row, idx) => (
                                <div key={idx} className="flex justify-between items-center p-2 rounded-lg bg-white/[0.02] border border-white/[0.02] hover:border-white/5 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-1 h-3 rounded-full bg-${row.color}-500/50`}></div>
                                        <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">{row.level}</span>
                                    </div>
                                    <span className="text-[10px] text-amber-500 font-black italic">{row.share}</span>
                                </div>
                            ))}
                        </div>
                        <div className="p-3 border-t border-white/5 bg-white/[0.01]">
                             <p className="text-[8px] text-gray-700 font-black uppercase tracking-tighter italic text-center">Protocol applies to 25% Profit Pool</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

const Users = ({ size, className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

export default AdminInvestments;
