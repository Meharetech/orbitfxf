import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const Approach = () => {
  return (
    <section id="approach" className="section-container relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-orbit-gradient opacity-5 blur-[120px] -z-10"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-8 md:mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">Our <span className="text-gradient">Approach</span></h2>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-50px" }}
        className="glass-card p-6 md:p-10 lg:p-14 relative overflow-hidden group"
      >
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <p className="text-base md:text-xl lg:text-2xl font-medium text-gray-300 leading-relaxed mb-6 md:mb-10">
            "We Prioritize Emotional-free, Data-driven Decision-making Through Intelligent Trading Tools And Analysis. Our Aim Is To Deliver Low-risk, High-return Opportunities For Clients Through Strategic Partnerships And A User-friendly Platform."
          </p>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary flex items-center gap-2 text-sm md:text-base px-6 py-2.5 cursor-pointer"
          >
            Start Intelligent Trading <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
          </motion.button>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 p-4 md:p-6 text-white/5 opacity-0 md:group-hover:opacity-100 transition-opacity">
          <div className="text-4xl md:text-6xl font-black">AI</div>
        </div>
        <div className="absolute bottom-5 left-5 w-20 h-20 md:w-32 md:h-32 border-2 border-electric-blue/20 rounded-full animate-ping opacity-10"></div>
      </motion.div>
    </section>
  );
};

export default Approach;
