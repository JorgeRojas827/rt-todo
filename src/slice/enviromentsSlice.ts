import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Enviroment } from "../interfaces/Enviroment";

const initialState: Enviroment[] = [];

export const enviromentsSlice = createSlice({
  name: "enviroments",
  initialState,
  reducers: {
    setEnviroments: (_, action: PayloadAction<Enviroment[]>) => {
      return action.payload;
    },
    addEnviroment: (state, action: PayloadAction<Enviroment>) => {
      state.push(action.payload);
    }
  },
});

export const { setEnviroments, addEnviroment } = enviromentsSlice.actions;

export const selectEnviroments = (state: RootState) => state.enviroments;

export default enviromentsSlice.reducer;
