import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import currentEnviromentReducer from "./slice/currentEnviromentSlice";
import enviromentsReducer from "./slice/enviromentsSlice";
import tasksReducer from "./slice/tasksSlice";
import statesReducer from "./slice/stateSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    currentEnvironment: currentEnviromentReducer,
    enviroments: enviromentsReducer,
    tasks: tasksReducer,
    states: statesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
