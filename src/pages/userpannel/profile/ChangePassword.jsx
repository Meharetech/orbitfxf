import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, KeyRound, ShieldCheck, AlertCircle, 
  Eye, EyeOff, Loader2, CheckCircle2 
} from 'lucide-react';
import authService from '../../../services/authService';

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    
    const [showPasswords, setShowPasswords] = useState({
        old: false,
        new: false,
        confirm: false
    });

    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleVisibility = (field) => {
        setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: '', message: '' });

        if (formData.newPassword !== formData.confirmPassword) {
            return setStatus({ type: 'error', message: 'New passwords do not match' });
        }

        if (formData.newPassword.length < 6) {
            return setStatus({ type: 'error', message: 'New password must be at least 6 characters' });
        }

        setIsLoading(true);
        try {
            await authService.updatePassword({
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword
            });
            setStatus({ type: 'success', message: 'Password updated successfully!' });
            setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            setStatus({ 
                type: 'error', 
                message: err.response?.data?.message || 'Failed to update password. Please check your current password.' 
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black text-white">Security Settings</h1>
                <p className="text-gray-400 font-medium">Update your account password regularly to keep your assets secure.</p>
            </div>

            <div className="glass-card p-8 border-white/5 bg-white/[0.02] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <KeyRound className="w-32 h-32 text-electric-blue" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    {status.message && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-4 rounded-xl flex items-center gap-3 font-bold text-sm ${
                                status.type === 'success' 
                                ? 'bg-green-500/10 border border-green-500/20 text-green-500' 
                                : 'bg-red-500/10 border border-red-500/20 text-red-500'
                            }`}
                        >
                            {status.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                            {status.message}
                        </motion.div>
                    )}

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Current Password</label>
                        <div className="relative flex items-center bg-black/40 border border-white/5 rounded-xl transition-all focus-within:border-electric-blue/50 overflow-hidden">
                            <div className="pl-4 pr-3 text-gray-500">
                                <Lock className="w-4 h-4" />
                            </div>
                            <input 
                                type={showPasswords.old ? "text" : "password"}
                                name="oldPassword"
                                value={formData.oldPassword}
                                onChange={handleChange}
                                placeholder="Enter current password"
                                required
                                className="w-full bg-transparent py-4 pr-12 text-white placeholder:text-gray-600 focus:outline-none font-medium text-sm"
                            />
                            <button 
                                type="button"
                                onClick={() => toggleVisibility('old')}
                                className="absolute right-4 text-gray-600 hover:text-white transition-colors"
                            >
                                {showPasswords.old ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">New Password</label>
                            <div className="relative flex items-center bg-black/40 border border-white/5 rounded-xl transition-all focus-within:border-crypto-violet/50 overflow-hidden">
                                <div className="pl-4 pr-3 text-gray-500">
                                    <ShieldCheck className="w-4 h-4" />
                                </div>
                                <input 
                                    type={showPasswords.new ? "text" : "password"}
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    placeholder="Enter new password"
                                    required
                                    className="w-full bg-transparent py-4 pr-12 text-white placeholder:text-gray-600 focus:outline-none font-medium text-sm"
                                />
                                <button 
                                    type="button"
                                    onClick={() => toggleVisibility('new')}
                                    className="absolute right-4 text-gray-600 hover:text-white transition-colors"
                                >
                                    {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Confirm New Password</label>
                            <div className="relative flex items-center bg-black/40 border border-white/5 rounded-xl transition-all focus-within:border-crypto-violet/50 overflow-hidden">
                                <div className="pl-4 pr-3 text-gray-500">
                                    <ShieldCheck className="w-4 h-4" />
                                </div>
                                <input 
                                    type={showPasswords.confirm ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Verify new password"
                                    required
                                    className="w-full bg-transparent py-4 pr-12 text-white placeholder:text-gray-600 focus:outline-none font-medium text-sm"
                                />
                                <button 
                                    type="button"
                                    onClick={() => toggleVisibility('confirm')}
                                    className="absolute right-4 text-gray-600 hover:text-white transition-colors"
                                >
                                    {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 mt-8">
                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary w-full py-4 text-base flex items-center justify-center gap-3 group"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>Update Security Credentials <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" /></>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                    <h5 className="text-amber-500 font-bold text-sm uppercase tracking-widest">Security Warning</h5>
                    <p className="text-gray-400 text-xs leading-relaxed font-medium">
                        Changing your password will NOT sign you out of your current session, but it will expire all other active logins on different devices for your safety.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
