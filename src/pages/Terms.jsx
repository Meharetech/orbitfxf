import React, { useEffect } from 'react';
import { ShieldCheck, ArrowRight, Info, AlertCircle, CheckCircle2 } from 'lucide-react';

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const conditions = [
    "BROKER Account Accepted Only By Company Referral Link",
    "Accept Only Branded Broker Like – XM Vantage Etc.",
    "Your All Income Active After Two Direct Sponsor Except Trading Profit",
    "Minimum Withdrawal $10",
    "Admin Charges 10% Deduction On Every Withdrawal",
    "During This Monthly And 1 Time Reward Must Be Active Bot For Continued Your Release For Income."
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-electric-blue/10 rounded-full blur-[120px] -mr-40 -mt-40"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-crypto-violet/10 rounded-full blur-[100px] -ml-20 -mb-20"></div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16 animate-in slide-in-from-bottom duration-700">
          <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter">
            Terms & <span className="text-gradient">Conditions</span>
          </h1>
          <div className="w-24 h-1 bg-orbit-gradient mx-auto rounded-full mb-8"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg italic">
            "Transparency and security are our top priorities. Please review our platform guidelines carefully."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Visual/Context */}
          <div className="relative group animate-in slide-in-from-left duration-1000">
            <div className="absolute -inset-4 bg-electric-blue/20 blur-3xl rounded-full opacity-30 group-hover:opacity-60 transition-opacity"></div>
            <div className="glass-card p-1 overflow-hidden rounded-[2rem] border-white/10 shadow-2xl">
              <img 
                src="/hero_robot_orbitfx_1773557763982.png" 
                alt="OrbitFX Security" 
                className="w-full h-auto rounded-[1.8rem] grayscale group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center gap-4 p-4 glass-card border-white/20 backdrop-blur-3xl">
                  <div className="w-12 h-12 bg-orbit-gradient rounded-xl flex items-center justify-center shrink-0">
                    <ShieldCheck className="text-white w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white uppercase text-sm">Security Guarded</h4>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">www.orbitfx.org</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Conditions List */}
          <div className="space-y-4 md:space-y-6 animate-in slide-in-from-right duration-1000">
            {conditions.map((text, index) => (
              <div 
                key={index} 
                className="glass-card p-5 md:p-6 border-white/5 hover:border-electric-blue/30 hover:bg-white/5 transition-all duration-300 flex items-start gap-4 group"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-electric-blue/10 flex items-center justify-center shrink-0 mt-1 group-hover:bg-orbit-gradient transition-all duration-500">
                  <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-electric-blue group-hover:text-white" />
                </div>
                <p className="text-sm md:text-lg font-medium text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                  {text}
                </p>
              </div>
            ))}

            <div className="pt-6">
              <div className="flex items-center gap-3 p-4 bg-crypto-violet/10 border border-crypto-violet/20 rounded-2xl">
                <Info className="w-6 h-6 text-crypto-violet shrink-0" />
                <p className="text-xs md:text-sm text-gray-400">
                  By using the OrbitFX platform, you acknowledge that you have read and understood these terms. Trading involves risk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-24 h-24 border border-white/5 rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 border border-white/5 rounded-full animate-bounce-slow" style={{ animationDuration: '6s' }}></div>
    </div>
  );
};

export default Terms;
