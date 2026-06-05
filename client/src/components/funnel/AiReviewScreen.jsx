import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { reviewService } from '../../services/api';
import { Star, Sparkles, ChevronRight, Check, Copy } from 'lucide-react';

// Custom, crisp Circular SVG Flags and Icons to look highly professional
const EnglishFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" className="w-12 h-12 rounded-full shadow-sm border border-slate-200/50 shrink-0">
    <clipPath id="uk-circle">
      <circle cx="20" cy="20" r="20" />
    </clipPath>
    <g clipPath="url(#uk-circle)">
      {/* Blue background */}
      <rect width="40" height="40" fill="#012169" />
      {/* White diagonals */}
      <line x1="0" y1="0" x2="40" y2="40" stroke="#fff" strokeWidth="4.8" />
      <line x1="40" y1="0" x2="0" y2="40" stroke="#fff" strokeWidth="4.8" />
      {/* Red diagonals */}
      <line x1="0" y1="0" x2="40" y2="40" stroke="#C8102E" strokeWidth="1.6" />
      <line x1="40" y1="0" x2="0" y2="40" stroke="#C8102E" strokeWidth="1.6" />
      {/* White cross */}
      <rect x="16" y="0" width="8" height="40" fill="#fff" />
      <rect x="0" y="16" width="40" height="8" fill="#fff" />
      {/* Red cross */}
      <rect x="18" y="0" width="4" height="40" fill="#C8102E" />
      <rect x="0" y="18" width="40" height="4" fill="#C8102E" />
    </g>
  </svg>
);

const HindiFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" className="w-12 h-12 rounded-full shadow-sm border border-slate-200/50 shrink-0">
    <clipPath id="in-circle">
      <circle cx="20" cy="20" r="20" />
    </clipPath>
    <g clipPath="url(#in-circle)">
      {/* Saffron */}
      <rect width="40" height="13.3" fill="#FF9933" />
      {/* White */}
      <rect y="13.3" width="40" height="13.3" fill="#FFFFFF" />
      {/* Green */}
      <rect y="26.6" width="40" height="13.4" fill="#138808" />
      {/* Chakra */}
      <circle cx="20" cy="20" r="4" fill="none" stroke="#000080" strokeWidth="0.8" />
      <circle cx="20" cy="20" r="0.8" fill="#000080" />
      <path d="M20 16v8M16 20h8M17.2 17.2l5.6 5.6M22.8 17.2l-5.6 5.6" stroke="#000080" strokeWidth="0.4" />
    </g>
  </svg>
);

const HinglishIcon = () => (
  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-sm shrink-0 border border-slate-200/50">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5.5 h-5.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4-4a1 1 0 0 0-1.4-1.4L13 17" />
      <path d="m18 10 1-1A3.13 3.13 0 1 0 14.5 4.5L13 6" />
      <path d="m14 13-1.5-1.5" />
      <path d="m9 8-5 5a3.13 3.13 0 1 0 4.4 4.4L13 13" />
    </svg>
  </div>
);

const LANGUAGES = [
  {
    key: 'english',
    label: 'English',
    icon: <EnglishFlag />,
    description: 'Review in English',
    colorClass: 'border-slate-200/80 hover:border-blue-400 hover:bg-blue-50/10',
    arrowClass: 'group-hover:bg-blue-500 group-hover:text-white',
    ring: 'ring-blue-400',
    gradient: 'from-blue-500 to-indigo-600',
    glowColor: 'rgba(37, 99, 235, 0.15)'
  },
  {
    key: 'hindi',
    label: 'हिंदी',
    icon: <HindiFlag />,
    description: 'हिंदी में रिव्यू',
    colorClass: 'border-slate-200/80 hover:border-orange-400 hover:bg-orange-50/10',
    arrowClass: 'group-hover:bg-orange-500 group-hover:text-white',
    ring: 'ring-orange-400',
    gradient: 'from-orange-500 to-amber-500',
    glowColor: 'rgba(249, 115, 22, 0.15)'
  },
  {
    key: 'hinglish',
    label: 'Hinglish',
    icon: <HinglishIcon />,
    description: 'Hindi + English Mix',
    colorClass: 'border-slate-200/80 hover:border-emerald-400 hover:bg-emerald-50/10',
    arrowClass: 'group-hover:bg-emerald-500 group-hover:text-white',
    ring: 'ring-emerald-400',
    gradient: 'from-emerald-500 to-teal-500',
    glowColor: 'rgba(16, 185, 129, 0.15)'
  },
];

