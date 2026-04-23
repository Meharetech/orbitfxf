import React, { useState, useEffect } from 'react';
import api from '../../../api/apiConfig';
import { 
    Calendar, TrendingUp, Users, 
    ArrowUpRight, Loader2, Download,
    Layers, Search, ShieldCheck
} from 'lucide-react';

const AdminInvestmentReports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const res = await api.get('/admin/roi-reports');
            setReports(res.data);
        } catch (err) {
            console.error('Error fetching ROI reports');
        } finally {
            setLoading(false);
        }
    };

    const filteredReports = reports.filter(r => r.date.includes(searchTerm));

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
                <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">Compiling Daily Distribution Logs...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">
                        % Investment <span className="text-amber-500">Reports</span>
                    </h2>
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">
                        Daily Rate ROI Analysis — Distribution Protocol Tracking
                    </p>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <input 
                            type="text"
                            placeholder="Search by date (YYYY-MM-DD)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500/50 w-64 transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Summary Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Periods', value: reports.length, icon: Calendar, color: 'blue' },
                    { label: 'Avg Daily Payout', value: `$${(reports.reduce((s,r) => s + r.personalTotal, 0) / (reports.length || 1)).toFixed(2)}`, icon: TrendingUp, color: 'emerald' },
                    { label: 'Cumulative Distributed', value: `$${reports.reduce((s,r) => s + r.personalTotal + r.levelTotal, 0).toLocaleString()}`, icon: Layers, color: 'amber' }
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-6 border-white/5 bg-white/[0.01] flex items-center gap-5">
                        <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-500/10 border border-${stat.color}-500/20 flex items-center justify-center`}>
                            <stat.icon size={20} className={`text-${stat.color}-500`} />
                        </div>
                        <div>
                            <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
                            <p className="text-xl font-black text-white italic">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Table */}
            <div className="glass-card overflow-hidden border-white/5 bg-[#0a0f1d]/50">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="text-amber-500 w-4 h-4" />
                        <h4 className="text-white font-black uppercase text-xs italic tracking-widest">Verified Distribution History</h4>
                    </div>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg text-[9px] text-gray-500 font-black uppercase hover:text-white transition-all">
                        <Download size={12} /> Export CSV
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/[0.02] border-b border-white/5">
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Payout Date</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Rate (%)</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700 text-center">Users Paid</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Personal ROI Total</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Network Pool (25%)</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Total System Payout</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            {filteredReports.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-20 text-center">
                                        <p className="text-gray-800 text-[10px] font-black uppercase tracking-widest italic">No Distribution Logs Found</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredReports.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-white/[0.01] transition-colors group">
                                        <td className="p-5">
                                            <p className="text-white font-black italic text-sm">{new Date(row.date).toLocaleDateString()}</p>
                                            <p className="text-[9px] text-amber-500 font-bold uppercase tracking-widest leading-none mt-1">{new Date(row.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        </td>
                                        <td className="p-5">
                                           <div className="inline-flex px-2 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black italic rounded">
                                               {row.percentage}% Daily
                                           </div>
                                        </td>
                                        <td className="p-5 text-center">
                                            <p className="text-white font-black">{row.userCount}</p>
                                            <p className="text-[8px] text-gray-600 font-bold uppercase">Investors</p>
                                        </td>
                                        <td className="p-5 text-emerald-500 font-black italic">
                                            ${row.personalTotal.toFixed(2)}
                                        </td>
                                        <td className="p-5 text-blue-500 font-black italic">
                                            ${row.levelTotal.toFixed(2)}
                                        </td>
                                        <td className="p-5">
                                            <div className="flex flex-col">
                                                <span className="text-white font-black text-lg underline decoration-amber-500/30 underline-offset-4">${(row.personalTotal + row.levelTotal).toLocaleString()}</span>
                                                <span className="text-[8px] text-gray-700 font-black uppercase tracking-widest">Net Outflow</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminInvestmentReports;
