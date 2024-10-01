import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCheckUserQuery, useLazyCheckUserQuery, useLazyOtpValidationQuery, useOtpValidationQuery, useSignupMutation } from '../redux_store/signupSlice'

function SignupPage() {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')

  const navigate = useNavigate()

  const [checkUser,{ data, isLoading, isError, isSuccess }] = useLazyCheckUserQuery()

  const [otpValidation, { otpData }] = useLazyOtpValidationQuery()
  
  const [signup]=useSignupMutation()

  const onSubmitCheckEmailHandler = async (e) => {
    e.preventDefault()
    checkUser(email)
  }

  const onSubmitSignupHandler = async (e) => {
    e.preventDefault()
    console.log("signup");
    const signupData=await signup({
      email,
      password,
      username: userName,
      otp:Number(otp)
    })
    console.log(signupData);
    if (signupData?.data?.signed) {
      navigate("/")
    }
  }

  useEffect(() => {
    if (data && !data.exists) {
      console.log("useEffect");
      otpValidation(email)
    }
  }, [data])
  

  return (
    <>SignupPage
      <form onSubmit={onSubmitCheckEmailHandler} method='POST'>
        <label>Email : </label>
        <input name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <br /><br />
        <button name='checkEmail' type='submit' disabled={!email} >Submit</button>
      </form>

      {data && <div>Email {data.exists ? 'exists' : <div>
        <form onSubmit={onSubmitSignupHandler} method='POST'>
          <label>User Name : </label>
          <input name='userName' id='userName' value={userName} onChange={(e) => setUserName(e.target.value)} />
          <br /><br />
          <label>Password : </label>
          <input name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <br /><br />
          <label>OTP : </label>
          <input name='otp' id='otp' value={otp} onChange={(e) => setOtp(e.target.value)} />
          <br /><br />
          <button name='signup' type='submit' disabled={!userName || !password || !otp } >Signup</button>
        </form>
      </div>}</div>}

    </>
  )
}

export default SignupPage