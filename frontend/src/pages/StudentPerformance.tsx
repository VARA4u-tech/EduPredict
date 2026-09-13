import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
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
import { useStudentProfile } from "@/hooks/useStudent";
import { useMockData } from "@/context/MockDataContext";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { AuthService } from "@/services/auth.service";
import Logo from "@/components/Logo";
import DashboardLayout from "@/components/DashboardLayout";
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
  const [resetting, setResetting] = useState(false);
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

  const { resetProgress } = useStudentProfile(studentId);

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

  // Reset Progress
  const handleResetProgress = async () => {
    if (!studentId || resetting) return;

    if (
      confirm(
        "Are you sure you want to completely reset all your academic data? This action cannot be undone.",
      )
    ) {
      setResetting(true);
      try {
        await resetProgress();
        setSubjects([]);
        toast({
          title: "Progress Reset! 🔄",
          description: "All your performance data has been cleared.",
        });
        setTimeout(() => {
          navigate("/dashboard/student");
        }, 1500);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Reset Failed",
          description: error.message || "Failed to reset progress.",
        });
      } finally {
        setResetting(false);
      }
    }
  };

  return (
    <DashboardLayout
      menuItems={menuItems}
      role="STUDENT"
      headerContent={
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
      }
    >
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

              {/* Save & Reset Buttons */}
              <div className="pt-4 border-t-2 border-comic-black/20 flex justify-between">
                <ComicButton
                  onClick={handleResetProgress}
                  variant="danger"
                  disabled={resetting || saving}
                >
                  {resetting ? "Resetting..." : "Reset Progress"}
                </ComicButton>
                <ComicButton
                  onClick={saveSubjects}
                  variant="primary"
                  disabled={saving || resetting}
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
                      (acc, s) => acc + (s.internalMarks + s.externalMarks) / 2,
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
    </DashboardLayout>
  );
};

export default StudentPerformance;
