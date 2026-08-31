import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface SpeechBubbleTooltipProps {
  children: React.ReactNode;
  content: string | React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function SpeechBubbleTooltip({
  children,
  content,
  side = "top",
  className,
}: SpeechBubbleTooltipProps) {
  // Use TooltipProvider here just in case it's not wrapped in the parent,
  // though App.tsx usually has it globally. It's safe to wrap.
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent 
          side={side} 
          sideOffset={20}
          className="bg-transparent border-none shadow-none p-0 overflow-visible"
        >
          {/* We wrap the content in the speech bubble div to use the existing CSS */}
          <div className={cn("speech-bubble shadow-[4px_4px_0px_hsl(var(--comic-black))] text-sm font-comic font-bold animate-in zoom-in-95 max-w-[250px] text-center", className)}>
            {content}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
