import React from 'react';
import { 
  Search, Bell, Clock, BookOpen, Trophy, Flame, 
  PlayCircle, Star, ChevronRight, ChevronLeft, Plus,
  Layout, Award, CheckCircle
} from 'lucide-react';
const StatCard = ({ item, theme }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${theme.iconBg}`}>
        <item.icon className={`w-6 h-6 ${theme.text}`} />
      </div>
      
    </div>
    <div>
      <h3 className="text-2xl font-bold text-gray-800">{item.value}</h3>
      <p className="text-gray-400 text-sm font-medium">{item.label}</p>
    </div>
  </div>
);
export default StatCard;