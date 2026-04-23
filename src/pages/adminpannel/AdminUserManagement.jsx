import React, { useState, useEffect } from 'react';
import api from '../../api/apiConfig';
import { 
    Users, Search, Filter, 
    MoreHorizontal, ShieldCheck, 
    ArrowUpRight, Wallet, Activity,
    UserCircle, Loader2, Mail, 
    Calendar, CheckCircle2, XCircle,
    UserMinus, UserPlus, ArrowDownRight,
    Briefcase, ShieldAlert, History
} from 'lucide-react';
import PremiumModal from '../../components/common/PremiumModal';

const AdminUserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [actionLoading, setActionLoading] = useState(null); // ID of user being updated
    
    // Modal states
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [adminReason, setAdminReason] = useState('');
    const [adjustmentAmount, setAdjustmentAmount] = useState('');
    const [adjustmentType, setAdjustmentType] = useState('Withdraw');
    const [adjustmentTarget, setAdjustmentTarget] = useState('Wallet');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get('/admin/latest-users');
            setUsers(res.data);
        } catch (err) {
            console.error('Error fetching latest users');
        } finally {
            setLoading(false);
        }
    };
    const handleToggleStatus = async () => {
        if (!selectedUser) return;
        setIsStatusModalOpen(false);
        setActionLoading(selectedUser._id);
        try {
            await api.post(`/admin/users/${selectedUser._id}/toggle-status`);
            fetchUsers();
        } catch (err) {
            console.error('Toggle status failed');
        } finally {
            setActionLoading(null);
        }
    };

    const handleAdjustBalance = async () => {
        if (!selectedUser || !adjustmentAmount) return;
        setIsBalanceModalOpen(false);
        setActionLoading(selectedUser._id);
        try {
            await api.post(`/admin/users/${selectedUser._id}/adjust-balance`, {
                amount: Number(adjustmentAmount),
                type: adjustmentType,
                target: adjustmentTarget,
                note: adminReason
            });
            fetchUsers();
        } catch (err) {
            console.error('Balance adjustment failed');
        } finally {
            setActionLoading(null);
            setAdjustmentAmount('');
            setAdminReason('');
        }
    };

    const filteredUsers = users.filter(u => {
        const matchesSearch = u.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             u.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || 
                             (statusFilter === 'active' && u.isActivated) ||
                             (statusFilter === 'inactive' && !u.isActivated);
        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
                <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest italic">Indexing Member Registry...</p>
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-in fade-in duration-700 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">
                        User <span className="text-amber-500">Management</span>
                    </h2>
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">
                        Latest 100 Enrolled Protocol Members — System Index
                    </p>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <input 
                            type="text"
                            placeholder="Find by username or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500/50 w-72 transition-all font-bold placeholder:text-gray-600 shadow-xl"
                        />
                    </div>
                    <div className="flex items-center p-1 bg-white/5 border border-white/10 rounded-xl">
                        {['all', 'active', 'inactive'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setStatusFilter(f)}
                                className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${statusFilter === f ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'text-gray-500 hover:text-white'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* User Statistics Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Total Index', value: users.length, icon: Users, color: 'blue' },
                    { label: 'Activation Rate', value: `${((users.filter(u => u.isActivated).length / (users.length || 1)) * 100).toFixed(0)}%`, icon: Activity, color: 'emerald' },
                    { label: 'Cumulative Assets', value: `$${users.reduce((s, u) => s + u.balance, 0).toLocaleString()}`, icon: Wallet, color: 'amber' },
                    { label: 'Inactive Nodes', value: users.filter(u => !u.isActivated).length, icon: XCircle, color: 'red' }
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-5 border-white/5 bg-white/[0.01] flex items-center gap-5 translate-y-0 hover:-translate-y-1 transition-all">
                         <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/10 border border-${stat.color}-500/20 flex items-center justify-center`}>
                            <stat.icon size={18} className={`text-${stat.color}-500`} />
                         </div>
                         <div>
                            <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                            <p className="text-lg font-black text-white italic">{stat.value}</p>
                         </div>
                    </div>
                ))}
            </div>

            {/* Main Users Table */}
            <div className="glass-card border-white/5 bg-[#0a0f1d]/50 overflow-hidden">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                         <ShieldCheck className="text-amber-500 w-4 h-4" />
                         <h4 className="text-white font-black uppercase text-xs italic tracking-widest">Verified Member Registry</h4>
                     </div>
                     <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest italic">Sorted by Recruitment Date (Latest First)</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/[0.02] border-b border-white/5">
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Protocol Member</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Account status</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Investment Portfolio</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Wallet Assets</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Earnings</th>
                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700 text-right">Governance Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className="hover:bg-white/[0.01] transition-all group">
                                    <td className="p-5">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${user.isActivated ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-lg shadow-amber-500/10' : 'bg-white/5 text-gray-400 border border-white/5'}`}>
                                                {user.username.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-white font-black italic uppercase text-sm leading-none mb-1.5 group-hover:text-amber-500 transition-colors">{user.username}</p>
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Mail size={10} />
                                                    <span className="text-[10px] font-bold tracking-tight lowercase">{user.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-5">
                                        {user.isActivated ? (
                                            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[9px] font-black uppercase italic rounded-lg">
                                                <CheckCircle2 size={10} /> Activated
                                            </div>
                                        ) : (
                                            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-red-500/10 border border-red-500/20 text-red-500 text-[9px] font-black uppercase italic rounded-lg opacity-50">
                                                <XCircle size={10} /> Inactive
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-5">
                                        <div className="flex flex-col">
                                            <p className="text-white font-extrabold italic leading-none tracking-tight text-lg">${(user.totalInvestedAmount || 0).toLocaleString()}</p>
                                            <p className="text-[8px] text-gray-700 font-black uppercase mt-1 tracking-widest flex items-center gap-1.5">
                                                <Briefcase size={8} /> {user.activeInvestmentCount || 0} Active Nodes
                                            </p>
                                        </div>
                                    </td>
                                    <td className="p-5">
                                        <p className="text-emerald-500 font-extrabold italic leading-none truncate tracking-tight text-lg">${user.balance.toFixed(2)}</p>
                                        <p className="text-[8px] text-gray-700 font-black uppercase mt-1 tracking-widest">Liquid Funds</p>
                                    </td>
                                    <td className="p-5">
                                        <p className="text-blue-500 font-extrabold italic leading-none truncate tracking-tight text-lg">${user.totalEarned.toFixed(2)}</p>
                                        <p className="text-[8px] text-gray-700 font-black uppercase mt-1 tracking-widest">Protocol Profit</p>
                                    </td>
                                    <td className="p-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button 
                                                onClick={() => {
                                                    setSelectedUser(user);
                                                    setAdjustmentType('Withdraw');
                                                    setIsBalanceModalOpen(true);
                                                }}
                                                className="p-2.5 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/5 group/btn"
                                                title="Admin Cash-Out"
                                            >
                                                <ArrowDownRight size={14} className="group-hover/btn:translate-y-0.5" />
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    setSelectedUser(user);
                                                    setIsStatusModalOpen(true);
                                                }}
                                                className={`p-2.5 rounded-xl border transition-all shadow-lg ${user.isActive === false ? 'bg-amber-500 text-black border-amber-600 shadow-amber-500/20' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white hover:bg-white/10'}`}
                                                title={user.isActive === false ? 'Enable Account' : 'Suspend Account'}
                                            >
                                                {actionLoading === user._id ? <Loader2 size={14} className="animate-spin" /> : (user.isActive === false ? <UserPlus size={14} /> : <UserMinus size={14} />)}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Status Modal */}
            <PremiumModal 
                isOpen={isStatusModalOpen}
                onClose={() => setIsStatusModalOpen(false)}
                onConfirm={handleToggleStatus}
                title={selectedUser?.isActive === false ? 'Enable User Node?' : 'Suspend Account?'}
                message={selectedUser?.isActive === false ? `Are you sure you want to reactivate planetary access for @${selectedUser?.username}?` : `This action will immediately disable @${selectedUser?.username}'s account hub and restrict all financial transactions.`}
                type={selectedUser?.isActive === false ? 'success' : 'danger'}
                confirmText={selectedUser?.isActive === false ? 'Authorize Access' : 'Suspend Node'}
                cancelText="Decline Action"
            />

            {/* Balance Adjustment Modal */}
            <PremiumModal 
                isOpen={isBalanceModalOpen}
                onClose={() => setIsBalanceModalOpen(false)}
                onConfirm={handleAdjustBalance}
                title="Fiscal Override Controller"
                message={`Adjusting for @${selectedUser?.username}.`}
                type="warning"
                confirmText={`Execute ${adjustmentType}`}
                cancelText="Decline Fiscal Action"
                showInput={true}
                inputValue={adminReason}
                onInputChange={setAdminReason}
                inputPlaceholder="Enter administrative reason / note..."
            >
                <div className="w-full space-y-4 mb-4 mt-2">
                    {/* Financial Telemetry Display */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl space-y-1.5">
                            <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest leading-none">Liquid Assets</p>
                            <p className="text-sm font-black text-emerald-500 italic leading-none">${selectedUser?.balance?.toLocaleString()}</p>
                        </div>
                        <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl space-y-1.5">
                            <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest leading-none">Portfolio Node</p>
                            <p className="text-sm font-black text-blue-500 italic leading-none">${selectedUser?.totalInvestedAmount?.toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        {['Deposit', 'Withdraw'].map(t => (
                            <button 
                                key={t}
                                onClick={() => setAdjustmentType(t)}
                                className={`py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${adjustmentType === t ? 'bg-amber-500 text-black border-amber-500' : 'bg-white/5 text-gray-500 border-white/10'}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {['Wallet', 'Investment'].map(t => (
                            <button 
                                key={t}
                                onClick={() => setAdjustmentTarget(t)}
                                className={`py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${adjustmentTarget === t ? 'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/20' : 'bg-white/5 text-gray-500 border-white/10'}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                    <input 
                        type="number" 
                        placeholder="Enter adjustment amount ($)..."
                        value={adjustmentAmount}
                        onChange={(e) => setAdjustmentAmount(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-6 text-sm font-black text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-gray-800"
                    />
                </div>
            </PremiumModal>
        </div>
    );
};

export default AdminUserManagement;
