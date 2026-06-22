import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useOutletContext } from 'react-router-dom';
import { Search, Star, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { reviewService, clientService, authService, adminService } from '../../services/api';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ReviewsPage = () => {
  const { register, watch } = useForm({
    defaultValues: {
      searchTerm: ''
    }
  });

  const { user, clients: contextClients } = useOutletContext();
  const [reviews, setReviews] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  });
  const [loading, setLoading] = useState(true);
  const [emailFilter, setEmailFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const containerRef = useRef(null);
  const [userRole, setUserRole] = useState(user?.role || null);
  const [selectedClient, setSelectedClient] = useState('all');
  const [clients, setClients] = useState(contextClients || []);

  const searchTerm = watch("searchTerm");

  useEffect(() => {
    setCurrentPage(1);
  }, [emailFilter, selectedClient]);

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

  const fetchReviewsData = async () => {
    if (!userRole) return;
    try {
      setLoading(true);
      let response;
      if (userRole === 'client') {
        // getClientReviews: (type, search, dateRange, startDate, endDate, page, limit)
        response = await clientService.getClientReviews('', emailFilter, '', '', '', currentPage, itemsPerPage);
      } else {
        // getAllReviews: (clientId, dateRange, startDate, endDate, page, limit)
        response = await reviewService.getAllReviews(selectedClient, '', '', '', currentPage, itemsPerPage);
      }

      if (response && response.reviews) {
        setReviews(response.reviews);
        setPagination(response.pagination);
      } else if (Array.isArray(response)) {
        // Fallback for old API format if needed, though we updated it
        setReviews(response);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviewsData();
  }, [userRole, selectedClient, emailFilter, currentPage]);

  useGSAP(() => {
    if (!loading) {
      gsap.fromTo('.reviews-anim',
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out',
          clearProps: 'all'
        }
      );
    }
  }, { scope: containerRef, dependencies: [loading, reviews] });

  // Export to CSV (fetches ALL reviews for export - or we can limit it)
  const handleExport = async () => {
    try {
      let exportData = [];
      if (userRole === 'client') {
        const res = await clientService.getClientReviews('', emailFilter, '', '', '', 1, 100000);
        exportData = res.reviews || res;
      } else {
        const res = await reviewService.getAllReviews(selectedClient, '', '', '', 1, 100000);
        exportData = res.reviews || res;
      }

      if (!exportData || !Array.isArray(exportData) || exportData.length === 0) {
        alert("No reviews found to export.");
        return;
      }

      const headers = ['Name', 'Email', 'Phone', 'Rating', 'Review', 'Date', 'Time', 'Business'];
      const csvContent = exportData.map(r => {
        const dateObj = r.createdAt ? new Date(r.createdAt) : null;
        const date = dateObj ? dateObj.toLocaleDateString() : '';
        const time = dateObj ? dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

        return [
          `"${r.fullName || ''}"`,
          `"${r.email || ''}"`,
          `"${r.mobile || ''}"`,
          r.rating || '',
          `"${(r.review || '').replace(/"/g, '""')}"`,
          `"${date}"`,
          `"${time}"`,
          `"${r.businessName || ''}"`
        ].join(',');
      });

      const blob = new Blob([[headers.join(','), ...csvContent].join('\n')], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `All_Reviews_${selectedClient === 'all' ? 'All_Clients' : selectedClient}_${new Date().toLocaleDateString()}.csv`;
      a.click();
    } catch (err) {
      console.error("Export failed:", err);
      alert("Failed to export reviews.");
    }
  };

  if (loading && reviews.length === 0) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div ref={containerRef} className="space-y-6 pb-10 font-sans">
      {/* Page Title & Export */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 reviews-anim">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-2.5 inline-block">Feedback Analytics</span>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 bg-gradient-to-r from-slate-900 to-indigo-950 bg-clip-text text-transparent">All Reviews</h1>
          <p className="text-slate-500 text-xs font-semibold mt-1">Browse, search, and export real-time feedback from your customers.</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-100 hover:border-slate-200 text-slate-700 text-xs font-bold rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 transition-all duration-200 active:scale-95 shrink-0"
        >
          <Download size={14} className="text-slate-500" />
          Export CSV
        </button>
      </div>

      {/* Main Reviews Card */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.015)] border border-slate-100/80 reviews-anim overflow-hidden overflow-x-auto">
        
        {/* Filters and Search */}
        <div className="p-5 border-b border-slate-100/70 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/50 sticky left-0">
          <div className="flex items-center gap-3 w-full">
            <span className="w-1.5 h-3 bg-primary rounded-full" />
            <h3 className="text-sm font-black text-slate-800 shrink-0 uppercase tracking-wider">Feedback List</h3>

            {userRole === 'admin' && (
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="px-3 py-2 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 hover:border-slate-200 rounded-xl text-[11px] font-bold outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all cursor-pointer text-slate-700"
              >
                <option value="all">All Clients</option>
                <option value="admin">DOAGuru Reviews</option>
                {clients.map(c => (
                  <option key={c.clientId} value={c.clientId}>{c.businessName}</option>
                ))}
              </select>
            )}
          </div>

          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search customer, email..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-100 hover:border-slate-200 focus:border-primary rounded-xl text-xs outline-none focus:ring-4 focus:ring-primary/5 transition-all font-semibold text-slate-700 shadow-inner placeholder-slate-400"
              {...register("searchTerm")}
            />
          </div>
        </div>

        {/* Table */}
        <div className="min-w-full inline-block align-middle">
          <table className="min-w-full divide-y divide-slate-100">
            <thead>
              <tr className="bg-slate-50/20">
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Customer</th>
                {userRole === 'admin' && <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Branch/Business</th>}
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Rating</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">Feedback</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Date & Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100/50">
              {reviews.length > 0 ? reviews.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50/30 transition-colors group">
                  {/* Customer Info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 text-indigo-600 font-bold border border-indigo-500/10 flex items-center justify-center shadow-[0_2px_6px_rgba(99,102,241,0.04)] group-hover:scale-105 transition-transform duration-250 text-xs shrink-0">
                        {r.fullName?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900 group-hover:text-primary transition-colors">{r.fullName}</span>
                        <span className="text-[10px] text-slate-400 font-semibold mt-0.5">{r.email}</span>
                        <span className="text-[9px] text-slate-400/80 font-bold mt-0.5">{r.mobile}</span>
                      </div>
                    </div>
                  </td>

                  {/* Branch/Business */}
                  {userRole === 'admin' && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 bg-slate-50 text-slate-600 rounded-lg text-[10px] font-bold border border-slate-100/80 group-hover:bg-primary/5 group-hover:text-primary group-hover:border-primary/10 transition-all">
                        {r.businessName || "Unknown"}
                      </span>
                    </td>
                  )}

                  {/* Rating Badge */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg w-fit border shadow-[0_1px_4px_rgba(0,0,0,0.01)] transition-all ${
                      r.rating >= 4 
                        ? 'bg-emerald-500/5 text-emerald-600 border-emerald-500/10 shadow-emerald-500/5' 
                        : 'bg-rose-500/5 text-rose-600 border-rose-500/10 shadow-rose-500/5'
                    }`}>
                      <Star size={11} fill="currentColor" />
                      <span className="text-xs font-black leading-none">{r.rating}</span>
                    </div>
                  </td>

                  {/* Review Text */}
                  <td className="px-6 py-4">
                    <div className="max-w-md text-[11px] leading-relaxed text-slate-600 font-medium pl-3 border-l-2 border-slate-100 group-hover:border-primary/20 transition-all py-0.5 line-clamp-2 hover:line-clamp-none transition-all cursor-default">
                      <span className="text-slate-400 font-serif text-sm inline-block mr-1 leading-none">“</span>
                      {r.review || <span className="text-slate-300 italic font-medium">No written feedback</span>}
                    </div>
                  </td>

                  {/* Date & Time */}
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-slate-700 font-bold tracking-tight">{r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ''}</span>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{r.createdAt ? new Date(r.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={userRole === 'admin' ? 5 : 4} className="px-6 py-20 text-center text-slate-400 font-bold italic text-xs">
                    {loading ? 'Refreshing reviews...' : 'No reviews found matching your search.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100/70 bg-slate-50/20 sticky left-0">
            <p className="text-[10px] text-slate-450 font-bold uppercase tracking-widest">
              Showing <span className="text-slate-900">{(pagination.page - 1) * pagination.limit + 1}</span> to <span className="text-slate-900">{Math.min(pagination.page * pagination.limit, pagination.total)}</span> of <span className="text-slate-900">{pagination.total}</span> Results
            </p>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-slate-200 text-slate-400 hover:text-primary hover:border-primary/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_1px_3px_rgba(0,0,0,0.02)] shrink-0"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex items-center gap-1 mx-1.5">
                {[...Array(pagination.totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  if (
                    pageNum === 1 ||
                    pageNum === pagination.totalPages ||
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`min-w-[32px] h-8 px-2 rounded-lg flex items-center justify-center text-[10px] font-black transition-all ${currentPage === pageNum ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                    return <span key={i} className="text-slate-300 text-[10px]">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                disabled={currentPage === pagination.totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-slate-200 text-slate-400 hover:text-primary hover:border-primary/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_1px_3px_rgba(0,0,0,0.02)] shrink-0"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
