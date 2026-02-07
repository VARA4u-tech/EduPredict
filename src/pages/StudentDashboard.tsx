import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Brain, Home, BarChart3, 
  Settings, LogOut, Menu, X, BookOpen,
  TrendingUp, Target, Award, Lightbulb
} from 'lucide-react';
import ComicButton from '@/components/ComicButton';
import ComicCard from '@/components/ComicCard';
import StickerBadge from '@/components/StickerBadge';
import StickerText from '@/components/StickerText';
import RiskBadge from '@/components/RiskBadge';
import ComicProgress from '@/components/ComicProgress';

const StudentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Overview', path: '/dashboard/student' },
    { icon: BarChart3, label: 'My Performance', path: '/dashboard/student/performance' },
    { icon: Target, label: 'Predictions', path: '/dashboard/student/predictions' },
    { icon: Settings, label: 'Settings', path: '/dashboard/student/settings' },
  ];

  const studentData = {
    name: 'Alex Johnson',
    class: '10-A',
    rollNo: '2024/10A/042',
    attendance: 92,
    internalMarks: 85,
    predictedScore: 88,
    riskLevel: 'low' as const,
    subjects: [
      { name: 'Mathematics', marks: 88, predicted: 90 },
      { name: 'Science', marks: 82, predicted: 85 },
      { name: 'English', marks: 90, predicted: 92 },
      { name: 'Social Studies', marks: 78, predicted: 80 },
      { name: 'Computer', marks: 95, predicted: 96 },
    ],
  };

  const recommendations = [
    "🎯 Focus on Social Studies to improve overall score",
    "📚 Maintain your excellent performance in Computer Science",
    "⏰ Try to increase study time by 30 mins daily",
    "💪 Keep up the great attendance record!",
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-12 h-12 bg-secondary rounded-xl border-4 border-comic-black shadow-[4px_4px_0px_black] flex items-center justify-center"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        className={`
          fixed lg:static lg:translate-x-0 z-40
          w-64 h-screen bg-sidebar border-r-4 border-comic-black
          flex flex-col transition-transform lg:transition-none
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="p-4 border-b-4 border-comic-black">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-secondary rounded-xl border-4 border-comic-black flex items-center justify-center">
              <Brain className="w-7 h-7 text-comic-black" />
            </div>
            <span className="font-bangers text-2xl text-sidebar-foreground">EduPredict</span>
          </Link>
        </div>

        {/* Role Badge */}
        <div className="p-4">
          <StickerBadge variant="green" size="md" className="w-full text-center">
            STUDENT
          </StickerBadge>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 p-3 rounded-xl font-comic font-bold transition-all
                  border-4 border-transparent
                  ${isActive 
                    ? 'bg-secondary text-comic-black border-comic-black shadow-[4px_4px_0px_black]' 
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t-4 border-comic-black">
          <Link to="/">
            <ComicButton variant="outline" size="sm" className="w-full">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </ComicButton>
          </Link>
        </div>
      </motion.aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-comic-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8 overflow-auto">
        {/* Header */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <StickerText size="lg" color="white">My Dashboard</StickerText>
            <p className="font-comic text-foreground/80 mt-1">Hey, {studentData.name}! Keep up the great work! 🌟</p>
          </div>
          <div className="flex items-center gap-2">
            <StickerBadge variant="blue" size="sm">{studentData.class}</StickerBadge>
            <StickerBadge variant="white" size="sm">{studentData.rollNo}</StickerBadge>
          </div>
        </motion.div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <ComicCard variant="green">
              <div className="text-center">
                <Target className="w-10 h-10 mx-auto mb-2" />
                <p className="font-comic text-sm opacity-90">Attendance</p>
                <p className="font-bangers text-4xl">{studentData.attendance}%</p>
              </div>
            </ComicCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <ComicCard variant="yellow">
              <div className="text-center">
                <BookOpen className="w-10 h-10 mx-auto mb-2" />
                <p className="font-comic text-sm opacity-90">Internal Marks</p>
                <p className="font-bangers text-4xl">{studentData.internalMarks}%</p>
              </div>
            </ComicCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <ComicCard variant="red">
              <div className="text-center">
                <TrendingUp className="w-10 h-10 mx-auto mb-2" />
                <p className="font-comic text-sm opacity-90">Predicted Score</p>
                <p className="font-bangers text-4xl">{studentData.predictedScore}%</p>
              </div>
            </ComicCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <ComicCard variant="white">
              <div className="text-center">
                <Award className="w-10 h-10 mx-auto mb-2 text-accent" />
                <p className="font-comic text-sm text-comic-black/70">Risk Level</p>
                <div className="mt-2">
                  <RiskBadge level={studentData.riskLevel} />
                </div>
              </div>
            </ComicCard>
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Subject Performance */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <ComicCard variant="white">
              <h3 className="font-bangers text-2xl text-comic-black mb-6">Subject Performance</h3>
              <div className="space-y-4">
                {studentData.subjects.map((subject) => (
                  <div key={subject.name} className="space-y-2">
                    <div className="flex justify-between font-comic">
                      <span className="font-bold text-comic-black">{subject.name}</span>
                      <div className="flex gap-4">
                        <span className="text-comic-black/70">Current: <strong>{subject.marks}%</strong></span>
                        <span className="text-accent font-bold">Predicted: {subject.predicted}%</span>
                      </div>
                    </div>
                    <div className="relative">
                      <ComicProgress value={subject.marks} showValue={false} />
                      <div 
                        className="absolute top-0 h-6 w-1 bg-comic-black rounded"
                        style={{ left: `${subject.predicted}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </ComicCard>
          </motion.div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <ComicCard variant="yellow">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-6 h-6" />
                <h3 className="font-bangers text-2xl text-comic-black">Tips For You!</h3>
              </div>
              <div className="space-y-3">
                {recommendations.map((rec, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="bg-comic-white rounded-xl p-3 border-2 border-comic-black"
                  >
                    <p className="font-comic text-comic-black">{rec}</p>
                  </motion.div>
                ))}
              </div>
            </ComicCard>
          </motion.div>
        </div>

        {/* Motivational Footer */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <ComicCard variant="green" className="text-center py-8">
            <StickerText size="lg" color="white" className="block mb-2">
              You're Doing Amazing! 🎉
            </StickerText>
            <p className="font-comic text-xl text-comic-white/90">
              Keep working hard and you'll achieve your goals!
            </p>
          </ComicCard>
        </motion.div>
      </main>
    </div>
  );
};

export default StudentDashboard;
