import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, DollarSign, Users, TrendingUp, Award, Plane, Layers, Briefcase, ShieldCheck, Database } from 'lucide-react';

const BusinessPlan = () => {
  const incomeTypes = [
    { icon: TrendingUp, title: 'Trading Profit Income' },
    { icon: Users, title: 'Referral Income' },
    { icon: Award, title: 'Direct Referral Reward' },
    { icon: Layers, title: 'Pair Matching Reward' },
    { icon: Briefcase, title: 'Pair Matching Monthly Reward' },
    { icon: Plane, title: 'Tour & Travel Reward' },
    { icon: DollarSign, title: 'Trading Profit Level Income' },
  ];

  const referralLevels = [
    { level: 'Level 1', income: '10%' },
    { level: 'Level 2', income: '5%' },
    { level: 'Level 3', income: '5%' },
    { level: 'Level 4', income: '3%' },
    { level: 'Level 5', income: '2%' },
    { level: 'Level 6 To Level 10', income: '1%' },
    { level: 'Level 11 To Level 20', income: '0.5%' },
  ];

  const monthlyRewards = [
    { rank: 'STAR', pair: '10', reward: '$ 30', oneTime: '$ 100', duration: '1 YEAR' },
    { rank: 'SILVER', pair: '30', reward: '$ 60', oneTime: '$ 300', duration: '1 YEAR' },
    { rank: 'GOLD', pair: '100', reward: '$ 200', oneTime: '$ 1,000', duration: '1 YEAR' },
    { rank: 'PEARL', pair: '250', reward: '$ 300', oneTime: '$ 2,500', duration: '1 YEAR' },
    { rank: 'PLATINUM', pair: '500', reward: '$ 600', oneTime: '$ 5,000', duration: '1 YEAR' },
    { rank: 'EMERALD', pair: '1,200', reward: '$ 1,600', oneTime: '$ 10,000', duration: '1 YEAR' },
    { rank: 'DIAMOND', pair: '3,000', reward: '$ 3,000', oneTime: '$ 25,000', duration: '1 YEAR' },
    { rank: 'ROYAL DIAMOND', pair: '7,000', reward: '$ 6,000', oneTime: '$ 50,000', duration: '1 YEAR' },
    { rank: 'KOHINOOR', pair: '15,000', reward: '$ 10,000', oneTime: '$ 1,00,000', duration: '1 YEAR' },
    { rank: 'CROWN', pair: '30,000', reward: '$ 20,000', oneTime: '$ 2,00,000', duration: '1 YEAR' },
    { rank: 'AMBASSADOR', pair: '70,000', reward: '$ 40,000', oneTime: '$ 5,00,000', duration: '1 YEAR' },
    { rank: 'CROWN AMBASSADOR', pair: '1,50,000', reward: '$ 1,00,000', oneTime: '$ 10,00,000', duration: '1 YEAR' },
  ];

  const profitLevels = [
    { level: 'Level 1', income: '30%' },
    { level: 'Level 2', income: '15%' },
    { level: 'Level 3', income: '12%' },
    { level: 'Level 4', income: '10%' },
    { level: 'Level 5', income: '8%' },
    { level: 'Level 6', income: '5%' },
    { level: 'Level 7', income: '4%' },
    { level: 'Level 8 to Level 10', income: '2%' },
    { level: 'Level 11 To Level 20', income: '1%' },
  ];

  return (
    <div className="space-y-6 md:space-y-10 pb-10">
      {/* 1. Our Business Plan Hero - Compact */}
      <section className="relative h-[100px] md:h-[140px] flex items-center justify-center overflow-hidden rounded-b-2xl mx-1 md:mx-4 border-b border-white/5 bg-[#0a0f1d]">
        <div className="absolute inset-0 z-0">
          <img 
            src="/chip_trading_candlesticks_1773558124321.png" 
            alt="Business Plan Background" 
            className="w-full h-full object-cover opacity-10 scale-105 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/60 to-dark-bg"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h2 className="text-2xl md:text-4xl font-black text-gradient uppercase tracking-tighter leading-none">
            Business <span className="text-electric-blue">Protocol</span>
          </h2>
          <p className="text-[9px] text-gray-500 font-black tracking-[0.3em] uppercase mt-2 opacity-60">
            Systematic Growth Infrastructure
          </p>
        </div>
      </section>

      {/* 2. Registration Section - Compact */}
      <motion.section 
        initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} className="px-2 md:px-6"
      >
        <div className="glass-card overflow-hidden grid grid-cols-1 md:grid-cols-12 border-white/5 bg-white/[0.01]">
          <div className="md:col-span-7 p-6 md:p-10 space-y-6">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-electric-blue/10 flex items-center justify-center text-electric-blue shadow-lg shadow-electric-blue/5">
                 <ShieldCheck size={18} />
               </div>
               <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">Node <span className="text-electric-blue text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-crypto-violet">Activation</span></h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
                  <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Protocol Entry</p>
                  <p className="text-2xl font-black text-white">FREE <span className="text-emerald-500 text-xs italic">Registration</span></p>
               </div>
               <div className="p-4 bg-electric-blue/5 border border-electric-blue/10 rounded-xl space-y-1">
                  <p className="text-[9px] text-electric-blue font-black uppercase tracking-widest">Maintenance Bond</p>
                  <p className="text-2xl font-black text-white">$150 <span className="text-electric-blue text-xs italic">Package</span></p>
               </div>
            </div>

            <div className="bg-white/[0.03] border border-white/5 p-3 rounded-lg text-center">
              <span className="text-xs md:text-sm font-black text-white/40 uppercase tracking-[0.4em]">Lifecycle: 1 Year Duration</span>
            </div>
          </div>
          <div className="hidden md:block md:col-span-5 relative group overflow-hidden bg-[#060912]">
            <img 
              src="/hero_ai_head_1773558093460.png" 
              alt="Trading AI" 
              className="w-full h-full object-cover opacity-40 grayscale group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1d] to-transparent"></div>
          </div>
        </div>
      </motion.section>

      {/* 3. Income Types - High Density Icons */}
      <motion.section 
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} className="px-2 md:px-6"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {incomeTypes.map((item, index) => (
            <div key={index} className="glass-card p-3 flex flex-col items-center text-center gap-3 border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all group">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-electric-blue group-hover:scale-110 transition-all">
                <item.icon size={16} />
              </div>
              <span className="text-[9px] font-black uppercase tracking-tighter leading-tight text-gray-400 group-hover:text-white transition-colors">{item.title}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 4. Trading Profit Income Detail - Compact Card */}
      <motion.section 
        initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }} className="px-2 md:px-6"
      >
        <div className="glass-card p-6 md:p-10 border-white/5 bg-[#0a0f1d]/50 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-48 h-48 bg-electric-blue/5 rounded-full blur-[80px]"></div>
          <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="space-y-4 text-center md:text-left">
               <div className="space-y-1">
                 <h4 className="text-xs font-black text-electric-blue uppercase tracking-widest">Quantum Yield</h4>
                 <h3 className="text-2xl md:text-4xl font-black text-white uppercase italic">Trading <span className="text-electric-blue">Income</span></h3>
               </div>
               <div className="flex items-center gap-4 justify-center md:justify-start">
                  <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
                      <p className="text-2xl md:text-4xl font-black text-white italic tracking-tighter">0.5% ~ 3%</p>
                      <p className="text-[8px] text-gray-600 font-black uppercase tracking-widest text-center mt-0.5">Daily Release</p>
                  </div>
                  <div className="text-left space-y-0.5">
                      <p className="text-[10px] text-white/60 font-black uppercase italic tracking-widest">Operational Window</p>
                      <p className="text-[9px] text-amber-500 font-black uppercase">Monday to Friday Only</p>
                  </div>
               </div>
            </div>
            <div className="w-32 h-32 md:w-48 md:h-48 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
               <img src="/robot_dog_future_1773558140316.png" alt="AI Agent" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* 5. Referral Income Table - Optimized */}
      <motion.section 
        initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} className="px-2 md:px-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="overflow-hidden glass-card border-white/5 bg-white/[0.01]">
            <div className="p-3 border-b border-white/5 bg-white/[0.02] flex items-center gap-2">
                <Users size={12} className="text-electric-blue" />
                <h4 className="text-[9px] font-black text-white uppercase tracking-widest italic">Multi-Level Propagation Net</h4>
            </div>
            <table className="w-full text-left text-[11px]">
              <thead className="bg-[#0a0f1d] text-gray-600 border-b border-white/5">
                <tr>
                  <th className="px-4 py-2 font-black uppercase tracking-widest">Node Depth</th>
                  <th className="px-4 py-2 font-black uppercase tracking-widest text-right">Commission</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {referralLevels.map((row, index) => (
                  <tr key={index} className="hover:bg-white/[0.01] transition-colors">
                    <td className="px-4 py-2 font-bold text-gray-300">{row.level}</td>
                    <td className="px-4 py-2 text-electric-blue font-black text-right">{row.income}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-3 bg-electric-blue/[0.02] text-center border-t border-white/5">
                 <span className="text-[9px] font-black text-electric-blue/60 uppercase tracking-[0.2em] italic">35% Automated Distribution Algorithm</span>
            </div>
          </div>
          
          <div className="glass-card p-6 md:p-8 flex flex-col justify-center gap-5 border-white/5 bg-[#0a0f1d]/30">
             <div className="space-y-2">
                <h4 className="text-xl md:text-2xl font-black text-electric-blue uppercase italic leading-none">Exponential Growth</h4>
                <p className="text-xs text-gray-500 font-medium leading-relaxed italic">
                  Leverage the computational power of the network. Earn deep passive commissions across a 20-level hierarchy.
                </p>
             </div>
             <div className="grid grid-cols-2 gap-3">
                 <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                    <p className="text-2xl font-black text-white italic">20</p>
                    <p className="text-[8px] text-gray-700 font-black uppercase tracking-widest">Total Levels</p>
                 </div>
                 <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                    <p className="text-2xl font-black text-white italic">10%</p>
                    <p className="text-[8px] text-gray-700 font-black uppercase tracking-widest">Base L1 Yield</p>
                 </div>
             </div>
          </div>
        </div>
      </motion.section>

      {/* 6. Direct Referral Reward - High Density */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }} className="px-2 md:px-6"
      >
        <div className="glass-card bg-[#0a0f1d] border-electric-blue/20 p-6 md:p-8 relative overflow-hidden group">
          <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
             <div className="flex items-center gap-6">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-electric-blue to-crypto-violet rounded-full flex flex-col items-center justify-center shadow-2xl border-2 border-white/10 group-hover:scale-105 transition-all">
                   <span className="text-black text-[10px] md:text-xs font-black uppercase leading-none">REWARD</span>
                   <span className="text-black text-xl md:text-3xl font-black leading-none mt-1">$10</span>
                   <span className="text-black text-[8px] font-black uppercase opacity-60">MONTHLY</span>
                </div>
                <div className="space-y-1">
                   <h3 className="text-lg md:text-2xl font-black uppercase tracking-tight italic">Direct Referral <span className="text-electric-blue">Reward</span></h3>
                   <p className="text-xs md:text-xl font-black uppercase text-white/40 leading-none italic">15 MONTHS DURATION ONLY</p>
                </div>
             </div>
             
             <div className="max-w-[300px] p-4 bg-white/[0.02] border border-white/5 rounded-xl text-center md:text-left">
                <p className="text-[10px] text-gray-400 italic font-bold leading-relaxed">
                  "Activate 1st Two Direct (L/R) Nodes within 15 days of entry sequence."
                </p>
             </div>
          </div>
        </div>
      </motion.section>

      {/* 7. Pair Matching Monthly Reward Table - High Density */}
      <motion.section 
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} className="px-2 md:px-6 pb-6"
      >
        <div className="text-center mb-6">
          <h3 className="text-xl md:text-3xl font-black text-white uppercase italic tracking-tighter mb-1">Pair Matching <span className="text-electric-blue">Monthly Reward</span></h3>
          <div className="w-16 h-0.5 bg-electric-blue mx-auto opacity-40"></div>
        </div>
        
        <div className="overflow-hidden glass-card border-white/5 bg-[#0a0f1d]/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[10px] md:text-[11px]">
              <thead className="bg-[#0a0f1d] text-gray-600 border-b border-white/5">
                <tr>
                  <th className="px-4 py-3 font-black uppercase tracking-widest">Protocol Rank</th>
                  <th className="px-4 py-3 font-black uppercase tracking-widest text-center">Nodes Required</th>
                  <th className="px-4 py-3 font-black uppercase tracking-widest text-center text-electric-blue">Monthly Payout</th>
                  <th className="px-4 py-3 font-black uppercase tracking-widest text-center text-amber-500">One-Time Prize</th>
                  <th className="px-4 py-3 font-black uppercase tracking-widest text-right">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {monthlyRewards.map((row, index) => (
                  <tr key={index} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="px-4 py-2 font-black text-gray-300 italic group-hover:text-electric-blue transition-colors uppercase">{row.rank}</td>
                    <td className="px-4 py-2 font-bold text-gray-500 text-center">{row.pair} Pairs</td>
                    <td className="px-4 py-2 font-black text-white text-center italic">{row.reward}</td>
                    <td className="px-4 py-2 font-black text-amber-500 text-center italic">{row.oneTime}</td>
                    <td className="px-4 py-2 text-gray-700 text-right font-black uppercase">{row.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>

      {/* 8. Trading Profit Level Income - Tighter Grid */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} className="px-2 md:px-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="glass-card p-8 bg-[#0a0f1d] border-white/5 flex flex-col justify-center items-center text-center gap-5">
              <div className="space-y-1">
                 <h4 className="text-2xl font-black text-white leading-none italic">25% DISTRIBUTION</h4>
                 <p className="text-[9px] text-electric-blue font-black uppercase tracking-widest italic">Quantum Profit Allocation</p>
              </div>
              <div className="w-40 h-40 opacity-20 grayscale brightness-125 hover:opacity-40 transition-opacity">
                <img src="/media__1773557553670.png" alt="Allocation" className="w-full h-full object-contain" />
              </div>
          </div>

          <div className="overflow-hidden glass-card border-white/5 bg-white/[0.01]">
            <table className="w-full text-left text-[11px]">
              <thead className="bg-[#0a0f1d] text-gray-600 border-b border-white/5">
                <tr>
                  <th className="px-4 py-2 font-black uppercase tracking-widest">Level depth</th>
                  <th className="px-4 py-2 font-black uppercase tracking-widest text-right">Payout %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {profitLevels.map((row, index) => (
                  <tr key={index} className="hover:bg-white/[0.01] transition-colors">
                    <td className="px-4 py-2 font-bold text-gray-300 uppercase">{row.level}</td>
                    <td className="px-4 py-2 text-electric-blue font-black text-right">{row.income}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>
      {/* 9. Terms & Conditions - High Density Audit */}
      <motion.section 
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} className="px-2 md:px-6 mt-8"
      >
        <div className="glass-card p-6 md:p-8 bg-[#0a0f1d] border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl"></div>
          <div className="flex items-center gap-3 mb-6">
             <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shadow-lg shadow-emerald-500/5">
               <Database size={18} />
             </div>
             <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight italic">Operational <span className="text-emerald-500 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Constraints</span></h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {[
               "BROKER Account Accepted Only By Company Referral Link",
               "Accept Only Branded Broker Like – XM Vantage Etc.",
               "Your All Income Active After Two Direct Sponsor Except Trading Profit",
               "Minimum Withdrawal $10",
               "Admin Charges 10% Deduction On Every Withdrawal",
               "During This Monthly And 1 Time Reward Must Be Active Bot For Continued Your Release For Income."
             ].map((term, i) => (
               <div key={i} className="flex items-start gap-3 p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.04] transition-all group">
                  <div className="mt-0.5 text-emerald-500 group-hover:scale-125 transition-transform font-black">&gt;</div>
                  <p className="text-[10px] md:text-[11px] font-bold text-gray-400 leading-tight uppercase group-hover:text-white transition-colors">{term}</p>
               </div>
             ))}
          </div>
          
          <div className="mt-8 pt-4 border-t border-white/5 text-center">
             <span className="text-[8px] text-gray-800 font-black uppercase tracking-[0.5em] italic">SYSTEM CORE AUDIT: OrbitFX EXECUTIVE PROTOCOL</span>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default BusinessPlan;
