import { motion } from "framer-motion";
import { BookOpen, Brain, TrendingUp, Award, ArrowRight } from "lucide-react";

const ComicStrip = () => {
  const journeySteps = [
    {
      id: 1,
      step: "01",
      title: "Data Collection",
      subtitle: "Gather Insights",
      description:
        "Track attendance, assignments, internal marks, and study patterns to build a complete picture.",
      icon: BookOpen,
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50 dark:bg-red-950/30",
      borderColor: "border-red-400",
      iconBg: "bg-red-500",
    },
    {
      id: 2,
      step: "02",
      title: "AI Analysis",
      subtitle: "Predict Performance",
      description:
        "Our machine learning models analyze patterns and predict future academic outcomes with high accuracy.",
      icon: Brain,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      borderColor: "border-blue-400",
      iconBg: "bg-blue-500",
    },
    {
      id: 3,
      step: "03",
      title: "Early Intervention",
      subtitle: "Identify Risks",
      description:
        "Get real-time alerts for at-risk students so educators can provide timely support and guidance.",
      icon: TrendingUp,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
      borderColor: "border-yellow-400",
      iconBg: "bg-yellow-500",
    },
    {
      id: 4,
      step: "04",
      title: "Success Achieved",
      subtitle: "Celebrate Wins",
      description:
        "Watch students improve their performance and achieve their academic goals with data-driven insights.",
      icon: Award,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-950/30",
      borderColor: "border-green-400",
      iconBg: "bg-green-500",
    },
  ];

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {journeySteps.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="group"
          >
            <div
              className={`relative h-full ${item.bgColor} rounded-2xl border-4 border-comic-black shadow-[6px_6px_0px_black] p-6 transition-all duration-300 hover:shadow-[8px_8px_0px_black] hover:-translate-y-1`}
            >
              {/* Step Number Badge */}
              <div className="absolute -top-4 -left-2">
                <div
                  className={`w-12 h-12 ${item.iconBg} rounded-xl border-4 border-comic-black shadow-[3px_3px_0px_black] flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform`}
                >
                  <span className="font-bangers text-xl text-white">
                    {item.step}
                  </span>
                </div>
              </div>

              {/* Icon */}
              <div className="flex justify-center mb-4 pt-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl border-4 border-comic-black shadow-[4px_4px_0px_black] flex items-center justify-center`}
                >
                  <item.icon className="w-8 h-8 text-white" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="text-center space-y-2">
                <p className="font-comic text-sm font-bold text-muted-foreground uppercase tracking-wider">
                  {item.subtitle}
                </p>
                <h3 className="font-bangers text-2xl text-foreground">
                  {item.title}
                </h3>
                <p className="font-comic text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Arrow for desktop (shows between cards) */}
              {index < journeySteps.length - 1 && (
                <div className="hidden lg:flex absolute -right-5 top-1/2 transform -translate-y-1/2 z-20">
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-8 h-8 bg-white rounded-full border-3 border-comic-black shadow-[2px_2px_0px_black] flex items-center justify-center"
                  >
                    <ArrowRight className="w-4 h-4 text-comic-black" />
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-12 bg-gradient-to-r from-secondary/20 via-background to-accent/20 rounded-2xl border-4 border-comic-black shadow-[6px_6px_0px_black] p-6"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "94%", label: "Prediction Accuracy" },
            { value: "2.5K+", label: "Supporting Student Success" },
            { value: "45%", label: "Risk Reduction" },
            { value: "89%", label: "Pass Rate Improvement" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 + i * 0.1, type: "spring" }}
            >
              <p className="font-bangers text-3xl md:text-4xl text-foreground">
                {stat.value}
              </p>
              <p className="font-comic text-sm text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ComicStrip;
