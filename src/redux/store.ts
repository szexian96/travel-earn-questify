
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import questsReducer from './slices/questsSlice';
import storiesReducer from './slices/storiesSlice';
import modelRoutesReducer from './slices/modelRoutesSlice';
import socialMediaReducer from './slices/socialMediaSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    quests: questsReducer,
    stories: storiesReducer,
    modelRoutes: modelRoutesReducer,
    socialMedia: socialMediaReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
