import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const Navbar = ({ userRole, handleLogout }) => {
    return (
        <nav className="navbar">
            <ul>
                {userRole === 'admin' && (
                    <>
                        <li><Link to="/admin-dashboard">Home</Link></li>
                        <li><Link to="/addproduct">Product</Link></li>
                        <li><Link to="/addstock">Stock</Link></li>
                        <li><Link to="/customerorders">Customer Orders</Link></li>
                    </>
                )}

                {userRole === 'customer' && (
                    <>
                        <li><Link to="/customer-dashboard">Home</Link></li>
                        <li><Link to="/productlist">Product List</Link></li>
                        <li><Link to="/orderedlist">Ordered List</Link></li>
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
