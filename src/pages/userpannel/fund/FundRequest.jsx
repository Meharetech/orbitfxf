import React, { useState, useEffect } from 'react';
import api from '../../../api/apiConfig';
import { 
  Wallet, QrCode, Clipboard, 
  Upload, CheckCircle2, AlertCircle, 
  Loader2, ArrowRight, History, 
  ChevronRight, ArrowLeft, ShieldCheck,
  CreditCard, Landmark, Banknote, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="glass-card p-4 border-white/5 hover:border-white/10 transition-all group relative overflow-hidden"
  >
    <div className={`absolute -right-4 -top-4 w-16 h-16 blur-[30px] opacity-0 group-hover:opacity-10 transition-all duration-700 bg-current ${color.replace('text-', 'bg-')}`}></div>
    <div className="flex justify-between items-start mb-3">
      <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${color} group-hover:scale-110 transition-transform shadow-lg shadow-black/20`}>
        <Icon className="w-4 h-4" />
      </div>
    </div>
    <p className="text-white/40 text-[9px] font-black uppercase tracking-widest truncate">{title}</p>
    <h3 className="text-xl font-black text-white mt-0.5 italic tracking-tighter truncate">{value}</h3>
  </motion.div>
);

const FundRequest = () => {
    // Navigation Control
    const [currentStep, setCurrentStep] = useState(1); // 1: Amount, 2: Gateway, 3: Confirmation
    
    // System Data
    const [gateways, setGateways] = useState([]);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [gatewaysVisible, setGatewaysVisible] = useState(false);
    
    // Selection Model
    const [amount, setAmount] = useState('');
    const [selectedGateway, setSelectedGateway] = useState(null);
    const [transactionId, setTransactionId] = useState('');
    const [screenshot, setScreenshot] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchGateways();
        fetchHistory();
    }, []);

    const fetchGateways = async () => {
        try {
            const res = await api.get('/payments/public');
            setGateways(res.data);
        } catch (err) {
            console.error('Error fetching gateways');
        }
    };

    const fetchHistory = async () => {
        try {
            const res = await api.get('/funds/history');
            setHistory(res.data);
        } catch (err) {
            console.error('Error fetching history');
        }
    };

    const handleScreenshotChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setScreenshot(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedGateway) return alert('Select a gateway first');
        setLoading(true);
        try {
            await api.post('/funds/request', 
                {
                    amount,
                    paymentMethod: selectedGateway._id,
                    transactionId,
                    screenshot
                }
            );
            setSuccess(true);
            resetForm();
            fetchHistory();
        } catch (err) {
            alert('Submission failed: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setAmount('');
        setTransactionId('');
        setScreenshot(null);
        setImagePreview(null);
        setSelectedGateway(null);
        setCurrentStep(1);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('Address Copied!');
    };

    const nextStep = () => {
        if (currentStep === 1) {
            if (!amount || amount <= 0) return alert('Enter a valid amount');
            setCurrentStep(2);
        } else if (currentStep === 2) {
            if (!selectedGateway) return alert('Select a payment method');
            setCurrentStep(3);
        }
    };

    if (success) {
        return (
            <div className="max-w-xl mx-auto py-12 text-center animate-in zoom-in-95 duration-500">
                <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/10">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Transmission Confirmed</h2>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mt-3">Administrative node IS verifying your deposit request.</p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button 
                        onClick={() => setSuccess(false)}
                        className="px-8 py-3 bg-amber-500 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-amber-600 transition-all shadow-xl shadow-amber-500/20"
                    >
                        New Deposit
                    </button>
                    <button 
                        onClick={() => window.location.href = '/user/dashboard'}
                        className="px-8 py-3 bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all"
                    >
                        Back to Core
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-20 animate-in fade-in duration-700">
            {/* Compact Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b border-white/5">
                <div className="space-y-1">
                    <h2 className="text-2xl font-black text-white tracking-tighter uppercase leading-none">Capital Entry</h2>
                    <p className="text-amber-500 text-[9px] font-black uppercase tracking-[0.3em]">Direct Liquidity Injection Protocol</p>
                </div>
                <div className="flex items-center gap-2 bg-white/[0.02] border border-white/5 p-1.5 rounded-xl">
                    {[1, 2, 3].map((step) => (
                        <div key={step} className="flex items-center gap-2 px-3">
                            <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-[10px] transition-all ${currentStep === step ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : currentStep > step ? 'bg-green-500/20 text-green-500' : 'bg-white/5 text-white/20'}`}>
                                {currentStep > step ? <CheckCircle2 size={12} /> : step}
                            </div>
                            <span className={`hidden md:block text-[8px] font-black uppercase tracking-widest ${currentStep === step ? 'text-white' : 'text-white/20'}`}>
                                {step === 1 ? 'Amount' : step === 2 ? 'Gateway' : 'Confirm'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Action Area */}
                <div className="lg:col-span-3">
                    <AnimatePresence mode="wait">
                        {currentStep === 1 && (
                            <motion.div 
                                key="step1" 
                                initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                                className="glass-card p-8 space-y-8 border-white/5 max-w-2xl mx-auto"
                            >
                                <div className="text-center space-y-3">
                                    <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                                        <Banknote className="text-amber-500 w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-black text-white tracking-tight uppercase">Enter Deposit Liquidity</h3>
                                    <p className="text-white/40 text-[10px] font-black uppercase tracking-widest leading-relaxed px-4">Define the total capital you wish to transmit to the network core.</p>
                                </div>

                                <div className="relative group max-w-xs mx-auto">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-black text-amber-500 selection:bg-none">$</div>
                                    <input 
                                        type="number" 
                                        placeholder="0.00"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full bg-white/[0.01] border-b-2 border-white/5 py-6 pl-12 pr-4 text-4xl font-black text-white focus:outline-none focus:border-amber-500 transition-all placeholder:text-white/5"
                                    />
                                    <div className="absolute bottom-2 right-2 text-[8px] font-black text-white/10 uppercase tracking-widest">USD NODE</div>
                                </div>

                                <button 
                                    onClick={nextStep}
                                    className="w-full py-4 bg-amber-500 text-white font-black uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-3 shadow-2xl shadow-amber-500/20 hover:bg-amber-600 active:scale-[0.98] transition-all"
                                >
                                    Proceed to Gateway <ChevronRight size={16} />
                                </button>
                            </motion.div>
                        )}

                        {currentStep === 2 && (
                            <motion.div 
                                key="step2" 
                                initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                                className="glass-card p-8 space-y-8 border-white/5 max-w-2xl mx-auto"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <button onClick={() => setCurrentStep(1)} className="flex items-center gap-2 text-[9px] text-white/40 font-black uppercase tracking-widest hover:text-white transition-colors">
                                        <ArrowLeft size={12} /> Back
                                    </button>
                                    <h3 className="text-lg font-black text-white uppercase tracking-tight">Select Transmission Hub</h3>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {gateways.map((g) => (
                                        <div 
                                            key={g._id}
                                            onClick={() => setSelectedGateway(g)}
                                            className={`p-4 border-2 rounded-xl cursor-pointer transition-all flex items-center gap-4 ${selectedGateway?._id === g._id ? 'bg-amber-500/10 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.1)]' : 'bg-white/[0.02] border-white/5 hover:border-white/10'}`}
                                        >
                                            <div className="w-10 h-10 bg-black/40 rounded-lg flex items-center justify-center p-2">
                                                <img src={g.qrCode} alt="Gateway" className="w-full h-full object-contain" />
                                            </div>
                                            <div>
                                                <p className={`text-[11px] font-black uppercase tracking-tight ${selectedGateway?._id === g._id ? 'text-amber-500' : 'text-white'}`}>{g.name}</p>
                                                <p className="text-[8px] text-white/40 font-black uppercase tracking-[0.2em]">{g.network}</p>
                                            </div>
                                            {selectedGateway?._id === g._id && <CheckCircle2 size={14} className="ml-auto text-amber-500" />}
                                        </div>
                                    ))}
                                </div>

                                <button 
                                    onClick={nextStep}
                                    disabled={!selectedGateway}
                                    className="w-full py-4 bg-amber-500 text-white font-black uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-3 shadow-2xl shadow-amber-500/20 hover:bg-amber-600 active:scale-[0.98] disabled:opacity-30 transition-all"
                                >
                                    Confirm Transmission Point <ChevronRight size={16} />
                                </button>
                            </motion.div>
                        )}

                        {currentStep === 3 && (
                            <motion.div 
                                key="step3" 
                                initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                                className="glass-card p-8 space-y-8 border-white/5 max-w-3xl mx-auto"
                            >
                                <div className="flex items-center justify-between">
                                    <button onClick={() => setCurrentStep(2)} className="flex items-center gap-2 text-[9px] text-white/40 font-black uppercase tracking-widest hover:text-white transition-colors">
                                        <ArrowLeft size={12} /> Gateway
                                    </button>
                                    <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-500 text-[9px] font-black uppercase">
                                        <ShieldCheck size={12} /> Final Transmission
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="w-full md:w-1/2 space-y-4">
                                        <div className="p-4 bg-black/40 border border-white/5 rounded-xl space-y-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-20 h-20 bg-white rounded-xl p-1.5 shrink-0 shadow-lg">
                                                    <img src={selectedGateway?.qrCode} alt="QR" className="w-full h-full object-contain" />
                                                </div>
                                                <div className="space-y-2 flex-1 overflow-hidden">
                                                    <span className="text-[8px] text-amber-500 font-black uppercase tracking-widest">{selectedGateway?.network} HUB</span>
                                                    <div 
                                                        onClick={() => copyToClipboard(selectedGateway?.walletAddress)}
                                                        className="flex items-center gap-2 group cursor-pointer w-full bg-white/5 p-2 rounded-lg"
                                                    >
                                                        <p className="text-white text-[9px] font-mono break-all opacity-80 leading-tight">
                                                            {selectedGateway?.walletAddress}
                                                        </p>
                                                        <Clipboard className="w-3 h-3 text-white/20 group-hover:text-amber-500 shrink-0" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center pt-2 border-t border-white/5">
                                                <span className="text-[10px] text-white/40 uppercase font-black tracking-widest uppercase italic">Wait Transmission</span>
                                                <span className="text-xl font-black text-white italic tracking-tighter">${amount}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="w-full md:w-1/2 space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[9px] text-white/40 font-black uppercase tracking-widest ml-1">Blockchain Hash / TXID</label>
                                            <input 
                                                type="text" 
                                                placeholder="Paste transaction hash..."
                                                required
                                                value={transactionId}
                                                onChange={(e) => setTransactionId(e.target.value)}
                                                className="w-full bg-white/[0.01] border border-white/5 rounded-xl py-3 px-4 text-xs text-white focus:outline-none focus:border-amber-500/50 transition-all font-mono"
                                            />
                                        </div>
                                        
                                        <div className="space-y-1.5">
                                            <label className="text-[9px] text-white/40 font-black uppercase tracking-widest ml-1">Verifiable Proof</label>
                                            <div className="relative group bg-white/[0.01] border-2 border-dashed border-white/5 rounded-xl flex flex-col items-center justify-center p-3 min-h-[100px] hover:border-amber-500/30 transition-all overflow-hidden">
                                                {imagePreview ? (
                                                    <img src={imagePreview} className="w-full h-full max-h-[120px] object-contain rounded-lg" alt="Preview" />
                                                ) : (
                                                    <div className="text-center">
                                                        <Upload className="w-6 h-6 text-white/10 mx-auto mb-2" />
                                                        <p className="text-[8px] font-black text-white/20 uppercase tracking-widest">Attach Screenshot</p>
                                                    </div>
                                                )}
                                                <input type="file" onChange={handleScreenshotChange} accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                                            </div>
                                        </div>

                                        <button 
                                            type="submit"
                                            disabled={loading || !transactionId || !screenshot}
                                            className="w-full py-4 bg-amber-500 text-white font-black uppercase tracking-widest text-[10px] rounded-xl flex items-center justify-center gap-3 shadow-2xl shadow-amber-500/20 active:scale-95 disabled:opacity-30 disabled:grayscale transition-all"
                                        >
                                            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <><CheckCircle2 size={16} /> Submit Transmission</>}
                                        </button>
                                    </form>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Compact Transfer Log Sidebar */}
                <div className="lg:col-span-1 space-y-4">
                    <h4 className="text-white/40 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 mb-2">
                        <History size={14} className="text-amber-500" /> Transmission History
                    </h4>
                    
                    <div className="space-y-3 max-h-[600px] overflow-y-auto scrollbar-hide pr-1">
                        {history.length === 0 ? (
                             <div className="p-8 text-center glass-card border-white/5 text-white/10 text-[9px] font-black uppercase tracking-widest italic">
                                 Null operational history.
                             </div>
                        ) : (
                            history.map((req) => (
                                <div key={req._id} className="glass-card p-4 border-white/5 hover:bg-white/[0.02] transition-all group relative overflow-hidden">
                                    <div className={`absolute top-0 right-0 w-1 h-full ${req.status === 'Approved' ? 'bg-green-500' : req.status === 'Rejected' ? 'bg-red-500' : 'bg-amber-500/20'}`}></div>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 ${req.status === 'Approved' ? 'bg-green-500/10 border-green-500/20 text-green-500' : req.status === 'Rejected' ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-white/5 border-white/10 text-white/20'}`}>
                                                <Landmark size={18} />
                                            </div>
                                            <div className="leading-none">
                                                <p className="text-white text-lg font-black tracking-tighter italic leading-none">${req.amount.toLocaleString()}</p>
                                                <p className="text-white/20 text-[8px] font-black uppercase tracking-widest mt-1">{req.paymentMethod?.name || 'Asset'}</p>
                                            </div>
                                        </div>
                                        <div className="text-right flex flex-col items-end gap-1.5">
                                            <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest border ${req.status === 'Approved' ? 'bg-green-500/10 text-green-500 border-green-500/20' : req.status === 'Rejected' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-white/5 text-white/20 border-white/10'}`}>
                                                {req.status}
                                            </span>
                                            <p className="text-white/10 text-[8px] font-black uppercase flex items-center gap-1">
                                                <Clock size={8} /> {new Date(req.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                    {req.adminNote && (
                                        <div className="mt-3 p-2 bg-black/40 border border-white/5 rounded-lg text-[8px] font-black text-white/40 italic leading-tight">
                                            <span className="text-amber-500/50 not-italic mr-1">LOG:</span> "{req.adminNote}"
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FundRequest;
