import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./OrderedList.css";
import Navbar from "../../components/auth/Navbar";


function OrderedList(){
  return (
    <div className="order-list-container">
        <Navbar userRole="customer" handleLogout={() => {}} />
        <div className="order-list-box">
        
        </div>
    </div>
  );
}
export default OrderedList;