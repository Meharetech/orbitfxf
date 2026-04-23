import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/home/Hero';
import AboutUs from '../components/home/AboutUs';
import VisionMission from '../components/home/VisionMission';
import Features from '../components/home/Features';
import Approach from '../components/home/Approach';
import WhyChoose from '../components/home/WhyChoose';
import Contact from '../components/home/Contact';
import PlanTeaser from '../components/home/PlanTeaser';
import LiveStats from '../components/home/LiveStats';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="overflow-hidden">
      <Hero />
      <LiveStats />
      
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-electric-blue/5 to-transparent -z-10"></div>
        <AboutUs />
        <VisionMission />
      </div>

      <PlanTeaser />

      <Features />
      <WhyChoose />
      
      <div className="relative">
        <div className="absolute inset-0 bg-crypto-violet/5 blur-[120px] -z-10 rounded-full scale-50 translate-y-20"></div>
        <Approach />
      </div>

      <Contact />

      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-50px" }}
        className="section-container text-center pt-0 pb-16 md:pb-32"
      >
        <div className="glass-card p-8 md:p-16 bg-orbit-gradient/10 border-electric-blue/30 backdrop-blur-3xl group relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-electric-blue/20 rounded-full blur-[80px]"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 group-hover:text-electric-blue transition-colors duration-500 tracking-tight">
              Seize Your <span className="text-gradient">Financial Future</span>
            </h2>
            <p className="text-gray-400 mb-8 md:mb-12 max-w-xl mx-auto text-lg">
              Don't just watch the future unfold. Be a part of it. Join thousands of visionaries who are building their wealth with Orbit FX.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary w-full sm:w-auto text-base md:text-lg px-10 py-4 cursor-pointer"
              >
                Join Now - Free Registration
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 rounded-lg border border-white/20 hover:bg-white/5 transition-all font-bold text-base md:text-lg cursor-pointer"
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;

