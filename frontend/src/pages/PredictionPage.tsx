import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Brain,
  Home,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Calculator,
  Target,
  TrendingUp,
  AlertTriangle,
  Zap,
  CheckCircle,
  XCircle,
  ThumbsUp,
  ArrowUpCircle,
  Lightbulb,
} from "lucide-react";
import ComicButton from "@/components/ComicButton";
import ComicCard from "@/components/ComicCard";
import ComicInput from "@/components/ComicInput";
import StickerBadge from "@/components/StickerBadge";
import StickerText from "@/components/StickerText";
import RiskBadge from "@/components/RiskBadge";
import { useMockData } from "@/context/MockDataContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { usePrediction } from "@/hooks/useAI";

const PredictionPage = () => {
  const { user } = useMockData();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showWhatIf, setShowWhatIf] = useState(false);

  // State for new form structure
  const [formData, setFormData] = useState({
    attendance: "",
    attendanceMax: "100",
    internalMarks: "",
    internalMarksMax: "100",
    externalMarks: "",
    externalMarksMax: "100",
    subjectPerformance: "",
    subjectPerformanceMax: "100",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [prediction, setPrediction] = useState<{
    finalScore: number;
    passProbability: number;
    riskLevel: "low" | "medium" | "high";
  } | null>(null);

  // AI Integration
  const {
    execute: getAIPrediction,
    data: aiData,
    loading: aiLoading,
  } = usePrediction();
  const [showAiResults, setShowAiResults] = useState(false);

  // Helper to normalize score to 0-100 scale
  const normalize = (value: string, max: string) => {
    const v = parseFloat(value) || 0;
    const m = parseFloat(max) || 100;
    return m === 0 ? 0 : (v / m) * 100;
  };

  const menuItems = [
    { icon: Home, label: "Overview", path: "/dashboard/student" },
    {
      icon: Calculator,
      label: "Predictions",
      path: "/dashboard/student/predictions",
    },
    {
      icon: BarChart3,
      label: "Performance",
      path: "/dashboard/student/performance",
    },
    { icon: FileText, label: "Reports", path: "/dashboard/student/reports" },
    { icon: Settings, label: "Settings", path: "/dashboard/student/settings" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handlePredict = async () => {
    // Validate inputs
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // specific validation logic
    const fields = [
      "attendance",
      "internalMarks",
      "externalMarks",
      "subjectPerformance",
    ];

    fields.forEach((field) => {
      const val = parseFloat(formData[field as keyof typeof formData]);
      const max = parseFloat(formData[`${field}Max` as keyof typeof formData]);

      if (isNaN(val) || val < 0) {
        newErrors[field] = "Enter a valid score";
        isValid = false;
      }
      if (isNaN(max) || max <= 0) {
        newErrors[`${field}Max`] = "Invalid Max";
        isValid = false;
      }
      if (val > max) {
        newErrors[field] = `Score cannot exceed ${max}`;
        isValid = false;
      }
    });

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    // Normalize all inputs to %
    const normalizedData = {
      attendance: normalize(formData.attendance, formData.attendanceMax),
      internalMarks: normalize(
        formData.internalMarks,
        formData.internalMarksMax,
      ),
      externalMarks: normalize(
        formData.externalMarks,
        formData.externalMarksMax,
      ),
      subjectPerformance: normalize(
        formData.subjectPerformance,
        formData.subjectPerformanceMax,
      ),
      studyHours: 4, // Default assumption since removed from UI
    };

    // Calculate weighted score (adjusted formula)
    // Attendance: 20%, Internals: 30%, Externals: 30%, Subject Perf (Overall): 20%
    const weightedScore =
      normalizedData.attendance * 0.2 +
      normalizedData.internalMarks * 0.3 +
      normalizedData.externalMarks * 0.3 +
      normalizedData.subjectPerformance * 0.2;

    const finalScore = Math.round(weightedScore);
    const passProbability = Math.min(Math.round(finalScore * 1.1), 100);
    const riskLevel: "low" | "medium" | "high" =
      finalScore >= 70 ? "low" : finalScore >= 50 ? "medium" : "high";

    setPrediction({ finalScore, passProbability, riskLevel });
    setShowAiResults(true);

    // Call AI for detailed insights
    try {
      await getAIPrediction({
        attendance: normalizedData.attendance,
        internalMarks: normalizedData.internalMarks,
        externalMarks: normalizedData.externalMarks,
        subjectPerformance: normalizedData.subjectPerformance,
        studyHours: normalizedData.studyHours,
      });
    } catch (error) {
      console.error("AI Prediction failed", error);
    }
  };

  const resetForm = () => {
    setFormData({
      attendance: "",
      attendanceMax: "100",
      internalMarks: "",
      internalMarksMax: "100",
      externalMarks: "",
      externalMarksMax: "100",
      subjectPerformance: "",
      subjectPerformanceMax: "100",
    });
    setPrediction(null);
    setErrors({});
    setShowAiResults(false);
  };

  // Type guard for AI data
  const aiInsights =
    aiData?.prediction && typeof aiData.prediction !== "string"
      ? aiData.prediction
      : null;

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
          fixed lg:static z-40
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
            variant="green"
            size="md"
            className="w-full text-center"
          >
            STUDENT
          </StickerBadge>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`
                flex items-center gap-3 p-3 rounded-xl font-comic font-bold transition-all
                border-4 border-transparent text-sidebar-foreground hover:bg-sidebar-accent
              `}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t-4 border-comic-black">
          <Link to="/">
            <ComicButton variant="outline" size="sm" className="w-full">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </ComicButton>
          </Link>
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
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <StickerText size="lg" color="white">
              Prediction & Analytics
            </StickerText>
            <p className="font-comic text-foreground/80 mt-1">
              Enter your scores and total marks to predict your performance! 🎯
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ComicCard variant="white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-secondary rounded-xl border-4 border-comic-black flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-comic-black" />
                  </div>
                  <h2 className="font-bangers text-2xl text-comic-black">
                    Enter Your Data
                  </h2>
                </div>

                <div className="space-y-4">
                  {/* Attendance Field */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <ComicInput
                        label="Attendance"
                        type="number"
                        placeholder="Attendance Score"
                        value={formData.attendance}
                        onChange={(e) =>
                          handleInputChange("attendance", e.target.value)
                        }
                        min="0"
                      />
                      {errors.attendance && (
                        <p className="text-destructive font-comic text-xs mt-1">
                          {errors.attendance}
                        </p>
                      )}
                    </div>
                    <div>
                      <ComicInput
                        label="Out of"
                        type="number"
                        placeholder="Attendance Max"
                        value={formData.attendanceMax}
                        onChange={(e) =>
                          handleInputChange("attendanceMax", e.target.value)
                        }
                        min="1"
                      />
                      {errors.attendanceMax && (
                        <p className="text-destructive font-comic text-xs mt-1">
                          {errors.attendanceMax}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Internals Field */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <ComicInput
                        label="Internals"
                        type="number"
                        placeholder="Internals Score"
                        value={formData.internalMarks}
                        onChange={(e) =>
                          handleInputChange("internalMarks", e.target.value)
                        }
                        min="0"
                      />
                      {errors.internalMarks && (
                        <p className="text-destructive font-comic text-xs mt-1">
                          {errors.internalMarks}
                        </p>
                      )}
                    </div>
                    <div>
                      <ComicInput
                        label="Out of"
                        type="number"
                        placeholder="Internals Max"
                        value={formData.internalMarksMax}
                        onChange={(e) =>
                          handleInputChange("internalMarksMax", e.target.value)
                        }
                        min="1"
                      />
                    </div>
                  </div>

                  {/* Externals Field */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <ComicInput
                        label="Externals"
                        type="number"
                        placeholder="Externals Score"
                        value={formData.externalMarks}
                        onChange={(e) =>
                          handleInputChange("externalMarks", e.target.value)
                        }
                        min="0"
                      />
                      {errors.externalMarks && (
                        <p className="text-destructive font-comic text-xs mt-1">
                          {errors.externalMarks}
                        </p>
                      )}
                    </div>
                    <div>
                      <ComicInput
                        label="Out of"
                        type="number"
                        placeholder="Externals Max"
                        value={formData.externalMarksMax}
                        onChange={(e) =>
                          handleInputChange("externalMarksMax", e.target.value)
                        }
                        min="1"
                      />
                    </div>
                  </div>

                  {/* Subject Performance Field */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <ComicInput
                        label="Subject Performance"
                        type="number"
                        placeholder="Subject Performance Score"
                        value={formData.subjectPerformance}
                        onChange={(e) =>
                          handleInputChange(
                            "subjectPerformance",
                            e.target.value,
                          )
                        }
                        min="0"
                      />
                      {errors.subjectPerformance && (
                        <p className="text-destructive font-comic text-xs mt-1">
                          {errors.subjectPerformance}
                        </p>
                      )}
                    </div>
                    <div>
                      <ComicInput
                        label="Out of"
                        type="number"
                        placeholder="Subject Performance Max"
                        value={formData.subjectPerformanceMax}
                        onChange={(e) =>
                          handleInputChange(
                            "subjectPerformanceMax",
                            e.target.value,
                          )
                        }
                        min="1"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <ComicButton
                      variant="primary"
                      size="lg"
                      className="flex-1"
                      onClick={handlePredict}
                      disabled={aiLoading}
                    >
                      {aiLoading ? (
                        <>
                          <Zap className="w-5 h-5 mr-2 animate-pulse" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5 mr-2" />
                          Predict Now!
                        </>
                      )}
                    </ComicButton>
                    <ComicButton
                      variant="outline"
                      size="lg"
                      onClick={resetForm}
                    >
                      Reset
                    </ComicButton>
                  </div>
                </div>
              </ComicCard>
            </motion.div>

            {/* Prediction Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {prediction ? (
                <>
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border-4 border-black mb-6">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="what-if"
                        checked={showWhatIf}
                        onCheckedChange={setShowWhatIf}
                      />
                      <Label
                        htmlFor="what-if"
                        className="font-bangers text-xl cursor-pointer select-none"
                      >
                        Activate "What If" Mode?
                      </Label>
                    </div>
                    <ComicButton
                      variant="outline"
                      size="sm"
                      onClick={() => window.print()}
                    >
                      <FileText className="w-4 h-4 mr-2" /> Export Report
                    </ComicButton>
                  </div>

                  {/* AI Insights Card (New) */}
                  {aiLoading ? (
                    <ComicCard variant="yellow">
                      <div className="flex justify-center items-center py-6">
                        <Zap className="h-8 w-8 animate-spin text-comic-black mr-3" />
                        <p className="font-bangers text-xl">
                          AI is analyzing your profile...
                        </p>
                      </div>
                    </ComicCard>
                  ) : (
                    aiInsights && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <ComicCard variant="yellow" className="mb-4">
                          <div className="flex items-center gap-2 mb-4">
                            <Brain className="w-6 h-6" />
                            <h3 className="font-bangers text-2xl">
                              AI Insights
                            </h3>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <p className="font-bold font-comic flex items-center gap-2 mb-2">
                                <ThumbsUp className="w-4 h-4 text-green-600" />{" "}
                                Strengths:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {aiInsights.strengths.map((str, i) => (
                                  <StickerBadge
                                    key={i}
                                    variant="green"
                                    size="sm"
                                    className="text-xs"
                                  >
                                    {str}
                                  </StickerBadge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <p className="font-bold font-comic flex items-center gap-2 mb-2">
                                <ArrowUpCircle className="w-4 h-4 text-orange-600" />{" "}
                                Areas to Improve:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {aiInsights.improvements.map((imp, i) => (
                                  <StickerBadge
                                    key={i}
                                    variant="red"
                                    size="sm"
                                    className="text-xs"
                                  >
                                    {imp}
                                  </StickerBadge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <p className="font-bold font-comic flex items-center gap-2 mb-2">
                                <Lightbulb className="w-4 h-4 text-yellow-600" />{" "}
                                Recommendation:
                              </p>
                              <ul className="list-disc pl-5 space-y-1">
                                {aiInsights.recommendations
                                  .slice(0, 3)
                                  .map((rec, i) => (
                                    <li key={i} className="text-sm font-comic">
                                      {rec}
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </ComicCard>
                      </motion.div>
                    )
                  )}

                  {/* Final Score Card */}
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <ComicCard variant="yellow" className="text-center py-8">
                      <Target className="w-16 h-16 mx-auto mb-4" />
                      <p className="font-comic text-lg mb-2">
                        Predicted Final Score
                      </p>
                      <div className="font-bangers text-7xl mb-2">
                        {showWhatIf
                          ? Math.min(prediction.finalScore + 10, 100)
                          : prediction.finalScore}
                        %
                      </div>
                      <StickerBadge variant="white" size="lg">
                        {(showWhatIf
                          ? prediction.finalScore + 10
                          : prediction.finalScore) >= 80
                          ? "EXCELLENT!"
                          : (showWhatIf
                                ? prediction.finalScore + 10
                                : prediction.finalScore) >= 60
                            ? "GOOD JOB!"
                            : "KEEP TRYING!"}
                      </StickerBadge>
                    </ComicCard>
                  </motion.div>

                  {/* Pass/Fail Probability */}
                  <motion.div
                    initial={{ scale: 0, rotate: 10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  >
                    <ComicCard
                      variant={
                        prediction.passProbability >= 50 ? "green" : "red"
                      }
                      className="text-center py-8"
                    >
                      {prediction.passProbability >= 50 ? (
                        <CheckCircle className="w-16 h-16 mx-auto mb-4" />
                      ) : (
                        <XCircle className="w-16 h-16 mx-auto mb-4" />
                      )}
                      <p className="font-comic text-lg mb-2">
                        Pass Probability
                      </p>
                      <div className="font-bangers text-7xl mb-2">
                        {prediction.passProbability}%
                      </div>
                      <StickerBadge variant="white" size="lg">
                        {prediction.passProbability >= 80
                          ? "LIKELY TO PASS!"
                          : prediction.passProbability >= 50
                            ? "BORDERLINE"
                            : "NEEDS WORK"}
                      </StickerBadge>
                    </ComicCard>
                  </motion.div>

                  {/* Risk Level */}
                  <motion.div
                    initial={{ scale: 0, rotate: -5 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  >
                    <ComicCard
                      variant={
                        prediction.riskLevel === "low"
                          ? "green"
                          : prediction.riskLevel === "medium"
                            ? "yellow"
                            : "red"
                      }
                      className="text-center py-8"
                    >
                      {prediction.riskLevel === "low" ? (
                        <TrendingUp className="w-16 h-16 mx-auto mb-4" />
                      ) : (
                        <AlertTriangle className="w-16 h-16 mx-auto mb-4" />
                      )}
                      <p className="font-comic text-lg mb-4">Risk Assessment</p>
                      <RiskBadge
                        level={prediction.riskLevel}
                        className="text-2xl px-6 py-3"
                      />
                      <p className="font-comic mt-4">
                        {prediction.riskLevel === "low" &&
                          "You're on the right track! 🌟"}
                        {prediction.riskLevel === "medium" &&
                          "Some improvement needed! 💪"}
                        {prediction.riskLevel === "high" &&
                          "Urgent attention required! 🚨"}
                      </p>
                    </ComicCard>
                  </motion.div>
                </>
              ) : (
                <ComicCard variant="default" className="text-center py-16">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Brain className="w-24 h-24 mx-auto mb-6 text-secondary" />
                  </motion.div>
                  <StickerText size="lg" color="yellow">
                    Enter Your Data
                  </StickerText>
                  <p className="font-comic text-foreground/80 mt-4">
                    Fill in the form and click "Predict Now!" to see your
                    results
                  </p>
                </ComicCard>
              )}
            </motion.div>
          </div>

          {/* Analytics Charts Section */}
          {prediction && (
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <ComicCard variant="white">
                <h3 className="font-bangers text-2xl text-comic-black mb-6">
                  📊 Performance Breakdown
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      label: "Attendance",
                      value: `${Math.round(normalize(formData.attendance, formData.attendanceMax))}%`,
                      color: "bg-accent",
                    },
                    {
                      label: "Internals",
                      value: `${Math.round(normalize(formData.internalMarks, formData.internalMarksMax))}%`,
                      color: "bg-secondary",
                    },
                    {
                      label: "Externals",
                      value: `${Math.round(normalize(formData.externalMarks, formData.externalMarksMax))}%`,
                      color: "bg-destructive",
                    },
                    {
                      label: "Subject Perf.",
                      value: `${Math.round(normalize(formData.subjectPerformance, formData.subjectPerformanceMax))}%`,
                      color: "bg-accent",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="text-center"
                    >
                      <div
                        className={`${item.color} w-20 h-20 mx-auto rounded-full border-4 border-comic-black flex items-center justify-center mb-2`}
                      >
                        <span className="font-bangers text-xl text-comic-white">
                          {item.value}
                        </span>
                      </div>
                      <p className="font-comic text-sm text-comic-black font-bold">
                        {item.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </ComicCard>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PredictionPage;
