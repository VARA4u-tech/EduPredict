import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickerText from "@/components/StickerText";
import ComicCard from "@/components/ComicCard";
import StickerBadge from "@/components/StickerBadge";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col font-comic">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <StickerText size="xl" color="red" rotate={2}>
              Terms of Service
            </StickerText>
            <p className="mt-4 text-xl text-muted-foreground">
              The rules of the game! 📜
            </p>
          </div>

          <ComicCard variant="white" className="p-8 md:p-12 mb-8 text-left">
            <div className="prose prose-lg max-w-none font-comic text-comic-black">
              <h2 className="font-bangers text-3xl mb-4 flex items-center gap-2">
                <StickerBadge variant="yellow" size="sm">
                  1
                </StickerBadge>
                Acceptance of Terms
              </h2>
              <p>
                By accessing or using EduPredict, you agree to be bound by these
                Terms. If you disagree with any part of the terms, then you may
                not access the service.
              </p>

              <h2 className="font-bangers text-3xl mb-4 flex items-center gap-2">
                <StickerBadge variant="green" size="sm">
                  2
                </StickerBadge>
                User Accounts
              </h2>
              <p>
                When you create an account with us, you must provide us
                information that is accurate, complete, and current at all
                times. Failure to do so constitutes a breach of the Terms, which
                may result in immediate termination of your account on our
                Service.
              </p>

              <h2 className="font-bangers text-3xl mb-4 flex items-center gap-2">
                <StickerBadge variant="blue" size="sm">
                  3
                </StickerBadge>
                Intellectual Property
              </h2>
              <p>
                The Service and its original content, features, and
                functionality are and will remain the exclusive property of
                EduPredict and its licensors.
              </p>

              <h2 className="font-bangers text-3xl mb-4 flex items-center gap-2">
                <StickerBadge variant="red" size="sm">
                  4
                </StickerBadge>
                Termination
              </h2>
              <p>
                We may terminate or suspend access to our Service immediately,
                without prior notice or liability, for any reason whatsoever,
                including without limitation if you breach the Terms.
              </p>
            </div>
          </ComicCard>

          <div className="text-center text-sm text-muted-foreground">
            Last updated: February 2026
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
