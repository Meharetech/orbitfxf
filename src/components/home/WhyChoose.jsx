import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, BrainCircuit, Users, Award, Headphones, Binary, Search, Heart } from 'lucide-react';

const reasons = [
  { icon: Award, title: '15+ Years Experience', color: 'text-electric-blue' },
  { icon: BrainCircuit, title: 'AI-driven Insights', color: 'text-crypto-violet' },
  { icon: ShieldCheck, title: 'Trusted MT5 Platform', color: 'text-neon-blue' },
  { icon: Binary, title: 'Multi-Asset Access', color: 'text-deep-purple' },
  { icon: Search, title: 'Flexible Conditions', color: 'text-electric-blue' },
  { icon: Heart, title: 'Risk-Free Demo', color: 'text-crypto-violet' },
  { icon: Headphones, title: '24/5 Multilingual Support', color: 'text-neon-blue' },
  { icon: Users, title: 'Client-Centric Philosophy', color: 'text-deep-purple' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 }
  }
};

const WhyChoose = () => {
  return (
    <section className="bg-white/5 py-10 md:py-16">
      <div className="max-w-full mx-auto px-6 md:px-16 lg:px-24">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">Why Choose <span className="text-gradient">Orbit FX</span></h2>
          <p className="text-gray-400 text-xs md:text-sm max-w-xl mx-auto px-4">
            Experience the difference of trading with a partner that prioritizes your success through technology and transparency.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5"
        >
          {reasons.map((reason, index) => (
            <motion.div key={index} variants={itemVariants} className="flex flex-col md:flex-row items-center text-center md:text-left gap-2 md:gap-4 p-3 md:p-5 glass-card hover:bg-white/10 transition-all cursor-default">
              <reason.icon className={`w-5 h-5 md:w-7 md:h-7 ${reason.color} shrink-0`} />
              <span className="font-semibold text-[10px] md:text-sm leading-snug">{reason.title}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChoose;
