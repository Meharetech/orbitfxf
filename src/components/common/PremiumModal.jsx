import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle2, Info } from 'lucide-react';

const PremiumModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title, 
    message, 
    type = 'info', // 'info', 'warning', 'success', 'danger'
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    showInput = false,
    inputValue = '',
    onInputChange = () => {},
    inputPlaceholder = 'Enter details...',
    children
}) => {
    if (!isOpen) return null;

    const colors = {
        info: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
        warning: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
        success: 'text-green-500 bg-green-500/10 border-green-500/20',
        danger: 'text-red-500 bg-red-500/10 border-red-500/20'
    };

    const icons = {
        info: <Info size={24} />,
        warning: <AlertCircle size={24} />,
        success: <CheckCircle2 size={24} />,
        danger: <X size={24} />
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                {/* Modal Content */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-md bg-[#0a0f1d] border border-white/5 rounded-[2rem] p-8 shadow-2xl shadow-black/50 overflow-hidden"
                >
                    {/* Background Decorative Blur */}
                    <div className={`absolute -top-24 -left-24 w-48 h-48 blur-[80px] rounded-full opacity-20 ${colors[type].split(' ')[1]}`} />

                    <div className="relative z-10 flex flex-col items-center text-center gap-6">
                        {/* Icon */}
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border ${colors[type]}`}>
                            {icons[type]}
                        </div>

                        {/* Text */}
                        <div className="space-y-2">
                            <h3 className="text-xl font-black text-white uppercase tracking-tight italic">{title}</h3>
                            <p className="text-gray-500 text-[11px] font-bold uppercase tracking-widest leading-relaxed">
                                {message}
                            </p>
                        </div>

                        {/* Optional Input (for Admin reason) */}
                        {showInput && (
                            <div className="w-full space-y-2">
                                <input 
                                    autoFocus
                                    type="text" 
                                    placeholder={inputPlaceholder}
                                    value={inputValue}
                                    onChange={(e) => onInputChange(e.target.value)}
                                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-6 text-sm font-black text-white focus:outline-none focus:border-white/20 transition-all placeholder:text-gray-800"
                                />
                            </div>
                        )}

                        {children}

                        {/* Actions */}
                        <div className="flex gap-4 w-full mt-2">
                            <button 
                                onClick={onClose}
                                className="flex-1 py-4 bg-white/5 border border-white/5 rounded-2xl text-gray-500 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
                            >
                                {cancelText}
                            </button>
                            <button 
                                onClick={onConfirm}
                                className={`flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transform transition-all active:scale-95 shadow-xl
                                    ${type === 'danger' ? 'bg-red-500 text-white shadow-red-500/20' : 
                                      type === 'success' ? 'bg-green-500 text-white shadow-green-500/20' :
                                      'bg-blue-500 text-white shadow-blue-500/20'}`}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default PremiumModal;
