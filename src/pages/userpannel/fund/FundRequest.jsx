import React, { useState, useEffect } from 'react';
import api from '../../../api/apiConfig';
import { 
  Wallet, Upload, CheckCircle2, AlertCircle, 
  Loader2, History, Landmark, Banknote, Clock,
  XCircle, Copy, Check
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
    // System Data
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // Selection Model
    const [amount, setAmount] = useState('');
    const [screenshot, setScreenshot] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [success, setSuccess] = useState(false);
    const [submittedTxId, setSubmittedTxId] = useState('');

    // Gateway Config
    const [gateways, setGateways] = useState([]);
    const [selectedGateway, setSelectedGateway] = useState(null);
    const [copied, setCopied] = useState(false);
    const [transactionId, setTransactionId] = useState('');

    // Wizard step & Timer
    const [step, setStep] = useState(1);
    const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
    const [timerActive, setTimerActive] = useState(false);

    useEffect(() => {
        fetchHistory();
        fetchGateways();
    }, []);

    useEffect(() => {
        let timer = null;
        if (timerActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setTimerActive(false);
        }
        return () => clearInterval(timer);
    }, [timerActive, timeLeft]);

    const startTimer = () => {
        setTimeLeft(900);
        setTimerActive(true);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const fetchHistory = async () => {
        try {
            const res = await api.get('/funds/history');
            setHistory(res.data);
        } catch (err) {
            console.error('Error fetching history');
        }
    };

    const fetchGateways = async () => {
        try {
            const res = await api.get('/payments/public');
            setGateways(res.data);
            if (res.data.length > 0) {
                setSelectedGateway(res.data[0]);
            }
        } catch (err) {
            console.error('Error fetching gateways', err);
        }
    };

    const copyAddress = () => {
        if (!selectedGateway) return;
        navigator.clipboard.writeText(selectedGateway.walletAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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
        if (!amount || amount <= 0) return alert('Please enter a valid amount');
        if (!screenshot) return alert('Please upload a screenshot proof');
        
        setLoading(true);
        try {
            const res = await api.post('/funds/request', 
                {
                    amount,
                    screenshot,
                    paymentMethod: selectedGateway?._id || undefined,
                    transactionId: transactionId || undefined
                }
            );
            setSubmittedTxId(res.data.fundRequest?.transactionId || '');
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
        setScreenshot(null);
        setImagePreview(null);
        setTransactionId('');
        setStep(1);
        setTimeLeft(900);
        setTimerActive(false);
    };

    if (success) {
        return (
            <div className="max-w-xl mx-auto py-12 text-center animate-in zoom-in-95 duration-500">
                <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/10">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Transmission Confirmed</h2>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mt-3">Administrative node IS verifying your deposit request.</p>
                
                {submittedTxId && (
                    <div className="mt-6 p-4 bg-white/[0.02] border border-white/5 rounded-xl max-w-xs mx-auto">
                        <span className="text-[8px] text-amber-500 font-black uppercase tracking-widest block mb-1">Tracking ID / Tx ID</span>
                        <span className="text-xs font-mono font-bold text-white selection:bg-amber-500/30">{submittedTxId}</span>
                    </div>
                )}

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
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Action Area */}
                <div className="lg:col-span-3">
                    <div className="glass-card p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 border-white/5 max-w-2xl mx-auto">
                        {/* Step Indicator */}
                        <div className="flex items-center justify-center gap-4 mb-4">
                            {[1, 2, 3].map((num) => (
                                <React.Fragment key={num}>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${step === num ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 scale-110' : step > num ? 'bg-green-500/20 text-green-500 border border-green-500/30' : 'bg-white/5 text-white/30 border border-white/5'}`}>
                                            {step > num ? '✓' : num}
                                        </div>
                                        <span className={`text-[9px] font-black uppercase tracking-wider hidden sm:inline ${step === num ? 'text-white' : 'text-white/20'}`}>
                                            {num === 1 ? '1. Select & Amount' : num === 2 ? '2. Send Payment' : '3. Submit Proof'}
                                        </span>
                                    </div>
                                    {num < 3 && (
                                        <div className={`w-8 sm:w-16 h-0.5 rounded transition-all ${step > num ? 'bg-green-500/30' : 'bg-white/5'}`}></div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>

                        <div className="text-center space-y-3">
                            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                                <Banknote className="text-amber-500 w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-black text-white tracking-tight uppercase">
                                {step === 1 ? 'Gateway & Amount' : step === 2 ? 'Send Payment' : 'Upload Verification'}
                            </h3>
                            <p className="text-white/40 text-[10px] font-black uppercase tracking-widest leading-relaxed px-4">
                                {step === 1 ? 'Select a payment wallet and enter the amount you wish to deposit.' : step === 2 ? 'Send your transaction to the wallet below within the 15-minute time window.' : 'Enter your transaction hash ID and upload the proof screenshot.'}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                            {/* Step 1 Content */}
                            {step === 1 && (
                                <motion.div 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-6 sm:space-y-8"
                                >
                                    {/* Gateway Selection */}
                                    <div className="space-y-4">
                                        <label className="text-[10px] text-white/40 font-black uppercase tracking-wider block text-left">Select Payment Gateway</label>
                                        {gateways.length === 0 ? (
                                            <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl text-center text-white/30 text-[10px] font-black uppercase tracking-widest italic">
                                                No active payment methods configured by admin.
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {gateways.map((gw) => {
                                                    const isSelected = selectedGateway?._id === gw._id;
                                                    return (
                                                        <div 
                                                            key={gw._id}
                                                            onClick={() => { setSelectedGateway(gw); setCopied(false); }}
                                                            className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between group ${isSelected ? 'border-amber-500 bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.05)]' : 'border-white/5 bg-white/[0.01] hover:border-white/10'}`}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                                                                    <Wallet className={`w-5 h-5 ${isSelected ? 'text-amber-500' : 'text-white/30 group-hover:text-white/60'}`} />
                                                                </div>
                                                                <div className="text-left leading-tight">
                                                                    <p className="text-white font-black text-xs uppercase tracking-tight">{gw.name}</p>
                                                                    <p className="text-white/20 text-[9px] font-bold uppercase mt-0.5">{gw.network}</p>
                                                                </div>
                                                            </div>
                                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${isSelected ? 'border-amber-500 bg-amber-500 text-black' : 'border-white/20'}`}>
                                                                {isSelected && (
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>

                                    {/* Amount Input */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] text-white/40 font-black uppercase tracking-wider block text-left">ADDED AMOUNT (USD)</label>
                                        <div className="relative bg-black/25 border border-white/[0.03] rounded-3xl py-5 px-6 sm:py-6 sm:px-8 flex items-center justify-center">
                                            <div className="text-2xl sm:text-3xl font-black text-amber-500 absolute left-6 sm:left-8">$</div>
                                            <input 
                                                type="number" 
                                                placeholder="0"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                className="w-full bg-transparent text-3xl sm:text-5xl font-black text-white focus:outline-none placeholder:text-white/5 text-center pr-8 sm:pr-10"
                                                required
                                            />
                                            <div className="absolute bottom-4 right-6 text-[8px] font-black text-white/10 uppercase tracking-widest">USD NODE</div>
                                        </div>
                                    </div>

                                    <button 
                                        type="button"
                                        disabled={!amount || Number(amount) <= 0 || !selectedGateway}
                                        onClick={() => { setStep(2); startTimer(); }}
                                        className="w-full py-3.5 sm:py-4.5 bg-amber-500 text-black font-black uppercase tracking-widest text-[10px] sm:text-xs rounded-2xl shadow-xl shadow-amber-500/10 hover:bg-amber-600 hover:text-white transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none mt-4"
                                    >
                                        Next: Proceed to Payment
                                    </button>
                                </motion.div>
                            )}

                            {/* Step 2 Content */}
                            {step === 2 && selectedGateway && (
                                <motion.div 
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-6"
                                >
                                    {/* Timer display */}
                                    <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-2xl flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-5 h-5 text-amber-500 animate-pulse" />
                                            <span className="text-[10px] text-white/40 font-black uppercase tracking-wider">Payment Window</span>
                                        </div>
                                        <div className="text-xl font-mono font-black text-amber-500">
                                            {timeLeft > 0 ? formatTime(timeLeft) : 'EXPIRED'}
                                        </div>
                                    </div>

                                    {timeLeft === 0 ? (
                                        <div className="p-8 text-center space-y-4 bg-red-500/5 border border-red-500/20 rounded-3xl">
                                            <XCircle className="w-12 h-12 text-red-500 mx-auto" />
                                            <h4 className="text-white text-base font-black uppercase tracking-tight">Time Limit Reached</h4>
                                            <p className="text-white/40 text-[10px] font-black uppercase tracking-wide leading-relaxed">The payment verification window has expired. Please recreate the request.</p>
                                            <button 
                                                type="button" 
                                                onClick={() => { setStep(1); setTimeLeft(900); }}
                                                className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase text-white hover:bg-white/10"
                                            >
                                                Start Over
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            {/* Details panel */}
                                            <div className="p-4 sm:p-6 bg-[#0b0f19]/60 border border-white/[0.05] rounded-3xl">
                                                <div className="flex flex-col sm:flex-row gap-6 items-center">
                                                    {selectedGateway.qrCode && (
                                                        <div className="w-28 h-28 rounded-2xl p-1 shrink-0 flex items-center justify-center border border-white/10 bg-black/40 overflow-hidden">
                                                            <img src={selectedGateway.qrCode} className="w-full h-full object-cover rounded-xl" alt="QR Code" />
                                                        </div>
                                                    )}
                                                    <div className="space-y-3 flex-1 w-full relative">
                                                        <div className="flex justify-between items-center gap-2">
                                                            <span className="text-[9px] text-white/40 font-black uppercase tracking-wider block text-left">DEPOSIT WALLET ADDRESS ({selectedGateway.network})</span>
                                                            <span className="px-2 py-0.5 bg-amber-500 text-black text-[8px] font-black uppercase rounded">{selectedGateway.network}</span>
                                                        </div>
                                                        
                                                        <div className="flex items-center gap-2 bg-black/40 border border-white/5 rounded-xl px-4 py-3.5">
                                                            <p className="text-[11px] text-white font-mono break-all flex-1 text-left select-all">{selectedGateway.walletAddress}</p>
                                                            <button 
                                                                type="button"
                                                                onClick={copyAddress}
                                                                className="p-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-lg transition-colors border border-white/5 shrink-0"
                                                                title="Copy Address"
                                                            >
                                                                {copied ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
                                                            </button>
                                                        </div>
                                                        
                                                        <p className="text-[9px] text-amber-500 font-black uppercase tracking-wider text-left flex items-center gap-1.5">
                                                            <span>▲</span> SEND ONLY {selectedGateway.name} ({selectedGateway.network}) TO THIS ADDRESS.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Amount paid details summary */}
                                            <div className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl flex justify-between items-center text-xs">
                                                <span className="text-white/40 font-black uppercase tracking-widest text-[9px]">Requested Deposit</span>
                                                <span className="text-white font-black italic text-lg">${Number(amount).toLocaleString()} USD</span>
                                            </div>

                                            <div className="flex flex-col-reverse sm:flex-row gap-3">
                                                <button 
                                                    type="button"
                                                    onClick={() => { setStep(1); setTimerActive(false); }}
                                                    className="w-full sm:flex-1 py-3.5 sm:py-4.5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] sm:text-xs rounded-2xl hover:bg-white/10 transition-all"
                                                >
                                                    Back
                                                </button>
                                                <button 
                                                    type="button"
                                                    onClick={() => setStep(3)}
                                                    className="w-full sm:flex-1 py-3.5 sm:py-4.5 bg-amber-500 text-black font-black uppercase tracking-widest text-[10px] sm:text-xs rounded-2xl shadow-xl shadow-amber-500/10 hover:bg-amber-600 hover:text-white transition-all duration-300 text-center"
                                                >
                                                    Next: Submit Proof
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </motion.div>
                            )}

                            {/* Step 3 Content */}
                            {step === 3 && (
                                <motion.div 
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-6"
                                >
                                    {/* Transaction ID Input (Optional but highly recommended) */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] text-white/40 font-black uppercase tracking-wider block text-left">TRANSACTION HASH / ID (TXID)</label>
                                        <input 
                                            type="text" 
                                            placeholder="Paste transaction hash/ID..."
                                            value={transactionId}
                                            onChange={(e) => setTransactionId(e.target.value)}
                                            className="w-full bg-white/[0.01] border border-amber-500/20 focus:border-amber-500 rounded-2xl py-4 px-6 text-xs font-bold text-white placeholder:text-white/10 focus:outline-none text-center font-mono transition-all"
                                        />
                                    </div>

                                    {/* Screenshot Upload */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] text-white/40 font-black uppercase tracking-wider block text-left">UPLOAD PAYMENT SCREENSHOT</label>
                                        <div className="relative group bg-white/[0.01] border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center p-4 min-h-[160px] hover:border-amber-500/30 transition-all overflow-hidden max-w-md mx-auto">
                                            {imagePreview ? (
                                                <div className="relative w-full h-full flex flex-col items-center justify-center">
                                                    <img src={imagePreview} className="max-w-full max-h-[140px] object-contain rounded-lg shadow-lg border border-white/10" alt="Preview" />
                                                    <button 
                                                        type="button" 
                                                        onClick={() => { setImagePreview(null); setScreenshot(null); }}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg animate-in zoom-in-50"
                                                    >
                                                        <XCircle size={16} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="text-center cursor-pointer py-4">
                                                    <Upload className="w-8 h-8 text-white/10 mx-auto mb-2 group-hover:text-amber-500 transition-colors" />
                                                    <p className="text-[9px] font-black text-white/30 uppercase tracking-widest group-hover:text-white transition-colors">SELECT / DRAG PROOF SCREENSHOT</p>
                                                    <p className="text-[7px] text-white/15 font-black uppercase tracking-wider mt-1">PNG, JPG, or WEBP up to 5MB</p>
                                                </div>
                                            )}
                                            {!imagePreview && (
                                                <input type="file" onChange={handleScreenshotChange} accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" />
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col-reverse sm:flex-row gap-3">
                                        <button 
                                            type="button"
                                            onClick={() => setStep(2)}
                                            className="w-full sm:flex-1 py-3.5 sm:py-4.5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] sm:text-xs rounded-2xl hover:bg-white/10 transition-all"
                                        >
                                            Back
                                        </button>
                                        <button 
                                            type="submit"
                                            disabled={loading || !screenshot}
                                            className="w-full sm:flex-1 py-3.5 sm:py-4.5 bg-amber-500 text-black font-black uppercase tracking-widest text-[10px] sm:text-xs rounded-2xl shadow-xl shadow-amber-500/10 hover:bg-amber-600 hover:text-white transition-all duration-300 disabled:opacity-30 disabled:grayscale flex items-center justify-center gap-2"
                                         >
                                            {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <><CheckCircle2 size={14} /> SUBMIT DEPOSIT PROOF</>}
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </form>
                    </div>
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
                                                <p className="text-white/20 text-[8px] font-black uppercase tracking-widest mt-1">{req.paymentMethod?.name || 'Manual Wallet Deposit'}</p>
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
