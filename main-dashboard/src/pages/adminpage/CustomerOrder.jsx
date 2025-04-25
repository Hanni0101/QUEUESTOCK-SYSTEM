import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./CustomerOrder.css";
import Navbar from "../../components/auth/Navbar";


function CustomerOrder(){
  return (
    <div className="customer-order-container">
        <Navbar userRole="admin" handleLogout={() => {}} />
        <div className="customer-order-box">
        
        </div>
    </div>
  );
}
export default CustomerOrder;