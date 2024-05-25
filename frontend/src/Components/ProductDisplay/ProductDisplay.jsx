import React, { useContext } from "react";
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ShopContext } from "../../Context/ShopContext";

function ProductDisplay(props) {
    const { product } = props
    const { addToCart } = useContext(ShopContext);

    return (
        <div className="product-display">
            <div className="product-display-left">
                <div className="product-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="product-display-img">
                    <img className="productdisplay-main-img" src={product.image} alt="" />
                </div>
            </div>
            <div className="product-display-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="Rating star" />
                    <img src={star_icon} alt="Rating star" />
                    <img src={star_icon} alt="Rating star" />
                    <img src={star_icon} alt="Rating star" />
                    <img src={star_dull_icon} alt="Rating star" />
                    <p>(223)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price">
                        <h2>${product.new_price}</h2>
                        <h3>${product.old_price}</h3>
                    </div>
                    <div className="productdisplay-right-description">
                        Crafted from premium, breathable cotton, this shirt offers a perfect blend of durability and
                        softness, making it ideal for any occasion.
                    </div>
                    <div className="productdisplay-right-size">
                        <h1>Select Size</h1>
                        <div className="productdisplay-right-sizes">
                            <div>S</div>
                            <div>M</div>
                            <div>L</div>
                            <div>XL</div>
                            <div>XXL</div>
                        </div>
                    </div>
                    <Button variant="contained" onClick={() => { addToCart(product.id) }}><ShoppingCartIcon fontSize="medium" />ADD TO CART</Button>
                    <p className="productdisplay-right-category"><span>Category: </span>Women, T-Shirt, Crop Top</p>
                    <p className="productdisplay-right-category"><span>Tags: </span>Modern, Latest</p>
                </div>
            </div>
        </div>
    )
}

export default ProductDisplay;