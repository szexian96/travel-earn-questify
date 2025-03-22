
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface MakimonoScrollProps {
  children: React.ReactNode;
  title?: string;
  maxHeight?: string;
}

const MakimonoScroll: React.FC<MakimonoScrollProps> = ({ 
  children, 
  title,
  maxHeight = "70vh" 
}) => {
  const [isUnrolled, setIsUnrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.2]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -20]);
  const springY = useSpring(y, { stiffness: 100, damping: 20 });
  
  useEffect(() => {
    // Animate scroll unrolling after a short delay
    const timer = setTimeout(() => {
      setIsUnrolled(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Paper texture animation
  const paperVariants = {
    hidden: { 
      opacity: 0,
      scaleY: 0,
      originY: 0 
    },
    visible: { 
      opacity: 1,
      scaleY: 1,
      transition: { 
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut" 
      }
    }
  };
  
  return (
    <div className="w-full my-8">
      {title && (
        <motion.h3 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-xl md:text-2xl font-bold mb-4 text-tourii-charcoal dark:text-tourii-warm-grey"
        >
          {title}
        </motion.h3>
      )}
      
      <motion.div 
        className="makimono-scroll scroll-edges relative overflow-hidden mx-auto"
        style={{ maxWidth: "800px" }}
        variants={paperVariants}
        initial="hidden"
        animate={isUnrolled ? "visible" : "hidden"}
      >
        <div 
          ref={scrollRef}
          className="py-8 px-6 md:px-10 overflow-y-auto paper-bg"
          style={{ maxHeight }}
        >
          <motion.div variants={contentVariants}>
            {children}
          </motion.div>
          
          <motion.div 
            className="flex justify-center mt-10 mb-2"
            style={{ opacity, y: springY }}
          >
            <motion.div 
              className="text-tourii-charcoal/60 dark:text-tourii-warm-grey/60"
              animate={{ 
                y: [0, 8, 0],
              }}
              transition={{ 
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1.5,
                ease: "easeInOut"
              }}
            >
              <ChevronDown className="h-6 w-6" />
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-background to-transparent z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-background to-transparent z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
        />
      </motion.div>
    </div>
  );
};

export default MakimonoScroll;
