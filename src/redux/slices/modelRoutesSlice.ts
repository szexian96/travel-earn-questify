
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ModelRoute {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  distance: number;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  locations: string[];
  tags: string[];
}

interface ModelRoutesState {
  items: ModelRoute[];
  loading: boolean;
  error: string | null;
}

const initialState: ModelRoutesState = {
  items: [],
  loading: false,
  error: null,
};

export const modelRoutesSlice = createSlice({
  name: 'modelRoutes',
  initialState,
  reducers: {
    setModelRoutes: (state, action: PayloadAction<ModelRoute[]>) => {
      state.items = action.payload;
    },
    addModelRoute: (state, action: PayloadAction<ModelRoute>) => {
      state.items.push(action.payload);
    },
    updateModelRoute: (state, action: PayloadAction<ModelRoute>) => {
      const index = state.items.findIndex(route => route.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteModelRoute: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(route => route.id !== action.payload);
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
  setModelRoutes, 
  addModelRoute, 
  updateModelRoute, 
  deleteModelRoute, 
  setLoading, 
  setError 
} = modelRoutesSlice.actions;

export default modelRoutesSlice.reducer;
