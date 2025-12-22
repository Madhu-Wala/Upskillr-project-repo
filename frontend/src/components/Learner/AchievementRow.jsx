import React from 'react';
import { 
  Search, Bell, Clock, BookOpen, Trophy, Flame, 
  PlayCircle, Star, ChevronRight, ChevronLeft, Plus,
  Layout, Award, CheckCircle
} from 'lucide-react';
const AchievementRow = ({ achievement, theme }) => (
  <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors">
    <div className={`p-3 rounded-xl ${theme.iconBg}`}>
      <achievement.icon className={`w-5 h-5 ${theme.text}`} />
    </div>
    <div>
      <h4 className="font-bold text-gray-800 text-sm">{achievement.title}</h4>
      <p className="text-gray-400 text-xs">{achievement.date}</p>
    </div>
  </div>
);
export default AchievementRow;