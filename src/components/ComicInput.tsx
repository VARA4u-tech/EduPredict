import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ComicInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const ComicInput = forwardRef<HTMLInputElement, ComicInputProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 font-bangers text-lg text-foreground">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full px-4 py-3 rounded-xl bg-comic-white text-comic-black font-comic border-4 border-comic-black focus:outline-none focus:ring-4 focus:ring-secondary transition-all",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

ComicInput.displayName = 'ComicInput';

export default ComicInput;
