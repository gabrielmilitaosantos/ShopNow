import React, { createContext, useState } from "react";
import all_product from '../Components/Assets/all_product';

// API Context
export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length + 1; index++) {
        cart[index] = 0;            
    }
    return cart;
}

const ShopContextProvider = (props) => {
    
    const [cartItems, setCartItems] = useState(getDefaultCart());
    
    const addToCart = (itemId) => {
        setCartItems((prevValue) => ({
            ...prevValue, 
            [itemId] : prevValue[itemId] + 1
        }));
        console.log(cartItems);
    }

    const removeToCart = (itemId) => {
        setCartItems((prevValue) => ({
            ...prevValue, 
            [itemId] : prevValue[itemId] - 1
        }));
    }

    const contextValue = {all_product, cartItems, addToCart, removeToCart};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;