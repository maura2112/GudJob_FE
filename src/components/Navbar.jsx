import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    }
    const handleRegister = () => {
        navigate("/register");
    }
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          GudJob
        </Typography>
        <Button color="inherit" onClick={(e)=>handleLogin() }>Login</Button>
        <Button color="inherit" onClick={(e)=>handleRegister() }>Sign Up</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
