import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import currentEnviromentReducer from "./slice/currentEnviromentSlice";
import enviromentsReducer from "./slice/enviromentsSlice";
import tasksReducer from "./slice/tasksSlice";
import statesReducer from "./slice/stateSlice";
import dndReducer from "./slice/dndSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    currentEnvironment: currentEnviromentReducer,
    enviroments: enviromentsReducer,
    tasks: tasksReducer,
    states: statesReducer,
    dnd: dndReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
