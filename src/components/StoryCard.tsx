
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Lock, ChevronRight } from 'lucide-react';

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

const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden transition-all duration-300 hover-lift tourii-card group">
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-tourii-charcoal/70 to-transparent z-10" />
          <img 
            src={story.thumbnail} 
            alt={story.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 z-20 p-4 w-full">
            <div className="flex flex-wrap gap-2 mb-2">
              {story.isUnlocked ? (
                <Badge variant="outline" className="bg-tourii-warm-grey/80 border-tourii-warm-grey-2 text-tourii-charcoal">
                  <BookOpen className="h-3 w-3 mr-1" />
                  Unlocked
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-tourii-charcoal/80 border-tourii-charcoal text-tourii-warm-grey">
                  <Lock className="h-3 w-3 mr-1" />
                  Locked
                </Badge>
              )}
            </div>
            <h3 className="text-white font-semibold text-xl tracking-tight line-clamp-2">
              {story.title}
            </h3>
          </div>
        </div>

        <CardContent className="p-4">
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {story.description}
          </p>
          
          <div className="flex items-center mt-4 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4 mr-1" />
            <span className="line-clamp-1">{story.chapters.unlocked} of {story.chapters.total} chapters unlocked</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {story.tags.slice(0, 3).map((tag, i) => (
              <Badge key={i} variant="outline" className="bg-secondary/50">
                {tag}
              </Badge>
            ))}
            {story.tags.length > 3 && (
              <Badge variant="outline" className="bg-secondary/50">
                +{story.tags.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button className="w-full group" disabled={!story.isUnlocked}>
            {story.isUnlocked ? (
              <>
                Continue Story
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            ) : (
              <>
                <Lock className="mr-2 h-4 w-4" />
                Unlock this Story
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default StoryCard;
