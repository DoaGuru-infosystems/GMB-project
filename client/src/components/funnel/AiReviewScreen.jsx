import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { reviewService } from '../../services/api';
import { Star, Sparkles, ChevronRight, Check } from 'lucide-react';

const UKFlag = () => (
  <svg viewBox="0 0 60 60" className="w-12 h-12 rounded-full shadow-sm select-none shrink-0">
    <clipPath id="circleClip">
      <circle cx="30" cy="30" r="30" />
    </clipPath>
    <g clipPath="url(#circleClip)">
      <rect width="60" height="60" fill="#012169" />
      <line x1="0" y1="0" x2="60" y2="60" stroke="#ffffff" strokeWidth="6" />
      <line x1="60" y1="0" x2="0" y2="60" stroke="#ffffff" strokeWidth="6" />
      <line x1="0" y1="0" x2="60" y2="60" stroke="#C8102E" strokeWidth="4" />
      <line x1="60" y1="0" x2="0" y2="60" stroke="#C8102E" strokeWidth="4" />
      <line x1="30" y1="0" x2="30" y2="60" stroke="#ffffff" strokeWidth="10" />
      <line x1="0" y1="30" x2="60" y2="30" stroke="#ffffff" strokeWidth="10" />
      <line x1="30" y1="0" x2="30" y2="60" stroke="#C8102E" strokeWidth="6" />
      <line x1="0" y1="30" x2="60" y2="30" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
);

const IndiaFlag = () => (
  <svg viewBox="0 0 60 60" className="w-12 h-12 rounded-full shadow-sm select-none shrink-0">
    <clipPath id="circleClipIndia">
      <circle cx="30" cy="30" r="30" />
    </clipPath>
    <g clipPath="url(#circleClipIndia)">
      <rect x="0" y="0" width="60" height="20" fill="#FF9933" />
      <rect x="0" y="20" width="60" height="20" fill="#FFFFFF" />
      <rect x="0" y="40" width="60" height="20" fill="#138808" />
      <circle cx="30" cy="30" r="7" stroke="#000080" strokeWidth="1" fill="none" />
      <circle cx="30" cy="30" r="1.5" fill="#000080" />
      {[...Array(24)].map((_, index) => {
        const angle = (index * 360) / 24;
        const rad = (angle * Math.PI) / 180;
        const x2 = 30 + 7 * Math.cos(rad);
        const y2 = 30 + 7 * Math.sin(rad);
        return (
          <line
            key={index}
            x1="30"
            y1="30"
            x2={x2}
            y2={y2}
            stroke="#000080"
            strokeWidth="0.5"
          />
        );
      })}
    </g>
  </svg>
);

const HinglishIcon = () => (
  <div className="w-12 h-12 rounded-full bg-[#00bda5] flex items-center justify-center text-white shadow-sm select-none shrink-0">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
      <path d="m18 8 2 2c1.1.9 1.2 2.5.3 3.5l-6.8 6.8a3 3 0 0 1-4.2 0l-2.9-2.9a3 3 0 0 1 0-4.2l3.4-3.4c.9-.9 2.5-.8 3.5.3l1.2 1.2M2 10l3-3M22 14l-3 3M14 6l3.4-3.4a3 3 0 0 1 4.2 0l.9.9a3 3 0 0 1 0 4.2l-3.4 3.4c-.9.9-2.5.8-3.5-.3l-1.2-1.2" />
    </svg>
  </div>
);

const LANGUAGES = [
  {
    key: 'english',
    label: 'English',
    emoji: '🇬🇧',
    description: 'Review in English',
    example: '"Amazing experience! Highly recommend!"',
    gradient: 'from-[#2f80ed] to-[#007aff]',
    shadow: 'shadow-blue-500/20',
    ring: 'ring-blue-400',
    glowColor: 'rgba(47, 128, 237, 0.4)'
  },
  {
    key: 'hindi',
    label: 'हिंदी',
    emoji: '🇮🇳',
    description: 'हिंदी में रिव्यू (Devanagari Only)',
    example: '"सच में यहाँ का काम बहुत शानदार था!"',
    gradient: 'from-[#f2994a] to-[#f2c94c]',
    shadow: 'shadow-orange-500/20',
    ring: 'ring-orange-400',
    glowColor: 'rgba(242, 153, 74, 0.4)'
  },
  {
    key: 'hinglish',
    label: 'Hinglish',
    emoji: '🤝',
    description: 'Hindi + English Mix',
    example: '"Yaar, ekdum amazing experience tha!"',
    gradient: 'from-[#11998e] to-[#38ef7d]',
    shadow: 'shadow-emerald-500/20',
    ring: 'ring-emerald-400',
    glowColor: 'rgba(17, 153, 142, 0.4)'
  },
];

const LOADING_STEPS = [
  "Analyzing your keywords...",
  "Selecting the perfect local vocabulary...",
  "Polishing natural human-like flow...",
  "Removing artificial AI markers...",
  "Formatting review style..."
];

