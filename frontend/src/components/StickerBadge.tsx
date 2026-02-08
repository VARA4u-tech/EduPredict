import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface StickerBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'red' | 'yellow' | 'green' | 'blue' | 'white';
  size?: 'sm' | 'md' | 'lg';
  rotate?: boolean;
}

const StickerBadge = forwardRef<HTMLSpanElement, StickerBadgeProps>(
  ({ className, variant = 'yellow', size = 'md', rotate = true, children, ...props }, ref) => {
    const baseStyles = "inline-block font-bangers uppercase tracking-wide border-4 border-comic-white rounded-full shadow-lg";
    
    const variants = {
      red: "bg-destructive text-destructive-foreground",
      yellow: "bg-secondary text-secondary-foreground",
      green: "bg-accent text-accent-foreground",
      blue: "bg-background text-foreground",
      white: "bg-comic-white text-comic-black",
    };

    const sizes = {
      sm: "px-3 py-1 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-lg",
    };

    const rotateStyle = rotate ? "transform rotate-[-3deg]" : "";

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], rotateStyle, className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

StickerBadge.displayName = 'StickerBadge';

export default StickerBadge;
