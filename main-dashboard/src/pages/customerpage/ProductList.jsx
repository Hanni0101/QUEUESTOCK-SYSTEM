import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./ProductList.css";
import Navbar from "../../components/auth/Navbar";


function ProductList(){
  return (
    <div className="product-list-container">
        <Navbar userRole="customer" handleLogout={() => {}} />
        <div className="product-list-box">
        
        </div>
    </div>
  );
}
export default ProductList;