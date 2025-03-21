
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, BookOpen, Map, MapPin, Lock } from 'lucide-react';
import MakimonoScroll from '@/components/MakimonoScroll';

// Mock data for story chapters
const mockStoryChapters = [
  {
    id: 'chapter-1',
    title: 'The Red Gates of Inari',
    content: `
      <p>The morning sun cast long shadows through the thousands of vermilion torii gates that lined the path up the sacred mountain. Akiko paused, watching the interplay of light and shadow on the ancient stone steps.</p>
      
      <p>"They say Fushimi Inari has over ten thousand torii gates," her grandfather had told her. "Each one donated by a business or individual in hopes of prosperity."</p>
      
      <p>As she began her ascent, Akiko could feel the weight of centuries of tradition pressing down upon her. The air was thick with incense and the whispers of prayers long since uttered.</p>
      
      <p>She remembered the story her grandmother had shared about the white foxes—messengers of Inari, the Shinto deity of rice, prosperity, and success. Legend had it that if you spotted a white fox on the mountain, your wish would surely come true.</p>
      
      <p>At a small shrine halfway up the mountain, Akiko clapped her hands twice and bowed deeply. She closed her eyes and made her wish, feeling a connection to generations of pilgrims who had stood in this exact spot.</p>
      
      <p>When she opened her eyes, she thought she glimpsed a flash of white disappearing around a bend in the path ahead...</p>
    `,
    unlocksSpotId: 'spot-1',
  },
  {
    id: 'chapter-2',
    title: 'Kiyomizu's Pure Waters',
    content: `
      <p>The wooden veranda of Kiyomizu-dera stretched out before Akiko like an ancient ship sailing through a sea of maple trees. From this vantage point, all of Kyoto was laid out beneath her, a patchwork of tradition and modernity.</p>
      
      <p>"This entire structure was built without a single nail," her guide explained, gesturing to the massive wooden pillars supporting the temple. "And did you know that in the Edo period, people would jump from this platform?"</p>
      
      <p>Akiko's eyes widened. "Why would they do that?"</p>
      
      <p>"There was a belief that if you survived the 13-meter jump, your wish would be granted," the guide continued. "The phrase 'to jump off the stage at Kiyomizu' became a saying similar to 'taking the plunge' in English."</p>
      
      <p>At the Otowa Waterfall below the temple, Akiko joined the line of visitors waiting to drink from the three streams of sacred water, each offering a different blessing: longevity, success in education, or luck in love.</p>
      
      <p>As the cool, sweet water touched her lips, Akiko felt a sense of purification wash over her. The temple's name, Kiyomizu, meant "pure water"—and in that moment, she understood why this place had drawn pilgrims for over a thousand years.</p>
    `,
    unlocksSpotId: 'spot-2',
  },
  {
    id: 'chapter-3',
    title: 'Shadows of Gion',
    content: `
      <p>Lanterns glowed softly in the gathering dusk as Akiko made her way through the narrow streets of Gion. The wooden machiya townhouses with their latticed windows and tiled roofs transported her to another era.</p>
      
      <p>A flash of white and crimson at the end of an alley caught her eye—a geiko hurrying to an appointment, her silk kimono rustling with each delicate step. The white makeup and elaborate hairstyle were like something from a dream or a painting come to life.</p>
      
      <p>Akiko remembered her grandmother's stories about Gion in the post-war years—how the district had preserved traditions that stretched back centuries, even as the world around it changed beyond recognition.</p>
      
      <p>"Gion is built on secrets," her grandmother had told her. "The art of the geiko and maiko isn't just in dance or music or conversation—it's in knowing what to reveal and what to keep hidden."</p>
      
      <p>As night fell completely, Akiko found herself outside an ochaya—a traditional teahouse. From beyond its closed doors came the sound of a shamisen and laughter, the echoes of an exclusive world few outsiders ever truly entered.</p>
      
      <p>She stood for a moment in the pool of light from a paper lantern, feeling the boundary between past and present dissolve around her.</p>
    `,
    unlocksSpotId: 'spot-3',
  },
];

