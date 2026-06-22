import React, { useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { CheckCircle, Share2, Home } from 'lucide-react';
import confetti from 'canvas-confetti';
import logo from '../../assets/logonew.png';

const ThankYouScreen = ({ businessName, websiteUrl }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col flex-1"
    >
      <div className="flex justify-center mb-8">
        <img src={logo} alt="DOAGuru Logo" className="h-28 w-auto object-contain" />
      </div>

      <div className="space-y-4 text-left px-2 mb-12">
        <h1 className="text-[22px] font-bold text-[#1a2b3c] flex items-center gap-2">
          Thank you <span className="text-2xl">🙏</span>
        </h1>
        <p className="text-slate-500 font-normal leading-relaxed text-[15px]">
          We truly appreciate you taking the time to share your feedback. Your support motivates us to continue delivering the best possible experience.
        </p>
      </div>

      <div className="mt-8 text-center pb-6">
        <p className="text-[13px] text-slate-500">
          Powered by <a href={websiteUrl ? (websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`) : "https://doaguru.com"} target="_blank" rel="noopener noreferrer" className="text-blue-500 font-medium hover:underline">{businessName || "Doaguru InfoSystems"} ⚡</a>
        </p>
      </div>
    </motion.div>
  );
};

export default ThankYouScreen;
