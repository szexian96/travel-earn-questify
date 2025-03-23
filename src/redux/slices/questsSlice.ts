
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type QuestType = 'earn' | 'travel';
export type TaskType = 
  | 'trivia' 
  | 'short_answer' 
  | 'social_share' 
  | 'virtual_exploration' 
  | 'photo_upload'
  | 'gps_checkin'
  | 'qr_scan'
  | 'local_experience'
  | 'group_quest'
  | 'location_reflection';

export interface QuestTask {
  id: string;
  titleEn: string;
  titleJp: string;
  descriptionEn: string;
  descriptionJp: string;
  completed: boolean;
  type: TaskType;
  options?: {
    choices?: string[];
    correctAnswer?: string;
    hashtags?: string[];
    qrValue?: string;
    gpsLocation?: {
      lat: number;
      lng: number;
      name: string;
      radiusMeters: number;
    };
  };
}

export interface Quest {
  id: string;
  titleEn: string;
  titleJp: string;
  descriptionEn: string;
  descriptionJp: string;
  thumbnail: string;
  status: 'active' | 'completed' | 'locked';
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  type: QuestType;
  touristSpotId?: string;
  rewards: {
    points: number;
    badges: string[];
  };
  tasks: QuestTask[];
  tags: string[];
}

interface QuestsState {
  items: Quest[];
  loading: boolean;
  error: string | null;
}

const initialState: QuestsState = {
  items: [],
  loading: false,
  error: null,
};

export const questsSlice = createSlice({
  name: 'quests',
  initialState,
  reducers: {
    setQuests: (state, action: PayloadAction<Quest[]>) => {
      state.items = action.payload;
    },
    addQuest: (state, action: PayloadAction<Quest>) => {
      state.items.push(action.payload);
    },
    updateQuest: (state, action: PayloadAction<Quest>) => {
      const index = state.items.findIndex(quest => quest.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteQuest: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(quest => quest.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { 
  setQuests, 
  addQuest, 
  updateQuest, 
  deleteQuest, 
  setLoading, 
  setError 
} = questsSlice.actions;

export default questsSlice.reducer;
