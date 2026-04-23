import React from 'react';

const PlaceholderPage = ({ title }) => {
  return (
    <div className="glass-card p-12 text-center border-white/5">
      <h2 className="text-3xl font-black text-white mb-4">{title}</h2>
      <p className="text-gray-400 font-medium max-w-md mx-auto">
        This section is under active development. Our real-time backend synchronization is being established for this module.
      </p>
      <div className="mt-8 flex justify-center">
        <div className="w-12 h-12 border-4 border-electric-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default PlaceholderPage;
