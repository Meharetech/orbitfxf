import React, { useState, useEffect } from 'react';
import api from '../../../api/apiConfig';
import { 
  Users, Search, ShieldCheck, ShieldAlert, 
  BadgeCheck, Calendar, Zap, ChevronRight,
  Loader2, UserX
} from 'lucide-react';

const NetworkTeam = ({ type, title }) => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all | active | inactive

  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await api.get(`/network/${type}`);
        setTeam(res.data);
      } catch (err) {
        console.error('Error fetching team:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, [type]);

  const filtered = team.filter(m => {
    const matchesSearch =
      m.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.referralCode?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'active') return matchesSearch && m.isActivated;
    if (filter === 'inactive') return matchesSearch && !m.isActivated;
    return matchesSearch;
  });

  const activeCount = team.filter(m => m.isActivated).length;
  const inactiveCount = team.length - activeCount;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            {title}
          </h2>
          <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">
            Network Protocol — Member Authorization Status
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name, username or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-electric-blue transition-all w-full md:w-72"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card p-5 border-white/5 bg-white/[0.01] space-y-1">
          <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest">Total Members</p>
          <p className="text-3xl font-black text-white italic">{team.length}</p>
        </div>
        <div className="glass-card p-5 border-green-500/10 bg-green-500/[0.02] space-y-1">
          <p className="text-[10px] text-green-600 font-black uppercase tracking-widest">Active Nodes</p>
          <p className="text-3xl font-black text-green-500 italic">{activeCount}</p>
        </div>
        <div className="glass-card p-5 border-red-500/10 bg-red-500/[0.02] space-y-1">
          <p className="text-[10px] text-red-600 font-black uppercase tracking-widest">Inactive Nodes</p>
          <p className="text-3xl font-black text-red-500 italic">{inactiveCount}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {['all', 'active', 'inactive'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              filter === f
                ? f === 'active' ? 'bg-green-500/20 text-green-500 border border-green-500/30'
                  : f === 'inactive' ? 'bg-red-500/20 text-red-500 border border-red-500/30'
                  : 'bg-white/10 text-white border border-white/20'
                : 'text-gray-600 hover:text-gray-400 border border-transparent hover:border-white/10'
            }`}
          >
            {f === 'all' ? `All (${team.length})` : f === 'active' ? `Active (${activeCount})` : `Inactive (${inactiveCount})`}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden border-white/5">
        {loading ? (
          <div className="py-24 flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-electric-blue animate-spin" />
            <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">Syncing network data...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-24 flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center">
              <UserX className="w-8 h-8 text-gray-700" />
            </div>
            <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">No members found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/5">
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">#</th>
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Member</th>
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Referral ID</th>
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500 text-center">Node Status</th>
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Expiry</th>
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Joined</th>
                  {(type === 'left' || type === 'right') && (
                    <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-500 text-center">Position</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {filtered.map((member, idx) => (
                  <tr key={member._id} className="hover:bg-white/[0.02] transition-colors group">
                    
                    {/* # */}
                    <td className="p-4 text-gray-700 text-xs font-black">{idx + 1}</td>

                    {/* Member */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative shrink-0">
                          <div className={`w-10 h-10 rounded-xl p-[1.5px] ${member.isActivated ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : 'bg-white/10'}`}>
                            <div className="w-full h-full rounded-[9px] bg-[#080912] flex items-center justify-center font-black text-sm text-white">
                              {member.fullName?.charAt(0).toUpperCase()}
                            </div>
                          </div>
                          {member.isActivated && (
                            <BadgeCheck size={12} className="absolute -bottom-1 -right-1 text-blue-500 fill-blue-500/20 bg-[#080912] rounded-full" />
                          )}
                        </div>
                        <div>
                          <p className="text-white font-black text-sm">{member.fullName}</p>
                          <p className="text-gray-600 text-[10px] font-bold">@{member.username}</p>
                        </div>
                      </div>
                    </td>

                    {/* Referral Code */}
                    <td className="p-4">
                      <span className="font-mono text-xs text-electric-blue bg-electric-blue/5 border border-electric-blue/10 px-2 py-1 rounded-lg">
                        {member.referralCode}
                      </span>
                    </td>

                    {/* Node Status */}
                    <td className="p-4">
                      <div className="flex justify-center">
                        {member.isActivated ? (
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-500/10 text-green-500 border border-green-500/20 text-[10px] font-black uppercase tracking-wider">
                            <ShieldCheck className="w-3 h-3" /> VIP
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 text-[10px] font-black uppercase tracking-wider">
                            <ShieldAlert className="w-3 h-3" /> Not Active
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Expiry */}
                    <td className="p-4">
                      {member.isActivated && member.activationExpiry ? (
                        <div className="flex items-center gap-1.5">
                          <Calendar size={11} className="text-amber-500" />
                          <span className="text-[10px] text-amber-500 font-black">
                            {new Date(member.activationExpiry).toLocaleDateString()}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-gray-700 font-black">—</span>
                      )}
                    </td>

                    {/* Joined */}
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <Zap size={11} className="text-gray-600" />
                        <span className="text-[10px] text-gray-500 font-bold">
                          {new Date(member.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </td>

                    {/* Position */}
                    {(type === 'left' || type === 'right') && (
                      <td className="p-4 text-center">
                        <span className={`w-8 h-8 rounded-lg inline-flex items-center justify-center text-xs font-black border ${
                          member.position === 'L' 
                            ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' 
                            : 'bg-purple-500/10 text-purple-500 border-purple-500/20'
                        }`}>
                          {member.position || '—'}
                        </span>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkTeam;
