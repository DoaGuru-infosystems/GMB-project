import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import logo from '../../assets/logonew.png';

const ratingTexts = {
  1: "Poor",
  2: "Bad",
  3: "Average",
  4: "Good",
  5: "Excellent"
};

const RatingScreen = ({ onRatingSelect }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col flex-1"
    >
      <div className="flex justify-center mb-8">
        <img src={logo} alt="DOAGuru Logo" className="h-28 w-auto object-contain" />
      </div>

      <div className="space-y-4 mb-10 text-left px-2">
        <h2 className="text-[22px] font-bold text-[#1a2b3c]">
          How would you rate us?
        </h2>
        <p className="text-slate-500 font-normal leading-relaxed text-[15px]">
          Your feedback allows us to better understand your needs and continue delivering high-quality professional services.
        </p>
      </div>

      <div className="flex gap-3 justify-center items-center mb-12">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => onRatingSelect(star)}
            className="focus:outline-none transition-colors"
          >
            <Star
              size={48}
              className={`transition-all duration-300 ${star <= hoverRating
                ? 'text-amber-400 fill-amber-400'
                : 'text-[#a1a1aa] fill-[#a1a1aa]'
                }`}
              strokeWidth={0}
            />
          </motion.button>
        ))}
      </div>

      <div className="mt-8 text-center pb-6">
        <p className="text-[13px] text-slate-500">
          Powered by <a href="https://doaguru.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 font-medium hover:underline">Doaguru InfoSystems ⚡</a>
        </p>
      </div>
    </motion.div>
  );
};

export default RatingScreen;
