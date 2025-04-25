import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import Navbar from '../../components/auth/Navbar';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userRole'); 
    navigate('/');
  };

  return (
    <div className="admin-dashboard-container">
      <Navbar userRole="admin" handleLogout={handleLogout} />
      <div className="admin-dashboard-box">
        
      </div>
    </div>
  );
}

export default AdminDashboard;
