
// Type definitions for admin components

import { Story } from '@/components/StoryCard';

// Story Management Types
export interface StoryFormData {
  title_en: string;
  description_en: string;
  thumbnail_en: string;
  video_en: string;
  
  title_jp: string;
  description_jp: string;
  thumbnail_jp: string;
  video_jp: string;
  
  isUnlocked: boolean;
  totalChapters: number;
  unlockedChapters: number;
  relatedRouteId: string;
  tags: string;
}

export interface StoryChapter {
  id: string;
  title_en?: string;
  title_jp?: string;
  content_en?: string;
  content_jp?: string;
  video_en?: string;
  video_jp?: string;
  unlocked: boolean;
  order: number;
  storyId: string;
}

// Route Management Types
export interface RouteFormData {
  title_en: string;
  description_en: string;
  thumbnail_en: string;
  
  title_jp: string;
  description_jp: string;
  thumbnail_jp: string;
  
  isPublished: boolean;
  locations: string[];
  difficultyLevel: number;
  tags: string;
}

// Quest Management Types
export interface QuestFormData {
  title_en: string;
  description_en: string;
  thumbnail_en: string;
  
  title_jp: string;
  description_jp: string;
  thumbnail_jp: string;
  
  type: 'online' | 'onsite';
  difficulty: 'easy' | 'medium' | 'hard';
  timeRequired: number;
  points: number;
  isPublished: boolean;
  locationId?: string;
  tasks: QuestTask[];
}

export interface QuestTask {
  id: string;
  type: 'trivia' | 'short_answer' | 'social_share' | 'exploration' | 'photo' | 'gps' | 'qr' | 'local_experience' | 'group' | 'reflection';
  title_en: string;
  title_jp: string;
  description_en: string;
  description_jp: string;
  order: number;
  required: boolean;
  metadata?: Record<string, any>;
}

// User Management Types
export interface UserFilter {
  role?: string;
  region?: string;
  status?: string;
  searchTerm?: string;
}
