import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./index";
import {
  persistReducer,
  FLUSH,
  PAUSE,
  PERSISTS,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistsConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistsConfig, authReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, PAUSE, PERSISTS, PURGE, REGISTER],
      },
    });
  },
});
