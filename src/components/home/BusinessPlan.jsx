import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, DollarSign, Users, TrendingUp, Award, Plane, Layers, Briefcase, ShieldCheck, Database } from 'lucide-react';

const BusinessPlan = () => {
  const incomeTypes = [
    { icon: TrendingUp, title: 'Trading Profit Income' },
    { icon: DollarSign, title: 'Trading Profit Level Income' },
  ];

  const profitLevels = [
    { level: 'Level 1', income: '30%' },
    { level: 'Level 2', income: '15%' },
    { level: 'Level 3', income: '12%' },
    { level: 'Level 4', income: '10%' },
    { level: 'Level 5', income: '8%' },
    { level: 'Level 6', income: '7%' },
    { level: 'Level 7', income: '5%' },
    { level: 'Level 8', income: '5%' },
    { level: 'Level 9', income: '5%' },
    { level: 'Level 10', income: '3%' },
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
               "Admin Charges 10% Deduction On Every Withdrawal"
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
