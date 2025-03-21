
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Route, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type ModelRoute = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  location: string;
  duration: string;
  distance: string;
  spots: {
    total: number;
    visited: number;
  };
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
};

interface ModelRouteCardProps {
  route: ModelRoute;
}

const ModelRouteCard: React.FC<ModelRouteCardProps> = ({ route }) => {
  const difficultyColor = {
    easy: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    hard: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <Link to={`/routes/${route.id}`}>
      <Card className="h-full overflow-hidden transition-all duration-300 hover-lift group tourii-card">
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-tourii-charcoal/70 to-transparent z-10" />
          <img 
            src={route.thumbnail} 
            alt={route.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 z-20 p-4 w-full">
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="secondary" className={difficultyColor[route.difficulty]}>
                {route.difficulty.charAt(0).toUpperCase() + route.difficulty.slice(1)}
              </Badge>
            </div>
            <h3 className="text-white font-semibold text-xl tracking-tight line-clamp-2">
              {route.title}
            </h3>
          </div>
        </div>

        <CardContent className="p-4">
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {route.description}
          </p>
          
          <div className="flex items-center mt-4 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="line-clamp-1">{route.location}</span>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="flex flex-col items-center p-2 bg-secondary/40 rounded-md">
              <Clock className="h-4 w-4 mb-1 text-muted-foreground" />
              <span className="text-xs text-center">{route.duration}</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-secondary/40 rounded-md">
              <Route className="h-4 w-4 mb-1 text-muted-foreground" />
              <span className="text-xs text-center">{route.distance}</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-secondary/40 rounded-md">
              <MapPin className="h-4 w-4 mb-1 text-muted-foreground" />
              <span className="text-xs text-center">{route.spots.total} spots</span>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="text-xs text-muted-foreground mb-1 flex justify-between">
              <span>Progress</span>
              <span>{Math.round((route.spots.visited / route.spots.total) * 100)}%</span>
            </div>
            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-tourii-red rounded-full transition-all duration-500"
                style={{ width: `${(route.spots.visited / route.spots.total) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button className="w-full group">
            <Map className="mr-2 h-4 w-4" />
            View Route
            <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ModelRouteCard;
