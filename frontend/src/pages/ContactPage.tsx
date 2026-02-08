import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone } from "lucide-react";
import ComicButton from "@/components/ComicButton";
import ComicCard from "@/components/ComicCard";
import StickerText from "@/components/StickerText";
import ComicInput from "@/components/ComicInput";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background web-pattern flex flex-col">
      <Navbar variant="solid" />

      <main className="flex-1 pt-24 pb-16 px-4 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center lg:text-left"
          >
            <StickerText size="xl" color="white" className="mb-4">
              Get in Touch!
            </StickerText>
            <p className="font-comic text-xl mb-8">
              We'd love to hear from you. Send us a message, report a bug, or
              just say hi!
            </p>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <ComicCard variant="yellow" className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full border-4 border-black flex items-center justify-center">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bangers text-xl">Email Us</h3>
                    <p className="font-comic">support@edupredict.com</p>
                  </div>
                </ComicCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <ComicCard variant="green" className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full border-4 border-black flex items-center justify-center">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bangers text-xl">Call Us</h3>
                    <p className="font-comic">+1 (555) 123-HERO</p>
                  </div>
                </ComicCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <ComicCard variant="white" className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full border-4 border-black flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bangers text-xl">HQ</h3>
                    <p className="font-comic">
                      123 Education Lane, Learning City
                    </p>
                  </div>
                </ComicCard>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ComicCard variant="white" className="h-full">
              <h3 className="font-bangers text-2xl mb-6">Send a Message</h3>
              <form className="space-y-4">
                <div>
                  <label className="font-bangers block mb-2">Name</label>
                  <ComicInput placeholder="Your superhero name" />
                </div>
                <div>
                  <label className="font-bangers block mb-2">Email</label>
                  <ComicInput type="email" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="font-bangers block mb-2">Message</label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl bg-white text-black border-4 border-black font-comic focus:outline-none focus:ring-4 focus:ring-yellow-400 min-h-[150px]"
                    placeholder="What's on your mind?"
                  />
                </div>
                <ComicButton variant="primary" className="w-full">
                  <Send className="w-4 h-4 mr-2" /> Send Message
                </ComicButton>
              </form>
            </ComicCard>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
