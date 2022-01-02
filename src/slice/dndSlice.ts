import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface IDnd {
    changed: boolean;
}

const initialState: IDnd = {
    changed: false
};

export const dndSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setChanged: (state, action: PayloadAction<boolean>) => {
            state.changed = action.payload;
        },
    }
})

export const { setChanged } = dndSlice.actions;

export const selectChanged = (state: RootState) => state.dnd;

export default dndSlice.reducer;