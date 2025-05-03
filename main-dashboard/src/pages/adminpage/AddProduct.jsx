// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import "./AddProduct.css";
// import Navbar from "../../components/auth/Navbar";
// import Modal from '@mui/material/Modal';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import axios from 'axios';
// import Box from '@mui/material/Box';

// const modalStyle = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     boxShadow: 24,
//     p: 4,
// };

// function AddProduct() {
//     const [open, setOpen] = useState(false);
//     const [products, setProducts] = useState([]);
//     const [formData, setFormData] = useState({
//         product_id: '',
//         product_name: '',
//         product_desc: '',
//         product_price: ''
//     });
//     const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
//     const [productToDelete, setProductToDelete] = useState(null);

//     const fetchProducts = async () => {
//         const res = await axios.get('http://localhost:5000/api/products');
//         setProducts(res.data);
//     };

//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     const handleOpen = () => {
//         setFormData({ product_id: '', product_name: '', product_desc: '', product_price: '' });
//         setOpen(true);
//     };

//     const handleClose = () => setOpen(false);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async () => {
//         await axios.post('http://localhost:5000/api/products', formData);
//         handleClose();
//         fetchProducts();
//     };

//     const handleDelete = (product) => {
//         setProductToDelete(product);
//         setConfirmDeleteOpen(true);
//     };

//     const handleEdit = (product) => {
//         setFormData(product);
//         setOpen(true);
//     };

//     const handleUpdate = async () => {
//         await axios.put(`http://localhost:5000/api/products/${formData._id}`, formData);
//         handleClose();
//         fetchProducts();
//     };

//     return (
//         <div className="add-product-container">
//             <Navbar userRole="admin" handleLogout={() => {}} />

//             <div className="add-product-box">
//                 <div className="add-product-addbutton">
//                     <Button variant="contained" onClick={handleOpen}>
//                         Add Product
//                     </Button>
//                 </div>

//                 <Modal open={open} onClose={handleClose}>
//                     <Box sx={modalStyle}>
//                         <h2>{formData._id ? 'Edit Product' : 'Add Product'}</h2>
//                         <TextField
//                             fullWidth
//                             margin="normal"
//                             label="Product ID"
//                             name="product_id"
//                             value={formData.product_id}
//                             onChange={handleChange}
//                         />
//                         <TextField
//                             fullWidth
//                             margin="normal"
//                             label="Product Name"
//                             name="product_name"
//                             value={formData.product_name}
//                             onChange={handleChange}
//                         />
//                         <TextField
//                             fullWidth
//                             margin="normal"
//                             label="Description"
//                             name="product_desc"
//                             value={formData.product_desc}
//                             onChange={handleChange}
//                         />
//                         <TextField
//                             fullWidth
//                             margin="normal"
//                             label="Price"
//                             type="number"
//                             name="product_price"
//                             value={formData.product_price}
//                             onChange={handleChange}
//                         />
                        
//                         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
//                             <Button variant="contained" onClick={formData._id ? handleUpdate : handleSubmit}>
//                                 {formData._id ? 'Update' : 'Add Product'}
//                             </Button>
//                             <Button variant="outlined" onClick={handleClose}>Cancel</Button>
//                         </Box>
//                     </Box>
//                 </Modal>

//                 <Modal open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
//                     <Box sx={modalStyle}>
//                         <p style={{ color: 'black' }}>Are you sure you want to delete this product?</p>
//                         <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, gap: 0.5 }}>
//                             <Button
//                                 variant="contained"
//                                 color="error"
//                                 onClick={async () => {
//                                     await axios.delete(`http://localhost:5000/api/products/${productToDelete._id}`);
//                                     setConfirmDeleteOpen(false);
//                                     fetchProducts();
//                                 }}
//                             >
//                                 Yes, Delete
//                             </Button>
//                             <Button variant="outlined" onClick={() => setConfirmDeleteOpen(false)}>
//                                 Cancel
//                             </Button>
//                         </Box>
//                     </Box>
//                 </Modal>

