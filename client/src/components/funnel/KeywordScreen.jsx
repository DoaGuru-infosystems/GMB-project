import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logonew.png';

const SERVICES_DATA = {
  "Digital Marketing": [
    "Graphic Designing",
    "Video Editing",
    "Video Shooting",
    "Social Media Marketing",
    "Content Writing"
  ],
  "Web Development": [
    "UI/UX Design",
    "Frontend Development",
    "Backend Development",
    "E-commerce Solution",
    "Website Maintenance"
  ],
  "SEO Services": [
    "On-Page SEO",
    "Off-Page SEO",
    "Keyword Research",
    "Technical SEO",
    "Local SEO"
  ]
};

const IMPACTS = [
  "Increased Sales/Leads",
  "Better Brand Visibility",
  "On-time Delivery",
  "Professional Behavior",
  "Great Communication",
  "Exceeded Expectations"
];

const KeywordScreen = ({ onNext, customQuestions, logo: clientLogo, colors }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // Use default color if not provided
  const primaryColor = colors?.primary || '#007aff';
  const secondaryColor = colors?.secondary || '#2dd4bf';

  // If no custom questions, use the old static logic (backward compatibility or default)
  const isCustomMode = Array.isArray(customQuestions) && customQuestions.length > 0;

  const [selectedService, setSelectedService] = useState('');
  const [selectedSubServices, setSelectedSubServices] = useState([]);
  const [selectedImpacts, setSelectedImpacts] = useState([]);
  const [customServicesList, setCustomServicesList] = useState([]);
  const [customSubServicesList, setCustomSubServicesList] = useState([]);
  const [customImpactsList, setCustomImpactsList] = useState([]);

  const [addingCustom, setAddingCustom] = useState(null); // 'service', 'sub', 'impact'
  const [customInputText, setCustomInputText] = useState('');

  const bottomRef = useRef(null);

  // Auto-scroll when new sections appear
  useEffect(() => {
    if (selectedService || selectedSubServices.length > 0) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 300);
    }
  }, [selectedService, selectedSubServices]);

  const toggleSubService = (keyword) => {
    setSelectedSubServices(prev =>
      prev.includes(keyword) ? prev.filter(k => k !== keyword) : [...prev, keyword]
    );
  };

  const toggleImpact = (keyword) => {
    setSelectedImpacts(prev =>
      prev.includes(keyword) ? prev.filter(k => k !== keyword) : [...prev, keyword]
    );
  };

  const handleServiceSelect = (service) => {
    if (selectedService !== service) {
      setSelectedService(service);
      setSelectedSubServices([]); // Reset sub-services when main service changes
    }
  };

  const handleAddCustom = (type) => {
    const val = customInputText.trim();
    if (!val) {
      setAddingCustom(null);
      return;
    }

    if (type === 'service') {
      if (!Object.keys(SERVICES_DATA).includes(val) && !customServicesList.includes(val)) {
        setCustomServicesList(prev => [...prev, val]);
      }
      handleServiceSelect(val);
    } else if (type === 'sub') {
      if (!(SERVICES_DATA[selectedService] || []).includes(val) && !customSubServicesList.includes(val)) {
        setCustomSubServicesList(prev => [...prev, val]);
      }
      if (!selectedSubServices.includes(val)) toggleSubService(val);
    } else if (type === 'impact') {
      if (!IMPACTS.includes(val) && !customImpactsList.includes(val)) {
        setCustomImpactsList(prev => [...prev, val]);
      }
      if (!selectedImpacts.includes(val)) toggleImpact(val);
    }

    setCustomInputText('');
    setAddingCustom(null);
  };

  const renderAddButton = (type) => {
    if (addingCustom === type) {
      return (
        <div className="flex items-center gap-2 bg-white border border-blue-500 rounded-xl p-1 shadow-sm w-full max-w-sm">
          <input
            autoFocus
            type="text"
            value={customInputText}
            onChange={e => setCustomInputText(e.target.value)}
            placeholder="Type your own..."
            className="flex-1 px-3 py-1.5 text-[14px] outline-none bg-transparent"
            onKeyDown={e => {
              if (e.key === 'Enter') handleAddCustom(type);
            }}
          />
          <button
            onClick={() => handleAddCustom(type)}
            className="px-3 py-1.5 bg-[#007aff] text-white rounded-lg text-sm font-bold"
          >Add</button>
          <button onClick={() => { setCustomInputText(''); setAddingCustom(null); }} className="px-2 text-slate-400 font-bold hover:text-slate-600">✕</button>
        </div>
      );
    }

    return (
      <button
        onClick={() => { setAddingCustom(type); setCustomInputText(''); }}
        className="px-3 py-2.5 rounded-xl text-[14px] font-bold text-[#007aff] bg-blue-50 hover:bg-blue-100 border border-blue-100 border-dashed flex items-center gap-1.5 transition-all"
      >
        <span className="text-[16px] leading-none">+</span> Add Custom
      </button>
    );
  };

  const handleGenerate = () => {
    let allKeywords = [];

    if (isCustomMode) {
      // Collect all selected options from all questions
      Object.values(selectedAnswers).forEach(options => {
        allKeywords = [...allKeywords, ...options];
      });
    } else {
      allKeywords = [
        selectedService,
        ...selectedSubServices,
        ...selectedImpacts
      ].filter(Boolean);
    }

    onNext(allKeywords);
  };

  const toggleCustomAnswer = (qIndex, option) => {
    setSelectedAnswers(prev => {
      const current = prev[qIndex] || [];
      if (current.includes(option)) {
        return { ...prev, [qIndex]: current.filter(o => o !== option) };
      } else {
        return { ...prev, [qIndex]: [...current, option] };
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col flex-1 pb-4"
    >
      <div className="flex justify-center mb-6 pt-2">
        <img
          src={clientLogo ? (clientLogo.startsWith('http') ? clientLogo : `http://localhost:5000${clientLogo.startsWith('/') ? '' : '/'}${clientLogo}`) : logo}
          alt="Business Logo"
          className="h-28 w-auto object-contain"
        />
      </div>

      <div className="space-y-2 mb-6 text-left px-2">
        <h2 className="text-[22px] font-bold text-[#1a2b3c] leading-tight">
          Share Your Experience
        </h2>
        <p className="text-slate-500 font-normal text-[15px] leading-relaxed">
          Help us understand your experience better by answering a few quick questions.
        </p>
      </div>

      <div className="flex-1 px-2 space-y-8 overflow-y-auto custom-scrollbar pb-6">
        {isCustomMode ? (
          // Dynamic Custom Questions Flow
          <div className="space-y-10">
            {customQuestions.map((q, qIdx) => (
              <motion.div
                key={qIdx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: qIdx * 0.1 }}
                className="space-y-4"
              >
                <h3 className="text-[17px] font-black text-slate-900 flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] text-white" style={{ backgroundColor: primaryColor }}>
                    {qIdx + 1}
                  </span>
                  {q.question}
                </h3>
                <div className="flex flex-wrap gap-2.5 pl-9">
                  {q.options?.map((opt, oIdx) => {
                    const isSelected = selectedAnswers[qIdx]?.includes(opt);
                    return (
                      <button
                        key={oIdx}
                        onClick={() => toggleCustomAnswer(qIdx, opt)}
                        className={`px-4 py-2.5 rounded-xl text-[14px] font-bold transition-all border ${isSelected
                            ? 'text-white shadow-lg scale-105'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        style={{
                          backgroundColor: isSelected ? primaryColor : 'white',
                          borderColor: isSelected ? primaryColor : '#e2e8f0'
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          // Legacy/Default Logic
          <>
            {/* Step 1: Main Service */}
            <div className="space-y-4">
              <h3 className="text-[17px] font-bold text-slate-900">
                1. Which service did you take?
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {[...Object.keys(SERVICES_DATA), ...customServicesList].map((service) => (
                  <button
                    key={service}
                    onClick={() => handleServiceSelect(service)}
                    className={`px-4 py-2.5 rounded-xl text-[14px] font-semibold transition-all ${selectedService === service
                        ? 'bg-[#007aff] text-white shadow-md'
                        : 'bg-[#f8f9fa] text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    style={selectedService === service ? { backgroundColor: primaryColor } : {}}
                  >
                    {service}
                  </button>
                ))}
                {renderAddButton('service')}
              </div>
            </div>

            {/* Step 2: Sub-services */}
            <AnimatePresence>
              {selectedService && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 overflow-hidden"
                >
                  <div className="h-[1px] w-full bg-slate-100 my-2"></div>
                  <h3 className="text-[17px] font-bold text-slate-900">
                    2. What did you like about {selectedService}?
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {[...(SERVICES_DATA[selectedService] || []), ...customSubServicesList].map((sub) => {
                      const isSelected = selectedSubServices.includes(sub);
                      return (
                        <button
                          key={sub}
                          onClick={() => toggleSubService(sub)}
                          className={`px-4 py-2.5 rounded-xl text-[14px] font-semibold transition-all ${isSelected
                              ? 'bg-[#007aff] text-white shadow-md'
                              : 'bg-[#f8f9fa] text-slate-700 border border-slate-200 hover:bg-slate-100'
                            }`}
                          style={isSelected ? { backgroundColor: primaryColor } : {}}
                        >
                          {sub}
                        </button>
                      );
                    })}
                    {renderAddButton('sub')}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 3: Overall Impact */}
            <AnimatePresence>
              {selectedSubServices.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 overflow-hidden"
                >
                  <div className="h-[1px] w-full bg-slate-100 my-2"></div>
                  <h3 className="text-[17px] font-bold text-slate-900">
                    3. How would you describe the overall impact?
                  </h3>
                  <div className="flex flex-wrap gap-2.5 mb-4">
                    {[...IMPACTS, ...customImpactsList].map((impact) => {
                      const isSelected = selectedImpacts.includes(impact);
                      return (
                        <button
                          key={impact}
                          onClick={() => toggleImpact(impact)}
                          className={`px-4 py-2.5 rounded-xl text-[14px] font-semibold transition-all ${isSelected
                              ? 'bg-[#007aff] text-white shadow-md'
                              : 'bg-[#f8f9fa] text-slate-700 border border-slate-200 hover:bg-slate-100'
                            }`}
                          style={isSelected ? { backgroundColor: primaryColor } : {}}
                        >
                          {impact}
                        </button>
                      );
                    })}
                    {renderAddButton('impact')}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* Invisible div to scroll to */}
        <div ref={bottomRef} className="h-2"></div>
      </div>

      <div className="mt-auto px-2 pt-4">
        <motion.button
          whileHover={{ scale: (isCustomMode || selectedService) ? 1.02 : 1 }}
          whileTap={{ scale: (isCustomMode || selectedService) ? 0.98 : 1 }}
          onClick={handleGenerate}
          disabled={isCustomMode ? Object.keys(selectedAnswers).length === 0 : !selectedService}
          className={`w-full py-4 px-6 text-[16px] font-black rounded-2xl transition-all flex items-center justify-center mb-6 shadow-xl shadow-blue-500/10 ${(isCustomMode ? Object.keys(selectedAnswers).length > 0 : selectedService)
              ? 'text-white'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          style={{
            backgroundColor: (isCustomMode ? Object.keys(selectedAnswers).length > 0 : selectedService) ? primaryColor : '#f1f5f9'
          }}
        >
          Generate Review
        </motion.button>

        <div className="text-center">
          <p className="text-[13px] text-slate-500">
            If you have concerns you wish to address privately, <span className="text-[#007aff] cursor-pointer hover:underline">click here.</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default KeywordScreen;
