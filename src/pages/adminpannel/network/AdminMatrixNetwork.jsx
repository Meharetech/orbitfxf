import React, { useState, useEffect } from 'react';
import api from '../../../api/apiConfig';
import { 
    Network, Search, ShieldCheck, 
    Layers, Users, TrendingUp, 
    ChevronRight, Loader2, User,
    ArrowUpRight, Target, Activity
} from 'lucide-react';

const AdminMatrixNetwork = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [matrixData, setMatrixData] = useState(null);
    const [matrixLoading, setMatrixLoading] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get('/admin/network-analysis');
            setUsers(res.data);
        } catch (err) {
            console.error('Fetch users failed');
        } finally {
            setLoading(false);
        }
    };

    const analyzeMatrix = async (userId) => {
        setMatrixLoading(true);
        setSelectedUser(userId);
        setMatrixData(null);
        try {
            const res = await api.get(`/admin/user-matrix/${userId}`);
            setMatrixData(res.data);
        } catch (err) {
            console.error('Matrix analysis failed');
        } finally {
            setMatrixLoading(false);
        }
    };

    const filteredUsers = users.filter(u => 
        u.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
                <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest italic">Syncing Matrix Core...</p>
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-in fade-in duration-700 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">
                        Multilevel <span className="text-amber-500">Matrix Analysis</span>
                    </h2>
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">
                        Search Protocol Member — 20-Level Depth Audit
                    </p>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 group-focus-within:text-amber-500 transition-colors" />
                        <input 
                            type="text"
                            placeholder="Enter Username (e.g. admin)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    const user = users.find(u => u.username.toLowerCase() === searchTerm.toLowerCase());
                                    if (user) analyzeMatrix(user.id);
                                }
                            }}
                            className="bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50 w-80 lg:w-96 transition-all font-bold placeholder:text-gray-700 shadow-2xl"
                        />
                        <button 
                            onClick={() => {
                                const user = users.find(u => u.username.toLowerCase() === searchTerm.toLowerCase());
                                if (user) analyzeMatrix(user.id);
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-amber-500 text-black rounded-lg hover:scale-105 transition-all shadow-lg shadow-amber-500/20"
                        >
                            <Target size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Analysis Area */}
            <div className="w-full">
                {!selectedUser ? (
                    <div className="glass-card p-32 border-dashed border-white/5 bg-[#0a0f1d]/50 flex flex-col items-center justify-center text-center gap-8 group">
                        <div className="w-24 h-24 rounded-3xl bg-amber-500/5 flex items-center justify-center text-gray-800 border border-white/5 group-hover:border-amber-500/20 transition-all duration-700">
                            <Network size={48} className="text-gray-700 group-hover:text-amber-500 transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-white font-black uppercase text-xl tracking-tighter italic">Protocol Depth Audit Entry</h4>
                            <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.3em] max-w-sm">Enter a specific <span className="text-amber-500">Node Identifier</span> above to initialize high-fidelity 20-level recursive analysis.</p>
                        </div>
                    </div>
                ) : matrixLoading ? (
                        <div className="glass-card p-20 border-white/5 bg-white/[0.01] flex flex-col items-center justify-center gap-4">
                            <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
                            <p className="text-amber-500/70 text-[10px] font-black uppercase tracking-widest italic">Mapping Hierarchy Tiers...</p>
                        </div>
                    ) : matrixData ? (
                        <div className="space-y-8 animate-in slide-in-from-right-4 duration-700">
                            {/* Matrix Header Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="glass-card p-6 border-white/5 bg-amber-500/[0.02]">
                                    <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest mb-1.5 leading-none">Total Network Reach</p>
                                    <div className="flex items-end gap-2">
                                        <h3 className="text-3xl font-black text-white italic">{matrixData.matrix.reduce((s,m) => s + m.count, 0)}</h3>
                                        <p className="text-[10px] text-amber-500 font-black uppercase mb-1.5 tracking-tighter italic">Active Nodes</p>
                                    </div>
                                </div>
                                <div className="glass-card p-6 border-white/5 bg-blue-500/[0.02]">
                                    <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest mb-1.5 leading-none">Max Depth Achieved</p>
                                    <div className="flex items-end gap-2">
                                        <h3 className="text-3xl font-black text-white italic">L{matrixData.matrix.length}</h3>
                                        <p className="text-[10px] text-blue-500 font-black uppercase mb-1.5 tracking-tighter italic">Hierarchy Levels</p>
                                    </div>
                                </div>
                                <div className="glass-card p-6 border-white/5 bg-emerald-500/[0.02]">
                                    <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest mb-1.5 leading-none">Captured Liquidity</p>
                                    <div className="flex items-end gap-2">
                                        <h3 className="text-3xl font-black text-white italic">${matrixData.matrix.reduce((s,m) => s + m.investmentTotal, 0).toLocaleString()}</h3>
                                        <p className="text-[10px] text-emerald-500 font-black uppercase mb-1.5 tracking-tighter italic">Volume USD</p>
                                    </div>
                                </div>
                            </div>

                            {/* Level Drilldown */}
                            <div className="glass-card border-white/5 bg-white/[0.01]">
                                <div className="p-5 border-b border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Layers className="text-amber-500 w-4 h-4" />
                                        <h4 className="text-white font-black uppercase text-xs italic tracking-widest">Level-Wise Protocol Breakdown: {matrixData.username}</h4>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-white/[0.02] border-b border-white/5">
                                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Level</th>
                                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Team Size</th>
                                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Activation Rate</th>
                                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Level Capital</th>
                                                <th className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-700">Sample Members</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/[0.03]">
                                            {matrixData.matrix.map((row) => (
                                                <tr key={row.level} className="hover:bg-white/[0.01] transition-colors">
                                                    <td className="p-5">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-black text-[10px] text-amber-500 italic">
                                                                {row.level}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-5">
                                                        <p className="text-white font-black italic text-lg leading-none truncate">{row.count}</p>
                                                        <p className="text-[8px] text-gray-700 font-bold uppercase tracking-widest mt-1">Total Users</p>
                                                    </td>
                                                    <td className="p-5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden max-w-[100px]">
                                                                <div 
                                                                    className="h-full bg-emerald-500 rounded-full border-r border-white/20"
                                                                    style={{ width: `${(row.activatedCount / row.count) * 100}%` }}
                                                                ></div>
                                                            </div>
                                                            <span className="text-[10px] text-emerald-500 font-black italic">{((row.activatedCount / row.count) * 100).toFixed(0)}%</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-5 font-black text-amber-500 italic">
                                                        ${row.investmentTotal.toLocaleString()}
                                                    </td>
                                                    <td className="p-5">
                                                        <div className="flex flex-wrap gap-1">
                                                            {row.members.map((m, mi) => (
                                                                <span key={mi} className="px-2 py-0.5 bg-white/5 rounded text-[8px] text-gray-500 font-bold uppercase hover:text-white transition-colors lowercase tracking-tighter">@{m}</span>
                                                            ))}
                                                            {row.count > 10 && <span className="text-[8px] text-gray-700 font-black uppercase tracking-tighter">+{row.count - 10} more</span>}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
    );
};

export default AdminMatrixNetwork;
