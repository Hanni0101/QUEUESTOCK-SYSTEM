import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./AddStock.css";
import Navbar from "../../components/auth/Navbar";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function AddStock() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [stocks, setStocks] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    ingredient_name: '',
    quantity: '',
    product: ''
  });
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [stockToDelete, setStockToDelete] = useState(null);

  const fetchStocks = async () => {
    const res = await axios.get('http://localhost:5000/api/stocks');
    setStocks(res.data);
  };

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products');
    setProducts(res.data);
  };

  useEffect(() => {
    fetchStocks();
    fetchProducts();
  }, []);

  const handleOpen = () => {
    setFormData({ ingredient_name: '', quantity: '', product: '' });
    setOpen(true);
  };
  const handleEdit = (stock) => {
    setFormData({
      _id: stock._id,
      ingredient_name: stock.ingredient_name,
      quantity: stock.quantity,
      product: stock.product._id || stock.product
    });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async () => {
  //   await axios.post('http://localhost:5000/api/stocks', formData);
  //   handleClose();
  //   fetchStocks();
  // };

  const handleSubmit = async () => {
    if (Number(formData.quantity) < 0) {
      alert("Quantity cannot be negative.");
      return;
    }
    await axios.post('http://localhost:5000/api/stocks', formData);
    handleClose();
    fetchStocks();
  };

  // const handleUpdate = async () => {
  //   await axios.put(`http://localhost:5000/api/stocks/${formData._id}`, formData);
  //   handleClose();
  //   fetchStocks();
  // };

  const handleUpdate = async () => {
    if (Number(formData.quantity) < 0) {
      alert("Quantity cannot be negative.");
      return;
    }
    await axios.put(`http://localhost:5000/api/stocks/${formData._id}`, formData);
    handleClose();
    fetchStocks();
  };


  const handleDelete = (stock) => {
    setStockToDelete(stock);
    setConfirmDeleteOpen(true);
  };
  const confirmDelete = async () => {
    await axios.delete(`http://localhost:5000/api/stocks/${stockToDelete._id}`);
    setConfirmDeleteOpen(false);
    fetchStocks();
  };

  return (
    <div className="add-stock-container">
      <Navbar userRole="admin" handleLogout={() => navigate('/')} />

      <div className="add-stock-box">
        <div className="add-stock-addbutton">
          <Button variant="contained" onClick={handleOpen}>
            Add Ingredient
          </Button>
        </div>

        <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyle}>
            <h2 style={{ color: 'black', fontWeight: 'bold' }}>{formData._id ? 'EDIT INGREDIENT INFORMATION' : 'ADD INGREDIENT STOCK'}</h2>

            <TextField
              fullWidth
              margin="normal"
              label="Ingredient Name"
              name="ingredient_name"
              value={formData.ingredient_name}
              onChange={handleChange}
            />

            <Select
              fullWidth
              displayEmpty
              margin="normal"
              name="product"
              value={formData.product}
              onChange={handleChange}
            >
              <MenuItem value="" disabled>
                Select Product
              </MenuItem>
              {products.map((p) => (
                <MenuItem key={p._id} value={p._id}>
                  {p.product_name}
                </MenuItem>
              ))}
            </Select>

            <TextField
              fullWidth
              margin="normal"
              label="Quantity"
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
              <Button
                variant="contained"
                onClick={formData._id ? handleUpdate : handleSubmit}
              >
                {formData._id ? 'Update' : 'Add'}
              </Button>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>

        <Modal open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
          <Box sx={modalStyle}>
            <p style={{ color: 'black' }}>DELETE THIS INGREDIENT?</p>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button variant="contained" color="error" onClick={confirmDelete}>
                Yes, Delete
              </Button>
              <Button variant="outlined" onClick={() => setConfirmDeleteOpen(false)}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>

        <div className="stock-table-wrapper">
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ingredient</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stocks.map((s) => (
                  <TableRow key={s._id}>
                    <TableCell>{s.ingredient_name}</TableCell>
                    <TableCell>
                      {s.product?.product_name ?? s.product}
                    </TableCell>
                    <TableCell>{s.quantity}</TableCell>
                    <TableCell align="center">
                      <EditIcon
                        sx={{ cursor: 'pointer', mr: 2 }}
                        onClick={() => handleEdit(s)}
                      />
                      <DeleteOutlineIcon
                        sx={{ cursor: 'pointer' }}
                        onClick={() => handleDelete(s)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default AddStock;
