import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import ComicButton from "@/components/ComicButton";
import ComicCard from "@/components/ComicCard";
import StickerBadge from "@/components/StickerBadge";
import StickerText from "@/components/StickerText";
import { Brain, GraduationCap, Users, User, Eye, EyeOff } from "lucide-react";
import { AuthService } from "@/services/auth.service";
import { useToast } from "@/components/ui/use-toast";

type Role = "admin" | "faculty" | "student";

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState<Role>("student");
  const [email, setEmail] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already logged in
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser && AuthService.isAuthenticated()) {
      const role = currentUser.role || "student";
      navigate(`/dashboard/${role}`, { replace: true });
    }
  }, [navigate]);

  const roles: {
    id: Role;
    label: string;
    icon: React.ElementType;
    color: string;
  }[] = [
    { id: "admin", label: "Admin", icon: Users, color: "bg-destructive" },
    {
      id: "faculty",
      label: "Faculty",
      icon: GraduationCap,
      color: "bg-secondary",
    },
    { id: "student", label: "Student", icon: User, color: "bg-accent" },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // For students, use roll number; for others, use email
      const loginData =
        selectedRole === "student"
          ? { rollNumber: rollNumber.toUpperCase(), password }
          : { email, password };

      const response = await AuthService.login(loginData);

      toast({
        title: "Login Successful! 🚀",
        description: `Welcome, ${response.name}!`,
      });

      // Navigate based on role
      const role = response.role || selectedRole;
      navigate(`/dashboard/${role}`);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "Invalid credentials",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background web-pattern flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Left - Illustration & Branding */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link to="/" className="inline-flex items-center gap-3 mb-8">
              <div className="w-16 h-16 bg-secondary rounded-2xl border-4 border-comic-black shadow-[4px_4px_0px_black] flex items-center justify-center">
                <Brain className="w-10 h-10 text-comic-black" />
              </div>
              <span className="font-bangers text-4xl text-foreground">
                EduPredict
              </span>
            </Link>

            <div className="space-y-4 mb-8">
              <StickerText size="xl" color="white" className="block">
                Welcome Back!
              </StickerText>
              <StickerText size="lg" color="yellow" className="block">
                Let's Predict Success!
              </StickerText>
            </div>

            <div className="hidden lg:flex flex-wrap gap-3">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <StickerBadge variant="red">AI POWERED</StickerBadge>
              </motion.div>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
              >
                <StickerBadge variant="green">SECURE</StickerBadge>
              </motion.div>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2.2 }}
              >
                <StickerBadge variant="yellow">SMART</StickerBadge>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Login Form */}
          <motion.div
            className="flex-1 w-full max-w-md"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ComicCard variant="white" className="p-6 md:p-8">
              <h2 className="font-bangers text-3xl text-comic-black text-center mb-6">
                Sign In
              </h2>

              {/* Role Selection */}
              <div className="mb-6">
                <label className="block font-bangers text-lg text-comic-black mb-3">
                  Select Your Role
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {roles.map((role) => (
                    <motion.button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`
                        p-3 rounded-xl border-4 border-comic-black text-center transition-all
                        ${
                          selectedRole === role.id
                            ? `${role.color} shadow-[4px_4px_0px_black] -translate-x-0.5 -translate-y-0.5`
                            : "bg-gray-100 hover:bg-gray-200"
                        }
                      `}
                      whileTap={{ scale: 0.95 }}
                    >
                      <role.icon
                        className={`w-6 h-6 mx-auto mb-1 ${
                          selectedRole === role.id
                            ? role.id === "faculty"
                              ? "text-comic-black"
                              : "text-comic-white"
                            : "text-comic-black"
                        }`}
                      />
                      <span
                        className={`font-bangers text-sm ${
                          selectedRole === role.id
                            ? role.id === "faculty"
                              ? "text-comic-black"
                              : "text-comic-white"
                            : "text-comic-black"
                        }`}
                      >
                        {role.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                {selectedRole === "student" ? (
                  /* Roll Number Input for Students */
                  <div className="space-y-2">
                    <label className="font-bangers text-lg text-comic-black">
                      Roll Number
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 rounded-xl border-4 border-comic-black font-comic focus:outline-none focus:ring-4 focus:ring-primary/20 uppercase"
                      placeholder="e.g., 24H71F0002"
                      value={rollNumber}
                      onChange={(e) =>
                        setRollNumber(e.target.value.toUpperCase())
                      }
                      required
                    />
                    <p className="text-xs text-gray-500 font-comic">
                      Password is same as Roll No. (UPPER CASE)
                    </p>
                  </div>
                ) : (
                  /* Email Input for Admin/Faculty */
                  <div className="space-y-2">
                    <label className="font-bangers text-lg text-comic-black">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full p-3 rounded-xl border-4 border-comic-black font-comic focus:outline-none focus:ring-4 focus:ring-primary/20"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="font-bangers text-lg text-comic-black">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full p-3 rounded-xl border-4 border-comic-black font-comic focus:outline-none focus:ring-4 focus:ring-primary/20 pr-10"
                      placeholder={
                        selectedRole === "student"
                          ? "Same as Roll No."
                          : "••••••••"
                      }
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-comic-black hover:text-primary transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm font-comic">
                  <label className="flex items-center gap-2 text-comic-black">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-2 border-comic-black"
                    />
                    Remember me
                  </label>
                  <a
                    href="#"
                    className="text-destructive font-bold hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>

                <ComicButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  {loading
                    ? "Logging in..."
                    : `🚀 Login as ${roles.find((r) => r.id === selectedRole)?.label}`}
                </ComicButton>
              </form>

              <div className="mt-6 text-center">
                <p className="font-comic text-comic-black">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-destructive font-bold hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </ComicCard>

            <motion.div
              className="text-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                to="/"
                className="font-comic text-foreground/80 hover:text-foreground"
              >
                ← Back to Home
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
