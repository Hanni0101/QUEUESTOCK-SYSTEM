import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import restoLogo from './restoLogo.png'; 
import './LoginForm.css';

function LoginForm() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", name, password);
  
    if (name === 'admin' && password === 'Admin12345@') {
      navigate('/admin/dashboard');
    } else {
      navigate('/customer/dashboard');
    }
  };
  

  return (
    <div className="login-container">
      <Box className="login-box" component="form" onSubmit={handleLogin}>
        <img src={restoLogo} alt="Restaurant Logo" className="logo" />
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" variant="contained" fullWidth className="login-button">
          Submit
        </Button>
      </Box>
    </div>
  );
}

export default LoginForm;
