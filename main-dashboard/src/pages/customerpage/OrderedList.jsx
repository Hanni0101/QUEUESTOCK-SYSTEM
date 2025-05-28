// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Box, Button, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, Paper, TextField, Dialog, DialogActions,
//   DialogContent, DialogTitle
// } from '@mui/material';
// import "./OrderedList.css";
// import Navbar from "../../components/auth/Navbar";
// import axios from 'axios';

// function OrderedList() {
//   const [orders, setOrders] = useState([]); 
//   const [editOrder, setEditOrder] = useState(null); 
//   const [openEditModal, setOpenEditModal] = useState(false); 
//   const navigate = useNavigate(); 

//   useEffect(() => {
//     let mounted = true;
    
//     const fetchData = async () => {
//       if (mounted) {
//         await fetchOrders();
//       }
//     };

//     fetchData();
//     const interval = setInterval(fetchData, 1000);

//     return () => {
//       mounted = false;
//       clearInterval(interval);
//     };
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/orders');
//       const currentCustomerName = localStorage.getItem('userName');
      
//       const filteredOrders = res.data.filter(order => 
//         order.customer_name === currentCustomerName
//       );
      
//       setOrders(filteredOrders);
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/orders/${id}`);
//       fetchOrders();
//     } catch (err) {
//       console.error("Error deleting order:", err);
//     }
//   };

//   const handleEdit = (order) => {
//     setEditOrder(order);
//     setOpenEditModal(true);
//   };

//   const handleEditChange = (e) => {
//     setEditOrder({ ...editOrder, [e.target.name]: e.target.value });
//   };

//   const handleSaveEdit = async () => {
//     try {
//       await axios.put(`http://localhost:5000/api/orders/${editOrder._id}`, editOrder); 
//       setOpenEditModal(false); 
//       fetchOrders(); 
//     } catch (err) {
//       console.error("Error saving order:", err); 
//     }
//   };

//   return (
//     <div className="order-list-container">
//       <Navbar userRole="customer" handleLogout={() => { localStorage.removeItem('user'); navigate('/'); }} />

//       <div className="order-list-box">
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Product Name</TableCell>
//                 <TableCell>Price</TableCell>
//                 <TableCell>Quantity</TableCell>
//                 <TableCell>Total Price</TableCell>
//                 <TableCell>Amount</TableCell> 
//                 <TableCell>Change</TableCell>
//                 <TableCell>Delivery Method</TableCell>
//                 <TableCell>Table No. / Address</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {orders.map((order) => (
//                 <TableRow key={order._id}>
//                   <TableCell>{order.product_name}</TableCell>
//                   <TableCell>₱{order.product_price}</TableCell>
//                   <TableCell>{order.quantity}</TableCell>
//                   <TableCell>₱{order.total_price}</TableCell>
//                   <TableCell>₱{order.amount}</TableCell>
//                   <TableCell>₱{order.change}</TableCell>
//                   <TableCell>{order.delivery_method}</TableCell>
//                   <TableCell>
//                     {order.delivery_method === 'Dine-in' ? order.table_number : order.delivery_address}
//                   </TableCell>
//                   <TableCell>{order.status}</TableCell>
//                   <TableCell>
//                     <Button
//                       variant="outlined"
//                       color="primary"
//                       onClick={() => handleEdit(order)}
//                       size="small"
//                       disabled={order.status === 'Accepted' || order.status === 'Delivered'}
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       variant="outlined"
//                       color="error"
//                       onClick={() => handleDelete(order._id)}
//                       size="small"
//                       sx={{ ml: 1 }}
//                       disabled={order.status === 'Accepted' || order.status === 'Delivered'}
//                     >
//                       Delete
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>

