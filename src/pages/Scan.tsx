import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scanner } from '@yudiel/react-qr-scanner';
import jsQR from 'jsqr';
import { decodeUPI } from '../services/upiDecoder';
import type { UPIData } from '../types/upi';
import { QrCode, AlertTriangle, ArrowRight, CheckCircle2, ImagePlus } from 'lucide-react';
import { isValidAmount, rupeesToPaise } from '../utils/money';

export default function Scan() {
  const navigate = useNavigate();
  const [scannedData, setScannedData] = useState<UPIData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [manualAmount, setManualAmount] = useState<string>('');
  const [isScanningCamera, setIsScanningCamera] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleScan = (result: any) => {
    if (result && result.length > 0 && result[0].rawValue) {
      const decoded = decodeUPI(result[0].rawValue);
      if (decoded) {
        setScannedData(decoded);
        setError(null);
        if (decoded.am) {
          setManualAmount(decoded.am);
        }
      } else {
        setError("This QR does not appear to contain a supported UPI payment address.");
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          
          if (code && code.data) {
            const decoded = decodeUPI(code.data);
            if (decoded) {
              setScannedData(decoded);
              setError(null);
              if (decoded.am) {
                setManualAmount(decoded.am);
              }
            } else {
              setError("The uploaded QR code is not a valid UPI payment address.");
            }
          } else {
            setError("No QR code found in the image. Try a clearer picture.");
          }
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const proceedToCalculate = () => {
    if (scannedData) {
      const amount = isValidAmount(manualAmount) ? rupeesToPaise(manualAmount) : 0;
      if (amount <= 0) {
        setError("Enter a valid amount greater than ₹0.");
        return;
      }
      navigate('/calculate', { 
        state: { 
          upiData: scannedData, 
          amountPaise: amount 
        } 
      });
    }
  };

  if (scannedData) {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle2 className="text-upi-green" size={32} />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-6">Merchant Details</h2>
        
        <div className="space-y-4 mb-8">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p className="text-sm text-slate-500 font-medium">Merchant Name</p>
            <p className="font-semibold text-lg">{scannedData.pn}</p>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p className="text-sm text-slate-500 font-medium">UPI ID</p>
            <p className="font-mono text-sm text-slate-700">{scannedData.pa}</p>
          </div>

          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
            <p className="text-sm text-indigo-700 font-medium mb-2">Payment Amount</p>
            {scannedData.am ? (
              <div>
                <p className="font-bold text-2xl text-indigo-900">₹ {scannedData.am}</p>
                <p className="text-xs text-indigo-600 mt-1">QR contains a payment amount.</p>
                <div className="mt-4 flex gap-2">
                  <button 
                    onClick={() => setScannedData({ ...scannedData, am: undefined })}
                    className="text-sm text-indigo-700 underline"
                  >
                    Change Amount
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl font-bold text-slate-600">₹</span>
                  <input 
                    type="number" 
                    min="1"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-3 text-xl font-bold bg-white border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="0.00"
                    value={manualAmount}
                    onChange={(e) => setManualAmount(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {['500', '1000', '2000', '5000', '10000'].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setManualAmount(amt)}
                      className="px-3 py-1 bg-white border border-indigo-200 rounded-md text-sm font-medium hover:bg-indigo-50 text-indigo-700 transition-colors"
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-6 text-sm flex gap-2 items-start">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <button 
            onClick={proceedToCalculate}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            Continue <ArrowRight size={20} />
          </button>
          <button 
            onClick={() => { setScannedData(null); setError(null); setManualAmount(''); setIsScanningCamera(false); }}
            className="w-full bg-slate-100 text-slate-600 py-4 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
          >
            ← Scan Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Scan Shop QR</h2>
        <p className="text-slate-600">Scan any UPI merchant QR code or upload from gallery.</p>
      </div>

      {!isScanningCamera ? (
        <div className="flex flex-col gap-4 mb-6">
          <button
            onClick={() => setIsScanningCamera(true)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <QrCode size={24} /> Open Camera to Scan
          </button>
          
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink-0 mx-4 text-slate-400 text-sm font-medium">OR</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>
          
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleFileUpload}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-white hover:bg-slate-50 text-slate-700 py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 border-2 border-slate-200"
          >
            <ImagePlus size={24} /> Upload from Gallery
          </button>
        </div>
      ) : (
        <div className="mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-4">
            <Scanner
              onScan={(result) => handleScan(result)}
              onError={(err) => {
                console.error(err);
                // Some cameras fail immediately, don't spam error unless necessary
              }}
              constraints={{ facingMode: 'environment' }}
            />
          </div>
          <button
            onClick={() => setIsScanningCamera(false)}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-semibold transition-colors text-center"
          >
            Cancel Scanning
          </button>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm flex gap-2 items-start mb-6">
          <AlertTriangle size={18} className="shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex gap-3 text-sm text-indigo-800">
        <QrCode className="shrink-0 mt-0.5 text-indigo-600" size={20} />
        <p>Ensure the QR code is well-lit and fits inside the scanning frame, or upload a clear screenshot.</p>
      </div>
    </div>
  );
}
