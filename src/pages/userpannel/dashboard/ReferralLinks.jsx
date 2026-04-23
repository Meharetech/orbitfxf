import React, { useState } from 'react';
import { Share2, Copy, CheckCircle2, ArrowLeftRight, ExternalLink } from 'lucide-react';

const ReferralLinks = ({ userCode }) => {
  const [copied, setCopied] = useState('');

  const baseUrl = window.location.origin + '/register';
  const leftLink = `${baseUrl}?code=${userCode}&place=L`;
  const rightLink = `${baseUrl}?code=${userCode}&place=R`;

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 3000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      {/* Left Link */}
      <div className="glass-card p-6 bg-electric-blue/5 border-electric-blue/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
          <ArrowLeftRight className="w-12 h-12 text-electric-blue" />
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-electric-blue/20 flex items-center justify-center text-electric-blue">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-white font-bold">Left Referral Link</h4>
            <p className="text-gray-500 text-xs">Build your left power leg</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-black/40 border border-white/5 rounded-xl p-2 pl-4">
          <span className="text-xs text-gray-400 truncate flex-1">{leftLink}</span>
          <button 
            onClick={() => copyToClipboard(leftLink, 'L')}
            className={`p-2 rounded-lg transition-all ${copied === 'L' ? 'bg-green-500/20 text-green-500' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
          >
            {copied === 'L' ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Right Link */}
      <div className="glass-card p-6 bg-crypto-violet/5 border-crypto-violet/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
          <ArrowLeftRight className="w-12 h-12 text-crypto-violet" />
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-crypto-violet/20 flex items-center justify-center text-crypto-violet">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-white font-bold">Right Referral Link</h4>
            <p className="text-gray-500 text-xs">Build your right power leg</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-black/40 border border-white/5 rounded-xl p-2 pl-4">
          <span className="text-xs text-gray-400 truncate flex-1">{rightLink}</span>
          <button 
            onClick={() => copyToClipboard(rightLink, 'R')}
            className={`p-2 rounded-lg transition-all ${copied === 'R' ? 'bg-green-500/20 text-green-500' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
          >
            {copied === 'R' ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferralLinks;