// Mock story data
const mockStoryDetails = {
  id: '1',
  title: 'The Legend of Kyoto's Hidden Temples',
  description: 'Discover the ancient secrets of Kyoto's most mysterious shrines and the legends that surround them.',
  thumbnail: 'https://images.unsplash.com/photo-1598890777032-bde835a53f66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  chapters: {
    total: 5,
    unlocked: 3,
  },
  relatedRouteId: 'kyoto-1',
  tags: ['Kyoto', 'Temples', 'Spiritual'],
};

const StoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeChapter, setActiveChapter] = useState(0);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-container"
    >
      <Link to="/stories" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Stories
      </Link>
      
      <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
        <img
          src={mockStoryDetails.thumbnail}
          alt={mockStoryDetails.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 z-20 p-6 w-full">
          <div className="flex flex-wrap gap-2 mb-2">
            {mockStoryDetails.tags.map((tag, i) => (
              <Badge key={i} variant="outline" className="bg-white/20 text-white border-white/30">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-2">{mockStoryDetails.title}</h1>
          <div className="flex items-center text-white/90">
            <BookOpen className="h-4 w-4 mr-1" />
            <span>{mockStoryDetails.chapters.unlocked} of {mockStoryDetails.chapters.total} chapters unlocked</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="tourii-card p-4 sticky top-4">
            <h3 className="text-lg font-medium mb-4">Story Chapters</h3>
            <div className="space-y-3">
              {Array.from({ length: mockStoryDetails.chapters.total }).map((_, i) => (
                <button
                  key={i}
                  className={`w-full text-left p-3 rounded-md flex items-center justify-between transition-colors ${
                    i === activeChapter
                      ? 'bg-tourii-red/10 text-tourii-red'
                      : i < mockStoryDetails.chapters.unlocked
                      ? 'hover:bg-secondary'
                      : 'opacity-60 cursor-not-allowed'
                  }`}
                  onClick={() => i < mockStoryDetails.chapters.unlocked && setActiveChapter(i)}
                  disabled={i >= mockStoryDetails.chapters.unlocked}
                >
                  <span className="flex items-center">
                    <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs mr-2">
                      {i + 1}
                    </span>
                    {i < mockStoryChapters.length
                      ? mockStoryChapters[i].title
                      : `Chapter ${i + 1}`}
                  </span>
                  {i >= mockStoryDetails.chapters.unlocked && (
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="mt-6">
              <Button variant="outline" className="w-full mb-3">
                <BookOpen className="h-4 w-4 mr-2" />
                Story Overview
              </Button>
              
              <Button className="w-full" asChild>
                <Link to={`/routes/${mockStoryDetails.relatedRouteId}`}>
                  <Map className="h-4 w-4 mr-2" />
                  View Related Route
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-3 order-1 lg:order-2">
          {activeChapter < mockStoryChapters.length && (
            <>
              <MakimonoScroll title={mockStoryChapters[activeChapter].title}>
                <div 
                  className="prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: mockStoryChapters[activeChapter].content }}
                />
                
                <div className="mt-8 pt-6 border-t border-tourii-warm-grey-3 dark:border-tourii-charcoal/30">
                  <div className="bg-tourii-warm-grey/30 dark:bg-tourii-charcoal/30 p-4 rounded-lg">
                    <h4 className="flex items-center text-lg font-medium mb-2">
                      <MapPin className="h-5 w-5 mr-2 text-tourii-red" />
                      Location Unlocked!
                    </h4>
                    <p className="mb-4">
                      You've unlocked a new tourist spot on your Kyoto Cultural Tour! Visit this location
                      to earn Tourii Points and collect a Hanko stamp for your digital passport.
                    </p>
                    <Button asChild>
                      <Link to={`/routes/${mockStoryDetails.relatedRouteId}`}>
                        Visit Location
                      </Link>
                    </Button>
                  </div>
                </div>
              </MakimonoScroll>
              
              <div className="flex justify-between mt-8">
                <Button 
                  variant="outline"
                  disabled={activeChapter === 0}
                  onClick={() => activeChapter > 0 && setActiveChapter(activeChapter - 1)}
                >
                  Previous Chapter
                </Button>
                
                <Button 
                  disabled={activeChapter >= mockStoryDetails.chapters.unlocked - 1}
                  onClick={() => 
                    activeChapter < mockStoryDetails.chapters.unlocked - 1 && 
                    setActiveChapter(activeChapter + 1)
                  }
                >
                  Next Chapter
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StoryDetail;
