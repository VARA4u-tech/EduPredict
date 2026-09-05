import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, BarChart3, AlertTriangle, FileText, Settings, LogOut, Menu, X, Upload, TrendingUp, GraduationCap, Bell,  } from "lucide-react";
import ComicButton from "@/components/ComicButton";
import ComicCard from "@/components/ComicCard";
import StickerBadge from "@/components/StickerBadge";
import StickerText from "@/components/StickerText";
import RiskBadge from "@/components/RiskBadge";
import ComicProgress from "@/components/ComicProgress";
import Logo from "@/components/Logo";
import DashboardLayout from "@/components/DashboardLayout";

const AdminDashboard = () => {
  const menuItems = [
    { icon: Home, label: "Overview", path: "/dashboard/admin" },
    { icon: Users, label: "Students", path: "/dashboard/admin/students" },
    { icon: BarChart3, label: "Analytics", path: "/dashboard/admin/analytics" },
    {
      icon: AlertTriangle,
      label: "Early Warnings",
      path: "/dashboard/admin/warnings",
    },
    { icon: FileText, label: "Reports", path: "/dashboard/admin/reports" },
    { icon: Settings, label: "Settings", path: "/dashboard/admin/settings" },
  ];

  const stats = [
    {
      label: "Total Students",
      value: "2,547",
      icon: Users,
      color: "blue" as const,
    },
    {
      label: "At-Risk Students",
      value: "127",
      icon: AlertTriangle,
      color: "red" as const,
    },
    {
      label: "Avg Performance",
      value: "78%",
      icon: TrendingUp,
      color: "yellow" as const,
    },
    {
      label: "Predicted Pass Rate",
      value: "92%",
      icon: GraduationCap,
      color: "green" as const,
    },
  ];

  const recentAlerts = [
    {
      id: 1,
      student: "Sarah Jenkins",
      issue: "Missing 3 consecutive assignments",
      severity: "high",
    },
    {
      id: 2,
      student: "Marcus Ray",
      issue: "Math score dropped by 15%",
      severity: "medium",
    },
    {
      id: 3,
      student: "Emma Thompson",
      issue: "Attendance below 80%",
      severity: "medium",
    },
  ];

  const recentStudents = [
    {
      id: 1,
      name: "Alex Johnson",
      class: "10-A",
      attendance: 92,
      marks: 85,
      predicted: 88,
      risk: "low" as const,
    },
    {
      id: 2,
      name: "Sarah Williams",
      class: "10-B",
      attendance: 78,
      marks: 62,
      predicted: 65,
      risk: "medium" as const,
    },
    {
      id: 3,
      name: "Mike Chen",
      class: "10-A",
      attendance: 55,
      marks: 48,
      predicted: 45,
      risk: "high" as const,
    },
    {
      id: 4,
      name: "Emma Davis",
      class: "10-C",
      attendance: 95,
      marks: 92,
      predicted: 94,
      risk: "low" as const,
    },
    {
      id: 5,
      name: "James Wilson",
      class: "10-B",
      attendance: 68,
      marks: 58,
      predicted: 55,
      risk: "high" as const,
    },
  ];

  return (
    <DashboardLayout
      menuItems={menuItems}
      role="ADMIN"
      headerContent={
        <>
          <div>
            <StickerText size="lg" color="white">
              Admin Dashboard
            </StickerText>
            <p className="font-comic text-foreground/80 mt-1">
              Welcome back, Super Admin! 👋
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <ComicButton variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" /> Alerts
            </ComicButton>
            <ComicButton variant="primary" size="sm">
              <Upload className="w-4 h-4 mr-2" /> Upload Data
            </ComicButton>
          </div>
        </>
      }
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <ComicCard
              variant={stat.color}
              className="flex items-center gap-4"
            >
              <div className="w-14 h-14 bg-comic-white/20 rounded-xl border-4 border-comic-black flex items-center justify-center">
                <stat.icon className="w-7 h-7" />
              </div>
              <div>
                <p className="font-comic text-sm opacity-90">
                  {stat.label}
                </p>
                <p className="font-bangers text-3xl">{stat.value}</p>
              </div>
            </ComicCard>
          </motion.div>

            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Students Table */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <ComicCard variant="white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bangers text-2xl text-comic-black">
                    Recent Students
                  </h3>
                  <ComicButton variant="secondary" size="sm">
                    View All
                  </ComicButton>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-4 border-comic-black">
                        <th className="text-left p-3 font-bangers text-comic-black">
                          Name
                        </th>
                        <th className="text-left p-3 font-bangers text-comic-black hidden sm:table-cell">
                          Class
                        </th>
                        <th className="text-left p-3 font-bangers text-comic-black hidden md:table-cell">
                          Attendance
                        </th>
                        <th className="text-left p-3 font-bangers text-comic-black">
                          Predicted
                        </th>
                        <th className="text-left p-3 font-bangers text-comic-black">
                          Risk
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentStudents.map((student) => (
                        <tr
                          key={student.id}
                          className="border-b-2 border-muted hover:bg-muted/50"
                        >
                          <td className="p-3 font-comic font-bold text-comic-black">
                            {student.name}
                          </td>
                          <td className="p-3 font-comic text-comic-black hidden sm:table-cell">
                            {student.class}
                          </td>
                          <td className="p-3 font-comic text-comic-black hidden md:table-cell">
                            {student.attendance}%
                          </td>
                          <td className="p-3 font-bangers text-xl text-comic-black">
                            {student.predicted}%
                          </td>
                          <td className="p-3">
                            <RiskBadge level={student.risk} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </ComicCard>
            </motion.div>

            {/* Right Column */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              {/* Model Accuracy */}
              <ComicCard variant="white">
                <h3 className="font-bangers text-2xl text-comic-black mb-4">
                  Model Accuracy
                </h3>
                <ComicProgress
                  value={94}
                  variant="success"
                  label="Prediction Model"
                />
                <div className="mt-4">
                  <ComicProgress
                    value={87}
                    variant="warning"
                    label="Risk Detection"
                  />
                </div>
              </ComicCard>

              {/* Quick Upload */}
              <ComicCard variant="yellow">
                <h3 className="font-bangers text-2xl text-comic-black mb-4">
                  Quick Upload
                </h3>
                <div className="border-4 border-dashed border-comic-black rounded-xl p-8 text-center bg-comic-white/50">
                  <Upload className="w-12 h-12 mx-auto mb-2 text-comic-black" />
                  <p className="font-comic font-bold text-comic-black">
                    Drop CSV file here
                  </p>
                  <p className="font-comic text-sm text-comic-black/70">
                    or click to browse
                  </p>
                </div>
              </ComicCard>

              {/* Alerts */}
              <ComicCard variant="red">
                <h3 className="font-bangers text-2xl text-comic-white mb-4">
                  🚨 Active Alerts
                </h3>
                <div className="space-y-3">
                  <div className="bg-comic-white/20 rounded-lg p-3">
                    <p className="font-comic font-bold text-comic-white">
                      5 students need attention
                    </p>
                    <p className="font-comic text-sm text-comic-white/80">
                      High risk detected
                    </p>
                  </div>
                  <div className="bg-comic-white/20 rounded-lg p-3">
                    <p className="font-comic font-bold text-comic-white">
                      Class 10-B below average
                    </p>
                    <p className="font-comic text-sm text-comic-white/80">
                      Attendance dropped 15%
                    </p>
                  </div>
                </div>
              </ComicCard>
            </motion.div>
          </div>
        {/* Removing unnecessary wrappers handled by DashboardLayout */}
    </DashboardLayout>
  );
};

export default AdminDashboard;
