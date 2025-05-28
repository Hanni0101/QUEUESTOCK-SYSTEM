import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box, TextField, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, IconButton, InputAdornment
} from '@mui/material';
import restoLogo from './restoLogo.png';
import './LoginForm.css';
import validator from 'validator';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function LoginForm() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const validateName = (value) => {
    return validator.isAlpha(value.replace(/\s/g, ''));
  };

  const validateEmail = (value) => {
    return validator.isEmail(value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/clients/login',
        { name, password }
      );

      localStorage.setItem('userName', data.name);
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('userId', data.id);
      
      if (data.role === 'admin') {
        navigate('/adminpage/admin-dashboard');
      } else {
        navigate('/customerpage/customer-dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleRegister = async () => {
    if (!validateName(registerData.name)) {
      setError('Name must only contain letters and spaces');
      return;
    }

    if (!validateEmail(registerData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/clients/register', registerData);
      setOpenRegister(false);
      setError('');
      alert('Registration successful! Please login.');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-container">
      <Box className="login-box" component="form" onSubmit={handleLogin}>
        <img src={restoLogo} alt="Logo" className="logo" />
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {error && <p className="error" style={{color: 'red'}}>{error}</p>}
        <Button type="submit" variant="contained" fullWidth>
          Submit
        </Button>
        <Button 
          variant="outlined" 
          fullWidth 
          sx={{ mt: 2 }}
          onClick={() => setOpenRegister(true)}
        >
          SIGN UP
        </Button>
      </Box>

      <Dialog open={openRegister} onClose={() => setOpenRegister(false)}>
        <DialogTitle>REGISTER NEW ACCOUNT</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={registerData.name}
            onChange={handleRegisterChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={registerData.email}
            onChange={handleRegisterChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type={showRegisterPassword ? 'text' : 'password'}
            fullWidth
            variant="outlined"
            value={registerData.password}
            onChange={handleRegisterChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle register password visibility"
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    edge="end"
                  >
                    {showRegisterPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleRegister}>Register</Button>
          <Button onClick={() => setOpenRegister(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LoginForm;