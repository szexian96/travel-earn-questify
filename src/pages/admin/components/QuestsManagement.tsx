import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { addQuest, updateQuest, deleteQuest, Quest, QuestType, QuestTask, TaskType } from '@/redux/slices/questsSlice';
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
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Trophy, 
  Plus, 
  Pencil, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Lock, 
  AlertCircle, 
  Globe, 
  MapPin, 
  Upload, 
  Camera, 
  MessageSquare, 
  Share2, 
  Compass, 
  QrCode, 
  Users, 
  Map,
  HelpCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { Checkbox } from '@/components/ui/checkbox';

const TASK_TYPES: { [key in TaskType]: { name: string; icon: React.ReactNode; description: string } } = {
  trivia: {
    name: 'Trivia (Multiple Choice)',
    icon: <HelpCircle className="h-4 w-4" />,
    description: 'Quiz the user with a multiple-choice question'
  },
  short_answer: {
    name: 'Short Answer',
    icon: <MessageSquare className="h-4 w-4" />,
    description: 'Ask for a text reflection or answer'
  },
  social_share: {
    name: 'Social Share',
    icon: <Share2 className="h-4 w-4" />,
    description: 'User shares content on social media'
  },
  virtual_exploration: {
    name: 'Virtual Exploration',
    icon: <Compass className="h-4 w-4" />,
    description: 'Guide user through a choose-your-path experience'
  },
  photo_upload: {
    name: 'Photo Upload',
    icon: <Camera className="h-4 w-4" />,
    description: 'User uploads a photo as proof'
  },
  gps_checkin: {
    name: 'GPS Check-in',
    icon: <MapPin className="h-4 w-4" />,
    description: 'User must be at a specific location'
  },
  qr_scan: {
    name: 'QR Code Scan',
    icon: <QrCode className="h-4 w-4" />,
    description: 'User scans a QR code at location'
  },
  local_experience: {
    name: 'Local Experience',
    icon: <Upload className="h-4 w-4" />,
    description: 'Upload photo/audio of local experience'
  },
  group_quest: {
    name: 'Group Quest',
    icon: <Users className="h-4 w-4" />,
    description: 'Collaborative task with other users'
  },
  location_reflection: {
    name: 'Location Reflection',
    icon: <MessageSquare className="h-4 w-4" />,
    description: 'Text reflection about the location'
  }
};

const getTaskTypesByQuestType = (questType: QuestType): TaskType[] => {
  if (questType === 'earn') {
    return ['trivia', 'short_answer', 'social_share', 'virtual_exploration', 'photo_upload'];
  } else {
    return ['gps_checkin', 'qr_scan', 'local_experience', 'group_quest', 'location_reflection'];
  }
};

const DEFAULT_TASKS: { [key in QuestType]: QuestTask[] } = {
  earn: [
    { id: '1', titleEn: 'Answer the Trivia', titleJp: 'クイズに答える', descriptionEn: 'Test your knowledge', descriptionJp: '知識をテストしましょう', completed: false, type: 'trivia' },
    { id: '2', titleEn: 'Share your Thoughts', titleJp: '考えを共有する', descriptionEn: 'Write a short reflection', descriptionJp: '短い感想を書きましょう', completed: false, type: 'short_answer' },
    { id: '3', titleEn: 'Share on Social Media', titleJp: 'SNSでシェアする', descriptionEn: 'Share your experience', descriptionJp: '体験を共有しましょう', completed: false, type: 'social_share' },
    { id: '4', titleEn: 'Explore Virtually', titleJp: '仮想探索', descriptionEn: 'Choose your path', descriptionJp: '道を選びましょう', completed: false, type: 'virtual_exploration' },
    { id: '5', titleEn: 'Upload a Photo', titleJp: '写真をアップロードする', descriptionEn: 'Share your view', descriptionJp: '景色を共有しましょう', completed: false, type: 'photo_upload' }
  ],
  travel: [
    { id: '1', titleEn: 'Check in at Location', titleJp: '現地でチェックイン', descriptionEn: 'Visit the spot', descriptionJp: 'スポットを訪れましょう', completed: false, type: 'gps_checkin' },
    { id: '2', titleEn: 'Scan the QR Code', titleJp: 'QRコードをスキャン', descriptionEn: 'Find and scan the QR code', descriptionJp: 'QRコードを見つけてスキャンしましょう', completed: false, type: 'qr_scan' },
    { id: '3', titleEn: 'Capture the Experience', titleJp: '体験を記録する', descriptionEn: 'Upload a photo or audio', descriptionJp: '写真や音声をアップロードしましょう', completed: false, type: 'local_experience' },
    { id: '4', titleEn: 'Complete with Others', titleJp: '他の人と一緒に完了', descriptionEn: 'Work with other travelers', descriptionJp: '他の旅行者と協力しましょう', completed: false, type: 'group_quest' },
    { id: '5', titleEn: 'Reflect on the Location', titleJp: '場所について考える', descriptionEn: 'Write about your experience', descriptionJp: 'あなたの体験について書きましょう', completed: false, type: 'location_reflection' }
  ]
};

