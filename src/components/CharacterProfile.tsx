
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { User, MapPin, Quote } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';

export interface Character {
  id: string;
  nameEn: string;
  nameJp: string;
  role: string;
  locationEn: string;
  locationJp: string;
  quoteEn: string;
  quoteJp: string;
  descriptionEn: string;
  descriptionJp: string;
  imageUrl: string;
  relatedQuests?: string[];
  relatedStories?: string[];
}

interface CharacterProfileProps {
  character: Character;
  compact?: boolean;
}

const CharacterProfile: React.FC<CharacterProfileProps> = ({ 
  character, 
  compact = false 
}) => {
  const { language } = useLanguage();
  
  const name = language === 'en' ? character.nameEn : character.nameJp;
  const location = language === 'en' ? character.locationEn : character.locationJp;
  const quote = language === 'en' ? character.quoteEn : character.quoteJp;
  const description = language === 'en' ? character.descriptionEn : character.descriptionJp;

  if (compact) {
    return (
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 h-full">
        <div className="flex items-center p-4">
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
            <img src={character.imageUrl} alt={name} className="w-full h-full object-cover" />
          </div>
          <div className="ml-4">
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground flex items-center">
              <User size={14} className="mr-1" /> {character.role}
            </p>
            {location && (
              <p className="text-sm text-muted-foreground flex items-center mt-1">
                <MapPin size={14} className="mr-1" /> {location}
              </p>
            )}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden bg-card">
      <div className="sm:flex">
        <div className="sm:w-1/3 bg-muted">
          <AspectRatio ratio={3/4} className="bg-muted">
            <img 
              src={character.imageUrl} 
              alt={name} 
              className="w-full h-full object-cover" 
            />
          </AspectRatio>
        </div>
        <div className="sm:w-2/3 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-semibold">{name}</h2>
              <p className="text-muted-foreground">{character.role}</p>
            </div>
            
            {language === 'jp' && character.nameEn && (
              <Badge variant="outline" className="text-xs">
                {character.nameEn}
              </Badge>
            )}
          </div>
          
          {location && (
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <MapPin size={16} className="mr-2" />
              <span>{location}</span>
            </div>
          )}
          
          {quote && (
            <div className="bg-secondary/30 rounded-lg p-4 mb-6 relative">
              <Quote size={16} className="absolute top-2 left-2 text-primary/30" />
              <p className="italic text-sm pl-4">"{quote}"</p>
            </div>
          )}
          
          <div className="space-y-4">
            {description.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-sm leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          
          {(character.relatedQuests?.length || character.relatedStories?.length) && (
            <div className="mt-6 pt-4 border-t border-border">
              <h3 className="text-sm font-semibold mb-2">Related Content:</h3>
              <div className="flex flex-wrap gap-2">
                {character.relatedQuests?.map(quest => (
                  <Badge key={quest} variant="secondary">{quest}</Badge>
                ))}
                {character.relatedStories?.map(story => (
                  <Badge key={story} variant="outline">{story}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CharacterProfile;
