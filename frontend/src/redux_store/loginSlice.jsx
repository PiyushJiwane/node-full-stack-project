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
        })
    })
})

export const {
    useLoginMutation
}=loginSlice