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
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-stock" element={<AddStock />} />
        <Route path="/admin/customer-orders" element={<CustomerOrder />} />
        <Route path="/admin/add-product" element={<AddProduct />} />

        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/products" element={<ProductList />} />
        <Route path="/customer/orders" element={<OrderedList />} />
      </Routes>
    </Router>
  );
}

export default App;
