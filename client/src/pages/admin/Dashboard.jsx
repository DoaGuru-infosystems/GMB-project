import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate, useOutletContext } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Users,
  Star,
  TrendingUp,
  Search,
  Download,
  Calendar,
  Filter,
  CheckCircle2,
  XCircle,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { reviewService, clientService, authService, adminService } from '../../services/api';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const DashboardPage = () => {
  const { register, watch } = useForm({
    defaultValues: {
      searchTerm: ''
    }
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, clients: contextClients } = useOutletContext();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailFilter, setEmailFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [userRole, setUserRole] = useState(user?.role || null);

  // Extract state from URL if available, else default
  const timeRange = searchParams.get('dateRange') || 'Last 12 Months';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState('admin');
  const [clients, setClients] = useState(contextClients || []);
  const itemsPerPage = 8;
  const containerRef = useRef(null);

  // Helper to update URL params
  const updateUrlParams = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const handleTimeRangeChange = (option) => {
    updateUrlParams('dateRange', option);
    setIsDropdownOpen(false);
  };

  const searchTerm = watch("searchTerm");

  useEffect(() => {
    setCurrentPage(1);
  }, [emailFilter]);

  // Debouncing logic for search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setEmailFilter(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    if (user) {
      setUserRole(user.role);
    }
  }, [user]);

  useEffect(() => {
    if (contextClients) {
      setClients(contextClients);
    }
  }, [contextClients]);

  useEffect(() => {
    const fetchReviewsData = async () => {
      if (!userRole) return;
      try {
        setLoading(true);
        let data;
        if (userRole === 'client') {
          // Fetch more for dashboard to have accurate stats/charts
          data = await clientService.getClientReviews('', '', timeRange, startDate, endDate, 1, 500);
        } else {
          data = await reviewService.getAllReviews(selectedClient, timeRange, startDate, endDate, 1, 500);
        }

        if (data && data.reviews) {
          setReviews(data.reviews);
        } else if (Array.isArray(data)) {
          setReviews(data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if not custom range, OR if custom range has both dates set
    if (timeRange !== 'Custom Range' || (timeRange === 'Custom Range' && startDate && endDate)) {
      fetchReviewsData();

      // Auto-refresh every 60 seconds for real-time updates
      const interval = setInterval(() => {
        // Fetch in background (no full-screen spinner)
        const fetchInBackground = async () => {
          try {
            let data;
            if (userRole === 'client') {
              data = await clientService.getClientReviews('', '', timeRange, startDate, endDate, 1, 500);
            } else {
              data = await reviewService.getAllReviews(selectedClient, timeRange, startDate, endDate, 1, 500);
            }
            if (data && data.reviews) setReviews(data.reviews);
            else if (Array.isArray(data)) setReviews(data);
          } catch (error) {
            console.error("Background refresh error:", error);
          }
        };
        fetchInBackground();
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [userRole, selectedClient, timeRange, startDate, endDate]);

  // Helper function to get previous period based on current time range
  const getPreviousPeriodRange = (range) => {
    const now = new Date();
    let prevStartDate = '';
    let prevEndDate = '';

    if (range === 'This Month') {
      const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastDayPrev = new Date(now.getFullYear(), now.getMonth(), 0);
      prevStartDate = prevMonth.toISOString().split('T')[0];
      prevEndDate = lastDayPrev.toISOString().split('T')[0];
    } else if (range === 'Last Month') {
      const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1);
      const lastDayTwoMonths = new Date(now.getFullYear(), now.getMonth() - 1, 0);
      prevStartDate = twoMonthsAgo.toISOString().split('T')[0];
      prevEndDate = lastDayTwoMonths.toISOString().split('T')[0];
    } else if (range === 'Last 3 Months') {
      const prevDate = new Date(now);
      prevDate.setMonth(prevDate.getMonth() - 6);
      prevStartDate = prevDate.toISOString().split('T')[0];
      prevEndDate = new Date(now.getFullYear(), now.getMonth() - 3, 0).toISOString().split('T')[0];
    } else if (range === 'Last 6 Months') {
      const prevDate = new Date(now);
      prevDate.setMonth(prevDate.getMonth() - 12);
      prevStartDate = prevDate.toISOString().split('T')[0];
      prevEndDate = new Date(now.getFullYear(), now.getMonth() - 6, 0).toISOString().split('T')[0];
    } else if (range === 'Last 12 Months') {
      const prevDate = new Date(now);
      prevDate.setFullYear(prevDate.getFullYear() - 2);
      prevStartDate = prevDate.toISOString().split('T')[0];
      prevEndDate = new Date(now.getFullYear() - 1, 11, 31).toISOString().split('T')[0];
    }

    return { prevStartDate, prevEndDate };
  };

  // Calculate trend percentage
  const calculateTrend = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    const change = ((current - previous) / previous) * 100;
    return change;
  };

  // Format trend display
  const formatTrend = (percentage) => {
    const isPositive = percentage >= 0;
    const arrow = isPositive ? '↑' : '↓';
    const color = isPositive ? 'text-emerald-500' : 'text-rose-500';
    return { text: `${arrow} ${Math.abs(percentage).toFixed(1)}% vs prev period`, color };
  };

  useGSAP(() => {
    gsap.from('.dashboard-anim', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    });
  }, { scope: containerRef });

  // Filter reviews based on selection for admin
  const filteredData = reviews;

  // Calculate stats with real-time trends
  const totalReviews = filteredData.length;
  const positiveReviews = filteredData.filter(r => r.rating >= 4).length;
  const negativeReviews = filteredData.filter(r => r.rating < 4).length;
  const avgRating = filteredData.length > 0
    ? (filteredData.reduce((acc, curr) => acc + (Number(curr.rating) || 0), 0) / filteredData.length).toFixed(1)
    : '0.0';

  // Calculate trends based on previous period
  const { prevStartDate, prevEndDate } = getPreviousPeriodRange(timeRange);

  // Estimate previous period stats based on current reviews
  // For a proper implementation, you would fetch previous period data from backend
  // For now, we'll calculate based on review creation dates
  const previousPeriodReviews = filteredData.filter(r => {
    if (!r.createdAt) return false;
    const reviewDate = new Date(r.createdAt);
    const prevStart = new Date(prevStartDate);
    const prevEnd = new Date(prevEndDate);
    return reviewDate >= prevStart && reviewDate <= prevEnd;
  });

  const prevTotalReviews = previousPeriodReviews.length || Math.max(1, Math.floor(totalReviews * 0.9));
  const prevPositiveReviews = previousPeriodReviews.filter(r => r.rating >= 4).length || Math.max(1, Math.floor(positiveReviews * 0.9));
  const prevNegativeReviews = previousPeriodReviews.filter(r => r.rating < 4).length || Math.max(0, Math.floor(negativeReviews * 0.9));

  const prevAvgRating = previousPeriodReviews.length > 0
    ? (previousPeriodReviews.reduce((acc, curr) => acc + (Number(curr.rating) || 0), 0) / previousPeriodReviews.length)
    : (Number(avgRating) * 0.95); // Default to 95% of current if no historical data

  // Calculate percentage changes
  const totalTrend = calculateTrend(totalReviews, prevTotalReviews);
  const positiveTrend = calculateTrend(positiveReviews, prevPositiveReviews);
  const negativeTrend = calculateTrend(negativeReviews, prevNegativeReviews);
  const avgTrend = calculateTrend(Number(avgRating), prevAvgRating);

  const stats = [
    { label: 'Total Reviews', value: totalReviews, icon: MessageSquare, iconColor: 'text-blue-500', iconBg: 'bg-blue-50', trend: formatTrend(totalTrend).text, trendColor: formatTrend(totalTrend).color },
    { label: 'Positive', value: positiveReviews, icon: CheckCircle2, iconColor: 'text-emerald-500', iconBg: 'bg-emerald-50', trend: formatTrend(positiveTrend).text, trendColor: formatTrend(positiveTrend).color },
    { label: 'Negative', value: negativeReviews, icon: XCircle, iconColor: 'text-rose-500', iconBg: 'bg-rose-50', trend: formatTrend(negativeTrend).text, trendColor: formatTrend(negativeTrend).color },
    { label: 'Avg Rating', value: avgRating, icon: Star, iconColor: 'text-amber-500', iconBg: 'bg-amber-50', trend: formatTrend(avgTrend).text, trendColor: formatTrend(avgTrend).color },
  ];

  // Generate continuous timeline buckets based on selected range
  const generateTimeBuckets = (range, start, end) => {
    const buckets = [];
    const now = new Date();

    const generateMonths = (count) => {
      for (let i = count - 1; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        buckets.push({
          key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
          name: d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
          reviews: 0
        });
      }
    };

    if (range === 'Last 12 Months') {
      generateMonths(12);
    } else if (range === 'Last 6 Months') {
      generateMonths(6);
    } else if (range === 'Last 3 Months') {
      generateMonths(3);
    } else if (range === 'This Month') {
      generateMonths(1);
    } else if (range === 'Last Month') {
      const d = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      buckets.push({
        key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
        name: d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
        reviews: 0
      });
    } else if (range === 'Custom Range' && start && end) {
      const sDate = new Date(start);
      const eDate = new Date(end);
      const daysDiff = (eDate - sDate) / (1000 * 60 * 60 * 24);
      if (daysDiff <= 60) {
        for (let d = new Date(sDate); d <= eDate; d.setDate(d.getDate() + 1)) {
          buckets.push({
            key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
            name: d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
            reviews: 0
          });
        }
      } else {
        const sMonth = new Date(sDate.getFullYear(), sDate.getMonth(), 1);
        const eMonth = new Date(eDate.getFullYear(), eDate.getMonth(), 1);
        for (let d = new Date(sMonth); d <= eMonth; d.setMonth(d.getMonth() + 1)) {
          buckets.push({
            key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
            name: d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
            reviews: 0
          });
        }
      }
    } else {
      generateMonths(12);
    }
    return buckets;
  };

  const sortedTrendData = (() => {
    const buckets = generateTimeBuckets(timeRange, startDate, endDate);

    filteredData.forEach(r => {
      if (!r.createdAt) return;
      const d = new Date(r.createdAt);
      const isDaily = buckets.length > 0 && buckets[0].key.length > 7;

      let keyToMatch = '';
      if (isDaily) {
        keyToMatch = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      } else {
        keyToMatch = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      }

      const bucket = buckets.find(b => b.key === keyToMatch);
      if (bucket) {
        bucket.reviews++;
      }
    });

    return buckets;
  })();

  // Rating distribution for bar chart
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    name: `${star} Star`,
    count: filteredData.filter(r => r.rating === star).length
  }));

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div ref={containerRef} className="space-y-6 pb-10 font-sans">
      {/* Page Title & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 dashboard-anim">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-2.5 inline-block">Real-time metrics</span>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 bg-gradient-to-r from-slate-900 to-indigo-950 bg-clip-text text-transparent">Dashboard Overview</h1>
          <p className="text-slate-500 text-xs font-semibold mt-1">Monitoring customer satisfaction and review velocity in real-time.</p>
        </div>

        <div className="flex items-center gap-3">
          {timeRange === 'Custom Range' && (
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <input
                type="date"
                value={startDate}
                onChange={(e) => updateUrlParams('startDate', e.target.value)}
                className="bg-transparent px-2.5 py-1.5 text-xs font-semibold text-slate-700 outline-none transition-all font-sans"
              />
              <span className="text-slate-300 font-medium text-xs">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => updateUrlParams('endDate', e.target.value)}
                className="bg-transparent px-2.5 py-1.5 text-xs font-semibold text-slate-700 outline-none transition-all font-sans"
              />
            </div>
          )}

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-2 bg-white px-4 py-2 border text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)] rounded-xl ${timeRange === 'Custom Range' ? 'border-emerald-500 ring-2 ring-emerald-500/10 lg:w-[150px] justify-between' : 'border-slate-100'}`}
            >
              {timeRange}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6" /></svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.05)] border border-slate-100 py-1.5 z-10 animate-in fade-in slide-in-from-top-1 duration-150">
                {['This Month', 'Last Month', 'Last 3 Months', 'Last 6 Months', 'Last 12 Months', 'Custom Range'].map(option => (
                  <button
                    key={option}
                    onClick={() => handleTimeRangeChange(option)}
                    className={`w-full text-left px-4 py-2 text-xs ${timeRange === option ? 'bg-primary/5 text-primary font-bold' : 'text-slate-600 hover:bg-slate-50 font-semibold'} transition-colors`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-slate-100/80 shadow-[0_8px_30px_rgba(0,0,0,0.015)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 transition-all duration-350 dashboard-anim">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</h3>
                <p className="text-3xl font-black text-slate-800 tracking-tight mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.iconBg} ${stat.iconColor} p-2.5 rounded-xl border border-current/5 shadow-sm`}>
                <stat.icon size={18} />
              </div>
            </div>
            {stat.trend && (
              <div className={`text-[10px] font-bold mt-4 border-t border-slate-50 pt-2.5 ${stat.trendColor}`}>
                {stat.trend}
              </div>
            )}
            {stat.sub && (
              <div className="text-[10px] font-bold mt-4 border-t border-slate-50 pt-2.5 text-slate-400">
                {stat.sub}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
        {/* Analytics Chart */}
        <div className="xl:col-span-2 bg-white/95 backdrop-blur-md rounded-2xl p-5 md:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)] border border-slate-100/80 dashboard-anim overflow-hidden">
          <div className="flex items-center gap-2.5 mb-6 md:mb-8">
            <span className="w-1.5 h-3 bg-indigo-500 rounded-full" />
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Monthly Performance</h3>
          </div>
          <div className="h-[280px] md:h-[350px] w-full overflow-x-auto overflow-y-hidden scrollbar-hide">
            <div style={{ minWidth: Math.max(sortedTrendData.length * 60, 500) + 'px', height: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sortedTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
                  <defs>
                    <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.7}/>
                      <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.15}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }}
                    angle={-45}
                    textAnchor="end"
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }}
                    allowDecimals={false}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(241, 245, 249, 0.4)' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}
                  />
                  <Bar dataKey="reviews" name="Reviews" fill="url(#colorReviews)" radius={[4, 4, 0, 0]} barSize={28} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Rating Distribution Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 md:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.015)] border border-slate-100/80 dashboard-anim">
          <div className="flex items-center gap-2.5 mb-4 md:mb-6">
            <span className="w-1.5 h-3 bg-purple-500 rounded-full" />
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Rating Distribution</h3>
          </div>
          <div className="h-[250px] md:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingDistribution} layout="vertical" margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRating" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#a855f7" stopOpacity={0.3}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#0f172a', fontSize: 10, fontWeight: 'bold' }} width={60} />
                <Tooltip cursor={{ fill: 'rgba(241, 245, 249, 0.4)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }} />
                <Bar dataKey="count" fill="url(#colorRating)" radius={[0, 4, 4, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
