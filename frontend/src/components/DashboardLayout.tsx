import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, ChevronRight } from "lucide-react";
import Logo from "./Logo";
import StickerBadge from "./StickerBadge";
import ComicButton from "./ComicButton";

export interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  menuItems: MenuItem[];
  role: "ADMIN" | "STUDENT" | "FACULTY";
  headerContent?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  menuItems,
  role,
  headerContent,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen]);

  const badgeColor =
    role === "ADMIN" ? "red" : role === "FACULTY" ? "blue" : "green";

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Menu Button - Pro UI/UX */}
      <motion.button
        whileTap={{ scale: 0.9, rotate: -5 }}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-[75] w-12 h-12 bg-secondary rounded-xl border-[3px] border-comic-black shadow-[4px_4px_0px_black] flex items-center justify-center overflow-hidden"
        aria-label="Toggle menu"
      >
        <AnimatePresence mode="wait">
          {sidebarOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-comic-black" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-1 items-center justify-center"
            >
              <div className="w-5 h-1 bg-comic-black rounded-full" />
              <div className="w-5 h-1 bg-comic-black rounded-full" />
              <div className="w-5 h-1 bg-comic-black rounded-full" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Backdrop Blur */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-background/60 z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Premium Design */}
      <aside
        className={`
          fixed lg:sticky lg:top-0 z-[70]
          w-[85vw] sm:w-80 lg:w-72 h-[100dvh] bg-sidebar border-r-8 border-comic-black shadow-[20px_0px_50px_rgba(0,0,0,0.1)] lg:shadow-none
          flex flex-col transition-transform duration-500 ease-out
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Decorative Top Pattern */}
        <div className="h-4 w-full bg-secondary bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAiLz4KPGNpcmNsZSBjeD0iNCIgY3k9IjQiIHI9IjMiIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIi8+Cjwvc3ZnPg==')] border-b-4 border-comic-black" />

        <div className="flex-1 flex flex-col p-4 lg:p-6 overflow-y-auto">
          {/* Logo Section */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-orange-500 rounded-xl border-4 border-comic-black shadow-[4px_4px_0px_black] flex items-center justify-center shrink-0 rotate-[-5deg]">
              <Logo className="w-7 h-7 text-white" />
            </div>
            <div>
              <Link to="/">
                <span className="font-bangers text-3xl text-sidebar-foreground block hover:text-primary transition-colors">
                  EduPredict
                </span>
              </Link>
            </div>
          </div>

          {/* Role Badge */}
          <div className="mb-8 pl-1">
            <StickerBadge variant={badgeColor} size="md" className="w-full text-center">
              {role} DASHBOARD
            </StickerBadge>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-3">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.path}
                    className={`
                      group flex items-center justify-between p-4 rounded-xl font-comic font-bold text-lg transition-all border-4 relative overflow-hidden
                      ${
                        isActive
                          ? "bg-secondary text-comic-black border-comic-black shadow-[4px_4px_0px_black] translate-x-2"
                          : "bg-transparent text-sidebar-foreground border-transparent hover:border-comic-black/20 hover:bg-sidebar-accent"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3 relative z-10">
                      <item.icon
                        className={`w-5 h-5 ${
                          isActive
                            ? "text-comic-black"
                            : "text-sidebar-foreground/70 group-hover:text-sidebar-foreground"
                        }`}
                      />
                      {item.label}
                    </div>
                    {isActive && (
                      <ChevronRight className="w-6 h-6 text-comic-black relative z-10" />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="mt-8 pt-6 border-t-4 border-comic-black/10">
            <Link to="/">
              <ComicButton variant="danger" size="md" className="w-full py-4 text-lg">
                <LogOut className="w-5 h-5 mr-2" /> Logout
              </ComicButton>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAiLz4KPGNpcmNsZSBjeD0iNCIgY3k9IjQiIHI9IjMiIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNCIvPgo8L3N2Zz4=')]">
        <div className="px-4 pb-4 pt-24 lg:p-8 max-w-7xl mx-auto min-h-full">
          {/* Dashboard Header */}
          {headerContent && (
            <motion.div
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {headerContent}
            </motion.div>
          )}

          {/* Page Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
