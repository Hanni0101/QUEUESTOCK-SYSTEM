import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import restoLogo from './restoLogo.png';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const Navbar = ({ userRole, handleLogout }) => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src={restoLogo} alt="Logo" className="navbar-logo" />
            </div>

            <ul className="navbar-right">
                {userRole === 'admin' && (
                    <>
                        <li><Link to="/adminpage/admin-dashboard">Home</Link></li>
                        <li><Link to="/adminpage/addproduct">Product</Link></li>
                        <li><Link to="/adminpage/addstock">Stock</Link></li>
                        <li><Link to="/adminpage/customerorders">Customer Orders</Link></li>
                    </>
                )}

                {userRole === 'customer' && (
                    <>
                        <li><Link to="/customerpage/customer-dashboard">Home</Link></li>
                        <li><Link to="/customerpage/productlist">Product List</Link></li>
                        <li><Link to="/customerpage/orderedlist">Ordered List</Link></li>
                    </>
                )}

                {(userRole === 'admin' || userRole === 'customer') && (
                    <li>
                        <Tooltip title="Logout">
                            <IconButton onClick={handleLogout} color="error">
                                <LogoutIcon />
                            </IconButton>
                        </Tooltip>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
