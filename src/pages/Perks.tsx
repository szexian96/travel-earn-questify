
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Award, Gift, Star, ScrollText, Map, Check, AlertCircle, Wine, Sprout, Utensils, Coffee, Leaf, Bike } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Sample perks data - in a real app, this would come from an API
const PERKS_DATA = [
  {
    id: '1',
    title: 'Premium Story Access',
    description: 'Get access to premium stories for 30 days',
    icon: <ScrollText size={24} />,
    pointsCost: 500,
    category: 'digital'
  },
  {
    id: '2',
    title: 'Custom Avatar Frame',
    description: 'Unlock a special avatar frame for your profile',
    icon: <Award size={24} />,
    pointsCost: 300,
    category: 'digital'
  },
  {
    id: '3',
    title: 'Route Creator Access',
    description: 'Create and publish your own custom routes',
    icon: <Map size={24} />,
    pointsCost: 800,
    category: 'digital'
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
    category: 'digital'
  },
  {
    id: '6',
    title: 'Traditional Sake Set',
    description: 'Handcrafted ceramic sake set from a local brewery',
    icon: <Wine size={24} />,
    pointsCost: 2500,
    category: 'physical'
  },
  {
    id: '7',
    title: 'Gourmet Mushroom Growing Kit',
    description: 'Grow your own shiitake and maitake mushrooms at home',
    icon: <Sprout size={24} />,
    pointsCost: 1800,
    category: 'physical'
  },
  {
    id: '8',
    title: 'Artisanal Tea Collection',
    description: 'Selection of premium teas from local producers',
    icon: <Coffee size={24} />,
    pointsCost: 1500,
    category: 'physical'
  },
  {
    id: '9',
    title: 'Local Farm Cooking Class',
    description: 'Hands-on cooking class using local ingredients',
    icon: <Utensils size={24} />,
    pointsCost: 3000,
    category: 'experience'
  },
  {
    id: '10',
    title: 'Botanical Garden Tour',
    description: 'Guided tour of regional botanical gardens with a botanist',
    icon: <Leaf size={24} />,
    pointsCost: 2000,
    category: 'experience'
  },
  {
    id: '11',
    title: 'City Bike Rental Pass',
    description: '3-day bike rental pass to explore the city',
    icon: <Bike size={24} />,
    pointsCost: 1200,
    category: 'experience'
  }
];

