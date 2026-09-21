import { Link, useLocation } from 'react-router-dom';
import { QrCode, Calculator, BookOpen, History, ShieldAlert, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Scan', path: '/scan', icon: QrCode },
    { name: 'Calculate', path: '/calculate', icon: Calculator },
    { name: 'Rules', path: '/rules', icon: BookOpen },
    { name: 'History', path: '/history', icon: History },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <header className="bg-indigo-600 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <span className="bg-white rounded-md p-1 flex items-center justify-center">
              <img src="/image.png" alt="Logo" className="w-6 h-6 object-contain" />
            </span>
            UPI Smart Splitter
          </Link>
          
          <nav className="hidden md:flex gap-6 relative">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={clsx(
                    'relative flex items-center gap-1 text-sm font-medium transition-colors py-2',
                    isActive ? 'text-white' : 'text-indigo-200 hover:text-white'
                  )}
                >
                  <Icon size={16} />
                  {item.name}
                  {isActive && (
                    <motion.div 
                      layoutId="desktopNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-t-md"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="flex-grow w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 mt-auto pb-24 md:pb-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="font-semibold text-slate-300 mb-2">UPI Smart Splitter — Understand. Calculate. Pay.</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm mb-6">
            <Link to="/rules" className="hover:text-indigo-400">MDR Rules</Link>
            <span className="text-slate-600">|</span>
            <Link to="/" className="hover:text-indigo-400">How It Works</Link>
          </div>
          
          <div className="flex items-start justify-center gap-2 text-xs max-w-2xl mx-auto bg-slate-800/50 p-4 rounded-lg text-slate-400 text-left">
            <ShieldAlert size={16} className="text-amber-500 shrink-0 mt-0.5" />
            <p>
              <strong>Disclaimer & Privacy:</strong> This application is an informational tool and does not provide legal, tax, or banking advice. It does not request or store UPI PINs, OTPs, passwords, or banking credentials. No payment authorization happens inside this website.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe z-50 rounded-t-2xl">
        <div className="flex justify-around items-center h-16 relative">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  'relative flex flex-col items-center justify-center w-full h-full space-y-1',
                  isActive ? 'text-indigo-600 font-bold' : 'text-slate-400 hover:text-slate-600'
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="mobileNavIndicator"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-indigo-600 rounded-b-md"
                  />
                )}
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center"
                >
                  <Icon size={20} className={isActive ? 'text-indigo-600' : ''} />
                  <span className="text-[10px] uppercase tracking-wider mt-1">{item.name}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
