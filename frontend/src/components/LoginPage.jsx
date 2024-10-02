import React, { useState } from 'react'
import { useLoginMutation } from '../redux_store/loginSlice'
import { setCredentials } from '../redux_store/authSlice'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [login] = useLoginMutation()
    const dispatch = useDispatch()
    const navigate=useNavigate()

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        const jwt_token = await login({ email, password })
        console.log(`onSubmitHandler : ${JSON.stringify(jwt_token)}`);
        dispatch(setCredentials({ ...jwt_token.data, email,...jwt_token._id }))
        navigate("/dashobard")
    }

    const onForgetPassword = () => {
        console.log("onForgetPassword");
        navigate("/forget-password")
    }

    const onSignup = () => {
        console.log("onSignup");
        navigate("/signup")
    }

    return (
        <>
            <form onSubmit={onSubmitHandler} method='POST'>
                <label>Email : </label>
                <input name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <br /><br />
                <label>Password : </label>
                <input name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <br /><br />
                <button name='login' type='submit' disabled={!email || !password} >Login</button>
            </form>
            <br />
            <button type='button' onClick={onForgetPassword}>Forget Password</button>
            <button type='button' onClick={onSignup}>Signup</button>
  
        </>
    )
}

export default LoginPage