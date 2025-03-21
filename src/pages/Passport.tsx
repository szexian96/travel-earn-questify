
import React from 'react';
import { motion } from 'framer-motion';
import { Stamp, Award, Map, Clock, CalendarDays, MapPin, BookOpen, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DigitalPassport, { HankoStamp } from '@/components/DigitalPassport';
import { Button } from '@/components/ui/button';

// Mock passport data
const mockUserData = {
  username: 'TravelLover',
  userImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1522&q=80',
  level: 3,
  touriiPoints: 1250,
  stamps: [
    {
      id: 'stamp-1',
      name: 'Fushimi Inari',
      location: 'Kyoto',
      date: '2023-05-15',
      image: '',
    },
    {
      id: 'stamp-2',
      name: 'Kiyomizu-dera',
      location: 'Kyoto',
      date: '2023-05-16',
      image: '',
    },
    {
      id: 'stamp-3',
      name: 'Gion',
      location: 'Kyoto',
      date: '2023-05-16',
      image: '',
    },
  ] as HankoStamp[],
  achievements: {
    total: 15,
    unlocked: 5,
  },
};

// Mock activity data
const mockActivityData = [
  {
    id: 'activity-1',
    type: 'check-in',
    title: 'Visited Fushimi Inari Shrine',
    date: '2023-05-15',
    points: 150,
    location: 'Kyoto, Japan',
  },
  {
    id: 'activity-2',
    type: 'quest-complete',
    title: 'Completed "Hidden Kyoto" quest',
    date: '2023-05-16',
    points: 300,
    location: 'Kyoto, Japan',
  },
  {
    id: 'activity-3',
    type: 'chapter-unlock',
    title: 'Unlocked Chapter 3 of "Kyoto Legends"',
    date: '2023-05-16',
    points: 100,
    location: null,
  },
  {
    id: 'activity-4',
    type: 'check-in',
    title: 'Visited Kiyomizu-dera Temple',
    date: '2023-05-16',
    points: 150,
    location: 'Kyoto, Japan',
  },
  {
    id: 'activity-5',
    type: 'check-in',
    title: 'Visited Gion District',
    date: '2023-05-16',
    points: 150,
    location: 'Kyoto, Japan',
  },
];

// Mock achievements data
const mockAchievements = [
  {
    id: 'achievement-1',
    name: 'Kyoto Explorer',
    description: 'Visit 5 locations in Kyoto',
    icon: <Map className="h-5 w-5 text-tourii-red" />,
    progress: {
      current: 3,
      target: 5,
    },
    isUnlocked: false,
    rewardPoints: 200,
  },
  {
    id: 'achievement-2',
    name: 'Story Enthusiast',
    description: 'Complete 3 story chapters',
    icon: <Clock className="h-5 w-5 text-tourii-red" />,
    progress: {
      current: 3,
      target: 3,
    },
    isUnlocked: true,
    rewardPoints: 150,
  },
  {
    id: 'achievement-3',
    name: 'Early Adventurer',
    description: 'Join Tourii in its first month',
    icon: <CalendarDays className="h-5 w-5 text-tourii-red" />,
    progress: {
      current: 1,
      target: 1,
    },
    isUnlocked: true,
    rewardPoints: 100,
  },
];

const Passport = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-container"
    >
      <div className="flex items-center mb-6">
        <Stamp className="h-8 w-8 mr-3 text-tourii-red" />
        <h1 className="text-3xl font-bold">Digital Passport</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <DigitalPassport
            username={mockUserData.username}
            userImage={mockUserData.userImage}
            level={mockUserData.level}
            touriiPoints={mockUserData.touriiPoints}
            stamps={mockUserData.stamps}
            achievements={mockUserData.achievements}
          />
          
          <div className="mt-6 tourii-card p-4">
            <h3 className="text-lg font-medium mb-3 flex items-center">
              <Award className="h-5 w-5 mr-2 text-tourii-mustard" />
              Tourii Points
            </h3>
            
            <p className="text-sm text-muted-foreground mb-4">
              Earn points by completing quests, visiting locations, and unlocking story chapters.
              Redeem your points for travel discounts and special rewards.
            </p>
            
            <div className="bg-secondary/40 p-3 rounded-lg flex items-center justify-between">
              <span className="font-medium">{mockUserData.touriiPoints} Points</span>
              <Button size="sm">Redeem</Button>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <Tabs defaultValue="activity">
            <TabsList className="mb-4">
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="stamps">Hanko Stamps</TabsTrigger>
            </TabsList>
            
            <TabsContent value="activity">
              <div className="space-y-4">
                {mockActivityData.map((activity) => (
                  <div 
                    key={activity.id}
                    className="tourii-card p-4 flex items-start"
                  >
                    <div className="h-10 w-10 rounded-full bg-tourii-red/10 flex items-center justify-center mr-3 flex-shrink-0">
                      {activity.type === 'check-in' && <MapPin className="h-5 w-5 text-tourii-red" />}
                      {activity.type === 'quest-complete' && <Award className="h-5 w-5 text-tourii-red" />}
                      {activity.type === 'chapter-unlock' && <BookOpen className="h-5 w-5 text-tourii-red" />}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium">{activity.title}</h4>
                      <div className="flex items-center text-sm text-muted-foreground mb-1">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>
                          {new Date(activity.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      {activity.location && (
                        <div className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          <span>{activity.location}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-tourii-warm-grey-2/50 dark:bg-tourii-charcoal/30 px-3 py-1 rounded-full flex items-center text-sm ml-2">
                      <Award className="h-3.5 w-3.5 mr-1 text-tourii-mustard" />
                      <span>{activity.points} points</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="achievements">
              <div className="space-y-4">
                {mockAchievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className="tourii-card p-4"
                  >
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-tourii-red/10 flex items-center justify-center mr-3 flex-shrink-0">
                        {achievement.icon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{achievement.name}</h4>
                          <div className="flex items-center text-sm">
                            <Award className="h-3.5 w-3.5 mr-1 text-tourii-mustard" />
                            <span>{achievement.rewardPoints} points</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {achievement.description}
                        </p>
                        
                        {achievement.isUnlocked ? (
                          <div className="flex items-center text-green-600 dark:text-green-400">
                            <Check className="h-4 w-4 mr-1" />
                            <span className="text-sm font-medium">Achievement unlocked!</span>
                          </div>
                        ) : (
                          <div>
                            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                              <span>Progress</span>
                              <span>
                                {achievement.progress.current} of {achievement.progress.target} completed
                              </span>
                            </div>
                            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-tourii-red rounded-full transition-all duration-500"
                                style={{ width: `${(achievement.progress.current / achievement.progress.target) * 100}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="stamps">
              <div className="tourii-card p-6">
                <h3 className="text-xl font-medium mb-4">Hanko Stamp Collection</h3>
                <p className="text-muted-foreground mb-6">
                  Collect traditional Japanese Hanko stamps by checking in at tourist spots across Japan.
                  Each stamp represents a unique location you've visited on your journey.
                </p>
                
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                  {mockUserData.stamps.map((stamp, index) => (
                    <motion.div
                      key={stamp.id}
                      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      className="relative"
                    >
                      <div 
                        className="hanko-stamp aspect-square flex flex-col items-center justify-center p-2 rounded-full"
                        style={{ background: "rgba(174, 49, 17, 0.9)" }}
                      >
                        {stamp.image ? (
                          <img src={stamp.image} alt={stamp.name} className="w-full h-full" />
                        ) : (
                          <>
                            <span className="text-xs text-center font-bold leading-tight">
                              {stamp.name}
                            </span>
                            <span className="text-[8px] mt-0.5 opacity-80">
                              {new Date(stamp.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </span>
                          </>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Empty stamp placeholders */}
                  {Array.from({ length: 15 }).map((_, i) => (
                    i >= mockUserData.stamps.length && (
                      <div 
                        key={`empty-${i}`}
                        className="aspect-square border-2 border-dashed border-tourii-warm-grey-3 dark:border-tourii-charcoal/40 rounded-full"
                      />
                    )
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </motion.div>
  );
};

export default Passport;
