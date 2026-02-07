import { cn } from '@/lib/utils';

interface RiskBadgeProps {
  level: 'low' | 'medium' | 'high';
  className?: string;
}

const RiskBadge = ({ level, className }: RiskBadgeProps) => {
  const styles = {
    low: "bg-accent text-accent-foreground",
    medium: "bg-secondary text-secondary-foreground",
    high: "bg-destructive text-destructive-foreground",
  };

  const labels = {
    low: "LOW RISK",
    medium: "MEDIUM RISK",
    high: "HIGH RISK",
  };

  return (
    <span
      className={cn(
        "inline-block px-3 py-1 font-fredoka font-bold text-sm uppercase rounded-full border-3 border-comic-black",
        styles[level],
        className
      )}
      style={{ borderWidth: '3px' }}
    >
      {labels[level]}
    </span>
  );
};

export default RiskBadge;
