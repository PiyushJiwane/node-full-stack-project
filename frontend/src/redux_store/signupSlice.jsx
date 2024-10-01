import { baseSlice } from "../features/baseSlice";

export const signupSlice = baseSlice.injectEndpoints({
    endpoints: builder => ({
        otpValidation: builder.query({
            query: (email) => {
                console.log(`signupSlice : otpValidation ${JSON.stringify(email)}`);
                return {
                    url: `/otpValidation?email=${email}`,
                    method: 'GET'
                }
            }
        }),
        checkUser: builder.query({
            query: (email) => {
                return {
                    url: `/checkUser?email=${email}`,
                    method:'GET'
                }
            }
        }),
        signup: builder.mutation({
            query: (credentials) => {
                console.log(`signupSlice : signup ${JSON.stringify(credentials)}`);
                return {
                    url: "/signup",
                    method: 'POST',
                    body:{...credentials}
                }
            }
        })
    })
})

export const {
    useOtpValidationQuery,
    useLazyOtpValidationQuery,
    useLazyCheckUserQuery,
    useCheckUserQuery,
    useSignupMutation
}=signupSlice