
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SocialPlatform = 'twitter' | 'instagram' | 'tiktok';
export type PostStatus = 'draft' | 'scheduled' | 'published';

export interface SocialPost {
  id: string;
  captionEn: string;
  captionJp: string;
  imageUrl: string;
  videoUrl?: string;
  publishDate: string;
  platform: SocialPlatform;
  status: PostStatus;
  performanceData?: {
    likes: number;
    shares: number;
    views: number;
    comments: number;
  };
  relatedRouteIds?: string[];
  relatedQuestIds?: string[];
  relatedStoryIds?: string[];
  tags: string[];
}

export interface UGCPost {
  id: string;
  userId: string;
  username: string;
  profileImageUrl: string;
  imageUrl: string;
  videoUrl?: string;
  caption: string;
  platform: SocialPlatform;
  timestamp: string;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
  locationId?: string;
  locationName?: string;
  tags: string[];
  matchedRouteIds?: string[];
  matchedQuestIds?: string[];
  isFeatured: boolean;
}

interface SocialMediaState {
  posts: SocialPost[];
  ugcPosts: UGCPost[];
  loading: boolean;
  error: string | null;
}

const initialState: SocialMediaState = {
  posts: [],
  ugcPosts: [],
  loading: false,
  error: null,
};

export const socialMediaSlice = createSlice({
  name: 'socialMedia',
  initialState,
  reducers: {
    // Social Posts Actions
    setPosts: (state, action: PayloadAction<SocialPost[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<SocialPost>) => {
      state.posts.push(action.payload);
    },
    updatePost: (state, action: PayloadAction<SocialPost>) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    updatePostPerformance: (state, action: PayloadAction<{id: string, performanceData: SocialPost['performanceData']}>) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1 && state.posts[index]) {
        state.posts[index].performanceData = action.payload.performanceData;
      }
    },

    // UGC Posts Actions
    setUGCPosts: (state, action: PayloadAction<UGCPost[]>) => {
      state.ugcPosts = action.payload;
    },
    addUGCPost: (state, action: PayloadAction<UGCPost>) => {
      state.ugcPosts.push(action.payload);
    },
    updateUGCPost: (state, action: PayloadAction<UGCPost>) => {
      const index = state.ugcPosts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.ugcPosts[index] = action.payload;
      }
    },
    deleteUGCPost: (state, action: PayloadAction<string>) => {
      state.ugcPosts = state.ugcPosts.filter(post => post.id !== action.payload);
    },
    matchUGCPostToContent: (state, action: PayloadAction<{
      id: string, 
      matchedRouteIds?: string[], 
      matchedQuestIds?: string[]
    }>) => {
      const index = state.ugcPosts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        if (action.payload.matchedRouteIds) {
          state.ugcPosts[index].matchedRouteIds = action.payload.matchedRouteIds;
        }
        if (action.payload.matchedQuestIds) {
          state.ugcPosts[index].matchedQuestIds = action.payload.matchedQuestIds;
        }
      }
    },
    toggleUGCFeatured: (state, action: PayloadAction<string>) => {
      const index = state.ugcPosts.findIndex(post => post.id === action.payload);
      if (index !== -1) {
        state.ugcPosts[index].isFeatured = !state.ugcPosts[index].isFeatured;
      }
    },

    // Common Actions
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { 
  setPosts, 
  addPost, 
  updatePost, 
  deletePost, 
  updatePostPerformance,
  setUGCPosts,
  addUGCPost,
  updateUGCPost,
  deleteUGCPost,
  matchUGCPostToContent,
  toggleUGCFeatured,
  setLoading, 
  setError 
} = socialMediaSlice.actions;

export default socialMediaSlice.reducer;
