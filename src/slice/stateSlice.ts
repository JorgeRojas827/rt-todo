import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IState } from '../interfaces/State';

const initialState: IState[]  = [];

export const statesSlice = createSlice({
    name: 'states',
    initialState,
    reducers: {
        setStates: (_, action: PayloadAction<IState[]>) => {
            return action.payload
        },
    }
})

export const { setStates } = statesSlice.actions;

export const selectStates = (state: RootState) => state.states;

export default statesSlice.reducer;