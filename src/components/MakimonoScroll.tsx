
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  
  useEffect(() => {
    // Animate scroll unrolling after a short delay
    const timer = setTimeout(() => {
      setIsUnrolled(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="w-full my-8">
      {title && (
        <h3 className="text-center text-xl md:text-2xl font-bold mb-4 text-tourii-charcoal dark:text-tourii-warm-grey">
          {title}
        </h3>
      )}
      
      <motion.div 
        className="makimono-scroll scroll-edges relative overflow-hidden mx-auto"
        style={{ maxWidth: "800px" }}
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isUnrolled ? "auto" : 0,
          opacity: isUnrolled ? 1 : 0
        }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div 
          className="py-8 px-6 md:px-10 overflow-y-auto paper-bg"
          style={{ maxHeight }}
        >
          {children}
          
          <div className="flex justify-center mt-10 mb-2">
            <motion.div 
              className="text-tourii-charcoal/60 dark:text-tourii-warm-grey/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <ChevronDown className="h-6 w-6 animate-bounce" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MakimonoScroll;
