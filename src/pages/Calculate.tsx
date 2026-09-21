import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { ArrowLeft, Split, ExternalLink, Share2 } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import type { UPIData } from '../types/upi';
import { buildUPIUri } from '../services/upiDecoder';
import { formatCurrency, splitAmount } from '../utils/money';
import { saveToHistory } from '../services/historyStorage';

export default function Calculate() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const state = location.state as { upiData: UPIData; amountPaise: number } | null;
  const upiData = state?.upiData;
  const amountPaise = state?.amountPaise || 0;

  const defaultRequiredSplits = Math.max(1, Math.ceil(amountPaise / 199900));
  
  const [splitCount, setSplitCount] = useState<number>(1);
  const [showLargePrompt, setShowLargePrompt] = useState<boolean>(false);
  const hasSavedHistory = useRef(false);
  
  useEffect(() => {
    if (!upiData || amountPaise <= 0) {
      navigate('/scan');
      return;
    }
    
    if (defaultRequiredSplits > 5) {
      setShowLargePrompt(true);
      setSplitCount(defaultRequiredSplits);
    } else {
      setSplitCount(defaultRequiredSplits);
    }
    
  }, [upiData, amountPaise, navigate, defaultRequiredSplits]);

  useEffect(() => {
    if (upiData && amountPaise > 0 && splitCount > 0 && !hasSavedHistory.current) {
      saveToHistory({
        merchantName: upiData.pn || 'Unknown Merchant',
        upiId: upiData.pa,
        totalAmountPaise: amountPaise,
        splitCount: splitCount
      });
      hasSavedHistory.current = true;
    }
  }, [upiData, amountPaise, splitCount]);

  if (!upiData) return null;

  const splits = splitAmount(amountPaise, splitCount);

  const handleShareWhatsApp = () => {
    const text = `I'm paying ${formatCurrency(amountPaise)} at ${upiData.pn || 'the store'}. I've split it into ${splitCount} ${splitCount === 1 ? 'part' : 'parts'} using UPI Smart Splitter to save on fees!`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="w-full max-w-2xl mx-auto pb-12 mt-4">
      <div className="mb-6 flex items-center justify-between">
        <Link to="/scan" className="text-indigo-600 flex items-center gap-2 font-medium hover:underline">
          <ArrowLeft size={16} /> Back to Scan
        </Link>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShareWhatsApp}
          className="text-emerald-600 flex items-center gap-1 font-medium hover:bg-emerald-50 px-3 py-1.5 rounded-full transition-colors"
        >
          <Share2 size={16} /> Share on WhatsApp
        </motion.button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold mb-6 border-b border-slate-100 pb-3">Payment Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500 mb-1">Merchant</p>
            <p className="font-semibold text-lg text-slate-900">{upiData.pn}</p>
            <p className="text-xs text-slate-400 font-mono mt-1">{upiData.pa}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500 mb-1">Total Bill Amount</p>
            <p className="font-black text-2xl md:text-3xl text-indigo-600">{formatCurrency(amountPaise)}</p>
          </div>
        </div>
      </div>

      {showLargePrompt ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-amber-50 border border-amber-200 p-6 md:p-8 rounded-3xl mb-8"
        >
          <h3 className="font-bold text-amber-900 mb-3 text-lg">Large Amount Detected</h3>
          <p className="text-amber-800 mb-6">
            To keep every payment at or under ₹1,999 (tax-free limit), you would need <strong>{defaultRequiredSplits} separate transactions</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-amber-100">
            <label className="text-amber-900 font-semibold whitespace-nowrap">
              How many splits do you want?
            </label>
            <div className="flex items-center gap-4">
              <motion.button 
                whileTap={{ scale: 0.8 }}
                onClick={() => setSplitCount(Math.max(1, splitCount - 1))}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-100 text-amber-700 font-bold hover:bg-amber-200 transition-colors"
              >-</motion.button>
              <input 
                type="number" 
                min="1" 
                max="50"
                value={splitCount} 
                onChange={(e) => setSplitCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 p-2 rounded-xl border-2 border-amber-200 text-center font-bold text-lg focus:outline-none focus:border-amber-400"
              />
              <motion.button 
                whileTap={{ scale: 0.8 }}
                onClick={() => setSplitCount(splitCount + 1)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-amber-100 text-amber-700 font-bold hover:bg-amber-200 transition-colors"
              >+</motion.button>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center justify-between bg-indigo-50 text-indigo-800 p-5 rounded-2xl mb-8 border border-indigo-100">
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <div className="bg-white p-2 rounded-full shadow-sm text-indigo-600">
              <Split size={20} />
            </div>
            <span className="font-semibold text-lg">Adjust Split Parts:</span>
          </div>
          <div className="flex items-center gap-4">
            <motion.button 
              whileTap={{ scale: 0.8 }}
              onClick={() => {
                setSplitCount(Math.max(1, splitCount - 1));
                hasSavedHistory.current = false;
              }}
              className="w-10 h-10 rounded-full bg-white text-indigo-600 font-bold shadow-sm hover:bg-indigo-100 transition-colors border border-indigo-200"
            >-</motion.button>
            <AnimatePresence mode="popLayout">
              <motion.span 
                key={splitCount}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="font-bold text-2xl w-8 text-center block"
              >
                {splitCount}
              </motion.span>
            </AnimatePresence>
            <motion.button 
              whileTap={{ scale: 0.8 }}
              onClick={() => {
                setSplitCount(splitCount + 1);
                hasSavedHistory.current = false;
              }}
              className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold shadow-sm hover:bg-indigo-700 transition-colors"
            >+</motion.button>
          </div>
        </div>
      )}

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        <div className="flex items-center justify-between mb-4 px-2">
          <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
            Smart Split Payments
          </h2>
          <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {splitCount} {splitCount === 1 ? 'Part' : 'Parts'}
          </span>
        </div>
        
        {splits.map((splitPaise, idx) => {
          const splitUri = buildUPIUri({ ...upiData, am: (splitPaise / 100).toFixed(2) });
          const isTaxFree = splitPaise <= 199900;
          
          return (
            <motion.div 
              variants={itemVariants}
              key={idx} 
              className="border border-slate-200 rounded-3xl overflow-hidden flex flex-col sm:flex-row bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6 sm:w-1/3 flex flex-col items-center justify-center bg-slate-50 border-b sm:border-b-0 sm:border-r border-slate-100">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
                  <QRCodeSVG value={splitUri} size={140} level="M" />
                </div>
              </div>
              <div className="p-6 sm:w-2/3 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-slate-400 uppercase tracking-wider text-xs">Payment {idx + 1} of {splitCount}</h4>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                    <span className="font-extrabold text-4xl text-slate-900 tracking-tight">{formatCurrency(splitPaise)}</span>
                    {isTaxFree ? (
                      <span className="bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-sm font-bold w-max">Tax Free (₹0 MDR)</span>
                    ) : (
                      <span className="bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-sm font-bold w-max">Standard Fees Apply</span>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <motion.a 
                    whileTap={{ scale: 0.98 }}
                    href={splitUri}
                    className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg text-center flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors shadow-sm"
                  >
                    <ExternalLink size={20} /> Pay with UPI App
                  </motion.a>
                  <p className="text-xs text-slate-400 mt-2 text-center">
                    Note: "Pay with UPI App" button only works on mobile devices. On desktop, please scan the QR code.
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
