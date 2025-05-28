import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from '@mui/material';
import "./CustomerOrder.css";
import Navbar from "../../components/auth/Navbar";
import axios from 'axios';

function CustomerOrder() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [productStocks, setProductStocks] = useState({});


  useEffect(() => {
    fetchOrders(); 
      fetchStocks();

    const interval = setInterval(() => {
      fetchOrders(); 
        fetchStocks();

    }, 1000); 
    
    return () => clearInterval(interval); 
  }, []);

  const fetchStocks = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/stocks');
    // Map product name to total stock
    const stockMap = {};
    res.data.forEach(stock => {
      const prodName = stock.product?.product_name || stock.product;
      stockMap[prodName] = (stockMap[prodName] || 0) + stock.quantity;
    });
    setProductStocks(stockMap);
  } catch (err) {
    console.error("Error fetching stocks:", err);
  }
};

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders');
      console.log("Fetched Orders:", res.data);
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const handleDeliverOrder = async (id) => {
    try {
      const order = orders.find(o => o._id === id);
      const stock = productStocks[order.product_name] || 0;

      if (stock < 20) {
        alert(`Warning: Stock for "${order.product_name}" is low: ${stock} left!`);
      }

      await axios.put(`http://localhost:5000/api/orders/${id}`, { status: 'Delivered' });
      fetchOrders();
    } catch (err) {
      console.error("Error delivering order:", err);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${id}`);
      fetchOrders();
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  const handleAcceptOrder = async (id) => {
  try {
    await axios.put(`http://localhost:5000/api/orders/${id}/accept`);
    fetchOrders();
  } catch (err) {
    console.error("Error accepting order:", err);
  }
};

  return (
    <div className="customer-order-container">
      <Navbar userRole="admin" handleLogout={() => { localStorage.removeItem('user'); navigate('/'); }} />

      <div className="customer-order-box">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                              <TableCell>Customer Name</TableCell> 
                <TableCell>Product Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Change</TableCell>
                <TableCell>Delivery Method</TableCell>
                <TableCell>Table No. / Address</TableCell>
                <TableCell></TableCell> 
              </TableRow>
            </TableHead>
            <TableBody>
            {orders
              .filter(order => order.status !== 'Delivered')
              .map((order) => (
                <TableRow key={order._id}>
                                  <TableCell>{order.customer_name}</TableCell> {/* Add this line */}

                  <TableCell>{order.product_name}</TableCell>
                  <TableCell>₱{order.product_price}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>₱{order.total_price}</TableCell>
                  <TableCell>₱{order.amount}</TableCell>
                  <TableCell>₱{order.change}</TableCell>
                  <TableCell>{order.delivery_method}</TableCell>
                  <TableCell>
                    {order.delivery_method === 'Dine-in' ? order.table_number : order.delivery_address}
                  </TableCell>
                  <TableCell>
                    {order.status === 'Pending' && (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleAcceptOrder(order._id)}
                        size="small"
                        sx={{ mr: 1 }}
                      >
                        Accept Order
                      </Button>
                    )}
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDeliverOrder(order._id)}
                    size="small"
                    disabled={productStocks[order.product_name] === 0}
                  >
                    Deliver Order
                  </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteOrder(order._id)}
                      size="small"
                      sx={{ ml: 1 }}
                    >
                      Delete
                    </Button>
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

export default CustomerOrder;