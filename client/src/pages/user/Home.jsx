import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';

import WelcomeScreen from '../../components/funnel/WelcomeScreen';
import RatingScreen from '../../components/funnel/RatingScreen';
import FeedbackScreen from '../../components/funnel/FeedbackScreen';
import KeywordScreen from '../../components/funnel/KeywordScreen';
import AiReviewScreen from '../../components/funnel/AiReviewScreen';
import ThankYouScreen from '../../components/funnel/ThankYouScreen';
import { reviewService, clientService } from '../../services/api';

const Home = () => {
  const navigate = useNavigate();
  const { clientId: routeClientId } = useParams();
  const searchParams = new URLSearchParams(window.location.search);
  // eslint-disable-next-line no-unused-vars
  const clientId = searchParams.get("clientId") || routeClientId || "admin";

  const [step, setStep] = useState('rating'); // rating, feedback, keywords, ai_review, thank_you
  const [rating, setRating] = useState(0);
  const [, setFeedback] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [clientProfile, setClientProfile] = useState(null);
  const [deactivatedInfo, setDeactivatedInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchProfile = async () => {
      const targetClientId = clientId || 'admin';
      try {
        setLoading(true);
        const profile = await clientService.getPublicClientProfile(targetClientId);
        console.log('[Home] clientProfile fetched:', profile);
        console.log('[Home] businessName:', profile?.businessName);
        setClientProfile(profile);
      } catch (err) {
        console.error("Error fetching client profile from database, using fallback defaults", err);
        if (err?.isDeactivated) {
          setDeactivatedInfo({
            message: err.message || "Your account is deactivated. Please contact Doaguru Support team.",
            supportNumber: err.supportNumber || "+91 70001 02121",
            businessName: err.businessName,
            logo: err.logo
          });
          return;
        }
        if (targetClientId === 'admin') {
          // Fallback if DB fetch for admin fails
          setClientProfile({
            businessName: 'DOAGuru InfoSystems',
            logo: '/uploads/logonew.png',
            primaryColor: '#3b82f6',
            secondaryColor: '#2dd4bf',
            questions: [
              {
                question: "Which service did you take?",
                options: ["Digital Marketing", "Web Development", "SEO Services", "Social Media Marketing", "Video Editing", "Graphic Designing"]
              },
              {
                question: "Why did you choose DOAGuru InfoSystems?",
                options: ["Great Communication", "On-time Delivery", "Professional Behavior", "Increased Sales/Leads", "Exceeded Expectations"]
              }
            ]
          });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [clientId]);

  const handleNext = () => setStep('rating');

  const handleRatingSelect = async (selectedRating) => {
    setRating(selectedRating);
    setTimeout(async () => {
      if (selectedRating < 4) {
        setStep('feedback');
      } else {
        setStep('keywords');
      }
    }, 400); // Small delay to let user see their selection
  };

  const handleFeedbackSubmit = async (data) => {
    try {
      await reviewService.submitReview({
        clientId,
        name: data.name,
        email: data.email,
        mobile: data.phone,
        rating: rating,
        message: data.message
      });
    } catch (e) {
      console.error("Failed to submit feedback", e);
    }
    setFeedback(data);
    setStep('thank_you');
  };

  const handleKeywordsSubmit = (selectedKeywords) => {
    setKeywords(selectedKeywords);
    setStep('ai_review');
  };

  const handlePostGoogle = async (generatedReviewText) => {
    try {
      // Track the positive click and SAVE the AI text in the database
      const res = await reviewService.submitReview({
        clientId,
        name: "Google Reviewer", // Or keep it simple
        rating: rating,
        message: generatedReviewText || "Redirected to Google Maps with AI Review"
      });

      if (res && res.url) {
        window.location.href = res.url;
      } else {
        navigate('/redirect');
      }
    } catch (e) {
      console.error("Failed to track positive review", e);
      navigate('/redirect');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (deactivatedInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center border border-red-100 flex flex-col items-center">
          {deactivatedInfo.logo ? (
            <img 
              src={deactivatedInfo.logo} 
              alt={deactivatedInfo.businessName || "Logo"} 
              className="w-20 h-20 object-contain mb-4 rounded-2xl p-1 bg-slate-50 border border-slate-100" 
            />
          ) : null}
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4 ring-8 ring-red-50/50">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Account Deactivated
          </h2>
          
          <p className="text-slate-600 text-sm mb-6 leading-relaxed">
            {deactivatedInfo.message}
          </p>

          <div className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex flex-col items-center gap-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Doaguru Support Helpline</span>
            <a 
              href={`tel:${deactivatedInfo.supportNumber.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 text-xl font-black text-blue-600 hover:text-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {deactivatedInfo.supportNumber}
            </a>
            
            <a 
              href={`https://wa.me/${deactivatedInfo.supportNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hello Doaguru Support, my review account is currently deactivated. Please assist.")}`}
              target="_blank"
              rel="noreferrer"
              className="w-full mt-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white md:bg-[#ffffff] font-sans px-0 md:px-4 py-0 md:py-8">
      <div className={`w-full ${step === 'ai_review' ? 'md:max-w-xl' : 'md:max-w-lg'} bg-white md:rounded-3xl md:shadow-xl p-6 md:p-8 relative z-10 min-h-screen md:min-h-[580px] flex flex-col transition-all duration-300`}>
        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <motion.div key="welcome" className="flex-1 flex flex-col justify-center">
              <WelcomeScreen onNext={handleNext} colors={{ primary: clientProfile?.primaryColor, secondary: clientProfile?.secondaryColor }} />
            </motion.div>
          )}

          {step === 'rating' && (
            <motion.div key="rating" className="flex-1 flex flex-col justify-center">
              <RatingScreen
                onRatingSelect={handleRatingSelect}
                logo={clientProfile?.logo}
                businessName={clientProfile?.businessName}
                websiteUrl={clientProfile?.websiteUrl}
                colors={{ primary: clientProfile?.primaryColor, secondary: clientProfile?.secondaryColor }}
              />
            </motion.div>
          )}

          {step === 'feedback' && (
            <motion.div key="feedback" className="flex-1 flex flex-col justify-center">
              <FeedbackScreen
                onSubmit={handleFeedbackSubmit}
                logo={clientProfile?.logo}
                colors={{ primary: clientProfile?.primaryColor, secondary: clientProfile?.secondaryColor }}
              />
            </motion.div>
          )}

          {step === 'keywords' && (
            <motion.div key="keywords" className="flex-1 flex flex-col justify-center">
              <KeywordScreen
                onNext={handleKeywordsSubmit}
                customQuestions={clientProfile?.questions}
                logo={clientProfile?.logo}
                businessName={clientProfile?.businessName}
                websiteUrl={clientProfile?.websiteUrl}
                colors={{ primary: clientProfile?.primaryColor, secondary: clientProfile?.secondaryColor }}
              />
            </motion.div>
          )}

          {step === 'ai_review' && (
            <motion.div key="ai_review" className="flex-1 flex flex-col justify-center">
              <AiReviewScreen
                selectedKeywords={keywords}
                onPostGoogle={handlePostGoogle}
                businessName={clientProfile?.businessName}
                clientKeywords={clientProfile?.keywords}
                websiteUrl={clientProfile?.websiteUrl}
                colors={{ primary: clientProfile?.primaryColor, secondary: clientProfile?.secondaryColor }}
              />
            </motion.div>
          )}

          {step === 'thank_you' && (
            <motion.div key="thank_you" className="flex-1 flex flex-col justify-center">
              <ThankYouScreen
                businessName={clientProfile?.businessName}
                websiteUrl={clientProfile?.websiteUrl}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;
