import { Bell, CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const Notifications = () => {
  const notifications = [
    { id: 1, type: "success", title: "New Enrollment", message: "Alice Johnson enrolled in 'Web Development Bootcamp'", time: "2 mins ago" },
    { id: 2, type: "warning", title: "Low Rating", message: "You received a 3-star review on 'UI/UX Masterclass'", time: "1 hour ago" },
    { id: 3, type: "info", title: "System Update", message: "New features have been added to the Course Builder.", time: "1 day ago" },
    { id: 4, type: "success", title: "Payout Processed", message: "Your withdrawal of $1,250.00 has been sent.", time: "2 days ago" },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 text-sm mt-1">Stay updated with your account activity.</p>
        </div>
        <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800">Mark all as read</button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50 overflow-hidden">
        {notifications.map((note) => (
          <div key={note.id} className="p-5 flex gap-4 hover:bg-gray-50 transition-colors cursor-pointer group">
            
            {/* Icon based on Type */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              note.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
              note.type === 'warning' ? 'bg-amber-100 text-amber-600' :
              'bg-blue-100 text-blue-600'
            }`}>
              {note.type === 'success' ? <CheckCircle size={20} /> :
               note.type === 'warning' ? <AlertCircle size={20} /> :
               <Info size={20} />}
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-gray-900 text-sm">{note.title}</h4>
                <span className="text-xs text-gray-400 font-medium">{note.time}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">{note.message}</p>
            </div>

            {/* Delete Button (appears on hover) */}
            <button className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-all">
              <X size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;