const AiReviewScreen = ({ selectedKeywords, onPostGoogle, businessName, clientKeywords, websiteUrl }) => {
  const [phase, setPhase] = useState('select'); // 'select' | 'generating' | 'ready'
  const [selectedLang, setSelectedLang] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Rotate loading steps for beautiful loading animation narrative
  useEffect(() => {
    let interval;
    if (phase === 'generating') {
      setCurrentStepIndex(0);
      interval = setInterval(() => {
        setCurrentStepIndex((prev) => (prev + 1) % LOADING_STEPS.length);
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [phase]);

  const handleLanguageSelect = async (langKey) => {
    setSelectedLang(langKey);
    setPhase('generating');

    try {
      const contextKeywords = (selectedKeywords && selectedKeywords.length > 0)
        ? selectedKeywords.join(', ')
        : (clientKeywords || 'services');
      console.log('[AiReviewScreen] businessName prop:', businessName);
      console.log('[AiReviewScreen] contextKeywords:', contextKeywords);
      
      // Make API call (with backend 6s timeout implemented)
      const data = await reviewService.generateReview(contextKeywords, businessName, langKey);
      setReviewText(data.generatedReview);
    } catch (err) {
      console.error('[AiReviewScreen] Failed to generate review:', err);
      const fallbackKeys = selectedKeywords.length > 0 ? selectedKeywords.join(', ') : (clientKeywords || 'services');
      const bName = businessName || 'the team';
      
      // Dynamic fallback mapping in case of timeout or API failure
      const fallbackMap = {
        hindi: `दिल से कहूं तो ${bName} का काम सच में लाजवाब है। यहाँ की सेवा बहुत शानदार थी और स्टाफ का व्यवहार बेहद मददगार रहा। मैं दूसरों को यहाँ आने की सलाह दूँगा!`,
        hinglish: `${bName} ka experience really amazing tha! Service ekdum first-class thi. Highly recommend karta hoon!`,
        english: `I had an amazing experience with ${bName}! Their services were outstanding and the team was super professional. Highly recommend!`,
      };
      setReviewText(fallbackMap[langKey] || fallbackMap.english);
    } finally {
      // Add a slight artificial delay so the premium animation looks flawless
      setTimeout(() => {
        setPhase('ready');
      }, 800);
    }
  };

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(reviewText);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = reviewText;
        textArea.style.position = 'absolute';
        textArea.style.left = '-999999px';
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

  const handleRegenerateAnother = () => {
    setPhase('select');
    setSelectedLang(null);
    setReviewText('');
  };

  const langInfo = LANGUAGES.find(l => l.key === selectedLang);

  const formatUrl = (url) => {
    if (!url) return 'https://doaguru.com';
    const trimmed = url.trim();
    if (/^https?:\/\//i.test(trimmed)) {
      return trimmed;
    }
    return `https://${trimmed}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col flex-1 pt-2 pb-4"
    >
      {/* Header */}
      <div className="text-center px-2 mb-4">
        <h2 className="text-[21px] font-black text-[#0f172a] leading-tight mb-0.5 flex items-center justify-center gap-2">
          <span>Share Your Experience</span>
          <Sparkles className="w-4.5 h-4.5 text-amber-500 animate-pulse" />
        </h2>
        <p className="text-slate-500 font-normal text-[13.5px] leading-relaxed">
          {phase === 'select'
            ? 'Choose a language for your personalized review.'
            : phase === 'generating'
            ? 'AI is crafting your authentic review...'
            : 'Your premium review is ready!'}
        </p>
      </div>

      <div className="flex-1 flex flex-col px-2">
        <AnimatePresence mode="wait">

          {/* ── PHASE: Language Selection ── */}
          {phase === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col w-full"
            >
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">
                Select language option below
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6 w-full">
                {LANGUAGES.map((lang, i) => (
                  <motion.button
                    key={lang.key}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, type: "spring", stiffness: 120 }}
                    whileHover={{ 
                      scale: 1.03, 
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
                      borderColor: "rgba(0, 122, 255, 0.3)",
                      y: -4
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleLanguageSelect(lang.key)}
                    className="flex-1 flex flex-col items-center justify-between p-4 sm:p-4.5 bg-white border border-slate-200 rounded-[16px] shadow-sm hover:shadow-md transition-all duration-300 min-h-[175px] sm:min-h-[180px] group cursor-pointer"
                  >
                    {/* Top Icon */}
                    <div className="flex items-center justify-center shrink-0">
                      {lang.key === 'english' && <UKFlag />}
                      {lang.key === 'hindi' && <IndiaFlag />}
                      {lang.key === 'hinglish' && <HinglishIcon />}
                    </div>

                    {/* Text Details */}
                    <div className="flex flex-col items-center text-center mt-3 flex-1">
                      <span className="text-[15px] font-bold text-[#0f172a] leading-tight mb-0.5 select-none">
                        {lang.label}
                      </span>
                      <span className="text-[11px] text-slate-400 font-semibold select-none">
                        {lang.key === 'hindi' ? 'हिंदी में रिव्यू' : lang.description}
                      </span>
                    </div>

                    {/* Bottom Arrow Button */}
                    <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#007aff]/10 group-hover:text-[#007aff] group-hover:border-transparent transition-all mt-3">
                      <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── PHASE: Generating (Ultra Premium Loader) ── */}
          {phase === 'generating' && (
            <motion.div
              key="generating"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex-1 flex flex-col items-center justify-center py-10 px-4 min-h-[300px]"
            >
              {/* Outer Circular Pulse and Glow */}
              <div className="relative w-24 h-24 flex items-center justify-center mb-6">
                {/* Dynamic Glowing Rings */}
                <motion.div 
                  animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className={`absolute inset-0 rounded-full bg-gradient-to-tr ${langInfo?.gradient || 'from-blue-500 to-indigo-600'} blur-xl`}
                />
                
                {/* Spinner Track */}
                <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
                
                {/* Animated Rotating Gradient Spinner */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                  className={`absolute inset-0 rounded-full border-4 border-transparent border-t-[#007aff] border-r-transparent`}
                  style={{
                    borderTopColor: langInfo?.glowColor || '#007aff'
                  }}
                />

                {/* Glassmorphic Flag Shield */}
                <motion.div 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="w-14 h-14 rounded-xl bg-white/80 backdrop-blur-md shadow-2xl flex items-center justify-center z-10 border border-white/40"
                >
                  <span className="text-2xl filter drop-shadow-sm">{langInfo?.emoji}</span>
                </motion.div>
              </div>

              {/* Progress Narrative Block */}
              <div className="text-center max-w-xs space-y-2">
                <motion.p
                  key={currentStepIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="text-[#1a2b3c] text-[15px] font-extrabold tracking-tight"
                >
                  {LOADING_STEPS[currentStepIndex]}
                </motion.p>
                <p className="text-slate-400 text-[13px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 animate-pulse">
                  <span>Generating your {langInfo?.label} review</span>
                  <span className="flex gap-0.5">
                    <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" />
                    <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </span>
                </p>
              </div>
            </motion.div>
          )}

          {/* ── PHASE: Review Ready ── */}
          {phase === 'ready' && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col"
            >
              {/* Language Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-black text-white bg-gradient-to-r ${langInfo?.gradient} shadow-sm`}
                >
                  {langInfo?.emoji} {langInfo?.label}
                </span>
                <button
                  onClick={handleRegenerateAnother}
                  className="text-[12px] text-slate-400 hover:text-[#007aff] font-bold underline underline-offset-2 transition-colors ml-1"
                >
                  Change language
                </button>
              </div>

              <p className="text-slate-500 text-[13px] mb-4 leading-relaxed font-semibold">
                Based on your selections, we have crafted this review for you. You can copy it, modify it, and post it directly on Google Maps.
              </p>

              {/* Premium Review Textarea Wrapper */}
              <div className={`w-full border rounded-xl bg-slate-50/50 backdrop-blur-sm px-3.5 py-3 mb-4 ring-2 ring-offset-2 ${langInfo?.ring || 'ring-blue-400'} ring-opacity-20 border-slate-200 shadow-inner relative transition-all`}>
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
                  className="w-full text-[14px] text-[#1e293b] font-semibold leading-relaxed bg-transparent outline-none resize-none overflow-hidden"
                  placeholder="Your review will appear here..."
                />
              </div>

              {/* Premium Copy/Google CTA Button */}
              <motion.button
                whileHover={{ scale: 1.025, boxShadow: `0 12px 24px -10px ${langInfo?.glowColor || 'rgba(0,122,255,0.4)'}` }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShareOnGoogle}
                className={`w-full py-3 px-5 text-[15px] font-black rounded-xl text-white shadow-lg bg-gradient-to-r ${langInfo?.gradient || 'from-blue-500 to-indigo-600'} transition-all flex items-center justify-center gap-2 mb-3`}
              >
                <Check className="w-5 h-5 text-white" />
                <span>Copy review & Continue to Google</span>
              </motion.button>

              {/* Regenerate Trigger */}
              <button
                onClick={() => handleLanguageSelect(selectedLang)}
                className="text-[13px] text-slate-400 hover:text-[#007aff] font-bold text-center underline underline-offset-2 transition-colors mb-3 flex items-center justify-center gap-1"
              >
                🔄 Regenerate this review
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="text-center mt-auto pt-4 border-t border-slate-100">
        <p className="text-[12px] text-slate-400 mb-1">
          If you have concerns you wish to address privately,{' '}
          <a href={websiteUrl ? (websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`) : "https://doaguru.com"} target="_blank" rel="noopener noreferrer" className="text-[#007aff] cursor-pointer hover:underline font-bold">click here.</a>
        </p>
        <p className="text-[12px] text-slate-400 font-semibold">
          Powered by <a href={websiteUrl ? (websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`) : "https://doaguru.com"} target="_blank" rel="noopener noreferrer" className="text-[#007aff] font-bold hover:underline">{businessName || 'DOAGuru InfoSystems'} ⚡</a>
        </p>
      </div>
    </motion.div>
  );
};

export default AiReviewScreen;
