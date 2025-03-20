
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Globe, Map, Award, ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-texture opacity-5"></div>
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-radial from-primary/5 to-transparent"></div>
        <div className="absolute top-1/3 right-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-0 left-[-5%] w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary mb-6 text-sm font-medium animate-fade-in">
            <span>Explore the world. Earn rewards.</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
            Travel. Complete Quests. <br />
            <span className="text-primary">Earn Rewards.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto animate-fade-in">
            Discover new places, complete exciting challenges, and earn points or NFTs. 
            Join our community of adventurers and unlock unique experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in">
            {isAuthenticated ? (
              <Button asChild size="lg" className="rounded-full px-8 py-6 text-base font-medium">
                <Link to="/quests">
                  Browse Quests
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <Button asChild size="lg" className="rounded-full px-8 py-6 text-base font-medium">
                <Link to="/auth">
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            )}
            
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-6 text-base font-medium">
              <Link to="/explore">
                Explore
                <Map className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-black/20 backdrop-blur-sm shadow-elegant rounded-xl p-6 text-center transition-transform hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Explore Locations</h3>
              <p className="text-sm text-muted-foreground">
                Discover new places and complete location-based quests around the world.
              </p>
            </div>
            
            <div className="bg-white dark:bg-black/20 backdrop-blur-sm shadow-elegant rounded-xl p-6 text-center transition-transform hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Map className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Complete Challenges</h3>
              <p className="text-sm text-muted-foreground">
                Take photos, answer questions, visit landmarks, and share your experiences.
              </p>
            </div>
            
            <div className="bg-white dark:bg-black/20 backdrop-blur-sm shadow-elegant rounded-xl p-6 text-center transition-transform hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Earn Rewards</h3>
              <p className="text-sm text-muted-foreground">
                Collect points, unlock achievements, and receive exclusive NFT rewards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
