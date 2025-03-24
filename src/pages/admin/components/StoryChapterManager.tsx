
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Plus, Edit, Trash, Lock, Unlock, ArrowUp, ArrowDown, MoreHorizontal, FileText, Video, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';

interface StoryChapterManagerProps {
  storyId: string;
  storyTitle: string;
}

interface ChapterData {
  id: string;
  numberLabel: string;
  titleEn: string;
  titleJp: string;
  descriptionEn: string;
  descriptionJp: string;
  durationMinutes: number;
  isLocked: boolean;
  videoUrlEn: string;
  videoUrlJp: string;
  pdfUrlEn: string;
  pdfUrlJp: string;
  order: number;
}

// Mock data for chapters
const mockChapters: ChapterData[] = [
  {
    id: 'ch1',
    numberLabel: 'Chapter 1',
    titleEn: 'The Discovery',
    titleJp: '発見',
    descriptionEn: 'The initial discovery of the ancient temple.',
    descriptionJp: '古代寺院の最初の発見。',
    durationMinutes: 10,
    isLocked: false,
    videoUrlEn: 'https://www.youtube.com/watch?v=abc123',
    videoUrlJp: 'https://www.youtube.com/watch?v=def456',
    pdfUrlEn: 'https://example.com/chapter1-en.pdf',
    pdfUrlJp: 'https://example.com/chapter1-jp.pdf',
    order: 1
  },
  {
    id: 'ch2',
    numberLabel: 'Chapter 2',
    titleEn: 'The Journey Begins',
    titleJp: '旅の始まり',
    descriptionEn: 'Setting out to explore the temple ruins.',
    descriptionJp: '寺院の遺跡を探索するために出発。',
    durationMinutes: 15,
    isLocked: false,
    videoUrlEn: 'https://www.youtube.com/watch?v=ghi789',
    videoUrlJp: 'https://www.youtube.com/watch?v=jkl012',
    pdfUrlEn: 'https://example.com/chapter2-en.pdf',
    pdfUrlJp: 'https://example.com/chapter2-jp.pdf',
    order: 2
  },
  {
    id: 'ch3',
    numberLabel: 'Chapter 3',
    titleEn: 'Hidden Secrets',
    titleJp: '隠された秘密',
    descriptionEn: 'Discovering the temple\'s mysterious past.',
    descriptionJp: '寺院の謎めいた過去を発見する。',
    durationMinutes: 12,
    isLocked: true,
    videoUrlEn: 'https://www.youtube.com/watch?v=mno345',
    videoUrlJp: 'https://www.youtube.com/watch?v=pqr678',
    pdfUrlEn: 'https://example.com/chapter3-en.pdf',
    pdfUrlJp: 'https://example.com/chapter3-jp.pdf',
    order: 3
  }
];

