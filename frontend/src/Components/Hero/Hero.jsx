import React from "react";
import './Hero.css';
import arrow_icon from '../Assets/arrow.png';
import hero_image from '../Assets/hero_image.png';

function Hero() {
    return (
        <div className="hero">
            <div className="hero-left">
                <h2>Dress to impress with our latest arrivals!</h2>
                <div>
                    <p>Fashion-forward finds await you</p>
                    <p>Start exploring now!</p>
                </div>
                <div className="hero-latest-btn">
                    <div>Latest Collection</div>
                    <img src={arrow_icon} alt="arrow icon" />
                </div>
            </div>
            <div className="hero-right">
                <img src={hero_image} alt="fashion women" />
            </div>
        </div>
    )
}

export default Hero;