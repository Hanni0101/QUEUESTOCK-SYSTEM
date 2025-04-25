import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./AddProduct.css";
import Navbar from "../../components/auth/Navbar";


function AddProduct(){
  return (
    <div className="add-product-container">
        <Navbar userRole="admin" handleLogout={() => {}} />
        <div className="add-product-box">
        
        </div>
    </div>
  );
}
export default AddProduct;