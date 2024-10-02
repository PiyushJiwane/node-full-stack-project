import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    email:null,
    token: null,
    _id:null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            console.log(`authSlice : setCredentials : ${JSON.stringify(action.payload)}`);
            const { jwt_token,email,_id } = action.payload
            state.token = jwt_token
            state.email = email
            state._id=_id
        },
        logout: (state, action) => {
            state.email = null
            state.token = null
        }
    }
});

export const {setCredentials,logout,setId } = authSlice.actions

export default authSlice.reducer