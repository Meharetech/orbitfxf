import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, ArrowRight, ArrowLeft, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import authService from '../services/authService';


const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
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
    
    // Clear any stale/old session data before new login
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    try {
        const result = await authService.login(formData);
        if (result?.token) {
            // Token is already saved by authService, navigate to dashboard
            navigate('/user/dashboard');
        } else {
            setError('Login failed — no token received. Please try again.');
        }
    } catch (err) {
        setError(err.response?.data?.message || 'Invalid username or password');
    } finally {
        setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center pt-28 md:pt-32 pb-12 px-4 md:px-8 relative overflow-hidden font-sans">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-electric-blue/20 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-crypto-violet/20 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
      </div>

      <div className="w-full max-w-6xl glass-card border-white/10 shadow-2xl overflow-hidden flex flex-col lg:flex-row relative z-10 p-0 md:p-0">
        
        {/* Left Side - Visual/Branding (Hidden on mobile) */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-dark-bg via-[#0a0f1d] to-[#120a1f] relative flex-col justify-between p-12 border-r border-white/5 overflow-hidden group">
          <div className="absolute inset-0 bg-orbit-gradient opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-700"></div>
          
          <div className="relative z-10 flex flex-col pt-4">
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
              Welcome Back To <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-crypto-violet">Intelligent Trading.</span>
            </h2>
            <p className="text-gray-400 mt-6 text-lg max-w-md font-medium leading-relaxed">
              Log in to access your dashboard, monitor your AI bots, and control your portfolio with precision.
            </p>
          </div>

          <div className="relative z-10 h-[300px] w-full flex items-end justify-center mt-8">
            <img src="/hero_ai_head_1773558093460.png" alt="AI Core" className="absolute bottom-0 h-full object-contain filter drop-shadow-[0_0_30px_rgba(0,198,255,0.3)] animate-float" />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-14 lg:p-20 relative bg-dark-bg/50 backdrop-blur-sm lg:bg-transparent flex flex-col justify-center">
          
          {/* Mobile Only Logo */}
          <div className="lg:hidden flex justify-center mb-10">
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
            <div className="flex items-center justify-between mb-8">
              <div>
                <Link to="/" className="text-gray-400 hover:text-white flex items-center gap-2 text-sm font-semibold transition-colors mb-2 inline-flex">
                  <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Login</h1>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500 block mb-1">New User?</span>
                <Link to="/register" className="text-electric-blue text-sm font-bold hover:text-crypto-violet transition-colors">Create Account</Link>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 mb-6 animate-shake">
                <AlertCircle className="w-5 h-5 shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Username Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300 ml-1">Username / User ID</label>
                <div className={`relative flex items-center bg-[#0d1323] border ${isFocused === 'username' ? 'border-electric-blue shadow-[0_0_15px_rgba(0,198,255,0.15)] bg-[#10172a]' : 'border-white/5'} rounded-xl transition-all duration-300 overflow-hidden group`}>
                  <div className={`pl-4 pr-3 ${isFocused === 'username' ? 'text-electric-blue' : 'text-gray-500 group-hover:text-gray-400'} transition-colors`}>
                    <User className="w-5 h-5" />
                  </div>
                  <input 
                    type="text" 
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    onFocus={() => setIsFocused('username')}
                    onBlur={() => setIsFocused('')}
                    placeholder="Enter your username" 
                    required
                    className="w-full bg-transparent py-4 pr-4 text-white placeholder:text-gray-600 focus:outline-none font-medium text-base"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-300 ml-1">Password</label>
                <div className={`relative flex items-center bg-[#0d1323] border ${isFocused === 'password' ? 'border-electric-blue shadow-[0_0_15px_rgba(0,198,255,0.15)] bg-[#10172a]' : 'border-white/5'} rounded-xl transition-all duration-300 overflow-hidden group`}>
                  <div className={`pl-4 pr-3 ${isFocused === 'password' ? 'text-electric-blue' : 'text-gray-500 group-hover:text-gray-400'} transition-colors`}>
                    <Lock className="w-5 h-5" />
                  </div>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setIsFocused('password')}
                    onBlur={() => setIsFocused('')}
                    placeholder="Enter your password" 
                    required
                    className="w-full bg-transparent py-4 pr-12 text-white placeholder:text-gray-600 focus:outline-none font-medium text-base tracking-wide"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-gray-500 hover:text-white transition-colors p-1"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center pt-1">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="remember" className="w-4 h-4 rounded bg-[#0d1323] border-white/10 text-electric-blue focus:ring-electric-blue focus:ring-offset-dark-bg cursor-pointer" />
                  <label htmlFor="remember" className="text-sm text-gray-400 cursor-pointer font-medium hover:text-white transition-colors">Remember me</label>
                </div>
                <a href="#" className="text-sm font-semibold text-electric-blue hover:text-white transition-colors">
                  Forgot Password?
                </a>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full relative py-4 bg-orbit-gradient text-white rounded-xl font-bold text-lg overflow-hidden group/btn shadow-[0_10px_30px_-10px_rgba(0,198,255,0.4)] hover:shadow-[0_10px_40px_-10px_rgba(0,198,255,0.6)] transition-all transform hover:-translate-y-1 active:translate-y-0 ${isLoading ? 'opacity-70 cursor-wait' : ''}`}
              >
                <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover/btn:translate-x-[50%] transition-transform duration-1000"></div>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>Accessing... <Loader2 className="w-5 h-5 animate-spin" /></>
                  ) : (
                    <>Access Account <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" /></>
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

export default Login;
