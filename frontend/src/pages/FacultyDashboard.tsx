import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, BarChart3, Settings, BookOpen, TrendingUp, AlertTriangle } from "lucide-react";
import ComicButton from "@/components/ComicButton";
import ComicCard from "@/components/ComicCard";
import StickerBadge from "@/components/StickerBadge";
import StickerText from "@/components/StickerText";
import RiskBadge from "@/components/RiskBadge";
import ComicProgress from "@/components/ComicProgress";
import DashboardLayout from "@/components/DashboardLayout";

const FacultyDashboard = () => {
  const menuItems = [
    { icon: Home, label: "Overview", path: "/dashboard/faculty" },
    { icon: Users, label: "My Classes", path: "/dashboard/faculty/classes" },
    {
      icon: BookOpen,
      label: "Assignments",
      path: "/dashboard/faculty/assignments",
    },
    { icon: BarChart3, label: "Analytics", path: "/dashboard/faculty/analytics" },
    { icon: Settings, label: "Settings", path: "/dashboard/faculty/settings" },
  ];

  const myClasses = [
    { name: "Mathematics 101", students: 32, avgScore: 82, atRisk: 3 },
    { name: "Physics 101", students: 28, avgScore: 75, atRisk: 5 },
    { name: "Chemistry 101", students: 30, avgScore: 88, atRisk: 1 },
  ];

  const students = [
    {
      id: 1,
      name: "Alex Johnson",
      attendance: 92,
      internal: 85,
      predicted: 88,
      risk: "low" as const,
    },
    {
      id: 2,
      name: "Sarah Williams",
      attendance: 78,
      internal: 62,
      predicted: 65,
      risk: "medium" as const,
    },
    {
      id: 3,
      name: "Mike Chen",
      attendance: 55,
      internal: 48,
      predicted: 45,
      risk: "high" as const,
    },
    {
      id: 4,
      name: "Emma Davis",
      attendance: 95,
      internal: 92,
      predicted: 94,
      risk: "low" as const,
    },
    {
      id: 5,
      name: "James Wilson",
      attendance: 68,
      internal: 58,
      predicted: 55,
      risk: "high" as const,
    },
    {
      id: 6,
      name: "Lisa Brown",
      attendance: 88,
      internal: 79,
      predicted: 81,
      risk: "low" as const,
    },
  ];

  return (
    <DashboardLayout
      menuItems={menuItems}
      role="FACULTY"
      headerContent={
        <>
          <div>
            <StickerText size="lg" color="white">
              Faculty Dashboard
            </StickerText>
            <p className="font-comic text-foreground/80 mt-1">
              Hello, Professor Smith! 📚
            </p>
          </div>
        </>
      }
    >
          {/* Class Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {myClasses.map((cls, i) => (
              <motion.div
                key={cls.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <ComicCard variant="white">
                  <h3 className="font-bangers text-2xl text-comic-black mb-4">
                    {cls.name}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between font-comic">
                      <span className="text-comic-black/70">Students</span>
                      <span className="font-bold text-comic-black">
                        {cls.students}
                      </span>
                    </div>
                    <div className="flex justify-between font-comic">
                      <span className="text-comic-black/70">Avg Score</span>
                      <span className="font-bold text-comic-black">
                        {cls.avgScore}%
                      </span>
                    </div>
                    <div className="flex justify-between font-comic items-center">
                      <span className="text-comic-black/70">At Risk</span>
                      <span className="font-bangers text-xl text-destructive">
                        {cls.atRisk}
                      </span>
                    </div>
                    <ComicProgress
                      value={cls.avgScore}
                      variant={
                        cls.avgScore >= 80
                          ? "success"
                          : cls.avgScore >= 60
                            ? "warning"
                            : "danger"
                      }
                      showValue={false}
                    />
                  </div>
                </ComicCard>
              </motion.div>
            ))}
          </div>

          {/* Student List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ComicCard variant="white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bangers text-2xl text-comic-black">
                  Student Performance
                </h3>
                <div className="flex gap-2">
                  <StickerBadge variant="green" size="sm">
                    Class 10-A
                  </StickerBadge>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-4 border-comic-black">
                      <th className="text-left p-3 font-bangers text-comic-black">
                        Student
                      </th>
                      <th className="text-left p-3 font-bangers text-comic-black">
                        Attendance %
                      </th>
                      <th className="text-left p-3 font-bangers text-comic-black hidden md:table-cell">
                        Internal Marks
                      </th>
                      <th className="text-left p-3 font-bangers text-comic-black">
                        Predicted Score
                      </th>
                      <th className="text-left p-3 font-bangers text-comic-black">
                        Risk Level
                      </th>
                      <th className="text-left p-3 font-bangers text-comic-black">
                        Trend
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr
                        key={student.id}
                        className="border-b-2 border-muted hover:bg-muted/50"
                      >
                        <td className="p-3 font-comic font-bold text-comic-black">
                          {student.name}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16">
                              <ComicProgress
                                value={student.attendance}
                                showValue={false}
                                variant={
                                  student.attendance >= 80
                                    ? "success"
                                    : student.attendance >= 60
                                      ? "warning"
                                      : "danger"
                                }
                              />
                            </div>
                            <span className="font-comic text-comic-black">
                              {student.attendance}%
                            </span>
                          </div>
                        </td>
                        <td className="p-3 font-comic text-comic-black hidden md:table-cell">
                          {student.internal}
                        </td>
                        <td className="p-3 font-bangers text-xl text-comic-black">
                          {student.predicted}%
                        </td>
                        <td className="p-3">
                          <RiskBadge level={student.risk} />
                        </td>
                        <td className="p-3">
                          {student.risk === "low" ? (
                            <TrendingUp className="w-5 h-5 text-accent" />
                          ) : student.risk === "high" ? (
                            <AlertTriangle className="w-5 h-5 text-destructive" />
                          ) : (
                            <TrendingUp className="w-5 h-5 text-secondary rotate-90" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ComicCard>
          </motion.div>
    </DashboardLayout>
  );
};

export default FacultyDashboard;
