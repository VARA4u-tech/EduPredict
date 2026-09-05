import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles, ChevronRight } from "lucide-react";
import Logo from "./Logo";
import ComicButton from "./ComicButton";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  variant?: "transparent" | "solid";
}

const Navbar = ({ variant = "transparent" }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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

  const dashboardPath = currentUser
    ? `/dashboard/${currentUser.role}`
    : "/login";

  // Handle scroll effect for floating navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Help", path: "/help" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Dynamic classes for the floating pill effect
  const navContainerClasses = 
    variant === "solid" || isScrolled
      ? "bg-background/95 backdrop-blur-xl border-4 border-comic-black shadow-[6px_6px_0px_black] md:shadow-[8px_8px_0px_black] rounded-2xl mx-2 md:mx-6 mt-4 py-2 px-4 md:px-6"
      : "bg-transparent py-4 px-4 md:px-8";

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
          className={`pointer-events-auto transition-all duration-500 ease-in-out ${navContainerClasses} max-w-7xl lg:mx-auto`}
        >
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="relative shrink-0"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-secondary via-secondary to-orange-400 rounded-xl border-4 border-comic-black shadow-[4px_4px_0px_black] flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:shadow-[6px_6px_0px_black]">
                  <Logo className="w-6 h-6 md:w-7 md:h-7 text-comic-black" />
                  <motion.div
                    className="absolute -top-1 -right-1"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-comic-white drop-shadow-lg" />
                  </motion.div>
                </div>
              </motion.div>
              <div className="hidden sm:block">
                <motion.span
                  className="font-bangers text-2xl md:text-3xl text-foreground block leading-none tracking-wide"
                  whileHover={{ scale: 1.05 }}
                >
                  EduPredict
                </motion.span>
                <span className="text-[9px] md:text-[10px] font-comic font-bold text-secondary tracking-widest uppercase block -mt-1">
                  AI-Powered Success
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-4 bg-muted/30 px-2 py-1.5 rounded-xl border-2 border-transparent hover:border-comic-black/10 transition-colors">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className="relative group">
                  <div
                    className={`
                      px-4 py-2 rounded-lg font-comic font-bold text-sm md:text-base transition-colors relative z-10
                      ${isActive(link.path) ? "text-comic-black" : "text-foreground group-hover:text-primary"}
                    `}
                  >
                    {link.name}
                  </div>
                  {/* Bouncy active indicator */}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-secondary border-2 border-comic-black rounded-lg shadow-[2px_2px_0px_black] z-0"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                  )}
                  {/* Hover indicator for inactive links */}
                  {!isActive(link.path) && (
                    <div className="absolute inset-x-2 -bottom-1 h-1 bg-primary rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Theme Toggle - Desktop */}
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>

              {/* CTA Buttons */}
              <div className="hidden md:flex items-center gap-3">
                {currentUser ? (
                  <Link to={dashboardPath}>
                    <ComicButton variant="primary" size="sm" className="px-6">
                      <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                      Dashboard
                    </ComicButton>
                  </Link>
                ) : (
                  <>
                    <Link to="/login" className="hidden lg:block">
                      <ComicButton variant="outline" size="sm" className="bg-white hover:bg-muted">
                        Login
                      </ComicButton>
                    </Link>
                    <Link to="/login">
                      <ComicButton variant="primary" size="sm" className="px-6 group">
                        <Sparkles className="w-4 h-4 mr-2 group-hover:animate-spin" />
                        Get Started
                      </ComicButton>
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <motion.button
                whileTap={{ scale: 0.9, rotate: -5 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden relative w-12 h-12 bg-secondary rounded-xl border-[3px] border-comic-black shadow-[4px_4px_0px_black] flex items-center justify-center overflow-hidden"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
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
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Premium Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-background/60 z-[60] lg:hidden"
            />

            {/* Slide-in Menu Panel */}
            <motion.div
              initial={{ x: "100%", skewX: -5 }}
              animate={{ x: 0, skewX: 0 }}
              exit={{ x: "100%", skewX: 5 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85vw] sm:w-[400px] bg-background border-l-8 border-comic-black shadow-[-20px_0px_50px_rgba(0,0,0,0.2)] z-[70] lg:hidden overflow-y-auto flex flex-col"
            >
              {/* Decorative top header pattern */}
              <div className="h-4 w-full bg-secondary bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAiLz4KPGNpcmNsZSBjeD0iNCIgY3k9IjQiIHI9IjMiIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIi8+Cjwvc3ZnPg==')] border-b-4 border-comic-black" />

              <div className="p-6 flex-1 flex flex-col">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-orange-500 rounded-xl border-4 border-comic-black shadow-[4px_4px_0px_black] flex items-center justify-center shrink-0 rotate-[-5deg]">
                      <Logo className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <span className="font-bangers text-3xl text-foreground leading-none block">
                        EduPredict
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-full bg-muted border-2 border-comic-black flex items-center justify-center hover:bg-red-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Nav Links */}
                <div className="space-y-3 flex-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        to={link.path}
                        className={`
                          group flex items-center justify-between px-5 py-4 rounded-xl font-comic font-bold text-xl transition-all border-4
                          ${
                            isActive(link.path)
                              ? "bg-secondary text-comic-black border-comic-black shadow-[4px_4px_0px_black] translate-x-1"
                              : "bg-card text-foreground border-transparent hover:border-comic-black/20 hover:bg-muted/50"
                          }
                        `}
                      >
                        {link.name}
                        {isActive(link.path) && (
                          <ChevronRight className="w-6 h-6 text-comic-black" />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Section */}
                <div className="mt-auto space-y-6 pt-8">
                  {/* Mobile Theme Toggle */}
                  <div className="p-5 bg-card rounded-2xl border-4 border-comic-black shadow-[4px_4px_0px_black] flex items-center justify-between">
                    <span className="font-comic font-bold text-lg">App Theme</span>
                    <ThemeToggle />
                  </div>

                  {/* Mobile CTA Buttons */}
                  <div className="space-y-3">
                    {currentUser ? (
                      <Link to={dashboardPath} className="block">
                        <ComicButton variant="primary" size="lg" className="w-full text-xl py-6">
                          <Sparkles className="w-6 h-6 mr-2" />
                          Dashboard
                        </ComicButton>
                      </Link>
                    ) : (
                      <>
                        <Link to="/login" className="block">
                          <ComicButton variant="outline" size="lg" className="w-full text-xl py-6 bg-white">
                            Login to Account
                          </ComicButton>
                        </Link>
                        <Link to="/login" className="block">
                          <ComicButton variant="primary" size="lg" className="w-full text-xl py-6">
                            <Sparkles className="w-6 h-6 mr-2 animate-bounce" />
                            Start for Free
                          </ComicButton>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
