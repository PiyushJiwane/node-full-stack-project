import { Alert, Box, Button, Container, Paper, Link, Snackbar, TextField } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import '../styles/paper.css'
import { useLoginMutation } from '../utils/loginSlice'
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate()

    const [login, { isLoading, isSuccess, isError, data, error }] = useLoginMutation()
    console.log(error);

    const [userLoginData, setUserLoginData] = useState({
        email: '',
        password: ''
    })

    const [snackbarState, setSetsnackbarState] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'right',
    })
    const { vertical, horizontal, open } = snackbarState;

    useEffect(() => {
        if (isError) {
            setSetsnackbarState({ ...snackbarState, open: true });
        }
    }, [isError]);

    const snackbar_handleClick = (newState) => () => {
        setState({ ...newState, open: true });
    };

    const snackbar_handleClose = () => {
        setSetsnackbarState({ ...snackbarState, open: false });
    };

    const loginFn = () => {
        login(userLoginData)
        navigate("/dashboard")
    }

    const insertStateDataFn = (e) => {
        setUserLoginData({
            ...userLoginData,
            [e.target.id]: e.target.value
        })
    }

    const preventDefault = (event) => event.preventDefault();
    return (
        <>
            <Box
                sx={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',            // Flexbox for centering
                    justifyContent: 'center',    // Center horizontally
                    alignItems: 'center',        // Center vertically
                }}>
                <Paper className='paper' elevation={3} >
                    <TextField
                        id="email"
                        type="email"
                        name="email"
                        value={userLoginData.email}
                        onChange={insertStateDataFn}
                        variant="outlined"
                        placeholder="Email"
                    />

                    <TextField
                        id="password"
                        type="password"
                        name="password"
                        value={userLoginData.password}
                        onChange={insertStateDataFn}
                        variant='outlined'
                        placeholder="Password"
                    />

                    <Button variant="outlined" onClick={loginFn} disabled={isLoading}>
                        {isLoading ? "Logging in ..." : "Login"}
                    </Button>

                    <Box className="innerBox" onClick={preventDefault}>
                        <Link component={RouterLink} to="/signup" underline="hover">
                            {"Signup"}
                        </Link>
                        <Link component={ RouterLink } to="forget-password" underline="hover">
                            {"Forget Password"}
                        </Link>
                    </Box>
                    {/* Handle Success */}
                    {isSuccess && <div>Login successful! Welcome</div>}

                    {/* Handle Error */}
                    {/* {isError && <div>Error logging in: {error?.data.data || error?.data.errors[0].msg}</div>} */}
                    {
                        isError && <Snackbar
                            anchorOrigin={{ vertical, horizontal }}
                            open={open}
                            onClose={snackbar_handleClose}
                            autoHideDuration={2000}
                            key={vertical + horizontal}
                        >
                            <Alert
                                onClose={snackbar_handleClose}
                                severity="error"
                                variant="filled"
                                sx={{ width: '100%' }}
                            >{error?.data.data || error?.data.errors[0].msg}</Alert>
                        </Snackbar>
                    }
                </Paper>
            </Box>
        </>
    )
}

export default LoginPage