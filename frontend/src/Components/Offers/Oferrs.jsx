import React from "react";
import './Offers.css';
import exclusive_img from '../Assets/exclusive_image.png';
import Button from '@mui/material/Button';

function Offers() {
    return (
        <div className="offers">
            <div className="offers-left">
                <h1>Exclusive</h1>
                <h2>Offers For You</h2>
                <p>ONLY ON THE BEST SELLERS PRODUCTS</p>
                <Button variant="contained">Check Now</Button>
            </div>
            <div className="offers-right">
                <img src={exclusive_img} alt="Model Woman" />
            </div>
        </div>
    )
}

export default Offers;