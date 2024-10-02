import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "../redux_store/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:5000/todo/api/v1',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        console.log(`baseQuery : token : ${token}`);
        if (token) {
            headers.set("authorization",`Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    // console.log(`args : ${JSON.stringify(args)}`);
    // console.log(`api : ${JSON.stringify(api)}`);
    // console.log(`extraOptions : ${extraOptions}`);
    let result = await baseQuery(args, api, extraOptions)
    console.log(`baseQueryWithReauth : 1st result : ${JSON.stringify(result)}`);
    console.log(`error : ${JSON.stringify(result?.error)}`);
    if (result?.error?.originalStatus === 403) {
        console.log("refresh token");
        const refreshResult = await baseQuery("/refreshToken", api, extraOptions)
        console.log(`refreshResult : ${JSON.stringify(refreshResult)}`);
        if (refreshResult?.data) {
            const email = api.getState().auth.email
            api.dispatch(setCredentials({ ...refreshResult.data, email }))
            let result = await baseQuery(args, api, extraOptions)
            return result
        } else {
            api.dispatch(logout())
        }
    }
    return result
}

export default baseQueryWithReauth