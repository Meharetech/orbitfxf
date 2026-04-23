import React, { useState, useEffect } from 'react';
import api from '../../../api/apiConfig';
import { 
  ArrowUpRight, Clock, 
  Loader2, RefreshCw, AlertCircle,
  ShieldCheck, Wallet
} from 'lucide-react';
import { motion } from 'framer-motion';

const WithdrawalHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const res = await api.get('/withdrawals/history');
            setHistory(res.data);
        } catch (err) {
            console.error('Error fetching history');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-20 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
                <div>
                    <h2 className="text-3xl font-black text-white tracking-tight uppercase">Liquidation Logs</h2>
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Audit trail of capital redemptions and arrivals</p>
                </div>
                <button 
                    onClick={fetchHistory}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all"
                >
                    <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh Logs
                </button>
            </div>

            {loading ? (
                <div className="py-24 flex justify-center"><Loader2 className="text-amber-500 animate-spin w-10 h-10" /></div>
            ) : history.length === 0 ? (
                <div className="py-24 text-center glass-card border-white/5 bg-white/[0.01]">
                    <AlertCircle className="w-10 h-10 text-gray-800 mx-auto mb-4" />
                    <p className="text-gray-700 text-[10px] font-black uppercase tracking-[0.3em]">No liquidation history detected.</p>
                </div>
            ) : (
                <div className="glass-card overflow-hidden border-white/5 bg-white/[0.01]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white/[0.02] border-b border-white/5">
                                    <th className="px-6 py-4 text-[9px] font-black text-gray-600 uppercase tracking-widest">#</th>
                                    <th className="px-6 py-4 text-[9px] font-black text-gray-600 uppercase tracking-widest">Protocol Status</th>
                                    <th className="px-6 py-4 text-[9px] font-black text-gray-600 uppercase tracking-widest">Gross Amount</th>
                                    <th className="px-6 py-4 text-[9px] font-black text-gray-600 uppercase tracking-widest">Net Arrival</th>
                                    <th className="px-6 py-4 text-[9px] font-black text-gray-600 uppercase tracking-widest">Date & Time</th>
                                    <th className="px-6 py-4 text-[9px] font-black text-gray-600 uppercase tracking-widest text-right">Admin Audit</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.03]">
                                {history.map((tx, index) => (
                                    <motion.tr 
                                        initial={{ opacity: 0 }} 
                                        animate={{ opacity: 1 }}
                                        key={tx._id} 
                                        className="hover:bg-white/[0.015] transition-colors group"
                                    >
                                        <td className="px-6 py-5">
                                            <span className="text-[10px] text-gray-700 font-black">{String(index + 1).padStart(2, '0')}</span>
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                                    tx.status === 'Approved' ? 'bg-green-500/10 text-green-500' :
                                                    tx.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' :
                                                    'bg-red-500/10 text-red-500'
                                                }`}>
                                                    <ArrowUpRight size={14} />
                                                </div>
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${
                                                    tx.status === 'Approved' ? 'text-green-500' :
                                                    tx.status === 'Pending' ? 'text-amber-500' :
                                                    'text-red-500'
                                                }`}>
                                                    {tx.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-[11px] font-black text-white/50 tracking-widest">${tx.amount.toFixed(2)}</span>
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            <span className="text-sm font-black text-white tracking-tighter">${tx.netAmount.toFixed(2)}</span>
                                            <p className="text-[8px] text-gray-700 font-bold uppercase tracking-widest mt-1">Net after 10% fee</p>
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-white/60">{new Date(tx.createdAt).toLocaleDateString()}</span>
                                                <span className="text-[8px] font-black uppercase tracking-widest mt-0.5 opacity-50">{new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <span className="text-[10px] text-gray-500 font-bold italic truncate block max-w-[150px] ml-auto">
                                                {tx.adminNote || 'Awaiting Authorization'}
                                            </span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WithdrawalHistory;
