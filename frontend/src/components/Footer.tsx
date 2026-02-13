import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Brain,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Sparkles,
  ExternalLink,
  ArrowUp,
} from "lucide-react";
import ComicButton from "./ComicButton";
import StickerBadge from "./StickerBadge";
import WhatsAppIcon from "./WhatsAppIcon";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    product: [
      { name: "Features", path: "/#features" },
      { name: "Dashboard", path: "/dashboard" },
      { name: "Predictions", path: "/dashboard/student/predictions" },
      { name: "Reports", path: "/dashboard/student/reports" },
    ],
    resources: [
      { name: "Help Center", path: "/help" },
      { name: "Documentation", path: "/help" },
      { name: "API Reference", path: "/help" },
      { name: "Tutorials", path: "/help" },
    ],
    company: [
      { name: "About Us", path: "/about" },
      { name: "Contact", path: "/contact" },
      { name: "Careers", path: "/about" },
      { name: "Press Kit", path: "/about" },
    ],
    legal: [
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
      { name: "Cookie Policy", path: "/cookies" },
    ],
  };

  const whatsappMessage = encodeURIComponent(
    "⚡ POW! I'm excited about EduPredict. Tell me more about how it transforms education!",
  );

  const emailSubject = encodeURIComponent("Inquiry about EduPredict");
  const emailBody = encodeURIComponent(
    "Hello VARA,\n\nI would like to know more about EduPredict and how it can be used for education.\n\nRegards,",
  );

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/VARA4u-tech",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/durga-vara-prasad-pappuri-1797701b6",
      label: "LinkedIn",
    },
    {
      icon: WhatsAppIcon,
      href: `https://wa.me/919550533315?text=${whatsappMessage}`,
      label: "WhatsApp",
    },
    {
      icon: Mail,
      href: `mailto:pappuridurgavaraprasad4pl@gmail.com?subject=${emailSubject}&body=${emailBody}`,
      label: "Email",
    },
  ];

  return (
    <footer className="relative bg-muted border-t-4 border-comic-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 halftone" />
      </div>

      <div className="container mx-auto px-4 pt-16 pb-8 relative">
        {/* Top Section - Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 p-6 md:p-8 bg-gradient-to-r from-secondary/20 via-background to-destructive/20 rounded-2xl border-4 border-comic-black shadow-[6px_6px_0px_black]"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <Sparkles className="w-5 h-5 text-secondary" />
                <span className="font-bangers text-2xl md:text-3xl text-foreground">
                  Stay in the Loop!
                </span>
              </div>
              <p className="font-comic text-muted-foreground max-w-md">
                Get the latest updates on AI-powered education predictions and
                success stories.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email..."
                className="px-4 py-3 rounded-xl bg-background border-3 border-comic-black font-comic w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <ComicButton variant="primary" size="md">
                Subscribe 🚀
              </ComicButton>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12 text-center md:text-left">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 flex flex-col items-center md:items-start">
            <Link to="/" className="inline-flex items-center gap-3 mb-4 group">
              <motion.div
                whileHover={{ rotate: 10 }}
                className="w-12 h-12 bg-secondary rounded-xl border-4 border-comic-black shadow-[4px_4px_0px_black] flex items-center justify-center"
              >
                <Brain className="w-7 h-7 text-comic-black" />
              </motion.div>
              <div>
                <span className="font-bangers text-xl text-foreground block">
                  EduPredict
                </span>
                <span className="text-xs font-comic font-bold text-secondary">
                  AI-Powered Success
                </span>
              </div>
            </Link>
            <p className="font-comic text-sm text-muted-foreground mb-4 max-w-xs">
              Transforming education through predictive analytics. Helping
              students, teachers, and institutions succeed together.
            </p>

            {/* Social Links */}
            <div className="flex gap-2 justify-center md:justify-start">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-background rounded-xl border-3 border-comic-black shadow-[3px_3px_0px_black] flex items-center justify-center hover:bg-secondary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-bangers text-lg text-foreground mb-4 flex items-center justify-center md:justify-start gap-2">
              <StickerBadge variant="red" size="sm">
                Product
              </StickerBadge>
            </h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="font-comic text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-bangers text-lg text-foreground mb-4 flex items-center justify-center md:justify-start gap-2">
              <StickerBadge variant="yellow" size="sm">
                Resources
              </StickerBadge>
            </h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="font-comic text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
{/* Company Links */}
<div>
  <h4 className="font-bangers text-lg text-foreground mb-4 flex items-center justify-center md:justify-start gap-2">
    <StickerBadge variant="green" size="sm">
      Company
    </StickerBadge>
  </h4>
  <ul className="space-y-3">
    {footerLinks.company.map((link) => (
      <li key={link.name}>
        <Link
          to={link.path}
          className="font-comic text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors inline-flex items-center gap-1 group text-center md:text-left w-full md:w-auto justify-center md:justify-start"
        >
          {link.name}
          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </li>
    ))}
  </ul>
</div>

{/* Legal Links */}
<div>
  <h4 className="font-bangers text-lg text-foreground mb-4 flex items-center justify-center md:justify-start gap-2">
    <StickerBadge variant="blue" size="sm">
      Legal
    </StickerBadge>
  </h4>
  <ul className="space-y-3">
    {footerLinks.legal.map((link) => (
      <li key={link.name}>
        <Link
          to={link.path}
          className="font-comic text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors inline-flex items-center gap-1 group text-center md:text-left w-full md:w-auto justify-center md:justify-start"
        >
          {link.name}
          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </li>
    ))}
  </ul>
</div>

{/* Bottom Bar */}
<div className="pt-8 mt-8 border-t-2 border-dashed border-muted-foreground/30">
  <div className="flex flex-col items-center gap-4 px-4">
    
    {/* Copyright Section */}
    <div className="text-center space-y-2">
      <p className="font-comic text-sm text-muted-foreground">
        © 2026 EduPredict.
      </p>
      
      <div className="flex items-center justify-center gap-1.5">
        <span className="font-comic text-sm text-muted-foreground">Made with</span>
        <motion.span
          className="font-bold text-primary text-base inline-block"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
        >
          POW!
        </motion.span>
      </div>
      
      <p className="font-comic text-sm text-muted-foreground">
        By VARA for Education.
      </p>
    </div>

    {/* Tagline - Single line on desktop, wrapped on mobile */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full flex justify-center mt-2"
    >
      <p className="font-comic font-semibold text-secondary text-sm leading-relaxed text-center max-w-[280px] sm:max-w-none">
        <span className="hidden sm:inline">🎓 Empowering Students, One Prediction at a Time!</span>
        <span className="sm:hidden">🎓 Empowering Students,<br />One Prediction at a Time!</span>
      </p>
    </motion.div>
    
    {/* Optional: Small decorative element */}
    <div className="flex justify-center mt-2">
      <span className="text-[10px] text-muted-foreground/30 font-comic">
        #EduPredict #VARA
      </span>
    </div>
    
  </div>
</div>


</div>
























</div>

      {/* Decorative Bottom Border */}
      <div className="h-2 bg-gradient-to-r from-destructive via-secondary to-accent" />
    </footer>
  );
};

export default Footer;
