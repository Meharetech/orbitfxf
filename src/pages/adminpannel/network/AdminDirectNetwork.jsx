import React, { useState, useEffect } from 'react';
import api from '../../../api/apiConfig';
import { 
    Users, UserPlus, Search, 
    ArrowRight, Wallet, Activity, 
    ChevronRight, ChevronDown, ShieldCheck,
    TrendingUp, Info, User,
    LayoutGrid, History, Calendar,
    ArrowDownRight, Loader2
} from 'lucide-react';
import PremiumModal from '../../../components/common/PremiumModal';

const AdminDirectNetwork = () => {
    const [networkData, setNetworkData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedUser, setExpandedUser] = useState(null);
    const [actionLoading, setActionLoading] = useState(null);

    // Modal states
    const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [adminReason, setAdminReason] = useState('');
    const [adjustmentAmount, setAdjustmentAmount] = useState('');
    const [adjustmentType, setAdjustmentType] = useState('Withdraw');
    const [adjustmentTarget, setAdjustmentTarget] = useState('Wallet');

    useEffect(() => {
        fetchNetwork();
    }, []);

    const fetchNetwork = async () => {
        try {
            const res = await api.get('/admin/network-analysis');
            setNetworkData(res.data);
        } catch (err) {
            console.error('Network analysis fetch failed');
        } finally {
            setLoading(false);
        }
    };
    const handleAdjustBalance = async () => {
        if (!selectedUser || !adjustmentAmount) return;
        setIsBalanceModalOpen(false);
        setActionLoading(selectedUser.username); // Using username as ID for simple loading check
        try {
            await api.post(`/admin/users/${selectedUser.id}/adjust-balance`, {
                amount: Number(adjustmentAmount),
                type: adjustmentType,
                target: adjustmentTarget,
                note: adminReason
            });
            fetchNetwork();
        } catch (err) {
            console.error('Balance adjustment failed');
        } finally {
            setActionLoading(null);
            setAdjustmentAmount('');
            setAdminReason('');
        }
    };

    const toggleExpand = (userId) => {
        setExpandedUser(expandedUser === userId ? null : userId);
    };

    const filteredData = networkData.filter(u => 
        u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-600 text-[9px] font-black uppercase tracking-widest italic animate-pulse">Mapping Direct Hierarchy...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-700 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/10">
                        <UserPlus className="text-amber-500 w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                        <h2 className="text-xl font-black text-white uppercase tracking-tight italic leading-none">
                            Recruitment <span className="text-amber-500">Analysis</span>
                        </h2>
                        <p className="text-gray-600 text-[9px] font-black uppercase tracking-widest">Targeted Referral Performance Audit</p>
                    </div>
                </div>
                
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 w-3.5 h-3.5 group-focus-within:text-amber-500 transition-colors" />
                    <input 
                        type="text"
                        placeholder="Search Sponsor Protocol..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-[11px] text-white focus:outline-none focus:border-amber-500/30 w-64 lg:w-80 transition-all font-bold tracking-tight placeholder:text-gray-700"
                    />
                </div>
            </div>

            {/* Performance Stats Banner */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Top Recruiters', value: networkData.filter(u => u.directCount > 0).length, icon: LayoutGrid, color: 'emerald' },
                    { label: 'Network Balance', value: `$${networkData.reduce((s,u) => s + u.balance, 0).toLocaleString()}`, icon: Wallet, color: 'blue' },
                    { label: 'Retention Rate', value: '94.2%', icon: Activity, color: 'amber' },
                    { label: 'Team Capital', value: `$${networkData.reduce((s,u) => s + u.directInvestmentTotal, 0).toLocaleString()}`, icon: TrendingUp, color: 'purple' }
                ].map((stat, i) => (
                    <div key={i} className="glass-card p-4 border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-colors border-dashed">
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg bg-${stat.color}-500/5 flex items-center justify-center border border-${stat.color}-500/10`}>
                                <stat.icon size={14} className={`text-${stat.color}-500`} />
                            </div>
                            <div>
                                <p className="text-[8px] text-gray-700 font-black uppercase tracking-widest italic">{stat.label}</p>
                                <p className="text-sm font-black text-white italic tracking-tighter">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Analysis Table - High Density */}
            <div className="glass-card border-white/5 bg-[#0a0f1d]/50 overflow-hidden">
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                         <History className="text-amber-500 w-3.5 h-3.5" />
                         <h4 className="text-white font-black uppercase text-[10px] italic tracking-[0.2em]">Sponsor Performance Matrix</h4>
                     </div>
                     <p className="text-[9px] text-gray-700 font-black uppercase tracking-tighter">Protocol: Direct-Injected Monitoring</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/[0.01] border-b border-white/5">
                                <th className="p-4 text-[9px] font-black uppercase tracking-widest text-gray-700">Sponsor Identifier</th>
                                <th className="p-4 text-[9px] font-black uppercase tracking-widest text-gray-700">Available USD</th>
                                <th className="p-4 text-[9px] font-black uppercase tracking-widest text-gray-700 text-center">Unit Count</th>
                                <th className="p-4 text-[9px] font-black uppercase tracking-widest text-gray-700">Internal Capital</th>
                                <th className="p-4 text-[9px] font-black uppercase tracking-widest text-gray-700 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            {filteredData.map((user) => (
                                <React.Fragment key={user.id}>
                                    <tr className={`hover:bg-white/[0.02] transition-all group ${expandedUser === user.id ? 'bg-amber-500/[0.02]' : ''}`}>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-[10px] italic ${user.isActivated ? 'bg-emerald-500/5 text-emerald-500 border border-emerald-500/10' : 'bg-gray-500/5 text-gray-700 border border-white/5'}`}>
                                                    {user.username.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-white font-black italic uppercase text-xs leading-none mb-1 group-hover:text-amber-500 transition-colors">{user.username}</p>
                                                    <p className="text-[8px] text-gray-700 font-bold tracking-tight lowercase">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-emerald-500 font-black italic text-xs truncate leading-none mb-1">${user.balance.toFixed(1).toLocaleString()}</p>
                                            <div className="flex items-center gap-1.5 opacity-50">
                                                <div className="w-2 h-0.5 bg-emerald-500 rounded-full" />
                                                <p className="text-[7px] text-gray-500 font-black uppercase tracking-tighter">Secured Assets</p>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white/5 rounded border border-white/5">
                                                <Users size={10} className="text-gray-700" />
                                                <span className="text-white font-black italic text-[10px]">{user.directCount}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-blue-500 font-black italic text-xs truncate leading-none mb-1">${user.directInvestmentTotal.toLocaleString()}</p>
                                            <p className="text-[8px] text-gray-700 font-black uppercase italic">Team Volume</p>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button 
                                                onClick={() => toggleExpand(user.id)}
                                                className={`p-1.5 rounded transition-all transform active:scale-95 ${expandedUser === user.id ? 'bg-amber-500 text-black' : 'bg-white/5 text-gray-400 hover:text-white'}`}
                                            >
                                                {expandedUser === user.id ? <ChevronDown size={14} /> : <Info size={14} />}
                                            </button>
                                        </td>
                                    </tr>

                                    {/* Expanded Analysis Drawer - Compact Grid */}
                                    {expandedUser === user.id && (
                                        <tr className="bg-black/60 animate-in slide-in-from-top-4 duration-500 border-x border-amber-500/10">
                                            <td colSpan="5" className="p-6">
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                                                        <h5 className="text-[9px] text-amber-500 font-black uppercase tracking-[0.2em] italic flex items-center gap-2">
                                                            <Activity size={12} /> Target Sequence: {user.username}'s Protocol Members
                                                        </h5>
                                                        <div className="flex items-center gap-3">
                                                             <Calendar size={10} className="text-gray-700" />
                                                             <span className="text-[8px] text-gray-700 font-black uppercase tracking-tighter italic">Entry: {new Date(user.createdAt).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>

                                                    <div className="overflow-hidden border border-white/5 rounded-xl bg-black/20">
                                                        <table className="w-full text-left">
                                                            <thead>
                                                                <tr className="bg-white/[0.03] border-b border-white/5">
                                                                    <th className="p-3 text-[8px] font-black uppercase tracking-widest text-gray-700"># Node</th>
                                                                    <th className="p-3 text-[8px] font-black uppercase tracking-widest text-gray-700">Member Identifier</th>
                                                                    <th className="p-3 text-[8px] font-black uppercase tracking-widest text-gray-700">Status</th>
                                                                    <th className="p-3 text-[8px] font-black uppercase tracking-widest text-gray-700">Available Net</th>
                                                                    <th className="p-3 text-[8px] font-black uppercase tracking-widest text-gray-700">Registry Date</th>
                                                                    <th className="p-3 text-[8px] font-black uppercase tracking-widest text-gray-700 text-right">Actions</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-white/[0.04]">
                                                                {user.directs.length === 0 ? (
                                                                    <tr>
                                                                        <td colSpan="5" className="p-6 text-center text-gray-800 text-[8px] font-black uppercase tracking-[0.2em] italic">No Targeted Directs Found</td>
                                                                    </tr>
                                                                ) : (
                                                                    user.directs.map((direct, dIdx) => (
                                                                        <tr key={dIdx} className="hover:bg-white/[0.02] transition-colors group">
                                                                            <td className="p-3 text-gray-700 font-bold text-[8px] tracking-tighter w-12">#{dIdx + 1}</td>
                                                                            <td className="p-3">
                                                                                <div className="flex items-center gap-2">
                                                                                    <div className="w-1.5 h-3 rounded-sm bg-amber-500/20 group-hover:bg-amber-500/50 transition-colors" />
                                                                                    <span className="text-[10px] font-black text-white italic uppercase tracking-tighter group-hover:text-amber-500 transition-colors">{direct.username}</span>
                                                                                </div>
                                                                            </td>
                                                                            <td className="p-3">
                                                                                <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[7px] font-black uppercase tracking-tighter ${direct.isActivated ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                                                                    <div className={`w-1 h-1 rounded-full ${direct.isActivated ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                                                                    {direct.isActivated ? 'Active' : 'Pending'}
                                                                                </div>
                                                                            </td>
                                                                            <td className="p-3 text-emerald-500 font-black italic text-[10px] tracking-tight">
                                                                                ${direct.balance.toFixed(0)}
                                                                            </td>
                                                                            <td className="p-3 text-gray-700 font-bold italic text-[8px] tracking-tighter">
                                                                                {new Date(direct.dateJoined).toLocaleDateString()}
                                                                            </td>
                                                                            <td className="p-3 text-right">
                                                                                <button 
                                                                                    onClick={() => {
                                                                                        setSelectedUser({
                                                                                            id: direct.id || direct._id, // Handling possible ID naming variations
                                                                                            username: direct.username,
                                                                                            balance: direct.balance,
                                                                                            totalInvestedAmount: direct.totalInvestedAmount || 0
                                                                                        });
                                                                                        setAdjustmentType('Withdraw');
                                                                                        setIsBalanceModalOpen(true);
                                                                                    }}
                                                                                    className="p-1 bg-red-500/10 border border-red-500/20 text-red-500 rounded hover:bg-red-500 hover:text-white transition-all shadow-lg"
                                                                                    title="Admin Cash-Out"
                                                                                >
                                                                                    <ArrowDownRight size={10} />
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                )}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

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

export default AdminDirectNetwork;
