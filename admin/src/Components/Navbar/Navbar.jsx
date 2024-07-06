import React from "react";
import './Navbar.css';
import navLogo from '../../assets/nav-logo.svg';
import navProfile from '../../assets/nav-profile.svg';

function Navbar() {
    return (
        <div className="navbar">
            <img src={navLogo} alt="nav-logo" className="nav-logo" />
            <img src={navProfile} className="nav-profile" alt="nav-profile" />
        </div>
    )
}

export default Navbar;