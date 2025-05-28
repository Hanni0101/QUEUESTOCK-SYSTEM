import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import Navbar from '../../components/auth/Navbar';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

function AdminDashboard() {
  const navigate = useNavigate();
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('userRole'); 
    navigate('/');
  };

  useEffect(() => {
    fetchDeliveredOrders();
    const interval = setInterval(fetchDeliveredOrders, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchDeliveredOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders/delivered');
      const sortedOrders = res.data.sort((a, b) => 
      new Date(b.delivered_at) - new Date(a.delivered_at)
      );
      setDeliveredOrders(sortedOrders);
    } catch (err) {
      console.error("Error fetching delivered orders:", err);
    }
  };

  return (
    <div className="admin-dashboard-container">
      <Navbar userRole="admin" handleLogout={handleLogout} />
      <div className="admin-dashboard-box">
        <Typography variant="h5" gutterBottom>Delivered Orders Report</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer Name</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Delivered At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deliveredOrders.map(order => (
                <TableRow key={order._id}>
                  <TableCell>{order.customer_name}</TableCell>
                  <TableCell>{order.product_name}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>₱{order.total_price}</TableCell>
                  <TableCell>
                    {new Date(order.delivered_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default AdminDashboard;