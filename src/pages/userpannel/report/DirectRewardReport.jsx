import React, { useState, useEffect } from 'react';
import api from '../../../api/apiConfig';
import {
    DollarSign, Calendar, CheckCircle2, Clock,
    ShieldAlert, BadgeCheck, Loader2, Users,
    TrendingUp, Gift, ArrowRight, XCircle
} from 'lucide-react';

const DirectRewardReport = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const res = await api.get('/reports/direct-reward');
                setData(res.data);
            } catch (err) {
                console.error('Error fetching direct reward report:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchReport();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
                <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">Loading Reward Report...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">

            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/5">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">
                        Direct Referral <span className="text-indigo-400">Reward</span>
                    </h2>
                    <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.3em]">
                        Monthly Incentive — $10 × 15 Months Report
                    </p>
                </div>

                {data?.qualified && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-xl">
                        <BadgeCheck size={16} className="text-green-500" />
                        <span className="text-green-400 text-[10px] font-black uppercase tracking-widest">Reward Active</span>
                    </div>
                )}
            </div>

            {!data?.qualified ? (
                /* ── Not Qualified ── */
                <div className="glass-card p-16 border-white/5 bg-white/[0.01] flex flex-col items-center gap-6 text-center">
                    <div className="w-20 h-20 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center">
                        <Gift size={36} className="text-gray-700" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-black text-white uppercase tracking-tighter">Not Yet Qualified</h3>
                        <p className="text-gray-600 text-[11px] font-bold uppercase tracking-widest max-w-md leading-relaxed">
                            Activate your first <span className="text-indigo-400">Left</span> and <span className="text-indigo-400">Right</span> direct referrals within 15 days of joining to unlock the $10/month reward for 15 months.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-xl">
                        <span className="text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                            ✓ Qualify within 15 days for a $150 total incentive
                        </span>
                    </div>
                </div>
            ) : (
                <>
                    {/* ── Summary Cards ── */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="glass-card p-6 border-green-500/10 bg-green-500/[0.02] space-y-2">
                            <p className="text-[9px] text-green-500 font-black uppercase tracking-widest">Total Earned</p>
                            <p className="text-3xl font-black text-green-400 italic">${data.totalEarned}</p>
                            <p className="text-[9px] text-gray-700 font-black uppercase">{data.paidCount} payments made</p>
                        </div>
                        <div className="glass-card p-6 border-indigo-500/10 bg-indigo-500/[0.02] space-y-2">
                            <p className="text-[9px] text-indigo-400 font-black uppercase tracking-widest">Remaining</p>
                            <p className="text-3xl font-black text-white italic">${data.remaining * 10}</p>
                            <p className="text-[9px] text-gray-700 font-black uppercase">{data.remaining} months left</p>
                        </div>
                        <div className="glass-card p-6 border-amber-500/10 bg-amber-500/[0.02] space-y-2">
                            <p className="text-[9px] text-amber-400 font-black uppercase tracking-widest">Next Payout</p>
                            {data.isCompleted ? (
                                <p className="text-sm font-black text-gray-600 uppercase">Completed</p>
                            ) : (
                                <>
                                    <p className="text-lg font-black text-amber-400">{new Date(data.nextPaymentDate).toLocaleDateString()}</p>
                                    <p className="text-[9px] text-gray-700 font-black uppercase">in ~30 days</p>
                                </>
                            )}
                        </div>
                        <div className="glass-card p-6 border-white/5 bg-white/[0.01] space-y-2">
                            <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Qualified On</p>
                            <p className="text-lg font-black text-white">{new Date(data.qualifiedDate).toLocaleDateString()}</p>
                            <p className="text-[9px] text-gray-700 font-black uppercase">activation date</p>
                        </div>
                    </div>

                    {/* ── Progress Bar ── */}
                    <div className="glass-card p-6 border-white/5 bg-white/[0.01] space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest flex items-center gap-2">
                                <TrendingUp size={14} className="text-indigo-400" /> Monthly Reward Progress
                            </p>
                            <p className="text-[10px] font-black text-indigo-400 uppercase">{data.paidCount} / 15 Months Paid</p>
                        </div>
                        <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 rounded-full transition-all duration-700 relative"
                                style={{ width: `${(data.paidCount / 15) * 100}%` }}
                            >
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg shadow-cyan-500/50" />
                            </div>
                        </div>
                        <div className="flex gap-1.5">
                            {Array.from({ length: 15 }).map((_, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                    <div className={`h-2 w-full rounded-sm ${i < data.paidCount ? 'bg-green-500' : 'bg-white/5'}`} />
                                    <span className="text-[7px] font-black text-gray-700">{i + 1}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Qualifying Referrals ── */}
                    {(data.leftReferral || data.rightReferral) && (
                        <div className="glass-card p-6 border-white/5 bg-white/[0.01] space-y-4">
                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest flex items-center gap-2">
                                <Users size={14} className="text-indigo-400" /> Qualifying Direct Referrals
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { leg: 'Left Leg', member: data.leftReferral, color: 'electric-blue' },
                                    { leg: 'Right Leg', member: data.rightReferral, color: 'crypto-violet' },
                                ].map(({ leg, member, color }) => (
                                    <div key={leg} className={`flex items-center gap-4 p-5 rounded-2xl border bg-white/[0.01] ${member?.isActivated ? 'border-green-500/20 bg-green-500/[0.01]' : 'border-white/5'}`}>
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black border-2 ${member?.isActivated ? 'border-green-500 bg-green-500/10 text-white' : 'border-gray-700 bg-white/5 text-gray-700'}`}>
                                            {member ? member.fullName?.charAt(0).toUpperCase() : '?'}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <p className="text-[8px] font-black uppercase tracking-widest text-gray-600">{leg}</p>
                                                {member?.isActivated
                                                    ? <CheckCircle2 size={10} className="text-green-500" />
                                                    : <XCircle size={10} className="text-red-500" />
                                                }
                                            </div>
                                            <p className="text-white font-black text-sm">{member?.fullName || '—'}</p>
                                            <p className="text-gray-600 text-[10px] font-bold">@{member?.username} · {member?.referralCode}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className={`text-[8px] font-black uppercase ${member?.isActivated ? 'text-green-500' : 'text-red-500'}`}>
                                                {member?.isActivated ? 'Active' : 'Inactive'}
                                            </p>
                                            {member?.activationDate && (
                                                <p className="text-[8px] text-gray-700 font-bold mt-0.5">
                                                    {new Date(member.activationDate).toLocaleDateString()}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ── Payment History Table ── */}
                    <div className="glass-card overflow-hidden border-white/5">
                        <div className="p-6 border-b border-white/5 flex items-center gap-3">
                            <DollarSign size={16} className="text-indigo-400" />
                            <p className="text-[10px] text-white font-black uppercase tracking-widest">Payment History</p>
                            <span className="ml-auto px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-[9px] text-indigo-400 font-black uppercase">
                                {data.paidCount} Records
                            </span>
                        </div>

                        {data.payments.length === 0 ? (
                            <div className="py-16 text-center">
                                <p className="text-gray-700 text-[10px] font-black uppercase tracking-widest">No payments yet — first $10 will be credited today!</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-white/[0.02] border-b border-white/5">
                                            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-600">#</th>
                                            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-600">Month</th>
                                            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-600">Amount</th>
                                            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-600">Credited On</th>
                                            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-600 text-center">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/[0.03]">
                                        {data.payments.map((payment, idx) => (
                                            <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                                                <td className="p-4 text-gray-700 text-[10px] font-black">{idx + 1}</td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[9px] font-black text-indigo-400">
                                                            {payment.month}
                                                        </div>
                                                        <span className="text-white font-black text-xs">Month {payment.month}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className="text-green-400 font-black text-sm">+$10.00</span>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-1.5">
                                                        <Calendar size={11} className="text-gray-600" />
                                                        <span className="text-gray-400 text-[10px] font-bold">
                                                            {new Date(payment.paidAt).toLocaleDateString('en-IN', {
                                                                day: '2-digit', month: 'short', year: 'numeric'
                                                            })}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-500/10 text-green-500 border border-green-500/20 text-[9px] font-black uppercase tracking-wider">
                                                        <CheckCircle2 size={9} /> Credited
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}

                                        {/* Upcoming months (greyed out) */}
                                        {data.remaining > 0 && Array.from({ length: Math.min(data.remaining, 3) }).map((_, i) => {
                                            const futureMonth = data.paidCount + i + 1;
                                            const futureDate = data.nextPaymentDate
                                                ? new Date(new Date(data.nextPaymentDate).getTime() + i * 30 * 24 * 60 * 60 * 1000)
                                                : null;
                                            return (
                                                <tr key={`future-${i}`} className="opacity-30">
                                                    <td className="p-4 text-gray-700 text-[10px] font-black">{data.paidCount + i + 1}</td>
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[9px] font-black text-gray-600">
                                                                {futureMonth}
                                                            </div>
                                                            <span className="text-gray-600 font-black text-xs">Month {futureMonth}</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className="text-gray-600 font-black text-sm">+$10.00</span>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-1.5">
                                                            <Clock size={11} className="text-gray-700" />
                                                            <span className="text-gray-700 text-[10px] font-bold">
                                                                {futureDate ? futureDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Scheduled'}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-center">
                                                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 text-gray-600 border border-white/5 text-[9px] font-black uppercase tracking-wider">
                                                            <Clock size={9} /> Scheduled
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default DirectRewardReport;
