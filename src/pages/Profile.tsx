
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { 
  Trophy, 
  Map, 
  BookOpen, 
  Award, 
  Star, 
  Gift, 
  Medal, 
  Globe, 
  MapPin,
  BookMarked,
  Clock,
  User,
  Settings,
  CheckCircle
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

// Mock user data
const userAchievements = [
  {
    id: "a1",
    title: "Globetrotter",
    description: "Visit 5 different countries",
    progress: 3,
    total: 5,
    icon: <Globe className="h-5 w-5" />,
  },
  {
    id: "a2",
    title: "Photo Master",
    description: "Complete 10 photo upload tasks",
    progress: 7,
    total: 10,
    icon: <BookMarked className="h-5 w-5" />,
  },
  {
    id: "a3",
    title: "Social Butterfly",
    description: "Share 15 quests on social media",
    progress: 4,
    total: 15,
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    id: "a4",
    title: "Early Bird",
    description: "Complete 5 quests within 24 hours of starting",
    progress: 2,
    total: 5,
    icon: <Clock className="h-5 w-5" />,
  }
];

const userRewards = [
  {
    id: "r1",
    title: "Golden Gate Explorer",
    type: "badge",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    description: "Completed the Golden Gate Bridge quest",
    date: "May 15, 2023"
  },
  {
    id: "r2",
    title: "San Francisco NFT",
    type: "nft",
    image: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    description: "Exclusive NFT for exploring San Francisco",
    date: "May 20, 2023"
  },
  {
    id: "r3",
    title: "Travel Discount",
    type: "coupon",
    description: "15% off your next hotel booking",
    code: "QUEST15",
    expires: "Dec 31, 2023"
  }
];

const recentActivities = [
  {
    id: "act1",
    type: "quest_completed",
    title: "Completed Golden Gate Adventure",
    date: "May 20, 2023",
    points: 500
  },
  {
    id: "act2",
    type: "task_completed",
    title: "Took a photo at Golden Gate Bridge",
    date: "May 20, 2023",
    points: 100
  },
  {
    id: "act3",
    type: "achievement_unlocked",
    title: "Unlocked Golden Gate Explorer badge",
    date: "May 20, 2023",
    points: 50
  },
  {
    id: "act4",
    type: "quest_started",
    title: "Started Tokyo Night Lights quest",
    date: "May 18, 2023"
  }
];

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  if (!user) {
    navigate('/auth');
    return null;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Profile Header */}
          <motion.div 
            className="mb-8 flex flex-col md:flex-row md:items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Avatar className="w-20 h-20 border-4 border-background shadow-md">
              <AvatarImage src={user.avatar} alt={user.username} />
              <AvatarFallback className="text-lg">{user.username?.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-1">{user.username}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  <span>{user.points} points</span>
                </div>
                <div className="flex items-center gap-1">
                  <Map className="h-4 w-4 text-primary" />
                  <span>3 quests completed</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>Level {Math.floor(user.points / 500) + 1}</span>
                </div>
                {user.premium && (
                  <Badge variant="outline" className="bg-gradient-to-r from-amber-200 to-yellow-400 text-amber-900 border-amber-300">
                    Premium Member
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" size="sm" onClick={() => navigate('/quests')}>
                <Map className="h-4 w-4 mr-2" />
                Quests
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </motion.div>
          
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 md:w-auto md:inline-flex h-11 mb-8">
              <TabsTrigger value="overview" className="flex gap-2 items-center">
                <User className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="achievements" className="flex gap-2 items-center">
                <Medal className="h-4 w-4" />
                <span>Achievements</span>
              </TabsTrigger>
              <TabsTrigger value="rewards" className="flex gap-2 items-center">
                <Gift className="h-4 w-4" />
                <span>Rewards</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                  className="md:col-span-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Clock className="mr-2 h-5 w-5" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-5">
                        {recentActivities.map((activity) => (
                          <div key={activity.id} className="flex">
                            <div className="mr-4 mt-1">
                              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                activity.type === 'quest_completed' 
                                  ? 'bg-green-100 text-green-600' 
                                  : activity.type === 'task_completed'
                                    ? 'bg-blue-100 text-blue-600'
                                    : activity.type === 'achievement_unlocked'
                                      ? 'bg-purple-100 text-purple-600'
                                      : 'bg-amber-100 text-amber-600'
                              }`}>
                                {activity.type === 'quest_completed' && <CheckCircle className="h-4 w-4" />}
                                {activity.type === 'task_completed' && <Map className="h-4 w-4" />}
                                {activity.type === 'achievement_unlocked' && <Medal className="h-4 w-4" />}
                                {activity.type === 'quest_started' && <MapPin className="h-4 w-4" />}
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium">{activity.title}</p>
                                  <p className="text-sm text-muted-foreground">{activity.date}</p>
                                </div>
                                {activity.points && (
                                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                    +{activity.points} pts
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Trophy className="mr-2 h-5 w-5" />
                        Your Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-sm font-medium">Level {Math.floor(user.points / 500) + 1}</h4>
                            <span className="text-xs text-muted-foreground">{user.points % 500}/500 XP</span>
                          </div>
                          <Progress value={(user.points % 500) / 5} className="h-2" />
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-4">Top Achievements</h4>
                          <div className="space-y-4">
                            {userAchievements.slice(0, 3).map((achievement) => (
                              <div key={achievement.id} className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                  {achievement.icon}
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{achievement.title}</p>
                                  <div className="w-full h-1.5 bg-secondary rounded-full mt-1">
                                    <div 
                                      className="h-full bg-primary rounded-full"
                                      style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                                    ></div>
                                  </div>
                                </div>
                                <div className="text-xs text-muted-foreground ml-2">
                                  {achievement.progress}/{achievement.total}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <Button variant="outline" className="w-full" onClick={() => setActiveTab("achievements")}>
                          View All Achievements
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="mr-2 h-5 w-5" />
                      Recent Rewards
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {userRewards.map((reward) => (
                        <div 
                          key={reward.id} 
                          className="bg-secondary/40 hover:bg-secondary/60 transition-colors rounded-lg p-4"
                        >
                          <div className="flex items-start gap-3">
                            {reward.image ? (
                              <img 
                                src={reward.image} 
                                alt={reward.title} 
                                className="w-10 h-10 rounded-md object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                                {reward.type === 'badge' && <Medal className="h-5 w-5 text-primary" />}
                                {reward.type === 'nft' && <Award className="h-5 w-5 text-purple-500" />}
                                {reward.type === 'coupon' && <Gift className="h-5 w-5 text-amber-500" />}
                              </div>
                            )}
                            <div>
                              <h4 className="font-medium text-sm">{reward.title}</h4>
                              <p className="text-xs text-muted-foreground">
                                {reward.date || (reward.expires && `Expires: ${reward.expires}`)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 flex justify-center">
                      <Button variant="ghost" onClick={() => setActiveTab("rewards")}>
                        View All Rewards
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            {/* Achievements Tab */}
            <TabsContent value="achievements">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Medal className="mr-2 h-5 w-5" />
                      Your Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {userAchievements.map((achievement) => (
                        <div 
                          key={achievement.id} 
                          className="border rounded-lg p-4 hover:border-primary/20 transition-colors"
                        >
                          <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                              {achievement.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium mb-1">{achievement.title}</h3>
                              <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-medium">Progress</span>
                                <span className="text-xs text-muted-foreground">
                                  {achievement.progress}/{achievement.total}
                                </span>
                              </div>
                              <div className="w-full h-2 bg-secondary rounded-full">
                                <div 
                                  className="h-full bg-primary rounded-full transition-all duration-500"
                                  style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 text-center">
                      <p className="text-sm text-muted-foreground">
                        Continue completing quests and tasks to unlock more achievements!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            {/* Rewards Tab */}
            <TabsContent value="rewards">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Gift className="mr-2 h-5 w-5" />
                      Your Rewards
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {userRewards.map((reward) => (
                        <div 
                          key={reward.id} 
                          className="bg-white dark:bg-card shadow-elegant rounded-lg overflow-hidden border border-border hover:border-primary/20 transition-all hover:-translate-y-1 duration-300"
                        >
                          {reward.image && (
                            <div className="h-32 overflow-hidden">
                              <img 
                                src={reward.image} 
                                alt={reward.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="p-4">
                            <div className="flex items-center gap-2 mb-1">
                              {reward.type === 'badge' && <Medal className="h-4 w-4 text-blue-500" />}
                              {reward.type === 'nft' && <Award className="h-4 w-4 text-purple-500" />}
                              {reward.type === 'coupon' && <Gift className="h-4 w-4 text-amber-500" />}
                              <span className="text-xs font-medium uppercase text-muted-foreground">
                                {reward.type}
                              </span>
                            </div>
                            <h3 className="font-medium mb-2">{reward.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{reward.description}</p>
                            
                            {reward.code && (
                              <div className="bg-secondary/50 rounded p-2 text-center">
                                <p className="text-xs text-muted-foreground mb-1">Coupon Code</p>
                                <p className="font-mono font-medium">{reward.code}</p>
                              </div>
                            )}
                            
                            <div className="mt-3 text-xs text-muted-foreground">
                              {reward.date && <p>Earned: {reward.date}</p>}
                              {reward.expires && <p>Expires: {reward.expires}</p>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 p-6 bg-primary/5 rounded-lg text-center">
                      <Gift className="h-8 w-8 text-primary/60 mx-auto mb-3" />
                      <h3 className="text-lg font-medium mb-2">Earn More Rewards</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Complete quests, unlock achievements, and level up to earn exclusive rewards!
                      </p>
                      <Button onClick={() => navigate('/quests')}>
                        Explore Quests
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile;
