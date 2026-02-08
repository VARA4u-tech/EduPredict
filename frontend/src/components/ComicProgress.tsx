import { cn } from '@/lib/utils';

interface ComicProgressProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
}

const ComicProgress = ({ 
  value, 
  max = 100, 
  label, 
  showValue = true, 
  variant = 'default',
  className 
}: ComicProgressProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  const variants = {
    default: "bg-gradient-to-r from-accent to-secondary",
    success: "bg-accent",
    warning: "bg-secondary",
    danger: "bg-destructive",
  };

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="flex justify-between mb-2 font-comic font-bold">
          {label && <span>{label}</span>}
          {showValue && <span>{value}%</span>}
        </div>
      )}
      <div className="h-6 rounded-full border-4 border-comic-black bg-comic-white overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500", variants[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ComicProgress;
