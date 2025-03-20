
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Clock, Map, Users } from 'lucide-react';

export type Quest = {
  id: string;
  title: string;
  description: string;
  location: string;
  thumbnail: string;
  rewards: {
    points: number;
    nft?: boolean;
  };
  difficulty: 'easy' | 'medium' | 'hard';
  duration: string;
  tasks: {
    total: number;
    completed: number;
  };
  status: 'available' | 'active' | 'completed';
  isGroupActivity?: boolean;
  tags: string[];
};

interface QuestCardProps {
  quest: Quest;
}

const QuestCard: React.FC<QuestCardProps> = ({ quest }) => {
  const difficultyColor = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-amber-100 text-amber-800',
    hard: 'bg-red-100 text-red-800',
  };

  const statusColor = {
    available: 'bg-blue-100 text-blue-800',
    active: 'bg-purple-100 text-purple-800',
    completed: 'bg-emerald-100 text-emerald-800',
  };

  return (
    <Link to={`/quests/${quest.id}`}>
      <Card className="h-full overflow-hidden transition-all duration-300 hover-lift group">
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <img 
            src={quest.thumbnail} 
            alt={quest.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 z-20 p-4 w-full">
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="secondary" className={statusColor[quest.status]}>
                {quest.status.charAt(0).toUpperCase() + quest.status.slice(1)}
              </Badge>
              <Badge variant="secondary" className={difficultyColor[quest.difficulty]}>
                {quest.difficulty.charAt(0).toUpperCase() + quest.difficulty.slice(1)}
              </Badge>
              {quest.isGroupActivity && (
                <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">
                  <Users className="h-3 w-3 mr-1" />
                  Group
                </Badge>
              )}
            </div>
            <h3 className="text-white font-semibold text-xl tracking-tight line-clamp-2">
              {quest.title}
            </h3>
          </div>
        </div>

        <CardContent className="p-4">
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {quest.description}
          </p>
          
          <div className="flex items-center mt-4 text-sm text-muted-foreground">
            <Map className="h-4 w-4 mr-1" />
            <span className="line-clamp-1">{quest.location}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {quest.tags.slice(0, 3).map((tag, i) => (
              <Badge key={i} variant="outline" className="bg-secondary/50">
                {tag}
              </Badge>
            ))}
            {quest.tags.length > 3 && (
              <Badge variant="outline" className="bg-secondary/50">
                +{quest.tags.length - 3}
              </Badge>
            )}
          </div>
          
          {quest.status !== 'available' && (
            <div className="mt-4">
              <div className="text-xs text-muted-foreground mb-1 flex justify-between">
                <span>Progress</span>
                <span>{Math.round((quest.tasks.completed / quest.tasks.total) * 100)}%</span>
              </div>
              <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${(quest.tasks.completed / quest.tasks.total) * 100}%` }}
                />
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-1" />
            <span>{quest.duration}</span>
          </div>
          
          <div className="flex items-center font-medium">
            <Award className="h-4 w-4 mr-1 text-amber-500" />
            <span className="text-foreground">{quest.rewards.points} points</span>
            {quest.rewards.nft && (
              <Badge className="ml-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0">
                NFT
              </Badge>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default QuestCard;
