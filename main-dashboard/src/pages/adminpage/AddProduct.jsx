import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./AddProduct.css";
import Navbar from "../../components/auth/Navbar";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
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
  top: '50%', left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function AddProduct() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [formData, setFormData] = useState({
    product_id: '', product_name: '', product_desc: '', product_price: '', product_image: ''
  });
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products');
    setProducts(res.data);
  };

  const fetchStocks = async () => {
    const res = await axios.get('http://localhost:5000/api/stocks');
    setStocks(res.data);
  };

  useEffect(() => {
    fetchProducts();
    fetchStocks();
  }, []);

  const isAvailable = (prodId) =>
    stocks.some(s => {
      const pid = typeof s.product === 'object' ? s.product._id : s.product;
      return pid === prodId && s.quantity > 0;
    });

  const openForm = () => {
    setFormData({ product_id: '', product_name: '', product_desc: '', product_price: '', product_image: '' });
    setOpen(true);
  };

  const openEditForm = (prod) => {
    setFormData(prod);
    setOpen(true);
  };

  const closeForm = () => setOpen(false);

  const handleChange = e => {
    if (e.target.name === 'product_image') {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // const handleSubmit = async () => {
  //   const productData = {
  //     product_id: formData.product_id,
  //     product_name: formData.product_name,
  //     product_desc: formData.product_desc,
  //     product_price: formData.product_price,
  //     product_image: formData.product_image, 
  //   };

  //   await axios.post('http://localhost:5000/api/products', productData);
  //   closeForm();
  //   fetchProducts();
  // };

  const handleSubmit = async () => {
  if (Number(formData.product_price) < 0) {
    alert("Price cannot be negative.");
    return;
  }
  const productData = {
    product_id: formData.product_id,
    product_name: formData.product_name,
    product_desc: formData.product_desc,
    product_price: formData.product_price,
    product_image: formData.product_image, 
  };

  await axios.post('http://localhost:5000/api/products', productData);
  closeForm();
  fetchProducts();
};

  // const handleUpdate = async () => {
  //   const productData = {
  //     product_id: formData.product_id,
  //     product_name: formData.product_name,
  //     product_desc: formData.product_desc,
  //     product_price: formData.product_price,
  //     product_image: formData.product_image, 
  //   };

  //   await axios.put(`http://localhost:5000/api/products/${formData._id}`, productData);
  //   closeForm();
  //   fetchProducts();
  // };

  const handleUpdate = async () => {
  if (Number(formData.product_price) < 0) {
    alert("Price cannot be negative.");
    return;
  }
  const productData = {
    product_id: formData.product_id,
    product_name: formData.product_name,
    product_desc: formData.product_desc,
    product_price: formData.product_price,
    product_image: formData.product_image, 
  };

  await axios.put(`http://localhost:5000/api/products/${formData._id}`, productData);
  closeForm();
  fetchProducts();
};


  const openDeleteConfirm = prod => {
    setProductToDelete(prod);
    setConfirmDeleteOpen(true);
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/api/products/${productToDelete._id}`);
    setConfirmDeleteOpen(false);
    fetchProducts();
  };

  return (
    <div className="add-product-container">
      <Navbar userRole="admin" handleLogout={() => navigate('/')} />

      <div className="add-product-box">
        <Button variant="contained" onClick={openForm}>
          Add Product
        </Button>
        <Modal open={open} onClose={closeForm}>
          <Box sx={modalStyle}>
            <h2 style={{ color: 'black', fontWeight: 'bold' }}>{formData._id ? 'EDIT PRODUCT INFORMATION' : 'ADD PRODUCT'}</h2>
            <TextField
              fullWidth margin="normal"
              label="Product ID"
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
            />
            <TextField
              fullWidth margin="normal"
              label="Name"
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
            />
            <TextField
              fullWidth margin="normal"
              label="Description"
              name="product_desc"
              value={formData.product_desc}
              onChange={handleChange}
            />
            <TextField
              fullWidth margin="normal"
              label="Price"
              type="number"
              name="product_price"
              value={formData.product_price}
              onChange={handleChange}
            />

            <TextField
              fullWidth margin="normal"
              label="Product Image URL"
              name="product_image"
              value={formData.product_image || ""}
              onChange={handleChange}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
              <Button variant="contained" onClick={formData._id ? handleUpdate : handleSubmit}>
                {formData._id ? 'Update' : 'Add'}
              </Button>
              <Button variant="outlined" onClick={closeForm}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>

        <Modal open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
          <Box sx={modalStyle}>
            <p style={{ color: 'black' }}>DELETE THIS PRODUCT?</p>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button variant="contained" color="error" onClick={handleDelete}>
                Yes, Delete
              </Button>
              <Button variant="outlined" onClick={() => setConfirmDeleteOpen(false)}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>

        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Availability</TableCell>
                <TableCell>Image</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map(prod => (
                <TableRow key={prod._id}>
                  <TableCell>{prod.product_id}</TableCell>
                  <TableCell>{prod.product_name}</TableCell>
                  <TableCell>{prod.product_desc}</TableCell>
                  <TableCell>{prod.product_price}</TableCell>
                  <TableCell>{prod.available ? 'Available' : 'Not Available'}</TableCell>
                  <TableCell>
                    <img
                      src={prod.product_image}
                      alt={prod.product_name}
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <EditIcon sx={{ cursor: 'pointer', mr: 2 }} onClick={() => openEditForm(prod)} />
                    <DeleteOutlineIcon sx={{ cursor: 'pointer' }} onClick={() => openDeleteConfirm(prod)} />
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

