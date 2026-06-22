import React, { useState, useEffect, useRef } from 'react';
import { Bell, CheckCircle, Clock, User, CalendarX, RefreshCw, Mail, ChevronRight, AlertTriangle, Inbox, ShieldCheck, Zap } from 'lucide-react';
import { adminService, clientService, authService } from '../../services/api';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [expiringSubscriptions, setExpiringSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expiringLoading, setExpiringLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('notifications');
    const [daysFilter, setDaysFilter] = useState(30);
    const [sendingReminder, setSendingReminder] = useState(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const init = async () => {
            try {
                const auth = await authService.verifyAuth();
                setUser(auth.user);
                fetchNotifications(auth.user);
                if (auth.user?.role === 'admin') fetchExpiringSubscriptions(30);
            } catch (error) {
                console.error("Auth init failed:", error);
            }
        };
        init();
    }, []);

    const fetchNotifications = async (currentUser) => {
        try {
            setLoading(true);
            const data = currentUser.role === 'admin'
                ? await adminService.getNotifications()
                : await clientService.getNotifications();
            setNotifications(data || []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const fetchExpiringSubscriptions = async (days) => {
        try {
            setExpiringLoading(true);
            const data = await adminService.getExpiringSubscriptions(days);
            setExpiringSubscriptions(data || []);
        } catch (e) {
            console.error(e);
            setExpiringSubscriptions([]);
        } finally {
            setExpiringLoading(false);
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            user.role === 'admin'
                ? await adminService.markNotificationRead(id)
                : await clientService.markNotificationRead(id);
            setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: 1 } : n));
        } catch (e) {
            console.error(e);
        }
    };

    const handleSendReminder = async (clientId, subId) => {
        try {
            setSendingReminder(subId);
            const res = await adminService.sendReminder(clientId, subId);
            alert(res.message || "Reminder sent successfully!");
        } catch (e) {
            console.error(e);
            alert("Failed to send reminder. Please check your email configuration in .env");
        } finally {
            setSendingReminder(null);
        }
    };

    // ── FIXED ANIMATION LOGIC ──
    // Header only animates on initial mount
    useGSAP(() => {
        gsap.fromTo('.header-anim',
            { y: -20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
        );
    }, { scope: containerRef });

    // Content cards animate when tab/filter/loading changes
    useGSAP(() => {
        if (!loading || !expiringLoading) {
            gsap.fromTo('.card-anim',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
            );
        }
    }, { scope: containerRef, dependencies: [loading, expiringLoading, activeTab, filter] });

    const filteredNotifications = filter === 'unread'
        ? notifications.filter(n => !n.is_read)
        : notifications;

    const unreadCount = notifications.filter(n => !n.is_read).length;
    const isAdmin = user?.role === 'admin';

    const getUrgencyStyles = (days) => {
        if (days <= 2) return { border: 'border-red-500', text: 'text-red-600', badge: 'bg-red-600 text-white', btn: 'bg-red-600 hover:bg-red-700' };
        if (days <= 7) return { border: 'border-orange-500', text: 'text-orange-600', badge: 'bg-orange-500 text-white', btn: 'bg-orange-500 hover:bg-orange-600' };
        return { border: 'border-blue-500', text: 'text-blue-600', badge: 'bg-blue-600 text-white', btn: 'bg-blue-600 hover:bg-blue-700' };
    };

    return (
        <div ref={containerRef} className="space-y-6 pb-10 font-sans">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 header-anim">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-2.5 inline-block">System Alerts</span>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900 bg-gradient-to-r from-slate-900 to-indigo-950 bg-clip-text text-transparent">Notifications</h1>
                    <p className="text-slate-500 text-xs font-semibold mt-1">Manage alerts and subscription renewals.</p>
                </div>

                {unreadCount > 0 && (
                    <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-2 rounded-xl flex items-center gap-2 self-start md:self-auto shadow-sm">
                        <AlertTriangle size={16} className="animate-pulse" />
                        <span className="font-bold text-xs">{unreadCount} Pending Alerts</span>
                    </div>
                )}
            </div>

                {/* ── Tab Selector ── */}
                {isAdmin && (
                    <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm w-fit header-anim">
                        <button
                            onClick={() => setActiveTab('notifications')}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold cursor-pointer transition-all ${activeTab === 'notifications' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'}`}
                        >
                            <Inbox size={16} />
                            Activity
                        </button>
                        <button
                            onClick={() => setActiveTab('expiring')}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold cursor-pointer transition-all ${activeTab === 'expiring' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-900'}`}
                        >
                            <CalendarX size={16} />
                            Expiring Soon
                        </button>
                    </div>
                )}

                {/* ── Content ── */}
                <div className="space-y-6">

                    {activeTab === 'notifications' ? (
                        <>
                            <div className="flex gap-2 header-anim">
                                {['all', 'unread'].map(f => (
                                    <button
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border cursor-pointer transition-all ${filter === f ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-200'}`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>

                            {loading ? (
                                <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div></div>
                            ) : filteredNotifications.length === 0 ? (
                                <div className="bg-white rounded-2xl p-16 text-center border border-slate-200 card-anim">
                                    <ShieldCheck size={48} className="mx-auto text-slate-200 mb-4" />
                                    <h3 className="text-xl font-bold text-slate-900">No Notifications</h3>
                                    <p className="text-slate-400 text-sm">Everything looks good.</p>
                                </div>
                            ) : (
                                <div className="grid gap-3">
                                    {filteredNotifications.map(notif => (
                                        <div
                                            key={notif.id}
                                            className={`bg-white rounded-xl p-5 border transition-all card-anim ${!notif.is_read ? 'border-blue-200 shadow-md shadow-blue-50' : 'border-slate-100'}`}
                                        >
                                            <div className="flex gap-4 items-start">
                                                <div className={`p-2.5 rounded-lg shrink-0 ${!notif.is_read ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-300'}`}>
                                                    <Bell size={18} />
                                                </div>

                                                <div className="flex-1 min-w-0 space-y-3">
                                                    <div className="flex items-center justify-between gap-4">
                                                        <div className="flex items-center gap-2">
                                                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${notif.type === 'renewal_reminder' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                                                                {notif.type?.replace(/_/g, ' ')}
                                                            </span>
                                                            {!notif.is_read && <span className="w-2 h-2 bg-blue-600 rounded-full"></span>}
                                                        </div>
                                                        <span className="text-slate-400 text-xs font-medium">
                                                            {new Date(notif.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>

                                                    <p className={`text-[15px] leading-relaxed ${!notif.is_read ? 'font-bold text-slate-900' : 'text-slate-800'}`}>
                                                        {notif.message}
                                                    </p>

                                                    <div className="flex items-center justify-between gap-4 pt-3 border-t border-slate-50">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">{notif.clientName?.charAt(0)}</div>
                                                            <span className="text-xs font-bold text-slate-700">{notif.clientName}</span>
                                                        </div>

                                                        {!notif.is_read && (
                                                            <button
                                                                onClick={() => handleMarkAsRead(notif.id)}
                                                                className="text-xs font-bold text-blue-600 hover:underline"
                                                            >
                                                                Mark read
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="space-y-6">
                            {/* Summary Stats */}
                            {!expiringLoading && expiringSubscriptions.length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 card-anim">
                                    {[
                                        { label: 'Critical (≤2d)', count: expiringSubscriptions.filter(s => s.daysLeft <= 2).length, color: 'text-red-600', bg: 'bg-red-50' },
                                        { label: 'Warning (3-7d)', count: expiringSubscriptions.filter(s => s.daysLeft > 2 && s.daysLeft <= 7).length, color: 'text-orange-600', bg: 'bg-orange-50' },
                                        { label: 'Healthy (7d+)', count: expiringSubscriptions.filter(s => s.daysLeft > 7).length, color: 'text-blue-600', bg: 'bg-blue-50' },
                                    ].map(stat => (
                                        <div key={stat.label} className={`${stat.bg} rounded-xl p-4 border border-white/50`}>
                                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{stat.label}</p>
                                            <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Filters Bar */}
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4 card-anim">
                                <div className="flex items-center gap-3">
                                    <span className="text-slate-500 font-bold text-xs">Days:</span>
                                    <div className="flex bg-slate-50 p-1 rounded-lg">
                                        {[7, 14, 30].map(d => (
                                            <button
                                                key={d}
                                                onClick={() => { setDaysFilter(d); fetchExpiringSubscriptions(d); }}
                                                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${daysFilter === d ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
                                            >
                                                {d}d
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <button onClick={() => fetchExpiringSubscriptions(daysFilter)} className="text-blue-600 hover:text-blue-700 text-xs font-bold flex items-center gap-1">
                                    <RefreshCw size={14} className={expiringLoading ? 'animate-spin' : ''} />
                                    Refresh
                                </button>
                            </div>

                            {/* Cards */}
                            {expiringLoading ? (
                                <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>
                            ) : expiringSubscriptions.length === 0 ? (
                                <div className="bg-white rounded-2xl p-16 text-center border border-slate-200 card-anim">
                                    <CheckCircle size={40} className="mx-auto text-green-500 mb-4" />
                                    <h3 className="text-lg font-bold text-slate-900">All Good</h3>
                                    <p className="text-slate-400 text-sm">No renewals in {daysFilter} days.</p>
                                </div>
                            ) : (
                                <div className="grid gap-3">
                                    {expiringSubscriptions.map(sub => {
                                        const s = getUrgencyStyles(sub.daysLeft);
                                        return (
                                            <div
                                                key={sub.subscriptionId}
                                                className={`bg-white rounded-xl p-4 border-l-4 shadow-sm card-anim ${s.border}`}
                                            >
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400"><User size={20} /></div>
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <h4 className="font-black text-slate-900 text-lg tracking-tight">{sub.clientName}</h4>
                                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${s.badge}`}>{sub.daysLeft}d left</span>
                                                            </div>
                                                            <p className="text-slate-700 text-sm font-semibold">{sub.businessName}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-6 text-right sm:text-right">
                                                        <div>
                                                            <p className="text-[10px] text-slate-400 font-bold uppercase">Plan</p>
                                                            <p className="text-sm font-bold text-slate-900">{sub.planName}</p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => handleSendReminder(sub.clientId, sub.subscriptionId)}
                                                                disabled={sendingReminder === sub.subscriptionId}
                                                                className={`px-4 py-2 rounded-lg text-white text-xs font-bold transition-all flex items-center gap-2 ${s.btn} disabled:opacity-50`}
                                                            >
                                                                {sendingReminder === sub.subscriptionId ? <RefreshCw size={14} className="animate-spin" /> : <Mail size={14} />}
                                                                {sendingReminder === sub.subscriptionId ? 'Sending...' : 'Send Reminder'}
                                                            </button>
                                                            <a
                                                                href={`mailto:${sub.clientEmail}?subject=${encodeURIComponent("Renewal Reminder")}&body=${encodeURIComponent(`Dear ${sub.clientName},\n\nYour subscription for ${sub.businessName} is expiring in ${sub.daysLeft} days. Please renew it to continue using our services.\n\nPlan: ${sub.planName}`)}`}
                                                                className="p-2 text-slate-400 hover:text-slate-900 bg-slate-50 rounded-lg transition-colors border border-slate-100"
                                                                title="Email Manually"
                                                            >
                                                                <Mail size={16} />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </div>
        </div>
    );
};

export default NotificationsPage;
