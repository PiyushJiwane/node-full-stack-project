import { configureStore } from "@reduxjs/toolkit";
import { baseSlice } from "../features/baseSlice";
import authReducer from "./authSlice";

export const store = configureStore({
    reducer: {
        [baseSlice.reducerPath]: baseSlice.reducer,
        auth:authReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(baseSlice.middleware),
})