import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, DollarSign, ArrowRight, ShieldCheck, History } from 'lucide-react';

const Withdrawal = () => {
  const [amount, setAmount] = useState('');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-white">Withdraw Funds</h1>
        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
          <DollarSign className="w-4 h-4 text-electric-blue" />
          <span className="text-sm font-bold">Balance: $12,450.00</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Withdrawal Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8 border-white/5"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Select Wallet</label>
              <select className="w-full bg-[#0d1323] border border-white/5 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-electric-blue transition-all appearance-none cursor-pointer">
                <option>TRC20 Wallet (...4a5k)</option>
                <option>ERC20 Wallet (...9b2z)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Withdrawal Amount ($)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-[#0d1323] border border-white/5 rounded-xl py-4 pl-12 pr-4 text-white font-bold text-xl focus:outline-none focus:border-electric-blue transition-all"
                />
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
              <div className="flex justify-between px-1 mt-2">
                <p className="text-[10px] text-gray-500 font-bold uppercase">Min: $10.00</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase">Fee: 2%</p>
              </div>
            </div>

            <div className="p-4 bg-electric-blue/5 border border-electric-blue/20 rounded-xl space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400 font-medium">Processing Fee (2%)</span>
                <span className="text-white font-bold">${(amount * 0.02).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-white/5 pt-2">
                <span className="text-gray-400 font-medium">You will receive</span>
                <span className="text-electric-blue font-black text-lg">${(amount * 0.98).toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full py-4 bg-orbit-gradient rounded-xl font-black text-lg shadow-lg shadow-electric-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              Confirm Withdrawal <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Info & Security */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="glass-card p-6 border-white/5 bg-gradient-to-br from-white/5 to-transparent">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-400" />
              Security Check
            </h3>
            <p className="text-sm text-gray-400 font-medium leading-relaxed">
              Withdrawals are processed within 2-4 hours. For your security, withdrawals exceeding $5,000 may require manual review by our risk management team.
            </p>
          </div>

          <div className="glass-card p-6 border-white/5">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <History className="w-5 h-5 text-gray-400" />
              Withdrawal Limits
            </h3>
            <div className="space-y-4">
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="bg-electric-blue h-full w-[65%]" />
              </div>
              <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
                <span className="text-gray-500">Daily limit used: $6.5k</span>
                <span className="text-white">$10.0k max</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Withdrawal;
