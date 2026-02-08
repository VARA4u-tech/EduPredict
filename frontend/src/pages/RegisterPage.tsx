import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import ComicButton from "@/components/ComicButton";
import ComicCard from "@/components/ComicCard";
import ComicInput from "@/components/ComicInput";
import StickerBadge from "@/components/StickerBadge";
import StickerText from "@/components/StickerText";
import { Brain } from "lucide-react";
import { AuthService } from "@/services/auth.service";
import { useToast } from "@/components/ui/use-toast";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await AuthService.register({ name, email, password });
      toast({
        title: "Registration Successful! 🎉",
        description: "Welcome to EduPredict! Please login.",
      });
      navigate("/login");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error.message || "Something went wrong",
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
                Join the Fun!
              </StickerText>
              <StickerText size="lg" color="yellow" className="block">
                Start Your Journey!
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
            </div>
          </motion.div>

          {/* Right - Register Form */}
          <motion.div
            className="flex-1 w-full max-w-md"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ComicCard variant="white" className="p-6 md:p-8">
              <h2 className="font-bangers text-3xl text-comic-black text-center mb-6">
                Create Account
              </h2>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <label className="font-bangers text-lg text-comic-black">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-xl border-4 border-comic-black font-comic focus:outline-none focus:ring-4 focus:ring-primary/20"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

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

                <div className="space-y-2">
                  <label className="font-bangers text-lg text-comic-black">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full p-3 rounded-xl border-4 border-comic-black font-comic focus:outline-none focus:ring-4 focus:ring-primary/20"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <ComicButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "🚀 Sign Up"}
                </ComicButton>
              </form>

              <div className="mt-6 text-center">
                <p className="font-comic text-comic-black">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-destructive font-bold hover:underline"
                  >
                    Login here
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

export default RegisterPage;
