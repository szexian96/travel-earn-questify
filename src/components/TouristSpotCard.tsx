
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Check, Camera, Users, Stamp } from 'lucide-react';
import { motion } from 'framer-motion';

export type TouristSpot = {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  location: string;
  estimatedDuration: string;
  distanceFromPrevious?: string;
  isCheckedIn: boolean;
  hasQuests: boolean;
  modelRouteId: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  tags: string[];
};

interface TouristSpotCardProps {
  spot: TouristSpot;
  index: number;
  isLast?: boolean;
}

const TouristSpotCard: React.FC<TouristSpotCardProps> = ({ spot, index, isLast = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="w-full"
    >
      <Card className="overflow-hidden model-route-card">
        <div className="relative h-40 sm:h-48 overflow-hidden">
          <img 
            src={spot.thumbnail} 
            alt={spot.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-2 right-2 z-10">
            {spot.isCheckedIn && (
              <div className="bg-green-500 text-white p-1 rounded-full">
                <Check className="h-4 w-4" />
              </div>
            )}
          </div>
          <div className="absolute bottom-2 left-2 z-10">
            <Badge className="bg-tourii-warm-grey text-tourii-charcoal">
              {index + 1}
            </Badge>
          </div>
          <h3 className="absolute bottom-2 left-10 right-2 text-white font-medium text-lg line-clamp-1 z-10">
            {spot.name}
          </h3>
        </div>
        
        <CardContent className="p-4">
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {spot.description}
          </p>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="truncate">{spot.location}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
              <span>{spot.estimatedDuration}</span>
            </div>
          </div>
          
          {spot.distanceFromPrevious && !isLast && (
            <div className="mt-3 pt-3 border-t border-dashed border-tourii-warm-grey-2 dark:border-tourii-charcoal/30 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Next stop</span>
              <span className="font-medium">{spot.distanceFromPrevious}</span>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
          {spot.hasQuests && (
            <Button variant="outline" size="sm" className="flex-1">
              <Camera className="h-4 w-4 mr-1" />
              Quests
            </Button>
          )}
          <Button 
            size="sm" 
            className={`flex-1 ${spot.isCheckedIn ? 'bg-green-500 hover:bg-green-600' : 'bg-tourii-red hover:bg-tourii-red/90'}`}
            disabled={spot.isCheckedIn}
          >
            {spot.isCheckedIn ? (
              <>
                <Stamp className="h-4 w-4 mr-1" />
                Checked In
              </>
            ) : (
              <>
                <MapPin className="h-4 w-4 mr-1" />
                Check In
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      {!isLast && (
        <div className="h-8 w-px bg-tourii-warm-grey-3 dark:bg-tourii-charcoal/40 mx-auto my-1"></div>
      )}
    </motion.div>
  );
};

export default TouristSpotCard;
