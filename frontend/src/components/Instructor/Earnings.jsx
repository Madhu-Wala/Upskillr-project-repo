import { DollarSign, ArrowUpRight, Clock, CheckCircle, CreditCard, Download } from 'lucide-react';

const Earnings = () => {
  const transactions = [
    { id: 1, type: "Course Sale", course: "Web Development Bootcamp", date: "Oct 24, 2023", amount: "+$49.00", status: "Completed" },
    { id: 2, type: "Withdrawal", course: "Bank Transfer", date: "Oct 20, 2023", amount: "-$1,250.00", status: "Processing" },
    { id: 3, type: "Course Sale", course: "UI/UX Masterclass", date: "Oct 18, 2023", amount: "+$59.00", status: "Completed" },
    { id: 4, type: "Course Sale", course: "Python for Data Science", date: "Oct 15, 2023", amount: "+$39.00", status: "Completed" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Earnings & Payouts</h1>
           <p className="text-gray-500 text-sm mt-1">Manage your revenue and withdrawal history.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 flex items-center gap-2">
            <Download size={18} /> Download Report
        </button>
      </div>

      {/* 1. Money Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Available Balance */}
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10"><DollarSign size={120} /></div>
            <p className="text-indigo-200 font-medium mb-1">Available Balance</p>
            <h2 className="text-4xl font-bold mb-6">$2,450.00</h2>
            <button className="w-full py-3 bg-white/20 hover:bg-white/30 backdrop-blur rounded-xl font-bold border border-white/10 transition-colors">
                Request Withdrawal
            </button>
        </div>

        {/* Total Earnings */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-center">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                <ArrowUpRight size={24} />
            </div>
            <p className="text-gray-500 font-medium text-sm">Lifetime Earnings</p>
            <h2 className="text-3xl font-bold text-gray-900">$14,850.00</h2>
            <p className="text-emerald-600 text-xs font-bold mt-2 flex items-center gap-1">
                +12% <span className="text-gray-400 font-normal">vs last month</span>
            </p>
        </div>

        {/* Payout Method */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-center">
             <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                    <CreditCard size={24} />
                </div>
                <button className="text-indigo-600 text-sm font-bold hover:underline">Edit</button>
             </div>
             <p className="text-gray-500 font-medium text-sm">Payout Method</p>
             <h2 className="text-xl font-bold text-gray-900 mt-1">**** 4289</h2>
             <p className="text-gray-400 text-xs mt-1">Visa Debit Card • Exp 12/25</p>
        </div>
      </div>

      {/* 2. Transaction History */}
      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-50">
            <h3 className="font-bold text-gray-900">Recent Transactions</h3>
        </div>
        <table className="w-full text-left">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
                {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                            <p className="font-bold text-gray-900 text-sm">{tx.type}</p>
                            <p className="text-xs text-gray-500">{tx.course}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 font-medium">{tx.date}</td>
                        <td className={`px-6 py-4 font-bold text-sm ${tx.amount.startsWith('+') ? 'text-emerald-600' : 'text-gray-900'}`}>
                            {tx.amount}
                        </td>
                        <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                                tx.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                            }`}>
                                {tx.status === 'Completed' ? <CheckCircle size={12} /> : <Clock size={12} />}
                                {tx.status}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default Earnings;