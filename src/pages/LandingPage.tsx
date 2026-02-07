import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-illustration.png';
import ComicButton from '@/components/ComicButton';
import StickerBadge from '@/components/StickerBadge';
import StickerText from '@/components/StickerText';
import ComicCard from '@/components/ComicCard';
import { Brain, TrendingUp, Users, Shield, BarChart3, Zap } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background web-pattern overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="w-12 h-12 bg-secondary rounded-xl border-4 border-comic-black shadow-[4px_4px_0px_black] flex items-center justify-center">
              <Brain className="w-7 h-7 text-comic-black" />
            </div>
            <span className="font-bangers text-2xl text-foreground hidden sm:block">EduPredict</span>
          </motion.div>
          
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex gap-3"
          >
            <Link to="/login">
              <ComicButton variant="outline" size="sm">Login</ComicButton>
            </Link>
            <Link to="/login" className="hidden sm:block">
              <ComicButton variant="primary" size="sm">Get Started</ComicButton>
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left Content */}
            <motion.div 
              className="flex-1 text-center lg:text-left space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Sticker Badges */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: -3 }}
                  transition={{ delay: 0.4, type: "spring" }}
                >
                  <StickerBadge variant="yellow" size="lg">WHAT'S UP!</StickerBadge>
                </motion.div>
                <motion.div
                  initial={{ scale: 0, rotate: 20 }}
                  animate={{ scale: 1, rotate: 5 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  <StickerBadge variant="red" size="lg">AI POWERED</StickerBadge>
                </motion.div>
                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: -2 }}
                  transition={{ delay: 0.6, type: "spring" }}
                >
                  <StickerBadge variant="green" size="lg">SMART PREDICTIONS</StickerBadge>
                </motion.div>
              </div>

              {/* Main Title */}
              <div className="space-y-2">
                <StickerText size="xl" color="white" className="block">
                  Predictive Analytics
                </StickerText>
                <StickerText size="lg" color="yellow" className="block">
                  Student Performance Forecasting
                </StickerText>
              </div>

              {/* Description */}
              <p className="text-xl md:text-2xl font-comic text-foreground/90 max-w-xl mx-auto lg:mx-0">
                Unlock the power of AI to predict student success, identify at-risk learners, and boost academic outcomes! 🚀
              </p>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Link to="/login">
                  <ComicButton variant="primary" size="lg">
                    🎯 Get Started
                  </ComicButton>
                </Link>
                <Link to="/dashboard">
                  <ComicButton variant="secondary" size="lg">
                    📊 View Dashboard
                  </ComicButton>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right - Hero Image */}
            <motion.div 
              className="flex-1 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="AI Education Hero" 
                  className="w-full max-w-lg mx-auto drop-shadow-2xl"
                />
                {/* Floating stickers around image */}
                <motion.div 
                  className="absolute -top-4 -right-4 md:top-0 md:right-0"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <StickerBadge variant="blue" size="md" rotate>TOO COOL!</StickerBadge>
                </motion.div>
                <motion.div 
                  className="absolute -bottom-4 -left-4 md:bottom-10 md:-left-10"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                >
                  <StickerBadge variant="green" size="md" rotate>100% ACCURATE</StickerBadge>
                </motion.div>
              </div>
            </motion.div>
          </div>
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
            <StickerText size="xl" color="yellow">Super Powers!</StickerText>
            <p className="text-xl font-comic text-foreground/80 mt-4">Check out what our system can do</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Brain, title: "AI Predictions", desc: "Machine learning models predict student performance with high accuracy!", color: "red" as const },
              { icon: TrendingUp, title: "Early Warnings", desc: "Identify at-risk students before it's too late to help!", color: "yellow" as const },
              { icon: Users, title: "Role-Based Access", desc: "Admin, Faculty & Student dashboards - everyone gets their view!", color: "green" as const },
              { icon: Shield, title: "Risk Assessment", desc: "LOW, MEDIUM, HIGH risk badges for quick understanding!", color: "red" as const },
              { icon: BarChart3, title: "Visual Analytics", desc: "Beautiful charts and graphs that make data fun!", color: "yellow" as const },
              { icon: Zap, title: "Real-Time Updates", desc: "Instant predictions as new data comes in!", color: "green" as const },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ComicCard variant="white" className="h-full">
                  <div className={`w-16 h-16 rounded-xl border-4 border-comic-black mb-4 flex items-center justify-center ${
                    feature.color === 'red' ? 'bg-destructive' : 
                    feature.color === 'yellow' ? 'bg-secondary' : 'bg-accent'
                  }`}>
                    <feature.icon className={`w-8 h-8 ${feature.color === 'yellow' ? 'text-comic-black' : 'text-comic-white'}`} />
                  </div>
                  <h3 className="font-bangers text-2xl text-comic-black mb-2">{feature.title}</h3>
                  <p className="font-comic text-comic-black/80">{feature.desc}</p>
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
              { value: "95%", label: "Prediction Accuracy", color: "green" as const },
              { value: "10K+", label: "Students Helped", color: "yellow" as const },
              { value: "500+", label: "Schools Using", color: "red" as const },
              { value: "24/7", label: "Real-Time Analysis", color: "green" as const },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
              >
                <ComicCard variant={stat.color} className="text-center py-8">
                  <div className="font-bangers text-4xl md:text-5xl mb-2">{stat.value}</div>
                  <div className="font-comic font-bold text-sm md:text-base">{stat.label}</div>
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
                Join thousands of educators using AI to help students achieve their full potential!
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/login">
                  <ComicButton variant="primary" size="lg">🚀 Start Now - It's Free!</ComicButton>
                </Link>
                <Link to="/login">
                  <ComicButton variant="outline" size="lg">📞 Contact Us</ComicButton>
                </Link>
              </div>
            </motion.div>
          </ComicCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t-4 border-comic-black bg-muted">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-secondary rounded-xl border-4 border-comic-black flex items-center justify-center">
              <Brain className="w-6 h-6 text-comic-black" />
            </div>
            <span className="font-bangers text-xl text-foreground">EduPredict</span>
          </div>
          <p className="font-comic text-muted-foreground">
            © 2025 EduPredict. Made with ❤️ for Education.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
