import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ComicCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'white' | 'yellow' | 'red' | 'green' | 'blue';
  hover?: boolean;
}

const ComicCard = forwardRef<HTMLDivElement, ComicCardProps>(
  ({ className, variant = 'default', hover = true, children, ...props }, ref) => {
    const baseStyles = "rounded-2xl border-4 border-comic-black p-6 relative";
    
    const variants = {
      default: "bg-card",
      white: "bg-comic-white text-comic-black",
      yellow: "bg-secondary text-secondary-foreground",
      red: "bg-destructive text-destructive-foreground",
      green: "bg-accent text-accent-foreground",
      blue: "bg-background text-foreground",
    };

    const hoverStyles = hover 
      ? "shadow-[6px_6px_0px_hsl(var(--comic-black))] hover:shadow-[8px_8px_0px_hsl(var(--comic-black))] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200"
      : "shadow-[6px_6px_0px_hsl(var(--comic-black))]";

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], hoverStyles, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ComicCard.displayName = 'ComicCard';

export default ComicCard;
