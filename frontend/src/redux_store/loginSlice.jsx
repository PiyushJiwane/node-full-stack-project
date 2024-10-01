import { baseSlice } from "../features/baseSlice";

export const loginSlice = baseSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (credentials) => {
                console.log(`loginSlice : login ${JSON.stringify(credentials)}`);
                return {
                    url: "/login",
                    method: 'POST',
                    body:{...credentials}
                }
            }
        }),
        forgetPassword: builder.mutation({
            query: (body) => {
                console.log(`loginSlice : login ${JSON.stringify(body)}`);
                return {
                    url: "/forgetPassword",
                    method: 'POST',
                    body:{...body}
                }
            }
        })
    })
})

export const {
    useLoginMutation,
    useForgetPasswordMutation
}=loginSlice