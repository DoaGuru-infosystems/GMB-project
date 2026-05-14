import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { reviewService } from '../../services/api';

const AiReviewScreen = ({ selectedKeywords, onPostGoogle, businessName, clientKeywords }) => {
  const [reviewText, setReviewText] = useState("");
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        setIsGenerating(true);
        const contextKeywords = [clientKeywords, ...selectedKeywords].filter(Boolean).join(', ');
        const data = await reviewService.generateReview(contextKeywords, businessName || "our business");
        setReviewText(data.generatedReview);
      } catch (err) {
        const fallbackKeys = selectedKeywords.length > 0 ? selectedKeywords.join(', ') : (clientKeywords || 'services');
        const bName = businessName || "the team";
        setReviewText(`I had an amazing experience with ${bName}! Their ${fallbackKeys} services were outstanding and the team was super professional throughout. Highly recommend them to anyone looking for excellent quality work.`);
      } finally {
        setIsGenerating(false);
      }
    };
    fetchReview();
  }, [selectedKeywords]);

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(reviewText);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = reviewText;
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";
        document.body.prepend(textArea);
        textArea.select();
        try { document.execCommand('copy'); } catch (e) { console.error(e); } finally { textArea.remove(); }
      }
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  const handleShareOnGoogle = async () => {
    await copyToClipboard();
    onPostGoogle(reviewText);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col flex-1 pt-4 pb-4"
    >
      {/* Header */}
      <div className="text-left px-2 mb-8">
        <h2 className="text-[22px] font-bold text-[#1a2b3c] leading-tight mb-2">
          Share Your Experience
        </h2>
        <p className="text-slate-700 font-normal text-[15px] leading-relaxed">
          This review has been generated based on the services you selected.
        </p>
      </div>

      {/* Review Section */}
      <div className="flex-1 flex flex-col px-2">
        <h3 className="text-[18px] font-bold text-[#1a2b3c] mb-2">
          Your personalized review is ready!
        </h3>
        <p className="text-slate-600 text-[14px] mb-5 leading-relaxed">
          Based on your selections, we have crafted this review for you. You can post it directly on Google, or feel free to customize it before submitting.
        </p>

        {/* Review Box */}
        {isGenerating ? (
          <div className="w-full border border-slate-200 rounded-xl bg-slate-50 px-4 py-8 mb-8 flex flex-col items-center justify-center gap-3">
            <div className="w-7 h-7 border-4 border-blue-200 border-t-[#007aff] rounded-full animate-spin"></div>
            <p className="text-slate-400 text-sm font-medium">Crafting your review...</p>
          </div>
        ) : (
          <div className="w-full border border-slate-300 rounded-xl bg-slate-50 px-4 py-4 mb-8">
            <textarea
              ref={(el) => {
                if (el) {
                  el.style.height = 'auto';
                  el.style.height = el.scrollHeight + 'px';
                }
              }}
              value={reviewText}
              onChange={(e) => {
                setReviewText(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
              className="w-full text-[15px] text-[#1a2b3c] font-medium leading-relaxed bg-transparent outline-none resize-none overflow-hidden"
              placeholder="Your review will appear here..."
            />
          </div>
        )}

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: isGenerating ? 1 : 1.02 }}
          whileTap={{ scale: isGenerating ? 1 : 0.98 }}
          onClick={handleShareOnGoogle}
          disabled={isGenerating}
          className="w-full py-4 px-6 text-[17px] font-bold rounded-2xl bg-[#007aff] text-white shadow-md hover:bg-blue-600 transition-all flex items-center justify-center gap-2 mb-5 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          Copy review & Continue
        </motion.button>

        {/* Private concern link */}
        <div className="text-center mb-4">
          <p className="text-[13px] text-slate-500">
            If you have concerns you wish to address privately,{' '}
            <a href="https://doaguru.com" target="_blank" rel="noopener noreferrer" className="text-[#007aff] cursor-pointer hover:underline">click here.</a>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center pb-2">
          <p className="text-[13px] text-slate-500">
            Powered by <a href="https://doaguru.com" target="_blank" rel="noopener noreferrer" className="text-[#007aff] font-medium hover:underline">DOAGuru InfoSystems ⚡</a>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AiReviewScreen;
