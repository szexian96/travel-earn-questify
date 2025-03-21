
import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { addQuest, updateQuest, deleteQuest, Quest } from '@/redux/slices/questsSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
} from "@/components/ui/dialog";
import { Trophy, Plus, Pencil, Trash2, CheckCircle, Clock, Lock, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const QuestsManagement = () => {
  const dispatch = useAppDispatch();
  const quests = useAppSelector((state) => state.quests.items);
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentQuest, setCurrentQuest] = useState<Quest | null>(null);
  const [questToDelete, setQuestToDelete] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnail: '',
    status: 'active' as 'active' | 'completed' | 'locked',
    difficulty: 'Easy' as 'Easy' | 'Moderate' | 'Hard',
    rewardPoints: 100,
    rewardBadges: '',
    tasks: '',
    tags: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData({ 
      ...formData, 
      [field]: value 
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      thumbnail: '',
      status: 'active',
      difficulty: 'Easy',
      rewardPoints: 100,
      rewardBadges: '',
      tasks: '',
      tags: '',
    });
    setCurrentQuest(null);
  };

  const handleAddEditDialogOpen = (quest?: Quest) => {
    if (quest) {
      setCurrentQuest(quest);
      setFormData({
        title: quest.title,
        description: quest.description,
        thumbnail: quest.thumbnail,
        status: quest.status,
        difficulty: quest.difficulty,
        rewardPoints: quest.rewards.points,
        rewardBadges: quest.rewards.badges.join(', '),
        tasks: quest.tasks.map(task => task.title).join('\n'),
        tags: quest.tags.join(', '),
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
    setQuestToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
    setQuestToDelete(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const questData: Quest = {
      id: currentQuest ? currentQuest.id : `quest-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      thumbnail: formData.thumbnail,
      status: formData.status,
      difficulty: formData.difficulty,
      rewards: {
        points: Number(formData.rewardPoints),
        badges: formData.rewardBadges.split(',').map(badge => badge.trim()).filter(badge => badge),
      },
      tasks: formData.tasks.split('\n').filter(task => task.trim()).map((taskTitle, index) => ({
        id: `task-${index}`,
        title: taskTitle.trim(),
        completed: formData.status === 'completed',
      })),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    };

    if (currentQuest) {
      dispatch(updateQuest(questData));
      toast({
        title: "Quest updated",
        description: `"${questData.title}" has been updated successfully.`,
      });
    } else {
      dispatch(addQuest(questData));
      toast({
        title: "Quest added",
        description: `"${questData.title}" has been added successfully.`,
      });
    }

    handleDialogClose();
  };

  const handleDelete = () => {
    if (questToDelete) {
      dispatch(deleteQuest(questToDelete));
      toast({
        title: "Quest deleted",
        description: "The quest has been deleted successfully.",
        variant: "destructive",
      });
      handleDeleteDialogClose();
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'active':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'locked':
        return <Lock className="h-4 w-4 text-gray-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <Trophy className="mr-2 h-7 w-7" />
            Quests Management
          </h1>
          <p className="text-muted-foreground">Manage quests and challenges here.</p>
        </div>
        <Button onClick={() => handleAddEditDialogOpen()}>
          <Plus className="mr-2 h-4 w-4" />
          Add Quest
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Tasks</TableHead>
              <TableHead>Rewards</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No quests found. Create your first quest.
                </TableCell>
              </TableRow>
            ) : (
              quests.map((quest) => (
                <TableRow key={quest.id}>
                  <TableCell className="font-medium">{quest.title}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1">
                      {getStatusIcon(quest.status)}
                      <span className="capitalize">{quest.status}</span>
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                      ${quest.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400' : 
                      quest.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400' : 
                      'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400'}`}>
                      {quest.difficulty}
                    </span>
                  </TableCell>
                  <TableCell>{quest.tasks.length} tasks</TableCell>
                  <TableCell>{quest.rewards.points} pts</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleAddEditDialogOpen(quest)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDeleteDialogOpen(quest.id)}
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

      {/* Add/Edit Quest Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{currentQuest ? 'Edit Quest' : 'Add New Quest'}</DialogTitle>
            <DialogDescription>
              {currentQuest 
                ? 'Update the quest details below.' 
                : 'Fill in the details to create a new quest.'}
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
                placeholder="Enter quest title" 
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
                placeholder="Enter quest description" 
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
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData.status}
                  onValueChange={value => handleSelectChange('status', value)}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="locked">Locked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select 
                  value={formData.difficulty}
                  onValueChange={value => handleSelectChange('difficulty', value)}
                >
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rewardPoints">Reward Points</Label>
                <Input 
                  id="rewardPoints" 
                  name="rewardPoints" 
                  type="number" 
                  min="0"
                  value={formData.rewardPoints} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rewardBadges">Reward Badges (comma separated)</Label>
                <Input 
                  id="rewardBadges" 
                  name="rewardBadges" 
                  value={formData.rewardBadges} 
                  onChange={handleInputChange} 
                  placeholder="e.g. Explorer, Foodie" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tasks">Tasks (one per line)</Label>
              <Textarea 
                id="tasks" 
                name="tasks" 
                value={formData.tasks} 
                onChange={handleInputChange} 
                placeholder="Enter tasks, one per line" 
                className="min-h-[120px]"
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input 
                id="tags" 
                name="tags" 
                value={formData.tags} 
                onChange={handleInputChange} 
                placeholder="e.g. Tokyo, Cultural, Food" 
                required 
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleDialogClose}>
                Cancel
              </Button>
              <Button type="submit">
                {currentQuest ? 'Update Quest' : 'Add Quest'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Quest</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this quest? This action cannot be undone.
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

export default QuestsManagement;
