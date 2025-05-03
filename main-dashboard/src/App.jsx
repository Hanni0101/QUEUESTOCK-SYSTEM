import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import AdminDashboard from './pages/adminpage/AdminDashboard';
import AddStock from './pages/adminpage/AddStock';
import CustomerOrder from './pages/adminpage/CustomerOrder';
import AddProduct from './pages/adminpage/AddProduct';
import CustomerDashboard from './pages/customerpage/CustomerDashboard';
import ProductList from './pages/customerpage/ProductList';
import OrderedList from './pages/customerpage/OrderedList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/adminpage/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/adminpage/addstock" element={<AddStock />} />
        <Route path="/adminpage/customer-orders" element={<CustomerOrder />} />
        <Route path="/adminpage/addproduct" element={<AddProduct />} />

        <Route path="/customerpage/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/customerpage/productlist" element={<ProductList />} />
        <Route path="/customerpage/orderedlist" element={<OrderedList />} />
      </Routes>
    </Router>
  );
}

export default App;
