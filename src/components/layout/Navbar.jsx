import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Landmark, ChevronDown, User, Globe, ShieldCheck } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';

  const navLinks = [
    { name: 'Home', path: '/', isLink: true },
    { name: 'About', path: '/#about', isLink: false },
    { name: 'Features', path: '/#features', isLink: false },
    { name: 'Plan', path: '/plan', isLink: true },
    { name: 'Terms', path: '/terms', isLink: true },
    { name: 'Approach', path: '/#approach', isLink: false },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-4 md:px-8 lg:px-12 py-4 ${
        isScrolled ? 'top-2' : 'top-0'
      }`}
    >
      <div 
        className={`max-w-[1440px] mx-auto transition-all duration-500 rounded-2xl border ${
          isScrolled 
            ? 'bg-dark-bg/60 backdrop-blur-2xl border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] py-2 px-6' 
            : 'bg-transparent border-transparent py-4 px-4'
        } flex justify-between items-center relative overflow-hidden group`}
      >
        {/* Animated Background Glow for Scrolled State */}
        {isScrolled && (
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-electric-blue/5 via-transparent to-crypto-violet/5 opacity-50"></div>
        )}

        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 group/logo relative z-10">
          <div className="relative">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shadow-lg shadow-electric-blue/10 group-hover/logo:scale-110 transition-transform duration-500 overflow-hidden">
              <img src="/logo1.jpg" alt="OrbitFX Logo" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -inset-1 bg-electric-blue/10 blur-lg rounded-full opacity-0 group-hover/logo:opacity-100 transition-opacity"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-black tracking-tighter leading-none">
              ORBIT<span className="text-electric-blue">FX</span>
            </span>
            <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-gray-500 group-hover/logo:text-electric-blue transition-colors">
              Intelligent Trading
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-2 relative z-10">
          {navLinks.map((link) => (
            link.isLink ? (
              <Link 
                key={link.name} 
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 relative group/link ${
                  location.pathname === link.path ? 'text-white bg-white/5' : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.name}
                <div className={`absolute bottom-0 left-4 right-4 h-0.5 bg-electric-blue scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 ${location.pathname === link.path ? 'scale-x-100' : ''}`}></div>
              </Link>
            ) : (
              <a 
                key={link.name} 
                href={isHomePage ? link.path : link.path}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-400 hover:text-white transition-all duration-300 relative group/link"
              >
                {link.name}
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-electric-blue scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300"></div>
              </a>
            )
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center gap-4 relative z-10">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold text-gray-400">
            <Globe className="w-3 h-3 text-electric-blue" />
            EN <ChevronDown className="w-3 h-3" />
          </div>
          
          <Link to="/login" className="px-4 py-2 font-bold text-gray-300 hover:text-white transition-colors relative z-10">
             Login
          </Link>
          <Link to="/register" className="group relative flex items-center gap-2 px-6 py-2 bg-white text-black font-bold rounded-xl overflow-hidden active:scale-95 transition-all z-10">
            <div className="absolute inset-0 bg-orbit-gradient opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <User className="w-4 h-4 relative z-10 group-hover:text-white" />
            <span className="relative z-10 group-hover:text-white">Register</span>
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className="lg:hidden relative z-10 w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Modern Full-Screen Mobile Overlay */}
      <div className={`fixed inset-0 z-[90] lg:hidden transition-all duration-700 ease-in-out ${
        isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-dark-bg/95 backdrop-blur-3xl"></div>
        
        {/* Background Decorative patterns */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-electric-blue/10 rounded-full blur-[100px] -mr-32 -mt-32 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-crypto-violet/10 rounded-full blur-[100px] -ml-32 -mb-32"></div>

        <div className="relative h-full flex flex-col items-center justify-center p-8 gap-8">
          <div className="flex flex-col gap-4 w-full max-w-xs transition-all duration-500 transform scale-90" style={{ transform: isMenuOpen ? 'scale(1)' : 'scale(0.9)', opacity: isMenuOpen ? 1 : 0 }}>
            {navLinks.map((link, index) => (
              link.isLink ? (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-black text-center hover:text-electric-blue transition-colors relative group"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {link.name}
                </Link>
              ) : (
                <a 
                  key={link.name} 
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-black text-center hover:text-electric-blue transition-colors"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {link.name}
                </a>
              )
            ))}
          </div>

          <div className="w-full max-w-xs flex flex-col gap-4 pt-8 border-t border-white/10" style={{ transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)', opacity: isMenuOpen ? 1 : 0, transitionDelay: '300ms' }}>
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full py-4 text-center rounded-lg border border-white/20 hover:bg-white/5 transition-all font-bold text-lg">
              Login
            </Link>
            <Link to="/register" onClick={() => setIsMenuOpen(false)} className="btn-primary py-4 text-lg text-center">
              Register Now
            </Link>
            <div className="flex items-center justify-center gap-4 text-gray-500 text-sm italic">
               <ShieldCheck className="w-4 h-4 text-electric-blue" />
               Secure & AI Powered
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
