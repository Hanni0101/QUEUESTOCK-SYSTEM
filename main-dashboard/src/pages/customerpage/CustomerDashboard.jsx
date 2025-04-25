import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./CustomerDashboard.css";
import Navbar from "../../components/auth/Navbar";


function CustomerDashboard(){
    const navigate = useNavigate();
    
  const handleLogout = () => {
    localStorage.removeItem('userRole'); 
    navigate('/');
    };

  return (
    <div className="customer-dashboard-container">
      <Navbar userRole="customer" handleLogout={handleLogout} />
        <div className="customer-dashboard-box">
        
        </div>
    </div>
  );
}
export default CustomerDashboard;