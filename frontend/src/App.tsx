import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MockDataProvider } from "./context/MockDataContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import StudentPerformance from "./pages/StudentPerformance";
import PredictionPage from "./pages/PredictionPage";
import ReportsPage from "./pages/ReportsPage";
import AboutPage from "./pages/AboutPage";
import HelpPage from "./pages/HelpPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import { AIChatWidget } from "./components/AIChatWidget";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MockDataProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Admin Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/admin/reports"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <ReportsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/admin/*"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Protected Faculty Routes */}
            <Route
              path="/dashboard/faculty"
              element={
                <ProtectedRoute allowedRoles={["faculty"]}>
                  <FacultyDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/faculty/*"
              element={
                <ProtectedRoute allowedRoles={["faculty"]}>
                  <FacultyDashboard />
                </ProtectedRoute>
              }
            />

            {/* Protected Student Routes */}
            <Route
              path="/dashboard/student"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/student/performance"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentPerformance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/student/predictions"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <PredictionPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/student/reports"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <ReportsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/student/*"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />

            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ScrollToTop />
          <AIChatWidget />
        </BrowserRouter>
      </TooltipProvider>
    </MockDataProvider>
  </QueryClientProvider>
);

export default App;
