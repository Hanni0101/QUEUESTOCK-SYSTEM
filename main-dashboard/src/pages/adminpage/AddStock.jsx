import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./AddStock.css";
import Navbar from "../../components/auth/Navbar";


function AddStock(){
  return (
    <div className="add-stock-container">
        <Navbar userRole="admin" handleLogout={() => {}} />
        <div className="add-stock-box">
        
        </div>
    </div>
  );
}
export default AddStock;