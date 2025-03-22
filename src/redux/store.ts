
import { configureStore, Middleware, AnyAction } from '@reduxjs/toolkit';
import storiesReducer from './slices/storiesSlice';
import modelRoutesReducer from './slices/modelRoutesSlice';
import questsReducer from './slices/questsSlice';
import usersReducer from './slices/usersSlice';

// Middleware for logging actions (helps with debugging)
const loggerMiddleware: Middleware = store => next => action => {
  // Type guard to check if action has a type property
  const actionType = 'type' in action ? action.type : 'Unknown action';
  
  console.group(`Redux Action: ${actionType}`);
  console.info('Dispatching:', action);
  const result = next(action);
  console.log('Next state:', store.getState());
  console.groupEnd();
  return result;
};

export const store = configureStore({
  reducer: {
    stories: storiesReducer,
    modelRoutes: modelRoutesReducer,
    quests: questsReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(loggerMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
