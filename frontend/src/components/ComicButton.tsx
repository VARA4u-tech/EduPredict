import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface ComicButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: "primary" | "secondary" | "accent" | "outline";
  size?: "sm" | "md" | "lg";
}

const ComicButton = forwardRef<HTMLButtonElement, ComicButtonProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-bangers uppercase tracking-wider rounded-xl border-4 border-comic-black";

    // Removed the hover translation and active translation from CSS as framer-motion handles it
    const variants = {
      primary:
        "bg-destructive text-destructive-foreground shadow-[4px_4px_0px_hsl(var(--comic-black))]",
      secondary:
        "bg-secondary text-secondary-foreground shadow-[4px_4px_0px_hsl(var(--comic-black))]",
      accent:
        "bg-accent text-accent-foreground shadow-[4px_4px_0px_hsl(var(--comic-black))]",
      outline:
        "bg-comic-white text-comic-black shadow-[4px_4px_0px_hsl(var(--comic-black))]",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-lg",
      lg: "px-8 py-4 text-xl",
    };

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        whileHover={{
          scale: 1.03,
          y: -2,
          boxShadow: "6px 6px 0px hsl(var(--comic-black))",
        }}
        whileTap={{
          scale: 0.95,
          y: 2,
          boxShadow: "2px 2px 0px hsl(var(--comic-black))",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);

ComicButton.displayName = "ComicButton";

export default ComicButton;
