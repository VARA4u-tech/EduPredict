import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Send,
  Mail,
  MapPin,
  Phone,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Info,
  Github,
} from "lucide-react";
import ComicButton from "@/components/ComicButton";
import ComicCard from "@/components/ComicCard";
import StickerText from "@/components/StickerText";
import ComicInput from "@/components/ComicInput";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickerBadge from "@/components/StickerBadge";
import { toast } from "sonner";

/* ─────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────── */
interface FormData {
  name: string;
  email: string;
  message: string;
}

/* ─────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────── */
const SUBJECTS = [
  "General Enquiry",
  "Bug Report 🐛",
  "Feature Request ✨",
  "Academic Support 📚",
  "Partnership 🤝",
  "Other Mission",
];

const MAX_MSG = 500;

const PARTICLE_COLORS = ["#FFD700", "#FF4444", "#44BB66", "#4488FF", "#FF8844", "#AA44FF"];

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, type: "spring" as const, stiffness: 200 },
  }),
};

/* ─────────────────────────────────────────────────────
   MissionReportForm
───────────────────────────────────────────────────── */
interface MissionReportFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  isSubmitted: boolean;
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (e: React.FormEvent) => void;
}

function MissionReportForm({
  formData,
  setFormData,
  isSubmitted,
  setIsSubmitted,
  handleSubmit,
}: MissionReportFormProps) {
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [focused, setFocused] = useState<string | null>(null);

  const nameValid = formData.name.trim().length >= 2;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const msgLen = formData.message.length;
  const msgValid = msgLen >= 10;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="relative"
    >
      {/* Layered comic shadows */}
      <div className="absolute inset-0 bg-comic-black translate-x-5 translate-y-5 rounded-3xl" />
      <div className="absolute inset-0 bg-secondary/60 translate-x-2.5 translate-y-2.5 rounded-3xl" />

      {/* Floating decorative particles */}
      {PARTICLE_COLORS.map((color, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full border-2 border-comic-black pointer-events-none z-20"
          style={{
            backgroundColor: color,
            top: `${10 + i * 14}%`,
            right: i % 2 === 0 ? "-14px" : "auto",
            left: i % 2 !== 0 ? "-14px" : "auto",
          }}
          animate={{ y: [0, -12, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 2 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <ComicCard
        variant="white"
        className="p-8 md:p-10 relative z-10 bg-white overflow-hidden"
      >
        {/* Subtle halftone watermark */}
        <div className="absolute inset-0 halftone opacity-5 pointer-events-none" />

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <motion.div
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <Sparkles className="w-7 h-7 text-secondary" />
          </motion.div>
          <h2 className="font-bangers text-4xl md:text-5xl text-comic-black tracking-wide">
            MISSION REPORT
          </h2>
        </div>

        {/* HQ Status bar */}
        <motion.div
          className="mb-7 flex items-center gap-2 bg-accent/10 border-2 border-accent/40 rounded-xl px-4 py-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="w-2.5 h-2.5 rounded-full bg-accent"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <span className="font-bangers text-sm md:text-base text-accent tracking-widest">
            HQ COMMS ONLINE — READY TO RECEIVE TRANSMISSION
          </span>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="contact-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Row 1: Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Superhero Name */}
                <motion.div
                  className="space-y-2"
                  custom={0}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label className="font-bangers text-xl text-comic-black flex items-center gap-2">
                    Superhero Name
                    <StickerBadge variant="yellow" size="sm">REQ</StickerBadge>
                    {formData.name && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`text-base font-bold ${nameValid ? "text-green-500" : "text-red-500"}`}
                      >
                        {nameValid ? "✓" : "✗"}
                      </motion.span>
                    )}
                  </label>
                  <div className="relative">
                    <ComicInput
                      placeholder="e.g. Captain Academic"
                      value={formData.name}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={`bg-white pr-10 transition-all duration-200 ${
                        focused === "name"
                          ? "ring-4 ring-secondary border-secondary shadow-[0_0_20px_rgba(253,224,71,0.4)]"
                          : "border-comic-black/30"
                      }`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-lg pointer-events-none select-none">
                      🦸
                    </span>
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div
                  className="space-y-2"
                  custom={1}
                  variants={fieldVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label className="font-bangers text-xl text-comic-black flex items-center gap-2">
                    Comms Signal
                    <StickerBadge variant="red" size="sm">EMAIL</StickerBadge>
                    {formData.email && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`text-base font-bold ${emailValid ? "text-green-500" : "text-red-500"}`}
                      >
                        {emailValid ? "✓" : "✗"}
                      </motion.span>
                    )}
                  </label>
                  <div className="relative">
                    <ComicInput
                      type="email"
                      placeholder="hero@academy.com"
                      value={formData.email}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={`bg-white pr-10 transition-all duration-200 ${
                        focused === "email"
                          ? "ring-4 ring-destructive border-destructive shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                          : "border-comic-black/30"
                      }`}
                    />
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-comic-black/40 pointer-events-none" />
                  </div>
                </motion.div>
              </div>

              {/* Mission Type Dropdown */}
              <motion.div
                className="space-y-2"
                custom={2}
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
              >
                <label className="font-bangers text-xl text-comic-black flex items-center gap-2">
                  Mission Type
                  <StickerBadge variant="green" size="sm">TOPIC</StickerBadge>
                </label>
                <div className="relative">
                  <select
                    value={subject}
                    onFocus={() => setFocused("subject")}
                    onBlur={() => setFocused(null)}
                    onChange={(e) => setSubject(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl bg-white text-comic-black font-comic font-bold border-4 border-comic-black focus:outline-none appearance-none cursor-pointer transition-all duration-200 ${
                      focused === "subject"
                        ? "ring-4 ring-accent shadow-[0_0_20px_rgba(74,222,128,0.3)]"
                        : ""
                    }`}
                  >
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none font-bangers text-lg select-none">
                    ▼
                  </div>
                </div>
              </motion.div>

              {/* Message */}
              <motion.div
                className="space-y-2"
                custom={3}
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
              >
                <label className="font-bangers text-xl text-comic-black flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    The Message
                    {formData.message && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`text-base font-bold ${msgValid ? "text-green-500" : "text-red-500"}`}
                      >
                        {msgValid ? "✓" : "✗"}
                      </motion.span>
                    )}
                  </span>
                  <span
                    className={`text-sm font-comic font-normal ${
                      msgLen > MAX_MSG * 0.9
                        ? "text-red-500"
                        : msgLen > MAX_MSG * 0.7
                        ? "text-yellow-500"
                        : "text-muted-foreground"
                    }`}
                  >
                    {msgLen}/{MAX_MSG}
                  </span>
                </label>
                <div className="relative">
                  <textarea
                    value={formData.message}
                    maxLength={MAX_MSG}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className={`w-full px-5 py-4 pb-8 rounded-2xl bg-white text-comic-black border-4 border-comic-black font-comic font-bold text-lg focus:outline-none min-h-[150px] resize-none placeholder:opacity-40 transition-all duration-200 ${
                      focused === "message"
                        ? "ring-4 ring-secondary shadow-[0_0_24px_rgba(253,224,71,0.35)]"
                        : ""
                    }`}
                    placeholder="Tell us what's happening at your school..."
                  />
                  {/* Character-count progress bar */}
                  <div className="absolute bottom-3 left-4 right-4 h-1.5 bg-muted/20 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        msgLen > MAX_MSG * 0.9
                          ? "bg-destructive"
                          : msgLen > MAX_MSG * 0.7
                          ? "bg-secondary"
                          : "bg-accent"
                      }`}
                      animate={{ width: `${(msgLen / MAX_MSG) * 100}%` }}
                      transition={{ type: "spring", stiffness: 120 }}
                    />
                  </div>
                </div>
                <p className="text-xs font-comic text-muted-foreground opacity-70">
                  💡 Min 10 characters for a valid transmission
                </p>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                className="pt-2"
                custom={4}
                variants={fieldVariants}
                initial="hidden"
                animate="visible"
              >
                <ComicButton
                  variant="primary"
                  className="w-full py-4 text-2xl group relative overflow-hidden"
                >
                  <div className="flex items-center justify-center gap-3 relative z-10">
                    <motion.div
                      animate={{ x: [0, 4, 0], y: [0, -4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Send className="w-6 h-6" />
                    </motion.div>
                    SEND TO HEADQUARTERS
                    <motion.span
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      🚀
                    </motion.span>
                  </div>
                  {/* Shimmer sweep */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                </ComicButton>

                {/* Helper hints */}
                <div className="mt-3 flex items-center justify-center gap-6 text-xs font-comic text-muted-foreground/70 flex-wrap">
                  <span>🔒 Secure transmission</span>
                  <span>⚡ Instant delivery</span>
                  <span>🎯 24hr response</span>
                </div>
              </motion.div>
            </motion.form>
          ) : (
            /* Success State */
            <motion.div
              key="success-message"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center space-y-6 relative overflow-hidden"
            >
              {/* Confetti burst */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-sm pointer-events-none"
                  style={{
                    backgroundColor: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
                    top: "30%",
                    left: "50%",
                  }}
                  animate={{
                    x: Math.cos((i * 30 * Math.PI) / 180) * 140,
                    y: Math.sin((i * 30 * Math.PI) / 180) * 110 - 70,
                    opacity: [1, 1, 0],
                    rotate: [0, 360],
                    scale: [1, 0.5],
                  }}
                  transition={{ duration: 1.2, delay: i * 0.06, ease: "easeOut" }}
                />
              ))}

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, type: "spring" }}
                className="w-28 h-28 bg-accent rounded-full border-4 border-comic-black mx-auto flex items-center justify-center shadow-comic relative"
              >
                <CheckCircle2 className="w-14 h-14 text-white" />
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-secondary"
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>

              <div>
                <motion.h3
                  className="font-bangers text-5xl text-comic-black mb-3"
                  animate={{ scale: [0.8, 1.05, 1] }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  SIGNAL RECEIVED! 📡
                </motion.h3>
                <p className="font-comic text-xl text-muted-foreground max-w-sm mx-auto">
                  Target locked! Our analysts are decoding your message right now.
                  Stand by for a response!
                </p>
              </div>

              <div className="flex justify-center gap-3">
                <ComicButton
                  variant="secondary"
                  size="md"
                  onClick={() => setIsSubmitted(false)}
                >
                  SEND ANOTHER REPORT
                </ComicButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </ComicCard>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   ContactPage
───────────────────────────────────────────────────── */
const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all mission details!");
      return;
    }
    setIsSubmitted(true);
    toast.success("Message dispatched to HQ! 🚀");

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 5000);
  };

  const contactOptions = [
    {
      icon: Github,
      title: "Github",
      value: "https://github.com/VARA4u-tech",
      variant: "yellow" as const,
      rotate: -2,
    },
    {
      icon: Phone,
      title: "Support Line",
      value: "9550533315",
      variant: "green" as const,
      rotate: 3,
    },
    {
      icon: MapPin,
      title: "Base of Ops",
      value: "DVR & Dr. HS MIC College of Technology",
      variant: "red" as const,
      rotate: -1,
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col font-comic overflow-x-hidden">
      <Navbar variant="solid" />

      {/* Hero Background Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-secondary rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-destructive rounded-full blur-[150px] animate-pulse" />
        <div className="absolute inset-0 halftone opacity-30" />
      </div>

      <main className="flex-grow container mx-auto px-4 pt-32 pb-16 relative">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16 relative">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <StickerText size="2xl" color="yellow" rotate={-2} className="mb-4">
                CONTACT HQ
              </StickerText>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-muted-foreground font-comic max-w-2xl mx-auto"
            >
              Got a signal to send? A hero in need? 💥 Our team of analysts is
              standing by to help you succeed!
            </motion.p>

            {/* Floating Decorative Icon */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 right-[10%] hidden lg:block"
            >
              <div className="bg-background border-4 border-comic-black p-4 rounded-2xl rotate-12 shadow-comic">
                <MessageSquare className="w-8 h-8 text-secondary" />
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Info Cards */}
            <div className="lg:col-span-5 space-y-10 order-2 lg:order-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                {contactOptions.map((option, idx) => (
                  <motion.div
                    key={option.title}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, rotate: option.rotate }}
                  >
                    <ComicCard
                      variant={option.variant}
                      className="p-6 flex items-start gap-4 h-full relative group overflow-hidden"
                    >
                      <div className="absolute inset-0 halftone opacity-10 pointer-events-none" />
                      <div className="flex-shrink-0 w-14 h-14 bg-white rounded-xl border-4 border-comic-black flex items-center justify-center shadow-comic-sm group-hover:rotate-12 transition-transform">
                        <option.icon className="w-7 h-7 text-comic-black" />
                      </div>
                      <div className="relative z-10">
                        <h3 className="font-bangers text-2xl tracking-wide mb-1 text-comic-black">
                          {option.title}
                        </h3>
                        <p className="font-comic font-bold text-lg opacity-90 break-all">
                          {option.value}
                        </p>
                      </div>
                    </ComicCard>
                  </motion.div>
                ))}
              </div>

              {/* Fun Fact Section */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-muted/30 border-4 border-dashed border-muted-foreground/30 p-8 rounded-3xl relative"
              >
                <div className="absolute -top-6 -right-4 bg-secondary border-4 border-comic-black px-4 py-1 rounded-lg rotate-12 font-bangers text-lg">
                  DID YOU KNOW?
                </div>
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-secondary/20 rounded-xl">
                    <Info className="w-6 h-6 text-secondary" />
                  </div>
                  <p className="font-comic text-muted-foreground">
                    Our AI model processes academic data 10x faster than a
                    traditional report card. We are here to save you time and
                    stress!
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Mission Report Form */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <MissionReportForm
                formData={formData}
                setFormData={setFormData}
                isSubmitted={isSubmitted}
                setIsSubmitted={setIsSubmitted}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