//       <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
//         <DialogTitle>Edit Order</DialogTitle>
//         <DialogContent>
//           {editOrder && (
//             <>
//               <TextField
//                 label="Quantity"
//                 name="quantity"
//                 type="number"
//                 value={editOrder.quantity}
//                 onChange={handleEditChange}
//                 fullWidth
//                 margin="normal"
//               />
//               <TextField
//                 label="Delivery Method"
//                 name="delivery_method"
//                 value={editOrder.delivery_method}
//                 onChange={handleEditChange}
//                 fullWidth
//                 margin="normal"
//               />
//               {editOrder.delivery_method === 'Dine-in' ? (
//                 <TextField
//                   label="Table Number"
//                   name="table_number"
//                   value={editOrder.table_number || ''}
//                   onChange={handleEditChange}
//                   fullWidth
//                   margin="normal"
//                 />
//               ) : (
//                 <TextField
//                   label="Delivery Address"
//                   name="delivery_address"
//                   value={editOrder.delivery_address || ''}
//                   onChange={handleEditChange}
//                   fullWidth
//                   margin="normal"
//                 />
//               )}
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button variant="contained" onClick={handleSaveEdit}>Save</Button>
//           <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

// export default OrderedList;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TextField, Dialog, DialogActions,
  DialogContent, DialogTitle
} from '@mui/material';
import "./OrderedList.css";
import Navbar from "../../components/auth/Navbar";
import axios from 'axios';

function OrderedList() {
  const [orders, setOrders] = useState([]); 
  const [allOrders, setAllOrders] = useState([]); 
  const [editOrder, setEditOrder] = useState(null); 
  const [openEditModal, setOpenEditModal] = useState(false); 
  const navigate = useNavigate(); 

  useEffect(() => {
    let mounted = true;
    
    const fetchData = async () => {
      if (mounted) {
        await fetchOrders();
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders');
      setAllOrders(res.data); 

      const currentCustomerName = localStorage.getItem('userName');
      const filteredOrders = res.data.filter(order => 
        order.customer_name === currentCustomerName
      );
      setOrders(filteredOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${id}`);
      fetchOrders();
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  const handleEdit = (order) => {
    setEditOrder(order);
    setOpenEditModal(true);
  };

  const handleEditChange = (e) => {
    setEditOrder({ ...editOrder, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${editOrder._id}`, editOrder); 
      setOpenEditModal(false); 
      fetchOrders(); 
    } catch (err) {
      console.error("Error saving order:", err); 
    }
  };

  const getQueueNumber = (order) => {
    const acceptedOrders = allOrders
      .filter(o => o.status === 'Accepted')
      .sort((a, b) => new Date(a.updatedAt || a.createdAt) - new Date(b.updatedAt || b.createdAt));
    const idx = acceptedOrders.findIndex(o => o._id === order._id);
    return idx !== -1 ? idx + 1 : '';
  };

  return (
    <div className="order-list-container">
      <Navbar userRole="customer" handleLogout={() => { localStorage.removeItem('user'); navigate('/'); }} />

      <div className="order-list-box">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Amount</TableCell> 
                <TableCell>Change</TableCell>
                <TableCell>Delivery Method</TableCell>
                <TableCell>Table No. / Address</TableCell>
                <TableCell>Queue Number</TableCell>
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
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
                    {order.status === 'Accepted' ? getQueueNumber(order) : ''}
                  </TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(order)}
                      size="small"
                      disabled={order.status === 'Accepted' || order.status === 'Delivered'}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(order._id)}
                      size="small"
                      sx={{ ml: 1 }}
                      disabled={order.status === 'Accepted' || order.status === 'Delivered'}
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

      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Edit Order</DialogTitle>
        <DialogContent>
          {editOrder && (
            <>
              <TextField
                label="Quantity"
                name="quantity"
                type="number"
                value={editOrder.quantity}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Amount"
                name="amount"
                type="number"
                value={editOrder.amount}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Change"
                type="text"
                value={
                  editOrder.amount && editOrder.quantity && editOrder.product_price
                    ? `₱${(Number(editOrder.amount) - Number(editOrder.quantity) * Number(editOrder.product_price)).toFixed(2)}`
                    : '₱0.00'
                }
                fullWidth
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                label="Delivery Method"
                name="delivery_method"
                value={editOrder.delivery_method}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
              />
              {editOrder.delivery_method === 'Dine-in' ? (
                <TextField
                  label="Table Number"
                  name="table_number"
                  value={editOrder.table_number || ''}
                  onChange={handleEditChange}
                  fullWidth
                  margin="normal"
                />
              ) : (
                <TextField
                  label="Delivery Address"
                  name="delivery_address"
                  value={editOrder.delivery_address || ''}
                  onChange={handleEditChange}
                  fullWidth
                  margin="normal"
                />
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSaveEdit}>Save</Button>
          <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default OrderedList;