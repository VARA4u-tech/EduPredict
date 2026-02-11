import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickerText from "@/components/StickerText";
import ComicCard from "@/components/ComicCard";
import StickerBadge from "@/components/StickerBadge";
import { Cookie } from "lucide-react";

const CookiePolicy = () => {
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
            <div className="flex items-center justify-center gap-4 mb-2">
              <Cookie className="h-12 w-12 text-yellow-500 animate-spin-slow" />
              <StickerText size="xl" color="yellow" rotate={-2}>
                Cookie Policy
              </StickerText>
            </div>

            <p className="mt-4 text-xl text-muted-foreground">
              We use cookies to make your experience sweeter! 🍪
            </p>
          </div>

          <ComicCard variant="white" className="p-8 md:p-12 mb-8 text-left">
            <div className="prose prose-lg max-w-none font-comic text-comic-black">
              <h2 className="font-bangers text-3xl mb-4 flex items-center gap-2">
                What are Cookies?
              </h2>
              <p>
                Cookies are small text files that are used to store small pieces
                of information. They are stored on your device when the website
                is loaded on your browser. These cookies help us make the
                website function properly, make it more secure, provide better
                user experience, and understand how the website performs and to
                analyze what works and where it needs improvement.
              </p>

              <h2 className="font-bangers text-3xl mb-4 flex items-center gap-2 mt-8">
                How We Use Cookies
              </h2>
              <p>
                As most of the online services, our website uses first-party and
                third-party cookies for several purposes. First-party cookies
                are mostly necessary for the website to function the right way,
                and they do not collect any of your personally identifiable
                data.
              </p>
              <p className="mt-4">
                The third-party cookies used on our website are mainly for
                understanding how the website performs, how you interact with
                our website, keeping our services secure, providing
                advertisements that are relevant to you, and all in all
                providing you with a better and improved user experience and
                help speed up your future interactions with our website.
              </p>

              <h2 className="font-bangers text-3xl mb-4 flex items-center gap-2 mt-8">
                Types of Cookies We Use
              </h2>
              <div className="grid gap-4">
                <div className="bg-muted p-4 rounded-xl border-2 border-comic-black">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <StickerBadge variant="green" size="sm">
                      Necessary
                    </StickerBadge>
                  </h3>
                  <p>
                    Essential for the website to function properly. This
                    includes login sessions and security features.
                  </p>
                </div>
                <div className="bg-muted p-4 rounded-xl border-2 border-comic-black">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <StickerBadge variant="blue" size="sm">
                      Analytics
                    </StickerBadge>
                  </h3>
                  <p>
                    Help us understand how visitors interact with the website by
                    collecting and reporting information anonymously.
                  </p>
                </div>
              </div>

              <h2 className="font-bangers text-3xl mb-4 flex items-center gap-2 mt-8">
                Managing Cookies
              </h2>
              <p>
                You can change your cookie preferences any time by clicking the
                "Cookie Settings" button on our website. This will let you
                revisit the cookie consent banner and change your preferences or
                withdraw your consent right away.
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

export default CookiePolicy;
