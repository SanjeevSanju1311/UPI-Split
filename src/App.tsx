import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Scan from './pages/Scan';
import Calculate from './pages/Calculate';
import Rules from './pages/Rules';
import History from './pages/History';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white overflow-hidden font-sans">
        
        {/* Subtle animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 via-white to-orange-50 opacity-50"></div>
        
        {/* Decorative background blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-[pulse_6s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-[pulse_6s_ease-in-out_infinite_reverse]"></div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Logo Container with rotating ring */}
          <div className="relative flex items-center justify-center w-48 h-48 mb-8">
            {/* Spinning gradient ring */}
            <svg className="absolute inset-0 w-full h-full animate-[spin_3s_linear_infinite]" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="48" fill="none" stroke="url(#ringGrad)" strokeWidth="1.5" strokeDasharray="80 220" strokeLinecap="round" />
            </svg>
            
            {/* Inner dashed ring */}
            <svg className="absolute inset-2 w-44 h-44 animate-[spin_4s_linear_infinite_reverse] opacity-30" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="4 4" />
            </svg>

            {/* Actual Logo Image */}
            <div className="absolute inset-4 bg-white rounded-full shadow-xl flex items-center justify-center overflow-hidden border border-slate-100">
              <img 
                src="/image.png" 
                alt="UPI Split Logo" 
                className="w-full h-full object-contain p-2 animate-[pulse_2s_ease-in-out_infinite]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/favicon.svg';
                }}
              />
            </div>
          </div>

          {/* Typography */}
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight mb-3 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]">
            UPI Split
          </h1>
          
          <div className="flex items-center space-x-2 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
            <p className="text-slate-500 font-medium tracking-widest uppercase text-sm">
              Initializing Secure Environment
            </p>
          </div>
        </div>

        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/calculate" element={<Calculate />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
