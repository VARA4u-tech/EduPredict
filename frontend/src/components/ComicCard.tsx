import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface ComicCardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  variant?: "default" | "white" | "yellow" | "red" | "green" | "blue";
  hover?: boolean;
}

const ComicCard = forwardRef<HTMLDivElement, ComicCardProps>(
  (
    { className, variant = "default", hover = true, children, ...props },
    ref,
  ) => {
    const baseStyles = "rounded-2xl border-4 border-comic-black p-6 relative";

    const variants = {
      default: "bg-card",
      white: "bg-comic-white text-comic-black",
      yellow: "bg-secondary text-secondary-foreground",
      red: "bg-destructive text-destructive-foreground",
      green: "bg-accent text-accent-foreground",
      blue: "bg-background text-foreground",
    };

    // Remove the CSS hover transitions since framer-motion handles it
    const shadowStyles = "shadow-[6px_6px_0px_hsl(var(--comic-black))]";

    const motionProps = hover ? {
      whileHover: { 
        y: -4, 
        x: -4,
        boxShadow: "8px 8px 0px hsl(var(--comic-black))" 
      },
      transition: { type: "spring" as const, stiffness: 300, damping: 20 }
    } : {};

    return (
      <motion.div
        ref={ref}
        className={cn(baseStyles, variants[variant], shadowStyles, className)}
        {...motionProps}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);

ComicCard.displayName = "ComicCard";

export default ComicCard;
