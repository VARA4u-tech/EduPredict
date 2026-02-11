import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickerText from "@/components/StickerText";
import ComicCard from "@/components/ComicCard";
import StickerBadge from "@/components/StickerBadge";

const PrivacyPolicy = () => {
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
            <StickerText size="xl" color="blue" rotate={-2}>
              Privacy Policy
            </StickerText>
            <p className="mt-4 text-xl text-muted-foreground">
              Your secrets are safe with us! 🔒
            </p>
          </div>

          <ComicCard variant="white" className="p-8 md:p-12 mb-8 text-left">
            <div className="prose prose-lg max-w-none font-comic text-comic-black">
              <h2 className="font-bangers text-3xl mb-4 flex items-center gap-2">
                <StickerBadge variant="yellow" size="sm">
                  1
                </StickerBadge>
                Information We Collect
              </h2>
              <p>
                We collect information you provide directly to us, such as when
                you create an account, update your profile, or use our
                interactive features. This includes:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>
                  Name, email address, and role (student, faculty, admin).
                </li>
                <li>
                  Academic performance data (grades, attendance, etc.) for
                  predictions.
                </li>
                <li>Usage data and interactions with our AI assistant.</li>
              </ul>

              <h2 className="font-bangers text-3xl mb-4 flex items-center gap-2">
                <StickerBadge variant="green" size="sm">
                  2
                </StickerBadge>
                How We Use Your Data
              </h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Provide, maintain, and improve our services.</li>
                <li>
                  Generate personalized academic predictions and
                  recommendations.
                </li>
                <li>
                  Communicate with you about updates, security alerts, and
                  support messages.
                </li>
              </ul>

              <h2 className="font-bangers text-3xl mb-4 flex items-center gap-2">
                <StickerBadge variant="red" size="sm">
                  3
                </StickerBadge>
                Data Security
              </h2>
              <p>
                We take reasonable measures to help protect information about
                you from loss, theft, misuse, and unauthorized access,
                disclosure, alteration, and destruction. Your academic data is
                encrypted and stored securely.
              </p>

              <h2 className="font-bangers text-3xl mb-4 flex items-center gap-2">
                <StickerBadge variant="blue" size="sm">
                  4
                </StickerBadge>
                Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at{" "}
                <a
                  href="mailto:privacy@edupredict.com"
                  className="text-primary hover:underline font-bold"
                >
                  privacy@edupredict.com
                </a>
                .
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

export default PrivacyPolicy;
