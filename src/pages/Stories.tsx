
import React from 'react';
import { motion } from 'framer-motion';
import { ScrollText, Book } from 'lucide-react';
import StoryCard, { Story } from '@/components/StoryCard';

// Mock data for stories
const mockStories: Story[] = [
  {
    id: '1',
    title: 'The Legend of Kyoto's Hidden Temples',
    description: 'Discover the ancient secrets of Kyoto's most mysterious shrines and the legends that surround them.',
    thumbnail: 'https://images.unsplash.com/photo-1598890777032-bde835a53f66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    isUnlocked: true,
    chapters: {
      total: 5,
      unlocked: 3,
    },
    relatedRouteId: 'kyoto-1',
    tags: ['Kyoto', 'Temples', 'Spiritual'],
  },
  {
    id: '2',
    title: 'Tokyo After Dark: Neon Dreams',
    description: 'Experience the electric nightlife of Tokyo, from Shibuya's crossing to the hidden izakayas of Shinjuku.',
    thumbnail: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1071&q=80',
    isUnlocked: true,
    chapters: {
      total: 7,
      unlocked: 2,
    },
    relatedRouteId: 'tokyo-1',
    tags: ['Tokyo', 'Nightlife', 'Urban'],
  },
  {
    id: '3',
    title: 'Okinawa: Islands of the Immortals',
    description: 'Journey through the tropical paradise of Okinawa and uncover the secrets to longevity from the local centenarians.',
    thumbnail: 'https://images.unsplash.com/photo-1618950398716-63ab37839a6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80',
    isUnlocked: false,
    chapters: {
      total: 6,
      unlocked: 0,
    },
    relatedRouteId: 'okinawa-1',
    tags: ['Okinawa', 'Islands', 'Culture'],
  },
  {
    id: '4',
    title: 'Hakone: Mountains of Mystery',
    description: 'Explore the volcanic landscapes of Hakone, known for its hot springs, ancient traditions, and views of Mt. Fuji.',
    thumbnail: 'https://images.unsplash.com/photo-1576675466969-38eeae4b41f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    isUnlocked: false,
    chapters: {
      total: 4,
      unlocked: 0,
    },
    relatedRouteId: 'hakone-1',
    tags: ['Hakone', 'Onsen', 'Nature'],
  },
];

const Stories = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-container"
    >
      <div className="flex items-center mb-6">
        <ScrollText className="h-8 w-8 mr-3 text-tourii-red" />
        <h1 className="text-3xl font-bold">Travel Stories</h1>
      </div>
      
      <p className="text-lg text-muted-foreground mb-8">
        Discover Japan through immersive stories that unlock new destinations and quests.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockStories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
      
      <div className="mt-12 bg-tourii-warm-grey/50 dark:bg-tourii-charcoal/50 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <Book className="h-6 w-6 mr-2 text-tourii-red" />
          <h2 className="text-xl font-semibold">How Stories Work</h2>
        </div>
        <p className="text-muted-foreground">
          Each story is a journey that unfolds as you progress. Complete quests to unlock new chapters,
          which reveal hidden tourist spots and model routes. As you explore real locations, you'll collect
          Hanko stamps in your digital passport and earn Tourii Points for special rewards.
        </p>
      </div>
    </motion.div>
  );
};

export default Stories;
