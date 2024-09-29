import React, { useState } from 'react'
import { useLoginMutation } from '../redux_store/loginSlice'
import { setCredentials } from '../redux_store/authSlice'
import { useDispatch } from 'react-redux'

function Main() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [login] = useLoginMutation()
    const dispatch=useDispatch()

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        const jwt_token = await login({ email, password })
        console.log(`onSubmitHandler : ${JSON.stringify(jwt_token)}`);
        dispatch(setCredentials({...jwt_token.data,email}))
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
        </>
    )
}

export default Main