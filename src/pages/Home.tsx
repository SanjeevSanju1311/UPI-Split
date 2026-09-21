import { Link } from 'react-router-dom';
import { QrCode, Calculator, ArrowRight, IndianRupee, Split, Zap, CheckCircle, Smartphone, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center max-w-2xl mt-8 mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4"
        >
          Understand your <span className="text-indigo-600">UPI</span> merchant payment costs.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-600 mb-8"
        >
          Scan a UPI QR, calculate the applicable Merchant Discount Rate (MDR), and create transparent payment splits.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            to="/scan"
            className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-indigo-700 transition-colors w-full sm:w-auto justify-center hover:scale-105 active:scale-95 duration-200"
          >
            <QrCode size={20} />
            Scan Shop QR
          </Link>
          <Link
            to="/calculate"
            className="flex items-center gap-2 bg-white text-indigo-600 border-2 border-indigo-100 px-8 py-4 rounded-xl font-semibold shadow-sm hover:bg-slate-50 transition-colors w-full sm:w-auto justify-center hover:scale-105 active:scale-95 duration-200"
          >
            <Calculator size={20} />
            Open Calculator
          </Link>
        </motion.div>
        <p className="mt-4 text-xs text-slate-500">
          Informational tool. Not tax, legal or banking advice.
        </p>
      </div>

      {/* How it works in 3 steps */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 mb-12"
      >
        <div className="text-center mb-10">
          <p className="text-indigo-600 font-bold text-sm tracking-wider uppercase mb-2">Simple Workflow</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">How It Works in 3 Steps</h2>
          <p className="text-slate-500">No registration, no personal data, no extra apps needed.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 relative hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute top-6 right-6 bg-white border border-slate-200 text-slate-400 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              Step 1
            </div>
            <div className="bg-indigo-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-indigo-200">
              <QrCode className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Scan Shop QR</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Point your camera, upload a saved QR image, or enter a shop UPI ID.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 relative hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute top-6 right-6 bg-white border border-slate-200 text-slate-400 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              Step 2
            </div>
            <div className="bg-emerald-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-emerald-200">
              <IndianRupee className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Enter Bill Amount</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Type the total amount you need to pay the merchant.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 relative hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute top-6 right-6 bg-white border border-slate-200 text-slate-400 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              Step 3
            </div>
            <div className="bg-purple-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-purple-200">
              <Split className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Split with Same QR</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Generate split QRs under ₹2,000 to see how it affects merchant fees.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Link
            to="/scan"
            className="group inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Launch Splitter Tool <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>

      {/* How it works at a glance */}
      <div className="w-full max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-50 w-12 h-12 rounded-full flex items-center justify-center text-indigo-600">
                <Zap size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">How it works at a glance</h3>
                <p className="text-slate-500">Example: ₹4,000 Shop Bill</p>
              </div>
            </div>
            <div className="bg-emerald-100 text-emerald-800 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1">
              Saves ~₹16 Fee
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-100/50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              <p className="text-rose-600 font-bold text-xs uppercase tracking-wider mb-4 relative z-10">Single Payment</p>
              <div className="flex items-end gap-2 mb-4 relative z-10">
                <span className="text-3xl font-bold text-slate-900">1</span>
                <span className="text-xl text-slate-500 mb-1">×</span>
                <span className="text-3xl font-bold text-slate-900">₹4,000</span>
              </div>
              <p className="text-rose-600 font-semibold relative z-10">Charges ~₹16 MDR Fee</p>
            </div>

            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              <p className="text-emerald-600 font-bold text-xs uppercase tracking-wider mb-4 relative z-10">With Smart Split</p>
              <div className="flex items-end gap-2 mb-4 relative z-10">
                <span className="text-3xl font-bold text-slate-900">2</span>
                <span className="text-xl text-slate-500 mb-1">×</span>
                <span className="text-3xl font-bold text-slate-900">₹2,000</span>
              </div>
              <p className="text-emerald-700 font-semibold relative z-10">0% Fee (₹0.00 MDR)</p>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-slate-500 text-sm">Both split payments go directly to the exact same shop UPI address!</p>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 text-sm font-medium text-slate-600 mb-8">
          <div className="flex items-center gap-2">
            <CheckCircle className="text-emerald-500" size={18} />
            100% Client-Side Privacy
          </div>
          <div className="flex items-center gap-2">
            <Smartphone className="text-indigo-500" size={18} />
            Works with GPay, PhonePe, Paytm & BHIM
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-slate-400" size={18} />
            No Credentials Stored
          </div>
        </div>
      </div>
    </div>
  );
}
