import React, { useState } from 'react'
import { useLoginMutation } from '../redux_store/loginSlice'
import { setCredentials } from '../redux_store/authSlice'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './LoginPage'
import DashboardPage from './DashboardPage'
import SignupPage from './SignupPage'
import ForgetPasswordPage from './ForgetPasswordPage'
import UpdateTodo from './UpdateTodo'

function Main() {
    return (
        <Routes>
            <Route path='/' end element={<LoginPage />} />
            <Route path='/dashobard' element={<DashboardPage/>}/>
            <Route path='/signup' element={<SignupPage/>}/>
            <Route path='/forget-password' element={<ForgetPasswordPage/>}/>
            <Route path='/update-todo' element={<UpdateTodo/>}/>
        </Routes>
    )
}
export default Main