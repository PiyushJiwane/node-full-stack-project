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
        }),
        retriveTodo: builder.query({
            query: (data) => {
                console.log(`todoSlice : retriveTodo ${JSON.stringify(data)}`);
                return {
                    url: `/todo/${data}`,
                    method: 'GET'
                }
            }
            // query: (data) => ({
            //     url:`/todo/${data.id}`,
            //     method: 'GET'
            // })
        })
    })
})

export const {
    useSaveTodoMutation,
    useRetriveTodoQuery
}=todoSlice