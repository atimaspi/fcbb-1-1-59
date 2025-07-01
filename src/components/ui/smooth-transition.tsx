
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SmoothTransitionProps {
  children: React.ReactNode;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  className?: string;
}

const transitionVariants = {
  up: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  down: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  },
  left: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  },
  right: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  }
};

const SmoothTransition: React.FC<SmoothTransitionProps> = ({ 
  children, 
  duration = 0.3, 
  direction = 'fade',
  className 
}) => {
  const variants = transitionVariants[direction];

  return (
    <motion.div
      initial={variants.initial}
      animate={variants.animate}
      exit={variants.exit}
      transition={{ duration, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AnimatePresence mode="wait">
      <SmoothTransition direction="up" duration={0.4}>
        {children}
      </SmoothTransition>
    </AnimatePresence>
  );
};

export default SmoothTransition;
