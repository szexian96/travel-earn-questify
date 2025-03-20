
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { ChevronRight, ArrowRight, CheckCircle, Globe, Map, Trophy, Star, Users } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pb-20">
        <Hero />
        
        {/* How It Works Section */}
        <section className="py-20 bg-secondary/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-texture opacity-5"></div>
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
              <span className="text-sm font-medium text-primary mb-3 block">Simple Process</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">How Questify Works</h2>
              <p className="text-muted-foreground">
                Join our community of explorers and start earning rewards through simple steps
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: <Globe className="h-6 w-6" />,
                  title: "Find Quests",
                  description: "Browse through our curated list of quests in your area or around the world"
                },
                {
                  icon: <CheckCircle className="h-6 w-6" />,
                  title: "Complete Tasks",
                  description: "Visit locations, upload photos, answer questions, and share your experiences"
                },
                {
                  icon: <Trophy className="h-6 w-6" />,
                  title: "Earn Rewards",
                  description: "Collect points, unlock unique NFTs, and access exclusive experiences"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full border-none shadow-elegant glass-card">
                    <CardContent className="pt-6">
                      <div className="relative mb-6">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                          {step.icon}
                        </div>
                        <div className="absolute top-0 right-0 w-7 h-7 bg-primary rounded-full text-white flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground text-sm">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/quests">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Featured Quests */}
        <section className="py-20 container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <span className="text-sm font-medium text-primary mb-2 block">Featured</span>
              <h2 className="text-3xl font-bold">Popular Quests</h2>
            </div>
            <Button asChild variant="ghost" className="mt-4 md:mt-0">
              <Link to="/quests" className="flex items-center">
                View All Quests <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: "quest-1",
                title: "San Francisco Landmarks",
                description: "Explore the iconic landmarks of San Francisco and capture the perfect photos.",
                image: "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&q=80",
                location: "San Francisco, CA",
                tags: ["City", "Photography", "Landmarks"],
                difficulty: "Medium",
                reward: 500
              },
              {
                id: "quest-2",
                title: "Tokyo Food Adventure",
                description: "Discover the culinary delights of Tokyo, from street food to fine dining.",
                image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80",
                location: "Tokyo, Japan",
                tags: ["Food", "International", "Urban"],
                difficulty: "Easy",
                reward: 400
              },
              {
                id: "quest-3",
                title: "Bali Spiritual Journey",
                description: "Visit ancient temples and sacred sites across the island of Bali.",
                image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80",
                location: "Bali, Indonesia",
                tags: ["Culture", "Spiritual", "Nature"],
                difficulty: "Medium",
                reward: 600
              }
            ].map((quest, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/quests/${quest.id}`}>
                  <Card className="h-full overflow-hidden hover-lift group">
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                      <img 
                        src={quest.image} 
                        alt={quest.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 z-20 p-4 w-full">
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
                        {quest.tags.map((tag, i) => (
                          <div key={i} className="badge badge-outline">
                            {tag}
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-xs py-1 px-2 rounded-full bg-secondary/70 text-foreground/80">
                          {quest.difficulty}
                        </span>
                        
                        <div className="flex items-center font-medium">
                          <Trophy className="h-4 w-4 mr-1 text-amber-500" />
                          <span className="text-foreground">{quest.reward} pts</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Community Section */}
        <section className="py-20 bg-secondary/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-texture opacity-5"></div>
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <span className="text-sm font-medium text-primary mb-3 block">Community</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Global Community</h2>
              <p className="text-muted-foreground">
                Connect with fellow explorers, share experiences, and participate in group activities
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-full border-none shadow-elegant glass-card">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
                      <Users className="h-6 w-6" />
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">Group Activities</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Team up with other adventurers to tackle challenges that require collaboration.
                    </p>
                    
                    <ul className="space-y-2">
                      {["Form teams for specific quests", "Meet new people with similar interests", "Earn bonus rewards for group activities"].map((item, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-full border-none shadow-elegant glass-card">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
                      <Star className="h-6 w-6" />
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">Leaderboards & Recognition</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Compete with other users, climb the leaderboards, and earn recognition for your achievements.
                    </p>
                    
                    <ul className="space-y-2">
                      {["Weekly and monthly leaderboards", "Special badges for top performers", "Exclusive rewards for consistent participation"].map((item, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
            <div className="text-center mt-12">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/auth">
                  Join Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-secondary/50 py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="flex items-center space-x-2">
                <Globe className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl">Questify</span>
              </Link>
              <p className="text-sm text-muted-foreground mt-2">
                Travel. Complete Quests. Earn Rewards.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
              <div>
                <h4 className="font-medium mb-3 text-sm">Navigation</h4>
                <ul className="space-y-2">
                  {["Home", "Quests", "Explore", "Rewards"].map((item, i) => (
                    <li key={i}>
                      <Link to={item === "Home" ? "/" : `/${item.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-3 text-sm">Legal</h4>
                <ul className="space-y-2">
                  {["Terms of Service", "Privacy Policy", "Cookie Policy"].map((item, i) => (
                    <li key={i}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-3 text-sm">Connect</h4>
                <ul className="space-y-2">
                  {["Twitter", "Discord", "Instagram"].map((item, i) => (
                    <li key={i}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-10 pt-6 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Questify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