//                 <div className="product-table-wrapper">
//                     <TableContainer component={Paper} sx={{ mt: 3 }}>
//                         <Table>
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell>ID</TableCell>
//                                     <TableCell>Name</TableCell>
//                                     <TableCell>Description</TableCell>
//                                     <TableCell>Price</TableCell>
//                                     <TableCell align="center">Actions</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {products.map((prod) => (
//                                     <TableRow key={prod._id}>
//                                         <TableCell>{prod.product_id}</TableCell>
//                                         <TableCell>{prod.product_name}</TableCell>
//                                         <TableCell>{prod.product_desc}</TableCell>
//                                         <TableCell>{prod.product_price}</TableCell>
//                                         <TableCell align="center">
//                                             <EditIcon sx={{ cursor: 'pointer', mr: 2 }} onClick={() => handleEdit(prod)} />
//                                             <DeleteOutlineIcon sx={{ cursor: 'pointer' }} onClick={() => handleDelete(prod)} />
//                                         </TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AddProduct;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import "./AddProduct.css";
// import Navbar from "../../components/auth/Navbar";
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import axios from 'axios';

// const modalStyle = {
//   position: 'absolute',
//   top: '50%', left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   p: 4,
// };

// export default function AddProduct() {
//   const navigate = useNavigate();
//   const [open, setOpen]                 = useState(false);
//   const [products, setProducts]         = useState([]);
//   const [stocks, setStocks]             = useState([]);
//   const [formData, setFormData]         = useState({
//     product_id: '', product_name: '', product_desc: '', product_price: ''
//   });
//   const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
//   const [productToDelete, setProductToDelete]     = useState(null);

//   // fetch products & stocks
//   const fetchProducts = async () => {
//     const res = await axios.get('http://localhost:5000/api/products');
//     setProducts(res.data);
//   };
//   const fetchStocks = async () => {
//     const res = await axios.get('http://localhost:5000/api/stocks');
//     setStocks(res.data);
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchStocks();
//   }, []);

//   // helper: check if any stock record exists for this product with qty>0
//   const isAvailable = (prodId) =>
//     stocks.some(s => {
//       const pid = typeof s.product === 'object' ? s.product._id : s.product;
//       return pid === prodId && s.quantity > 0;
//     });

//   // open/close modal
//   const openForm = () => {
//     setFormData({ product_id: '', product_name: '', product_desc: '', product_price: '' });
//     setOpen(true);
//   };
//   const openEditForm = (prod) => {
//     setFormData(prod);
//     setOpen(true);
//   };
//   const closeForm = () => setOpen(false);

//   // CRUD handlers
//   const handleChange = e =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async () => {
//     await axios.post('http://localhost:5000/api/products', formData);
//     closeForm();
//     fetchProducts();
//   };
//   const handleUpdate = async () => {
//     await axios.put(`http://localhost:5000/api/products/${formData._id}`, formData);
//     closeForm();
//     fetchProducts();
//   };
//   const openDeleteConfirm = prod => {
//     setProductToDelete(prod);
//     setConfirmDeleteOpen(true);
//   };
//   const handleDelete = async () => {
//     await axios.delete(`http://localhost:5000/api/products/${productToDelete._id}`);
//     setConfirmDeleteOpen(false);
//     fetchProducts();
//   };

//   return (
//     <div className="add-product-container">
//       <Navbar userRole="admin" handleLogout={() => navigate('/')} />

//       <div className="add-product-box">
//         <Button variant="contained" onClick={openForm}>
//           Add Product
//         </Button>

//         {/* Add / Edit Modal */}
//         <Modal open={open} onClose={closeForm}>
//           <Box sx={modalStyle}>
//             <h2>{formData._id ? 'Edit Product' : 'Add Product'}</h2>
//             <TextField
//               fullWidth margin="normal"
//               label="Product ID"
//               name="product_id"
//               value={formData.product_id}
//               onChange={handleChange}
//             />
//             <TextField
//               fullWidth margin="normal"
//               label="Name"
//               name="product_name"
//               value={formData.product_name}
//               onChange={handleChange}
//             />
//             <TextField
//               fullWidth margin="normal"
//               label="Description"
//               name="product_desc"
//               value={formData.product_desc}
//               onChange={handleChange}
//             />
//             <TextField
//               fullWidth margin="normal"
//               label="Price"
//               type="number"
//               name="product_price"
//               value={formData.product_price}
//               onChange={handleChange}
//             />

