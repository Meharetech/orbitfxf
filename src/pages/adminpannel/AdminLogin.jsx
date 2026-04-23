import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, User, ArrowRight, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    securityCode: '' // Extra security layer for admin
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simulate Admin Login (You can add real API later)
    setTimeout(() => {
        if(formData.username === 'admin' && formData.password === 'admin123') {
            localStorage.setItem('adminToken', 'mock-admin-token');
            navigate('/admin/dashboard');
        } else {
            setError('Invalid administrative credentials access denied.');
            setIsLoading(false);
        }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#070b14] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Admin Specific Deep Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
      
      {/* Background Glows */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-amber-500/10 blur-[150px] rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-red-600/10 blur-[150px] rounded-full animate-pulse-slow" style={{ animationDelay: '3s' }}></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-card border-white/5 bg-white/[0.02] overflow-hidden shadow-2xl relative">
          {/* Top Security Header */}
          <div className="bg-gradient-to-r from-amber-600 to-red-600 h-1.5 w-full"></div>
          
          <div className="p-10">
            <div className="flex flex-col items-center mb-10 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center shadow-lg shadow-amber-500/20 mb-6">
                    <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-black text-white tracking-tight">System Administration</h1>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-2">Restricted Access • Authorized Personnel Only</p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-center gap-3 text-red-500 text-xs font-bold mb-8"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Admin Username</label>
                <div className={`relative flex items-center bg-black/40 border ${isFocused === 'username' ? 'border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'border-white/5'} rounded-xl transition-all overflow-hidden`}>
                   <div className="pl-4 pr-3 text-white/40">
                      <User className="w-4 h-4" />
                   </div>
                   <input 
                     type="text"
                     name="username"
                     value={formData.username}
                     onChange={handleChange}
                     onFocus={() => setIsFocused('username')}
                     onBlur={() => setIsFocused('')}
                     placeholder="Administrative ID"
                     required
                     className="w-full bg-transparent py-4 pr-4 text-white placeholder:text-gray-700 focus:outline-none font-medium text-sm"
                   />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Secure Password</label>
                <div className={`relative flex items-center bg-black/40 border ${isFocused === 'password' ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-white/5'} rounded-xl transition-all overflow-hidden`}>
                   <div className="pl-4 pr-3 text-white/40">
                      <Lock className="w-4 h-4" />
                   </div>
                   <input 
                     type={showPassword ? 'text' : 'password'}
                     name="password"
                     value={formData.password}
                     onChange={handleChange}
                     onFocus={() => setIsFocused('password')}
                     onBlur={() => setIsFocused('')}
                     placeholder="Enter password"
                     required
                     className="w-full bg-transparent py-4 pr-12 text-white placeholder:text-gray-700 focus:outline-none font-medium text-sm"
                   />
                   <button
                     type="button"
                     onClick={() => setShowPassword(!showPassword)}
                     className="absolute right-4 text-white/40 hover:text-white transition-colors"
                   >
                     {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                   </button>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-amber-600 to-red-600 text-white rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-amber-600/20 hover:shadow-amber-600/40 transform transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>Authenticating... <Loader2 className="w-4 h-4 animate-spin" /></>
                  ) : (
                    <>Verify Identity <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="text-center mt-8">
            <Link to="/" className="text-gray-600 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                Return to Public Website
            </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
