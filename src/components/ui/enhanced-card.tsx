
import React from 'react';
import { cn } from '@/lib/utils';

interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient' | 'neon';
  glow?: boolean;
  interactive?: boolean;
}

const EnhancedCard = React.forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({ className, variant = 'default', glow = false, interactive = false, children, ...props }, ref) => {
    const baseClasses = "rounded-2xl border transition-all duration-300";
    
    const variants = {
      default: "bg-card text-card-foreground shadow-lg",
      glass: "bg-white/10 backdrop-blur-xl border-white/20 text-white shadow-2xl",
      gradient: "bg-gradient-to-br from-cv-blue/20 to-cv-red/20 backdrop-blur-xl border-white/20 text-white shadow-2xl",
      neon: "bg-black/50 backdrop-blur-xl border-cv-blue/50 text-white shadow-2xl hover:shadow-cv-blue/50"
    };
    
    const glowClasses = glow ? "hover:shadow-2xl hover:shadow-cv-blue/30" : "";
    const interactiveClasses = interactive ? "hover:scale-105 hover:-translate-y-2 cursor-pointer" : "";
    
    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          glowClasses,
          interactiveClasses,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

EnhancedCard.displayName = "EnhancedCard";

const EnhancedCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("p-8 pb-4", className)}
      {...props}
    />
  )
);

EnhancedCardHeader.displayName = "EnhancedCardHeader";

const EnhancedCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("p-8 pt-0", className)}
      {...props}
    />
  )
);

EnhancedCardContent.displayName = "EnhancedCardContent";

export { EnhancedCard, EnhancedCardHeader, EnhancedCardContent };
