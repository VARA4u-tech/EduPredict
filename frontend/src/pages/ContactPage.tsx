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

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
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

    // Reset after animation
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
              <StickerText
                size="2xl"
                color="yellow"
                rotate={-2}
                className="mb-4"
              >
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
                      {/* Inner Decorative Dot Pattern */}
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

              {/* Fun Fact/Social Section */}
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
                    traditional report card. We're here to save you time and
                    stress!
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Mission Report Form */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                {/* Background Shadow Effect */}
                <div className="absolute inset-0 bg-comic-black translate-x-4 translate-y-4 rounded-3xl" />

                <ComicCard
                  variant="white"
                  className="p-8 md:p-12 relative z-10 bg-white"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <Sparkles className="w-6 h-6 text-secondary animate-pulse" />
                    <h2 className="font-bangers text-4xl text-comic-black">
                      MISSION REPORT
                    </h2>
                  </div>

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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="font-bangers text-xl text-comic-black flex items-center gap-2">
                              Superhero Name
                              <StickerBadge variant="yellow" size="sm">
                                REQ
                              </StickerBadge>
                            </label>
                            <ComicInput
                              placeholder="e.g. Captain Academic"
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  name: e.target.value,
                                })
                              }
                              className="bg-muted/10 border-comic-black/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="font-bangers text-xl text-comic-black flex items-center gap-2">
                              Comms Signal (Email)
                            </label>
                            <ComicInput
                              type="email"
                              placeholder="hero@academy.com"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  email: e.target.value,
                                })
                              }
                              className="bg-muted/10 border-comic-black/20"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="font-bangers text-xl text-comic-black">
                            The Message
                          </label>
                          <textarea
                            value={formData.message}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                message: e.target.value,
                              })
                            }
                            className="w-full px-5 py-4 rounded-2xl bg-muted/5 text-comic-black border-4 border-comic-black font-comic font-bold text-lg focus:outline-none focus:ring-4 focus:ring-secondary min-h-[160px] resize-none placeholder:opacity-50"
                            placeholder="Tell us what's happening at your school..."
                          />
                        </div>

                        <div className="pt-4">
                          <ComicButton
                            variant="primary"
                            className="w-full py-4 text-2xl group relative overflow-hidden"
                          >
                            <div className="flex items-center justify-center gap-2 relative z-10">
                              <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                              SEND TO HEADQUARTERS
                            </div>
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </ComicButton>
                        </div>
                      </motion.form>
                    ) : (
                      <motion.div
                        key="success-message"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-20 text-center space-y-6"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, type: "spring" }}
                          className="w-24 h-24 bg-accent rounded-full border-4 border-comic-black mx-auto flex items-center justify-center shadow-comic"
                        >
                          <CheckCircle2 className="w-12 h-12 text-white" />
                        </motion.div>
                        <div>
                          <h3 className="font-bangers text-4xl text-comic-black mb-2">
                            SIGNAL RECEIVED!
                          </h3>
                          <p className="font-comic text-xl text-muted-foreground">
                            Target locked! Our analysts are decoding your
                            message right now. Stand by for a response! 📡
                          </p>
                        </div>
                        <ComicButton
                          variant="secondary"
                          size="md"
                          onClick={() => setIsSubmitted(false)}
                        >
                          SEND ANOTHER REPORT
                        </ComicButton>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </ComicCard>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
