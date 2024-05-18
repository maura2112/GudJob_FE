import { Box, Button, Divider, Grid, IconButton, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { LoadingButton } from '@mui/lab'
import { useDispatch, useSelector } from 'react-redux';
import authApi from '../service/authApi';


const Login = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const isLoading = useSelector((state) => state.auth.login?.isFetching)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let data = {
      email: userName,
      password: password
    }
      await authApi.loginUser(data, dispatch, navigate);
  }



  const handleRegister = (e) => {
    navigate("/register")
  }

  return (
    <>
      <Box>
        <Box sx={style}>
          <Box sx={{ textAlign: "center" }} mb={2}>
            <Typography variant='h4'>Home</Typography>
            <Typography variant='h6' >Welcome back</Typography>
            {/* <Button variant='contained'>Log in with Facebook</Button> */}
          </Box>
          <Divider />
          <Box mt={3}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              size="small"
              onChange={(e) => setUserName(e.target.value)}
            />

            <TextField
              sx={{ mt: 3 }}
              required
              fullWidth
              name="password"
              size="small"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={handleClickShowPassword}
                    size="small">
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                )
              }}
            />
          </Box>
          <Box mt={3}>
            <Typography
              variant="body1"
              component="span"
              onClick={() => {
                navigate('/reset-password')
              }}
              style={{
                marginTop: '10px',
                cursor: 'pointer',
                color: 'rgb(99, 102, 241)'
              }}>
              Forgot password?
            </Typography>
          </Box>
          <Box>
            <LoadingButton
              fullWidth
              loading={isLoading}
              size="large"
              sx={{
                mt: 2,
                bgcolor: 'rgb(99, 102, 241)',
                p: '11px 24px',
                borderRadius: '12px'
              }}
              type="submit"
              onClick={(e) => handleSubmit(e)}
              variant="contained">
              Submit
            </LoadingButton>
            <LoadingButton
              fullWidth
              size="large"
              sx={{
                mt: 2,
                bgcolor: 'rgb(99, 102, 241)',
                p: '11px 24px',
                borderRadius: '12px'
              }}
              onClick={(e) => handleRegister(e)}
              variant="contained">
              Register
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </>
  )
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default Login;
