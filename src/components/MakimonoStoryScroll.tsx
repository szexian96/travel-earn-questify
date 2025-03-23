
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronDown, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MakimonoStoryScrollProps {
  storyTitle: string;
  storyText: string;
  videoUrl?: string;
  isVerticalScroll?: boolean;
  className?: string;
}

const MakimonoStoryScroll: React.FC<MakimonoStoryScrollProps> = ({
  storyTitle,
  storyText,
  videoUrl,
  isVerticalScroll = false,
  className
}) => {
  const { language } = useLanguage();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // Handle scroll event to hide the scroll indicator
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
        if (scrollTop > 100) {
          setShowScrollIndicator(false);
        } else if (scrollTop === 0) {
          setShowScrollIndicator(true);
        }
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const writingStyle = isVerticalScroll || language === 'jp' 
    ? 'vertical-rl' 
    : 'horizontal-tb';

  return (
    <div className={cn(
      "w-full relative bg-secondary/20 rounded-lg overflow-hidden border border-border/50 shadow-elegant",
      className
    )}>
      {/* Story scroll container with Japanese styling */}
      <div 
        ref={scrollContainerRef}
        className={cn(
          "overflow-auto p-6 md:p-8 max-h-[70vh]",
          language === 'jp' ? "font-sans" : "",
          writingStyle === 'vertical-rl' ? "writing-vertical" : ""
        )}
        style={{
          writingMode: writingStyle as any,
          maxHeight: '70vh',
          direction: writingStyle === 'vertical-rl' ? 'rtl' : 'ltr',
        }}
      >
        <h2 className={cn(
          "text-2xl md:text-3xl font-bold mb-6",
          writingStyle === 'vertical-rl' ? "tracking-wider" : ""
        )}>
          {storyTitle}
        </h2>
        
        <div className={cn(
          "prose prose-stone dark:prose-invert max-w-none",
          writingStyle === 'vertical-rl' ? "space-y-reverse" : "space-y-4"
        )}>
          {storyText.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className={cn(
              "leading-relaxed",
              writingStyle === 'vertical-rl' ? "text-right" : ""
            )}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      {showScrollIndicator && (
        <motion.div 
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-muted-foreground"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={24} />
        </motion.div>
      )}

      {/* Video button (if video is available) */}
      {videoUrl && (
        <div className="absolute top-4 right-4">
          <Button 
            variant="secondary" 
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setIsVideoOpen(!isVideoOpen)}
          >
            <PlayCircle size={16} />
            <span>{isVideoOpen ? 'Hide Video' : 'Watch Video'}</span>
          </Button>
        </div>
      )}

      {/* Video display */}
      {videoUrl && isVideoOpen && (
        <div className="mt-4 p-4 bg-background/90 backdrop-blur-sm border-t border-border">
          <div className="aspect-w-16 aspect-h-9">
            <iframe 
              src={videoUrl}
              title={storyTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MakimonoStoryScroll;
