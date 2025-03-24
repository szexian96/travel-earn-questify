
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Plus, Search, Filter, Edit, Trash, Eye, MoreHorizontal, ScrollText, ChevronDown, BookOpen, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import StoryCreationForm from './StoryCreationForm';
import StoryChapterManager from './StoryChapterManager';

// Mock data for stories
const mockStories = [
  {
    id: '1',
    titleEn: 'The Lost Temple of Kyoto',
    titleJp: '京都の失われた寺院',
    descriptionEn: 'Discover the secrets of an ancient temple hidden in Kyoto\'s mountains.',
    descriptionJp: '京都の山々に隠された古代寺院の秘密を発見しよう。',
    thumbnailUrl: 'https://example.com/temple.jpg',
    pdfUrlEn: 'https://example.com/temple-en.pdf',
    pdfUrlJp: 'https://example.com/temple-jp.pdf',
    isPublished: true,
    chaptersCount: 5,
    createdAt: '2023-05-15T09:30:00Z'
  },
  {
    id: '2',
    titleEn: 'Tokyo Night Lights',
    titleJp: '東京の夜の光',
    descriptionEn: 'Experience the vibrant nightlife of Tokyo\'s most exciting districts.',
    descriptionJp: '東京の最もエキサイティングな地区の活気ある夜の生活を体験しよう。',
    thumbnailUrl: 'https://example.com/tokyo.jpg',
    pdfUrlEn: 'https://example.com/tokyo-en.pdf',
    pdfUrlJp: 'https://example.com/tokyo-jp.pdf',
    isPublished: true,
    chaptersCount: 3,
    createdAt: '2023-06-20T14:15:00Z'
  },
  {
    id: '3',
    titleEn: 'Hokkaido Winter Tales',
    titleJp: '北海道の冬物語',
    descriptionEn: 'Journey through the snow-covered landscapes of Japan\'s northern island.',
    descriptionJp: '日本の北の島の雪に覆われた風景を旅しよう。',
    thumbnailUrl: 'https://example.com/hokkaido.jpg',
    pdfUrlEn: '',
    pdfUrlJp: '',
    isPublished: false,
    chaptersCount: 4,
    createdAt: '2023-07-05T11:45:00Z'
  }
];

const StoriesManagement: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreatingStory, setIsCreatingStory] = useState(false);
  const [isEditingStory, setIsEditingStory] = useState(false);
  const [isManagingChapters, setIsManagingChapters] = useState(false);
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('stories');

  // Filter stories based on search term
  const filteredStories = mockStories.filter(story => {
    const title = language === 'en' ? story.titleEn : story.titleJp;
    return title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleCreateStory = (storyData: any) => {
    console.log('Creating story:', storyData);
    setIsCreatingStory(false);
    // In a real implementation, you would send this data to your API
  };

  const handleEditStory = (story: any) => {
    setSelectedStory(story);
    setIsEditingStory(true);
  };

  const handleManageChapters = (story: any) => {
    setSelectedStory(story);
    setIsManagingChapters(true);
  };

  const handleUpdateStory = (storyData: any) => {
    console.log('Updating story:', storyData);
    setIsEditingStory(false);
    setSelectedStory(null);
    // In a real implementation, you would send this data to your API
  };

  const handleDeleteStory = (story: any) => {
    setSelectedStory(story);
    setShowDeleteDialog(true);
  };

  const confirmDeleteStory = () => {
    console.log('Deleting story:', selectedStory);
    setShowDeleteDialog(false);
    setSelectedStory(null);
    // In a real implementation, you would delete this story via your API
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{t('admin.stories')}</h1>
          <p className="text-muted-foreground">
            Create and manage immersive stories in both English and Japanese.
          </p>
        </div>
        <Button onClick={() => setIsCreatingStory(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {t('admin.createStory')}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="stories" className="flex items-center">
            <ScrollText className="mr-2 h-4 w-4" />
            Stories
          </TabsTrigger>
          <TabsTrigger value="chapters" className="flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            Chapters
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="stories" className="space-y-6 mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t('admin.search')}
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="ml-2" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">{t('admin.title')}</TableHead>
                      <TableHead>{t('admin.status')}</TableHead>
                      <TableHead>Chapters</TableHead>
                      <TableHead>PDF</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>{t('admin.actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStories.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          {t('admin.noData')}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredStories.map((story) => (
                        <TableRow key={story.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              {story.thumbnailUrl && (
                                <div className="w-10 h-10 rounded overflow-hidden bg-secondary flex-shrink-0">
                                  <img 
                                    src={story.thumbnailUrl} 
                                    alt={language === 'en' ? story.titleEn : story.titleJp} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <div>
                                <div className="font-medium">
                                  {language === 'en' ? story.titleEn : story.titleJp}
                                </div>
                                <div className="text-sm text-muted-foreground line-clamp-1">
                                  {language === 'en' ? story.descriptionEn : story.descriptionJp}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={story.isPublished ? "default" : "secondary"}
                              className="capitalize"
                            >
                              {story.isPublished ? t('admin.published') : t('admin.draft')}
                            </Badge>
                          </TableCell>
                          <TableCell>{story.chaptersCount}</TableCell>
                          <TableCell>
                            {(story.pdfUrlEn || story.pdfUrlJp) ? (
                              <Badge variant="outline" className="bg-secondary/50 flex items-center gap-1">
                                <FileText className="h-3 w-3" />
                                PDF
                              </Badge>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {new Date(story.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-[160px]">
                                <DropdownMenuItem onClick={() => handleEditStory(story)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  {t('admin.edit')}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleManageChapters(story)}>
                                  <BookOpen className="h-4 w-4 mr-2" />
                                  Manage Chapters
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => console.log('Preview story:', story)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  {t('admin.preview')}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteStory(story)}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash className="h-4 w-4 mr-2" />
                                  {t('admin.delete')}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="chapters" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Chapter Management</CardTitle>
              <CardDescription>
                Create and manage chapters for your stories.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="py-20 text-center text-muted-foreground">
                Select a story from the Stories tab to manage its chapters.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Story Dialog */}
      <Dialog open={isCreatingStory} onOpenChange={setIsCreatingStory}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t('admin.createStory')}</DialogTitle>
            <DialogDescription>
              Create a new story with content in both English and Japanese.
            </DialogDescription>
          </DialogHeader>
          <StoryCreationForm onSubmit={handleCreateStory} />
        </DialogContent>
      </Dialog>

      {/* Edit Story Dialog */}
      <Dialog open={isEditingStory} onOpenChange={setIsEditingStory}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Story</DialogTitle>
            <DialogDescription>
              Update this story's content and settings.
            </DialogDescription>
          </DialogHeader>
          <StoryCreationForm 
            onSubmit={handleUpdateStory} 
            initialData={selectedStory}
            isEditing 
          />
        </DialogContent>
      </Dialog>

      {/* Manage Chapters Dialog */}
      <Dialog open={isManagingChapters} onOpenChange={setIsManagingChapters}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Manage Chapters</DialogTitle>
            <DialogDescription>
              Add, edit and organize chapters for this story.
            </DialogDescription>
          </DialogHeader>
          {selectedStory && (
            <StoryChapterManager
              storyId={selectedStory.id}
              storyTitle={language === 'en' ? selectedStory.titleEn : selectedStory.titleJp}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('admin.confirmDelete')}</DialogTitle>
            <DialogDescription>
              {t('admin.deleteStoryConfirm')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              {t('admin.cancel')}
            </Button>
            <Button variant="destructive" onClick={confirmDeleteStory}>
              {t('admin.delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StoriesManagement;
