import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataUser } from '../interfaces/User';
import foto from "../assets/foto.png";
import { RootState } from '../store';

const initialState: DataUser  = {
    id_user: 0,
    name: '',
    image: foto
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<DataUser>) => {
            state.id_user = action.payload.id_user;
            state.name = action.payload.name;
            state.image = action.payload.image;
        },
    }
})

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;