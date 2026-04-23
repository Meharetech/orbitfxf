import React, { useState, useEffect } from 'react';
import api from '../../../api/apiConfig';
import { 
  Plus, Trash2, Edit2, QrCode, 
  Loader2, ToggleLeft, ToggleRight, 
  CheckCircle2, ShieldCheck, RefreshCw,
  ChevronDown, ChevronUp, Image, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BLANK_FORM = { name: '', walletAddress: '', network: 'TRC20', qrCode: '' };

const PaymentGateways = () => {
    const [methods, setMethods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState(BLANK_FORM);
    const [imagePreview, setImagePreview] = useState(null);
    const [saving, setSaving] = useState(false);
    const [expandedRow, setExpandedRow] = useState(null);

    useEffect(() => { fetchMethods(); }, []);

    const fetchMethods = async () => {
        setLoading(true);
        try {
            const res = await api.get('/payments/admin');
            setMethods(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
            setFormData(prev => ({ ...prev, qrCode: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const openAdd = () => {
        setEditingId(null);
        setFormData(BLANK_FORM);
        setImagePreview(null);
        setShowForm(true);
    };

    const openEdit = (m) => {
        setEditingId(m._id);
        setFormData({ name: m.name, walletAddress: m.walletAddress, network: m.network, qrCode: m.qrCode });
        setImagePreview(m.qrCode);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingId(null);
        setFormData(BLANK_FORM);
        setImagePreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editingId) {
                await api.put(`/payments/${editingId}`, formData);
            } else {
                await api.post('/payments', formData);
            }
            closeForm();
            fetchMethods();
        } catch (err) {
            alert('Error: ' + (err.response?.data?.message || err.message));
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Remove this gateway from the system?')) return;
        try {
            await api.delete(`/payments/${id}`);
            fetchMethods();
        } catch { alert('Delete failed'); }
    };

    const toggleStatus = async (id) => {
        try {
            await api.patch(`/payments/${id}/toggle`);
            fetchMethods();
        } catch { alert('Toggle failed'); }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
                <div>
                    <h2 className="text-3xl font-black text-white tracking-tight uppercase">Payment Gateways</h2>
                    <p className="text-gray-500 text-[11px] font-bold uppercase tracking-[0.25em] mt-1">Configure Deposit Wallet Pathways</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={fetchMethods} className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">
                        <RefreshCw size={13} /> Refresh
                    </button>
                    <button onClick={openAdd} className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-amber-500/20">
                        <Plus size={14} /> Add Gateway
                    </button>
                </div>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: 'Total Gateways', value: methods.length, color: 'text-white' },
                    { label: 'Active',          value: methods.filter(m=>m.isActive).length, color: 'text-green-400' },
                    { label: 'Offline',         value: methods.filter(m=>!m.isActive).length, color: 'text-gray-500' },
                ].map(s => (
                    <div key={s.label} className="glass-card p-5 border-white/5 bg-white/[0.01] text-center">
                        <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                        <p className="text-gray-600 text-[9px] font-black uppercase tracking-widest mt-1">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Add / Edit Form */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="glass-card p-8 border-amber-500/20 bg-amber-500/5 relative">
                            <button onClick={closeForm} className="absolute top-4 right-4 p-2 text-gray-600 hover:text-white transition-colors">
                                <X size={18} />
                            </button>
                            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6">
                                {editingId ? '✏️ Edit Gateway' : '➕ New Payment Gateway'}
                            </h3>
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Asset Name</label>
                                        <input type="text" placeholder="e.g., USDT (Tether)" required
                                            value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                                            className="w-full bg-black/40 border border-white/5 rounded-xl py-3 px-4 text-sm text-white placeholder:text-gray-700 focus:outline-none focus:border-amber-500/40"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Wallet Address</label>
                                        <input type="text" placeholder="Paste full wallet address..." required
                                            value={formData.walletAddress} onChange={e => setFormData({...formData, walletAddress: e.target.value})}
                                            className="w-full bg-black/40 border border-white/5 rounded-xl py-3 px-4 text-sm text-white placeholder:text-gray-700 focus:outline-none focus:border-amber-500/40 font-mono"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Blockchain Network</label>
                                        <select value={formData.network} onChange={e => setFormData({...formData, network: e.target.value})}
                                            className="w-full bg-black/40 border border-white/5 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-amber-500/40"
                                        >
                                            {['TRC20','ERC20','BEP20','BTC'].map(n => <option key={n} value={n}>{n}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-5">
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] text-gray-500 font-black uppercase tracking-widest">QR Code Image</label>
                                        <div className="relative bg-black/40 border-2 border-dashed border-white/10 rounded-2xl min-h-[160px] flex items-center justify-center hover:border-amber-500/30 transition-all overflow-hidden">
                                            {imagePreview ? (
                                                <img src={imagePreview} className="w-full h-[160px] object-contain p-3" alt="QR Preview" />
                                            ) : (
                                                <div className="text-center">
                                                    <QrCode className="w-10 h-10 text-gray-700 mx-auto mb-2" />
                                                    <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">Click to Upload QR</p>
                                                </div>
                                            )}
                                            <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                                        </div>
                                    </div>
                                    <button type="submit" disabled={saving}
                                        className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-black uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-amber-500/20 active:scale-95"
                                    >
                                        {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <><CheckCircle2 size={16} /> {editingId ? 'Update Gateway' : 'Save Gateway'}</>}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Table */}
            {loading ? (
                <div className="py-24 flex justify-center"><Loader2 className="text-amber-500 animate-spin w-10 h-10" /></div>
            ) : methods.length === 0 ? (
                <div className="py-24 text-center glass-card border-white/5 bg-white/[0.01] text-gray-700 text-xs font-black uppercase tracking-widest italic">
                    No payment gateways configured. Click "+ Add Gateway" to get started.
                </div>
            ) : (
                <div className="glass-card overflow-hidden border-white/5 bg-white/[0.01]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="bg-white/[0.03] border-b border-white/5">
                                    {['#', 'QR', 'Asset Name', 'Network', 'Wallet Address', 'Status', 'Actions'].map(h => (
                                        <th key={h} className="px-5 py-4 text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] whitespace-nowrap">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.03]">
                                {methods.map((m, i) => {
                                    const isExpanded = expandedRow === m._id;
                                    return (
                                        <React.Fragment key={m._id}>
                                            <tr className="hover:bg-white/[0.015] transition-colors">
                                                {/* # */}
                                                <td className="px-5 py-4">
                                                    <span className="text-[10px] text-gray-700 font-black">#{i+1}</span>
                                                </td>

                                                {/* QR Preview */}
                                                <td className="px-5 py-4">
                                                    <button
                                                        onClick={() => setExpandedRow(isExpanded ? null : m._id)}
                                                        className="w-10 h-10 bg-white/70 rounded-xl p-1 hover:scale-110 transition-transform"
                                                    >
                                                        <img src={m.qrCode} className="w-full h-full object-contain" alt="QR" />
                                                    </button>
                                                </td>

                                                {/* Name */}
                                                <td className="px-5 py-4">
                                                    <p className="text-white font-black text-sm uppercase tracking-tight whitespace-nowrap">{m.name}</p>
                                                </td>

                                                {/* Network */}
                                                <td className="px-5 py-4">
                                                    <span className="px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border bg-amber-500/10 text-amber-500 border-amber-500/20 whitespace-nowrap">
                                                        {m.network}
                                                    </span>
                                                </td>

                                                {/* Wallet */}
                                                <td className="px-5 py-4 max-w-[200px]">
                                                    <p className="text-[10px] text-gray-500 font-mono truncate" title={m.walletAddress}>{m.walletAddress}</p>
                                                </td>

                                                {/* Status */}
                                                <td className="px-5 py-4">
                                                    <button onClick={() => toggleStatus(m._id)} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[9px] font-black uppercase tracking-widest transition-all ${m.isActive ? 'bg-green-500/10 border-green-500/20 text-green-500 hover:bg-green-500/20' : 'bg-white/5 border-white/10 text-gray-500 hover:bg-white/10'}`}>
                                                        {m.isActive ? <ToggleRight size={14}/> : <ToggleLeft size={14}/>}
                                                        {m.isActive ? 'Active' : 'Offline'}
                                                    </button>
                                                </td>

                                                {/* Actions */}
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <button onClick={() => openEdit(m)} title="Edit"
                                                            className="p-2 text-gray-500 hover:text-amber-500 hover:bg-amber-500/10 rounded-lg transition-all border border-white/5"
                                                        >
                                                            <Edit2 size={15} />
                                                        </button>
                                                        <button onClick={() => handleDelete(m._id)} title="Delete"
                                                            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all border border-white/5"
                                                        >
                                                            <Trash2 size={15} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>

                                            {/* Expanded QR row */}
                                            {isExpanded && (
                                                <tr className="bg-black/30">
                                                    <td colSpan={7} className="px-6 py-8">
                                                        <div className="flex flex-col sm:flex-row gap-8 items-start">
                                                            <div className="w-40 h-40 bg-white rounded-2xl p-3 shadow-2xl shrink-0">
                                                                <img src={m.qrCode} className="w-full h-full object-contain" alt="QR Full" />
                                                            </div>
                                                            <div className="space-y-4 flex-1">
                                                                <div>
                                                                    <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2">Full Wallet Address</p>
                                                                    <p className="text-[11px] text-amber-500/70 font-mono bg-black/30 border border-white/5 rounded-xl px-4 py-3 break-all">{m.walletAddress}</p>
                                                                </div>
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                                                                        <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">Network</p>
                                                                        <p className="text-amber-500 font-black uppercase mt-1">{m.network}</p>
                                                                    </div>
                                                                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                                                                        <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">Status</p>
                                                                        <p className={`font-black uppercase mt-1 ${m.isActive ? 'text-green-400' : 'text-gray-500'}`}>{m.isActive ? 'Active' : 'Offline'}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentGateways;