const StoryChapterManager: React.FC<StoryChapterManagerProps> = ({ storyId, storyTitle }) => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [chapters, setChapters] = useState<ChapterData[]>(mockChapters);
  const [isAddingChapter, setIsAddingChapter] = useState(false);
  const [isEditingChapter, setIsEditingChapter] = useState(false);
  const [isDeletingChapter, setIsDeletingChapter] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<ChapterData | null>(null);
  const [activeTab, setActiveTab] = useState('english');
  const [formData, setFormData] = useState<Partial<ChapterData>>({
    numberLabel: '',
    titleEn: '',
    titleJp: '',
    descriptionEn: '',
    descriptionJp: '',
    durationMinutes: 0,
    isLocked: false,
    videoUrlEn: '',
    videoUrlJp: '',
    pdfUrlEn: '',
    pdfUrlJp: '',
  });

  const handleAddChapter = () => {
    setFormData({
      numberLabel: `Chapter ${chapters.length + 1}`,
      titleEn: '',
      titleJp: '',
      descriptionEn: '',
      descriptionJp: '',
      durationMinutes: 0,
      isLocked: true,
      videoUrlEn: '',
      videoUrlJp: '',
      pdfUrlEn: '',
      pdfUrlJp: '',
    });
    setIsAddingChapter(true);
  };

  const handleEditChapter = (chapter: ChapterData) => {
    setSelectedChapter(chapter);
    setFormData(chapter);
    setIsEditingChapter(true);
  };

  const handleDeleteChapter = (chapter: ChapterData) => {
    setSelectedChapter(chapter);
    setIsDeletingChapter(true);
  };

  const handleLockToggle = (chapterId: string) => {
    setChapters(prev => 
      prev.map(ch => 
        ch.id === chapterId ? { ...ch, isLocked: !ch.isLocked } : ch
      )
    );
    
    toast({
      title: 'Chapter updated',
      description: 'The chapter lock status has been updated',
    });
  };

  const handleMoveChapter = (chapterId: string, direction: 'up' | 'down') => {
    const currentIndex = chapters.findIndex(ch => ch.id === chapterId);
    if (
      (direction === 'up' && currentIndex === 0) || 
      (direction === 'down' && currentIndex === chapters.length - 1)
    ) {
      return;
    }

    const newChapters = [...chapters];
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    // Swap chapters
    [newChapters[currentIndex], newChapters[targetIndex]] = 
    [newChapters[targetIndex], newChapters[currentIndex]];
    
    // Update order numbers
    newChapters.forEach((ch, index) => {
      ch.order = index + 1;
      ch.numberLabel = `Chapter ${index + 1}`;
    });
    
    setChapters(newChapters);
    
    toast({
      title: 'Chapter moved',
      description: `Chapter has been moved ${direction}`,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isLocked: checked }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setFormData(prev => ({ ...prev, durationMinutes: value }));
    }
  };

  const handleSaveChapter = () => {
    if (isAddingChapter) {
      const newChapter: ChapterData = {
        id: `ch${Date.now()}`,
        order: chapters.length + 1,
        ...formData as Omit<ChapterData, 'id' | 'order'>
      };
      
      setChapters(prev => [...prev, newChapter]);
      toast({
        title: 'Chapter added',
        description: 'New chapter has been added to the story',
      });
    } else if (isEditingChapter && selectedChapter) {
      setChapters(prev => 
        prev.map(ch => ch.id === selectedChapter.id ? { ...ch, ...formData } : ch)
      );
      toast({
        title: 'Chapter updated',
        description: 'Chapter has been updated successfully',
      });
    }
    
    setIsAddingChapter(false);
    setIsEditingChapter(false);
    setSelectedChapter(null);
    setFormData({});
  };

  const handleConfirmDelete = () => {
    if (selectedChapter) {
      setChapters(prev => prev.filter(ch => ch.id !== selectedChapter.id));
      
      // Update order and chapter numbers
      const updatedChapters = chapters
        .filter(ch => ch.id !== selectedChapter.id)
        .map((ch, index) => ({
          ...ch,
          order: index + 1,
          numberLabel: `Chapter ${index + 1}`
        }));
      
      setChapters(updatedChapters);
      
      toast({
        title: 'Chapter deleted',
        description: 'The chapter has been removed from the story',
      });
    }
    
    setIsDeletingChapter(false);
    setSelectedChapter(null);
  };

  const getFileStatus = (url: string) => {
    if (!url) return <Badge variant="outline" className="text-muted-foreground">Missing</Badge>;
    return <Badge variant="outline" className="bg-secondary/50">Uploaded</Badge>;
  };

  const sortedChapters = [...chapters].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">Story</p>
          <h2 className="text-xl font-semibold">{storyTitle}</h2>
        </div>
        <Button onClick={handleAddChapter}>
          <Plus className="mr-2 h-4 w-4" />
          Add Chapter
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Chapters</CardTitle>
          <CardDescription>
            Manage the chapters for this story. Arrange them in the correct order and control which ones are locked.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Chapter</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="w-[100px]">Duration</TableHead>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead className="w-[120px]">Files</TableHead>
                  <TableHead className="w-[150px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedChapters.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No chapters found
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedChapters.map((chapter) => (
                    <TableRow key={chapter.id}>
                      <TableCell className="font-medium">
                        {chapter.numberLabel}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {language === 'en' ? chapter.titleEn : chapter.titleJp}
                        </div>
                        <div className="text-sm text-muted-foreground truncate max-w-[250px]">
                          {language === 'en' ? chapter.descriptionEn : chapter.descriptionJp}
                        </div>
                      </TableCell>
                      <TableCell>
                        {chapter.durationMinutes} min
                      </TableCell>
                      <TableCell>
                        <Badge variant={chapter.isLocked ? "secondary" : "default"}>
                          {chapter.isLocked ? 'Locked' : 'Unlocked'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1">
                            <Video className="h-3 w-3" />
                            <span className="text-xs">Video:</span>
                            {getFileStatus(chapter.videoUrlEn)}
                          </div>
                          <div className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            <span className="text-xs">PDF:</span>
                            {getFileStatus(chapter.pdfUrlEn)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleMoveChapter(chapter.id, 'up')}
                            disabled={chapter.order === 1}
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleMoveChapter(chapter.id, 'down')}
                            disabled={chapter.order === chapters.length}
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditChapter(chapter)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleLockToggle(chapter.id)}>
                                {chapter.isLocked ? (
                                  <>
                                    <Unlock className="h-4 w-4 mr-2" />
                                    Unlock
                                  </>
                                ) : (
                                  <>
                                    <Lock className="h-4 w-4 mr-2" />
                                    Lock
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDeleteChapter(chapter)}
                              >
                                <Trash className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Chapter Dialog */}
      <Dialog open={isAddingChapter || isEditingChapter} onOpenChange={(open) => {
        if (!open) {
          setIsAddingChapter(false);
          setIsEditingChapter(false);
          setSelectedChapter(null);
        }
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isAddingChapter ? 'Add New Chapter' : 'Edit Chapter'}
            </DialogTitle>
            <DialogDescription>
              {isAddingChapter 
                ? 'Create a new chapter for this story in both languages.'
                : 'Update this chapter\'s content and settings.'}
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="english">English Content</TabsTrigger>
              <TabsTrigger value="japanese">Japanese Content</TabsTrigger>
            </TabsList>
            
            <div className="py-4">
              <div className="space-y-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FormLabel htmlFor="numberLabel">Chapter Number</FormLabel>
                    <Input
                      id="numberLabel"
                      name="numberLabel"
                      value={formData.numberLabel || ''}
                      onChange={handleInputChange}
                      placeholder="e.g. Chapter 1"
                    />
                  </div>
                  <div>
                    <FormLabel htmlFor="durationMinutes">Duration (minutes)</FormLabel>
                    <Input
                      id="durationMinutes"
                      name="durationMinutes"
                      type="number"
                      value={formData.durationMinutes || ''}
                      onChange={handleNumberChange}
                      placeholder="0"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.isLocked}
                    onCheckedChange={handleSwitchChange}
                    id="isLocked"
                  />
                  <FormLabel htmlFor="isLocked">
                    Lock this chapter (users must unlock it)
                  </FormLabel>
                </div>
              </div>
              
              <TabsContent value="english" className="space-y-4 mt-2">
                <div>
                  <FormLabel htmlFor="titleEn">English Title</FormLabel>
                  <Input
                    id="titleEn"
                    name="titleEn"
                    value={formData.titleEn || ''}
                    onChange={handleInputChange}
                    placeholder="Enter chapter title in English"
                  />
                </div>
                
                <div>
                  <FormLabel htmlFor="descriptionEn">English Description</FormLabel>
                  <Textarea
                    id="descriptionEn"
                    name="descriptionEn"
                    value={formData.descriptionEn || ''}
                    onChange={handleInputChange}
                    placeholder="Enter chapter description in English"
                    rows={3}
                  />
                </div>
                
                <div>
                  <FormLabel htmlFor="videoUrlEn">English Video URL</FormLabel>
                  <Input
                    id="videoUrlEn"
                    name="videoUrlEn"
                    value={formData.videoUrlEn || ''}
                    onChange={handleInputChange}
                    placeholder="Enter YouTube or video URL for English version"
                  />
                  <FormDescription>
                    YouTube, Vimeo or other embeddable video URL
                  </FormDescription>
                </div>
                
                <div>
                  <FormLabel htmlFor="pdfUrlEn">English PDF Document</FormLabel>
                  <div className="flex items-center gap-2">
                    <Input
                      id="pdfUrlEn"
                      name="pdfUrlEn"
                      value={formData.pdfUrlEn || ''}
                      onChange={handleInputChange}
                      placeholder="Upload or enter PDF URL for English version"
                      className="flex-1"
                    />
                    <Button variant="secondary" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="japanese" className="space-y-4 mt-2">
                <div>
                  <FormLabel htmlFor="titleJp">Japanese Title</FormLabel>
                  <Input
                    id="titleJp"
                    name="titleJp"
                    value={formData.titleJp || ''}
                    onChange={handleInputChange}
                    placeholder="日本語でタイトルを入力"
                  />
                </div>
                
                <div>
                  <FormLabel htmlFor="descriptionJp">Japanese Description</FormLabel>
                  <Textarea
                    id="descriptionJp"
                    name="descriptionJp"
                    value={formData.descriptionJp || ''}
                    onChange={handleInputChange}
                    placeholder="日本語で説明を入力"
                    rows={3}
                  />
                </div>
                
                <div>
                  <FormLabel htmlFor="videoUrlJp">Japanese Video URL</FormLabel>
                  <Input
                    id="videoUrlJp"
                    name="videoUrlJp"
                    value={formData.videoUrlJp || ''}
                    onChange={handleInputChange}
                    placeholder="日本語版の動画URLを入力"
                  />
                  <FormDescription>
                    YouTube、Vimeoなどの埋め込み可能な動画URL
                  </FormDescription>
                </div>
                
                <div>
                  <FormLabel htmlFor="pdfUrlJp">Japanese PDF Document</FormLabel>
                  <div className="flex items-center gap-2">
                    <Input
                      id="pdfUrlJp"
                      name="pdfUrlJp"
                      value={formData.pdfUrlJp || ''}
                      onChange={handleInputChange}
                      placeholder="日本語版のPDF URLをアップロードまたは入力"
                      className="flex-1"
                    />
                    <Button variant="secondary" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      アップロード
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsAddingChapter(false);
              setIsEditingChapter(false);
              setSelectedChapter(null);
            }}>
              Cancel
            </Button>
            <Button onClick={handleSaveChapter}>
              {isAddingChapter ? 'Add Chapter' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeletingChapter} onOpenChange={setIsDeletingChapter}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Chapter</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this chapter? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeletingChapter(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StoryChapterManager;
