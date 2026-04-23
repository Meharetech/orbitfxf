import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, ArrowLeft, Mail, Phone, ShieldCheck, HelpCircle, Network, Loader2, Eye, EyeOff } from 'lucide-react';
import authService from '../services/authService';

const Register = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    sponsorId: searchParams.get('code') || '',
    sponsorName: '', 
    name: '',
    mobile: '',
    email: '',
    username: '',
    position: searchParams.get('place') || '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState('');

  // Auto-fill from URL params if they change
  useEffect(() => {
    const code = searchParams.get('code');
    const place = searchParams.get('place');
    if (code || place) {
      setFormData(prev => ({
        ...prev,
        sponsorId: code || prev.sponsorId,
        position: place || prev.position
      }));
    }
  }, [searchParams]);

  // Fetch sponsor name when ID changes
  useEffect(() => {
    const fetchSponsorName = async () => {
      if (formData.sponsorId.length >= 4) { // Only fetch if length is reasonable
        try {
          const data = await authService.getSponsorByCode(formData.sponsorId);
          setFormData(prev => ({ ...prev, sponsorName: data.fullName }));
        } catch (err) {
          setFormData(prev => ({ ...prev, sponsorName: 'Invalid Sponsor' }));
        }
      } else {
        setFormData(prev => ({ ...prev, sponsorName: '' }));
      }
    };

    const timeoutId = setTimeout(fetchSponsorName, 500); // Debounce
    return () => clearTimeout(timeoutId);
  }, [formData.sponsorId]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
        return setError('Passwords do not match');
    }

    setIsLoading(true);
    try {
        const payload = {
            fullName: formData.name,
            email: formData.email,
            phone: formData.mobile,
            username: formData.username,
            password: formData.password,
            sponsorRef: formData.sponsorId,
            place: formData.position
        };
        const result = await authService.register(payload);
        console.log('Registration success:', result);
        navigate('/user/dashboard');
    } catch (err) {
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
        setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center pt-28 md:pt-32 pb-12 px-4 md:px-8 relative overflow-hidden font-sans">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-electric-blue/20 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-crypto-violet/20 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
      </div>

      <div className="w-full max-w-7xl glass-card border-white/10 shadow-2xl overflow-hidden flex flex-col lg:flex-row relative z-10 p-0 md:p-0">
        
        {/* Left Side - Visual/Branding (Hidden on mobile) */}
        <div className="hidden lg:flex w-[40%] xl:w-[35%] bg-gradient-to-br from-dark-bg via-[#0a0f1d] to-[#120a1f] relative flex-col p-12 border-r border-white/5 overflow-hidden group">
          <div className="absolute inset-0 bg-orbit-gradient opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-700"></div>
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
               <Link to="/" className="inline-block hover:scale-105 transition-transform w-max">
                 <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shadow-lg shadow-electric-blue/10 overflow-hidden">
                       <img src="/logo1.jpg" alt="OrbitFX Logo" className="w-full h-full object-cover" />
                     </div>
                    <div className="flex flex-col">
                      <span className="text-2xl font-black tracking-tighter leading-none text-white">ORBIT<span className="text-electric-blue">FX</span></span>
                    </div>
                 </div>
              </Link>
              <h2 className="text-4xl lg:text-5xl font-black text-white mt-16 leading-tight">
                Start Your <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-crypto-violet">Journey.</span>
              </h2>
              <p className="text-gray-400 mt-6 text-lg font-medium leading-relaxed">
                Join thousands of traders leveraging our cutting edge AI infrastructure.
              </p>
            </div>

            <div className="space-y-6 mt-12">
              <div className="flex items-center gap-4 group/feature">
                <div className="w-12 h-12 rounded-xl bg-electric-blue/10 flex items-center justify-center border border-white/5 group-hover/feature:border-electric-blue/30 transition-colors">
                  <ShieldCheck className="w-6 h-6 text-electric-blue" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Secure & Reliable</h4>
                  <p className="text-gray-500 text-sm">Military-grade encryption.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group/feature">
                <div className="w-12 h-12 rounded-xl bg-crypto-violet/10 flex items-center justify-center border border-white/5 group-hover/feature:border-crypto-violet/30 transition-colors">
                  <Network className="w-6 h-6 text-crypto-violet" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Global Network</h4>
                  <p className="text-gray-500 text-sm">20-level deep referral program.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-[60%] xl:w-[65%] p-8 md:p-12 lg:p-16 relative bg-dark-bg/50 backdrop-blur-sm lg:bg-transparent overflow-y-auto max-h-[90vh] custom-scroll">
          
          {/* Mobile Only Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link to="/" className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shadow-lg shadow-electric-blue/20 overflow-hidden">
                  <img src="/logo1.jpg" alt="OrbitFX Logo" className="w-full h-full object-cover" />
                </div>
                <div className="text-2xl font-black tracking-tighter leading-none text-white">ORBIT<span className="text-electric-blue">FX</span></div>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4 border-b border-white/10 pb-6">
              <div>
                <Link to="/" className="text-gray-400 hover:text-white flex items-center gap-2 text-sm font-semibold transition-colors mb-2 inline-flex">
                  <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">Register</h1>
                <p className="text-gray-400 font-medium mt-2">Create your account to get started</p>
              </div>
              <div className="sm:text-right">
                <span className="text-xs text-gray-500 block mb-1">Already have an account?</span>
                <Link to="/login" className="text-electric-blue text-sm font-bold hover:text-crypto-violet transition-colors">Sign In Here</Link>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 mb-6 animate-shake">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sponsor Id */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Sponsor ID</label>
                  <div className={`relative flex items-center bg-[#0d1323] border ${isFocused === 'sponsorId' ? 'border-electric-blue shadow-[0_0_15px_rgba(0,198,255,0.15)] bg-[#10172a]' : 'border-white/5'} rounded-xl transition-all duration-300 overflow-hidden group`}>
                    <div className={`pl-4 pr-3 ${isFocused === 'sponsorId' ? 'text-electric-blue' : 'text-gray-500 group-hover:text-gray-400'} transition-colors`}>
                      <User className="w-4 h-4" />
                    </div>
                    <input 
                      type="text" 
                      name="sponsorId"
                      value={formData.sponsorId}
                      onChange={handleChange}
                      onFocus={() => setIsFocused('sponsorId')}
                      onBlur={() => setIsFocused('')}
                      placeholder="Enter Sponsor ID" 
                      required
                      className="w-full bg-transparent py-3.5 pr-4 text-white placeholder:text-gray-600 focus:outline-none font-medium text-sm"
                    />
                  </div>
                </div>

                {/* Sponsor Name */}
                <div className={`space-y-2 transition-all duration-500 ${formData.sponsorName ? 'opacity-100' : 'opacity-60'}`}>
                  <label className={`text-xs font-bold uppercase tracking-wider ml-1 ${formData.sponsorName === 'Invalid Sponsor' ? 'text-red-400' : (formData.sponsorName ? 'text-green-400' : 'text-gray-500')}`}>
                    Sponsor Name
                  </label>
                  <div className={`relative flex items-center bg-black/40 border rounded-xl overflow-hidden cursor-not-allowed transition-colors ${formData.sponsorName === 'Invalid Sponsor' ? 'border-red-500/30' : (formData.sponsorName ? 'border-green-500/30' : 'border-white/5')}`}>
                    <div className={`pl-4 pr-3 ${formData.sponsorName === 'Invalid Sponsor' ? 'text-red-400' : (formData.sponsorName ? 'text-green-400' : 'text-gray-600')}`}>
                      {formData.sponsorName === 'Invalid Sponsor' ? <ShieldCheck className="w-4 h-4" /> : (formData.sponsorName ? <ShieldCheck className="w-4 h-4" /> : <HelpCircle className="w-4 h-4" />)}
                    </div>
                    <input 
                      type="text" 
                      name="sponsorName"
                      value={formData.sponsorName}
                      readOnly
                      placeholder="Auto-filled" 
                      className={`w-full bg-transparent py-3.5 pr-4 focus:outline-none font-bold text-sm cursor-not-allowed ${formData.sponsorName === 'Invalid Sponsor' ? 'text-red-400' : 'text-white'}`}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Your Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Your Name</label>
                  <div className={`relative flex items-center bg-[#0d1323] border ${isFocused === 'name' ? 'border-crypto-violet shadow-[0_0_15px_rgba(138,43,226,0.15)] bg-[#10172a]' : 'border-white/5'} rounded-xl transition-all duration-300 overflow-hidden group`}>
                    <div className={`pl-4 pr-3 ${isFocused === 'name' ? 'text-crypto-violet' : 'text-gray-500 group-hover:text-gray-400'} transition-colors`}>
                      <User className="w-4 h-4" />
                    </div>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setIsFocused('name')}
                      onBlur={() => setIsFocused('')}
                      placeholder="Full Name" 
                      required
                      className="w-full bg-transparent py-3.5 pr-4 text-white placeholder:text-gray-600 focus:outline-none font-medium text-sm"
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Mobile Number</label>
                  <div className={`relative flex items-center bg-[#0d1323] border ${isFocused === 'mobile' ? 'border-crypto-violet shadow-[0_0_15px_rgba(138,43,226,0.15)] bg-[#10172a]' : 'border-white/5'} rounded-xl transition-all duration-300 overflow-hidden group`}>
                    <div className={`pl-4 pr-3 ${isFocused === 'mobile' ? 'text-crypto-violet' : 'text-gray-500 group-hover:text-gray-400'} transition-colors`}>
                      <Phone className="w-4 h-4" />
                    </div>
                    <input 
                      type="tel" 
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      onFocus={() => setIsFocused('mobile')}
                      onBlur={() => setIsFocused('')}
                      placeholder="e.g. +1 234 567 890" 
                      required
                      className="w-full bg-transparent py-3.5 pr-4 text-white placeholder:text-gray-600 focus:outline-none font-medium text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Username */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Username</label>
                  <div className={`relative flex items-center bg-[#0d1323] border ${isFocused === 'username' ? 'border-electric-blue shadow-[0_0_15px_rgba(0,198,255,0.15)] bg-[#10172a]' : 'border-white/5'} rounded-xl transition-all duration-300 overflow-hidden group`}>
                    <div className={`pl-4 pr-3 ${isFocused === 'username' ? 'text-electric-blue' : 'text-gray-500 group-hover:text-gray-400'} transition-colors`}>
                      <User className="w-4 h-4" />
                    </div>
                    <input 
                      type="text" 
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      onFocus={() => setIsFocused('username')}
                      onBlur={() => setIsFocused('')}
                      placeholder="Choose a username" 
                      required
                      className="w-full bg-transparent py-3.5 pr-4 text-white placeholder:text-gray-600 focus:outline-none font-medium text-sm"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                  <div className={`relative flex items-center bg-[#0d1323] border ${isFocused === 'email' ? 'border-electric-blue shadow-[0_0_15px_rgba(0,198,255,0.15)] bg-[#10172a]' : 'border-white/5'} rounded-xl transition-all duration-300 overflow-hidden group`}>
                    <div className={`pl-4 pr-3 ${isFocused === 'email' ? 'text-electric-blue' : 'text-gray-500 group-hover:text-gray-400'} transition-colors`}>
                      <Mail className="w-4 h-4" />
                    </div>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setIsFocused('email')}
                      onBlur={() => setIsFocused('')}
                      placeholder="you@example.com" 
                      required
                      className="w-full bg-transparent py-3.5 pr-4 text-white placeholder:text-gray-600 focus:outline-none font-medium text-sm"
                    />
                  </div>
                </div>

                {/* Tree Position */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Tree Position</label>
                  <div className={`relative flex items-center bg-[#0d1323] border ${isFocused === 'position' ? 'border-electric-blue shadow-[0_0_15px_rgba(0,198,255,0.15)] bg-[#10172a]' : 'border-white/5'} rounded-xl transition-all duration-300 overflow-hidden group`}>
                    <div className={`pl-4 pr-3 ${isFocused === 'position' ? 'text-electric-blue' : 'text-gray-500 group-hover:text-gray-400'} transition-colors`}>
                      <Network className="w-4 h-4" />
                    </div>
                    <select 
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      onFocus={() => setIsFocused('position')}
                      onBlur={() => setIsFocused('')}
                      required
                      className="w-full bg-transparent py-3.5 pr-4 text-white placeholder:text-gray-600 focus:outline-none font-medium text-sm appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="bg-[#10172a] text-gray-500">Select Position</option>
                      <option value="L" className="bg-[#10172a] text-white py-2">Left Side</option>
                      <option value="R" className="bg-[#10172a] text-white py-2">Right Side</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Password */}
                 <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Password</label>
                  <div className={`relative flex items-center bg-[#0d1323] border ${isFocused === 'password' ? 'border-crypto-violet shadow-[0_0_15px_rgba(138,43,226,0.15)] bg-[#10172a]' : 'border-white/5'} rounded-xl transition-all duration-300 overflow-hidden group`}>
                    <div className={`pl-4 pr-3 ${isFocused === 'password' ? 'text-crypto-violet' : 'text-gray-500 group-hover:text-gray-400'} transition-colors`}>
                      <Lock className="w-4 h-4" />
                    </div>
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setIsFocused('password')}
                      onBlur={() => setIsFocused('')}
                      placeholder="Create password" 
                      required
                      className="w-full bg-transparent py-3.5 pr-10 text-white placeholder:text-gray-600 focus:outline-none font-medium text-sm tracking-wide"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 text-gray-500 hover:text-white transition-colors p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Confirm Password</label>
                  <div className={`relative flex items-center bg-[#0d1323] border ${isFocused === 'confirm' ? 'border-crypto-violet shadow-[0_0_15px_rgba(138,43,226,0.15)] bg-[#10172a]' : 'border-white/5'} rounded-xl transition-all duration-300 overflow-hidden group`}>
                    <div className={`pl-4 pr-3 ${isFocused === 'confirm' ? 'text-crypto-violet' : 'text-gray-500 group-hover:text-gray-400'} transition-colors`}>
                      <Lock className="w-4 h-4" />
                    </div>
                    <input 
                      type={showConfirmPassword ? 'text' : 'password'} 
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onFocus={() => setIsFocused('confirm')}
                      onBlur={() => setIsFocused('')}
                      placeholder="Verify password" 
                      required
                      className="w-full bg-transparent py-3.5 pr-10 text-white placeholder:text-gray-600 focus:outline-none font-medium text-sm tracking-wide"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 text-gray-500 hover:text-white transition-colors p-1"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-4 pb-2 border-t border-white/5 mt-8">
                <div className="flex items-start gap-3">
                  <div className="flex items-center h-5 mt-0.5">
                    <input 
                      id="terms" 
                      name="agreeTerms" 
                      type="checkbox" 
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      required
                      className="w-4 h-4 rounded border-white/10 bg-[#0d1323] text-electric-blue focus:ring-electric-blue focus:ring-offset-dark-bg cursor-pointer" 
                    />
                  </div>
                  <label htmlFor="terms" className="text-sm text-gray-400 leading-relaxed font-medium">
                    I agree to the OrbitFX <Link to="/terms" className="text-electric-blue hover:text-white transition-colors underline decoration-electric-blue/30 underline-offset-4">Terms and Conditions</Link>, Privacy Policy, and Risk Disclaimer.
                  </label>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full relative py-4 bg-orbit-gradient text-white rounded-xl font-bold text-lg overflow-hidden group/btn shadow-[0_10px_30px_-10px_rgba(0,198,255,0.4)] hover:shadow-[0_10px_40px_-10px_rgba(0,198,255,0.6)] transition-all transform hover:-translate-y-1 active:translate-y-0 ${isLoading ? 'opacity-70 cursor-wait' : ''}`}
              >
                <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover/btn:translate-x-[50%] transition-transform duration-1000"></div>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>Processing... <Loader2 className="w-5 h-5 animate-spin" /></>
                  ) : (
                    <>Create Account <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" /></>
                  )}
                </span>
              </button>

            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
