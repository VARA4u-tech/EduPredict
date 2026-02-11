import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StickerTextProps {
  color?: "white" | "yellow" | "red" | "blue";
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  animate?: boolean;
  className?: string;
  children: React.ReactNode;
  rotate?: number;
}

const StickerText = forwardRef<HTMLSpanElement, StickerTextProps>(
  (
    {
      className,
      color = "white",
      size = "lg",
      animate = false,
      rotate = 0,
      children,
    },
    ref,
  ) => {
    const colors = {
      white: "text-comic-white",
      yellow: "text-secondary",
      red: "text-destructive",
      blue: "text-background",
    };

    const sizes = {
      sm: "text-xl",
      md: "text-2xl",
      lg: "text-4xl",
      xl: "text-5xl md:text-6xl",
      "2xl": "text-6xl md:text-8xl",
    };

    const baseStyles = "font-bangers tracking-wide inline-block";
    const textStroke =
      "[-webkit-text-stroke:2px_black] [paint-order:stroke_fill] drop-shadow-[3px_3px_0px_rgba(0,0,0,1)]";

    if (animate) {
      return (
        <motion.span
          className={cn(
            baseStyles,
            colors[color],
            sizes[size],
            textStroke,
            className,
          )}
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: rotate }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {children}
        </motion.span>
      );
    }

    return (
      <span
        ref={ref}
        className={cn(
          baseStyles,
          colors[color],
          sizes[size],
          textStroke,
          className,
        )}
        style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined }}
      >
        {children}
      </span>
    );
  },
);

StickerText.displayName = "StickerText";

export default StickerText;
