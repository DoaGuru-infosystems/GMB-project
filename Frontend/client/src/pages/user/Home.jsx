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

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await clientService.getPublicClientProfile(clientId);
        setClientProfile(profile);
        // Apply custom colors to CSS variables if needed, or pass as props
      } catch (err) {
        console.error("Error fetching client profile", err);
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-white md:bg-[#ffffff] font-sans px-0 md:px-4 py-0 md:py-8">
      <div className="w-full md:max-w-lg bg-white md:rounded-3xl md:shadow-xl p-6 md:p-8 relative z-10 min-h-screen md:min-h-[580px] flex flex-col">
        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <motion.div key="welcome" className="flex-1 flex flex-col justify-center">
              <WelcomeScreen onNext={handleNext} colors={{ primary: clientProfile?.primaryColor, secondary: clientProfile?.secondaryColor }} />
            </motion.div>
          )}

          {step === 'rating' && (
            <motion.div key="rating" className="flex-1 flex flex-col justify-center">
              <RatingScreen onRatingSelect={handleRatingSelect} colors={{ primary: clientProfile?.primaryColor, secondary: clientProfile?.secondaryColor }} />
            </motion.div>
          )}

          {step === 'feedback' && (
            <motion.div key="feedback" className="flex-1 flex flex-col justify-center">
              <FeedbackScreen onSubmit={handleFeedbackSubmit} colors={{ primary: clientProfile?.primaryColor, secondary: clientProfile?.secondaryColor }} />
            </motion.div>
          )}

          {step === 'keywords' && (
            <motion.div key="keywords" className="flex-1 flex flex-col justify-center">
              <KeywordScreen 
                onNext={handleKeywordsSubmit} 
                customQuestions={clientProfile?.questions}
                logo={clientProfile?.logo}
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
                colors={{ primary: clientProfile?.primaryColor, secondary: clientProfile?.secondaryColor }} 
              />
            </motion.div>
          )}

          {step === 'thank_you' && (
            <motion.div key="thank_you" className="flex-1 flex flex-col justify-center">
              <ThankYouScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;
