
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Story } from '@/components/StoryCard';

interface StoriesState {
  items: Story[];
  loading: boolean;
  error: string | null;
}

const initialState: StoriesState = {
  items: [],
  loading: false,
  error: null,
};

export const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    setStories: (state, action: PayloadAction<Story[]>) => {
      state.items = action.payload;
    },
    addStory: (state, action: PayloadAction<Story>) => {
      state.items.push(action.payload);
    },
    updateStory: (state, action: PayloadAction<Story>) => {
      const index = state.items.findIndex(story => story.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteStory: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(story => story.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setStories, addStory, updateStory, deleteStory, setLoading, setError } = storiesSlice.actions;

export default storiesSlice.reducer;
