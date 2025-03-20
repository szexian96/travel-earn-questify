
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import QuestCard, { Quest } from '@/components/QuestCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MapComponent from '@/components/MapComponent';
import { 
  Search, 
  Filter, 
  MapPin, 
  Grid3X3, 
  Map as MapIcon,
  ChevronDown,
  SlidersHorizontal,
  CheckCircle2,
  Clock,
  X
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

// Mock data for quests
const mockQuests: Quest[] = [
  {
    id: "q1",
    title: "Golden Gate Adventure",
    description: "Explore the iconic Golden Gate Bridge and surrounding parks, capturing the perfect photos and discovering hidden viewpoints.",
    location: "San Francisco, CA",
    thumbnail: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80",
    rewards: {
      points: 500,
      nft: true
    },
    difficulty: "medium",
    duration: "3-4 hours",
    tasks: {
      total: 5,
      completed: 0
    },
    status: "available",
    tags: ["Landmarks", "Photography", "Urban"]
  },
  {
    id: "q2",
    title: "Tokyo Night Lights",
    description: "Experience the vibrant nightlife of Tokyo's Shibuya district, visiting iconic spots and sampling local cuisine.",
    location: "Tokyo, Japan",
    thumbnail: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&q=80",
    rewards: {
      points: 750
    },
    difficulty: "hard",
    duration: "5-6 hours",
    tasks: {
      total: 7,
      completed: 2
    },
    status: "active",
    tags: ["Nightlife", "Food", "Urban"]
  },
  {
    id: "q3",
    title: "Ancient Temples of Bali",
    description: "Discover the spiritual side of Bali by visiting sacred temples and participating in traditional ceremonies.",
    location: "Bali, Indonesia",
    thumbnail: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80",
    rewards: {
      points: 600
    },
    difficulty: "medium",
    duration: "Full day",
    tasks: {
      total: 6,
      completed: 6
    },
    status: "completed",
    tags: ["Culture", "Spiritual", "History"]
  },
  {
    id: "q4",
    title: "Paris Museum Marathon",
    description: "Visit the most famous museums in Paris in one day, from the Louvre to the Musée d'Orsay.",
    location: "Paris, France",
    thumbnail: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80",
    rewards: {
      points: 450
    },
    difficulty: "easy",
    duration: "Full day",
    tasks: {
      total: 4,
      completed: 0
    },
    status: "available",
    tags: ["Art", "Museums", "Culture"]
  },
  {
    id: "q5",
    title: "New York Skyline Challenge",
    description: "Visit the best observation decks in New York City and capture stunning skyline photos from different perspectives.",
    location: "New York, NY",
    thumbnail: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80",
    rewards: {
      points: 550,
      nft: true
    },
    difficulty: "medium",
    duration: "2-3 hours",
    tasks: {
      total: 5,
      completed: 3
    },
    status: "active",
    isGroupActivity: true,
    tags: ["Photography", "Urban", "Views"]
  },
  {
    id: "q6",
    title: "Sydney Harbor Exploration",
    description: "Explore the iconic Sydney Harbor by foot and ferry, visiting key landmarks and hidden gems.",
    location: "Sydney, Australia",
    thumbnail: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80",
    rewards: {
      points: 400
    },
    difficulty: "easy",
    duration: "4-5 hours",
    tasks: {
      total: 4,
      completed: 0
    },
    status: "available",
    tags: ["Coastal", "Landmarks", "Walking"]
  }
];

// Location data for map component
const locations = [
  { id: "loc1", name: "Golden Gate Bridge", latitude: 37.8199, longitude: -122.4783 },
  { id: "loc2", name: "Shibuya Crossing", latitude: 35.6595, longitude: 139.7004 },
  { id: "loc3", name: "Uluwatu Temple", latitude: -8.8291, longitude: 115.0849 },
  { id: "loc4", name: "The Louvre", latitude: 48.8606, longitude: 2.3376 },
  { id: "loc5", name: "Empire State Building", latitude: 40.7484, longitude: -73.9857 },
  { id: "loc6", name: "Sydney Opera House", latitude: -33.8568, longitude: 151.2153 },
];

const Quests = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  
  // Filter quests based on tab, search query, and filters
  const filteredQuests = mockQuests.filter(quest => {
    // Filter by tab
    if (activeTab === "active" && quest.status !== "active") return false;
    if (activeTab === "available" && quest.status !== "available") return false;
    if (activeTab === "completed" && quest.status !== "completed") return false;
    
    // Filter by search query
    if (searchQuery && !quest.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !quest.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !quest.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by difficulty
    if (selectedDifficulty.length > 0 && !selectedDifficulty.includes(quest.difficulty)) {
      return false;
    }
    
    // Filter by types (tags)
    if (selectedTypes.length > 0 && !quest.tags.some(tag => selectedTypes.includes(tag))) {
      return false;
    }
    
    return true;
  });
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedDifficulty([]);
    setSelectedTypes([]);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-20">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          {/* Page Header */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-2">Quests</h1>
            <p className="text-muted-foreground">
              Discover and track your quests around the world
            </p>
          </motion.div>
          
          {/* Search and Filters */}
          <motion.div 
            className="mb-8 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search quests, locations, or activities..."
                className="pl-9 h-11"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            <div className="flex gap-2">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" className="h-11 gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span className="hidden sm:inline">Filters</span>
                    {(selectedDifficulty.length > 0 || selectedTypes.length > 0) && (
                      <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center ml-1">
                        {selectedDifficulty.length + selectedTypes.length}
                      </span>
                    )}
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full max-w-lg">
                    <DrawerHeader>
                      <DrawerTitle>Filter Quests</DrawerTitle>
                      <DrawerDescription>
                        Narrow down quests based on your preferences
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                      <div className="space-y-6">
                        {/* Difficulty filter */}
                        <div>
                          <h3 className="text-sm font-medium mb-3">Difficulty</h3>
                          <div className="space-y-2">
                            {["easy", "medium", "hard"].map((difficulty) => (
                              <div key={difficulty} className="flex items-center">
                                <Checkbox 
                                  id={`difficulty-${difficulty}`} 
                                  checked={selectedDifficulty.includes(difficulty)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedDifficulty([...selectedDifficulty, difficulty]);
                                    } else {
                                      setSelectedDifficulty(selectedDifficulty.filter(d => d !== difficulty));
                                    }
                                  }}
                                />
                                <Label htmlFor={`difficulty-${difficulty}`} className="ml-2">
                                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Types filter */}
                        <div>
                          <h3 className="text-sm font-medium mb-3">Quest Type</h3>
                          <div className="grid grid-cols-2 gap-2">
                            {["Landmarks", "Photography", "Urban", "Culture", "Food", "History", "Spiritual", "Walking", "Coastal", "Museums", "Art", "Nightlife"].map((type) => (
                              <div key={type} className="flex items-center">
                                <Checkbox 
                                  id={`type-${type}`} 
                                  checked={selectedTypes.includes(type)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedTypes([...selectedTypes, type]);
                                    } else {
                                      setSelectedTypes(selectedTypes.filter(t => t !== type));
                                    }
                                  }}
                                />
                                <Label htmlFor={`type-${type}`} className="ml-2">
                                  {type}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <DrawerFooter>
                      <div className="flex gap-3">
                        <Button 
                          variant="outline" 
                          onClick={clearFilters}
                          className="flex-1"
                        >
                          Clear Filters
                        </Button>
                        <DrawerClose asChild>
                          <Button className="flex-1">Apply Filters</Button>
                        </DrawerClose>
                      </div>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-11 gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="hidden sm:inline">Location</span>
                    <ChevronDown className="h-4 w-4 opacity-60" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuGroup>
                    {locations.map((location) => (
                      <DropdownMenuItem key={location.id} onClick={() => setSelectedLocation(location.id)}>
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{location.name}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSelectedLocation(null)}>
                    <span>All Locations</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <div className="flex border rounded-md overflow-hidden">
                <Button 
                  variant={viewMode === "grid" ? "default" : "ghost"} 
                  className="h-11 px-3 rounded-none"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === "map" ? "default" : "ghost"} 
                  className="h-11 px-3 rounded-none"
                  onClick={() => setViewMode("map")}
                >
                  <MapIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Filter pills */}
          {(selectedDifficulty.length > 0 || selectedTypes.length > 0) && (
            <motion.div 
              className="flex flex-wrap gap-2 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {selectedDifficulty.map((difficulty) => (
                <div key={difficulty} className="inline-flex items-center bg-secondary/80 rounded-full px-3 py-1 text-xs">
                  <span>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</span>
                  <button 
                    className="ml-2 rounded-full hover:bg-secondary"
                    onClick={() => setSelectedDifficulty(selectedDifficulty.filter(d => d !== difficulty))}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              
              {selectedTypes.map((type) => (
                <div key={type} className="inline-flex items-center bg-secondary/80 rounded-full px-3 py-1 text-xs">
                  <span>{type}</span>
                  <button 
                    className="ml-2 rounded-full hover:bg-secondary"
                    onClick={() => setSelectedTypes(selectedTypes.filter(t => t !== type))}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              
              <button 
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                onClick={clearFilters}
              >
                Clear all
              </button>
            </motion.div>
          )}
          
          {/* Tabs */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="w-full sm:w-auto grid grid-cols-4 sm:inline-flex h-11">
                <TabsTrigger value="all" className="flex gap-2 items-center">
                  All
                </TabsTrigger>
                <TabsTrigger value="available" className="flex gap-2 items-center">
                  <Clock className="h-4 w-4" />
                  Available
                </TabsTrigger>
                <TabsTrigger value="active" className="flex gap-2 items-center">
                  <MapPin className="h-4 w-4" />
                  Active
                </TabsTrigger>
                <TabsTrigger value="completed" className="flex gap-2 items-center">
                  <CheckCircle2 className="h-4 w-4" />
                  Completed
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>
          
          {/* Quests display */}
          <div>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredQuests.length > 0 ? (
                  filteredQuests.map((quest, index) => (
                    <motion.div
                      key={quest.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <QuestCard quest={quest} />
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-3 py-12 text-center">
                    <Filter className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-1">No quests found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or search query
                    </p>
                    <Button variant="outline" onClick={clearFilters}>
                      Clear all filters
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <MapComponent 
                  locations={locations} 
                  selectedLocationId={selectedLocation || undefined}
                  onLocationClick={(location) => {
                    setSelectedLocation(location.id === selectedLocation ? null : location.id);
                  }}
                />
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Quests in Selected Area</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredQuests.slice(0, 3).map((quest, index) => (
                      <motion.div
                        key={quest.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <QuestCard quest={quest} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Quests;
