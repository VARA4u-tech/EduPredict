import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ComicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const ComicButton = forwardRef<HTMLButtonElement, ComicButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-bangers uppercase tracking-wider rounded-xl border-4 border-comic-black transition-all duration-150 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_hsl(var(--comic-black))]";
    
    const variants = {
      primary: "bg-destructive text-destructive-foreground hover:-translate-x-0.5 hover:-translate-y-0.5 shadow-[4px_4px_0px_hsl(var(--comic-black))] hover:shadow-[6px_6px_0px_hsl(var(--comic-black))]",
      secondary: "bg-secondary text-secondary-foreground hover:-translate-x-0.5 hover:-translate-y-0.5 shadow-[4px_4px_0px_hsl(var(--comic-black))] hover:shadow-[6px_6px_0px_hsl(var(--comic-black))]",
      accent: "bg-accent text-accent-foreground hover:-translate-x-0.5 hover:-translate-y-0.5 shadow-[4px_4px_0px_hsl(var(--comic-black))] hover:shadow-[6px_6px_0px_hsl(var(--comic-black))]",
      outline: "bg-comic-white text-comic-black hover:-translate-x-0.5 hover:-translate-y-0.5 shadow-[4px_4px_0px_hsl(var(--comic-black))] hover:shadow-[6px_6px_0px_hsl(var(--comic-black))]",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-lg",
      lg: "px-8 py-4 text-xl",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ComicButton.displayName = 'ComicButton';

export default ComicButton;
