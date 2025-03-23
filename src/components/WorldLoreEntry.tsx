
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ScrollText, Map } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface WorldLoreEntry {
  id: string;
  titleEn: string;
  titleJp: string;
  categoryEn: string;
  categoryJp: string;
  contentEn: string;
  contentJp: string;
  imageUrl?: string;
  relatedLocations?: {
    nameEn: string;
    nameJp: string;
    id: string;
  }[];
  tags?: string[];
}

interface WorldLoreEntryProps {
  lore: WorldLoreEntry;
}

const WorldLoreEntry: React.FC<WorldLoreEntryProps> = ({ lore }) => {
  const { language } = useLanguage();
  
  const title = language === 'en' ? lore.titleEn : lore.titleJp;
  const category = language === 'en' ? lore.categoryEn : lore.categoryJp;
  const content = language === 'en' ? lore.contentEn : lore.contentJp;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className="mb-2">
              {category}
            </Badge>
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
          <ScrollText className="text-muted-foreground h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          {lore.imageUrl && (
            <div className="md:w-1/3">
              <img 
                src={lore.imageUrl} 
                alt={title} 
                className="w-full h-auto rounded-md object-cover aspect-video md:aspect-square" 
              />
            </div>
          )}
          
          <div className={lore.imageUrl ? "md:w-2/3" : "w-full"}>
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="content">Content</TabsTrigger>
                {lore.relatedLocations?.length > 0 && (
                  <TabsTrigger value="locations">Related Locations</TabsTrigger>
                )}
              </TabsList>
              
              <TabsContent value="content" className="mt-0">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {content.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
                
                {lore.tags && lore.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {lore.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              {lore.relatedLocations?.length > 0 && (
                <TabsContent value="locations" className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {lore.relatedLocations.map(location => (
                      <div 
                        key={location.id}
                        className="flex items-center p-3 bg-secondary/30 rounded-md"
                      >
                        <Map className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{language === 'en' ? location.nameEn : location.nameJp}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorldLoreEntry;
