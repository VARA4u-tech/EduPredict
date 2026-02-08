import { motion } from "framer-motion";
import { HelpCircle, MessageCircle, FileQuestion } from "lucide-react";
import ComicCard from "@/components/ComicCard";
import StickerText from "@/components/StickerText";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HelpPage = () => {
  return (
    <div className="min-h-screen bg-background web-pattern flex flex-col">
      <Navbar variant="solid" />

      <main className="flex-1 pt-24 pb-16 px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center gap-4 mb-8"
          >
            <div className="w-16 h-16 bg-yellow-400 rounded-xl border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_black]">
              <HelpCircle className="w-8 h-8" />
            </div>
            <div>
              <StickerText size="lg" color="white">
                Help Center
              </StickerText>
              <p className="font-comic text-lg">
                Got questions? We've got answers!
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ComicCard variant="white" className="mb-8">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="font-bangers text-xl">
                    How does the Prediction work?
                  </AccordionTrigger>
                  <AccordionContent className="font-comic text-base">
                    Our AI analyzes your attendance, internal marks, and study
                    habits to forecast your final grade. Like a weather
                    forecast, but for your grades!
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="font-bangers text-xl">
                    What does "XP" mean?
                  </AccordionTrigger>
                  <AccordionContent className="font-comic text-base">
                    XP stands for Experience Points. You earn them by attending
                    classes, submitting assignments on time, and logging in
                    daily. Level up to earn badges!
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="font-bangers text-xl">
                    Is my data private?
                  </AccordionTrigger>
                  <AccordionContent className="font-comic text-base">
                    Absolutely! Your data is locked in a vault tighter than a
                    superhero's secret identity. Only you and authorized faculty
                    can see it.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="font-bangers text-xl">
                    How do I improve my risk level?
                  </AccordionTrigger>
                  <AccordionContent className="font-comic text-base">
                    Focus on attendance, complete assignments on time, and stay
                    engaged with your courses. Small consistent improvements
                    lead to big changes!
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ComicCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <ComicCard
              variant="blue"
              className="text-center cursor-pointer hover:scale-105 transition-transform"
            >
              <MessageCircle className="w-10 h-10 mx-auto mb-2 text-white" />
              <h3 className="font-bangers text-xl text-white">Live Chat</h3>
              <p className="text-white/80 text-sm font-comic">
                Chat with support
              </p>
            </ComicCard>
            <ComicCard
              variant="green"
              className="text-center cursor-pointer hover:scale-105 transition-transform"
            >
              <FileQuestion className="w-10 h-10 mx-auto mb-2 text-white" />
              <h3 className="font-bangers text-xl text-white">Submit Ticket</h3>
              <p className="text-white/80 text-sm font-comic">Report a bug</p>
            </ComicCard>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HelpPage;
