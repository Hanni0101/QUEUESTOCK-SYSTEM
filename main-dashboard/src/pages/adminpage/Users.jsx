import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Users.css";
import Navbar from "../../components/auth/Navbar";
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('userRole'); 
    navigate('/');
  };

  useEffect(() => {
    fetchUsers();
    const interval = setInterval(fetchUsers, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/clients/all');
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  return (
    <div className="users-dashboard-container">
      <Navbar userRole="admin" handleLogout={handleLogout} />
      <div className="users-dashboard-box">
        <Typography variant="h5" gutterBottom>Registered Users</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email Address</TableCell>
                <TableCell>Password</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.password}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Users;