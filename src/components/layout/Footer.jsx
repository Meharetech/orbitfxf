import React from 'react';
import { Landmark, Mail, Phone, Globe, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card-bg border-t border-white/5 pt-12 md:pt-20 pb-8 md:pb-10">
      <div className="max-w-full mx-auto px-6 md:px-16 lg:px-24 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16">
        <div className="flex flex-col gap-4 md:gap-6 col-span-2 lg:col-span-1 border-b lg:border-none border-white/5 pb-8 lg:pb-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden border border-white/5">
              <img src="/logo1.jpg" alt="OrbitFX Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-bold">Orbit<span className="text-electric-blue">FX</span></span>
          </div>
          <p className="text-gray-400 leading-relaxed text-sm">
            Smarter Trading. Smarter Future. Your premier multi-asset trading platform powered by AI.
          </p>
          <div className="flex gap-4">
            <Twitter className="w-5 h-5 text-gray-400 hover:text-electric-blue cursor-pointer transition-colors" />
            <Linkedin className="w-5 h-5 text-gray-400 hover:text-electric-blue cursor-pointer transition-colors" />
            <Github className="w-5 h-5 text-gray-400 hover:text-electric-blue cursor-pointer transition-colors" />
          </div>
        </div>

        <div>
          <h4 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Quick Links</h4>
          <ul className="flex flex-col gap-3 md:gap-4 text-gray-400 text-sm">
            <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="/terms" className="hover:text-white transition-colors">Terms & Conditions</a></li>
            <li><a href="#approach" className="hover:text-white transition-colors">Our Approach</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Legal</h4>
          <ul className="flex flex-col gap-3 md:gap-4 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Risk Disclosure</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
          </ul>
        </div>

        <div className="col-span-2 lg:col-span-1 border-t lg:border-none border-white/5 pt-8 lg:pt-0">
          <h4 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Contact Us</h4>
          <ul className="flex flex-col gap-3 md:gap-4 text-gray-400 text-sm">
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 md:w-5 md:h-5 text-electric-blue" />
              <span>support@orbitfx.org</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 md:w-5 md:h-5 text-electric-blue" />
              <span>+1 (555) 000-0000</span>
            </li>
            <li className="flex items-center gap-3">
              <Globe className="w-4 h-4 md:w-5 md:h-5 text-electric-blue" />
              <span>www.orbitfx.org</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-full mx-auto px-6 md:px-16 lg:px-24 pt-10 border-t border-white/5 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} OrbitFX. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
