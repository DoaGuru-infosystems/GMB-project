import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useClientContext } from '../../context/ClientContext';
import {
  ArrowLeft, Save, Plus, Trash2, Palette, ListTodo,
  Building, User, Mail, Phone, Lock, Globe, MapPin,
  CheckCircle, Loader2, Sparkles, X
} from 'lucide-react';
import { useForm, useFieldArray } from 'react-hook-form';
import { BASE_URL } from '../../services/api';

const ClientsEdit = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const { clients, createClient, updateClient } = useClientContext();
  const [logoFile, setLogoFile] = useState(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [keywordTags, setKeywordTags] = useState([]);
  const [keywordInput, setKeywordInput] = useState('');

  const { register, handleSubmit, control, reset, watch, setValue, formState: { isSubmitting, errors } } = useForm({
    defaultValues: {
      name: '',
      businessName: '',
      email: '',
      mobile: '',
      password: '',
      placeId: '',
      websiteUrl: '',
      primaryColor: '#3b82f6',
      secondaryColor: '#2dd4bf',
      questions: [
        {
          question: 'Which service did you take?',
          options: ['Digital Marketing', 'Web Development', 'SEO Services']
        },
        {
          question: 'What did you like about the service?',
          options: ['Quality', 'Communication', 'Speed', 'Pricing']
        }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions"
  });

  useEffect(() => {
    if (clientId && clients.length > 0) {
      const client = clients.find(c => c.clientId === clientId);
      if (client) {
        setIsEdit(true);
        // keywords: always use as Array
        const kws = Array.isArray(client.keywords)
          ? client.keywords
          : (client.keywords ? client.keywords.split(',').map(k => k.trim()).filter(Boolean) : []);
        setKeywordTags(kws);
        reset({
          name: client.name || '',
          businessName: client.businessName || '',
          email: client.email || '',
          mobile: client.mobile || '',
          password: '',
          placeId: client.placeId || '',
          websiteUrl: client.websiteUrl || '',
          primaryColor: client.primaryColor || '#3b82f6',
          secondaryColor: client.secondaryColor || '#2dd4bf',
          questions: Array.isArray(client.questions) ? client.questions : [],
          logo: client.logo || ''
        });
      }
    }
  }, [clientId, clients, reset]);

  const onSubmit = async (data) => {
    try {
      const submitData = { ...data, keywords: keywordTags };
      if (isEdit) {
        await updateClient(clientId, submitData, logoFile, setUploadingLogo);
      } else {
        await createClient(submitData, logoFile, setUploadingLogo);
      }
      navigate('/admin/clients');
    } catch (err) {
      alert(`Failed to ${isEdit ? 'update' : 'create'} client: ` + err.message);
    }
  };

  // --- Keyword Tag Handlers ---
  const handleKeywordKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = keywordInput.trim().replace(/,$/, '');
      if (val && !keywordTags.includes(val)) {
        setKeywordTags([...keywordTags, val]);
      }
      setKeywordInput('');
    }
  };

  const removeKeywordTag = (idx) => {
    setKeywordTags(keywordTags.filter((_, i) => i !== idx));
  };

  const addOption = (qIndex) => {
    const currentQuestions = watch('questions');
    const question = currentQuestions[qIndex];
    if (!question.options) question.options = [];
    question.options.push('');
    setValue('questions', currentQuestions);
  };

  const removeOption = (qIndex, oIndex) => {
    const currentQuestions = watch('questions');
    currentQuestions[qIndex].options.splice(oIndex, 1);
    setValue('questions', currentQuestions);
  };


  return (
    <div className="max-w-5xl mx-auto pb-20 px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/clients')}
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 shadow-sm transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              {isEdit ? 'Edit Client Profile' : 'Configure New Client'}
            </h1>
            <p className="text-slate-500 font-medium">Define branding, credentials, and custom funnel flow.</p>
          </div>
        </div>

        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting || uploadingLogo}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:shadow-xl hover:bg-blue-700 transition-all disabled:opacity-70"
        >
          {isSubmitting || uploadingLogo ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          {isEdit ? 'Update Client' : 'Deploy Client'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Profile & Branding */}
        <div className="lg:col-span-2 flex flex-col gap-8">

          {/* Section 1: Basic Information */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                <Building size={20} />
              </div>
              <h2 className="text-xl font-black text-slate-900">Business Identity</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Business Name</label>
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    {...register('businessName', { required: 'Business name is required' })}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold"
                    placeholder="e.g. DoaGuru Infosystems"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Target Keywords</label>
                <div className="w-full min-h-[48px] pl-4 pr-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all flex flex-wrap gap-2 items-center">
                  <Sparkles className="text-slate-300 shrink-0" size={18} />
                  {keywordTags.map((tag, idx) => (
                    <span key={idx} className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-lg">
                      {tag}
                      <button type="button" onClick={() => removeKeywordTag(idx)} className="hover:text-red-500 transition-colors ml-0.5">
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={handleKeywordKeyDown}
                    onBlur={() => {
                      const val = keywordInput.trim();
                      if (val && !keywordTags.includes(val)) setKeywordTags([...keywordTags, val]);
                      setKeywordInput('');
                    }}
                    className="flex-1 min-w-[120px] bg-transparent outline-none font-bold text-sm placeholder-slate-300"
                    placeholder={keywordTags.length === 0 ? 'e.g. Best IT Company (Enter ya comma se add karo)' : 'Add more...'}
                  />
                </div>
                <p className="text-[10px] text-slate-400 ml-1">Enter ya comma dabakar keyword add karo</p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Contact Person</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold"
                    placeholder="e.g. John Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold"
                    placeholder="client@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    type="tel"
                    {...register('mobile', { required: 'Mobile is required' })}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold"
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Technical Configuration */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                <Globe size={20} />
              </div>
              <h2 className="text-xl font-black text-slate-900">Technical Config</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Google Place ID</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    {...register('placeId', { required: 'Place ID is required' })}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold"
                    placeholder="ChIJS..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Website URL (Optional)</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    {...register('websiteUrl')}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold"
                    placeholder="https://client-site.com"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                  {isEdit ? 'Enter Password' : 'Update Password'}
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input
                    type="password"
                    {...register('password', { required: !isEdit })}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-bold"
                    placeholder={isEdit ? "Enter new password" : "Minimum 6 characters"}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Custom Funnel Questions */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                  <ListTodo size={20} />
                </div>
                <h2 className="text-xl font-black text-slate-900">Custom Funnel Flow</h2>
              </div>
              <button
                type="button"
                onClick={() => append({ question: '', options: [''] })}
                className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-xl hover:bg-emerald-100 transition-all"
              >
                <Plus size={16} /> Add Question
              </button>
            </div>

            <div className="space-y-8">
              {fields.map((field, index) => (
                <div key={field.id} className="p-6 rounded-3xl bg-slate-50 border border-slate-200 relative animate-in fade-in slide-in-from-top-2">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Question #{index + 1}</label>
                      <input
                        {...register(`questions.${index}.question`)}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 outline-none focus:border-blue-500 font-bold"
                        placeholder="e.g. Which department did you visit?"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Predefined Options</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {watch(`questions.${index}.options`)?.map((opt, oIdx) => (
                          <div key={oIdx} className="flex items-center gap-2">
                            <input
                              {...register(`questions.${index}.options.${oIdx}`)}
                              className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-slate-200 outline-none focus:border-blue-500 font-medium text-sm"
                              placeholder={`Option ${oIdx + 1}`}
                            />
                            <button
                              type="button"
                              onClick={() => removeOption(index, oIdx)}
                              className="p-2 text-slate-300 hover:text-red-400"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addOption(index)}
                          className="flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-xl py-2 text-slate-400 hover:border-blue-300 hover:text-blue-500 transition-all text-xs font-bold"
                        >
                          <Plus size={14} /> Add Option
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {fields.length === 0 && (
                <div className="text-center py-10 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                  <p className="text-slate-400 font-bold text-sm">No custom questions added. Default flow will be used.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Branding & Theme */}
        <div className="space-y-8">

          {/* Logo Upload */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-50">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                <Sparkles size={20} />
              </div>
              <h2 className="text-xl font-black text-slate-900">Brand Logo</h2>
            </div>

            <div className="flex flex-col items-center gap-6">
              <div className="w-32 h-32 rounded-3xl border-2 border-dashed border-slate-200 flex items-center justify-center bg-slate-50 overflow-hidden relative group">
                {logoFile ? (
                  <img src={URL.createObjectURL(logoFile)} className="w-full h-full object-contain p-2" alt="New Logo" />
                ) : isEdit && watch('logo') ? (
                  <img src={`${BASE_URL}${watch('logo').startsWith('/') ? '' : '/'}${watch('logo')}`} className="w-full h-full object-contain p-2" alt="Existing" />
                ) : (
                  <div className="text-center p-4">
                    <Sparkles className="mx-auto text-slate-300 mb-2" size={32} />
                    <p className="text-[10px] font-black text-slate-400 uppercase">No Logo</p>
                  </div>
                )}

                <label className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <span className="text-white text-xs font-bold uppercase tracking-widest">Change</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setLogoFile(e.target.files[0])}
                    accept="image/*"
                  />
                </label>
              </div>
              <p className="text-xs text-slate-400 text-center font-medium">Upload a transparent PNG for the best appearance in the funnel.</p>
            </div>
          </div>

          {/* Theme Colors */}
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-50">
              <div className="p-2.5 rounded-xl bg-pink-50 text-pink-600">
                <Palette size={20} />
              </div>
              <h2 className="text-xl font-black text-slate-900">Color Theme</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Primary Color</label>
                  <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase">{watch('primaryColor')}</span>
                </div>
                <div className="flex gap-2 p-2 rounded-2xl bg-slate-50 border border-slate-100">
                  <input
                    type="color"
                    {...register('primaryColor')}
                    className="w-full h-12 rounded-xl cursor-pointer bg-transparent border-none"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Secondary Color</label>
                  <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md uppercase">{watch('secondaryColor')}</span>
                </div>
                <div className="flex gap-2 p-2 rounded-2xl bg-slate-50 border border-slate-100">
                  <input
                    type="color"
                    {...register('secondaryColor')}
                    className="w-full h-12 rounded-xl cursor-pointer bg-transparent border-none"
                  />
                </div>
              </div>

              {/* Preview Box */}
              <div className="mt-8 p-6 rounded-3xl border border-slate-100 bg-slate-50 flex flex-col gap-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Live Theme Preview</p>
                <div className="flex flex-col gap-2">
                  <div className="h-10 rounded-xl shadow-sm flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: watch('primaryColor') }}>
                    Primary Button
                  </div>
                  <div className="h-10 rounded-xl shadow-sm flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: watch('secondaryColor') }}>
                    Secondary Button
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsEdit;
