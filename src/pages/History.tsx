import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { History as HistoryIcon, ArrowRight, Store, Calendar, Trash2 } from 'lucide-react';
import { getHistory, clearHistory } from '../services/historyStorage';
import type { HistoryRecord } from '../services/historyStorage';
import { formatCurrency } from '../utils/money';

export default function History() {
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear your local transaction history?")) {
      clearHistory();
      setHistory([]);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-12">
      <div className="mb-8 text-center">
        <div className="inline-block bg-indigo-100 p-4 rounded-full mb-4">
          <HistoryIcon className="text-indigo-600" size={32} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Transaction History</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          View your past calculated splits. All data is stored locally on your device for privacy.
        </p>
      </div>

      {history.length > 0 ? (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex justify-end p-4 border-b border-slate-100 bg-slate-50">
            <button 
              onClick={handleClear}
              className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
            >
              <Trash2 size={16} /> Clear History
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {history.map((record) => (
              <div key={record.id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2 mb-1">
                    <Store size={18} className="text-slate-400" />
                    {record.merchantName}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                    <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                      {record.upiId}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(record.timestamp).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between w-full md:w-auto md:justify-end gap-6 border-t md:border-0 border-slate-100 pt-4 md:pt-0 mt-2 md:mt-0">
                  <div className="text-left md:text-right">
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Splits</p>
                    <p className="font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full text-center">
                      {record.splitCount}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Total Amount</p>
                    <p className="font-black text-xl text-indigo-600">
                      {formatCurrency(record.totalAmountPaise)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-12 text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
            <HistoryIcon size={24} className="text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-700 mb-2">No history yet</h3>
          <p className="text-slate-500 mb-6">Calculated splits will appear here automatically.</p>
          <Link 
            to="/scan"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            Make a Payment <ArrowRight size={18} />
          </Link>
        </div>
      )}
    </div>
  );
}
