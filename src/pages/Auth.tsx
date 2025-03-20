
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import AuthButtons from '@/components/AuthButtons';
import { useAuth } from '@/context/AuthContext';
import { KeyRound, ShieldCheck, Zap } from 'lucide-react';

const Auth = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/quests');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 pt-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 max-w-6xl mx-auto">
            {/* Left Column - Auth Form */}
            <motion.div 
              className="w-full lg:w-1/2 flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-full max-w-md mx-auto">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold mb-3">Welcome to Questify</h1>
                  <p className="text-muted-foreground">
                    Sign in to start exploring and completing quests
                  </p>
                </div>
                
                <AuthButtons />
              </div>
            </motion.div>
            
            {/* Right Column - Features */}
            <motion.div 
              className="w-full lg:w-1/2 lg:pl-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-secondary/30 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-elegant">
                <h2 className="text-2xl font-bold mb-6">Why Join Questify?</h2>
                
                <ul className="space-y-8">
                  <li className="flex">
                    <div className="mr-4 flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <KeyRound className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        Seamless Authentication
                      </h3>
                      <p className="text-muted-foreground">
                        Sign in with your favorite social account or crypto wallet. 
                        Your data is secure and we never share your information.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className="mr-4 flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Zap className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        Unique Experiences
                      </h3>
                      <p className="text-muted-foreground">
                        Discover hidden gems, complete exciting challenges, and create 
                        unforgettable memories at destinations around the world.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className="mr-4 flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <ShieldCheck className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        Earn While You Explore
                      </h3>
                      <p className="text-muted-foreground">
                        Complete quests to earn points, badges, and exclusive NFTs. 
                        Redeem your rewards for travel discounts and unique perks.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      
      <footer className="py-8 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} Questify. All rights reserved.
            </p>
            
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Help Center
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Auth;
