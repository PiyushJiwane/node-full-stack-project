import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQuery";

export const baseSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints:builder=>({})
})