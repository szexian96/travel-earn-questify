
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Lock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export type Story = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  isUnlocked: boolean;
  chapters: {
    total: number;
    unlocked: number;
  };
  relatedRouteId?: string;
  tags: string[];
};

interface StoryCardProps {
  story: Story;
}

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  },
  hover: { 
    y: -10,
    boxShadow: "0px 10px 20px rgba(0,0,0,0.15)",
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const imageVariants = {
  hover: { 
    scale: 1.08, 
    transition: { duration: 0.4 }
  }
};

const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="h-full"
    >
      <Card className="h-full overflow-hidden transition-all duration-300 tourii-card group">
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-tourii-charcoal/70 to-transparent z-10" />
          <motion.img 
            variants={imageVariants}
            src={story.thumbnail} 
            alt={story.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 z-20 p-4 w-full">
            <div className="flex flex-wrap gap-2 mb-2">
              {story.isUnlocked ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
                >
                  <Badge variant="outline" className="bg-tourii-warm-grey/80 border-tourii-warm-grey-2 text-tourii-charcoal">
                    <BookOpen className="h-3 w-3 mr-1" />
                    Unlocked
                  </Badge>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
                >
                  <Badge variant="outline" className="bg-tourii-charcoal/80 border-tourii-charcoal text-tourii-warm-grey">
                    <Lock className="h-3 w-3 mr-1" />
                    Locked
                  </Badge>
                </motion.div>
              )}
            </div>
            <motion.h3 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-white font-semibold text-xl tracking-tight line-clamp-2"
            >
              {story.title}
            </motion.h3>
          </div>
        </div>

        <CardContent className="p-4">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="text-muted-foreground line-clamp-2 text-sm"
          >
            {story.description}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex items-center mt-4 text-sm text-muted-foreground"
          >
            <BookOpen className="h-4 w-4 mr-1" />
            <span className="line-clamp-1">{story.chapters.unlocked} of {story.chapters.total} chapters unlocked</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="flex flex-wrap gap-2 mt-3"
          >
            {story.tags.slice(0, 3).map((tag, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + (i * 0.1), type: "spring", stiffness: 500 }}
              >
                <Badge variant="outline" className="bg-secondary/50">
                  {tag}
                </Badge>
              </motion.div>
            ))}
            {story.tags.length > 3 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9, type: "spring", stiffness: 500 }}
              >
                <Badge variant="outline" className="bg-secondary/50">
                  +{story.tags.length - 3}
                </Badge>
              </motion.div>
            )}
          </motion.div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <motion.div 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full"
          >
            <Button 
              className="w-full group" 
              disabled={!story.isUnlocked}
              asChild={story.isUnlocked}
            >
              {story.isUnlocked ? (
                <Link to={`/stories/${story.id}`}>
                  Continue Story
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, repeatDelay: 2, duration: 0.8 }}
                  >
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </motion.div>
                </Link>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Unlock this Story
                </>
              )}
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default StoryCard;
