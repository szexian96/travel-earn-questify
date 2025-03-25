
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Award, Gift, Star, ScrollText, Map } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

// Sample perks data - in a real app, this would come from an API
const PERKS_DATA = [
  {
    id: '1',
    title: 'Premium Story Access',
    description: 'Get access to premium stories for 30 days',
    icon: <ScrollText size={24} />,
    pointsCost: 500,
    category: 'content'
  },
  {
    id: '2',
    title: 'Custom Avatar Frame',
    description: 'Unlock a special avatar frame for your profile',
    icon: <Award size={24} />,
    pointsCost: 300,
    category: 'cosmetic'
  },
  {
    id: '3',
    title: 'Route Creator Access',
    description: 'Create and publish your own custom routes',
    icon: <Map size={24} />,
    pointsCost: 800,
    category: 'feature'
  },
  {
    id: '4',
    title: 'Double Points Weekend',
    description: 'Earn double points for all activities this weekend',
    icon: <Star size={24} />,
    pointsCost: 400,
    category: 'boost'
  },
  {
    id: '5',
    title: 'Exclusive Quest Access',
    description: 'Unlock an exclusive limited-time quest',
    icon: <Trophy size={24} />,
    pointsCost: 1000,
    category: 'content'
  },
  {
    id: '6',
    title: 'Profile Spotlight',
    description: 'Get your profile featured on the explore page for a week',
    icon: <Gift size={24} />,
    pointsCost: 750,
    category: 'feature'
  }
];

const Perks = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(PERKS_DATA.map(perk => perk.category)));
  
  const filteredPerks = selectedCategory 
    ? PERKS_DATA.filter(perk => perk.category === selectedCategory)
    : PERKS_DATA;

  const handleExchangePoints = (perk) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to exchange points for perks",
        variant: "destructive"
      });
      return;
    }

    if ((user?.points || 0) < perk.pointsCost) {
      toast({
        title: "Insufficient Points",
        description: `You need ${perk.pointsCost - (user?.points || 0)} more points for this perk`,
        variant: "destructive"
      });
      return;
    }

    // Here you would call an API to exchange points and grant the perk
    // For now, we'll just show a success toast
    toast({
      title: "Perk Acquired!",
      description: `You've successfully exchanged ${perk.pointsCost} points for ${perk.title}`,
      variant: "default"
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-center mb-2">Perks Exchange</h1>
          <p className="text-muted-foreground text-center max-w-2xl">
            Exchange your hard-earned points for exclusive perks and rewards to enhance your Tourii experience
          </p>
        </motion.div>
        
        {user && (
          <div className="mt-4 bg-primary/10 px-6 py-3 rounded-full">
            <span className="font-medium">Your balance: </span>
            <span className="font-bold">{user.points || 0} points</span>
          </div>
        )}
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <Button 
          variant={selectedCategory === null ? "default" : "outline"} 
          size="sm"
          onClick={() => setSelectedCategory(null)}
        >
          All
        </Button>
        {categories.map(category => (
          <Button 
            key={category} 
            variant={selectedCategory === category ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Perks grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPerks.map((perk) => (
          <motion.div
            key={perk.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="h-full flex flex-col overflow-hidden border-2 hover:border-primary/50 transition-all">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge variant="outline" className="capitalize mb-2">
                    {perk.category}
                  </Badge>
                  <div className="flex items-center text-orange-500 font-bold">
                    <Star className="h-4 w-4 mr-1 fill-orange-500 text-orange-500" />
                    {perk.pointsCost}
                  </div>
                </div>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-primary">{perk.icon}</span>
                  {perk.title}
                </CardTitle>
                <CardDescription>{perk.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2 flex-grow">
                {/* Additional details could go here */}
              </CardContent>
              <CardFooter className="pt-2">
                <Button 
                  className="w-full"
                  onClick={() => handleExchangePoints(perk)}
                  disabled={!user || (user?.points || 0) < perk.pointsCost}
                >
                  {!user ? 'Sign in to Exchange' : 
                    (user?.points || 0) < perk.pointsCost 
                      ? `Need ${perk.pointsCost - (user?.points || 0)} more points` 
                      : 'Exchange Points'}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Perks;
