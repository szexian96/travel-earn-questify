
import { configureStore } from '@reduxjs/toolkit';
import storiesReducer from './slices/storiesSlice';
import modelRoutesReducer from './slices/modelRoutesSlice';
import questsReducer from './slices/questsSlice';
import usersReducer from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    stories: storiesReducer,
    modelRoutes: modelRoutesReducer,
    quests: questsReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
