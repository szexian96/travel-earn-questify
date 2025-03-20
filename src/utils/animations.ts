
import { AnimationProps } from 'framer-motion';

// Common animation variants for framer-motion
export const fadeIn: AnimationProps["variants"] = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

export const fadeInUp: AnimationProps["variants"] = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5,
      ease: 'easeOut'
    }
  },
  exit: { 
    opacity: 0,
    y: 20,
    transition: { duration: 0.2 }
  }
};

export const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleIn: AnimationProps["variants"] = {
  hidden: { 
    opacity: 0,
    scale: 0.95
  },
  visible: { 
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 }
  }
};

export const slideInRight: AnimationProps["variants"] = {
  hidden: { 
    opacity: 0,
    x: 20
  },
  visible: { 
    opacity: 1,
    x: 0,
    transition: { 
      duration: 0.4,
      ease: 'easeOut'
    }
  },
  exit: { 
    opacity: 0,
    x: 20,
    transition: { duration: 0.2 }
  }
};

export const pageTransition: AnimationProps["variants"] = {
  hidden: { 
    opacity: 0,
    y: 10
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.4,
      ease: 'easeOut'
    }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

// Animation settings for shared layout transitions
export const layoutTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30
};

// Helper hook for delayed animations
export const useDelayedAnimation = (delay: number = 0) => ({
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      delay,
      duration: 0.4
    }
  }
});

// Custom animation for map pin drop
export const mapPinDrop: AnimationProps["variants"] = {
  hidden: { 
    opacity: 0,
    y: -20,
    scale: 0.8
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 200,
      damping: 15
    }
  }
};

// Pulse animation for notifications
export const pulseAnimation: AnimationProps["variants"] = {
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Task completion animation
export const taskComplete: AnimationProps["variants"] = {
  hidden: { 
    opacity: 0,
    scale: 0.8,
    y: 5
  },
  visible: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { 
      duration: 0.4,
      ease: "backOut"
    }
  }
};
