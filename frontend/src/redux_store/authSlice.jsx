import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email:null,
    token: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            console.log(`authSlice : setCredentials : ${JSON.stringify(action.payload)}`);
            const { jwt_token,email } = action.payload
            state.token = jwt_token
            state.email=email
        },
        logout: (state, action) => {
            state.email = null
            state.token = null
        }
    }
});

export const {setCredentials,logout } = authSlice.actions

export default authSlice.reducer