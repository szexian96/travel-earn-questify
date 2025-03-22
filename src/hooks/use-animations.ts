
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useAnimation, AnimationControls, Variant } from 'framer-motion';

interface AnimationVariants {
  visible: Variant;
  hidden: Variant;
}

interface UseAnimateInViewProps {
  threshold?: number;
  once?: boolean;
  variants?: AnimationVariants;
  delay?: number;
}

export const useAnimateInView = ({
  threshold = 0.2,
  once = true,
  variants,
  delay = 0
}: UseAnimateInViewProps = {}) => {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { 
    amount: threshold, // Changed from threshold to amount which is the correct property
    once,
  });

  // Default animation variants if none provided
  const defaultVariants: AnimationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  // Trigger animation when element comes into view
  if (isInView) {
    setTimeout(() => {
      controls.start('visible');
    }, delay * 1000);
  }

  return {
    ref,
    controls,
    isInView,
    variants: variants || defaultVariants
  };
};

// Preset animations that can be used in components
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: 'easeOut'
    }
  }
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: 'easeOut'
    }
  }
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6, 
      ease: 'easeOut'
    }
  }
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6, 
      ease: 'easeOut'
    }
  }
};

export const popIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: 'spring',
      stiffness: 500,
      damping: 25
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};
