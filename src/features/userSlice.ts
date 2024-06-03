import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types/interface";

const initialState:User = {
    username : "",
    topScore: 0
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLoggedIn: (state, {payload}) => {
            state.username = payload
        }
    }
})

export const {userLoggedIn} = userSlice.actions

export default userSlice.reducer