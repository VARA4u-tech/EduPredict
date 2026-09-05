import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-illustration.png";
import ComicButton from "@/components/ComicButton";
import StickerBadge from "@/components/StickerBadge";
import StickerText from "@/components/StickerText";
import ComicCard from "@/components/ComicCard";
import ComicStrip from "@/components/ComicStrip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TrendingUp, Users, Shield, BarChart3, Zap } from "lucide-react";
import Logo from "@/components/Logo";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background web-pattern overflow-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center pt-24 pb-16 md:pt-32 md:pb-24 lg:py-32 px-4 overflow-hidden border-b-[6px] md:border-b-8 border-comic-black">
        {/* Comic Sunburst Background — seamless, no gap version */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
          <div
            className="rounded-full"
            style={{
              width: '200vw',
              height: '200vw',
              flexShrink: 0,
              background: 'repeating-conic-gradient(rgba(255,200,50,0.08) 0deg 10deg, rgba(255,200,50,0.02) 10deg 20deg)',
              animation: 'spin 120s linear infinite',
            }}
          />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16">
            {/* Left Content */}
            <motion.div
              className="flex-1 text-center lg:text-left space-y-6 md:space-y-8 relative w-full"
              initial={{ opacity: 0, x: -50, rotate: -5 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120, damping: 12 }}
            >
              {/* Comic Action Star - Hidden on very small screens, visible on md+ */}
              <motion.div 
                className="hidden md:flex absolute -top-16 -left-10 w-28 h-28 bg-yellow-400 items-center justify-center border-4 border-comic-black shadow-[4px_4px_0px_black] z-20"
                style={{ clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" }}
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="font-bangers text-2xl text-comic-black -rotate-12 mt-2">POW!</span>
              </motion.div>

              {/* Sticker Badges - Better mobile wrapping & scaling */}
              <div className="flex flex-wrap gap-2 md:gap-3 justify-center lg:justify-start">
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: -6 }}
                  transition={{ delay: 0.4, type: "spring", bounce: 0.6 }}
                >
                  <StickerBadge variant="yellow" size="md" className="md:text-lg">
                    WHAT'S UP!
                  </StickerBadge>
                </motion.div>
                <motion.div
                  initial={{ scale: 0, rotate: 30 }}
                  animate={{ scale: 1, rotate: 6 }}
                  transition={{ delay: 0.5, type: "spring", bounce: 0.6 }}
                >
                  <StickerBadge variant="red" size="md" className="md:text-lg">
                    AI POWERED
                  </StickerBadge>
                </motion.div>
                <motion.div
                  initial={{ scale: 0, rotate: -15 }}
                  animate={{ scale: 1, rotate: -3 }}
                  transition={{ delay: 0.6, type: "spring", bounce: 0.6 }}
                >
                  <StickerBadge variant="green" size="md" className="md:text-lg">
                    SMART PREDICTIONS
                  </StickerBadge>
                </motion.div>
              </div>

              {/* Main Title - Responsive sizing */}
              <div className="space-y-2 md:space-y-4 relative">
                {/* Speech bubble pointer (desktop only) */}
                <div className="hidden lg:flex absolute -right-10 -top-10 w-24 h-24 bg-yellow-400 border-4 border-comic-black rounded-full rounded-bl-none shadow-[6px_6px_0px_black] z-10 items-center justify-center animate-bounce rotate-12">
                  <span className="font-bangers text-3xl text-comic-black mt-2 pr-1 tracking-wider">WOW!</span>
                </div>
                
                <StickerText size="xl" color="white" className="block text-4xl md:text-6xl lg:text-7xl leading-tight">
                  Predictive Analytics
                </StickerText>
                <StickerText size="lg" color="yellow" className="block text-2xl md:text-4xl lg:text-5xl leading-tight">
                  For Student Success
                </StickerText>
              </div>

              {/* Description - comic font, uses theme card color */}
              <div className="bg-card border-4 border-comic-black shadow-[4px_4px_0px_black] p-4 md:p-6 rounded-2xl mx-4 lg:mx-0 inline-block relative">
                <p className="text-lg md:text-2xl font-comic text-card-foreground max-w-xl text-left font-bold">
                  Unlock the power of AI to predict student outcomes, identify
                  at-risk learners, and boost academic performance! 🚀
                </p>
                {/* Comic corner fold effect */}
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-muted border-l-4 border-t-4 border-comic-black rounded-tl-lg" style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }} />
              </div>

              {/* CTA Buttons - Mobile optimized */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4 px-4 lg:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Link to="/login" className="w-full sm:w-auto">
                  <ComicButton variant="primary" size="lg" className="w-full sm:w-auto text-xl py-4 md:py-3">
                    🎯 Get Started Now
                  </ComicButton>
                </Link>
                <Link to="/dashboard" className="w-full sm:w-auto">
                  <ComicButton variant="secondary" size="lg" className="w-full sm:w-auto text-xl py-4 md:py-3">
                    📊 View Demo Dashboard
                  </ComicButton>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right - Hero Image Container */}
            <motion.div
              className="flex-1 relative w-full mt-8 lg:mt-0"
              initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
            >
              {/* Comic panel frame for the image */}
              <div className="relative mx-auto max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg bg-white border-8 border-comic-black p-2 md:p-4 shadow-[8px_8px_0px_black] md:shadow-[16px_16px_0px_black] rotate-2 hover:rotate-0 transition-transform duration-300">
                
                {/* "NEW!" Badge */}
                <div className="absolute -top-6 -left-6 md:-top-8 md:-left-8 bg-red-500 text-white font-bangers text-xl md:text-3xl px-4 py-2 border-4 border-comic-black shadow-[4px_4px_0px_black] -rotate-12 z-30">
                  NEW!
                </div>

                <div className="bg-secondary/10 overflow-hidden border-4 border-comic-black relative">
                  {/* Dynamic background behind image */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle,white_2px,transparent_2px)] bg-[length:12px_12px] opacity-30" />
                  <img
                    src={heroImage}
                    alt="AI Education Hero"
                    className="w-full h-auto object-cover relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Floating stickers around image - Adjusted for mobile */}
                <motion.div
                  className="absolute -right-6 md:-right-10 top-1/4 z-20"
                  animate={{ y: [-5, 10, -5], rotate: [10, 15, 10] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                  <StickerBadge variant="blue" size="md" className="shadow-[4px_4px_0px_black]">
                    TOO COOL!
                  </StickerBadge>
                </motion.div>
                
                <motion.div
                  className="absolute -left-4 md:-left-12 bottom-1/4 z-20"
                  animate={{ y: [5, -10, 5], rotate: [-10, -15, -10] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                >
                  <StickerBadge variant="green" size="md" className="shadow-[4px_4px_0px_black]">
                    100% ACCURATE
                  </StickerBadge>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Student Journey Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-secondary/5 via-background to-background border-y-4 border-comic-black relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-secondary rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-secondary/20 rounded-full px-4 py-2 mb-4 border-2 border-secondary/30">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span className="font-comic font-bold text-sm text-secondary uppercase tracking-wider">
                How It Works
              </span>
            </div>
            <StickerText size="xl" color="white" className="block mb-4">
              The Student Success Journey
            </StickerText>
            <p className="text-lg md:text-xl font-comic text-muted-foreground max-w-2xl mx-auto">
              From data collection to academic success — see how EduPredict
              transforms the educational experience
            </p>
          </motion.div>

          {/* Journey Component */}
          <ComicStrip />
        </div>
      </section>

      {/* Features Section - Comic Panels */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <StickerText size="xl" color="yellow">
              Super Powers!
            </StickerText>
            <p className="text-xl font-comic text-muted-foreground mt-4">
              Check out what our system can do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Logo,
                title: "AI Predictions",
                desc: "Machine learning models predict student performance with high accuracy!",
                color: "red" as const,
              },
              {
                icon: TrendingUp,
                title: "Early Warnings",
                desc: "Identify at-risk students before it's too late to help!",
                color: "yellow" as const,
              },
              {
                icon: Users,
                title: "Role-Based Access",
                desc: "Admin, Faculty & Student dashboards - everyone gets their view!",
                color: "green" as const,
              },
              {
                icon: Shield,
                title: "Risk Assessment",
                desc: "LOW, MEDIUM, HIGH risk badges for quick understanding!",
                color: "red" as const,
              },
              {
                icon: BarChart3,
                title: "Visual Analytics",
                desc: "Beautiful charts and graphs that make data fun!",
                color: "yellow" as const,
              },
              {
                icon: Zap,
                title: "Real-Time Updates",
                desc: "Instant predictions as new data comes in!",
                color: "green" as const,
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ComicCard variant="white" className="h-full">
                  <div
                    className={`w-16 h-16 rounded-xl border-4 border-comic-black mb-4 flex items-center justify-center ${
                      feature.color === "red"
                        ? "bg-destructive"
                        : feature.color === "yellow"
                          ? "bg-secondary"
                          : "bg-accent"
                    }`}
                  >
                    <feature.icon
                      className={`w-8 h-8 ${feature.color === "yellow" ? "text-comic-black" : "text-comic-white"}`}
                    />
                  </div>
                  <h3 className="font-bangers text-2xl text-comic-black mb-2">
                    {feature.title}
                  </h3>
                  <p className="font-comic text-comic-black/80">
                    {feature.desc}
                  </p>
                </ComicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              {
                value: "95%",
                label: "Prediction Accuracy",
                color: "green" as const,
              },
              {
                value: "10K+",
                label: "We Can Analyze 10K+ Data Points",
                color: "yellow" as const,
              },
              {
                value: "0.8",
                label: "Avg Response Time",
                color: "red" as const,
              },
              {
                value: "98%",
                label: "Model Confidence",
                color: "green" as const,
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
              >
                <ComicCard variant={stat.color} className="text-center py-8">
                  <div className="font-bangers text-4xl md:text-5xl mb-2">
                    {stat.value}
                  </div>
                  <div className="font-comic font-bold text-sm md:text-base">
                    {stat.label}
                  </div>
                </ComicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <ComicCard variant="yellow" className="text-center py-12 px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <StickerText size="xl" color="red" className="block mb-4">
                Ready to Predict Success?
              </StickerText>
              <p className="text-xl font-comic text-comic-black mb-8 max-w-2xl mx-auto">
                Join thousands of educators using AI to help students achieve
                their full potential!
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/login">
                  <ComicButton variant="primary" size="lg">
                    🚀 Start Now - It's Free!
                  </ComicButton>
                </Link>
                <Link to="/login">
                  <ComicButton variant="outline" size="lg">
                    📞 Contact Us
                  </ComicButton>
                </Link>
              </div>
            </motion.div>
          </ComicCard>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
