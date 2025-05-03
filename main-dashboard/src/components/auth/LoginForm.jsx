import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import restoLogo from './restoLogo.png'; 
import './LoginForm.css';

function LoginForm() {
  const navigate = useNavigate();
  const [name, setName]         = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/clients/login',
        { name, password }
      );

      if (data.role === 'admin') {
        navigate('/adminpage/admin-dashboard');
      } else {
       navigate('/customerpage/customer-dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
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
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <Button type="submit" variant="contained" fullWidth>
          Submit
        </Button>
      </Box>
    </div>
  );
}

export default LoginForm;
