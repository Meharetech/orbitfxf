import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, DollarSign, TrendingUp, Users, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PlanTeaser = () => {
  const highlights = [
    { icon: TrendingUp, text: '0.5% to 3% Daily ROI' },
    { icon: Users, text: '10 Levels Referral Income' },
    { icon: DollarSign, text: 'Massive Matching Bonus' },
    { icon: CheckCircle2, text: 'Monthly Rewards up to $50K' },
  ];

  return (
    <section className="section-container relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -z-10 w-[600px] h-[600px] bg-orbit-gradient/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="glass-card p-8 md:p-16 border-white/5 bg-white/[0.02] relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                The Most Lucrative <br />
                <span className="text-gradient">Compensation Plan</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-md">
                Our ecosystem is designed for maximum distribution. Start investing today and build a legacy of passive income.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5"
                >
                  <div className="w-8 h-8 rounded-lg bg-electric-blue/10 flex items-center justify-center text-electric-blue">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-gray-200">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="pt-4"
            >
              <Link to="/plan" className="btn-primary inline-flex items-center gap-2 group px-8 py-3">
                View Full Business Plan <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-card bg-electric-blue p-8 md:p-12 transform rotate-2 hover:rotate-0 transition-transform duration-700 shadow-2xl shadow-electric-blue/20">
              <div className="text-black space-y-4">
                <div className="text-sm font-black uppercase tracking-[0.2em] opacity-60 text-center">Portfolio Entry</div>
                <div className="text-6xl md:text-8xl font-black text-center tracking-tighter">$50</div>
                <div className="h-px bg-black/10 w-full my-6"></div>
                <ul className="space-y-3">
                  {['Global Network Access', 'AI Trading Bot License', '24/7 Profit Generation', 'Flexible Withdrawal'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 font-bold">
                      <CheckCircle2 className="w-5 h-5 mb-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Decorative background elements */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full bg-crypto-violet rounded-2xl transform -rotate-2 opacity-20 blur-sm"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PlanTeaser;
