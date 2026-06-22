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

  useEffect(() => {
    const fetchQR = async () => {
      try {
        setLoading(true);
        const data = await qrService.generateQRCode();
        setQrData(data);
      } catch (err) {
        setError(err.message || 'Failed to load QR Configuration');
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
