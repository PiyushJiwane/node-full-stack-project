import { baseSlice } from "../features/baseSlice";

export const todoSlice = baseSlice.injectEndpoints({
    tagTypes: ['todo'],
    endpoints: builder => ({
        saveTodo: builder.mutation({
            query: (newTodo) => {
                console.log(`loginSlice : login ${JSON.stringify(newTodo)}`);
                return {
                    url: `/todo/${newTodo.userId}`,
                    method: 'POST',
                    body: { ...newTodo }
                }
            },
            async onQueryStarted(newTodo, { dispatch, queryFulfilled }) {
                console.log(`onQueryStarted : ${typeof newTodo}`);
                console.log(`onQueryStarted : ${JSON.stringify(newTodo)}`);
                console.log(`onQueryStarted : ${JSON.stringify({...newTodo})}`);
                let customeNewTodo = { ...newTodo }
                let patchResult;
                try {
                    patchResult = dispatch(
                        todoSlice.util.updateQueryData('retriveTodo', customeNewTodo.userId, (draft) => {
                            console.log(`draft : ${JSON.stringify(draft)}`)
                            // Check if draft is an array before modifying it
                            if (Array.isArray(draft)) {
                                // draft.push({userId:customeNewTodo.userId,todo:{title:customeNewTodo.title,desc:customeNewTodo.desc}});  // Add the new item to the array
                                draft.push({
                                    _id: Date.now().toString(),  // Assign a temporary unique ID to the new item
                                    todo: { ...customeNewTodo, createdAt: new Date().toISOString() }
                                  });
                                console.log(`if : arrar : draft : ${JSON.stringify(draft)}`);
                                 // Sort the array in descending order based on `_id`
                                 draft.sort((a, b) => new Date(b.todo.createdAt) - new Date(a.todo.createdAt));

                            } else {
                                Object.assign(draft, customeNewTodo);  // Handle object case if needed
                                console.log(`else : object : draft : ${JSON.stringify(draft)}`);
                            }
                        })
                    );
                    console.log(`patchResult : ${JSON.stringify(patchResult)}`);
                    await queryFulfilled;
                } catch (error) {
                    // Revert the optimistic update in case of failure
                    if (patchResult) {
                        patchResult.undo();
                    }
                    console.error("Error during optimistic update: ", error);
                }
            },
            // invalidatesTags:['todo']
        }),
        retriveTodo: builder.query({
            query: (data) => {
                console.log(`todoSlice : retriveTodo ${JSON.stringify(data)}`);
                return {
                    url: `/todo/${data}`,
                    method: 'GET'
                }
            },
            transformResponse: (response, meta, args) => {
                console.log(`transformResponse : ${response}`);
                return (response.sort((a, b) => (a._id > b._id ? -1 : 1)))
            },
            providesTags: ['todo'],
            // query: (data) => ({
            //     url:`/todo/${data.id}`,
            //     method: 'GET'
            // })
        }),
        updateTodo: builder.mutation({
            query: (newTodo) => {
                console.log(`updateTodo : newTodo : ${JSON.stringify(newTodo)}`);
                return{
                    url: `/update/todo/${newTodo.todoId}`,
                    method: "PUT",
                    body:{title:newTodo.title,desc:newTodo.desc}
                }
            },
            async onQueryStarted(newTodo, { dispatch, queryFulfilled }) {
                console.log(`onQueryStarted : ${typeof newTodo}`);
                console.log(`onQueryStarted : ${JSON.stringify(newTodo)}`);
                console.log(`onQueryStarted : ${JSON.stringify({...newTodo})}`);
                let customeNewTodo = { ...newTodo }
                let patchResult;
                try {
                    patchResult = dispatch(
                        todoSlice.util.updateQueryData('retriveTodo', customeNewTodo.userId, (draft) => {
                            console.log(`draft : ${JSON.stringify(draft)}`)
                            // Check if draft is an array before modifying it
                            if (Array.isArray(draft)) {

                                const customDraft = draft.map(item => 
                                    item.todo._id===customeNewTodo.todoId?{...item,todo:{...item.todo,title:customeNewTodo.title,desc:customeNewTodo.desc}}:item
                                )
                                
                                draft.splice(0, draft.length, ...customDraft);

                                console.log(`if : arrar : draft : ${JSON.stringify(draft)}`);
                                 // Sort the array in descending order based on `_id`
                                 draft.sort((a, b) => new Date(b.todo.createdAt) - new Date(a.todo.createdAt));

                            } else {
                                Object.assign(draft, customeNewTodo);  // Handle object case if needed
                                console.log(`else : object : draft : ${JSON.stringify(draft)}`);
                            }
                        })
                    );
                    console.log(`patchResult : ${JSON.stringify(patchResult)}`);
                    await queryFulfilled;
                } catch (error) {
                    // Revert the optimistic update in case of failure
                    if (patchResult) {
                        patchResult.undo();
                    }
                    console.error("Error during optimistic update: ", error);
                }
            },
        })
    })
})

export const {
    useSaveTodoMutation,
    useRetriveTodoQuery,
    useUpdateTodoMutation
} = todoSlice