//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
//               <Button
//                 variant="contained"
//                 onClick={formData._id ? handleUpdate : handleSubmit}
//               >
//                 {formData._id ? 'Update' : 'Add'}
//               </Button>
//               <Button variant="outlined" onClick={closeForm}>
//                 Cancel
//               </Button>
//             </Box>
//           </Box>
//         </Modal>

//         {/* Delete Confirmation */}
//         <Modal open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
//           <Box sx={modalStyle}>
//             <p>Delete this product?</p>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
//               <Button variant="contained" color="error" onClick={handleDelete}>
//                 Yes, Delete
//               </Button>
//               <Button variant="outlined" onClick={() => setConfirmDeleteOpen(false)}>
//                 Cancel
//               </Button>
//             </Box>
//           </Box>
//         </Modal>

//         {/* Products Table */}
//         <TableContainer component={Paper} sx={{ mt: 3 }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>ID</TableCell>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Description</TableCell>
//                 <TableCell>Price</TableCell>
//                 <TableCell>Availability</TableCell>
//                 <TableCell align="center">Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {products.map(prod => (
//                 <TableRow key={prod._id}>
//                   <TableCell>{prod.product_id}</TableCell>
//                   <TableCell>{prod.product_name}</TableCell>
//                   <TableCell>{prod.product_desc}</TableCell>
//                   <TableCell>{prod.product_price}</TableCell>
//                   <TableCell>
//                     {prod.available ? 'Available' : 'Not Available'}
//                   </TableCell>
//                   <TableCell align="center">
//                     <EditIcon
//                       sx={{ cursor: 'pointer', mr: 2 }}
//                       onClick={() => openEditForm(prod)}
//                     />
//                     <DeleteOutlineIcon
//                       sx={{ cursor: 'pointer' }}
//                       onClick={() => openDeleteConfirm(prod)}
//                     />
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
//     </div>
//   );
// }



// // AddProduct.jsx

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import "./AddProduct.css";
// import Navbar from "../../components/auth/Navbar";
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import axios from 'axios';

// const modalStyle = {
//   position: 'absolute',
//   top: '50%', left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   p: 4,
// };

// export default function AddProduct() {
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [stocks, setStocks] = useState([]);
//   const [formData, setFormData] = useState({
//     product_id: '', product_name: '', product_desc: '', product_price: '', product_image: null
//   });
//   const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
//   const [productToDelete, setProductToDelete] = useState(null);

//   // Fetch products & stocks
//   const fetchProducts = async () => {
//     const res = await axios.get('http://localhost:5000/api/products');
//     setProducts(res.data);
//   };
//   const fetchStocks = async () => {
//     const res = await axios.get('http://localhost:5000/api/stocks');
//     setStocks(res.data);
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchStocks();
//   }, []);

//   const isAvailable = (prodId) =>
//     stocks.some(s => {
//       const pid = typeof s.product === 'object' ? s.product._id : s.product;
//       return pid === prodId && s.quantity > 0;
//     });

//   // Open/close modal
//   const openForm = () => {
//     setFormData({ product_id: '', product_name: '', product_desc: '', product_price: '', product_image: null });
//     setOpen(true);
//   };
//   const openEditForm = (prod) => {
//     setFormData(prod);
//     setOpen(true);
//   };
//   const closeForm = () => setOpen(false);

//   // Handle form data change
//   const handleChange = e => {
//     if (e.target.name === 'product_image') {
//       setFormData({ ...formData, [e.target.name]: e.target.files[0] });
//     } else {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async () => {
//     const form = new FormData();
//     form.append('product_id', formData.product_id);
//     form.append('product_name', formData.product_name);
//     form.append('product_desc', formData.product_desc);
//     form.append('product_price', formData.product_price);
//     form.append('product_image', formData.product_image);

//     await axios.post('http://localhost:5000/api/products', form, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });
//     closeForm();
//     fetchProducts();
//   };

//   const handleUpdate = async () => {
//     const form = new FormData();
//     form.append('product_id', formData.product_id);
//     form.append('product_name', formData.product_name);
//     form.append('product_desc', formData.product_desc);
//     form.append('product_price', formData.product_price);
//     if (formData.product_image) {
//       form.append('product_image', formData.product_image);
//     }

