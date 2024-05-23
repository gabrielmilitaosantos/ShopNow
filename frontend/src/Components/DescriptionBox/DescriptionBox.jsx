import React from "react";
import './DescriptionBox.css';

function DescriptionBox() {
    return (
        <div className="descriptionbox">
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">Description</div>
                <div className="descriptionbox-nav-box fade">Reviews (233)</div>
            </div>
            <div className="descriptionbox-description">
                <p>
                    Experience the ultimate blend of comfort and style with our classic clothes.
                    Crafted from 100% premium cotton, this shirt offers unparalleled softness and
                    breathability, making it perfect for everyday wear. The timeless crewneck
                    design provides a versatile look that pairs effortlessly with any outfit, whether
                    you're dressing up for a casual day out or lounging at home.
                </p>
                <ul>
                    <li>Material: 100% Premium Cotton</li>
                    <li>Fit: Regular fit for a relaxed, comfortable feel</li>
                    <li>Neckline: Classic crewneck design</li>
                    <li>Durability: Double-stitched hems for long-lasting wear</li>
                    <li>Colors: Available in a range of classic and vibrant colors</li>
                </ul>
            </div>
        </div>
    );
}

export default DescriptionBox;