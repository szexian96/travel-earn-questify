
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Trophy, Star, Map } from 'lucide-react';

export type HankoStamp = {
  id: string;
  name: string;
  location: string;
  date: string;
  image: string;
};

interface DigitalPassportProps {
  username: string;
  userImage?: string;
  level: number;
  touriiPoints: number;
  stamps: HankoStamp[];
  achievements: {
    total: number;
    unlocked: number;
  };
}

const DigitalPassport: React.FC<DigitalPassportProps> = ({
  username,
  userImage,
  level,
  touriiPoints,
  stamps,
  achievements,
}) => {
  return (
    <Card className="overflow-hidden tourii-card relative">
      <div className="absolute top-0 left-0 w-full h-16 bg-tourii-red/80" />
      
      <CardHeader className="pt-20 pb-4 text-center relative z-10">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
          <div className="w-20 h-20 rounded-full border-4 border-tourii-warm-grey bg-tourii-warm-grey-2 overflow-hidden">
            {userImage ? (
              <img src={userImage} alt={username} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-tourii-charcoal">
                {username.substring(0, 1)}
              </div>
            )}
          </div>
        </div>
        
        <CardTitle className="text-xl font-bold">{username}'s Passport</CardTitle>
        <div className="flex items-center justify-center gap-2 mt-1">
          <div className="flex items-center">
            <Award className="h-4 w-4 text-tourii-mustard mr-1" />
            <span className="text-sm">Level {level}</span>
          </div>
          <div className="flex items-center">
            <Trophy className="h-4 w-4 text-tourii-red mr-1" />
            <span className="text-sm">{touriiPoints} Points</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="px-6 pb-6">
        <h4 className="font-medium text-lg mb-4 flex items-center">
          <Map className="h-5 w-5 mr-2 text-tourii-red" />
          Hanko Stamps Collection
        </h4>
        
        <div className="grid grid-cols-3 gap-4">
          {stamps.map((stamp, index) => (
            <motion.div
              key={stamp.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
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
          {Array.from({ length: Math.max(0, 9 - stamps.length) }).map((_, i) => (
            <div 
              key={`empty-${i}`}
              className="aspect-square border-2 border-dashed border-tourii-warm-grey-3 dark:border-tourii-charcoal/40 rounded-full"
            />
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-tourii-warm-grey-3 dark:border-tourii-charcoal/30">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium flex items-center">
              <Star className="h-4 w-4 mr-1 text-tourii-mustard" />
              Achievements
            </h4>
            <span className="text-sm text-muted-foreground">
              {achievements.unlocked}/{achievements.total} Unlocked
            </span>
          </div>
          
          <div className="h-2 w-full bg-tourii-warm-grey-3 dark:bg-tourii-charcoal/40 rounded-full overflow-hidden">
            <div 
              className="h-full bg-tourii-mustard rounded-full"
              style={{ width: `${(achievements.unlocked / achievements.total) * 100}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DigitalPassport;
