import { baseSlice } from "../features/baseSlice";

export const todoSlice = baseSlice.injectEndpoints({
    endpoints: builder => ({
        saveTodo: builder.mutation({
            query: (data) => {
                console.log(`loginSlice : login ${JSON.stringify(data)}`);
                return {
                    url: `/todo/${data.userId}`,
                    method: 'POST',
                    body:{...data}
                }
            }
        })
    })
})

export const {
useSaveTodoMutation
}=todoSlice