const Perks = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isExchangeDialogOpen, setIsExchangeDialogOpen] = useState(false);
  const [selectedPerk, setSelectedPerk] = useState(null);
  const [exchangeStatus, setExchangeStatus] = useState<'confirming' | 'processing' | 'success' | 'error'>('confirming');

  // For demo purposes, let's give the user some points if they don't have any
  const userPoints = user?.points || 1000; // Default to 1000 points for demo

  const categories = Array.from(new Set(PERKS_DATA.map(perk => perk.category)));
  
  const filteredPerks = selectedCategory 
    ? PERKS_DATA.filter(perk => perk.category === selectedCategory)
    : PERKS_DATA;

  const handleOpenExchangeDialog = (perk) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to exchange points for perks",
        variant: "destructive"
      });
      return;
    }

    if (userPoints < perk.pointsCost) {
      toast({
        title: "Insufficient Points",
        description: `You need ${perk.pointsCost - userPoints} more points for this perk`,
        variant: "destructive"
      });
      return;
    }

    setSelectedPerk(perk);
    setExchangeStatus('confirming');
    setIsExchangeDialogOpen(true);
  };

  const handleExchangePoints = () => {
    setExchangeStatus('processing');
    
    // Simulate API call
    setTimeout(() => {
      // Random success (80% chance) or error (20% chance) for demo purposes
      const isSuccess = Math.random() < 0.8;
      
      if (isSuccess) {
        setExchangeStatus('success');
        
        // Show success toast after dialog is closed
        setTimeout(() => {
          toast({
            title: "Perk Acquired!",
            description: `You've successfully exchanged ${selectedPerk.pointsCost} points for ${selectedPerk.title}`,
          });
        }, 1500);
      } else {
        setExchangeStatus('error');
      }
    }, 1500);
  };

  const handleCloseDialog = () => {
    setIsExchangeDialogOpen(false);
    // Reset status after animation completes
    setTimeout(() => setExchangeStatus('confirming'), 300);
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
            Exchange your hard-earned points for exclusive perks, real-world items, and unique experiences
          </p>
        </motion.div>
        
        {user && (
          <div className="mt-4 bg-primary/10 px-6 py-3 rounded-full">
            <span className="font-medium">Your balance: </span>
            <span className="font-bold">{userPoints} points</span>
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
                {perk.category === 'physical' && (
                  <div className="text-sm text-muted-foreground mt-2 bg-muted/50 p-2 rounded-md">
                    <p>Physical item will be shipped to your registered address</p>
                  </div>
                )}
                {perk.category === 'experience' && (
                  <div className="text-sm text-muted-foreground mt-2 bg-muted/50 p-2 rounded-md">
                    <p>Redeemable voucher will be sent to your email</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="pt-2">
                <Button 
                  className="w-full"
                  onClick={() => handleOpenExchangeDialog(perk)}
                  disabled={!user || userPoints < perk.pointsCost}
                >
                  {!user ? 'Sign in to Exchange' : 
                    userPoints < perk.pointsCost 
                      ? `Need ${perk.pointsCost - userPoints} more points` 
                      : 'Exchange Points'}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Exchange Dialog */}
      <Dialog open={isExchangeDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[425px]">
          {exchangeStatus === 'confirming' && selectedPerk && (
            <>
              <DialogHeader>
                <DialogTitle>Confirm Exchange</DialogTitle>
                <DialogDescription>
                  Are you sure you want to exchange {selectedPerk.pointsCost} points for this perk?
                </DialogDescription>
              </DialogHeader>
              <div className="my-6 p-4 border rounded-lg bg-background/50">
                <div className="flex items-start gap-4">
                  <div className="text-primary mt-1">{selectedPerk.icon}</div>
                  <div>
                    <h4 className="font-medium">{selectedPerk.title}</h4>
                    <p className="text-sm text-muted-foreground">{selectedPerk.description}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-between text-sm">
                  <span>Current balance:</span>
                  <span className="font-semibold">{userPoints} points</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Cost:</span>
                  <span className="font-semibold text-orange-500">-{selectedPerk.pointsCost} points</span>
                </div>
                <div className="mt-2 pt-2 border-t flex justify-between">
                  <span>New balance:</span>
                  <span className="font-semibold">{userPoints - selectedPerk.pointsCost} points</span>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={handleExchangePoints}>Confirm Exchange</Button>
              </DialogFooter>
            </>
          )}
          
          {exchangeStatus === 'processing' && (
            <div className="py-8 flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <DialogTitle className="text-center">Processing</DialogTitle>
              <DialogDescription className="text-center">
                Please wait while we process your exchange...
              </DialogDescription>
            </div>
          )}
          
          {exchangeStatus === 'success' && (
            <div className="py-8 flex flex-col items-center">
              <div className="rounded-full h-12 w-12 bg-green-100 flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <DialogTitle className="text-center">Success!</DialogTitle>
              <DialogDescription className="text-center mb-4">
                You have successfully exchanged points for {selectedPerk?.title}.
              </DialogDescription>
              <Button onClick={handleCloseDialog}>Close</Button>
            </div>
          )}
          
          {exchangeStatus === 'error' && (
            <div className="py-8 flex flex-col items-center">
              <div className="rounded-full h-12 w-12 bg-red-100 flex items-center justify-center mb-4">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <DialogTitle className="text-center">Exchange Failed</DialogTitle>
              <DialogDescription className="text-center mb-4">
                There was an error processing your exchange. Please try again.
              </DialogDescription>
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={handleExchangePoints}>Try Again</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Perks;
