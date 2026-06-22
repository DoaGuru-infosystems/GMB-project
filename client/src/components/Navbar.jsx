import React, { useRef, useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, QrCode, Settings, LogOut, Menu, X, Users, MessageSquare, CreditCard, Bell } from 'lucide-react';
import { authService, adminService, BASE_URL } from '../services/api';
import { useClientContext } from '../context/ClientContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import logo from '../assets/logonew.png';

const Navbar = () => {
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const { clients, fetchClients } = useClientContext();
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const auth = await authService.verifyAuth();
        if (auth.isAuthenticated) {
          const currentUser = auth.user || {};
          if (!currentUser.role) currentUser.role = 'admin';
          setUser(currentUser);
        } else { navigate('/admin/login'); }
      } catch (err) { navigate('/admin/login'); }
    };
    fetchUser();
  }, [navigate]);

  useEffect(() => {
    if (user?.role === 'admin') {
      const fetchNotifications = async () => {
        try {
          const data = await adminService.getNotifications();
          setNotifications(data || []);
        } catch (error) { console.error(error); }
      };

      fetchNotifications();
      fetchClients(); // Uses optimized version from context

      const interval = setInterval(fetchNotifications, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [user, fetchClients]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotifyOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      if (user.role === 'admin') await adminService.markNotificationRead(id);
      setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: 1 } : n));
    } catch (error) { console.error(error); }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const handleSignOut = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('token');
      navigate('/admin/login');
    } catch (error) { navigate('/admin/login'); }
  };

  useGSAP(() => {
    gsap.from('.nav-item-anim', {
      x: -20,
      opacity: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: 'power2.out'
    });
  }, { scope: sidebarRef });

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Reviews', path: '/admin/reviews', icon: <MessageSquare size={18} /> },
    ...(user?.role === 'admin' ? [
      { name: 'Clients', path: '/admin/clients', icon: <Users size={18} /> },
      { name: 'Notifications', path: '/admin/notifications', icon: <Bell size={18} /> },
      { name: 'Subscriptions', path: '/admin/subscriptions', icon: <CreditCard size={18} /> }
    ] : []),
    { name: 'QR Codes', path: '/admin/qrcode', icon: <QrCode size={18} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={18} /> },
  ];

  const branding = {
    primary: user?.primaryColor || '#2563eb',
    secondary: user?.secondaryColor || '#2dd4bf',
  };

  return (
    <div className="flex min-h-screen font-sans text-slate-900 bg-slate-50" style={{
      backgroundImage: `radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.015) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.015) 0px, transparent 50%)`
    }}>

      {/* ── Overlay ── */}
      <div
        className={`fixed inset-0 bg-slate-900/40 z-[100] lg:hidden backdrop-blur-sm transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* ── Sidebar ── */}
      <aside
        ref={sidebarRef}
        className={`bg-white/80 backdrop-blur-md border-r border-slate-100 flex flex-col fixed h-screen z-[110] transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0 w-[280px]' : '-translate-x-full w-[280px] lg:translate-x-0'} 
          ${isDesktopSidebarOpen ? 'lg:w-[260px]' : 'lg:w-0 lg:border-none'}`}
      >
        <div className="p-4 border-b border-slate-100 flex justify-between items-center h-20 shrink-0 overflow-hidden bg-slate-50/20">
          <div className={`flex items-center gap-3 transition-opacity duration-300 ${isDesktopSidebarOpen || isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-10 h-10 rounded-xl shadow-[0_4px_12px_rgba(59,130,246,0.08)] flex items-center justify-center bg-white border border-slate-100 shrink-0 overflow-hidden">
              <img src={logo} alt="Logo" className="w-7 h-7 object-contain" />
            </div>
            <h2 className="text-xl font-black tracking-tight text-slate-900 whitespace-nowrap bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 bg-clip-text text-transparent">ReviewFlow</h2>
          </div>

          <button
            type="button"
            className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors"
            onClick={() => isMobileMenuOpen ? setIsMobileMenuOpen(false) : setIsDesktopSidebarOpen(false)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={18} />}
          </button>
        </div>

        <nav className={`flex-1 py-4 px-3 overflow-y-auto overflow-x-hidden scrollbar-hide transition-opacity duration-200 ${isDesktopSidebarOpen || isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
          <ul className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <li key={item.name} className="nav-item-anim">
                <NavLink
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold transition-all duration-200 text-sm whitespace-nowrap ${
                    isActive 
                      ? 'text-white shadow-md hover:scale-[1.02] active:scale-[0.98]' 
                      : 'text-slate-500 hover:bg-slate-50/70 hover:text-slate-900 hover:translate-x-1 active:translate-x-0'
                  }`}
                  style={({ isActive }) => isActive ? { 
                    backgroundColor: branding.primary, 
                    boxShadow: `0 8px 20px -3px ${branding.primary}44` 
                  } : {}}
                >
                  {({ isActive }) => (
                    <>
                      <div className="shrink-0 transition-colors duration-200" style={{ color: isActive ? 'white' : branding.primary }}>{item.icon}</div>
                      <span>{item.name}</span>
                      {item.name === 'Notifications' && unreadCount > 0 && (
                        <span className={`ml-auto px-2 py-0.5 text-[10px] font-black flex items-center justify-center rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-red-500 text-white'}`}>
                          {unreadCount}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={`p-4 border-t border-slate-100 transition-opacity duration-200 ${isDesktopSidebarOpen || isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold transition-all w-full text-left text-slate-500 hover:bg-rose-50 hover:text-rose-600 text-sm"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className={`flex-1 flex flex-col min-h-screen min-w-0 transition-all duration-300 ${isDesktopSidebarOpen ? 'lg:ml-[260px]' : 'ml-0'}`}>
        <div className="h-20 bg-white/70 backdrop-blur-lg border-b border-slate-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-[50] shadow-[0_2px_15px_rgba(0,0,0,0.01)]">

          <div className="flex items-center gap-3">
            <button
              className={`p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-slate-100 rounded-lg transition-all active:scale-95 ${isDesktopSidebarOpen ? 'lg:hidden' : 'flex'}`}
              onClick={() => window.innerWidth < 1024 ? setIsMobileMenuOpen(true) : setIsDesktopSidebarOpen(true)}
            >
              <Menu size={20} strokeWidth={2.5} />
            </button>
            <h2 className={`text-lg font-bold text-slate-900 transition-opacity ${isDesktopSidebarOpen ? 'lg:opacity-0' : 'opacity-100'}`}>ReviewFlow</h2>
          </div>

          <div className="flex items-center gap-3 font-bold text-slate-700 ml-auto">
            <div className="hidden sm:flex flex-col text-right mr-1">
              <span className="text-xs">{user?.role === 'admin' ? 'Admin' : (user?.businessName || 'Client')}</span>
              <span className="text-[9px] text-slate-400 uppercase tracking-tighter">{user?.role}</span>
            </div>

            {user?.role === 'admin' && (
              <div className="relative border-l border-slate-100 pl-3" ref={notificationRef}>
                <button
                  onClick={() => setIsNotifyOpen(!isNotifyOpen)}
                  className="p-1.5 text-slate-400 hover:text-slate-900 relative"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {isNotifyOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-[150] animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                      <h3 className="font-bold text-sm text-slate-900">Updates</h3>
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full" style={{ color: branding.primary, backgroundColor: `${branding.primary}15` }}>{unreadCount} New</span>
                    </div>
                    <div className="max-h-[350px] overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-10 text-center text-slate-300 italic text-xs">No notifications</div>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            className={`p-3.5 border-b border-slate-50 transition-colors hover:bg-slate-50 cursor-pointer ${!n.is_read ? 'bg-blue-50/20' : ''}`}
                            onClick={() => !n.is_read && handleMarkAsRead(n.id)}
                          >
                            <p className={`text-xs leading-snug ${!n.is_read ? 'font-bold text-slate-900' : 'text-slate-500'}`}>{n.message}</p>
                            <p className="text-[9px] text-slate-400 mt-1">{new Date(n.createdAt).toLocaleDateString()}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="w-10 h-10 rounded-xl bg-white border border-slate-150 overflow-hidden shadow-md ring-4 ring-primary/5 hover:ring-primary/15 transition-all duration-300">
              <img
                src={user?.role === 'client' && user?.logo
                  ? (user.logo.startsWith('http') ? user.logo : `${BASE_URL}${user.logo.startsWith('/') ? '' : '/'}${user.logo}`)
                  : logo}
                alt="Logo"
                className="w-full h-full object-contain p-1.5"
              />
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 flex-1 overflow-x-hidden">
          <Outlet context={{ user, branding, clients }} />
        </div>
      </main>
    </div>
  );
};

export default Navbar;
