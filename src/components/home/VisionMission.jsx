import React from 'react';
import { motion } from 'framer-motion';
import { Target, Compass } from 'lucide-react';
import robotDog from '/robot_dog_future_1773558140316.png';

const VisionMission = () => {
  return (
    <section className="bg-white/5 py-10 md:py-16 relative overflow-hidden">
      <div className="max-w-full mx-auto px-6 md:px-16 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-14 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-6 md:space-y-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-electric-blue/20 flex items-center justify-center text-electric-blue">
                <Compass className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold">Our Vision</h2>
            </div>
            <p className="text-gray-400 text-xs md:text-base leading-relaxed italic border-l-2 border-electric-blue/30 pl-4">
              "To Empower Traders Worldwide By Providing A Secure, Intelligent, And User-friendly Trading Platform That Leverages Cutting-edge Technology And Industry Expertise To Support Sustainable, Low-risk, And Emotionally Disciplined Trading."
            </p>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-crypto-violet/20 flex items-center justify-center text-crypto-violet">
                <Target className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold">Our Mission</h2>
            </div>
            <p className="text-gray-400 text-xs md:text-base leading-relaxed italic border-l-2 border-crypto-violet/30 pl-4">
              "To Become A Globally Trusted Trading Partner Known For Innovation, Transparency, And A Client-first Approach — bridging The Gap Between Professional Trading Tools And Individual Investors."
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          <div className="absolute inset-0 bg-orbit-gradient opacity-10 blur-3xl rounded-full scale-75 animate-pulse-slow"></div>
          <img 
            src={robotDog} 
            alt="Visionary Technology" 
            className="relative z-10 w-full max-w-md mx-auto rounded-2xl grayscale hover:grayscale-0 transition-all duration-700"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default VisionMission;
