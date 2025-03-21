
import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { addStory, updateStory, deleteStory } from '@/redux/slices/storiesSlice';
import { Story } from '@/components/StoryCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
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
import { ScrollText, Plus, Pencil, Trash2, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const StoriesManagement = () => {
  const dispatch = useAppDispatch();
  const stories = useAppSelector((state) => state.stories.items);
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [storyToDelete, setStoryToDelete] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnail: '',
    isUnlocked: false,
    totalChapters: 1,
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
      title: '',
      description: '',
      thumbnail: '',
      isUnlocked: false,
      totalChapters: 1,
      unlockedChapters: 0,
      relatedRouteId: '',
      tags: '',
    });
    setCurrentStory(null);
  };

  const handleAddEditDialogOpen = (story?: Story) => {
    if (story) {
      setCurrentStory(story);
      setFormData({
        title: story.title,
        description: story.description,
        thumbnail: story.thumbnail,
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
    
    const storyData: Story = {
      id: currentStory ? currentStory.id : `story-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      thumbnail: formData.thumbnail,
      isUnlocked: formData.isUnlocked,
      chapters: {
        total: Number(formData.totalChapters),
        unlocked: Number(formData.unlockedChapters),
      },
      relatedRouteId: formData.relatedRouteId || undefined,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    };

    if (currentStory) {
      dispatch(updateStory(storyData));
      toast({
        title: "Story updated",
        description: `"${storyData.title}" has been updated successfully.`,
      });
    } else {
      dispatch(addStory(storyData));
      toast({
        title: "Story added",
        description: `"${storyData.title}" has been added successfully.`,
      });
    }

    handleDialogClose();
  };

  const handleDelete = () => {
    if (storyToDelete) {
      dispatch(deleteStory(storyToDelete));
      toast({
        title: "Story deleted",
        description: "The story has been deleted successfully.",
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
            Stories Management
          </h1>
          <p className="text-muted-foreground">Manage your travel stories here.</p>
        </div>
        <Button onClick={() => handleAddEditDialogOpen()}>
          <Plus className="mr-2 h-4 w-4" />
          Add Story
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Chapters</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No stories found. Create your first story.
                </TableCell>
              </TableRow>
            ) : (
              stories.map((story) => (
                <TableRow key={story.id}>
                  <TableCell className="font-medium">{story.title}</TableCell>
                  <TableCell>
                    {story.isUnlocked ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400">
                        <Check className="mr-1 h-3 w-3" />
                        Unlocked
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400">
                        <X className="mr-1 h-3 w-3" />
                        Locked
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{story.chapters.unlocked} / {story.chapters.total}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {story.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground">
                          {tag}
                        </span>
                      ))}
                      {story.tags.length > 3 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground">
                          +{story.tags.length - 3}
                        </span>
                      )}
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
                        onClick={() => handleDeleteDialogOpen(story.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Story Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{currentStory ? 'Edit Story' : 'Add New Story'}</DialogTitle>
            <DialogDescription>
              {currentStory 
                ? 'Update the story details below.' 
                : 'Fill in the details to create a new story.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange} 
                placeholder="Enter story title" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={handleInputChange} 
                placeholder="Enter story description" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="thumbnail">Thumbnail URL</Label>
              <Input 
                id="thumbnail" 
                name="thumbnail" 
                value={formData.thumbnail} 
                onChange={handleInputChange} 
                placeholder="Enter image URL" 
                required 
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="isUnlocked" 
                checked={formData.isUnlocked} 
                onCheckedChange={handleSwitchChange} 
              />
              <Label htmlFor="isUnlocked">Unlocked by default</Label>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="totalChapters">Total Chapters</Label>
                <Input 
                  id="totalChapters" 
                  name="totalChapters" 
                  type="number" 
                  min="1"
                  value={formData.totalChapters} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="unlockedChapters">Unlocked Chapters</Label>
                <Input 
                  id="unlockedChapters" 
                  name="unlockedChapters" 
                  type="number" 
                  min="0"
                  max={formData.totalChapters}
                  value={formData.unlockedChapters} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="relatedRouteId">Related Route ID (optional)</Label>
              <Input 
                id="relatedRouteId" 
                name="relatedRouteId" 
                value={formData.relatedRouteId} 
                onChange={handleInputChange} 
                placeholder="Enter related route ID" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input 
                id="tags" 
                name="tags" 
                value={formData.tags} 
                onChange={handleInputChange} 
                placeholder="e.g. Kyoto, Temples, Cultural" 
                required 
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleDialogClose}>
                Cancel
              </Button>
              <Button type="submit">
                {currentStory ? 'Update Story' : 'Add Story'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Story</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this story? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleDeleteDialogClose}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StoriesManagement;
