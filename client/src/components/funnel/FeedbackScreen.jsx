import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { User, Phone, Mail, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import logo from '../../assets/logonew.png';

import { BASE_URL } from '../../services/api';

const FeedbackScreen = ({ onSubmit, logo: clientLogo }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  const isValidLogo = clientLogo && 
                      clientLogo !== 'null' && 
                      clientLogo !== 'undefined' && 
                      clientLogo !== '' && 
                      !clientLogo.endsWith('undefined') && 
                      !clientLogo.endsWith('null');

  const logoSrc = isValidLogo 
    ? (clientLogo.startsWith('http') ? clientLogo : `${BASE_URL}${clientLogo.startsWith('/') ? '' : '/'}${clientLogo}`) 
    : logo;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col flex-1"
    >
      <div className="flex justify-center mb-8">
        <img src={logoSrc} alt="DOAGuru Logo" className="h-28 w-auto object-contain" />
      </div>

      <div className="space-y-3 mb-6 text-left px-2">
        <h2 className="text-[22px] font-bold text-[#1a2b3c] leading-tight">
          We strive for 100% customer satisfaction
        </h2>
        <p className="text-slate-500 font-normal text-[15px]">
          If we fell short, please let us know so we can address your concerns.
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 px-2">
        <div>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-lg text-[15px] outline-none transition-all placeholder:text-slate-300 font-medium text-slate-800"
            placeholder="Name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-lg text-[15px] outline-none transition-all placeholder:text-slate-300 font-medium text-slate-800"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <input
            type="tel"
            {...register("phone", {
              pattern: { value: /^[6-9]\d{9}$/, message: "Invalid 10-digit number" },
              onChange: (e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
              }
            })}
            maxLength={10}
            className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-lg text-[15px] outline-none transition-all placeholder:text-slate-300 font-medium text-slate-800"
            placeholder="Phone"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <textarea
            {...register("message", { required: "Message is required" })}
            className="w-full px-4 py-3 bg-white border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 rounded-lg text-[15px] outline-none transition-all placeholder:text-slate-300 font-medium text-slate-800 min-h-[120px] resize-none"
            placeholder="Message"
          />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full mt-4 py-4 px-6 text-[16px] font-bold rounded-lg bg-[#f02d3a] text-white transition-all flex items-center justify-center"
        >
          Send Message
        </motion.button>
      </form>

      <div className="mt-8 text-center pb-4 px-2">
        <p className="text-[13px] text-slate-500 text-left">
          If you do not wish to address your concerns right now, you may close this window.
        </p>
      </div>
    </motion.div>
  );
};

export default FeedbackScreen;
