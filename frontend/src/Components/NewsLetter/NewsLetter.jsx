import React from "react";
import './NewsLetter.css';
import Button from '@mui/material/Button';

function NewsLetter() {
    return (
        <div className="newsletter">
            <h1>Get Exclusive Offers On Your Email!</h1>
            <p>Subscribe to our newletter and stay updated</p>
            <div>
                <input type="email" placeholder="Your Email" />
                <Button variant="text">Subscribe</Button>
            </div>
        </div>
    )
}

export default NewsLetter;