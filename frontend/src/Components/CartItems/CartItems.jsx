import React, { useContext } from "react";
import './CartItems.css';
import { ShopContext } from "../../Context/ShopContext";
import Button from '@mui/material/Button';
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function CartItems() {
    const { all_products, cartItems, removeToCart } = useContext(ShopContext);
    return (
        <div className="cart-items">
            <div className="cart-items-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_products.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cart-items-format cart-items-format-main">
                                <img src={e.image} alt="" className="cart-icon-product-icon" />
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <Button variant="outlined" className="cart-items-quantity">{cartItems[e.id]}</Button>
                                <p>${e.new_price * cartItems[e.id]}</p>
                                <IconButton className="cart-items-remove-icon" onClick={() => { removeToCart(e.id) }}>
                                    <CloseIcon />
                                </IconButton>
                            </div>
                            <hr />
                        </div>
                    )
                }
                return null;
            })}
            <div className="cart-items-down">
                <div className="cart-items-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cart-items-total-item">
                            <p>Subtotal</p>
                            <p>${0}</p>
                        </div>
                        <hr />
                        <div className="cart-items-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cart-items-total-item">
                            <h3>Total</h3>
                            <h3>${0}</h3>
                        </div>
                    </div>
                    <Button variant="contained">PROCEED TO CHECKOUT</Button>
                </div>
                <div className="cart-items-promocode">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="cart-item-promobox">
                        <input type="text" placeholder="Promo code" />
                        <Button variant="contained">Submit</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems;