import React, { useContext, useState } from "react";
import './Navbar.css';
import Button from '@mui/material/Button';

import logo from '../Assets/shopnow_logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

function Navbar() {
    const [menu, setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext);

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="logo" width={65} height={65} />
                <p>ShopNow</p>
            </div>
            <ul className="nav-menu">
                <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/'>Shop</Link> {menu === "shop" && <hr />}</li>
                <li onClick={() => { setMenu("men") }}><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/mens'>Men</Link> {menu === "men" && <hr />}</li>
                <li onClick={() => { setMenu("women") }}><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/womens'>Women</Link> {menu === "women" && <hr />}</li>
                <li onClick={() => { setMenu("kids") }}><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/kids'>Kids</Link> {menu === "kids" && <hr />}</li>
            </ul>
            <div className="nav-login-cart">
                <Link to='/login'><Button variant="contained">Login</Button></Link>
                <Link to='/cart'><img src={cart_icon} alt="cart icon" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    );
}

export default Navbar;