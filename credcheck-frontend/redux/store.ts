import {
    Action,
    configureStore,
    ThunkAction,
  } from '@reduxjs/toolkit';

import userReducers from './reducers/userReducers';  
  
  export const store = configureStore({
    reducer: {
        user:userReducers
    },
  });
  
  export type AppDispatch = typeof store.dispatch;
  export type RootState = ReturnType<typeof store.getState>;
  export type AppThunk<ReturnType = void> = ThunkAction<
     ReturnType,
     RootState,
     unknown,
     Action<string>
   >;