interface TaskFormProps {
  task: QuestTask;
  index: number;
  onChange: (index: number, updatedTask: QuestTask) => void;
  language: 'en' | 'jp';
}

const TaskForm: React.FC<TaskFormProps> = ({ task, index, onChange, language }) => {
  const handleChange = (field: string, value: string) => {
    const updatedTask = { ...task, [field]: value };
    onChange(index, updatedTask);
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          {TASK_TYPES[task.type].icon}
          <span>Task {index + 1}: {TASK_TYPES[task.type].name}</span>
        </CardTitle>
        <CardDescription>{TASK_TYPES[task.type].description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`task-${index}-title-${language}`}>
            Title {language === 'en' ? '(English)' : '(日本語)'}
          </Label>
          <Input
            id={`task-${index}-title-${language}`}
            value={language === 'en' ? task.titleEn : task.titleJp}
            onChange={(e) => handleChange(language === 'en' ? 'titleEn' : 'titleJp', e.target.value)}
            placeholder={language === 'en' ? 'Enter task title in English' : 'タスクのタイトルを日本語で入力'}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`task-${index}-description-${language}`}>
            Description {language === 'en' ? '(English)' : '(日本語)'}
          </Label>
          <Textarea
            id={`task-${index}-description-${language}`}
            value={language === 'en' ? task.descriptionEn : task.descriptionJp}
            onChange={(e) => handleChange(language === 'en' ? 'descriptionEn' : 'descriptionJp', e.target.value)}
            placeholder={language === 'en' ? 'Enter task description in English' : 'タスクの説明を日本語で入力'}
            required
          />
        </div>
        
        {task.type === 'trivia' && (
          <div className="space-y-2">
            <Label htmlFor={`task-${index}-choices`}>Multiple Choice Options (comma separated)</Label>
            <Input
              id={`task-${index}-choices`}
              value={task.options?.choices?.join(', ') || ''}
              onChange={(e) => {
                const choices = e.target.value.split(',').map(choice => choice.trim()).filter(Boolean);
                const updatedTask = { 
                  ...task, 
                  options: { 
                    ...task.options,
                    choices 
                  } 
                };
                onChange(index, updatedTask);
              }}
              placeholder="Option 1, Option 2, Option 3, etc."
            />
            <Label htmlFor={`task-${index}-correct`}>Correct Answer</Label>
            <Input
              id={`task-${index}-correct`}
              value={task.options?.correctAnswer || ''}
              onChange={(e) => {
                const updatedTask = { 
                  ...task, 
                  options: { 
                    ...task.options,
                    correctAnswer: e.target.value 
                  } 
                };
                onChange(index, updatedTask);
              }}
              placeholder="Enter the correct answer"
            />
          </div>
        )}

        {task.type === 'social_share' && (
          <div className="space-y-2">
            <Label htmlFor={`task-${index}-hashtags`}>Required Hashtags (comma separated)</Label>
            <Input
              id={`task-${index}-hashtags`}
              value={task.options?.hashtags?.join(', ') || ''}
              onChange={(e) => {
                const hashtags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
                const updatedTask = { 
                  ...task, 
                  options: { 
                    ...task.options,
                    hashtags 
                  } 
                };
                onChange(index, updatedTask);
              }}
              placeholder="#Tourii, #Japan, #Travel"
            />
          </div>
        )}

        {task.type === 'gps_checkin' && (
          <div className="space-y-2">
            <Label>GPS Location</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor={`task-${index}-lat`}>Latitude</Label>
                <Input
                  id={`task-${index}-lat`}
                  type="number"
                  step="0.000001"
                  value={task.options?.gpsLocation?.lat || ''}
                  onChange={(e) => {
                    const updatedTask = { 
                      ...task, 
                      options: { 
                        ...task.options,
                        gpsLocation: {
                          ...task.options?.gpsLocation,
                          lat: parseFloat(e.target.value)
                        }
                      } 
                    };
                    onChange(index, updatedTask);
                  }}
                  placeholder="35.6895"
                />
              </div>
              <div>
                <Label htmlFor={`task-${index}-lng`}>Longitude</Label>
                <Input
                  id={`task-${index}-lng`}
                  type="number"
                  step="0.000001"
                  value={task.options?.gpsLocation?.lng || ''}
                  onChange={(e) => {
                    const updatedTask = { 
                      ...task, 
                      options: { 
                        ...task.options,
                        gpsLocation: {
                          ...task.options?.gpsLocation,
                          lng: parseFloat(e.target.value)
                        }
                      } 
                    };
                    onChange(index, updatedTask);
                  }}
                  placeholder="139.6917"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor={`task-${index}-location-name`}>Location Name</Label>
                <Input
                  id={`task-${index}-location-name`}
                  value={task.options?.gpsLocation?.name || ''}
                  onChange={(e) => {
                    const updatedTask = { 
                      ...task, 
                      options: { 
                        ...task.options,
                        gpsLocation: {
                          ...task.options?.gpsLocation,
                          name: e.target.value
                        }
                      } 
                    };
                    onChange(index, updatedTask);
                  }}
                  placeholder="Tokyo Tower"
                />
              </div>
              <div>
                <Label htmlFor={`task-${index}-radius`}>Radius (meters)</Label>
                <Input
                  id={`task-${index}-radius`}
                  type="number"
                  value={task.options?.gpsLocation?.radiusMeters || 50}
                  onChange={(e) => {
                    const updatedTask = { 
                      ...task, 
                      options: { 
                        ...task.options,
                        gpsLocation: {
                          ...task.options?.gpsLocation,
                          radiusMeters: parseInt(e.target.value)
                        }
                      } 
                    };
                    onChange(index, updatedTask);
                  }}
                  placeholder="50"
                />
              </div>
            </div>
          </div>
        )}

        {task.type === 'qr_scan' && (
          <div className="space-y-2">
            <Label htmlFor={`task-${index}-qr-value`}>QR Code Value</Label>
            <Input
              id={`task-${index}-qr-value`}
              value={task.options?.qrValue || ''}
              onChange={(e) => {
                const updatedTask = { 
                  ...task, 
                  options: { 
                    ...task.options,
                    qrValue: e.target.value 
                  } 
                };
                onChange(index, updatedTask);
              }}
              placeholder="https://tourii.app/verify/123456"
            />
            <p className="text-xs text-muted-foreground mt-1">
              This is the text encoded in the QR code that users will scan
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const QuestsManagement = () => {
  const dispatch = useAppDispatch();
  const quests = useAppSelector((state) => state.quests.items);
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentQuest, setCurrentQuest] = useState<Quest | null>(null);
  const [questToDelete, setQuestToDelete] = useState<string | null>(null);
  const [currentLanguageTab, setCurrentLanguageTab] = useState<'en' | 'jp'>('en');

  const [formData, setFormData] = useState({
    titleEn: '',
    titleJp: '',
    descriptionEn: '',
    descriptionJp: '',
    thumbnail: '',
    status: 'active' as 'active' | 'completed' | 'locked',
    difficulty: 'Easy' as 'Easy' | 'Moderate' | 'Hard',
    rewardPoints: 100,
    rewardBadges: '',
    tags: '',
    type: 'earn' as QuestType,
    touristSpotId: '',
  });

  const [tasks, setTasks] = useState<QuestTask[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (field: string, value: string) => {
    if (field === 'type') {
      const questType = value as QuestType;
      setTasks(DEFAULT_TASKS[questType].map(task => ({ ...task, id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}` })));
    }
    
    setFormData({ 
      ...formData, 
      [field]: value 
    });
  };

  const handleTaskChange = (index: number, updatedTask: QuestTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
  };

  const resetForm = () => {
    setFormData({
      titleEn: '',
      titleJp: '',
      descriptionEn: '',
      descriptionJp: '',
      thumbnail: '',
      status: 'active',
      difficulty: 'Easy',
      rewardPoints: 100,
      rewardBadges: '',
      tags: '',
      type: 'earn',
      touristSpotId: '',
    });
    setTasks(DEFAULT_TASKS.earn.map(task => ({ ...task, id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}` })));
    setCurrentQuest(null);
    setCurrentLanguageTab('en');
  };

  const handleAddEditDialogOpen = (quest?: Quest) => {
    if (quest) {
      setCurrentQuest(quest);
      setFormData({
        titleEn: quest.titleEn,
        titleJp: quest.titleJp,
        descriptionEn: quest.descriptionEn,
        descriptionJp: quest.descriptionJp,
        thumbnail: quest.thumbnail,
        status: quest.status,
        difficulty: quest.difficulty,
        rewardPoints: quest.rewards.points,
        rewardBadges: quest.rewards.badges.join(', '),
        tags: quest.tags.join(', '),
        type: quest.type,
        touristSpotId: quest.touristSpotId || '',
      });
      setTasks(quest.tasks);
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
    
    if (tasks.length === 0) {
      toast({
        title: "Error",
        description: "A quest must have at least one task",
        variant: "destructive"
      });
      return;
    }
    
    const questData: Quest = {
      id: currentQuest ? currentQuest.id : `quest-${Date.now()}`,
      titleEn: formData.titleEn,
      titleJp: formData.titleJp,
      descriptionEn: formData.descriptionEn,
      descriptionJp: formData.descriptionJp,
      thumbnail: formData.thumbnail,
      status: formData.status,
      difficulty: formData.difficulty,
      type: formData.type,
      touristSpotId: formData.touristSpotId || undefined,
      rewards: {
        points: Number(formData.rewardPoints),
        badges: formData.rewardBadges.split(',').map(badge => badge.trim()).filter(badge => badge),
      },
      tasks: tasks,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    };

    if (currentQuest) {
      dispatch(updateQuest(questData));
      toast({
        title: "Quest updated",
        description: `"${questData.titleEn}" has been updated successfully.`,
      });
    } else {
      dispatch(addQuest(questData));
      toast({
        title: "Quest added",
        description: `"${questData.titleEn}" has been added successfully.`,
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

  const getQuestTypeIcon = (type: QuestType) => {
    return type === 'earn' ? 
      <Globe className="h-4 w-4 text-purple-500" /> : 
      <MapPin className="h-4 w-4 text-red-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <Trophy className="mr-2 h-7 w-7" />
            {t('admin.quests')}
          </h1>
          <p className="text-muted-foreground">Manage quests and challenges here.</p>
        </div>
        <Button onClick={() => handleAddEditDialogOpen()}>
          <Plus className="mr-2 h-4 w-4" />
          {t('admin.createQuest')}
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
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
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No quests found. Create your first quest.
                </TableCell>
              </TableRow>
            ) : (
              quests.map((quest) => (
                <TableRow key={quest.id}>
                  <TableCell className="font-medium">
                    <div>
                      <span>{quest.titleEn}</span>
                      <span className="block text-xs text-muted-foreground mt-1">{quest.titleJp}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1">
                      {getQuestTypeIcon(quest.type)}
                      <span className="capitalize">{quest.type === 'earn' ? 'Earn to Travel' : 'Travel to Earn'}</span>
                    </span>
                  </TableCell>
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{currentQuest ? 'Edit Quest' : 'Add New Quest'}</DialogTitle>
            <DialogDescription>
              {currentQuest 
                ? 'Update the quest details below.' 
                : 'Fill in the details to create a new quest.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Tabs value={currentLanguageTab} onValueChange={(value) => setCurrentLanguageTab(value as 'en' | 'jp')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="en" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" /> English
                </TabsTrigger>
                <TabsTrigger value="jp" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" /> 日本語
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="en" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="titleEn">Title (English)</Label>
                  <Input 
                    id="titleEn" 
                    name="titleEn" 
                    value={formData.titleEn} 
                    onChange={handleInputChange} 
                    placeholder="Enter quest title in English" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="descriptionEn">Description (English)</Label>
                  <Textarea 
                    id="descriptionEn" 
                    name="descriptionEn" 
                    value={formData.descriptionEn} 
                    onChange={handleInputChange} 
                    placeholder="Enter quest description in English" 
                    required 
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="jp" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="titleJp">タイトル (日本語)</Label>
                  <Input 
                    id="titleJp" 
                    name="titleJp" 
                    value={formData.titleJp} 
                    onChange={handleInputChange} 
                    placeholder="タイトルを日本語で入力してください" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="descriptionJp">説明 (日本語)</Label>
                  <Textarea 
                    id="descriptionJp" 
                    name="descriptionJp" 
                    value={formData.descriptionJp} 
                    onChange={handleInputChange} 
                    placeholder="クエストの説明を日本語で入力してください" 
                    required 
                  />
                </div>
              </TabsContent>
            </Tabs>

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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Quest Type</Label>
                <Select 
                  value={formData.type}
                  onValueChange={value => handleSelectChange('type', value)}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select quest type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="earn">Earn to Travel (Online)</SelectItem>
                    <SelectItem value="travel">Travel to Earn (On-site)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {formData.type === 'earn' 
                    ? 'Online quests that can be completed from anywhere' 
                    : 'On-site quests that require physical presence'}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="touristSpotId">Tourist Spot</Label>
                <Input 
                  id="touristSpotId" 
                  name="touristSpotId" 
                  value={formData.touristSpotId} 
                  onChange={handleInputChange} 
                  placeholder="Enter tourist spot ID" 
                />
                <p className="text-xs text-muted-foreground">
                  Connect this quest to a specific tourist spot
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Quest Tasks</h3>
                <div className="text-sm text-muted-foreground">
                  {formData.type === 'earn' ? 'Online Tasks' : 'On-site Tasks'}
                </div>
              </div>
              
              <Tabs value={currentLanguageTab}>
                <TabsContent value="en" className="space-y-4">
                  {tasks.map((task, index) => (
                    <TaskForm 
                      key={task.id} 
                      task={task} 
                      index={index} 
                      onChange={handleTaskChange} 
                      language="en"
                    />
                  ))}
                </TabsContent>
                
                <TabsContent value="jp" className="space-y-4">
                  {tasks.map((task, index) => (
                    <TaskForm 
                      key={task.id} 
                      task={task} 
                      index={index} 
                      onChange={handleTaskChange} 
                      language="jp"
                    />
                  ))}
                </TabsContent>
              </Tabs>
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
