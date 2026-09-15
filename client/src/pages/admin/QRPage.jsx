import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import QRCodeDisplay from '../../components/QRCodeDisplay';
import { qrService, clientService } from '../../services/api';
import { Loader2 } from 'lucide-react';

const QRPage = () => {
  const containerRef = useRef(null);
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deactivatedInfo, setDeactivatedInfo] = useState(null);

  useEffect(() => {
    const fetchQR = async () => {
      try {
        setLoading(true);
        const data = await qrService.generateQRCode();
        setQrData(data);
      } catch (err) {
        if (err?.isDeactivated) {
          setDeactivatedInfo({
            message: err.message || "Your account is deactivated. Please contact Doaguru Support team.",
            supportNumber: err.supportNumber || "+91 70001 02121"
          });
        } else {
          setError(err.message || 'Failed to load QR Configuration');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchQR();
  }, []);

  useGSAP(() => {
    if (!loading && qrData) {
      gsap.fromTo('.qr-anim',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          clearProps: 'all'
        }
      );
    }
  }, { scope: containerRef, dependencies: [loading, qrData] });

  return (
    <div ref={containerRef} className="space-y-6 pb-10 font-sans">
      <div className="qr-anim">
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-2.5 inline-block">Flyers & Media</span>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 bg-gradient-to-r from-slate-900 to-indigo-950 bg-clip-text text-transparent mb-1">QR Code Management</h1>
        <p className="text-slate-500 text-xs font-semibold mt-1">Generate and customize your review funnel QR codes.</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
          <p className="text-slate-600 font-medium">Generating your unique QR configuration...</p>
        </div>
      ) : deactivatedInfo ? (
        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8 text-center border border-red-100 flex flex-col items-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4 ring-8 ring-red-50/50">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Account Deactivated
          </h2>
          
          <p className="text-slate-600 text-sm mb-6 leading-relaxed">
            {deactivatedInfo.message}
          </p>

          <div className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex flex-col items-center gap-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Doaguru Support Helpline</span>
            <a 
              href={`tel:${deactivatedInfo.supportNumber.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 text-xl font-black text-blue-600 hover:text-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {deactivatedInfo.supportNumber}
            </a>
            
            <a 
              href={`https://wa.me/${deactivatedInfo.supportNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hello Doaguru Support, my review account is currently deactivated. Please assist.")}`}
              target="_blank"
              rel="noreferrer"
              className="w-full mt-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-200">
          <p className="font-bold">Error Loading QR Code</p>
          <p className="mt-2 text-sm">{error}</p>
        </div>
      ) : (
        <div className="qr-anim fade-in">
          {qrData?.reviewUrl ? (
            <QRCodeDisplay 
              targetUrl={qrData.reviewUrl} 
              qrCodeDataUrl={qrData.qrCodeDataUrl}
              businessName={qrData.businessName}
              logo={qrData.logo}
              websiteUrl={qrData.websiteUrl}
            />
          ) : (
            <div className="text-red-500 font-semibold p-4">Invalid QR URL generated. Please contact support.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default QRPage;
