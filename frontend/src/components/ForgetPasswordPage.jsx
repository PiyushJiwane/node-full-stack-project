import React, { useState } from 'react'
import { useCheckUserQuery, useOtpValidationQuery } from '../redux_store/signupSlice'
import { useForgetPasswordMutation } from '../redux_store/loginSlice'
import { useNavigate } from 'react-router-dom'

function ForgetPasswordPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [otp, setOtp] = useState('')
    const [queryParam, setQueryParam] = useState('')

    const navigate=useNavigate()

    const { data, isLoading, isError, isSuccess } = useOtpValidationQuery(queryParam, {
        skip: !queryParam
    })

    const [forgetPassword, { isLoading: isLoadingFP, isSuccess: isSuccessFP, isError: isErrorFP }] = useForgetPasswordMutation()
    
    const { userData,isLoading:isLoadingUser, isError:isErrorUser, isSuccess:isSuccessUser } =useCheckUserQuery(queryParam, {
        skip: !queryParam
    })
    console.log(`user data : ${userData}`);

    const onSubmitEmailHandler = async (e) => {
        e.preventDefault()
        console.log("email");
        // const userPresent = await checkUser(email)
        // console.log(userPresent);
        setQueryParam(email)
    }

    const onSubmitPasswordHandler = async (e) => {
        e.preventDefault()
        console.log("password");
        const result=await forgetPassword({
            email,
            password,
            otp:Number(otp)
        })
        if (result?.data?.password_updated) {
            navigate("/")
        } else {
            console.log(result);
        }
    }

    return (
        <>ForgetPasswordPage
            <form onSubmit={onSubmitEmailHandler} method='POST'>
                <label>Email : </label>
                <input name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <br /><br />
                <button name='verify_email' type='submit' disabled={!email}>Verify Email</button>
            </form>
            {isLoadingUser ? (
                <p>Loading...</p>
            ) : (
                    <p>{ userData}</p>
            )}

            {isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <p>Error occurred: {JSON.stringify(error.message)}</p>
            ) : (
                <div>
                    {/* <h3>Fetched Data:</h3>
          <pre>{JSON.stringify(data?.otp, null, 2)}</pre> */}
                    {
                        data?.otp && <div>
                                    <form onSubmit={onSubmitPasswordHandler} method='POST'>
                                    <label>OTP : </label>
                                <input name='otp' id='otp' value={otp} onChange={(e) => setOtp(e.target.value)} />
                                <br /><br />
                                <label>Password : </label>
                                <input name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                <br /><br />
                                <button name='verify_password' type='submit' disabled={!password}>Update Password</button>
                            </form>
                        </div>
                    }
                </div>
            )}
        </>
    )
}

export default ForgetPasswordPage