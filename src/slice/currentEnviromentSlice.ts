import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Enviroment } from "../interfaces/Enviroment";

const initialState: Enviroment = { 
  id_enviro: 0,
  enviro_name: "",
};

export const currentEnviromentSlice = createSlice({
  name: "current_enviroment",
  initialState,
  reducers: {
    setCurrentEntorno: (state, action: PayloadAction<Enviroment>) => {
      state.enviro_name = action.payload.enviro_name;
      state.id_enviro = action.payload.id_enviro
    },
  },
});

export const { setCurrentEntorno } = currentEnviromentSlice.actions;

export const selectName = (state: RootState) => state.enviroments;

export default currentEnviromentSlice.reducer;
