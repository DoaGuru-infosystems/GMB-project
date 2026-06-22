import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useClientContext } from '../../context/ClientContext';
import {
  ArrowLeft, Save, Plus, Trash2, Palette, ListTodo,
  Building, User, Mail, Phone, Lock, Globe, MapPin,
  CheckCircle, Loader2, Sparkles, XCircle, Edit2
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
  const [keywordList, setKeywordList] = useState([]);
  const [newKeyword, setNewKeyword] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingValue, setEditingValue] = useState('');

  const { register, handleSubmit, control, reset, watch, setValue, formState: { isSubmitting, errors } } = useForm({
    defaultValues: {
      name: '',
      businessName: '',
      keywords: '',
      email: '',
      mobile: '',
      password: '',
      placeId: '',
      websiteUrl: '',
      primaryColor: '#3b82f6',
      secondaryColor: '#2dd4bf',
      logo: '',
      questions: [
        {
          question: 'Which service did you take?',
          options: ['Digital Marketing', 'Web Development', 'SEO Services']
        }
      ]
    }
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "questions"
  });

  useEffect(() => {
    if (clientId && clients.length > 0) {
      const client = clients.find(c => c.clientId === clientId);
      if (client) {
        setIsEdit(true);
        const list = client.keywords
          ? client.keywords.split(',').map(k => k.trim()).filter(Boolean)
          : [];
        setKeywordList(list);
        reset({
          name: client.name || '',
          businessName: client.businessName || '',
          email: client.email || '',
          mobile: client.mobile || '',
          password: '', // Empty password for edit
          placeId: client.placeId || '',
          websiteUrl: client.websiteUrl || '',
          primaryColor: client.primaryColor || '#3b82f6',
          secondaryColor: client.secondaryColor || '#2dd4bf',
          logo: client.logo || '',
          questions: Array.isArray(client.questions) ? client.questions : []
        });
      }
    }
  }, [clientId, clients, reset]);

  const addKeyword = (e) => {
    if (e) e.preventDefault();
    const trimmed = newKeyword.trim();
    if (trimmed && !keywordList.includes(trimmed)) {
      setKeywordList([...keywordList, trimmed]);
      setNewKeyword('');
    }
  };

  const removeKeyword = (indexToRemove) => {
    setKeywordList(keywordList.filter((_, idx) => idx !== indexToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addKeyword(e);
    }
  };

  const startEditing = (index, value) => {
    setEditingIndex(index);
    setEditingValue(value);
  };

  const saveEditing = (index) => {
    const trimmed = editingValue.trim();
    if (trimmed) {
      const updatedList = [...keywordList];
      updatedList[index] = trimmed;
      setKeywordList(updatedList);
      setEditingIndex(-1);
      setEditingValue('');
    }
  };

  const cancelEditing = () => {
    setEditingIndex(-1);
    setEditingValue('');
  };

  const handleEditKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveEditing(index);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelEditing();
    }
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        keywords: keywordList.join(', ')
      };
      if (isEdit) {
        await updateClient(clientId, payload, logoFile, setUploadingLogo);
      } else {
        await createClient(payload, logoFile, setUploadingLogo);
      }
      navigate('/admin/clients');
    } catch (err) {
      alert(`Failed to ${isEdit ? 'update' : 'create'} client: ` + err.message);
    }
  };

  const addOption = (qIndex) => {
    const currentQuestions = watch('questions');
    const question = currentQuestions[qIndex];
    const updatedOptions = question.options ? [...question.options, ''] : [''];
    update(qIndex, {
      ...question,
      options: updatedOptions
    });
  };

  const removeOption = (qIndex, oIndex) => {
    const currentQuestions = watch('questions');
    const question = currentQuestions[qIndex];
    if (question.options) {
      const updatedOptions = question.options.filter((_, idx) => idx !== oIndex);
      update(qIndex, {
        ...question,
        options: updatedOptions
      });
    }
  };


  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-10 font-sans">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/clients')}
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 shadow-sm transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-2.5 inline-block">Configuration</span>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 bg-gradient-to-r from-slate-900 to-indigo-950 bg-clip-text text-transparent mb-1">
              {isEdit ? 'Edit Client Profile' : 'Configure New Client'}
            </h1>
            <p className="text-slate-500 text-xs font-semibold">Define branding, credentials, and custom funnel flow.</p>
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
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <Building className="text-slate-500 shrink-0" size={20} />
              <h2 className="text-base font-bold text-slate-800">Business & Contact Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 ml-0.5">Business Name</label>
                <input
                  {...register('businessName', { required: 'Business name is required' })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all font-semibold shadow-sm"
                  placeholder="Enter business name (e.g. DoaGuru Infosystems)"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 ml-0.5">Contact Person</label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all font-semibold shadow-sm"
                  placeholder="Enter contact person name (e.g. John Doe)"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 ml-0.5">Email Address</label>
                <input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all font-semibold shadow-sm"
                  placeholder="Enter email address (e.g. client@example.com)"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 ml-0.5">Mobile Number</label>
                <input
                  type="tel"
                  {...register('mobile', {
                    required: 'Mobile is required',
                    maxLength: { value: 15, message: "Maximum 15 digits allowed" },
                    pattern: {
                      value: /^\+?[0-9]+$/,
                      message: "Only numbers are allowed"
                    },
                    onChange: (e) => {
                      let val = e.target.value;
                      if (val.startsWith('+')) {
                        val = '+' + val.slice(1).replace(/[^0-9]/g, '');
                      } else {
                        val = val.replace(/[^0-9]/g, '');
                      }
                      e.target.value = val.slice(0, 15);
                    }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all font-semibold shadow-sm"
                  placeholder="Enter mobile number (e.g. +91 7440992424)"
                />
                {errors.mobile && (
                  <span className="text-red-500 text-[10px] font-bold uppercase mt-1 ml-0.5 block">
                    {errors.mobile.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Section: Target Keywords */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <Sparkles className="text-slate-500 shrink-0" size={20} />
              <h2 className="text-base font-bold text-slate-800">Target Keywords</h2>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-semibold text-slate-600 ml-0.5">Review Keywords for AI Review Generation</label>

              {/* Standalone Input Row */}
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all font-semibold shadow-sm"
                    placeholder="Enter target keyword"
                  />
                </div>
                <button
                  type="button"
                  onClick={addKeyword}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition-all flex items-center justify-center shrink-0 hover:scale-[1.02] active:scale-[0.98] font-bold gap-2 text-sm"
                  title="Add Keyword"
                >
                  <Plus size={16} className="stroke-[3]" />
                  <span>Add</span>
                </button>
              </div>

              {/* Wrapping Inline Chips List */}
              {keywordList.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200 max-h-[200px] overflow-y-auto">
                  {keywordList.map((kw, idx) => {
                    const isEditing = editingIndex === idx;
                    const accentColors = [
                      'bg-blue-500',
                      'bg-teal-500',
                      'bg-indigo-500',
                      'bg-pink-500',
                      'bg-amber-500',
                      'bg-rose-500'
                    ];
                    const accentColor = accentColors[idx % accentColors.length];

                    return (
                      <div
                        key={idx}
                        className={`flex items-center rounded-lg border bg-white shadow-sm transition-all duration-300 ${isEditing
                          ? 'border-amber-300 ring-2 ring-amber-100/50 bg-amber-50/20 px-2 py-1'
                          : 'border-slate-200 hover:border-slate-300 px-3 py-1.5 hover:shadow-sm'
                          }`}
                      >
                        {isEditing ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="text"
                              value={editingValue}
                              onChange={(e) => setEditingValue(e.target.value)}
                              onKeyDown={(e) => handleEditKeyDown(e, idx)}
                              className="w-28 bg-slate-50 border border-slate-200 outline-none px-2 py-1 rounded-md text-slate-800 font-bold focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-xs"
                              autoFocus
                            />
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => saveEditing(idx)}
                                className="p-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-md transition-all shadow-sm"
                                title="Save Changes"
                              >
                                <CheckCircle size={14} />
                              </button>
                              <button
                                type="button"
                                onClick={cancelEditing}
                                className="p-1 bg-rose-50 hover:bg-rose-100 text-rose-500 rounded-md transition-all shadow-sm"
                                title="Cancel"
                              >
                                <XCircle size={14} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className={`w-2 h-2 rounded-full ${accentColor} mr-2 shrink-0`} />
                            <span className="text-xs font-semibold text-slate-700 tracking-tight select-all truncate max-w-[120px] sm:max-w-[180px]" title={kw}>
                              {kw}
                            </span>
                            <div className="flex items-center gap-1 ml-2 border-l border-slate-100 pl-1.5">
                              <button
                                type="button"
                                onClick={() => startEditing(idx, kw)}
                                className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-all"
                                title="Edit Keyword"
                              >
                                <Edit2 size={12} />
                              </button>
                              <button
                                type="button"
                                onClick={() => removeKeyword(idx)}
                                className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-all"
                                title="Remove Keyword"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs font-medium text-slate-400 italic mt-2 ml-1">No keywords added yet. Add some keywords to target key business aspects.</p>
              )}
            </div>
          </div>

          {/* Section 2: Technical Configuration */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <Globe className="text-slate-500 shrink-0" size={20} />
              <h2 className="text-base font-bold text-slate-800">Google Business & Login Credentials</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 ml-0.5">Google Place ID</label>
                <input
                  {...register('placeId', { required: 'Place ID is required' })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all font-semibold shadow-sm"
                  placeholder="Enter Google Place ID"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 ml-0.5">Website URL (Optional)</label>
                <input
                  {...register('websiteUrl')}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all font-semibold shadow-sm"
                  placeholder="Enter website URL (e.g. https://client-site.com) (optional)"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 ml-0.5">
                  {isEdit ? 'Update Password (Optional)' : 'Password'}
                </label>
                <input
                  type="password"
                  {...register('password', { required: !isEdit })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all font-semibold shadow-sm"
                  placeholder={isEdit ? "Enter password to update (leave blank to keep current)" : "Enter password (minimum 6 characters)"}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Custom Funnel Questions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <ListTodo className="text-slate-500 shrink-0" size={20} />
                <h2 className="text-base font-bold text-slate-800">Custom Feedback Form Questions</h2>
              </div>
              <button
                type="button"
                onClick={() => append({ question: '', options: [''] })}
                className="flex items-center gap-2 text-white font-bold text-sm bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-xl transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                <Plus size={16} /> Add Question
              </button>
            </div>

            <div className="space-y-6">
              {fields.map((field, index) => (
                <div key={field.id} className="p-5 rounded-xl bg-slate-50 border border-slate-200 relative animate-in fade-in duration-200">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">Question #{index + 1}</label>
                      <input
                        {...register(`questions.${index}.question`)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all font-semibold shadow-sm"
                        placeholder="e.g. Which department did you visit?"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-600">Predefined Options</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {watch(`questions.${index}.options`)?.map((opt, oIdx) => (
                          <div key={oIdx} className="flex items-center gap-2">
                            <input
                              {...register(`questions.${index}.options.${oIdx}`)}
                              className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all font-semibold shadow-sm"
                              placeholder={`Option ${oIdx + 1}`}
                            />
                            <button
                              type="button"
                              onClick={() => removeOption(index, oIdx)}
                              className="p-2 text-slate-400 hover:text-red-500"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addOption(index)}
                          className="flex items-center justify-center gap-2 border border-slate-300 hover:border-blue-400 rounded-xl py-2 text-slate-600 hover:text-blue-600 transition-all text-xs font-bold bg-white shadow-sm"
                        >
                          <Plus size={14} /> Add Option
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {fields.length === 0 && (
                <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                  <p className="text-slate-400 font-bold text-sm">No custom questions added. Default flow will be used.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Branding & Theme */}
        <div className="space-y-8">

          {/* Logo Upload */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <Sparkles className="text-slate-500 shrink-0" size={20} />
              <h2 className="text-base font-bold text-slate-800">Brand Logo</h2>
            </div>

            <div className="flex flex-col items-center gap-5">
              <div className="w-32 h-32 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center bg-slate-50 overflow-hidden relative group shadow-inner">
                {logoFile ? (
                  <img src={URL.createObjectURL(logoFile)} className="w-full h-full object-contain p-2" alt="New Logo" />
                ) : isEdit && watch('logo') ? (
                  <img src={`${BASE_URL}${watch('logo').startsWith('/') ? '' : '/'}${watch('logo')}`} className="w-full h-full object-contain p-2" alt="Existing" />
                ) : (
                  <div className="text-center p-4">
                    <Sparkles className="mx-auto text-slate-300 mb-2" size={28} />
                    <p className="text-[10px] font-bold text-slate-400 uppercase">No Logo</p>
                  </div>
                )}

                <label className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <span className="text-white text-xs font-bold uppercase tracking-wider">Change</span>
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
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <Palette className="text-slate-500 shrink-0" size={20} />
              <h2 className="text-base font-bold text-slate-800">Color Theme</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Primary Color</label>
                  <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase">{watch('primaryColor')}</span>
                </div>
                <div className="flex gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <input
                    type="color"
                    {...register('primaryColor')}
                    className="w-full h-10 rounded-lg cursor-pointer bg-transparent border-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Secondary Color</label>
                  <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md uppercase">{watch('secondaryColor')}</span>
                </div>
                <div className="flex gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
                  <input
                    type="color"
                    {...register('secondaryColor')}
                    className="w-full h-10 rounded-lg cursor-pointer bg-transparent border-none"
                  />
                </div>
              </div>

              {/* Preview Box */}
              <div className="mt-6 p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col gap-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Live Theme Preview</p>
                <div className="flex flex-col gap-2">
                  <div className="h-10 rounded-lg shadow-sm flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: watch('primaryColor') }}>
                    Primary Button
                  </div>
                  <div className="h-10 rounded-lg shadow-sm flex items-center justify-center text-white font-bold text-xs" style={{ backgroundColor: watch('secondaryColor') }}>
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
