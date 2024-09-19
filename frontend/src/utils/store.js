import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { loginApi } from "./loginSlice";

export const store=configureStore({
    reducer: {
        [loginApi.reducerPath]:loginApi.reducer
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(),
        loginApi.middleware    ]
})
setupListeners(store.dispatch)