import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Brain, Menu, X, Sparkles } from "lucide-react";
import ComicButton from "./ComicButton";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  variant?: "transparent" | "solid";
}

const Navbar = ({ variant = "transparent" }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
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

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Help", path: "/help" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const navBackground =
    variant === "solid" || isScrolled
      ? "bg-background/95 backdrop-blur-md border-b-4 border-comic-black shadow-[0_4px_0px_hsl(var(--comic-black))]"
      : "bg-transparent";

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBackground}`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-secondary via-secondary to-orange-400 rounded-xl border-4 border-comic-black shadow-[4px_4px_0px_black] flex items-center justify-center overflow-hidden">
                  <Brain className="w-7 h-7 text-comic-black" />
                  {/* Sparkle effect */}
                  <motion.div
                    className="absolute -top-1 -right-1"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Sparkles className="w-4 h-4 text-comic-white drop-shadow-lg" />
                  </motion.div>
                </div>
              </motion.div>
              <div className="hidden sm:block">
                <motion.span
                  className="font-bangers text-2xl text-foreground block leading-tight"
                  whileHover={{ scale: 1.05 }}
                >
                  EduPredict
                </motion.span>
                <span className="text-[10px] font-comic font-bold text-secondary tracking-wider uppercase">
                  AI-Powered Success
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      px-4 py-2 rounded-xl font-comic font-bold text-sm transition-all
                      ${
                        isActive(link.path)
                          ? "bg-secondary text-comic-black border-2 border-comic-black shadow-[2px_2px_0px_black]"
                          : "text-foreground hover:bg-muted/20"
                      }
                    `}
                  >
                    {link.name}
                    {isActive(link.path) && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 -z-10"
                      />
                    )}
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>

              {/* CTA Buttons */}
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login">
                  <ComicButton variant="outline" size="sm">
                    Login
                  </ComicButton>
                </Link>
                <Link to="/login">
                  <ComicButton variant="primary" size="sm">
                    <Sparkles className="w-4 h-4 mr-1" />
                    Get Started
                  </ComicButton>
                </Link>
              </div>

              {/* Mobile Menu Toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-10 h-10 bg-secondary rounded-xl border-3 border-comic-black shadow-[3px_3px_0px_black] flex items-center justify-center"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <X className="w-5 h-5 text-comic-black" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <Menu className="w-5 h-5 text-comic-black" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-background border-l-4 border-comic-black z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-secondary rounded-xl border-3 border-comic-black flex items-center justify-center">
                      <Brain className="w-6 h-6 text-comic-black" />
                    </div>
                    <span className="font-bangers text-xl text-foreground">
                      EduPredict
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Mobile Nav Links */}
                <div className="space-y-2 mb-8">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={link.path}
                        className={`
                          block px-4 py-3 rounded-xl font-comic font-bold text-lg transition-all
                          ${
                            isActive(link.path)
                              ? "bg-secondary text-comic-black border-3 border-comic-black shadow-[3px_3px_0px_black]"
                              : "text-foreground hover:bg-muted/20"
                          }
                        `}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Theme Toggle */}
                <div className="mb-6 p-4 bg-muted/20 rounded-xl border-2 border-dashed border-muted-foreground/30">
                  <p className="font-comic font-bold text-sm mb-3 text-muted-foreground">
                    Theme Settings
                  </p>
                  <ThemeToggle />
                </div>

                {/* Mobile CTA Buttons */}
                <div className="space-y-3">
                  <Link to="/login" className="block">
                    <ComicButton variant="outline" size="md" className="w-full">
                      Login
                    </ComicButton>
                  </Link>
                  <Link to="/login" className="block">
                    <ComicButton variant="primary" size="md" className="w-full">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Get Started Free!
                    </ComicButton>
                  </Link>
                </div>

                {/* Fun Footer */}
                <div className="mt-8 pt-6 border-t-2 border-dashed border-muted-foreground/30 text-center">
                  <p className="font-comic text-sm text-muted-foreground">
                    🚀 Predict student success with AI!
                  </p>
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
