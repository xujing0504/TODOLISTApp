import { configureStore } from "@reduxjs/toolkit";

import tasksSlice from "./tasksSlice";

export default configureStore({
  reducer: tasksSlice,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});
