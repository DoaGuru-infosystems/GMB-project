import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, ExternalLink, Link as LinkIcon, Star, QrCode, Smartphone } from 'lucide-react';
import html2canvas from 'html2canvas';
import logoNew from '../assets/logonew.png';
import { BASE_URL } from '../services/api';

const QRCodeDisplay = ({ targetUrl, qrCodeDataUrl = null, businessName = "Business Name", logo = null, websiteUrl = "" }) => {
  const [fgColor, setFgColor] = useState('#000000');
  const [logoBase64, setLogoBase64] = useState(null);
  const flyerRef = useRef(null);

  // Convert logo to Base64 to avoid CORS issues in SVG/Canvas
  React.useEffect(() => {
    const convertLogo = async () => {
      const url = logo ? (logo.startsWith('http') ? logo : `${BASE_URL}/${logo.replace(/\\/g, '/').replace(/^\//, '')}`) : logoNew;
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => setLogoBase64(reader.result);
        reader.readAsDataURL(blob);
      } catch (err) {
        console.error("Logo conversion error:", err);
        setLogoBase64(url); // Fallback to URL if fetch fails
      }
    };
    convertLogo();
  }, [logo, logoNew]);

  const downloadFlyer = async () => {
    const element = flyerRef.current;
    if (!element) {
      alert("Preview element not found.");
      return;
    }

    try {
      const images = element.getElementsByTagName('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      });
      await Promise.all(imagePromises);
      await new Promise(resolve => setTimeout(resolve, 800));

      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: false,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById('premium-flyer-capture');
          if (clonedElement) {
            clonedElement.style.transform = 'none';
            clonedElement.style.margin = '0';
            clonedElement.style.borderRadius = '0';
            clonedElement.style.width = '420px';
            clonedElement.style.height = 'auto';
            clonedElement.style.minHeight = '720px';
            clonedElement.style.paddingBottom = '40px';
          }
          // Fix for gradient border in capture
          const qrBorder = clonedDoc.getElementById('qr-gradient-border');
          if (qrBorder) {
            qrBorder.style.border = '4px solid #ff7e33';
            qrBorder.style.background = 'white';
          }
        }
      });

      const pngUrl = canvas.toDataURL("image/png", 1.0);
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${businessName.replace(/\s+/g, '_')}_QR.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (err) {
      console.error("Flyer capture error:", err);
      alert("Flyer download failed. Please refresh the page and try again.");
    }
  };

  const downloadQRCodeOnly = () => {
    const svg = document.getElementById('qrCodeEl');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${businessName.replace(/\s+/g, '_')}_QR.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  const openFunnel = () => {
    window.open(targetUrl, '_blank');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-stretch w-full px-2 max-h-[85vh]">
      {/* 1. Flyer Preview Section */}
      <div className="flex-1 flex flex-col gap-3 min-w-[400px]">
        <div className="flex items-center justify-between px-3">
          <h3 className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#94a3b8' }}>Flyer Preview</h3>
          <span className="text-[9px] font-bold text-white px-3 py-1 rounded-full uppercase tracking-widest" style={{ backgroundColor: '#2563eb' }}>Premium Template</span>
        </div>

        <div
          id="premium-flyer-capture"
          ref={flyerRef}
          className="relative bg-white flex flex-col items-center w-full max-w-[420px] mx-auto flex-1"
          style={{ minHeight: '720px', border: '1px solid #f1f5f9', paddingBottom: '30px' }}
        >
          <div className="flex-1 w-full flex flex-col items-center pt-4 px-8 pb-4">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full p-[2px] bg-gradient-to-tr from-[#bf953f] via-[#fcf6ba] to-[#b38728] shadow-md">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden p-1.5">
                  {logo ? (
                    <img
                      src={logo.startsWith('http') ? logo : `${BASE_URL}${logo.startsWith('/') ? '' : '/'}${logo}`}
                      alt="Logo"
                      className="w-full h-full object-contain"
                      crossOrigin="anonymous"
                    />
                  ) : (
                    <img src={logoNew} alt="Logo" className="w-full h-full object-contain p-1" />
                  )}
                </div>
              </div>
            </div>

            <p className="text-lg font-black text-[#001f5c] mb-6 tracking-tight">
              {websiteUrl || "www.doaguru.com"}
            </p>

            <div id="qr-gradient-border" className="relative p-6 mb-8 rounded-[2.5rem]" style={{ border: '4px solid #ff7e33' }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 bg-[#001f5c] text-white px-6 py-2 rounded-full shadow-md flex items-center gap-2 whitespace-nowrap">
                <Smartphone size={12} strokeWidth={3} />
                <span className="text-[10px] font-black uppercase tracking-wider">Scan Me</span>
              </div>

              <div className="relative z-10 bg-white p-4 rounded-3xl shadow-sm border border-slate-50 flex items-center justify-center">
                <QRCodeSVG
                  id="qrCodeEl"
                  value={targetUrl || "https://doaguru.com"}
                  size={200}
                  fgColor={fgColor}
                  level="H"
                  includeMargin={false}
                  imageSettings={{
                    src: logoBase64 || (logo ? (logo.startsWith('http') ? logo : `${BASE_URL}/${logo.replace(/\\/g, '/').replace(/^\//, '')}`) : logoNew),
                    height: 50,
                    width: 50,
                    excavate: true,
                    crossOrigin: 'anonymous'
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col items-center text-center mt-2">
              <div className="flex flex-col items-center mb-2">
                <Star size={28} className="fill-[#d4af37] text-[#d4af37] mb-1.5 drop-shadow-sm" />
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="fill-[#d4af37] text-[#d4af37]" />)}
                </div>
              </div>

              <h4 className="text-2xl font-black leading-tight tracking-tighter uppercase mt-4">
                <span className="text-[#e67e22]">SCAN HERE</span>
                <br />
                <span className="text-[#001f5c] text-xl mt-1 block">FOR GOOGLE REVIEW</span>
              </h4>
            </div>
          </div>

          <div className="w-full py-5 px-6 flex items-center justify-center mt-auto" style={{ backgroundColor: '#a3d8d8', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
            <div className="bg-white rounded-lg py-2.5 px-8 shadow-md flex items-center gap-3">
              <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: '#64748b' }}>Powered by</span>
              <img src={logoNew} alt="Logo" className="h-6 w-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Configuration Panel Section */}
      <div className="flex-1 flex flex-col gap-3 min-w-[400px]">
        <div className="px-3">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Configuration</h3>
        </div>

        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-md flex-1 flex flex-col justify-center">
          <div className="mb-6 text-center">
            <h3 className="text-xl font-black text-slate-900 mb-1 uppercase tracking-tight italic">Generate QR</h3>
            <div className="w-10 h-1 bg-[#001f5c] mx-auto rounded-full"></div>
          </div>

          <div className="flex flex-col gap-4 mb-8">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-inner">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">Target Funnel Link</label>
              <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center gap-3 overflow-hidden shadow-sm">
                <div className="text-sm text-slate-900 font-mono font-black flex-1 whitespace-nowrap overflow-x-auto no-scrollbar">
                  {targetUrl}
                </div>
                <button
                  onClick={openFunnel}
                  className="p-2 text-blue-600 bg-blue-50 rounded-xl transition-colors shrink-0 shadow-sm border border-blue-50"
                  title="Open Link"
                >
                  <ExternalLink size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={downloadFlyer}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 font-black rounded-xl bg-[#001f5c] text-white shadow-lg uppercase tracking-widest text-xs"
            >
              <Download size={20} strokeWidth={3} />
              <span>Download Flyer</span>
            </button>

            <button
              onClick={downloadQRCodeOnly}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 font-black rounded-xl text-slate-400 uppercase tracking-widest text-[10px] font-bold border border-transparent"
            >
              <QrCode size={16} />
              <span>QR Code Only (PNG)</span>
            </button>
          </div>

          <div className="mt-8 flex flex-col items-center gap-2 border-t border-slate-50 pt-6">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              System Ready
            </div>
            <p className="text-[9px] text-slate-300 font-medium text-center uppercase tracking-tighter">
              Redirection is managed by your active funnel configuration
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeDisplay;
