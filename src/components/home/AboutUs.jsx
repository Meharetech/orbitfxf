import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <section id="about" className="section-container overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-14 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative group order-2 lg:order-1"
        >
          <div className="absolute -inset-4 bg-electric-blue/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <img 
            src="/trading_chip_orbitfx_1773557780172.png" 
            alt="Infrastructure" 
            className="rounded-2xl md:rounded-3xl shadow-2xl relative z-10 w-full"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-5 md:gap-6 text-center lg:text-left items-center lg:items-start order-1 lg:order-2"
        >
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
              Next-Generation <br/>
              <span className="text-gradient">Infrastructure</span>
            </h2>
            <div className="w-16 h-1 bg-electric-blue rounded-full mx-auto lg:mx-0"></div>
          </div>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Orbit FX is a multi-asset online trading platform offering access to global markets, including Forex, Commodities, Indices, and Crypto currencies.
          </p>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Built on modern technology with support for Meta Trader 5 (MT5), Orbit FX positions itself as a next-generation platform driven by artificial intelligence and seamless trading infrastructure.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-4">
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-card p-4 md:p-5 border-white/5 hover:border-electric-blue/20 transition-all text-left"
            >
              <h4 className="text-electric-blue font-bold mb-1">MT5 Support</h4>
              <p className="text-[10px] md:text-xs text-gray-500">Industry leading platform</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-card p-4 md:p-5 border-white/5 hover:border-crypto-violet/20 transition-all text-left"
            >
              <h4 className="text-crypto-violet font-bold mb-1">AI Driven</h4>
              <p className="text-[10px] md:text-xs text-gray-500">Intelligent insights</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
