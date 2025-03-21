
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Map, 
  List, 
  Info, 
  Clock, 
  Route as RouteIcon, 
  User, 
  Star, 
  ChevronLeft,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import TouristSpotCard, { TouristSpot } from '@/components/TouristSpotCard';

// Mock data for a specific model route
const mockTouristSpots: TouristSpot[] = [
  {
    id: 'spot-1',
    name: 'Fushimi Inari Shrine',
    description: 'Famous for its thousands of vermilion torii gates, this shrine is dedicated to Inari, the Shinto god of rice.',
    thumbnail: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    location: 'Fushimi Ward, Kyoto',
    estimatedDuration: '2 hours',
    distanceFromPrevious: '30 min by bus',
    isCheckedIn: true,
    hasQuests: true,
    modelRouteId: 'kyoto-1',
    coordinates: {
      lat: 34.9671,
      lng: 135.7727,
    },
    tags: ['Shrine', 'Torii Gates', 'Hiking'],
  },
  {
    id: 'spot-2',
    name: 'Kiyomizu-dera Temple',
    description: 'This wooden temple offers stunning views of Kyoto from its large veranda built without the use of nails.',
    thumbnail: 'https://images.unsplash.com/photo-1606822350112-b9e657e3f8db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    location: 'Higashiyama Ward, Kyoto',
    estimatedDuration: '1.5 hours',
    distanceFromPrevious: '15 min by taxi',
    isCheckedIn: true,
    hasQuests: true,
    modelRouteId: 'kyoto-1',
    coordinates: {
      lat: 34.9948,
      lng: 135.7850,
    },
    tags: ['Temple', 'Views', 'Architecture'],
  },
  {
    id: 'spot-3',
    name: 'Gion District',
    description: 'Kyoto's most famous geisha district filled with traditional wooden machiya houses, teahouses, and restaurants.',
    thumbnail: 'https://images.unsplash.com/photo-1493997181344-712f2f19d87a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    location: 'Gion, Kyoto',
    estimatedDuration: '3 hours',
    distanceFromPrevious: '10 min walk',
    isCheckedIn: true,
    hasQuests: true,
    modelRouteId: 'kyoto-1',
    coordinates: {
      lat: 35.0035,
      lng: 135.7762,
    },
    tags: ['Geisha', 'Traditional', 'Shopping'],
  },
  {
    id: 'spot-4',
    name: 'Arashiyama Bamboo Grove',
    description: 'A breathtaking path lined with towering bamboo stalks that sway in the wind creating a peaceful atmosphere.',
    thumbnail: 'https://images.unsplash.com/photo-1576675466969-38eeae4b41f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    location: 'Arashiyama, Kyoto',
    estimatedDuration: '1 hour',
    distanceFromPrevious: '25 min by train',
    isCheckedIn: false,
    hasQuests: true,
    modelRouteId: 'kyoto-1',
    coordinates: {
      lat: 35.0094,
      lng: 135.6722,
    },
    tags: ['Nature', 'Photography', 'Walking'],
  },
  {
    id: 'spot-5',
    name: 'Nishiki Market',
    description: 'Known as "Kyoto's Kitchen," this lively market street is filled with food vendors and traditional shops.',
    thumbnail: 'https://images.unsplash.com/photo-1610308479130-5141d71ba6e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    location: 'Central Kyoto',
    estimatedDuration: '2 hours',
    distanceFromPrevious: '20 min by bus',
    isCheckedIn: false,
    hasQuests: true,
    modelRouteId: 'kyoto-1',
    coordinates: {
      lat: 35.0051,
      lng: 135.7649,
    },
    tags: ['Food', 'Shopping', 'Market'],
  },
];

const mockRouteDetails = {
  id: 'kyoto-1',
  title: 'Kyoto Cultural Tour',
  description: 'Immerse yourself in the rich cultural heritage of Kyoto, Japan's ancient capital. This route takes you through historic temples, traditional districts, and culinary highlights that showcase the essence of Japanese tradition and beauty.',
  thumbnail: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  location: 'Kyoto, Japan',
  duration: '3 days',
  distance: '12 km',
  difficulty: 'medium',
  totalStops: 5,
  rating: 4.8,
  reviews: 124,
  tags: ['Temples', 'Culture', 'History'],
};

const ModelRouteDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('list');
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-container pb-12"
    >
      <Link to="/routes" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Routes
      </Link>
      
      <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-6">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
        <img
          src={mockRouteDetails.thumbnail}
          alt={mockRouteDetails.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 z-20 p-6 w-full">
          <Badge className="mb-2 bg-tourii-red text-white">
            {mockRouteDetails.difficulty.charAt(0).toUpperCase() + mockRouteDetails.difficulty.slice(1)}
          </Badge>
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-2">{mockRouteDetails.title}</h1>
          <div className="flex items-center text-white/90">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{mockRouteDetails.location}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">About This Route</h2>
            <p className="text-muted-foreground">{mockRouteDetails.description}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-secondary/40 rounded-lg p-4 flex flex-col items-center">
              <Clock className="h-5 w-5 mb-1 text-tourii-red" />
              <span className="text-sm font-medium">{mockRouteDetails.duration}</span>
              <span className="text-xs text-muted-foreground">Duration</span>
            </div>
            <div className="bg-secondary/40 rounded-lg p-4 flex flex-col items-center">
              <RouteIcon className="h-5 w-5 mb-1 text-tourii-red" />
              <span className="text-sm font-medium">{mockRouteDetails.distance}</span>
              <span className="text-xs text-muted-foreground">Distance</span>
            </div>
            <div className="bg-secondary/40 rounded-lg p-4 flex flex-col items-center">
              <MapPin className="h-5 w-5 mb-1 text-tourii-red" />
              <span className="text-sm font-medium">{mockRouteDetails.totalStops}</span>
              <span className="text-xs text-muted-foreground">Spots</span>
            </div>
            <div className="bg-secondary/40 rounded-lg p-4 flex flex-col items-center">
              <Star className="h-5 w-5 mb-1 text-tourii-mustard" />
              <span className="text-sm font-medium">{mockRouteDetails.rating}</span>
              <span className="text-xs text-muted-foreground">{mockRouteDetails.reviews} Reviews</span>
            </div>
          </div>
        </div>
        
        <div className="lg:row-start-1">
          <div className="tourii-card p-4">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Your Progress</h3>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-tourii-red rounded-full"
                  style={{ width: `${(3 / 5) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-1 text-sm text-muted-foreground">
                <span>3 of 5 visited</span>
                <span>60%</span>
              </div>
            </div>
            
            <Button className="w-full mb-3">
              <MapPin className="h-4 w-4 mr-2" />
              Open in Google Maps
            </Button>
            
            <Button variant="outline" className="w-full">
              <Info className="h-4 w-4 mr-2" />
              Route Information
            </Button>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="list" className="mb-6" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="list" className="flex items-center">
            <List className="h-4 w-4 mr-2" />
            Spots List
          </TabsTrigger>
          <TabsTrigger value="map" className="flex items-center">
            <Map className="h-4 w-4 mr-2" />
            Map View
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="mt-6">
          <div className="space-y-2">
            {mockTouristSpots.map((spot, index) => (
              <TouristSpotCard 
                key={spot.id} 
                spot={spot} 
                index={index}
                isLast={index === mockTouristSpots.length - 1}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="map" className="mt-6">
          <div className="bg-secondary h-96 rounded-xl flex items-center justify-center">
            <p className="text-muted-foreground">Interactive map will be displayed here</p>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default ModelRouteDetails;
