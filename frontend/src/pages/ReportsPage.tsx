import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Brain,
  Home,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Download,
  PieChart,
  Users,
  TrendingUp,
  Calendar,
  Target,
  BookOpen,
} from "lucide-react";
import {
  PieChart as RechartsPie,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import ComicButton from "@/components/ComicButton";
import ComicCard from "@/components/ComicCard";
import StickerBadge from "@/components/StickerBadge";
import StickerText from "@/components/StickerText";
import RiskBadge from "@/components/RiskBadge";
import { useStudentProgress } from "@/hooks/useStudent";
import { AuthService } from "@/services/auth.service";
import { Skeleton } from "@/components/ui/skeleton";

const ReportsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  const role = currentUser?.role || "admin";
  const studentId = currentUser?._id || "";
  const isStudent = role === "student";

  const { progress, loading: progressLoading } = useStudentProgress(
    isStudent ? studentId : "",
  );

  const adminMenuItems = [
    { icon: Home, label: "Overview", path: "/dashboard/admin" },
    { icon: Users, label: "Students", path: "/dashboard/admin/students" },
    { icon: BarChart3, label: "Analytics", path: "/dashboard/admin/analytics" },
    { icon: FileText, label: "Reports", path: "/dashboard/admin/reports" },
    { icon: Settings, label: "Settings", path: "/dashboard/admin/settings" },
  ];

  const studentMenuItems = [
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
    { icon: FileText, label: "Reports", path: "/dashboard/student/reports" },
    { icon: Settings, label: "Settings", path: "/dashboard/student/settings" },
  ];

  const menuItems = isStudent ? studentMenuItems : adminMenuItems;

  // Admin Data
  const riskDistribution = [
    { name: "Low Risk", value: 65, color: "hsl(142, 71%, 45%)" },
    { name: "Medium Risk", value: 25, color: "hsl(45, 93%, 55%)" },
    { name: "High Risk", value: 10, color: "hsl(0, 84%, 60%)" },
  ];

  const classPerformance = [
    { name: "Class 10-A", value: 35, color: "hsl(217, 91%, 50%)" },
    { name: "Class 10-B", value: 28, color: "hsl(0, 84%, 60%)" },
    { name: "Class 10-C", value: 22, color: "hsl(45, 93%, 55%)" },
    { name: "Class 11-A", value: 15, color: "hsl(142, 71%, 45%)" },
  ];

  const adminReports = [
    {
      id: 1,
      title: "Monthly Performance Report",
      date: "February 2025",
      type: "Performance",
      icon: TrendingUp,
      color: "green",
      stats: { students: 2547, avgScore: 78, improvement: "+5%" },
    },
    {
      id: 2,
      title: "At-Risk Students Analysis",
      date: "February 2025",
      type: "Risk Analysis",
      icon: Users,
      color: "red",
      stats: { highRisk: 127, mediumRisk: 342, actions: 45 },
    },
    {
      id: 3,
      title: "Attendance Summary",
      date: "February 2025",
      type: "Attendance",
      icon: Calendar,
      color: "yellow",
      stats: { avgAttendance: "87%", perfect: 523, below70: 89 },
    },
    {
      id: 4,
      title: "Prediction Accuracy Report",
      date: "January 2025",
      type: "Model Stats",
      icon: PieChart,
      color: "green",
      stats: { accuracy: "94%", predictions: 5420, verified: 4890 },
    },
  ];

  // Student Data (Derived from Progress)
  const studentOverallScore = progress?.overallScore || 0;

  const studentSubjectPerformance = progress?.subjectAverages?.map((s, i) => {
    const colors = [
      "hsl(217, 91%, 50%)",
      "hsl(0, 84%, 60%)",
      "hsl(45, 93%, 55%)",
      "hsl(142, 71%, 45%)",
      "hsl(280, 71%, 45%)",
    ];
    return {
      name: s.name,
      value: s.average,
      color: colors[i % colors.length],
    };
  }) || [{ name: "No Data", value: 100, color: "hsl(0, 0%, 80%)" }];

  const currentMonth = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const studentReports = [
    {
      id: 1,
      title: "My Personal Performance Report",
      date: currentMonth,
      type: "Performance",
      icon: TrendingUp,
      color: "green",
      stats: {
        avgScore: `${studentOverallScore.toFixed(0)}%`,
        subjects: progress?.subjectAverages?.length || 0,
        prediction: `${Math.min(100, studentOverallScore + 5).toFixed(0)}%`,
      },
    },
    {
      id: 2,
      title: "My Attendance Summary",
      date: currentMonth,
      type: "Attendance",
      icon: Calendar,
      color: "yellow",
      stats: {
        present: `${progress?.metrics?.attendance?.value || 0}%`,
        status:
          (progress?.metrics?.attendance?.value || 0) > 85
            ? "Excellent"
            : "Needs Review",
        xp: progress?.gamification?.xp || 0,
      },
    },
    {
      id: 3,
      title: "My Assignment Progress",
      date: currentMonth,
      type: "Academics",
      icon: FileText,
      color: "red",
      stats: {
        assignments: `${progress?.metrics?.assignments?.value || 0}%`,
        quizzes: `${progress?.metrics?.quizzes?.value || 0}%`,
        participation: `${progress?.metrics?.participation?.value || 0}%`,
      },
    },
  ];

  const reports = isStudent ? studentReports : adminReports;

  const hasSubjectData =
    progress?.hasSubjectData ??
    (progress?.subjectAverages && progress.subjectAverages.length > 0);
  const showEmptyState = isStudent && !progressLoading && !hasSubjectData;

  const handleDownload = (reportTitle: string) => {
    alert(`Downloading: ${reportTitle}`);
  };

  const renderSubjectOrClassChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPie>
        <Pie
          data={isStudent ? studentSubjectPerformance : classPerformance}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          stroke="#000"
          strokeWidth={3}
        >
          {(isStudent ? studentSubjectPerformance : classPerformance).map(
            (entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ),
          )}
        </Pie>
        <Tooltip
          contentStyle={{
            border: "3px solid black",
            borderRadius: "12px",
            fontFamily: "Comic Neue",
          }}
        />
        <Legend
          formatter={(value) => (
            <span className="font-comic font-bold text-comic-black">
              {value}
            </span>
          )}
        />
      </RechartsPie>
    </ResponsiveContainer>
  );

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
      <aside
        className={`
          fixed lg:static z-[60]
          w-64 h-screen bg-sidebar border-r-4 border-comic-black
          flex flex-col transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
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

        <div className="p-4">
          <StickerBadge
            variant={isStudent ? "green" : "red"}
            size="md"
            className="w-full text-center"
          >
            {role.toUpperCase()}
          </StickerBadge>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname.includes(item.path);
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

        <div className="p-4 pb-8 lg:pb-4 border-t-4 border-comic-black">
          <ComicButton
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => AuthService.logout()}
          >
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </ComicButton>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-comic-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <StickerText size="lg" color="white">
                Reports & Analytics
              </StickerText>
              <p className="font-comic text-foreground/80 mt-1">
                Download reports and view analytics! 📊
              </p>
            </div>
            <ComicButton variant="primary" size="md">
              <Download className="w-4 h-4 mr-2" /> Export All
            </ComicButton>
          </motion.div>

          {isStudent && progressLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Skeleton className="h-64 rounded-xl" />
              <Skeleton className="h-64 rounded-xl" />
            </div>
          ) : showEmptyState ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center p-8 bg-card rounded-2xl border-4 border-comic-black shadow-[8px_8px_0px_black] text-center max-w-2xl mx-auto my-12"
            >
              <div className="w-20 h-20 bg-secondary rounded-2xl border-4 border-comic-black mx-auto mb-6 flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-comic-black" />
              </div>
              <h2 className="font-bangers text-3xl text-foreground mb-4 md:text-4xl px-4">
                No Performance Data Found
              </h2>
              <p className="font-comic text-lg text-muted-foreground mb-8 md:text-xl px-4">
                Please upload your performance data. Your reports will appear
                here.
              </p>
              <ComicButton
                variant="primary"
                size="lg"
                onClick={() => navigate("/dashboard/student/performance")}
                className="w-full sm:w-auto"
              >
                Go to Performance Page
              </ComicButton>
            </motion.div>
          ) : (
            <>
              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Risk / Attendance Chart */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <ComicCard variant="white">
                    <h3 className="font-bangers text-2xl text-comic-black mb-4">
                      {isStudent
                        ? "🎯 Academic Risk Status"
                        : "🎯 Risk Distribution"}
                    </h3>
                    <div className="h-64">
                      {isStudent ? (
                        <div className="flex flex-col items-center justify-center h-full space-y-4">
                          {studentOverallScore >= 75 ? (
                            <RiskBadge level="low" />
                          ) : studentOverallScore >= 60 ? (
                            <RiskBadge level="medium" />
                          ) : (
                            <RiskBadge level="high" />
                          )}
                          <p className="font-comic text-lg text-center mt-4 text-comic-black/80">
                            {studentOverallScore >= 75
                              ? "You're on track! Keep up the good work."
                              : studentOverallScore >= 60
                                ? "You're doing okay, but there's room for improvement."
                                : "You're at high risk. Please focus on your studies and assignments."}
                          </p>
                        </div>
                      ) : (
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPie>
                            <Pie
                              data={riskDistribution}
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                              stroke="#000"
                              strokeWidth={3}
                            >
                              {riskDistribution.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color}
                                />
                              ))}
                            </Pie>
                            <Tooltip
                              contentStyle={{
                                border: "3px solid black",
                                borderRadius: "12px",
                                fontFamily: "Comic Neue",
                              }}
                            />
                            <Legend
                              formatter={(value) => (
                                <span className="font-comic font-bold text-comic-black">
                                  {value}
                                </span>
                              )}
                            />
                          </RechartsPie>
                        </ResponsiveContainer>
                      )}
                    </div>
                    {!isStudent && (
                      <div className="flex justify-center gap-4 mt-4">
                        <RiskBadge level="low" />
                        <RiskBadge level="medium" />
                        <RiskBadge level="high" />
                      </div>
                    )}
                  </ComicCard>
                </motion.div>

                {/* Class Performance / Subject Performance Pie Chart */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <ComicCard variant="white">
                    <h3 className="font-bangers text-2xl text-comic-black mb-4">
                      {isStudent
                        ? "📚 Subject Performance"
                        : "📚 Students by Class"}
                    </h3>
                    <div className="h-64">{renderSubjectOrClassChart()}</div>
                  </ComicCard>
                </motion.div>
              </div>

              {/* Report Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="font-bangers text-2xl text-foreground mb-6">
                  📄 Available Reports
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reports.map((report, i) => (
                    <motion.div
                      key={report.id}
                      initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <ComicCard
                        variant={report.color as "green" | "red" | "yellow"}
                        className="relative overflow-hidden"
                      >
                        {/* Sticker Badge */}
                        <div className="absolute top-4 right-4 hidden sm:block">
                          <StickerBadge variant="white" size="sm" rotate>
                            {report.type}
                          </StickerBadge>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start gap-4">
                          <div className="w-16 h-16 bg-comic-white/30 rounded-xl border-4 border-comic-black flex items-center justify-center flex-shrink-0">
                            <report.icon className="w-8 h-8" />
                          </div>
                          <div className="flex-1 min-w-0 w-full">
                            <h4 className="font-bangers text-xl mb-1 sm:pr-20">
                              {report.title}
                            </h4>
                            <p className="font-comic text-sm opacity-80 mb-4">
                              {report.date}
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-2 mb-4">
                              {Object.entries(report.stats).map(
                                ([key, value]) => (
                                  <div
                                    key={key}
                                    className="bg-comic-white/20 rounded-lg p-2 text-center"
                                  >
                                    <p className="font-bangers text-lg break-words">
                                      {String(value)}
                                    </p>
                                    <p className="font-comic text-xs capitalize">
                                      {key.replace(/([A-Z])/g, " $1")}
                                    </p>
                                  </div>
                                ),
                              )}
                            </div>

                            <ComicButton
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownload(report.title)}
                              className="w-full"
                            >
                              <Download className="w-4 h-4 mr-2" /> Download PDF
                            </ComicButton>
                          </div>
                        </div>
                      </ComicCard>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Stats Footer */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <ComicCard variant="yellow" className="text-center">
                  <div className="flex flex-wrap justify-center gap-8">
                    {isStudent ? (
                      <>
                        <div>
                          <p className="font-bangers text-4xl text-comic-black">
                            {progress?.subjectAverages?.length || 0}
                          </p>
                          <p className="font-comic text-comic-black/80">
                            Subjects Tracked
                          </p>
                        </div>
                        <div>
                          <p className="font-bangers text-4xl text-comic-black">
                            {progress?.metrics?.attendance?.value || 0}%
                          </p>
                          <p className="font-comic text-comic-black/80">
                            Overall Attendance
                          </p>
                        </div>
                        <div>
                          <p className="font-bangers text-4xl text-comic-black">
                            {studentOverallScore.toFixed(0)}%
                          </p>
                          <p className="font-comic text-comic-black/80">
                            Performance Score
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <p className="font-bangers text-4xl text-comic-black">
                            2,547
                          </p>
                          <p className="font-comic text-comic-black/80">
                            Total Students
                          </p>
                        </div>
                        <div>
                          <p className="font-bangers text-4xl text-comic-black">
                            156
                          </p>
                          <p className="font-comic text-comic-black/80">
                            Reports Generated
                          </p>
                        </div>
                        <div>
                          <p className="font-bangers text-4xl text-comic-black">
                            94%
                          </p>
                          <p className="font-comic text-comic-black/80">
                            Prediction Accuracy
                          </p>
                        </div>
                        <div>
                          <p className="font-bangers text-4xl text-comic-black">
                            12
                          </p>
                          <p className="font-comic text-comic-black/80">
                            Classes Monitored
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </ComicCard>
              </motion.div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default ReportsPage;
