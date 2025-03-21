
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
  authProvider: 'discord' | 'twitter' | 'google' | 'wallet';
  points: number;
  premium: boolean;
  createdAt: string;
  lastLogin: string;
  completedQuests: string[];
  unlockedStories: string[];
}

interface UsersState {
  items: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  items: [],
  loading: false,
  error: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.items = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.items.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.items.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(user => user.id !== action.payload);
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
  setUsers, 
  addUser, 
  updateUser, 
  deleteUser, 
  setLoading, 
  setError 
} = usersSlice.actions;

export default usersSlice.reducer;
