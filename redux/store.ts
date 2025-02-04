import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/services/authSlice";
import socialReducer from "@/features/social/services/socialSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    social: socialReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
