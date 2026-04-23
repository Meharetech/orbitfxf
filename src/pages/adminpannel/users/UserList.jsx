import React, { useState } from 'react';
import { 
  Users, Search, Filter, ArrowUpRight, 
  ShieldCheck, ShieldAlert, MoreVertical, 
  Mail, Phone, Calendar, UserPlus, FileText 
} from 'lucide-react';

const UserList = () => {
    // Mock user data for administrative oversight
    const [users, setUsers] = useState([
        { id: 1, name: 'Rahul Sharma', username: 'rahul_ofx', email: 'rahul@example.com', phone: '+91 9876543210', status: 'VIP', joined: '2026-03-20', referralCode: 'OFX8888', sponsors: 'OFXSystem' },
        { id: 2, name: 'Ananya Gupta', username: 'ananya_fx', email: 'ananya@example.com', phone: '+91 9123456789', status: 'Inactive', joined: '2026-03-21', referralCode: 'OFX1234', sponsors: 'OFX8888' },
        { id: 3, name: 'Vikram Singh', username: 'viking_trader', email: 'vikram@example.com', phone: '+1 234 567 8901', status: 'VIP', joined: '2026-03-15', referralCode: 'OFX9999', sponsors: 'OFXSystem' },
        { id: 4, name: 'Sara Khan', username: 'sara_global', email: 'sara@example.com', phone: '+44 7890 123456', status: 'VIP', joined: '2026-03-18', referralCode: 'OFX5555', sponsors: 'OFX1234' },
    ]);
    
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
                <div>
                     <h2 className="text-3xl font-black text-white tracking-tight">VIP Registrations</h2>
                     <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Manage, verify, and monitor all network participants.</p>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                            type="text" 
                            placeholder="Find ID / Email / Code..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500/50 w-full md:w-72 transition-all"
                        />
                    </div>
                    <button className="p-3 bg-white/5 border border-white/10 rounded-2xl text-amber-500 hover:bg-amber-500/10 transition-all">
                        <Filter className="w-5 h-5" />
                    </button>
                    <button className="hidden lg:flex items-center gap-3 px-6 py-3 bg-amber-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20">
                        <UserPlus className="w-4 h-4" /> Global Add
                    </button>
                </div>
            </div>

            <div className="glass-card overflow-hidden border-white/5 bg-white/[0.01]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] font-black text-gray-600 uppercase tracking-widest">
                                <th className="p-6">User Database ID</th>
                                <th className="p-6">Contact Channels</th>
                                <th className="p-6">Network Hierachy</th>
                                <th className="p-6">Status Marker</th>
                                <th className="p-6 text-right">SysControl</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-white/[0.01] transition-colors group">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/10 to-red-600/10 flex items-center justify-center border border-white/5 relative group-hover:border-amber-500/30 transition-all">
                                                <span className="text-white font-black text-sm">{user.name.charAt(0)}</span>
                                                <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-[#070b14] ${user.status === 'VIP' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'}`}></div>
                                            </div>
                                            <div className="leading-tight">
                                                <p className="text-white font-black text-sm">{user.name}</p>
                                                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">ID: @{user.username}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="space-y-1.5 font-bold uppercase tracking-tight">
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Mail className="w-3.5 h-3.5" /> {user.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] text-amber-500/80">
                                                <Phone className="w-3.5 h-3.5" /> {user.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="space-y-1.5 font-bold uppercase tracking-tight">
                                            <div className="flex items-center gap-2 text-xs text-white/70">
                                                <Users className="w-3.5 h-3.5" /> Spon: {user.sponsors}
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] font-mono text-gray-600">
                                                <ShieldCheck className="w-3.5 h-3.5" /> Code: {user.referralCode}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex flex-col gap-2">
                                            <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] w-max ${user.status === 'VIP' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                                                {user.status} System Link
                                            </span>
                                            <div className="flex items-center gap-2 text-[10px] text-gray-700 font-black">
                                                <Calendar className="w-3.5 h-3.5 opacity-40" /> {user.joined}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2.5 text-gray-500 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all shadow-xl group/btn overflow-hidden relative">
                                                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                            </button>
                                            <button className="p-2.5 text-gray-500 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0a0f1d] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-gray-700">
                 <div className="flex items-center gap-6">
                     <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Show Record Index: <span className="text-white">100 Row</span></span>
                     <div className="w-px h-3 bg-white/10"></div>
                     <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Total Results: <span className="text-amber-500">482 Nodes</span></span>
                 </div>
                 <div className="flex items-center gap-2">
                     <button className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase text-gray-500 hover:text-white transition-all">Previous Block</button>
                     <div className="px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-black">1</div>
                     <button className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase text-gray-500 hover:text-white transition-all">Next Block</button>
                 </div>
            </div>
        </div>
    );
};

export default UserList;
