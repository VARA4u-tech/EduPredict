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
  Target,
  Save,
  Plus,
  Trash2,
  BookOpen,
} from "lucide-react";
import ComicButton from "@/components/ComicButton";
import ComicCard from "@/components/ComicCard";
import StickerBadge from "@/components/StickerBadge";
import StickerText from "@/components/StickerText";
import { useMockData } from "@/context/MockDataContext";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { AuthService } from "@/services/auth.service";
import {
  getStudentSubjects,
  updateStudentSubjects,
  type Subject,
} from "@/services/student.service";

// Default subjects if none exist
const defaultSubjects: Subject[] = [
  {
    name: "Mathematics",
    internalMarks: 0,
    externalMarks: 0,
    predictedScore: 0,
  },
  { name: "Science", internalMarks: 0, externalMarks: 0, predictedScore: 0 },
  { name: "English", internalMarks: 0, externalMarks: 0, predictedScore: 0 },
  {
    name: "Social Studies",
    internalMarks: 0,
    externalMarks: 0,
    predictedScore: 0,
  },
  {
    name: "Computer Science",
    internalMarks: 0,
    externalMarks: 0,
    predictedScore: 0,
  },
];

const StudentPerformance = () => {
  const { user } = useMockData();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  // Get the logged-in user's data from localStorage
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

  // Fetch subjects on mount
  useEffect(() => {
    const fetchSubjects = async () => {
      if (!studentId) {
        setSubjects(defaultSubjects);
        setLoading(false);
        return;
      }

      try {
        const response = await getStudentSubjects(studentId);
        setSubjects(
          response.subjects.length > 0 ? response.subjects : defaultSubjects,
        );
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
        setSubjects(defaultSubjects);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [studentId]);

  // Handle subject value change
  const handleSubjectChange = (
    index: number,
    field: "name" | "internalMarks" | "externalMarks",
    value: string | number,
  ) => {
    const updated = [...subjects];
    if (field === "name") {
      updated[index].name = value as string;
    } else {
      const numValue = Math.min(100, Math.max(0, Number(value) || 0));
      updated[index][field] = numValue;
      // Auto-calculate predicted score as average of internal and external
      updated[index].predictedScore = Math.round(
        (updated[index].internalMarks + updated[index].externalMarks) / 2,
      );
    }
    setSubjects(updated);
  };

  // Add new subject
  const addSubject = () => {
    setSubjects([
      ...subjects,
      { name: "", internalMarks: 0, externalMarks: 0, predictedScore: 0 },
    ]);
  };

  // Remove subject
  const removeSubject = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  // Save subjects
  const saveSubjects = async () => {
    if (!studentId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please login to save your performance data.",
      });
      return;
    }

    // Validate all subjects have names
    const invalidSubjects = subjects.filter((s) => !s.name.trim());
    if (invalidSubjects.length > 0) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "All subjects must have a name.",
      });
      return;
    }

    setSaving(true);
    try {
      await updateStudentSubjects(studentId, subjects);
      toast({
        title: "Saved Successfully! 🎉",
        description:
          "Your performance data has been updated. Redirecting to dashboard...",
      });
      // Redirect to dashboard after short delay
      setTimeout(() => {
        navigate("/dashboard/student");
      }, 1500);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: error.message || "Failed to save performance data.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
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
          fixed lg:static z-[60]
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

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-comic-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <StickerText size="lg" color="white" className="drop-shadow-md">
                  My Performance
                </StickerText>
                <ThemeToggle />
              </div>
              <p className="font-comic text-foreground/80 mt-1">
                Enter your subject-wise marks below
                {currentUser?.name && (
                  <span className="ml-2 text-accent font-bold">
                    • {currentUser.name}
                  </span>
                )}
              </p>
            </div>
          </motion.div>

          {/* Subject Entry Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ComicCard variant="white" className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-accent" />
                  <h2 className="font-bangers text-2xl text-comic-black">
                    Subject-wise Performance
                  </h2>
                </div>
                <Button
                  onClick={addSubject}
                  variant="outline"
                  size="sm"
                  className="border-2 border-comic-black bg-accent text-comic-black font-comic font-bold hover:bg-accent/80 shadow-[2px_2px_0px_black]"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Subject
                </Button>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-16 bg-gray-100 rounded-xl animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Header Row */}
                  <div className="grid grid-cols-12 gap-2 text-sm font-bold text-comic-black/70 pb-2 border-b-2 border-comic-black/20">
                    <div className="col-span-4">Subject Name</div>
                    <div className="col-span-3 text-center">Internal Marks</div>
                    <div className="col-span-3 text-center">External Marks</div>
                    <div className="col-span-2 text-center">Actions</div>
                  </div>

                  {/* Subject Rows */}
                  {subjects.map((subject, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="grid grid-cols-12 gap-2 items-center"
                    >
                      <div className="col-span-4">
                        <input
                          type="text"
                          value={subject.name}
                          onChange={(e) =>
                            handleSubjectChange(index, "name", e.target.value)
                          }
                          placeholder="Subject name"
                          className="w-full p-2 rounded-lg border-2 border-comic-black font-comic text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                      </div>
                      <div className="col-span-3">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={subject.internalMarks}
                          onChange={(e) =>
                            handleSubjectChange(
                              index,
                              "internalMarks",
                              e.target.value,
                            )
                          }
                          className="w-full p-2 rounded-lg border-2 border-comic-black font-comic text-sm text-center focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                      </div>
                      <div className="col-span-3">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={subject.externalMarks}
                          onChange={(e) =>
                            handleSubjectChange(
                              index,
                              "externalMarks",
                              e.target.value,
                            )
                          }
                          className="w-full p-2 rounded-lg border-2 border-comic-black font-comic text-sm text-center focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                      </div>
                      <div className="col-span-2 flex justify-center">
                        <Button
                          onClick={() => removeSubject(index)}
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10"
                          disabled={subjects.length <= 1}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}

                  {/* Save Button */}
                  <div className="pt-4 border-t-2 border-comic-black/20 flex justify-end">
                    <ComicButton
                      onClick={saveSubjects}
                      variant="primary"
                      disabled={saving}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {saving ? "Saving..." : "Save Performance"}
                    </ComicButton>
                  </div>
                </div>
              )}
            </ComicCard>
          </motion.div>

          {/* Summary Card */}
          {subjects.length > 0 && !loading && (
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <ComicCard variant="green" className="p-6 text-center">
                <h3 className="font-bangers text-2xl text-comic-white mb-2">
                  Overall Average
                </h3>
                <p className="font-bangers text-5xl text-comic-white">
                  {subjects.length > 0
                    ? Math.round(
                        subjects.reduce(
                          (acc, s) =>
                            acc + (s.internalMarks + s.externalMarks) / 2,
                          0,
                        ) / subjects.length,
                      )
                    : 0}
                  %
                </p>
                <p className="font-comic text-comic-white/80 mt-2">
                  Based on {subjects.length} subjects
                </p>
              </ComicCard>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentPerformance;