//     await axios.put(`http://localhost:5000/api/products/${formData._id}`, form, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });
//     closeForm();
//     fetchProducts();
//   };

//   const openDeleteConfirm = prod => {
//     setProductToDelete(prod);
//     setConfirmDeleteOpen(true);
//   };

//   const handleDelete = async () => {
//     await axios.delete(`http://localhost:5000/api/products/${productToDelete._id}`);
//     setConfirmDeleteOpen(false);
//     fetchProducts();
//   };

//   return (
//     <div className="add-product-container">
//       <Navbar userRole="admin" handleLogout={() => navigate('/')} />

//       <div className="add-product-box">
//         <Button variant="contained" onClick={openForm}>
//           Add Product
//         </Button>

//         {/* Add/Edit Modal */}
//         <Modal open={open} onClose={closeForm}>
//           <Box sx={modalStyle}>
//             <h2>{formData._id ? 'Edit Product' : 'Add Product'}</h2>
//             <TextField
//               fullWidth margin="normal"
//               label="Product ID"
//               name="product_id"
//               value={formData.product_id}
//               onChange={handleChange}
//             />
//             <TextField
//               fullWidth margin="normal"
//               label="Name"
//               name="product_name"
//               value={formData.product_name}
//               onChange={handleChange}
//             />
//             <TextField
//               fullWidth margin="normal"
//               label="Description"
//               name="product_desc"
//               value={formData.product_desc}
//               onChange={handleChange}
//             />
//             <TextField
//               fullWidth margin="normal"
//               label="Price"
//               type="number"
//               name="product_price"
//               value={formData.product_price}
//               onChange={handleChange}
//             />

//             {/* Image Upload */}
//             <input
//               type="file"
//               name="product_image"
//               onChange={handleChange}
//               style={{ marginTop: '15px' }}
//             />

//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 2 }}>
//               <Button variant="contained" onClick={formData._id ? handleUpdate : handleSubmit}>
//                 {formData._id ? 'Update' : 'Add'}
//               </Button>
//               <Button variant="outlined" onClick={closeForm}>
//                 Cancel
//               </Button>
//             </Box>
//           </Box>
//         </Modal>

//         {/* Delete Confirmation */}
//         <Modal open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
//           <Box sx={modalStyle}>
//             <p>Delete this product?</p>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
//               <Button variant="contained" color="error" onClick={handleDelete}>
//                 Yes, Delete
//               </Button>
//               <Button variant="outlined" onClick={() => setConfirmDeleteOpen(false)}>
//                 Cancel
//               </Button>
//             </Box>
//           </Box>
//         </Modal>

//         {/* Products Table */}
//         <TableContainer component={Paper} sx={{ mt: 3 }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>ID</TableCell>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Description</TableCell>
//                 <TableCell>Price</TableCell>
//                 <TableCell>Availability</TableCell>
//                 <TableCell>Image</TableCell>
//                 <TableCell align="center">Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {products.map(prod => (
//                 <TableRow key={prod._id}>
//                   <TableCell>{prod.product_id}</TableCell>
//                   <TableCell>{prod.product_name}</TableCell>
//                   <TableCell>{prod.product_desc}</TableCell>
//                   <TableCell>{prod.product_price}</TableCell>
//                   <TableCell>{prod.available ? 'Available' : 'Not Available'}</TableCell>
//                   <TableCell>
//                     <img
//                       src={prod.product_image}
//                       alt={prod.product_name}
//                       style={{ width: '50px', height: '50px', objectFit: 'cover' }}
//                     />
//                   </TableCell>
//                   <TableCell align="center">
//                     <EditIcon sx={{ cursor: 'pointer', mr: 2 }} onClick={() => openEditForm(prod)} />
//                     <DeleteOutlineIcon sx={{ cursor: 'pointer' }} onClick={() => openDeleteConfirm(prod)} />
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
//     </div>
//   );
// }





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

  const handleSubmit = async () => {
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

  const handleUpdate = async () => {
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
            <h2>{formData._id ? 'Edit Product' : 'Add Product'}</h2>
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
            <p>Delete this product?</p>
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
                <TableCell align="center">Actions</TableCell>
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

