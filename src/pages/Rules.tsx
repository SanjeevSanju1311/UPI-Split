import { BookOpen } from 'lucide-react';


export default function Rules() {
  return (
    <div className="w-full max-w-4xl mx-auto pb-12">
      <div className="mb-8 text-center">
        <div className="inline-block bg-blue-100 p-4 rounded-full mb-4">
          <BookOpen className="text-upi-blue" size={32} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Current UPI MDR Rules</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Understanding the Merchant Discount Rate (MDR) for UPI payments. Note that MDR is a payment-ecosystem charge paid by the merchant and their bank, not a direct tax on the customer.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 font-semibold text-slate-700">Transaction Type</th>
                <th className="p-4 font-semibold text-slate-700">Amount Condition</th>
                <th className="p-4 font-semibold text-slate-700">MDR Applied</th>
                <th className="p-4 font-semibold text-slate-700">Max Cap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-4 font-medium text-slate-900">P2P (Person to Person)</td>
                <td className="p-4 text-slate-600">Any amount</td>
                <td className="p-4 text-slate-600">₹0</td>
                <td className="p-4 text-slate-600">-</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-900" rowSpan={2}>P2M (Person to Merchant)</td>
                <td className="p-4 text-slate-600">≤ ₹2,000</td>
                <td className="p-4 text-slate-600">₹0</td>
                <td className="p-4 text-slate-600">-</td>
              </tr>
              <tr>
                <td className="p-4 text-slate-600">{'>'} ₹2,000</td>
                <td className="p-4 text-slate-600">0.4%</td>
                <td className="p-4 text-slate-600">₹300</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-900">Essential Sectors</td>
                <td className="p-4 text-slate-600">{'>'} ₹2,000</td>
                <td className="p-4 text-slate-600">₹5 (Flat rate)</td>
                <td className="p-4 text-slate-600">-</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-900">Capital Market</td>
                <td className="p-4 text-slate-600">Applicable</td>
                <td className="p-4 text-slate-600">0.02%</td>
                <td className="p-4 text-slate-600">₹300</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-900">P2PM (Small Merchant)</td>
                <td className="p-4 text-slate-600">Eligible (≤ ₹1 Lakh/mo)</td>
                <td className="p-4 text-slate-600">₹0</td>
                <td className="p-4 text-slate-600">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
        <h3 className="font-bold text-slate-800 mb-2">Note on Rules Config</h3>
        <p className="text-sm text-slate-600 mb-4">
          Rules are configurable because NPCI/banking/payment rules may change over time. 
          The estimates provided by this calculator are based on the latest available general guidelines.
        </p>
        <div className="flex gap-4 text-xs text-slate-500 font-medium">
          <span>Last Updated: 15 September 2026</span>
          <span>Source: Government of India / NPCI circulars</span>
        </div>
      </div>
    </div>
  );
}
