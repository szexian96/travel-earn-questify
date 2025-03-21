
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Quest {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  status: 'active' | 'completed' | 'locked';
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  rewards: {
    points: number;
    badges: string[];
  };
  tasks: {
    id: string;
    title: string;
    completed: boolean;
    location?: {
      lat: number;
      lng: number;
      name: string;
    };
  }[];
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
