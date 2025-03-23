
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { LucideIcon, ChevronRight, BookOpen, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface StoryChapter {
  id: string;
  numberLabel: string; // e.g. "Chapter 1" or "Episode 1"
  titleEn: string;
  titleJp: string;
  descriptionEn: string;
  descriptionJp: string;
  durationMinutes: number;
  isLocked: boolean;
  thumbnailUrl?: string;
}

interface StoryChaptersNavProps {
  chapters: StoryChapter[];
  currentChapterId?: string;
  onChapterSelect: (chapterId: string) => void;
  className?: string;
}

const StoryChaptersNav: React.FC<StoryChaptersNavProps> = ({
  chapters,
  currentChapterId,
  onChapterSelect,
  className
}) => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-0">
        <div className="py-3 px-4 bg-secondary/50 border-b border-border">
          <h3 className="font-medium">{t('story.chapters')}</h3>
        </div>
        
        <div className="max-h-[500px] overflow-y-auto">
          {chapters.map((chapter) => {
            const title = language === 'en' ? chapter.titleEn : chapter.titleJp;
            const description = language === 'en' ? chapter.descriptionEn : chapter.descriptionJp;
            const isActive = chapter.id === currentChapterId;
            
            return (
              <div 
                key={chapter.id}
                className={cn(
                  "border-b border-border last:border-b-0",
                  isActive ? "bg-secondary/50" : "hover:bg-secondary/20"
                )}
              >
                <button
                  className={cn(
                    "w-full text-left p-4 transition-colors flex items-start gap-3",
                    chapter.isLocked ? "opacity-60" : ""
                  )}
                  onClick={() => {
                    if (!chapter.isLocked) {
                      onChapterSelect(chapter.id);
                    }
                  }}
                  disabled={chapter.isLocked}
                >
                  {chapter.thumbnailUrl ? (
                    <div className="flex-shrink-0 w-16 h-16 rounded overflow-hidden relative">
                      <img 
                        src={chapter.thumbnailUrl} 
                        alt={title} 
                        className="w-full h-full object-cover" 
                      />
                      {chapter.isLocked && (
                        <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      {chapter.isLocked ? (
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <BookOpen className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">{chapter.numberLabel}</span>
                      <span className="text-xs text-muted-foreground">{chapter.durationMinutes} min</span>
                    </div>
                    <h4 className="font-medium text-sm mt-1 truncate">{title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{description}</p>
                  </div>
                  
                  {isActive && <ChevronRight className="h-5 w-5 flex-shrink-0 text-primary" />}
                </button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryChaptersNav;
