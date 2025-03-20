
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import {
  Clock,
  MapPin,
  Users,
  Award,
  ArrowLeft,
  Info,
  CheckCircle,
  Timer,
  Lock,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import MapComponent from '@/components/MapComponent';
import { TaskComponent, TaskType } from '@/components/TaskComponents';
import { useToast } from '@/hooks/use-toast';

// Mock quest data
const mockQuests = [
  {
    id: "q1",
    title: "Golden Gate Adventure",
    description: "Explore the iconic Golden Gate Bridge and surrounding parks, capturing the perfect photos and discovering hidden viewpoints.",
    longDescription: "Embark on an unforgettable journey across the Golden Gate Bridge and its surroundings. You'll discover breathtaking viewpoints, learn about the bridge's fascinating history, and capture stunning photos to share with friends and fellow adventurers. This quest will take you through some of San Francisco's most beautiful parks and scenic spots, offering a perfect blend of urban exploration and natural beauty.",
    location: "San Francisco, CA",
    thumbnail: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80",
    rewards: {
      points: 500,
      nft: true
    },
    difficulty: "medium",
    duration: "3-4 hours",
    tasks: [
      {
        id: "t1",
        type: "visit_location" as TaskType,
        title: "Visit Golden Gate Bridge",
        description: "Check in at the Golden Gate Bridge Welcome Center to start your adventure.",
        isCompleted: false,
        location: {
          name: "Golden Gate Bridge Welcome Center",
          latitude: 37.8077,
          longitude: -122.4750
        }
      },
      {
        id: "t2",
        type: "photo_upload" as TaskType,
        title: "Capture the Perfect Bridge Photo",
        description: "Take a photo of the Golden Gate Bridge from the perfect angle.",
        isCompleted: false,
        requirements: [
          "Full bridge visible in frame",
          "Good lighting (not backlit)",
          "Creative composition"
        ]
      },
      {
        id: "t3",
        type: "answer_text" as TaskType,
        title: "Bridge History Reflection",
        description: "After reading the information at the visitor center, share what you found most interesting about the bridge's history.",
        isCompleted: false,
        placeholder: "I found it fascinating that...",
        minLength: 50
      },
      {
        id: "t4",
        type: "select_option" as TaskType,
        title: "Bridge Facts Quiz",
        description: "Test your knowledge about the Golden Gate Bridge.",
        isCompleted: false,
        options: [
          { id: "opt1", text: "The Golden Gate Bridge was completed in 1937" },
          { id: "opt2", text: "The Golden Gate Bridge was completed in 1945" },
          { id: "opt3", text: "The Golden Gate Bridge was completed in 1952" },
          { id: "opt4", text: "The Golden Gate Bridge was completed in 1964" }
        ]
      },
      {
        id: "t5",
        type: "share_social" as TaskType,
        title: "Share Your Experience",
        description: "Share your adventure on Twitter with the provided text and hashtags.",
        isCompleted: false,
        platform: "Twitter",
        shareText: "Exploring the magnificent Golden Gate Bridge with @Questify! The views are absolutely stunning! 🌉",
        hashtags: ["TravelQuest", "SanFrancisco", "GoldenGate"],
        mentions: ["Questify"]
      }
    ],
    status: "available",
    tags: ["Landmarks", "Photography", "Urban"]
  }
];

const QuestDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [quest, setQuest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading quest data
    setLoading(true);
    setTimeout(() => {
      const foundQuest = mockQuests.find(q => q.id === id);
      if (foundQuest) {
        // Determine if quest is started based on stored data
        const questStatus = localStorage.getItem(`quest_${id}_status`);
        setIsStarted(questStatus === "started");
        
        // Load task completion status from localStorage
        const updatedTasks = foundQuest.tasks.map(task => {
          const isCompleted = localStorage.getItem(`quest_${id}_task_${task.id}`) === "completed";
          return { ...task, isCompleted };
        });
        
        setQuest({ ...foundQuest, tasks: updatedTasks });
      }
      setLoading(false);
    }, 1000);
  }, [id]);
  
  const handleStartQuest = () => {
    localStorage.setItem(`quest_${id}_status`, "started");
    setIsStarted(true);
    
    toast({
      title: "Quest Started!",
      description: "You can now complete tasks and earn rewards.",
    });
  };
  
  const handleCompleteTask = (taskId: string, data?: any) => {
    if (!quest) return;
    
    // Update completion status in localStorage
    localStorage.setItem(`quest_${id}_task_${taskId}`, "completed");
    
    // Update quest tasks state
    const updatedTasks = quest.tasks.map((task: any) => 
      task.id === taskId ? { ...task, isCompleted: true } : task
    );
    
    setQuest({ ...quest, tasks: updatedTasks });
    
    toast({
      title: "Task Completed!",
      description: "Great job! Keep going to complete the quest.",
    });
    
    // Check if all tasks are completed
    const allCompleted = updatedTasks.every((task: any) => task.isCompleted);
    if (allCompleted) {
      toast({
        title: "Quest Completed!",
        description: `You've earned ${quest.rewards.points} points${quest.rewards.nft ? ' and an NFT' : ''}!`,
      });
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 py-20 flex items-center justify-center">
          <div className="animate-pulse">
            <div className="h-4 bg-secondary rounded w-48 mb-4"></div>
            <div className="h-8 bg-secondary rounded w-64 mb-8"></div>
            <div className="h-64 bg-secondary rounded mb-6"></div>
            <div className="h-32 bg-secondary rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!quest) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 py-20 flex flex-col items-center justify-center">
          <Info className="h-12 w-12 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-4">Quest Not Found</h1>
          <p className="text-muted-foreground mb-6">The quest you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/quests">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Quests
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const completedTasks = quest.tasks.filter((task: any) => task.isCompleted).length;
  const totalTasks = quest.tasks.length;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16 pb-20">
        {/* Hero section */}
        <div className="relative">
          <div className="w-full h-[300px] sm:h-[400px] overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
            <img 
              src={quest.coverImage || quest.thumbnail} 
              alt={quest.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 relative z-20 -mt-24">
            <div className="bg-white dark:bg-black/20 backdrop-blur-md shadow-elegant rounded-xl p-6 border border-border/50">
              <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                <div className="w-full md:w-3/5">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {quest.status.charAt(0).toUpperCase() + quest.status.slice(1)}
                      </Badge>
                      <Badge variant="secondary" className={
                        quest.difficulty === "easy" 
                          ? "bg-green-100 text-green-800" 
                          : quest.difficulty === "medium" 
                            ? "bg-amber-100 text-amber-800" 
                            : "bg-red-100 text-red-800"
                      }>
                        {quest.difficulty.charAt(0).toUpperCase() + quest.difficulty.slice(1)}
                      </Badge>
                      {quest.isGroupActivity && (
                        <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">
                          <Users className="h-3 w-3 mr-1" />
                          Group
                        </Badge>
                      )}
                    </div>
                    
                    <h1 className="text-3xl font-bold mb-3">{quest.title}</h1>
                    
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1.5" />
                        <span>{quest.location}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1.5" />
                        <span>{quest.duration}</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6">
                      {quest.longDescription || quest.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {quest.tags.map((tag: string, i: number) => (
                        <Badge key={i} variant="outline" className="bg-secondary/50">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                </div>
                
                <div className="w-full md:w-2/5">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Card className="h-full">
                      <CardHeader className="pb-3">
                        <CardTitle>Quest Progress</CardTitle>
                        {isStarted && (
                          <CardDescription>
                            {completedTasks} of {totalTasks} tasks completed
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent>
                        {isStarted ? (
                          <>
                            <Progress value={completionPercentage} className="mb-4" />
                            
                            <div className="bg-primary/10 rounded-lg p-4 mb-4">
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="font-medium text-sm">Rewards</h4>
                                <Badge variant="outline" className="bg-primary/5">
                                  Upon completion
                                </Badge>
                              </div>
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center">
                                  <Award className="h-4 w-4 mr-2 text-amber-500" />
                                  <span>{quest.rewards.points} points</span>
                                </div>
                                {quest.rewards.nft && (
                                  <div className="flex items-center">
                                    <div className="w-4 h-4 mr-2 text-purple-500 flex items-center justify-center">
                                      <span className="text-xs font-bold">NFT</span>
                                    </div>
                                    <span>Unique NFT reward</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {completedTasks === totalTasks ? (
                              <div className="text-center bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                                <CheckCircle className="h-8 w-8 mx-auto text-green-500 mb-2" />
                                <h4 className="font-medium mb-1">Quest Completed!</h4>
                                <p className="text-sm text-muted-foreground mb-3">
                                  Congratulations! You've successfully completed all tasks.
                                </p>
                                <Button className="w-full" disabled>
                                  Rewards Claimed
                                </Button>
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">
                                Complete all tasks to earn the rewards.
                              </p>
                            )}
                          </>
                        ) : (
                          <div className="text-center">
                            <div className="mb-4">
                              <div className="w-16 h-16 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                                <Timer className="h-8 w-8" />
                              </div>
                              <h4 className="font-medium mb-1">Ready to Begin?</h4>
                              <p className="text-sm text-muted-foreground mb-6">
                                Start this quest to track your progress and earn rewards.
                              </p>
                            </div>
                            
                            <div className="bg-primary/10 rounded-lg p-4 mb-6">
                              <h4 className="font-medium text-sm mb-2">Rewards</h4>
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center">
                                  <Award className="h-4 w-4 mr-2 text-amber-500" />
                                  <span>{quest.rewards.points} points</span>
                                </div>
                                {quest.rewards.nft && (
                                  <div className="flex items-center">
                                    <div className="w-4 h-4 mr-2 text-purple-500 flex items-center justify-center">
                                      <span className="text-xs font-bold">NFT</span>
                                    </div>
                                    <span>Unique NFT reward</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <Button onClick={handleStartQuest} className="w-full">
                              Start Quest
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map section */}
        <div className="container mx-auto px-4 sm:px-6 pt-8 pb-6">
          <h2 className="text-2xl font-bold mb-6">Quest Location</h2>
          <MapComponent 
            locations={[
              { 
                id: "main", 
                name: quest.location, 
                latitude: quest.tasks[0]?.location?.latitude || 37.7749, 
                longitude: quest.tasks[0]?.location?.longitude || -122.4194 
              }
            ]} 
            selectedLocationId="main"
            centerLat={quest.tasks[0]?.location?.latitude || 37.7749}
            centerLng={quest.tasks[0]?.location?.longitude || -122.4194}
            zoom={14}
          />
        </div>
        
        {/* Tasks section */}
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Quest Tasks</h2>
            {isStarted && (
              <div className="text-sm text-muted-foreground">
                {completedTasks}/{totalTasks} completed
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            {quest.tasks.map((task: any, index: number) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {!isStarted ? (
                  <Card className="opacity-70">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center mb-1.5">
                            <span className="text-sm font-medium text-primary">Task {index + 1}</span>
                          </div>
                          <CardTitle className="text-xl">{task.title}</CardTitle>
                        </div>
                        <div className="flex items-center justify-center w-8 h-8">
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                      <CardDescription>{task.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button disabled variant="outline" className="w-full">
                        Start quest to unlock
                      </Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <TaskComponent 
                    type={task.type} 
                    taskData={task}
                    onComplete={handleCompleteTask}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuestDetails;
