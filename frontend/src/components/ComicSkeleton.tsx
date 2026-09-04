import React from "react";
import { cn } from "@/lib/utils";

interface ComicSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
}

export function ComicSkeleton({
  className,
  text,
  ...props
}: ComicSkeletonProps) {
  const words = ["BAM!", "POW!", "BOOM!", "ZAP!", "THINKING..."];
  const randomWord = text || words[Math.floor(Math.random() * words.length)];

  return (
    <div
      className={cn(
        "comic-card animate-pulse flex flex-col items-center justify-center min-h-[200px] overflow-hidden bg-muted",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 halftone opacity-20" />

      <div className="relative z-10 font-bangers text-4xl text-muted-foreground opacity-50 rotate-slight">
        {randomWord}
      </div>

      <div className="mt-4 w-3/4 h-4 bg-muted-foreground/30 rounded-full border-2 border-comic-black" />
      <div className="mt-2 w-1/2 h-4 bg-muted-foreground/30 rounded-full border-2 border-comic-black" />
    </div>
  );
}
