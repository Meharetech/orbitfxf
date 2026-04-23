import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import heroAi from '/hero_ai_head_1773558093460.png';


const Hero = () => {
  return (
    <section id="home" className="relative pt-20 pb-10 md:pt-32 md:pb-20 overflow-hidden">
      {/* Background Blobs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 right-0 -z-10 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-electric-blue/10 rounded-full blur-[100px] -mr-32 -mt-32"
      ></motion.div>
      <motion.div 
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-0 left-0 -z-10 w-[150px] h-[150px] md:w-[300px] md:h-[300px] bg-crypto-violet/10 rounded-full blur-[80px] -ml-16 -mb-16"
      ></motion.div>

      <div className="max-w-full mx-auto px-6 md:px-16 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col gap-5 md:gap-6 text-center lg:text-left items-center lg:items-start"
        >
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-electric-blue/10 border border-electric-blue/20 rounded-full text-electric-blue text-xs md:text-sm font-medium mb-3 md:mb-4"
            >
              <Zap className="w-3 h-3 md:w-4 md:h-4 fill-electric-blue" />
              The Future of Financial Freedom
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-3 md:mb-4 tracking-tight"
            >
              Build Your <br />
              <span className="text-gradient">Empire With Orbitfx</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-base md:text-xl text-gray-400 font-medium leading-relaxed max-w-lg mb-5 md:mb-6"
            >
              Join the world's most powerful AI-driven network. Earn passive income, build your global organization, and secure your financial future today.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/register" className="btn-primary flex items-center gap-2 group text-sm md:text-lg px-6 md:px-10 py-3 md:py-4 cursor-pointer">
              Join The Mission <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/plan" className="px-6 md:px-10 py-3 md:py-4 rounded-lg border border-white/10 hover:bg-white/5 transition-all text-sm md:text-lg font-semibold cursor-pointer">
              Explore Plan
            </Link>
          </motion.div>


          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-3 gap-6 md:gap-10 pt-8 border-t border-white/5"
          >
            {[
              { val: '20K+', label: 'Global Members', icon: Globe },
              { val: '$1.5M+', label: 'Total Payouts', icon: ShieldCheck },
              { val: '24/7', label: 'AI Support', icon: Zap }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center lg:items-start gap-1">
                <div className="flex items-center gap-2 text-electric-blue mb-1">
                  <stat.icon className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-lg md:text-2xl font-black text-white">{stat.val}</span>
                </div>
                <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-bold">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-radial from-electric-blue/20 to-transparent blur-3xl rounded-full scale-90 animate-pulse-slow"></div>
          
          {/* Floating Cards */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -left-10 z-20 glass-card p-4 md:p-6 border-electric-blue/30 bg-electric-blue/5 hidden md:block"
          >
            <div className="text-electric-blue text-xs font-bold uppercase tracking-widest mb-1">Latest Payout</div>
            <div className="text-xl font-black text-white">$1,240.00</div>
            <div className="text-[10px] text-gray-400">Paid to Rahul G.</div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 -right-10 z-20 glass-card p-4 md:p-6 border-crypto-violet/30 bg-crypto-violet/5 hidden md:block"
          >
            <div className="text-crypto-violet text-xs font-bold uppercase tracking-widest mb-1">New Member</div>
            <div className="text-xl font-black text-white">+5,200</div>
            <div className="text-[10px] text-gray-400">Total in 24h</div>
          </motion.div>

          <motion.img 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            src={heroAi} 
            alt="OrbitFX AI" 
            className="relative z-10 w-full max-w-lg mx-auto drop-shadow-[0_20px_60px_rgba(0,198,255,0.4)]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

