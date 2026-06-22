import React, { useState, useEffect, useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import {
  Save, Store, User, Mail, Phone, Lock, Sparkles, Plus, Trash2,
  Edit2, Shield, CreditCard, Bell, Key, HelpCircle, Laptop, Loader2, Eye, EyeOff
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { clientService, authService, adminService, BASE_URL } from '../../services/api';

const SettingsPage = () => {
  const containerRef = useRef(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  // Files state
  const [logoFile, setLogoFile] = useState(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Platform support details for client
  const [platformSupport, setPlatformSupport] = useState({
    platform_name: 'ReviewFlow',
    platform_logo: null,
    support_email: 'doaguruinfosystems@gmail.com',
    support_number: '+91 7440992424'
  });

  const { register, handleSubmit, control, reset, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      // Profile
      name: '',
      email: '',
      mobile: '',
      password: '',
      logo: '',

      // Client Business Profile (excluding keywords)
      businessName: '',
      googleReviewLink: '',
      websiteUrl: '',
      primaryColor: '#3b82f6',
      secondaryColor: '#2dd4bf',
      questions: [],

      // Admin System Settings
      platform_name: 'ReviewFlow',
      support_email: 'doaguruinfosystems@gmail.com',
      support_number: '+91 7440992424',
      smtp_host: '',
      smtp_port: '',
      smtp_user: '',
      smtp_pass: '',
      sender_email: '',
      whatsapp_api_key: '',
      whatsapp_instance_id: '',
      whatsapp_webhook_url: '',
      google_client_id: '',
      google_client_secret: '',
      google_maps_api_key: '',
      maintenance_mode: '0',
      default_trial_days: '15',
      default_qr_limit: '10',
      razorpay_key_id: '',
      razorpay_key_secret: '',
      stripe_publishable_key: '',
      stripe_secret_key: '',
      gst_number: '',
      invoice_prefix: 'INV',
      notify_new_client: '1',
      notify_new_subscription: '1',
      notify_expiry: '1',
      notify_review: '1'
    }
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "questions"
  });

  const watchLogo = watch('logo');
  const watchPrimaryColor = watch('primaryColor');
  const watchSecondaryColor = watch('secondaryColor');

  useEffect(() => {
    const initSettings = async () => {
      try {
        const auth = await authService.verifyAuth();
        setUserRole(auth.user?.role);

        if (auth.user?.role === 'client' || auth.user?.role === 'admin') {
          // 1. Fetch Profile
          const profile = await clientService.getProfile();

          let settings = {};
          if (auth.user?.role === 'admin') {
            // 2. Fetch admin settings
            settings = await adminService.getSystemSettings();
            setActiveTab('profile');
          } else {
            // 2. Fetch platform details for client
            const support = await clientService.getSystemSettings();
            setPlatformSupport(support);
            setActiveTab('business');
          }

          const isAdmin = auth.user?.role === 'admin';
          reset({
            name: profile.name || (isAdmin ? 'DOAGuru InfoSystems' : ''),
            email: profile.email || '',
            mobile: profile.mobile || (isAdmin ? '+91-7440992424' : ''),
            logo: profile.logo || (isAdmin ? '/uploads/logonew.png' : ''),
            password: '',

            businessName: profile.businessName || '',
            googleReviewLink: profile.placeId ? `https://search.google.com/local/writereview?placeid=${profile.placeId}` : '',
            websiteUrl: profile.websiteUrl || '',
            primaryColor: profile.primaryColor || '#3b82f6',
            secondaryColor: profile.secondaryColor || '#2dd4bf',
            questions: Array.isArray(profile.questions) ? profile.questions : [],

            // Admin Settings
            platform_name: settings.platform_name || 'ReviewFlow',
            support_email: settings.support_email || 'doaguruinfosystems@gmail.com',
            support_number: settings.support_number || '+91 7440992424',
            smtp_host: settings.smtp_host || '',
            smtp_port: settings.smtp_port || '',
            smtp_user: settings.smtp_user || '',
            smtp_pass: settings.smtp_pass || '',
            sender_email: settings.sender_email || '',
            whatsapp_api_key: settings.whatsapp_api_key || '',
            whatsapp_instance_id: settings.whatsapp_instance_id || '',
            whatsapp_webhook_url: settings.whatsapp_webhook_url || '',
            google_client_id: settings.google_client_id || '',
            google_client_secret: settings.google_client_secret || '',
            google_maps_api_key: settings.google_maps_api_key || '',
            maintenance_mode: settings.maintenance_mode || '0',
            default_trial_days: settings.default_trial_days || '15',
            default_qr_limit: settings.default_qr_limit || '10',
            razorpay_key_id: settings.razorpay_key_id || '',
            razorpay_key_secret: settings.razorpay_key_secret || '',
            stripe_publishable_key: settings.stripe_publishable_key || '',
            stripe_secret_key: settings.stripe_secret_key || '',
            gst_number: settings.gst_number || '',
            invoice_prefix: settings.invoice_prefix || 'INV',
            notify_new_client: settings.notify_new_client || '1',
            notify_new_subscription: settings.notify_new_subscription || '1',
            notify_expiry: settings.notify_expiry || '1',
            notify_review: settings.notify_review || '1'
          });
        }
      } catch (err) {
        console.error("Error loading settings:", err);
      } finally {
        setLoading(false);
      }
    };
    initSettings();
  }, [reset]);

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

  useGSAP(() => {
    gsap.from('.settings-tab-content', {
      opacity: 0,
      y: 10,
      duration: 0.35,
      ease: 'power2.out'
    });
  }, { dependencies: [activeTab] });

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      let logoUrl = watchLogo;
      if (logoFile) {
        setUploadingLogo(true);
        const uploadRes = await adminService.uploadLogo(logoFile);
        logoUrl = uploadRes.url;
        setUploadingLogo(false);
      }

      // 1. Update Profile (Admin / Client)
      let placeId = '';
      try {
        if (data.googleReviewLink && data.googleReviewLink.includes('placeid=')) {
          placeId = data.googleReviewLink.split('placeid=')[1];
        }
      } catch (e) { }

      await clientService.updateProfile({
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        logo: logoUrl,
        password: data.password || undefined,
        businessName: data.businessName,
        placeId: placeId || data.googleReviewLink,
        websiteUrl: data.websiteUrl,
        primaryColor: data.primaryColor,
        secondaryColor: data.secondaryColor,
        questions: data.questions
      });

      // 2. If Admin, also update system_settings
      if (userRole === 'admin') {
        const sysSettings = {
          platform_name: data.platform_name,
          support_email: data.support_email,
          support_number: data.support_number,
          smtp_host: data.smtp_host,
          smtp_port: data.smtp_port,
          smtp_user: data.smtp_user,
          smtp_pass: data.smtp_pass,
          sender_email: data.sender_email,
          whatsapp_api_key: data.whatsapp_api_key,
          whatsapp_instance_id: data.whatsapp_instance_id,
          whatsapp_webhook_url: data.whatsapp_webhook_url,
          google_client_id: data.google_client_id,
          google_client_secret: data.google_client_secret,
          google_maps_api_key: data.google_maps_api_key,
          maintenance_mode: data.maintenance_mode,
          default_trial_days: data.default_trial_days,
          default_qr_limit: data.default_qr_limit,
          razorpay_key_id: data.razorpay_key_id,
          razorpay_key_secret: data.razorpay_key_secret,
          stripe_publishable_key: data.stripe_publishable_key,
          stripe_secret_key: data.stripe_secret_key,
          gst_number: data.gst_number,
          invoice_prefix: data.invoice_prefix,
          notify_new_client: data.notify_new_client,
          notify_new_subscription: data.notify_new_subscription,
          notify_expiry: data.notify_expiry,
          notify_review: data.notify_review
        };
        await adminService.updateSystemSettings(sysSettings);
      }

      alert("Settings saved successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (err) {
      console.error(err);
      alert("Error saving settings");
    } finally {
      setSaving(false);
      setUploadingLogo(false);
    }
  };

  if (loading) return <div className="p-8">Loading settings...</div>;

  const adminTabs = [
    { id: 'profile', name: 'Profile Settings', icon: <User size={16} /> }
  ];

  const clientTabs = [
    { id: 'business', name: 'Business Profile', icon: <Store size={16} /> },
    { id: 'support', name: 'Contact Support', icon: <User size={16} /> }
  ];

  const tabs = userRole === 'admin' ? adminTabs : clientTabs;

  return (
    <div ref={containerRef} className="max-w-7xl w-full font-sans pb-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 bg-gradient-to-r from-slate-900 to-indigo-950 bg-clip-text text-transparent">System Settings</h1>
        <p className="text-slate-500 text-xs font-semibold mt-1">
          {userRole === 'admin' ? 'Manage global application settings, integrations, and administration profile.' : 'Manage business branding, theme customisation, and customer-facing survey questions.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Navigation Tabs (Sidebar Layout) */}
        <div className="space-y-1 bg-white border border-slate-200 p-3.5 rounded-2xl shadow-sm h-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold transition-all text-xs text-left cursor-pointer ${activeTab === tab.id
                ? 'bg-primary text-white shadow-md'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}

          {/* Master Submit Button */}
          {activeTab !== 'support' && (
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={saving || uploadingLogo}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 mt-6 bg-gradient-to-br from-emerald-500 to-teal-500 hover:opacity-95 text-white font-black rounded-xl shadow-md cursor-pointer text-xs transition-all disabled:opacity-75"
            >
              {saving || uploadingLogo ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
              <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
            </button>
          )}
        </div>

        {/* Tab Contents Area */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm min-h-[450px] flex flex-col justify-between">
          <form className="space-y-6">

            <div className="settings-tab-content space-y-6">

              {/* ── PROFILE SETTINGS ── */}
              {activeTab === 'profile' && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Admin Profile Settings</h3>
                    <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Edit administrative login email, personal contact information, and password.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-650">Admin Name</label>
                      <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 text-xs focus:outline-none transition-all font-semibold shadow-inner"
                        placeholder="Admin User"
                      />
                      {errors.name && <span className="text-red-500 text-[10px] font-bold uppercase mt-1">{errors.name.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-650">Admin Email Address</label>
                      <input
                        type="email"
                        {...register("email", { required: "Email is required" })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 text-xs focus:outline-none transition-all font-semibold shadow-inner"
                        placeholder="admin@example.com"
                      />
                      {errors.email && <span className="text-red-500 text-[10px] font-bold uppercase mt-1">{errors.email.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-650">Mobile Number</label>
                      <input
                        type="text"
                        {...register("mobile", {
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
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 text-xs focus:outline-none transition-all font-semibold shadow-inner"
                        placeholder="+91 98765 43210"
                      />
                      {errors.mobile && <span className="text-red-500 text-[10px] font-bold uppercase mt-1">{errors.mobile.message}</span>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-650">Update Password</label>
                      <div className="relative w-full">
                        <input
                          type={showPassword ? "text" : "password"}
                          {...register("password")}
                          className="w-full px-3.5 pr-10 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 text-xs focus:outline-none transition-all font-semibold shadow-inner"
                          placeholder="Leave blank to keep current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Profile Image (Logo) */}
                  <div className="flex flex-col gap-3 mt-2">
                    <label className="text-xs font-bold text-slate-655">Profile Picture / Avatar</label>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden relative group">
                        {logoFile ? (
                          <img src={URL.createObjectURL(logoFile)} className="w-full h-full object-contain p-1" alt="Preview" />
                        ) : watchLogo ? (
                          <img src={`${BASE_URL}${watchLogo.startsWith('/') ? '' : '/'}${watchLogo}`} className="w-full h-full object-contain p-1" alt="Profile" />
                        ) : (
                          <User size={24} className="text-slate-400" />
                        )}
                        <label className="absolute inset-0 bg-slate-900/65 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                          <span className="text-white text-[9px] font-black uppercase">Change</span>
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => setLogoFile(e.target.files[0])} />
                        </label>
                      </div>
                      <p className="text-[10px] text-slate-400 italic font-semibold leading-normal">
                        Upload a photo or avatar. Recommended size: 256x256 px.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── PLATFORM & SYSTEM SETTINGS ── */}
              {activeTab === 'platform' && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Platform & System Settings</h3>
                    <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Configure the branding, support contact nodes, and system properties.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-650">Platform Name</label>
                      <input
                        type="text"
                        {...register("platform_name")}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 text-xs focus:outline-none transition-all font-semibold shadow-inner"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-650">Support Email Address</label>
                      <input
                        type="email"
                        {...register("support_email")}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 text-xs focus:outline-none transition-all font-semibold shadow-inner"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-655">Support Contact Number</label>
                      <input
                        type="text"
                        {...register("support_number")}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-955 text-xs focus:outline-none transition-all font-semibold shadow-inner"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-650">Default Subscription Trial (Days)</label>
                      <input
                        type="number"
                        {...register("default_trial_days")}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 text-xs focus:outline-none transition-all font-semibold shadow-inner"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-650">Default Client Max QRs Limit</label>
                      <input
                        type="number"
                        {...register("default_qr_limit")}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 text-xs focus:outline-none transition-all font-semibold shadow-inner"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-650">System Maintenance Mode</label>
                      <select
                        {...register("maintenance_mode")}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 text-xs focus:outline-none transition-all font-bold appearance-none shadow-inner"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 1rem center',
                          backgroundSize: '1em'
                        }}
                      >
                        <option value="0">Disabled (Online)</option>
                        <option value="1">Enabled (Offline)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* ── SMTP & EMAIL SETTINGS ── */}
              {activeTab === 'smtp' && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">SMTP & Email Alert Configurations</h3>
                    <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Setup mail server options and select which occurrences should trigger notifications.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-650">SMTP Server Host</label>
                      <input
                        type="text"
                        {...register("smtp_host")}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 text-xs focus:outline-none transition-all font-semibold shadow-inner"
                        placeholder="smtp.gmail.com"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-655">SMTP Port</label>
                      <input
                        type="text"
                        {...register("smtp_port")}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 text-xs focus:outline-none transition-all font-semibold shadow-inner"
                        placeholder="587"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-655">SMTP Username (Email)</label>
                      <input
                        type="text"
                        {...register("smtp_user")}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 text-xs focus:outline-none transition-all font-semibold shadow-inner"
                        placeholder="your-email@gmail.com"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-655">SMTP App Password</label>
                      <input
                        type="password"
                        {...register("smtp_pass")}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 text-xs focus:outline-none transition-all font-semibold shadow-inner"
                        placeholder="••••••••••••••••"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-655">Sender Sender Address</label>
                      <input
                        type="email"
                        {...register("sender_email")}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 text-xs focus:outline-none transition-all font-semibold shadow-inner"
                        placeholder="noreply@reviewflow.com"
                      />
                    </div>
                  </div>

                  {/* Notification Toggle Checklist */}
                  <div className="pt-4 border-t border-slate-100">
                    <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wide block mb-3">System Event Notifications</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                      <label className="flex items-center gap-3 p-3 border border-slate-150 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer select-none">
                        <input type="checkbox" {...register("notify_new_client")} className="w-4.5 h-4.5 text-primary border-slate-300 rounded focus:ring-primary/20 cursor-pointer" defaultChecked />
                        <div>
                          <span className="text-xs font-bold text-slate-700 block">New Client Registrations</span>
                          <span className="text-[10px] text-slate-400 font-semibold block leading-tight mt-0.5">Alert on fresh accounts creation.</span>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-3 border border-slate-150 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer select-none">
                        <input type="checkbox" {...register("notify_new_subscription")} className="w-4.5 h-4.5 text-primary border-slate-300 rounded focus:ring-primary/20 cursor-pointer" defaultChecked />
                        <div>
                          <span className="text-xs font-bold text-slate-700 block">New Subscription Sales</span>
                          <span className="text-[10px] text-slate-400 font-semibold block leading-tight mt-0.5">Alert on Stripe or Razorpay purchase.</span>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-3 border border-slate-150 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer select-none">
                        <input type="checkbox" {...register("notify_expiry")} className="w-4.5 h-4.5 text-primary border-slate-300 rounded focus:ring-primary/20 cursor-pointer" defaultChecked />
                        <div>
                          <span className="text-xs font-bold text-slate-700 block">Subscription Expiry Warnings</span>
                          <span className="text-[10px] text-slate-400 font-semibold block leading-tight mt-0.5">Alert when user packages are ending.</span>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-3 border border-slate-150 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer select-none">
                        <input type="checkbox" {...register("notify_review")} className="w-4.5 h-4.5 text-primary border-slate-300 rounded focus:ring-primary/20 cursor-pointer" defaultChecked />
                        <div>
                          <span className="text-xs font-bold text-slate-700 block">Review Sent Alerts</span>
                          <span className="text-[10px] text-slate-400 font-semibold block leading-tight mt-0.5">Email alert when client gets feedback.</span>
                        </div>
                      </label>

                    </div>
                  </div>
                </div>
              )}

              {/* ── APIS & INTEGRATIONS ── */}
              {activeTab === 'apis' && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">APIs & Integrations</h3>
                    <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Configure API credentials and endpoints for Google reviews and WhatsApp automation.</p>
                  </div>

                  <div className="space-y-5">

                    {/* Google section */}
                    <div className="p-4 rounded-xl border border-slate-150 bg-slate-50/50">
                      <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full mb-3 inline-block">Google Maps & Business Integration</span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] font-bold text-slate-600">Google API Key (Maps)</label>
                          <input type="text" {...register("google_maps_api_key")} className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs focus:outline-none" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] font-bold text-slate-600">Google Client ID</label>
                          <input type="text" {...register("google_client_id")} className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs focus:outline-none" />
                        </div>
                        <div className="flex flex-col gap-1 md:col-span-2">
                          <label className="text-[11px] font-bold text-slate-600">Google Client Secret</label>
                          <input type="password" {...register("google_client_secret")} className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs focus:outline-none" />
                        </div>
                      </div>
                    </div>

                    {/* WhatsApp API section */}
                    <div className="p-4 rounded-xl border border-slate-150 bg-slate-50/50">
                      <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full mb-3 inline-block">WhatsApp Gateway Integration</span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] font-bold text-slate-600">API Key</label>
                          <input type="text" {...register("whatsapp_api_key")} className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs focus:outline-none" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] font-bold text-slate-600">Instance ID</label>
                          <input type="text" {...register("whatsapp_instance_id")} className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs focus:outline-none" />
                        </div>
                        <div className="flex flex-col gap-1 md:col-span-2">
                          <label className="text-[11px] font-bold text-slate-600">Webhook Notification URL</label>
                          <input type="text" {...register("whatsapp_webhook_url")} className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs focus:outline-none" />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* ── BILLING & PAYMENT KEYS ── */}
              {activeTab === 'billing' && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Billing & Merchant Accounts</h3>
                    <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Configure client registration invoice details, Razorpay credentials, or Stripe keys.</p>
                  </div>

                  <div className="space-y-5">

                    {/* Razorpay Gateway */}
                    <div className="p-4 rounded-xl border border-slate-150 bg-slate-50/50">
                      <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full mb-3 inline-block">Razorpay Credentials</span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] font-bold text-slate-600">Key ID</label>
                          <input type="text" {...register("razorpay_key_id")} className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs focus:outline-none" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] font-bold text-slate-600">Key Secret</label>
                          <input type="password" {...register("razorpay_key_secret")} className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs focus:outline-none" />
                        </div>
                      </div>
                    </div>

                    {/* Stripe Gateway */}
                    <div className="p-4 rounded-xl border border-slate-150 bg-slate-50/50">
                      <span className="text-[10px] font-black uppercase text-violet-600 bg-violet-50 border border-violet-200 px-2.5 py-0.5 rounded-full mb-3 inline-block">Stripe Gateway Keys</span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] font-bold text-slate-600">Publishable Key</label>
                          <input type="text" {...register("stripe_publishable_key")} className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs focus:outline-none" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] font-bold text-slate-600">Secret Key</label>
                          <input type="password" {...register("stripe_secret_key")} className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs focus:outline-none" />
                        </div>
                      </div>
                    </div>

                    {/* GST Details */}
                    <div className="p-4 rounded-xl border border-slate-150 bg-slate-50/50">
                      <span className="text-[10px] font-black uppercase text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full mb-3 inline-block">Invoice & Tax Details</span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] font-bold text-slate-600">GST Registration Number</label>
                          <input type="text" {...register("gst_number")} className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs focus:outline-none" placeholder="e.g. 27AAAAA1111A1Z1" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[11px] font-bold text-slate-600">Invoice Number Prefix</label>
                          <input type="text" {...register("invoice_prefix")} className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 text-xs focus:outline-none" placeholder="INV" />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* ── CLIENT: BUSINESS PROFILE ── */}
              {activeTab === 'business' && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Business profile</h3>
                    <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Manage your credentials, business name, and Google place details.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-650">Contact Person Name</label>
                      <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 text-xs focus:outline-none font-semibold shadow-inner"
                      />
                      {errors.name && <span className="text-red-500 text-[10px] font-bold uppercase mt-1">{errors.name.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-650">Business Name</label>
                      <input
                        type="text"
                        {...register("businessName", { required: "Business name is required" })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-955 text-xs focus:outline-none font-semibold shadow-inner"
                        placeholder="My Local Business"
                      />
                      {errors.businessName && <span className="text-red-500 text-[10px] font-bold uppercase mt-1">{errors.businessName.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-650">Email Address (Login ID)</label>
                      <input
                        type="email"
                        {...register("email", { required: "Email is required" })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-955 text-xs focus:outline-none font-semibold shadow-inner"
                      />
                      {errors.email && <span className="text-red-500 text-[10px] font-bold uppercase mt-1">{errors.email.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-650">Mobile / WhatsApp Number</label>
                      <input
                        type="text"
                        {...register("mobile", {
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
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-955 text-xs focus:outline-none font-semibold shadow-inner"
                      />
                      {errors.mobile && <span className="text-red-500 text-[10px] font-bold uppercase mt-1">{errors.mobile.message}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-650">Google Place ID / Review Link</label>
                      <input
                        type="text"
                        {...register("googleReviewLink")}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-955 text-xs focus:outline-none font-semibold shadow-inner"
                        placeholder="Google maps placeid link"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-650">Website URL</label>
                      <input
                        type="text"
                        {...register("websiteUrl")}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-950 text-xs focus:outline-none font-semibold shadow-inner"
                        placeholder="https://mybusiness.com"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-slate-655">Update Password</label>
                      <div className="relative w-full">
                        <input
                          type={showPassword ? "text" : "password"}
                          {...register("password")}
                          className="w-full px-3.5 pr-10 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-955 text-xs focus:outline-none font-semibold shadow-inner"
                          placeholder="Leave blank to keep your current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── CLIENT: BRANDING & COLORS ── */}
              {activeTab === 'branding' && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Branding & Theme Colors</h3>
                    <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Customize your survey theme colors and logo to match your company branding.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

                    {/* Logo upload (span 4) */}
                    <div className="md:col-span-4 flex flex-col items-center gap-3 border-r border-slate-100 pr-2">
                      <label className="text-xs font-bold text-slate-655 self-start">Company Logo</label>
                      <div className="w-28 h-28 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center bg-slate-50/50 overflow-hidden relative group">
                        {logoFile ? (
                          <img src={URL.createObjectURL(logoFile)} className="w-full h-full object-contain p-2" alt="New Logo" />
                        ) : watchLogo ? (
                          <img src={`${BASE_URL}${watchLogo.startsWith('/') ? '' : '/'}${watchLogo}`} className="w-full h-full object-contain p-2" alt="Existing Logo" />
                        ) : (
                          <div className="text-center p-2">
                            <Sparkles className="mx-auto text-slate-350 mb-1" size={20} />
                            <p className="text-[9px] font-black text-slate-400 uppercase">No Logo</p>
                          </div>
                        )}
                        <label className="absolute inset-0 bg-slate-900/65 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                          <span className="text-white text-[10px] font-black uppercase">Change</span>
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => setLogoFile(e.target.files[0])} />
                        </label>
                      </div>
                      <p className="text-[10px] text-slate-400 text-center font-medium italic">Transparent PNG recommended</p>
                    </div>

                    {/* Colors (span 8) */}
                    <div className="md:col-span-8 flex flex-col gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-650">Primary Branding Color</label>
                        <div className="flex items-center gap-3">
                          <input type="color" {...register("primaryColor")} className="w-9 h-9 rounded-lg border border-slate-250 cursor-pointer" />
                          <input type="text" {...register("primaryColor")} className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-650">Secondary Color Accent</label>
                        <div className="flex items-center gap-3">
                          <input type="color" {...register("secondaryColor")} className="w-9 h-9 rounded-lg border border-slate-250 cursor-pointer" />
                          <input type="text" {...register("secondaryColor")} className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── CLIENT: CUSTOM SURVEY QUESTIONS ── */}
              {activeTab === 'questions' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Survey Questions Customisation</h3>
                      <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Customize questions and predefined checkboxes shown on the negative-experience review screen.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => append({ question: '', options: [''] })}
                      className="flex items-center gap-1.5 text-white font-black text-[10px] bg-emerald-600 hover:bg-emerald-700 px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-sm"
                    >
                      <Plus size={12} className="stroke-[3]" /> Add Question
                    </button>
                  </div>

                  <div className="space-y-5">
                    {fields.map((field, index) => (
                      <div key={field.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 relative animate-in fade-in duration-200">
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>

                        <div className="space-y-3">
                          <div className="space-y-1">
                            <label className="text-[11px] font-black text-slate-600">Question #{index + 1}</label>
                            <input
                              {...register(`questions.${index}.question`)}
                              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none font-semibold"
                              placeholder="e.g. Which department did you visit?"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-[11px] font-black text-slate-600 block">Predefined Options</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {watch(`questions.${index}.options`)?.map((opt, oIdx) => (
                                <div key={oIdx} className="flex items-center gap-2">
                                  <input
                                    {...register(`questions.${index}.options.${oIdx}`)}
                                    className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-[11px] focus:outline-none font-medium"
                                    placeholder={`Option ${oIdx + 1}`}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeOption(index, oIdx)}
                                    className="p-1 text-slate-400 hover:text-red-500 cursor-pointer"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() => addOption(index)}
                                className="flex items-center justify-center gap-1 border border-slate-300 hover:border-primary rounded-lg py-1.5 text-slate-600 hover:text-primary transition-all text-[11px] font-bold bg-white cursor-pointer"
                              >
                                <Plus size={12} /> Option
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {fields.length === 0 && (
                      <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                        <p className="text-slate-400 font-bold text-xs">No custom questions added yet. The system will collect text comments only.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── CLIENT: VIEW PLATFORM CONTACT DETAILS (ADMIN SUPPORT DETAILS) ── */}
              {activeTab === 'support' && (
                <div className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Support & Help Desk</h3>
                    <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Contact the platform administrator for queries regarding limits, billing, or technical issues.</p>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-50/50 via-slate-50 to-blue-50/50 border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center gap-6">
                    <div className="w-16 h-16 rounded-xl shadow-md border border-slate-100 flex items-center justify-center bg-white shrink-0 overflow-hidden">
                      {platformSupport.platform_logo ? (
                        <img src={`${BASE_URL}${platformSupport.platform_logo}`} alt="Platform Logo" className="w-full h-full object-contain p-2" />
                      ) : (
                        <Laptop size={32} className="text-primary" />
                      )}
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-2">
                      <h4 className="text-base font-black text-slate-900">{platformSupport.platform_name || 'ReviewFlow'} Platform</h4>
                      <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                        For any queries, limits enhancement, custom plans, or payment invoices, please contact our helpline or send an email. We will get back to you shortly.
                      </p>

                      <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 text-xs font-bold text-slate-700">
                        <div className="flex items-center gap-2">
                          <Mail size={14} className="text-slate-400" />
                          <a href={`mailto:${platformSupport.support_email}`} className="text-primary hover:underline">{platformSupport.support_email}</a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={14} className="text-slate-400" />
                          <span className="text-slate-600">{platformSupport.support_number}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;
