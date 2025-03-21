
import React from 'react';
import { motion } from 'framer-motion';
import { Route, Map, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ModelRouteCard, { ModelRoute } from '@/components/ModelRouteCard';

// Mock data for model routes
const mockRoutes: ModelRoute[] = [
  {
    id: 'kyoto-1',
    title: 'Kyoto Cultural Tour',
    description: 'Explore the ancient temples, shrines, and traditional districts of the old capital of Japan.',
    thumbnail: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    location: 'Kyoto, Japan',
    duration: '3 days',
    distance: '12 km',
    spots: {
      total: 8,
      visited: 3,
    },
    difficulty: 'medium',
    tags: ['Temples', 'Culture', 'History'],
  },
  {
    id: 'tokyo-1',
    title: 'Tokyo City Explorer',
    description: 'From ancient temples to futuristic skyscrapers, experience the dynamic contrasts of Japan's capital.',
    thumbnail: 'https://images.unsplash.com/photo-1532236204992-f5e85c024202?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1202&q=80',
    location: 'Tokyo, Japan',
    duration: '4 days',
    distance: '18 km',
    spots: {
      total: 10,
      visited: 2,
    },
    difficulty: 'easy',
    tags: ['Urban', 'Shopping', 'Food'],
  },
  {
    id: 'okinawa-1',
    title: 'Okinawa Island Hopping',
    description: 'Discover the tropical paradise of Okinawa with its pristine beaches, unique culture, and delicious cuisine.',
    thumbnail: 'https://images.unsplash.com/photo-1606982664878-b8ea5f6c3935?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    location: 'Okinawa, Japan',
    duration: '5 days',
    distance: '45 km',
    spots: {
      total: 6,
      visited: 0,
    },
    difficulty: 'hard',
    tags: ['Beaches', 'Islands', 'Adventure'],
  },
  {
    id: 'hakone-1',
    title: 'Hakone Hot Springs Retreat',
    description: 'Relax in natural hot springs with views of Mt. Fuji and explore the volcanic Hakone area.',
    thumbnail: 'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    location: 'Hakone, Japan',
    duration: '2 days',
    distance: '8 km',
    spots: {
      total: 5,
      visited: 1,
    },
    difficulty: 'easy',
    tags: ['Onsen', 'Nature', 'Relaxation'],
  },
];

const ModelRoutes = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-container"
    >
      <div className="flex items-center mb-6">
        <Route className="h-8 w-8 mr-3 text-tourii-red" />
        <h1 className="text-3xl font-bold">Model Routes</h1>
      </div>
      
      <p className="text-lg text-muted-foreground mb-8">
        Curated travel itineraries that guide you through the best of Japan, stop by stop.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Input 
            placeholder="Search routes..." 
            className="pl-10"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
          </div>
        </div>
        
        <Button variant="outline" className="flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
        
        <Button className="flex items-center">
          <Map className="h-4 w-4 mr-2" />
          Map View
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockRoutes.map((route) => (
          <ModelRouteCard key={route.id} route={route} />
        ))}
      </div>
    </motion.div>
  );
};

export default ModelRoutes;
