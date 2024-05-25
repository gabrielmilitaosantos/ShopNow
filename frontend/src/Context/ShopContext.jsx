import React, { createContext, useState } from "react";
import all_products from '../Components/Assets/all_products';

// API Context
export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_products.length + 1; index++) {
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
    }

    const removeToCart = (itemId) => {
        setCartItems((prevValue) => ({
            ...prevValue, 
            [itemId] : prevValue[itemId] - 1
        }));
    }

    const contextValue = {all_products, cartItems, addToCart, removeToCart};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;