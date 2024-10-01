import { baseSlice } from "../features/baseSlice";

export const signupSlice = baseSlice.injectEndpoints({
    endpoints: builder => ({
        otpValidation: builder.query({
            query: (email) => {
                console.log(`loginSlice : login ${JSON.stringify(email)}`);
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
        })
    })
})

export const {
    useOtpValidationQuery,
    useCheckUserQuery
}=signupSlice