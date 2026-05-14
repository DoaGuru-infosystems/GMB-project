import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const WelcomeScreen = ({ onNext }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center space-y-8"
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-24 h-24 bg-gradient-to-tr from-primary to-secondary rounded-3xl shadow-2xl flex items-center justify-center mb-4"
      >
        <span className="text-4xl font-bold text-white">B</span>
      </motion.div>
      
      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Business Name
        </h1>
        <p className="text-slate-500 font-medium text-lg">
          Your feedback helps us improve ❤️
        </p>
      </div>

      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="flex gap-2"
      >
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-8 h-8 text-amber-400 fill-amber-400 drop-shadow-md" />
        ))}
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="w-full max-w-sm py-4 px-6 text-lg font-bold rounded-2xl bg-gradient-to-r from-primary to-secondary text-white shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300"
      >
        Rate Your Experience
      </motion.button>
    </motion.div>
  );
};

export default WelcomeScreen;
