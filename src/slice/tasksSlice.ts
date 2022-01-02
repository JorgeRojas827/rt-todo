import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ITask } from '../interfaces/Task';

const initialState: ITask[]  = [];

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (_, action: PayloadAction<ITask[]>) => {
            return action.payload;
        },
        addTask: (state, action: PayloadAction<ITask>) => {
            state.push(action.payload);
        }
    }
})

export const { setTasks, addTask } = tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export default tasksSlice.reducer;