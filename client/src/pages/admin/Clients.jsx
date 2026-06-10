import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Plus, Search, MapPin, Building, Mail, Phone, Edit2, Loader2, QrCode, XCircle, CheckCircle, User, Download } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useClientContext } from '../../context/ClientContext';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import QRCodeDisplay from '../../components/QRCodeDisplay';
import { BASE_URL } from '../../services/api';

const Clients = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { clients, loading, error, fetchClients, createClient, updateClient, toggleClientStatus } = useClientContext();

  React.useEffect(() => {
    fetchClients();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQrClient, setSelectedQrClient] = useState(null);
  const qrRef = useRef(null);

  const downloadQR = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector('canvas');
    if (!canvas) return;
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    const name = selectedQrClient.businessName || selectedQrClient.clientId || 'client';
    downloadLink.download = `${name.replace(/\s+/g, '_')}_QR.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // Remove useForm as it's now in ClientsEdit.jsx

  useGSAP(() => {
    if (!loading && clients.length > 0) {
      gsap.fromTo('.client-row',
        { y: 15, opacity: 0 },
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
  }, { scope: containerRef, dependencies: [loading, clients] });

  const handleToggleStatus = async (clientId, currentStatus) => {
    try {
      await toggleClientStatus(clientId, currentStatus);
    } catch (err) {
      alert("Failed to toggle status: " + err.message);
    }
  };

  const openCreateModal = () => {
    navigate('/admin/clients/new');
  };

  const openEditModal = (client) => {
    navigate(`/admin/clients/edit/${client.clientId}`);
  };

  const filteredClients = clients.filter(c =>
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.clientId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div ref={containerRef} className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-1">Client Management</h1>
          <p className="text-slate-500">Manage client accounts, adjust details, and toggle access.</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-5 py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
        >
          <Plus size={20} />
          Create Client
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-8 flex items-center gap-3">
        <Search className="text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Search by name, business, or client ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent border-none outline-none text-slate-700 placeholder-slate-400 font-medium"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-primary w-10 h-10" />
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-200 font-medium">
          {error}
        </div>
      ) : filteredClients.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
          <Building className="mx-auto text-slate-300 mb-4 w-12 h-12" />
          <h3 className="text-lg font-bold text-slate-700 mb-1">No Clients Found</h3>
          <p className="text-slate-500">Try adjusting your search or add a new client.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500">
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-wide">Business Info</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-wide">Target Keywords</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-wide">Contact Details</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-wide">Place ID</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-wide text-center">Status</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-wide text-center">Review Link</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-wide text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredClients.map(client => (
                  <tr
                    key={client.clientId}
                    className={`client-row hover:bg-slate-50/80 transition-colors ${!client.isActive ? 'bg-slate-50/50 grayscale-[30%] opacity-80' : ''}`}
                  >
                    <td className="px-6 py-4 align-top">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-xl shadow-sm border border-slate-200/50 ${client.isActive ? 'bg-gradient-to-br from-indigo-500 to-purple-500' : 'bg-slate-400'}`}>
                          {client.logo ? (
                            <img 
                              src={client.logo.startsWith('http') ? client.logo : `${BASE_URL}${client.logo.startsWith('/') ? '' : '/'}${client.logo}`} 
                              alt="logo" 
                              className="w-full h-full rounded-xl object-cover" 
                            />
                          ) : (
                            client.businessName?.charAt(0)?.toUpperCase() || "?"
                          )}
                        </div>
                        <div className="flex flex-col pt-0.5">
                          <p className="font-bold text-[15px] text-slate-900 truncate max-w-[200px]" title={client.businessName}>{client.businessName || "No Business Name"}</p>
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <span className="inline-flex px-2 py-0.5 rounded-lg bg-slate-100 text-slate-500 border border-slate-200 font-mono text-[10px] font-bold">
                              ID: {client.clientId}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="pt-1">
                        <p className="text-[13px] font-medium text-slate-600 italic whitespace-normal max-w-[180px] line-clamp-2" title={Array.isArray(client.keywords) ? client.keywords.join(', ') : client.keywords}>
                          {Array.isArray(client.keywords) && client.keywords.length > 0
                            ? client.keywords.join(', ')
                            : (client.keywords || 'No keywords set')}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="flex flex-col gap-2">
                        <p className="text-[13px] font-bold text-slate-700 flex items-center gap-2">
                          <User size={14} className="text-indigo-400" /> {client.name}
                        </p>
                        <p className="text-[13px] font-medium text-slate-500 flex items-center gap-2">
                          <Mail size={14} className="text-slate-400" /> {client.email}
                        </p>
                        <p className="text-[13px] font-medium text-slate-500 flex items-center gap-2">
                          <Phone size={14} className="text-slate-400" /> {client.mobile}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="flex items-start gap-2 pt-0.5">
                        <MapPin size={16} className="text-orange-400 block shrink-0 mt-0.5" />
                        <span className="text-[13px] font-semibold text-slate-600 block min-w-[120px] whitespace-normal break-all max-w-[200px]" title={client.placeId}>
                          {client.placeId || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top text-center pt-5">
                      <label className="relative inline-flex items-center cursor-pointer hover:scale-110 transition-transform" title={client.isActive ? 'Deactivate Client' : 'Activate Client'}>
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={client.isActive === 1 || client.isActive === true}
                          onChange={() => handleToggleStatus(client.clientId, client.isActive)}
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all after:shadow-sm peer-checked:bg-gradient-to-r peer-checked:from-emerald-400 peer-checked:to-teal-500 border border-slate-300 peer-checked:border-emerald-500 shadow-inner"></div>
                      </label>
                    </td>
                    <td className="px-6 py-4 align-top text-center">
                      <div className="flex flex-col items-center gap-2 pt-0.5">
                        <div
                          onClick={() => setSelectedQrClient(client)}
                          className="relative group/qr cursor-pointer hover:scale-105 transition-transform origin-center"
                        >
                          <div className="bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-400 flex items-center justify-center transition-colors">
                            <QRCodeSVG value={`${window.location.origin}/review/${client.clientId}`} size={32} level="M" />
                          </div>
                          <div className="absolute opacity-0 group-hover/qr:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] w-24 text-center px-2 py-1.5 rounded-lg shadow-xl -bottom-10 left-1/2 -translate-x-1/2 pointer-events-none z-10 font-bold tracking-wide">
                            View QR Code
                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
                          </div>
                        </div>
                        <a href={`${window.location.origin}/review/${client.clientId}`} target="_blank" rel="noreferrer" className="text-[11px] text-indigo-600 font-semibold hover:underline flex items-center gap-1 bg-indigo-50 px-2 py-0.5 rounded-md hover:bg-indigo-100 transition-colors">
                          <QrCode size={12} /> Open Link
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top text-right pt-5">
                      <button
                        onClick={() => openEditModal(client)}
                        className="inline-flex items-center justify-center text-slate-400 hover:text-indigo-600 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 shadow-sm transition-all p-2.5 rounded-xl"
                        title="Edit Client"
                      >
                        <Edit2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Removed Create / Edit Client Modal as it's now a full page */}

      {/* View QR Code Modal */}
      {selectedQrClient && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200 z-[110]">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl border border-slate-100 overflow-hidden flex flex-col items-center p-8 relative">
            <button
              onClick={() => setSelectedQrClient(null)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-rose-500 bg-slate-50 hover:bg-rose-50 rounded-full transition-all shrink-0 z-50 shadow-sm"
            >
              <XCircle size={28} />
            </button>

            <div className="w-full">
              <QRCodeDisplay
                targetUrl={`${window.location.origin}/review/${selectedQrClient.clientId}`}
                businessName={selectedQrClient.businessName}
                logo={selectedQrClient.logo}
                websiteUrl={selectedQrClient.websiteUrl || `www.${selectedQrClient.businessName.toLowerCase().replace(/\s+/g, '')}.com`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;
