import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Globe2, Wallet, LineChart, Zap, Smartphone, BarChart3, Clock } from 'lucide-react';

const features = [
  { icon: Cpu, title: 'AI-driven Trading', desc: 'Predictive analytics and automated risk management.' },
  { icon: Globe2, title: 'Multi-asset Platform', desc: 'Forex, CFDs, Crypto, Metals, and more.' },
  { icon: Wallet, title: 'Low Entry Point', desc: 'Start trading with as little as $150.' },
  { icon: LineChart, title: '1:200 Leverage', desc: 'Maximize your trading potential safely.' },
  { icon: Zap, title: 'Tight Spreads', desc: 'Industry-low spreads starting from 0.1 pips.' },
  { icon: Smartphone, title: 'Full MT5 Access', desc: 'Same professional tools on mobile and desktop.' },
  { icon: BarChart3, title: 'Demo & Live', desc: 'Practice risk-free or go live with one click.' },
  { icon: Clock, title: '24/5 Support', desc: 'Multilingual assistance whenever you need it.' },
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const Features = () => {
  return (
    <section id="features" className="section-container">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center max-w-4xl mx-auto mb-10 md:mb-14"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">Key <span className="text-gradient">Features</span></h2>
        <p className="text-gray-400 text-sm md:text-base">
          Powering your trading journey with state-of-the-art tools and exceptional conditions.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5"
      >
        {features.map((feature, index) => (
          <motion.div key={index} variants={itemVariants} className="glass-card p-4 md:p-6 group hover:-translate-y-1.5 transition-all duration-300">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-white/5 flex items-center justify-center mb-3 md:mb-5 group-hover:bg-orbit-gradient transition-all">
              <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-electric-blue group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-base md:text-lg font-bold mb-1.5 md:mb-2">{feature.title}</h3>
            <p className="text-gray-500 text-[10px] md:text-sm leading-relaxed">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Features;
