import { Search, Send, Paperclip, MoreVertical, Phone, Video } from 'lucide-react';
import { useState } from 'react';

const Messages = () => {
  const [activeChat, setActiveChat] = useState(1);

  // Mock Contacts
  const contacts = [
    { id: 1, name: "Alice Johnson", msg: "Thanks for the help!", time: "2m", unread: 2, online: true },
    { id: 2, name: "Mark Smith", msg: "When is the next live?", time: "1h", unread: 0, online: false },
    { id: 3, name: "Sarah Lee", msg: "I submitted the assignment.", time: "3h", unread: 0, online: true },
    { id: 4, name: "John Doe", msg: "Can you check my code?", time: "1d", unread: 0, online: false },
  ];

  // Mock Chat History
  const messages = [
    { id: 1, sender: "Alice", text: "Hi Professor! I was wondering if you could look at my project?", time: "10:30 AM", isMe: false },
    { id: 2, sender: "Me", text: "Hello Alice! Sure, send it over.", time: "10:32 AM", isMe: true },
    { id: 3, sender: "Alice", text: "Great! I just uploaded it to the dashboard. Let me know what you think.", time: "10:33 AM", isMe: false },
    { id: 4, sender: "Me", text: "Got it. I'll review it this evening.", time: "10:35 AM", isMe: true },
    { id: 5, sender: "Alice", text: "Thanks for the help!", time: "10:36 AM", isMe: false },
  ];

  return (
    <div className="h-[calc(100vh-8rem)] bg-white border border-gray-100 rounded-2xl shadow-sm flex overflow-hidden">
      
      {/* 1. LEFT SIDEBAR (Contacts) */}
      <div className="w-1/3 border-r border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-50">
           <h2 className="font-bold text-lg text-gray-900 mb-4">Messages</h2>
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
             <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-xl text-sm focus:outline-none" />
           </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <div 
              key={contact.id} 
              onClick={() => setActiveChat(contact.id)}
              className={`p-4 flex gap-3 cursor-pointer hover:bg-gray-50 transition-colors ${activeChat === contact.id ? 'bg-indigo-50 border-r-4 border-indigo-600' : ''}`}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                  {contact.name.charAt(0)}
                </div>
                {contact.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className={`text-sm font-bold ${activeChat === contact.id ? 'text-indigo-900' : 'text-gray-900'}`}>{contact.name}</h4>
                  <span className="text-xs text-gray-400">{contact.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{contact.msg}</p>
              </div>
              {contact.unread > 0 && (
                <div className="flex items-center">
                  <span className="w-5 h-5 bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                    {contact.unread}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 2. RIGHT SIDE (Chat Window) */}
      <div className="flex-1 flex flex-col bg-white">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-white z-10">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">
                 A
              </div>
              <div>
                 <h3 className="font-bold text-gray-900">Alice Johnson</h3>
                 <p className="text-xs text-emerald-500 font-medium">Online</p>
              </div>
           </div>
           <div className="flex items-center gap-4 text-gray-400">
              <Phone className="hover:text-indigo-600 cursor-pointer" size={20} />
              <Video className="hover:text-indigo-600 cursor-pointer" size={20} />
              <MoreVertical className="hover:text-gray-600 cursor-pointer" size={20} />
           </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
           {messages.map((msg) => (
             <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
               <div className={`max-w-[70%] rounded-2xl p-4 shadow-sm text-sm ${
                 msg.isMe 
                   ? 'bg-indigo-600 text-white rounded-br-none' 
                   : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none'
               }`}>
                 <p>{msg.text}</p>
                 <p className={`text-[10px] mt-1 text-right ${msg.isMe ? 'text-indigo-200' : 'text-gray-400'}`}>{msg.time}</p>
               </div>
             </div>
           ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-100 bg-white">
           <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-200">
              <Paperclip className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="flex-1 bg-transparent focus:outline-none text-sm text-gray-700"
              />
              <button className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors">
                 <Send size={16} />
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Messages;