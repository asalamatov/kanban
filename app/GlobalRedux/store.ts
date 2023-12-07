'use client';

import { configureStore } from '@reduxjs/toolkit';
import boardsSlice from './Features/boards/boardsSlice';

export const store = configureStore({
  reducer: {
    boards: boardsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;