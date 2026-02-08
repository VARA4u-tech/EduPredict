import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Brain,
  Home,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  BookOpen,
  TrendingUp,
  Target,
  Award,
  Lightbulb,
  Zap,
  RefreshCw,
} from "lucide-react";
import ComicButton from "@/components/ComicButton";
import ComicCard from "@/components/ComicCard";
import StickerBadge from "@/components/StickerBadge";
import StickerText from "@/components/StickerText";
import RiskBadge from "@/components/RiskBadge";
import ComicProgress from "@/components/ComicProgress";
import { useMockData } from "@/context/MockDataContext";
import ThemeToggle from "@/components/ThemeToggle";
import AlertsCenter from "@/components/AlertsCenter";
import { useStudentProgress } from "@/hooks/useStudent";
import { usePrediction } from "@/hooks/useAI";
import { AuthService } from "@/services/auth.service";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const StudentDashboard = () => {
  const { user } = useMockData();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Get the logged-in user's ID from localStorage
  const currentUser = useMemo(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }, []);

  const studentId = currentUser?._id || "";

  // Use real backend data
  const {
    progress,
    loading: progressLoading,
    refresh,
  } = useStudentProgress(studentId);
  const {
    execute: getPrediction,
    data: aiPrediction,
    loading: aiLoading,
  } = usePrediction();

  const menuItems = [
    { icon: Home, label: "Overview", path: "/dashboard/student" },
    {
      icon: BarChart3,
      label: "My Performance",
      path: "/dashboard/student/performance",
    },
    {
      icon: Target,
      label: "Predictions",
      path: "/dashboard/student/predictions",
    },
    { icon: Settings, label: "Settings", path: "/dashboard/student/settings" },
  ];

  // Combined data (backend + defaults)
  const dashboardData = progress
    ? {
        attendance: progress.metrics.attendance.value,
        internalMarks: progress.metrics.assignments.value,
        predictedScore: progress.overallScore,
        riskLevel:
          progress.overallScore > 80
            ? "low"
            : progress.overallScore > 60
              ? "medium"
              : ("high" as "low" | "medium" | "high"),
        xp: progress.gamification.xp,
        level: progress.gamification.level,
        nextLevelXp:
          progress.gamification.xp + progress.gamification.xpToNextLevel,
      }
    : {
        attendance: 92,
        internalMarks: 85,
        predictedScore: 88,
        riskLevel: "low" as "low" | "medium" | "high",
        xp: user.xp,
        level: user.level,
        nextLevelXp: user.nextLevelXp,
      };

  // Generate AI prediction on load if data is available
  useEffect(() => {
    if (progress && !aiPrediction) {
      getPrediction({
        attendance: progress.metrics.attendance.value,
        assignmentCompletion: progress.metrics.assignments.value,
        quizScores: progress.metrics.quizzes.value,
        studyHours: progress.weeklyStudyHours,
        participation: progress.metrics.participation.value,
      });
    }
  }, [progress, getPrediction, aiPrediction]);

  // Transform AI recommendations or use defaults
  const recommendations =
    aiPrediction?.prediction && typeof aiPrediction.prediction !== "string"
      ? aiPrediction.prediction.recommendations.slice(0, 4)
      : [
          "🎯 Focus on Social Studies to improve overall score",
          "📚 Maintain your excellent performance in Computer Science",
          "⏰ Try to increase study time by 30 mins daily",
          "💪 Keep up the great attendance record!",
        ];

  // Detect first-time user (no subject data)
  useEffect(() => {
    if (progress && !progress.hasSubjectData && !progressLoading) {
      setShowWelcome(true);
    }
  }, [progress, progressLoading]);

  // Use real subject data from backend or fallback
  const subjects =
    progress?.subjectAverages?.length > 0
      ? progress.subjectAverages.map((s) => ({
          name: s.name,
          marks: s.average,
          predicted: Math.min(100, s.average + 5),
        }))
      : [{ name: "No Data", marks: 0, predicted: 0 }];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Welcome Modal for First-Time Users */}
      {showWelcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card rounded-2xl border-4 border-comic-black shadow-[8px_8px_0px_black] p-8 max-w-md w-full text-center"
          >
            <div className="w-20 h-20 bg-secondary rounded-2xl border-4 border-comic-black mx-auto mb-6 flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-comic-black" />
            </div>
            <h2 className="font-bangers text-3xl text-foreground mb-4">
              Welcome, {currentUser?.name?.split(" ")[0] || "Student"}! 🎉
            </h2>
            <p className="font-comic text-muted-foreground mb-6">
              To see your performance analysis and predictions, please enter
              your subject-wise marks first.
            </p>
            <div className="space-y-3">
              <ComicButton
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => navigate("/dashboard/student/performance")}
              >
                📝 Enter My Performance
              </ComicButton>
              <button
                onClick={() => setShowWelcome(false)}
                className="font-comic text-muted-foreground hover:text-foreground text-sm"
              >
                I'll do it later
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-12 h-12 bg-secondary rounded-xl border-4 border-comic-black shadow-[4px_4px_0px_black] flex items-center justify-center"
        aria-label="Toggle Menu"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static z-40
          w-64 h-screen bg-sidebar border-r-4 border-comic-black
          flex flex-col transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="p-4 border-b-4 border-comic-black">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-secondary rounded-xl border-4 border-comic-black flex items-center justify-center">
              <Brain className="w-7 h-7 text-comic-black" />
            </div>
            <span className="font-bangers text-2xl text-sidebar-foreground">
              EduPredict
            </span>
          </Link>
        </div>

        {/* Role Badge */}
        <div className="p-4">
          <StickerBadge
            variant="green"
            size="md"
            className="w-full text-center"
          >
            {user.role.toUpperCase()}
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
                  ${
                    isActive
                      ? "bg-secondary text-comic-black border-comic-black shadow-[4px_4px_0px_black]"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
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
          <ComicButton
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => {
              AuthService.logout();
            }}
          >
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </ComicButton>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-comic-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <StickerText size="lg" color="white" className="drop-shadow-md">
                  My Dashboard
                </StickerText>
                <div className="hidden md:flex gap-2">
                  <ThemeToggle />
                  <AlertsCenter />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => refresh()}
                    disabled={progressLoading}
                    className="hover:bg-transparent hover:text-white"
                  >
                    <RefreshCw
                      className={`h-5 w-5 ${progressLoading ? "animate-spin" : ""}`}
                    />
                  </Button>
                </div>
              </div>
              <p className="font-comic text-foreground/80 mt-1">
                Welcome back,{" "}
                <span className="font-bold text-accent">
                  {currentUser?.name || user.name}
                </span>
                {currentUser?.gender && (
                  <span className="ml-2 text-xs bg-accent/20 px-2 py-1 rounded-full">
                    {currentUser.gender}
                  </span>
                )}
                {currentUser?.rollNumber && (
                  <span className="ml-2 text-xs text-muted-foreground">
                    ({currentUser.rollNumber})
                  </span>
                )}
              </p>
            </div>

            {/* Mobile Header Icons */}
            <div className="flex md:hidden gap-2 absolute top-4 right-4">
              <ThemeToggle />
              <AlertsCenter />
            </div>

            {progressLoading ? (
              <Skeleton className="h-20 w-64 rounded-xl" />
            ) : (
              <div className="flex items-center gap-4 bg-card p-3 rounded-xl border-4 border-black shadow-comic">
                <div className="text-right">
                  <p className="font-bangers text-lg leading-none">
                    Level {dashboardData.level}
                  </p>
                  <p className="text-xs font-bold text-muted-foreground uppercase">
                    {user.title}
                  </p>
                </div>
                <div className="w-32">
                  <div className="flex justify-between text-[10px] font-bold mb-1">
                    <span>XP</span>
                    <span>
                      {dashboardData.xp} / {dashboardData.nextLevelXp}
                    </span>
                  </div>
                  <div className="h-3 bg-muted rounded-full border-2 border-black overflow-hidden">
                    <div
                      className="h-full bg-yellow-400"
                      style={{
                        width: `${(dashboardData.xp / dashboardData.nextLevelXp) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="w-10 h-10 bg-yellow-400 rounded-full border-4 border-black flex items-center justify-center">
                  <Zap className="w-5 h-5 text-black fill-current" />
                </div>
              </div>
            )}
          </motion.div>

          {/* Main Stats */}
          {progressLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-40 rounded-xl" />
              ))}
            </div>
          ) : (
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
                    <p className="font-bangers text-4xl">
                      {dashboardData.attendance}%
                    </p>
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
                    <p className="font-comic text-sm opacity-90">
                      Assignment Score
                    </p>
                    <p className="font-bangers text-4xl">
                      {dashboardData.internalMarks}%
                    </p>
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
                    <p className="font-comic text-sm opacity-90">
                      Overall Score
                    </p>
                    <p className="font-bangers text-4xl">
                      {dashboardData.predictedScore}%
                    </p>
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
                    <p className="font-comic text-sm text-comic-black/70">
                      Risk Level
                    </p>
                    <div className="mt-2">
                      <RiskBadge level={dashboardData.riskLevel} />
                    </div>
                  </div>
                </ComicCard>
              </motion.div>
            </div>
          )}

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
                <h3 className="font-bangers text-2xl text-comic-black mb-6">
                  Subject Performance
                </h3>
                <div className="space-y-4">
                  {subjects.map((subject) => (
                    <div key={subject.name} className="space-y-2">
                      <div className="flex justify-between font-comic">
                        <span className="font-bold text-comic-black">
                          {subject.name}
                        </span>
                        <div className="flex gap-4">
                          <span className="text-comic-black/70">
                            Current: <strong>{subject.marks}%</strong>
                          </span>
                          <span className="text-accent font-bold">
                            Predicted: {subject.predicted}%
                          </span>
                        </div>
                      </div>
                      <div className="relative">
                        <ComicProgress
                          value={subject.marks}
                          showValue={false}
                        />
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
                <div className="flex items-center gap-2 mb-4 justify-between">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-6 h-6" />
                    <h3 className="font-bangers text-2xl text-comic-black">
                      AI Tips For You!
                    </h3>
                  </div>
                  {aiLoading && <RefreshCw className="h-4 w-4 animate-spin" />}
                </div>
                <div className="space-y-3">
                  {aiLoading && !aiPrediction
                    ? [1, 2, 3].map((i) => (
                        <Skeleton
                          key={i}
                          className="h-12 w-full rounded-xl bg-white/50"
                        />
                      ))
                    : recommendations.map((rec, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + i * 0.1 }}
                          className="bg-comic-white rounded-xl p-3 border-2 border-comic-black shadow-sm"
                        >
                          <p className="font-comic text-comic-black text-sm">
                            {rec}
                          </p>
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
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
