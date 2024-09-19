import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginApi = createApi({
    reducerPath: "loginAPI",
    tagTypes: ["User"],
    baseQuery: fetchBaseQuery({
        baseUrl:"http://127.0.0.1:5000/todo/api/v1",

        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: "/login",
                method: "post",
                body
                
            })
        })
    })
})

export const {
    useLoginMutation
}=loginApi