const LOADING_STEPS = [
  "Analyzing your keywords...",
  "Selecting the perfect local vocabulary...",
  "Polishing natural human-like flow...",
  "Removing artificial AI markers...",
  "Formatting review style..."
];

const AiReviewScreen = ({ selectedKeywords, onPostGoogle, businessName, clientKeywords }) => {
  const [phase, setPhase] = useState('select'); // 'select' | 'generating' | 'ready'
  const [selectedLang, setSelectedLang] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [copied, setCopied] = useState(false);

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
      const contextKeywords = [clientKeywords, ...selectedKeywords].filter(Boolean).join(', ');
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

  const handleCopyOnly = async () => {
    await copyToClipboard();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareOnGoogle = async () => {
    await copyToClipboard();
    onPostGoogle(reviewText);
  };

  const handleRegenerateAnother = () => {
    setPhase('select');
    setSelectedLang(null);
    setReviewText('');
    setCopied(false);
  };

  const langInfo = LANGUAGES.find(l => l.key === selectedLang);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col flex-1 pt-2 pb-4"
    >
      {/* Header */}
      <div className="text-left px-2 mb-6">
        <h2 className="text-[24px] font-black text-[#0f172a] leading-tight mb-1.5 flex items-center gap-2">
          <span>Share Your Experience</span>
          <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
        </h2>
        <p className="text-slate-500 font-medium text-[15px] leading-relaxed">
          {phase === 'select'
            ? 'Choose a language for your personalized review.'
            : phase === 'generating'
            ? 'AI is crafting your authentic review...'
            : 'Your premium review is ready!'}
        </p>
      </div>

      <div className="flex-1 flex flex-col px-2">
        <AnimatePresence mode="wait">

          {/* ── PHASE: Language Selection (3-Column Grid) ── */}
          {phase === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col gap-6"
            >
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">
                Select language option below
              </p>

              <div className="grid grid-cols-3 gap-4">
                {LANGUAGES.map((lang, i) => (
                  <motion.button
                    key={lang.key}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, type: "spring", stiffness: 120 }}
                    whileHover={{ 
                      scale: 1.04, 
                      boxShadow: `0 12px 24px -10px ${lang.glowColor}`,
                      y: -4
                    }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleLanguageSelect(lang.key)}
                    className={`flex flex-col items-center text-center p-4 rounded-2xl border bg-white shadow-sm transition-all group ${lang.colorClass}`}
                  >
                    {/* Circular Flag / Icon */}
                    <div className="mb-3 transform group-hover:scale-110 transition-transform duration-300">
                      {lang.icon}
                    </div>

                    <h3 className="text-[16px] font-black text-slate-800 leading-none mb-1 group-hover:text-slate-900 transition-colors">
                      {lang.label}
                    </h3>
                    
                    <p className="text-[11px] text-slate-400 font-semibold leading-tight mb-4 flex-1">
                      {lang.description}
                    </p>

                    {/* Minimal Arrow Indicator */}
                    <div className={`w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 transition-all shrink-0 ${lang.arrowClass}`}>
                      <ChevronRight className="w-4 h-4 transition-colors" />
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
              <div className="relative w-28 h-28 flex items-center justify-center mb-8">
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
                  className="w-16 h-16 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl flex items-center justify-center z-10 border border-white/60 overflow-hidden"
                >
                  {langInfo?.key === 'english' && <div className="scale-110"><EnglishFlag /></div>}
                  {langInfo?.key === 'hindi' && <div className="scale-110"><HindiFlag /></div>}
                  {langInfo?.key === 'hinglish' && <div className="scale-100"><HinglishIcon /></div>}
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
                  className="text-[#1a2b3c] text-[16px] font-extrabold tracking-tight"
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
              <div className="flex items-center justify-between mb-4">
                <span
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[12px] font-bold text-slate-700 bg-slate-100 border border-slate-200/80 shadow-sm"
                >
                  {langInfo?.key === 'english' && <span className="scale-75 origin-left w-9 h-6 overflow-hidden flex items-center"><EnglishFlag /></span>}
                  {langInfo?.key === 'hindi' && <span className="scale-75 origin-left w-9 h-6 overflow-hidden flex items-center"><HindiFlag /></span>}
                  {langInfo?.key === 'hinglish' && <span className="scale-75 origin-left w-9 h-6 overflow-hidden flex items-center"><HinglishIcon /></span>}
                  <span className="-ml-2">{langInfo?.label}</span>
                </span>
                
                <button
                  onClick={handleRegenerateAnother}
                  className="text-[12px] text-slate-400 hover:text-[#007aff] font-bold underline underline-offset-2 transition-colors"
                >
                  Change language
                </button>
              </div>

              <p className="text-slate-500 text-[13px] mb-4 leading-relaxed font-semibold">
                Based on your selections, we have crafted this review for you. You can edit it if you wish, then copy it to post on Google.
              </p>

              {/* Premium Review Textarea Wrapper */}
              <div className={`w-full border rounded-2xl bg-slate-50/40 border-slate-200 px-4 py-4 pb-12 mb-5 relative transition-all ring-4 ring-slate-100 focus-within:border-${langInfo?.key === 'english' ? 'blue' : langInfo?.key === 'hindi' ? 'orange' : 'emerald'}-400`}>
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
                  className="w-full text-[15px] text-[#1e293b] font-semibold leading-relaxed bg-transparent outline-none resize-none overflow-hidden"
                  placeholder="Your review will appear here..."
                />
                
                {/* Floating Clean Copy Button */}
                <button
                  onClick={handleCopyOnly}
                  className="absolute bottom-3 right-3 py-1.5 px-3 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all shadow-sm flex items-center gap-1.5 text-[12px] font-bold active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Premium Copy/Google CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: `0 12px 24px -10px ${langInfo?.glowColor || 'rgba(0,122,255,0.4)'}` }}
                whileTap={{ scale: 0.98 }}
                onClick={handleShareOnGoogle}
                className={`w-full py-4 px-6 text-[16px] font-black rounded-2xl text-white shadow-md bg-gradient-to-r ${langInfo?.gradient || 'from-blue-500 to-indigo-600'} transition-all flex items-center justify-center gap-2 mb-4`}
              >
                <Check className="w-5 h-5 text-white" />
                <span>Copy review & Open Google Maps</span>
              </motion.button>

              {/* Regenerate Trigger */}
              <button
                onClick={() => handleLanguageSelect(selectedLang)}
                className="text-[13px] text-slate-400 hover:text-[#007aff] font-bold text-center underline underline-offset-2 transition-colors mb-4 flex items-center justify-center gap-1"
              >
                🔄 Regenerate this review
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="text-center mt-auto pt-6 border-t border-slate-100">
        <p className="text-[13px] text-slate-400 mb-1">
          If you have concerns you wish to address privately,{' '}
          <a href="https://doaguru.com" target="_blank" rel="noopener noreferrer" className="text-[#007aff] cursor-pointer hover:underline font-bold">click here.</a>
        </p>
        <p className="text-[13px] text-slate-400 font-semibold">
          Powered by <a href="https://doaguru.com" target="_blank" rel="noopener noreferrer" className="text-[#007aff] font-bold hover:underline">DOAGuru InfoSystems ⚡</a>
        </p>
      </div>
    </motion.div>
  );
};

export default AiReviewScreen;
