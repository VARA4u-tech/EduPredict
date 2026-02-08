import { motion } from "framer-motion";
import { Rocket, Shield, Users } from "lucide-react";
import ComicCard from "@/components/ComicCard";
import StickerText from "@/components/StickerText";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background web-pattern flex flex-col">
      <Navbar variant="solid" />

      <main className="flex-1 pt-24 pb-16 px-4 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <StickerText size="xl" color="yellow">
              Mission: Student Success
            </StickerText>
            <p className="font-comic text-xl mt-4 max-w-2xl mx-auto">
              EduPredict isn't just a dashboard—it's your sidekick in the
              academic journey! We use data to defeat the villains of
              procrastination and failure.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ComicCard variant="white" className="text-center h-full">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-black">
                  <Rocket className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bangers text-2xl mb-2">Predict</h3>
                <p className="font-comic">
                  Using advanced algorithms to forecast your academic trajectory
                  before it's too late.
                </p>
              </ComicCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <ComicCard variant="white" className="text-center h-full">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-black">
                  <Shield className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-bangers text-2xl mb-2">Prevent</h3>
                <p className="font-comic">
                  Identifying risks early so teachers and students can intervene
                  and save the day.
                </p>
              </ComicCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <ComicCard variant="white" className="text-center h-full">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-black">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bangers text-2xl mb-2">Partner</h3>
                <p className="font-comic">
                  Connecting students, faculty, and admins in a unified quest
                  for knowledge.
                </p>
              </ComicCard>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
