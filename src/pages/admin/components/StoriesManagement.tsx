
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setStories, addStory, updateStory, deleteStory } from '@/redux/slices/storiesSlice';
import { Story } from '@/components/StoryCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  ScrollText, 
  Plus, 
  Pencil, 
  Trash2, 
  Check, 
  X, 
  Globe, 
  Video, 
  Upload, 
  Link as LinkIcon,
  Tag,
  Map
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for story chapters - would come from API in real app
const mockChapters = [
  { id: 'ch-1', title: 'Chapter 1: Beginning', unlocked: true },
  { id: 'ch-2', title: 'Chapter 2: Discovery', unlocked: true },
  { id: 'ch-3', title: 'Chapter 3: Challenge', unlocked: false },
];

const StoriesManagement = () => {
  const dispatch = useDispatch();
  const stories = useSelector((state: RootState) => state.stories.items);
  const { toast } = useToast();
  const { t, language } = useLanguage();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [activeStoryTab, setActiveStoryTab] = useState<string>('info');
  const [activeLangTab, setActiveLangTab] = useState<string>(language);
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [storyToDelete, setStoryToDelete] = useState<string | null>(null);

  useEffect(() => {
    // Set the active language tab based on the current interface language
    setActiveLangTab(language);
  }, [language]);

  // Form state
  const [formData, setFormData] = useState({
    // English content
    title_en: '',
    description_en: '',
    thumbnail_en: '',
    video_en: '',
    
    // Japanese content
    title_jp: '',
    description_jp: '',
    thumbnail_jp: '',
    video_jp: '',
    
    // Shared properties
    isUnlocked: false,
    totalChapters: 5,
    unlockedChapters: 0,
    relatedRouteId: '',
    tags: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData({ ...formData, isUnlocked: checked });
  };

  const resetForm = () => {
    setFormData({
      title_en: '',
      description_en: '',
      thumbnail_en: '',
      video_en: '',
      title_jp: '',
      description_jp: '',
      thumbnail_jp: '',
      video_jp: '',
      isUnlocked: false,
      totalChapters: 5,
      unlockedChapters: 0,
      relatedRouteId: '',
      tags: '',
    });
    setCurrentStory(null);
    setActiveStoryTab('info');
    setActiveLangTab(language);
  };

  const handleAddEditDialogOpen = (story?: Story) => {
    if (story) {
      setCurrentStory(story);
      // In a real app, these fields would come from the database with separate language entries
      // For now, we're simulating this by using the same content
      setFormData({
        title_en: story.title,
        description_en: story.description,
        thumbnail_en: story.thumbnail,
        video_en: '', // Would be pulled from DB
        title_jp: story.title, // Would be the Japanese version from DB
        description_jp: story.description, // Would be the Japanese version from DB
        thumbnail_jp: story.thumbnail, // Would be the Japanese version from DB
        video_jp: '', // Would be pulled from DB
        isUnlocked: story.isUnlocked,
        totalChapters: story.chapters.total,
        unlockedChapters: story.chapters.unlocked,
        relatedRouteId: story.relatedRouteId || '',
        tags: story.tags.join(', '),
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDeleteDialogOpen = (id: string) => {
    setStoryToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
    setStoryToDelete(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would save both language versions to the database
    // For this demo, we'll just use the active language content
    const useEnglish = activeLangTab === 'en';
    
    const storyData: Story = {
      id: currentStory ? currentStory.id : `story-${Date.now()}`,
      title: useEnglish ? formData.title_en : formData.title_jp,
      description: useEnglish ? formData.description_en : formData.description_jp,
      thumbnail: useEnglish ? formData.thumbnail_en : formData.thumbnail_jp,
      isUnlocked: formData.isUnlocked,
      chapters: {
        total: Number(formData.totalChapters),
        unlocked: Number(formData.unlockedChapters),
      },
      relatedRouteId: formData.relatedRouteId || undefined,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    };

    // In a real app, we would save both language versions here
    if (currentStory) {
      dispatch(updateStory(storyData));
      toast({
        title: t('admin.success'),
        description: `"${storyData.title}" ${t('admin.edit').toLowerCase()}`,
      });
    } else {
      dispatch(addStory(storyData));
      toast({
        title: t('admin.success'),
        description: `"${storyData.title}" ${t('admin.create').toLowerCase()}`,
      });
    }

    handleDialogClose();
  };

  const handleDelete = () => {
    if (storyToDelete) {
      dispatch(deleteStory(storyToDelete));
      toast({
        title: t('admin.success'),
        description: t('admin.delete'),
        variant: "destructive",
      });
      handleDeleteDialogClose();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <ScrollText className="mr-2 h-7 w-7" />
            {t('admin.stories')}
          </h1>
          <p className="text-muted-foreground">{t('admin.contentLocalization')}</p>
        </div>
        <Button onClick={() => handleAddEditDialogOpen()}>
          <Plus className="mr-2 h-4 w-4" />
          {t('admin.createStory')}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t('admin.stories')}</CardTitle>
              <CardDescription>
                {t('admin.contentLocalization')}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Globe className="h-4 w-4 mr-2" />
                {language === 'en' ? 'English' : '日本語'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('admin.title')}</TableHead>
                <TableHead>{t('admin.status')}</TableHead>
                <TableHead className="hidden md:table-cell">{t('story.chapters')}</TableHead>
                <TableHead className="hidden md:table-cell">{t('admin.tags')}</TableHead>
                <TableHead>{t('admin.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    {t('admin.noData')}
                  </TableCell>
                </TableRow>
              ) : (
                stories.map((story) => (
                  <TableRow key={story.id}>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        {story.title}
                        <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {story.description.substring(0, 60)}...
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {story.isUnlocked ? (
                        <Badge className="bg-green-600">
                          <Check className="mr-1 h-3 w-3" />
                          {t('admin.published')}
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          <X className="mr-1 h-3 w-3" />
                          {t('admin.draft')}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {story.chapters.unlocked} / {story.chapters.total}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {story.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleAddEditDialogOpen(story)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteDialogOpen(story.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Story Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentStory ? t('admin.edit') : t('admin.createStory')}
            </DialogTitle>
            <DialogDescription>
              {t('admin.contentLocalization')}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Story Content Tabs */}
            <Tabs defaultValue="info" value={activeStoryTab} onValueChange={setActiveStoryTab}>
              <TabsList className="w-full">
                <TabsTrigger value="info" className="flex-1">
                  <ScrollText className="h-4 w-4 mr-2" />
                  {t('admin.info')}
                </TabsTrigger>
                <TabsTrigger value="media" className="flex-1">
                  <Video className="h-4 w-4 mr-2" />
                  {t('admin.media')}
                </TabsTrigger>
                <TabsTrigger value="chapters" className="flex-1">
                  <ScrollText className="h-4 w-4 mr-2" />
                  {t('story.chapters')}
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex-1">
                  <Map className="h-4 w-4 mr-2" />
                  {t('admin.settings')}
                </TabsTrigger>
              </TabsList>

              {/* Language Selection Tabs */}
              <div className="pt-4 pb-2">
                <Tabs defaultValue={language} value={activeLangTab} onValueChange={setActiveLangTab}>
                  <TabsList className="inline-flex">
                    <TabsTrigger value="en" className="data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900/40">
                      🇺🇸 English
                    </TabsTrigger>
                    <TabsTrigger value="jp" className="data-[state=active]:bg-red-100 dark:data-[state=active]:bg-red-900/40">
                      🇯🇵 日本語
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Info Tab */}
              <TabsContent value="info" className="space-y-4 py-2">
                {/* English Content */}
                <TabsContent value="en" className="mt-0 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title_en">{t('admin.title')} (English)</Label>
                    <Input
                      id="title_en"
                      name="title_en"
                      value={formData.title_en}
                      onChange={handleInputChange}
                      placeholder="Enter story title in English"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description_en">{t('admin.description')} (English)</Label>
                    <Textarea
                      id="description_en"
                      name="description_en"
                      value={formData.description_en}
                      onChange={handleInputChange}
                      placeholder="Enter story description in English"
                      required
                      rows={5}
                    />
                  </div>
                </TabsContent>

                {/* Japanese Content */}
                <TabsContent value="jp" className="mt-0 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title_jp">{t('admin.title')} (日本語)</Label>
                    <Input
                      id="title_jp"
                      name="title_jp"
                      value={formData.title_jp}
                      onChange={handleInputChange}
                      placeholder="ストーリーのタイトルを入力"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description_jp">{t('admin.description')} (日本語)</Label>
                    <Textarea
                      id="description_jp"
                      name="description_jp"
                      value={formData.description_jp}
                      onChange={handleInputChange}
                      placeholder="ストーリーの説明を入力"
                      required
                      rows={5}
                    />
                  </div>
                </TabsContent>

                <div className="space-y-2">
                  <Label htmlFor="tags">{t('admin.tags')} (All Languages)</Label>
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                    <Input
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      placeholder="Enter tags separated by commas"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t('admin.tagsHelp')}
                  </p>
                </div>
              </TabsContent>

              {/* Media Tab */}
              <TabsContent value="media" className="space-y-4 py-2">
                {/* English Media */}
                <TabsContent value="en" className="mt-0 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="thumbnail_en">{t('admin.thumbnail')} (English)</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="thumbnail_en"
                        name="thumbnail_en"
                        value={formData.thumbnail_en}
                        onChange={handleInputChange}
                        placeholder="Enter image URL or upload"
                      />
                      <Button type="button" variant="outline" size="icon">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="video_en">{t('story.watchVideo')} URL (English)</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="video_en"
                        name="video_en"
                        value={formData.video_en}
                        onChange={handleInputChange}
                        placeholder="Enter YouTube or video URL"
                      />
                      <Button type="button" variant="outline" size="icon">
                        <LinkIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      YouTube, Vimeo, or direct video URL
                    </p>
                  </div>

                  {formData.thumbnail_en && (
                    <div className="mt-4">
                      <Label>{t('admin.preview')}</Label>
                      <div className="mt-2 w-full h-40 rounded-md border overflow-hidden">
                        <img
                          src={formData.thumbnail_en}
                          alt="Thumbnail preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Invalid+Image+URL';
                          }}
                        />
                      </div>
                    </div>
                  )}
                </TabsContent>

                {/* Japanese Media */}
                <TabsContent value="jp" className="mt-0 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="thumbnail_jp">{t('admin.thumbnail')} (日本語)</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="thumbnail_jp"
                        name="thumbnail_jp"
                        value={formData.thumbnail_jp}
                        onChange={handleInputChange}
                        placeholder="画像URLを入力するかアップロード"
                      />
                      <Button type="button" variant="outline" size="icon">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="video_jp">{t('story.watchVideo')} URL (日本語)</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="video_jp"
                        name="video_jp"
                        value={formData.video_jp}
                        onChange={handleInputChange}
                        placeholder="YouTubeまたは動画URLを入力"
                      />
                      <Button type="button" variant="outline" size="icon">
                        <LinkIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      YouTube、Vimeo、または直接動画URL
                    </p>
                  </div>

                  {formData.thumbnail_jp && (
                    <div className="mt-4">
                      <Label>{t('admin.preview')}</Label>
                      <div className="mt-2 w-full h-40 rounded-md border overflow-hidden">
                        <img
                          src={formData.thumbnail_jp}
                          alt="サムネイルプレビュー"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=無効な画像URL';
                          }}
                        />
                      </div>
                    </div>
                  )}
                </TabsContent>
              </TabsContent>

              {/* Chapters Tab */}
              <TabsContent value="chapters" className="space-y-4 py-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{t('story.chapters')}</h3>
                  <Button size="sm" variant="outline" type="button">
                    <Plus className="h-4 w-4 mr-2" />
                    {t('admin.addChapter')}
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-4">
                    <div className="w-full">
                      <Label htmlFor="totalChapters">{t('admin.totalChapters')}</Label>
                      <Input
                        id="totalChapters"
                        name="totalChapters"
                        type="number"
                        min="1"
                        value={formData.totalChapters}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div className="w-full">
                      <Label htmlFor="unlockedChapters">{t('admin.unlockedChapters')}</Label>
                      <Input
                        id="unlockedChapters"
                        name="unlockedChapters"
                        type="number"
                        min="0"
                        max={formData.totalChapters}
                        value={formData.unlockedChapters}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">#</TableHead>
                        <TableHead>{t('admin.title')}</TableHead>
                        <TableHead className="w-[100px]">{t('admin.status')}</TableHead>
                        <TableHead className="w-[100px]">{t('admin.actions')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockChapters.map((chapter, index) => (
                        <TableRow key={chapter.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{chapter.title}</TableCell>
                          <TableCell>
                            {chapter.unlocked ? (
                              <Badge variant="default" className="bg-green-600">
                                {t('passport.unlocked')}
                              </Badge>
                            ) : (
                              <Badge variant="outline">
                                {t('story.lockedContent')}
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="icon">
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-red-500">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <p className="text-sm text-muted-foreground">
                  {t('admin.chaptersNote')}
                </p>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-4 py-2">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isUnlocked"
                      checked={formData.isUnlocked}
                      onCheckedChange={handleSwitchChange}
                    />
                    <Label htmlFor="isUnlocked">{t('admin.published')}</Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="relatedRouteId">{t('story.relatedSpots')}</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="relatedRouteId"
                        name="relatedRouteId"
                        value={formData.relatedRouteId}
                        onChange={handleInputChange}
                        placeholder="Select related route or spot"
                      />
                      <Button type="button" variant="outline" size="icon">
                        <Map className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {t('admin.relatedRouteHelp')}
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleDialogClose}>
                {t('app.cancel')}
              </Button>
              <Button type="submit">
                {currentStory ? t('admin.save') : t('admin.create')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('admin.confirmDelete')}</DialogTitle>
            <DialogDescription>
              {t('admin.deleteStoryConfirm')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleDeleteDialogClose}>
              {t('app.cancel')}
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              {t('app.delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StoriesManagement;
