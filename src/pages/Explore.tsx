
import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Map, MapPin } from 'lucide-react';
import { TouristSpotCard } from '@/components/TouristSpotCard';

// Mock data for tourist spots
const mockTouristSpots = [
  {
    id: '1',
    name: 'Fushimi Inari Shrine',
    description: 'Famous shrine with thousands of vermilion torii gates.',
    location: 'Kyoto',
    image: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    rating: 4.8,
    visitCount: 1245,
    tags: ['Shrine', 'Cultural', 'Hiking'],
    isPopular: true
  },
  {
    id: '2',
    name: 'Tokyo Skytree',
    description: 'Tallest structure in Japan with observation decks.',
    location: 'Tokyo',
    image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=836&q=80',
    rating: 4.5,
    visitCount: 2100,
    tags: ['Modern', 'View', 'Shopping'],
    isPopular: true
  },
  {
    id: '3',
    name: 'Arashiyama Bamboo Grove',
    description: 'A natural forest of bamboo in western Kyoto.',
    location: 'Kyoto',
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1210&q=80',
    rating: 4.7,
    visitCount: 985,
    tags: ['Nature', 'Photography', 'Walking'],
    isPopular: false
  },
  {
    id: '4',
    name: 'Dotonbori',
    description: 'Famous street known for its bright neon lights and food.',
    location: 'Osaka',
    image: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    rating: 4.6,
    visitCount: 1750,
    tags: ['Food', 'Nightlife', 'Shopping'],
    isPopular: true
  },
  {
    id: '5',
    name: 'Nara Park',
    description: 'Home to hundreds of freely roaming deer and historic temples.',
    location: 'Nara',
    image: 'https://images.unsplash.com/photo-1505069446780-4ef442b5207f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    rating: 4.9,
    visitCount: 1320,
    tags: ['Park', 'Wildlife', 'Temples'],
    isPopular: false
  },
  {
    id: '6',
    name: 'Mount Fuji',
    description: "Japan's highest mountain and an iconic symbol of the country.",
    location: 'Honshu',
    image: 'https://images.unsplash.com/photo-1570459027562-4a916cc6368f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80',
    rating: 4.9,
    visitCount: 1840,
    tags: ['Mountain', 'Nature', 'Hiking'],
    isPopular: true
  }
];

const Explore = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-container"
    >
      <div className="flex items-center mb-6">
        <Compass className="h-8 w-8 mr-3 text-tourii-red" />
        <h1 className="text-3xl font-bold">Explore Japan</h1>
      </div>
      
      <p className="text-lg text-muted-foreground mb-8">
        Discover amazing destinations across Japan, from iconic landmarks to hidden gems.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTouristSpots.map((spot) => (
          <TouristSpotCard key={spot.id} spot={spot} />
        ))}
      </div>
      
      <div className="mt-12 bg-tourii-warm-grey/50 dark:bg-tourii-charcoal/50 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <Map className="h-6 w-6 mr-2 text-tourii-red" />
          <h2 className="text-xl font-semibold">Plan Your Journey</h2>
        </div>
        <p className="text-muted-foreground">
          Explore Japan's most iconic locations and hidden gems. Complete quests to unlock special content
          and earn rewards. Use the interactive map to plan your perfect itinerary and discover related stories
          and model routes for each location.
        </p>
      </div>
    </motion.div>
  );
};

export default Explore;
