
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ScrollText, Video, Map, Check, X, Plus, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

// A sample interface for the story creation form
interface StoryCreationFormProps {
  onSubmit: (storyData: any) => void;
  initialData?: any;
  isEditing?: boolean;
}

// Mock data for route selection
const mockRoutes = [
  { id: '1', nameEn: 'Kyoto Historical Route', nameJp: '京都歴史ルート' },
  { id: '2', nameEn: 'Tokyo Modern Experience', nameJp: '東京モダン体験' },
  { id: '3', nameEn: 'Hokkaido Nature Trail', nameJp: '北海道自然の道' },
];

const StoryCreationForm: React.FC<StoryCreationFormProps> = ({ 
  onSubmit, 
  initialData,
  isEditing = false
}) => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('english');
  const [storyData, setStoryData] = useState(initialData || {
    titleEn: '',
    titleJp: '',
    descriptionEn: '',
    descriptionJp: '',
    thumbnailUrl: '',
    videoUrlEn: '',
    videoUrlJp: '',
    contentEn: '',
    contentJp: '',
    isPublished: false,
    relatedRouteId: '',
    tags: [],
    chapters: []
  });
  const [newTag, setNewTag] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStoryData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setStoryData(prev => ({ ...prev, isPublished: checked }));
  };

  const handleRouteChange = (value: string) => {
    setStoryData(prev => ({ ...prev, relatedRouteId: value }));
  };

  const addTag = () => {
    if (newTag && !storyData.tags.includes(newTag)) {
      setStoryData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setStoryData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(storyData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="english" className="flex items-center">
            <span className="mr-2">🇺🇸</span> English Content
          </TabsTrigger>
          <TabsTrigger value="japanese" className="flex items-center">
            <span className="mr-2">🇯🇵</span> Japanese Content
          </TabsTrigger>
        </TabsList>
        
        {/* English Content Tab */}
        <TabsContent value="english" className="space-y-6 mt-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="titleEn">English Title</Label>
              <Input
                id="titleEn"
                name="titleEn"
                value={storyData.titleEn}
                onChange={handleChange}
                placeholder="Enter story title in English"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="descriptionEn">English Description</Label>
              <Textarea
                id="descriptionEn"
                name="descriptionEn"
                value={storyData.descriptionEn}
                onChange={handleChange}
                placeholder="Enter story description in English"
                required
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="contentEn">English Story Content</Label>
              <Textarea
                id="contentEn"
                name="contentEn"
                value={storyData.contentEn}
                onChange={handleChange}
                placeholder="Enter full story content in English"
                rows={8}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Use double line breaks to separate paragraphs.
              </p>
            </div>
            
            <div>
              <Label htmlFor="videoUrlEn">English Video URL</Label>
              <Input
                id="videoUrlEn"
                name="videoUrlEn"
                value={storyData.videoUrlEn}
                onChange={handleChange}
                placeholder="Enter YouTube or video URL for English version"
              />
            </div>
          </div>
        </TabsContent>
        
        {/* Japanese Content Tab */}
        <TabsContent value="japanese" className="space-y-6 mt-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="titleJp">Japanese Title</Label>
              <Input
                id="titleJp"
                name="titleJp"
                value={storyData.titleJp}
                onChange={handleChange}
                placeholder="日本語でタイトルを入力"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="descriptionJp">Japanese Description</Label>
              <Textarea
                id="descriptionJp"
                name="descriptionJp"
                value={storyData.descriptionJp}
                onChange={handleChange}
                placeholder="日本語で説明を入力"
                required
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="contentJp">Japanese Story Content</Label>
              <Textarea
                id="contentJp"
                name="contentJp"
                value={storyData.contentJp}
                onChange={handleChange}
                placeholder="日本語でストーリーの内容を入力"
                rows={8}
              />
              <p className="text-xs text-muted-foreground mt-1">
                段落を分けるには、二重の改行を使用してください。
              </p>
            </div>
            
            <div>
              <Label htmlFor="videoUrlJp">Japanese Video URL</Label>
              <Input
                id="videoUrlJp"
                name="videoUrlJp"
                value={storyData.videoUrlJp}
                onChange={handleChange}
                placeholder="日本語版の動画URLを入力"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Common Settings (outside tabs) */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{t('admin.media')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="thumbnailUrl">{t('admin.thumbnail')}</Label>
            <div className="flex items-center space-x-4 mt-2">
              <div className="w-32 h-24 bg-secondary/50 rounded-md overflow-hidden border border-border flex items-center justify-center">
                {storyData.thumbnailUrl ? (
                  <img 
                    src={storyData.thumbnailUrl} 
                    alt="Thumbnail" 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <Image className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <Input
                  id="thumbnailUrl"
                  name="thumbnailUrl"
                  value={storyData.thumbnailUrl}
                  onChange={handleChange}
                  placeholder="Enter thumbnail image URL"
                  className="mb-2"
                />
                <p className="text-xs text-muted-foreground">
                  This image will be used as the story thumbnail in listings.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{t('admin.info')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="isPublished">Published Status</Label>
              <p className="text-sm text-muted-foreground">
                Make this story visible to users
              </p>
            </div>
            <Switch
              id="isPublished"
              checked={storyData.isPublished}
              onCheckedChange={handleSwitchChange}
            />
          </div>
          
          <div>
            <Label htmlFor="relatedRouteId">Related Route</Label>
            <Select onValueChange={handleRouteChange} value={storyData.relatedRouteId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a related route" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {mockRoutes.map(route => (
                  <SelectItem key={route.id} value={route.id}>
                    {language === 'en' ? route.nameEn : route.nameJp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              {t('admin.relatedRouteHelp')}
            </p>
          </div>
          
          <div>
            <Label>{t('admin.tags')}</Label>
            <div className="flex items-center space-x-2 mt-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button type="button" size="sm" onClick={addTag}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {storyData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {storyData.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button 
                      type="button" 
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-destructive focus:outline-none"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              {t('admin.tagsHelp')}
            </p>
          </div>
          
          <div className="pt-4 border-t border-border">
            <p className="text-sm font-medium mb-2">{t('admin.chaptersNote')}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/30 p-3 rounded-md flex flex-col items-center justify-center text-center">
                <p className="text-sm font-medium">{t('admin.totalChapters')}</p>
                <p className="text-2xl font-bold mt-1">{storyData.chapters.length || 0}</p>
              </div>
              <div className="bg-secondary/30 p-3 rounded-md flex flex-col items-center justify-center text-center">
                <p className="text-sm font-medium">{t('admin.unlockedChapters')}</p>
                <p className="text-2xl font-bold mt-1">{
                  storyData.chapters.filter(c => !c.isLocked).length || 0
                }</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end space-x-3">
        <Button type="button" variant="outline">
          {t('admin.cancel')}
        </Button>
        <Button type="submit">
          {isEditing ? t('admin.save') : t('admin.create')}
        </Button>
      </div>
    </form>
  );
};

export default StoryCreationForm;
