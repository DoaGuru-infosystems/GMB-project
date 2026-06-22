import React, { useState, useEffect, useCallback } from 'react';
import { subscriptionService } from '../../services/api';
import { useClientContext } from '../../context/ClientContext';
import { Check, Plus, CreditCard, Users, TrendingUp } from 'lucide-react';


const SubscriptionManagement = () => {
  const validTabs = ['plans', 'clients', 'all-subscriptions', 'stats'];
  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem('subscriptionActiveTab');
    return validTabs.includes(savedTab) ? savedTab : 'plans';
  });
  const { clients, fetchClients } = useClientContext();
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [allSubscriptions, setAllSubscriptions] = useState([]);
  const [subscriptionStats, setSubscriptionStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
  const [formData, setFormData] = useState({
    clientId: '',
    planId: '',
    auto_renew: true,
    amount_paid: 0,
    payment_method: 'manual',
    transaction_id: '',
    notes: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Plans CRUD states
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [planFormData, setPlanFormData] = useState({
    plan_code: '',
    plan_name: '',
    description: '',
    price: 0,
    currency: 'INR',
    duration_days: 30,
    max_reviews_per_month: '',
    featuresString: '',
    badge: ''
  });

  const openAddPlan = () => {
    setEditingPlan(null);
    setPlanFormData({
      plan_code: '',
      plan_name: '',
      description: '',
      price: 0,
      currency: 'INR',
      duration_days: 30,
      max_reviews_per_month: '',
      featuresString: '',
      badge: ''
    });
    setShowPlanModal(true);
  };

  const openEditPlan = (plan) => {
    setEditingPlan(plan);
    setPlanFormData({
      plan_code: plan.plan_code || '',
      plan_name: plan.name || '',
      description: plan.description || '',
      price: plan.price || 0,
      currency: plan.currency || 'INR',
      duration_days: plan.duration_days || 30,
      max_reviews_per_month: plan.max_reviews_per_month || '',
      featuresString: getPlanFeatures(plan.features).join(', '),
      badge: plan.badge || ''
    });
    setShowPlanModal(true);
  };

  const handlePlanSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const parsedFeatures = planFormData.featuresString
      ? planFormData.featuresString.split(',').map(f => f.trim()).filter(Boolean)
      : [];

    const payload = {
      plan_code: planFormData.plan_code,
      plan_name: planFormData.plan_name,
      description: planFormData.description,
      price: parseFloat(planFormData.price) || 0,
      currency: planFormData.currency,
      duration_days: parseInt(planFormData.duration_days) || 30,
      max_reviews_per_month: planFormData.max_reviews_per_month ? parseInt(planFormData.max_reviews_per_month) : null,
      features: parsedFeatures,
      badge: planFormData.badge || null
    };

    try {
      if (editingPlan) {
        await subscriptionService.updatePlan(editingPlan.id, payload);
        setSuccessMessage('Plan updated successfully!');
      } else {
        await subscriptionService.createPlan(payload);
        setSuccessMessage('Plan created successfully!');
      }
      setShowPlanModal(false);
      setEditingPlan(null);
      fetchData();
    } catch (error) {
      setErrorMessage(error.message || 'Failed to save plan');
    }
  };

  const handleDeletePlan = async (planId) => {
    if (window.confirm('Are you sure you want to delete this plan? This will fail if there are active subscriptions bound to it.')) {
      try {
        await subscriptionService.deletePlan(planId);
        setSuccessMessage('Plan deleted successfully!');
        fetchData();
      } catch (error) {
        setErrorMessage(error.message || 'Failed to delete plan');
      }
    }
  };

  // Auto-fill amount paid when plan is selected
  useEffect(() => {
    if (formData.planId && subscriptionPlans.length > 0) {
      const selectedPlan = subscriptionPlans.find(p => String(p.id) === String(formData.planId));
      if (selectedPlan) {
        setFormData(prev => ({
          ...prev,
          amount_paid: selectedPlan.price
        }));
      }
    }
  }, [formData.planId, subscriptionPlans]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      if (activeTab === 'plans') {
        const data = await subscriptionService.getSubscriptionPlans();
        setSubscriptionPlans(data);
      } else if (activeTab === 'clients') {
        await fetchClients(); // Uses optimized version from context
        const plansData = await subscriptionService.getSubscriptionPlans();
        setSubscriptionPlans(plansData);
      } else if (activeTab === 'all-subscriptions') {
        const data = await subscriptionService.getAllSubscriptions();
        setAllSubscriptions(data);
      } else if (activeTab === 'stats') {
        const data = await subscriptionService.getSubscriptionStats();
        setSubscriptionStats(data);
      }
    } catch (error) {
      setErrorMessage(error.message || 'Failed to fetch data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('subscriptionActiveTab', activeTab);
    fetchData();
  }, [activeTab, fetchData]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleRegisterSubscription = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await subscriptionService.registerSubscription(
        formData.clientId,
        parseInt(formData.planId),
        {
          autoRenew: formData.auto_renew,
          amountPaid: parseFloat(formData.amount_paid),
          paymentMethod: formData.payment_method,
          transactionId: formData.transaction_id,
          notes: formData.notes
        }
      );

      setSuccessMessage('Subscription registered successfully!');
      setFormData({
        clientId: '',
        planId: '',
        auto_renew: true,
        amount_paid: 0,
        payment_method: 'manual',
        transaction_id: '',
        notes: ''
      });
      setShowRegisterForm(false);
      setShowAdditionalDetails(false);
      setTimeout(() => {
        fetchData();
      }, 1500);
    } catch (error) {
      setErrorMessage(error.message || 'Failed to register subscription');
    }
  };

  const handleCancelSubscription = async (subscriptionId) => {
    if (window.confirm('Are you sure you want to cancel this subscription?')) {
      try {
        await subscriptionService.cancelSubscription(subscriptionId);
        setSuccessMessage('Subscription cancelled successfully!');
        setTimeout(() => {
          fetchData();
        }, 1000);
      } catch {
        setErrorMessage('Failed to cancel subscription');
      }
    }
  };

  const handleRenewSubscription = async (subscriptionId) => {
    try {
      await subscriptionService.renewSubscription(subscriptionId);
      setSuccessMessage('Subscription renewed successfully!');
      setTimeout(() => {
        fetchData();
      }, 1000);
    } catch {
      setErrorMessage('Failed to renew subscription');
    }
  };

  const formatCurrency = (amount) => {
    return `Rs. ${Number(amount || 0).toLocaleString('en-IN')}`;
  };

  const getPlanFeatures = (features) => {
    if (!features) return [];
    if (Array.isArray(features)) return features;

    try {
      return JSON.parse(features);
    } catch {
      return [];
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-50 border border-emerald-150 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full';
      case 'expired':
        return 'bg-amber-50 border border-amber-150 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full';
      case 'cancelled':
        return 'bg-rose-50 border border-rose-150 text-rose-700 text-xs font-semibold px-2.5 py-1 rounded-full';
      default:
        return 'bg-slate-50 border border-slate-150 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full';
    }
  };

  return (
    <div className="space-y-6 pb-10 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in duration-200">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-2.5 inline-block">Billing & Plans</span>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 bg-gradient-to-r from-slate-900 to-indigo-950 bg-clip-text text-transparent mb-1">Subscription Management</h1>
          <p className="text-slate-500 text-xs font-semibold mt-1">Manage client subscription plans, register renewals, and view metrics.</p>
        </div>
      </div>

      {/* Alert Messages */}
      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-sm font-medium animate-in fade-in duration-200">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl text-sm font-medium animate-in fade-in duration-200">
          {errorMessage}
        </div>
      )}

      {/* Tabs Menu */}
      <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm w-fit animate-in fade-in duration-200">
        {[
          { id: 'plans', label: 'Plans', icon: CreditCard },
          { id: 'clients', label: 'Assign Plan', icon: Plus },
          { id: 'all-subscriptions', label: 'Active List', icon: Users },
          { id: 'stats', label: 'Statistics', icon: TrendingUp }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold cursor-pointer transition-all ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Plans Tab */}
      {activeTab === 'plans' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white rounded-2xl p-5 border border-slate-200 shadow-sm animate-in fade-in duration-200">
            <div>
              <h2 className="text-base font-bold text-slate-800">Subscription Plans</h2>
              <p className="text-xs text-slate-400 font-medium">Create, edit, or delete the plans available for clients.</p>
            </div>
            <button
              onClick={openAddPlan}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] shadow-sm cursor-pointer"
            >
              <Plus size={16} className="stroke-[3]" />
              Add New Plan
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center min-h-[240px]">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : subscriptionPlans.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-10 text-center text-slate-500 font-medium">
              No subscription plans found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
              {subscriptionPlans.map(plan => (
                <div key={plan.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow transition-shadow relative overflow-hidden flex flex-col justify-between min-h-[350px]">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
                      {plan.badge && (
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-black uppercase tracking-wider">
                          {plan.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">{plan.description}</p>
                    
                    <div className="my-5 border-t border-slate-100 pt-5">
                      <span className="text-3xl font-black text-slate-900">
                        {formatCurrency(plan.price)}
                      </span>
                      <span className="text-xs font-semibold text-slate-400 ml-1">/ {plan.duration_days} days</span>
                    </div>

                    {plan.max_reviews_per_month && (
                      <div className="mb-4 py-1.5 px-3 bg-slate-50 border border-slate-100 rounded-lg inline-block">
                        <p className="text-xs font-bold text-slate-600">
                          Up to {plan.max_reviews_per_month} reviews/month
                        </p>
                      </div>
                    )}

                    {getPlanFeatures(plan.features).length > 0 && (
                      <div className="space-y-2 mt-2 border-t border-slate-100 pt-3">
                        {getPlanFeatures(plan.features).map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                            <Check size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2 justify-end">
                    <button
                      onClick={() => openEditPlan(plan)}
                      className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg font-bold text-xs transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePlan(plan.id)}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 rounded-lg font-bold text-xs transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Register Subscription Tab */}
      {activeTab === 'clients' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white rounded-2xl p-5 border border-slate-200 shadow-sm animate-in fade-in duration-200">
            <div>
              <h2 className="text-base font-bold text-slate-800">Assign Subscription</h2>
              <p className="text-xs text-slate-400 font-medium">Select a client below or click assign to apply a new plan.</p>
            </div>
            <button
              onClick={() => {
                setShowRegisterForm(!showRegisterForm);
                setShowAdditionalDetails(false);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] shadow-sm"
            >
              <Plus size={16} className="stroke-[3]" />
              Assign New Subscription
            </button>
          </div>

          {showRegisterForm && (
            <form onSubmit={handleRegisterSubscription} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm animate-in slide-in-from-top-4 duration-350">
              <h3 className="text-sm font-bold text-slate-800 pb-3 border-b border-slate-100 mb-5">Subscription Details</h3>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600">Select Client</label>
                    <select
                      value={formData.clientId}
                      onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-350 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-slate-900 transition-colors font-semibold shadow-sm"
                    >
                      <option value="">-- Choose a client --</option>
                      {clients.map(client => (
                        <option key={client.id} value={client.clientId}>
                          {client.name} {client.businessName ? `(${client.businessName})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600">Select Plan</label>
                    <select
                      value={formData.planId}
                      onChange={(e) => setFormData({ ...formData, planId: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-355 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-slate-900 transition-colors font-semibold shadow-sm"
                    >
                      <option value="">-- Choose a plan --</option>
                      {subscriptionPlans.map(plan => (
                        <option key={plan.id} value={plan.id}>
                          {plan.name} - {formatCurrency(plan.price)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600">Amount Paid</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.amount_paid}
                      onChange={(e) => setFormData({ ...formData, amount_paid: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-350 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-slate-900 transition-colors font-semibold shadow-sm"
                      placeholder="Enter amount paid"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600">Payment Method</label>
                    <select
                      value={formData.payment_method}
                      onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-350 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-slate-900 transition-colors font-semibold shadow-sm"
                    >
                      <option value="manual">Manual Cash/Offline</option>
                      <option value="online">Online Payment</option>
                      <option value="upi">UPI/QR Transfer</option>
                      <option value="bank_transfer">Direct Bank Transfer</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAdditionalDetails(!showAdditionalDetails)}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1.5 focus:outline-none"
                  >
                    {showAdditionalDetails ? '− Hide Billing Details & Notes' : '+ Add Billing Details & Notes'}
                  </button>
                </div>

                {showAdditionalDetails && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-slate-100 animate-in slide-in-from-top-2 duration-200">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">Transaction ID (Optional)</label>
                      <input
                        type="text"
                        value={formData.transaction_id}
                        onChange={(e) => setFormData({ ...formData, transaction_id: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-350 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-slate-900 transition-colors font-semibold shadow-sm"
                        placeholder="e.g. TXN12345678"
                      />
                    </div>

                    <div className="flex items-center pt-6">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={formData.auto_renew}
                          onChange={(e) => setFormData({ ...formData, auto_renew: e.target.checked })}
                          className="w-4 h-4 rounded border-slate-350 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-xs font-semibold text-slate-700">Enable Auto Renew</span>
                      </label>
                    </div>

                    <div className="md:col-span-2 space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">Notes (Optional)</label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        rows="2"
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-350 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-slate-900 transition-colors font-semibold shadow-sm"
                        placeholder="Enter notes about payment or plan allocation..."
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-5 flex gap-3 pb-2 border-t border-slate-100 pt-5">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-bold text-sm transition-all"
                >
                  Register Subscription
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowRegisterForm(false);
                    setShowAdditionalDetails(false);
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2 rounded-xl font-bold text-sm transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Cleaned Active Clients List */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-4">Active Clients Without Subscription</h3>
            <div className="overflow-hidden border border-slate-150 rounded-xl">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-150">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Client Info</th>
                    <th className="px-5 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150">
                  {clients.length === 0 ? (
                    <tr>
                      <td colSpan="2" className="px-5 py-8 text-center text-xs font-medium text-slate-400 italic">No clients without subscription found.</td>
                    </tr>
                  ) : (
                    clients.map(client => (
                      <tr key={client.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900">{client.name}</span>
                            {client.businessName && (
                              <span className="text-xs text-slate-600 font-semibold">{client.businessName}</span>
                            )}
                            <span className="text-[11px] text-slate-400 font-medium mt-0.5">{client.email}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <button
                            onClick={() => {
                              setFormData({
                                ...formData,
                                clientId: client.clientId
                              });
                              setShowRegisterForm(true);
                              setShowAdditionalDetails(false);
                              // Smooth scroll to form
                              window.scrollTo({ top: 120, behavior: 'smooth' });
                            }}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <Plus size={14} className="stroke-[3]" />
                            <span>Assign Plan</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* All Subscriptions Tab */}
      {activeTab === 'all-subscriptions' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm animate-in fade-in duration-200">
          <div className="mb-4">
            <h2 className="text-base font-bold text-slate-800">Active Subscriptions Overview</h2>
            <p className="text-xs text-slate-400 font-medium">Overview of active, expiring, or cancelled plans.</p>
          </div>
          <div className="overflow-hidden border border-slate-150 rounded-xl">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-150">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Client</th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Plan & Pricing</th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Validity & Status</th>
                  <th className="px-5 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150">
                {allSubscriptions.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-5 py-8 text-center text-xs font-medium text-slate-400 italic">No subscriptions found.</td>
                  </tr>
                ) : (
                  allSubscriptions.map(sub => (
                    <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900">{sub.clientName}</span>
                          <span className="text-xs text-slate-500 font-semibold">{sub.businessName || '-'}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-700">{sub.planName}</span>
                          <span className="text-xs text-slate-500 font-bold">{formatCurrency(sub.amount_paid)}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex flex-col gap-1.5 items-start">
                          <span className={getStatusBadgeClass(sub.status)}>
                            {sub.status}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-400">Expires: {formatDate(sub.end_date)}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex gap-2 justify-end">
                          {sub.status === 'active' && (
                            <>
                              <button
                                onClick={() => handleRenewSubscription(sub.id)}
                                className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg border border-emerald-150 font-bold text-xs transition-colors"
                              >
                                Renew
                              </button>
                              <button
                                onClick={() => handleCancelSubscription(sub.id)}
                                className="px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg border border-rose-150 font-bold text-xs transition-colors"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Statistics Tab */}
      {activeTab === 'stats' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
            <p className="text-xs text-slate-500 font-semibold leading-relaxed">
              * Active Subscriptions indicate live clients. Expired refers to plans whose duration has lapsed. Cancelled represents manually terminated contracts.
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : subscriptionStats.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-10 text-center text-slate-500 font-medium">
              No subscription statistics found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {subscriptionStats.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow transition-shadow">
                  <h3 className="text-sm font-bold text-slate-800 pb-3 border-b border-slate-100 mb-4">{stat.planName || 'Total Performance'}</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center py-2 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">Active</span>
                        <span className="text-xl font-bold text-blue-600 mt-1 block">{stat.activeSubscriptions || 0}</span>
                      </div>
                      <div className="text-center py-2 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">Expired</span>
                        <span className="text-xl font-bold text-amber-600 mt-1 block">{stat.expiredSubscriptions || 0}</span>
                      </div>
                      <div className="text-center py-2 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="block text-slate-400 text-[10px] font-bold uppercase tracking-wider">Cancelled</span>
                        <span className="text-xl font-bold text-rose-600 mt-1 block">{stat.cancelledSubscriptions || 0}</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-slate-100 pt-4 mt-2">
                      <div className="flex justify-between items-center px-1">
                        <span className="text-xs font-semibold text-slate-500">Active Monthly Revenue:</span>
                        <span className="text-lg font-black text-emerald-600">{formatCurrency(stat.totalActiveRevenue)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {/* Add/Edit Plan Modal */}
      {showPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden transform transition-all animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h3 className="text-base font-black text-slate-800">
                {editingPlan ? 'Edit Subscription Plan' : 'Create New Subscription Plan'}
              </h3>
              <button
                onClick={() => {
                  setShowPlanModal(false);
                  setEditingPlan(null);
                }}
                className="text-slate-400 hover:text-slate-650 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handlePlanSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Plan Code (Unique)</label>
                  <input
                    type="text"
                    required
                    disabled={!!editingPlan}
                    value={planFormData.plan_code}
                    onChange={(e) => setPlanFormData({ ...planFormData, plan_code: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-xs font-semibold shadow-inner focus:outline-none"
                    placeholder="e.g. basic-plan"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Plan Name</label>
                  <input
                    type="text"
                    required
                    value={planFormData.plan_name}
                    onChange={(e) => setPlanFormData({ ...planFormData, plan_name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-xs font-semibold shadow-inner focus:outline-none"
                    placeholder="e.g. Basic Starter"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-bold text-slate-600">Description</label>
                  <input
                    type="text"
                    value={planFormData.description}
                    onChange={(e) => setPlanFormData({ ...planFormData, description: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-xs font-semibold shadow-inner focus:outline-none"
                    placeholder="Brief summary of plan limits"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Price (INR)</label>
                  <input
                    type="number"
                    required
                    value={planFormData.price}
                    onChange={(e) => setPlanFormData({ ...planFormData, price: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-xs font-semibold shadow-inner focus:outline-none"
                    placeholder="0"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Duration (Days)</label>
                  <input
                    type="number"
                    required
                    value={planFormData.duration_days}
                    onChange={(e) => setPlanFormData({ ...planFormData, duration_days: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-xs font-semibold shadow-inner focus:outline-none"
                    placeholder="30"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Max Reviews/Month (Blank for unlimited)</label>
                  <input
                    type="number"
                    value={planFormData.max_reviews_per_month}
                    onChange={(e) => setPlanFormData({ ...planFormData, max_reviews_per_month: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-xs font-semibold shadow-inner focus:outline-none"
                    placeholder="e.g. 100"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Plan Badge (Optional)</label>
                  <input
                    type="text"
                    value={planFormData.badge}
                    onChange={(e) => setPlanFormData({ ...planFormData, badge: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-xs font-semibold shadow-inner focus:outline-none"
                    placeholder="e.g. POPULAR"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-bold text-slate-600">Features (Comma-separated)</label>
                  <textarea
                    rows="2"
                    value={planFormData.featuresString}
                    onChange={(e) => setPlanFormData({ ...planFormData, featuresString: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-xs font-semibold shadow-inner focus:outline-none"
                    placeholder="Feature 1, Feature 2, Feature 3"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowPlanModal(false);
                    setEditingPlan(null);
                  }}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs transition-colors cursor-pointer"
                >
                  {editingPlan ? 'Save Changes' : 'Create Plan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionManagement;
